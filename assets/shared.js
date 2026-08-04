/* ============================================================
  shared.js · Grow Local shared helpers
  Exposes window.TBA for all tool pages
  ============================================================ */

(function () {
 "use strict";

 var PRODUCT = {
  name: "Grow Local",
  tagline: "A growth agency for local business",
  domain: "www.growlocalbusiness.co.uk",
  hubUrl: "https://grow-local-business.netlify.app/"
 };

 /* Customer-facing brand · Grow Local only (v2 §2.7a) */
 var BRAND = {
  name: "Grow Local",
  person: "Craig",
  phone: "07379028832",
  phoneDisplay: "07379 028832",
  email: "hello@growlocalbusiness.co.uk",
  smsHref: "sms:07379028832"
 };

 var BUSINESS_TYPES = [
  "Garage or vehicle services",
  "Trades (plumbing, electrical, roofing, building)",
  "Home improvement (kitchens, bathrooms, flooring, windows)",
  "Interior design or architecture",
  "Professional services (accountancy, legal, financial)",
  "Mortgage or insurance brokerage",
  "Estate agency or lettings",
  "Dental, medical or veterinary practice",
  "Specialist or commercial services",
  "Other"
 ];

  var TOOLS = [
    {
      id: "scorecard",
      name: "Google Listing Scorecard",
      href: "scorecard/",
      eyebrow: "Any business on Google",
      blurb:
        "Score the essentials on your Google listing out of 100 and see the three things quietly costing you customers.",
      outcome: "Most local listings score under 50"
    },
    {
      id: "quote",
      name: "Instant Quote Form",
      href: "quote/",
      eyebrow: "Garages · Trades · Salons · Any business that quotes",
      blurb:
        "Someone is looking at your business right now, wondering what you charge. Give them an answer before they ask someone else.",
      outcome: "Turns after-hours browsers into named leads"
    },
    {
      id: "review",
      name: "Google Review QR",
      href: "review/",
      eyebrow: "Any business with customers",
      blurb:
        "You've earned far more five-star reviews than you've actually been given. This closes the gap.",
      outcome: "More recent reviews means you're higher in local search"
    },
    {
      id: "reply",
      name: "Review Reply Writer",
      href: "reply/",
      eyebrow: "Any business with reviews",
      blurb:
        "Every review deserves an answer. Write a good one in about a minute, in your own words.",
      outcome: "Replied-to reviews build more trust than ratings alone"
    },
    {
      id: "booking",
      name: "Booking Link",
      href: "booking/",
      eyebrow: "Salons · Clinics · Trades · Anyone with a diary",
      blurb:
        "One link that ends the back-and-forth. They pick a slot, you get on with your day.",
      outcome: "Fewer calls · Fewer no-shows"
    },
    {
      id: "valuation",
      name: "Instant Valuation",
      href: "valuation/",
      eyebrow: "Estate agents · Lettings",
      blurb:
        "The people who'll instruct you in the spring are browsing tonight. Be the one who answers them.",
      outcome: "Turns a curious browser into a named seller"
    }
  ];

 var NEED_A_HAND_BODY =
  "Text us on <strong>07379 028832</strong> with a line about what you're stuck on and we'll come back to you. That's the quickest way to get an answer. Email works too; <a href=\"mailto:hello@growlocalbusiness.co.uk\">hello@growlocalbusiness.co.uk</a>. If you'd rather talk and we're with someone, leave a voicemail and we'll ring back." +
  "<p class=\"need-hand__note\">No charge for a quick question. We'd rather it worked properly than sat unused.</p>";

 function consentText() {
  return (
   "I agree that my name and email may be stored and used by Grow Local " +
   "to contact me about free tools and related help. " +
   "Your data is handled in accordance with UK GDPR. " +
   "You can withdraw consent at any time by emailing " +
   BRAND.email +
   "."
  );
 }

 /**
  * Render the consultant contact block inside a container element.
  */
 function renderContactBlock(el) {
  if (!el) return;
  el.classList.add("contact-block");
  el.innerHTML =
   '<p class="contact-block__heading">The tool is provided to you by</p>' +
   '<p class="contact-block__brand">' +
   BRAND.name +
   "</p>" +
   '<p class="contact-block__person">' +
   BRAND.person +
   "</p>" +
   '<span class="contact-block__detail">' +
   '<a href="' +
   BRAND.smsHref +
   '">Text ' +
   BRAND.phoneDisplay +
   "</a>" +
   "</span>" +
   '<span class="contact-block__detail">' +
   '<a href="mailto:' +
   BRAND.email +
   '">' +
   BRAND.email +
   "</a>" +
   "</span>";
 }

 /**
  * Standard "Need a hand?" section HTML.
  * @param {string} openingSentence tool-specific first sentence
  */
 function needAHandHtml(openingSentence) {
  return (
   '<section class="need-hand" id="need-a-hand">' +
   '<div class="wrap">' +
   "<h2>Need a hand?</h2>" +
   "<p class=\"need-hand__lead\"><strong>Happy to help you get it working.</strong></p>" +
   "<p>" +
   (openingSentence || "") +
   "</p>" +
   "<p>" +
   NEED_A_HAND_BODY +
   "</p>" +
   '<p><a class="btn-outline" href="' +
   BRAND.smsHref +
   '">Text us a question</a></p>' +
   "</div>" +
   "</section>"
  );
 }

 function baserowReady(config, tableId) {
  var tokenOk =
   config &&
   config.BASEROW_TOKEN &&
   !String(config.BASEROW_TOKEN).startsWith("PASTE");
  var tableOk = tableId && !String(tableId).startsWith("PASTE");
  if (!tokenOk || !tableOk || !config.BASEROW_URL) {
   console.warn(
    "[Grow Local] Baserow not configured: lead capture disabled. " +
     "Set BASEROW_TOKEN, table IDs, and BASEROW_URL in your tool CONFIG."
   );
   return false;
  }
  return true;
 }

 /** YYYY-MM-DD for Baserow date fields (ISO datetime is rejected). */
 function baserowDateToday() {
  var d = new Date();
  var y = d.getFullYear();
  var m = String(d.getMonth() + 1).padStart(2, "0");
  var day = String(d.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
 }

 /* Tables that should ping Craig immediately (not Scorecard Runs). */
 var OPERATOR_NOTIFY_TABLES = {
  "1092861": "Owner Leads",
  "1092868": "Tool Ideas",
  "1092866": "Customer Leads",
  "1092867": "Valuation Leads",
  "1098285": "Booking Requests"
 };

 /**
  * Fire-and-forget operator email via Netlify function.
  * Never blocks the tool UX; never emails the end user a report.
  */
 function notifyOperator(payload) {
  try {
   return fetch("/.netlify/functions/notify-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {})
   }).then(function (res) {
    if (!res.ok) {
     return res.text().then(function (body) {
      console.warn("[Grow Local] Operator notify failed:", res.status, body);
      return { ok: false };
     });
    }
    return res.json().catch(function () {
     return { ok: true };
    });
   }).catch(function (err) {
    console.warn("[Grow Local] Operator notify error:", err);
    return { ok: false };
   });
  } catch (e) {
   console.warn("[Grow Local] Operator notify skipped:", e);
   return Promise.resolve({ ok: false });
  }
 }

 function baserowAdd(config, tableId, row) {
  if (!baserowReady(config, tableId)) {
   return Promise.reject(new Error("Baserow not configured"));
  }
  var url =
   config.BASEROW_URL.replace(/\/+$/, "") +
   "/api/database/rows/table/" +
   tableId +
   "/?user_field_names=true";

  return fetch(url, {
   method: "POST",
   headers: {
    Authorization: "Token " + config.BASEROW_TOKEN,
    "Content-Type": "application/json"
   },
   body: JSON.stringify(row)
  }).then(function (res) {
   if (!res.ok) {
    return res.text().then(function (body) {
     throw new Error("Baserow " + res.status + ": " + body);
    });
   }
   return res.json();
  }).then(function (json) {
   var tableLabel = OPERATOR_NOTIFY_TABLES[String(tableId)];
   if (tableLabel) {
    notifyOperator({
     table: tableLabel,
     tool: (row && row.Tool) || tableLabel,
     fields: row || {}
    });
   }
   return json;
  });
 }

 function businessTypeOptionsHtml(selected) {
  return BUSINESS_TYPES.map(function (t) {
   var sel = selected === t ? ' selected' : "";
   return '<option value="' + t.replace(/"/g, "&quot;") + '"' + sel + ">" + t + "</option>";
  }).join("");
 }

 window.TBA = {
  PRODUCT: PRODUCT,
  BRAND: BRAND,
  TOOLS: TOOLS,
  BUSINESS_TYPES: BUSINESS_TYPES,
  consentText: consentText,
  renderContactBlock: renderContactBlock,
  needAHandHtml: needAHandHtml,
  businessTypeOptionsHtml: businessTypeOptionsHtml,
  baserowReady: baserowReady,
  baserowDateToday: baserowDateToday,
  baserowAdd: baserowAdd,
  notifyOperator: notifyOperator
 };
})();
