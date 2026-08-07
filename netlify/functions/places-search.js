/* ================================================================
   places-search.js — Google Places Text Search for Review QR / Scorecard
   ================================================================
   What was wrong (Review QR "business not recognised"):
   The first version only ran Text Search with a loosely concatenated
   query ("name + postcode") and no location bias. UK postcodes often
   failed to pin results, so ZERO_RESULTS (or empty-feeling responses)
   sent the UI straight to the paste-URL fallback even when the listing
   existed. That felt like "not recognised".

   Fix: accept query + location (postcode); prefer Text Search with the
   postcode appended strongly; geocode the postcode when possible and
   apply location/radius bias; if Text Search is empty, try Find Place
   From Text with the same bias. Surface REQUEST_DENIED /
   OVER_QUERY_LIMIT clearly so we do not silently treat them as
   "no match".
   ================================================================ */

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
var rateLimit = require("./_shared/rate-limit");
var MAX_QUERY_CHARS = 120;
var MAX_LOCATION_CHARS = 80;

function mapCandidate(r) {
  const placeId = r.place_id;
  return {
    name: r.name,
    address: r.formatted_address || r.vicinity || "",
    placeId,
    mapsUrl: `https://www.google.com/maps/place/?q=place_id:${placeId}`,
    reviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`
  };
}

function placesErrorResponse(headers, status, detail, message) {
  console.error("[places-search]", status, detail, message || "");
  return {
    statusCode: 502,
    headers,
    body: JSON.stringify({
      error: "places_error",
      detail,
      message:
        message ||
        (detail === "REQUEST_DENIED"
          ? "Google Places denied the request. Check the API key and that Places API (and Geocoding if used) are enabled."
          : detail === "OVER_QUERY_LIMIT"
            ? "Google Places quota exceeded. Try again later or raise the project quota."
            : `Google Places returned ${detail}.`)
    })
  };
}

async function geocodeLocation(location, key) {
  if (!location || !String(location).trim()) return null;
  try {
    const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
    url.searchParams.set("address", String(location).trim());
    url.searchParams.set("components", "country:GB");
    url.searchParams.set("region", "uk");
    url.searchParams.set("key", key);
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data.status === "OK" && data.results && data.results[0] && data.results[0].geometry) {
      const loc = data.results[0].geometry.location;
      if (typeof loc.lat === "number" && typeof loc.lng === "number") {
        return { lat: loc.lat, lng: loc.lng };
      }
    }
    if (data.status === "REQUEST_DENIED" || data.status === "OVER_QUERY_LIMIT") {
      console.warn("[places-search] geocode", data.status, data.error_message || "");
    }
  } catch (err) {
    console.warn("[places-search] geocode failed", err.message);
  }
  return null;
}

async function textSearch(searchText, bias, key) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  url.searchParams.set("query", searchText);
  url.searchParams.set("region", "uk");
  if (bias) {
    url.searchParams.set("location", `${bias.lat},${bias.lng}`);
    url.searchParams.set("radius", "20000");
  }
  url.searchParams.set("key", key);
  const res = await fetch(url.toString());
  return res.json();
}

async function findPlaceFromText(searchText, bias, key) {
  const url = new URL("https://maps.googleapis.com/maps/api/place/findplacefromtext/json");
  url.searchParams.set("input", searchText);
  url.searchParams.set("inputtype", "textquery");
  url.searchParams.set("fields", "place_id,name,formatted_address");
  url.searchParams.set("language", "en");
  if (bias) {
    url.searchParams.set("locationbias", `circle:20000@${bias.lat},${bias.lng}`);
  } else {
    url.searchParams.set("locationbias", "ipbias");
  }
  url.searchParams.set("key", key);
  const res = await fetch(url.toString());
  return res.json();
}

function buildSearchTexts(query, location) {
  const q = query.trim();
  const loc = location ? String(location).trim() : "";
  const texts = [];
  if (loc) {
    texts.push(`${q} ${loc} UK`);
    texts.push(`${q}, ${loc}, United Kingdom`);
  } else {
    texts.push(`${q} UK`);
  }
  return texts;
}

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "method_not_allowed" }) };
  }

  var rl = rateLimit.checkRateLimit(event, "places-search", 30, 60 * 60 * 1000);
  if (rl.limited) {
    return { statusCode: 429, headers, body: JSON.stringify({ error: "rate_limited" }) };
  }

  if (!GOOGLE_PLACES_API_KEY) {
    return { statusCode: 503, headers, body: JSON.stringify({ error: "not_configured" }) };
  }

  let query, location;
  try {
    const body = JSON.parse(event.body || "{}");
    query = body.query;
    location = body.location;
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "invalid_json" }) };
  }

  if (!query || !String(query).trim()) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "missing_query" }) };
  }

  query = String(query).trim().slice(0, MAX_QUERY_CHARS);
  location = location ? String(location).trim().slice(0, MAX_LOCATION_CHARS) : "";

  const searchTexts = buildSearchTexts(query, location);
  const bias = await geocodeLocation(location, GOOGLE_PLACES_API_KEY);

  try {
    let lastStatus = "ZERO_RESULTS";
    let candidates = [];

    for (const searchText of searchTexts) {
      const data = await textSearch(searchText, bias, GOOGLE_PLACES_API_KEY);
      lastStatus = data.status;

      if (data.status === "REQUEST_DENIED" || data.status === "OVER_QUERY_LIMIT") {
        return placesErrorResponse(headers, data.status, data.status, data.error_message);
      }

      if (data.status === "OK" && Array.isArray(data.results) && data.results.length) {
        candidates = data.results.slice(0, 5).map(mapCandidate);
        break;
      }

      if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
        return placesErrorResponse(headers, data.status, data.status, data.error_message);
      }
    }

    if (!candidates.length) {
      const findData = await findPlaceFromText(searchTexts[0], bias, GOOGLE_PLACES_API_KEY);
      lastStatus = findData.status;

      if (findData.status === "REQUEST_DENIED" || findData.status === "OVER_QUERY_LIMIT") {
        return placesErrorResponse(headers, findData.status, findData.status, findData.error_message);
      }

      if (findData.status === "OK" && Array.isArray(findData.candidates) && findData.candidates.length) {
        candidates = findData.candidates.slice(0, 5).map(mapCandidate);
      } else if (findData.status !== "OK" && findData.status !== "ZERO_RESULTS") {
        return placesErrorResponse(headers, findData.status, findData.status, findData.error_message);
      }
    }

    if (!candidates.length) {
      console.log("[places-search] ZERO_RESULTS", {
        query: String(query).trim(),
        location: location || null,
        bias: Boolean(bias),
        lastStatus
      });
    }

    // Backward compatible: success body is a bare array (Scorecard + Review clients).
    return { statusCode: 200, headers, body: JSON.stringify(candidates) };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "fetch_failed", detail: err.message })
    };
  }
};
