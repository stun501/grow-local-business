/* ================================================================
   places-details.js — Google Place Details for the Google Listing Scorecard
   ================================================================
   Places-only constraint (companion doc §2.2): everything returned here
   is publicly visible data, fetched fresh from Google's Place Details
   (Legacy) endpoint. Nothing is invented or estimated when a field is
   missing — absent fields are returned as null/empty and the scoring
   module on the client treats "missing" as the lowest tier honestly.

   KNOWN DATA LIMITATIONS (read before changing the scoring rubric):
   1. Owner replies to reviews are NOT exposed by Google's public Places
      API (legacy or v1/"New") as of this build. The `reviews[]` objects
      contain author, rating, text and time only — there is no
      `owner_response`/`ownerReply` field in Google's own schema. This
      function defensively checks for one anyway (in case a future API
      revision adds it, or a proxy provides it), but in practice
      `hasOwnerReply` will be `null` (unknown) for every review today.
      The scoring module treats "unknown" the same as "no reply found"
      for that category — it never fabricates a reply that can't be seen.
   2. `editorial_summary` is a Google-generated blurb (mostly for
      restaurants/POIs) — it is NOT the owner-written "Business
      description" field from the Google Business Profile dashboard,
      which the public Places API does not expose at all. When it's
      missing we return an empty description, which the rubric already
      scores as "absent = 0" — the honest outcome either way.
   3. Photo *images* are not proxied here, only a count. Returning real
      photo URLs would require exposing the API key in a browser-facing
      URL or building an image proxy — out of scope for v1.
   ================================================================ */

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

/* ----------------------------------------------------------------
   Best-effort 24h cache + best-effort IP rate limit.
   Both live in memory inside a single warm Lambda container only.
   Netlify Functions are not guaranteed to stay warm and are not
   shared across concurrent instances, so this is NOT a durable cache
   or a real distributed rate limiter — it just takes the edge off
   repeat lookups and obvious scraping within one warm container.
   A proper v2 would move this to a shared store (e.g. a Baserow
   table keyed by place_id, or Netlify Blobs).
   ---------------------------------------------------------------- */
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const detailsCache = new Map(); // placeId -> { data, expires }

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 30; // per IP per hour, best effort only
const rateLimitLog = new Map(); // ip -> [timestamps]

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (rateLimitLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  rateLimitLog.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

const FIELDS = [
  "name",
  "place_id",
  "type",
  "business_status",
  "formatted_address",
  "formatted_phone_number",
  "international_phone_number",
  "website",
  "url",
  "opening_hours",
  "photo",
  "rating",
  "user_ratings_total",
  "review",
  "editorial_summary",
  "price_level"
].join(",");

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

  if (!GOOGLE_PLACES_API_KEY) {
    return { statusCode: 503, headers, body: JSON.stringify({ error: "not_configured" }) };
  }

  const ip =
    (event.headers["x-nf-client-connection-ip"] ||
      event.headers["x-forwarded-for"] ||
      "unknown").split(",")[0].trim();

  if (isRateLimited(ip)) {
    return { statusCode: 429, headers, body: JSON.stringify({ error: "rate_limited" }) };
  }

  let placeId;
  try {
    const body = JSON.parse(event.body || "{}");
    placeId = body.placeId;
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "invalid_json" }) };
  }

  if (!placeId || !placeId.trim()) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "missing_place_id" }) };
  }

  const cached = detailsCache.get(placeId);
  if (cached && cached.expires > Date.now()) {
    return { statusCode: 200, headers, body: JSON.stringify(cached.data) };
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", GOOGLE_PLACES_API_KEY);

  try {
    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.status === "NOT_FOUND" || data.status === "INVALID_REQUEST") {
      return { statusCode: 404, headers, body: JSON.stringify({ error: "not_found" }) };
    }

    if (data.status !== "OK") {
      return { statusCode: 502, headers, body: JSON.stringify({ error: "places_error", detail: data.status }) };
    }

    const r = data.result || {};

    const normalised = {
      placeId: r.place_id || placeId,
      name: r.name || null,
      types: Array.isArray(r.types) ? r.types : [],
      businessStatus: r.business_status || "OPERATIONAL",
      address: r.formatted_address || null,
      phone: r.formatted_phone_number || r.international_phone_number || null,
      website: r.website || null,
      mapsUrl: r.url || `https://www.google.com/maps/place/?q=place_id:${r.place_id || placeId}`,
      rating: typeof r.rating === "number" ? r.rating : null,
      userRatingsTotal: typeof r.user_ratings_total === "number" ? r.user_ratings_total : 0,
      photoCount: Array.isArray(r.photos) ? r.photos.length : 0,
      openingHours: r.opening_hours
        ? {
            openNow: typeof r.opening_hours.open_now === "boolean" ? r.opening_hours.open_now : null,
            weekdayText: Array.isArray(r.opening_hours.weekday_text) ? r.opening_hours.weekday_text : [],
            hasPeriods: Array.isArray(r.opening_hours.periods) && r.opening_hours.periods.length > 0
          }
        : null,
      description: (r.editorial_summary && r.editorial_summary.overview) || "",
      reviews: Array.isArray(r.reviews)
        ? r.reviews.map((rv) => ({
            rating: typeof rv.rating === "number" ? rv.rating : null,
            time: typeof rv.time === "number" ? rv.time : null,
            relativeTime: rv.relative_time_description || null,
            // Not provided by Google's public API today — see file header.
            // Left in place so scoring degrades gracefully if a future
            // data source ever populates it, without ever guessing.
            hasOwnerReply:
              typeof rv.owner_response !== "undefined" || typeof rv.ownerResponse !== "undefined"
                ? Boolean(rv.owner_response || rv.ownerResponse)
                : null
          }))
        : []
    };

    detailsCache.set(placeId, { data: normalised, expires: Date.now() + CACHE_TTL_MS });

    return { statusCode: 200, headers, body: JSON.stringify(normalised) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "fetch_failed", detail: err.message }) };
  }
};
