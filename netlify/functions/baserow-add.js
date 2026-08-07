/**
 * Server-side Baserow row create + optional operator notify.
 * Keeps the Baserow token off the public HTML.
 *
 * Env (Netlify):
 *   BASEROW_DATABASE_TOKEN   required (create-only token)
 *   BASEROW_API_URL          optional, default https://api.baserow.io
 *   SMTP2GO_API_KEY          optional; if set, notifies for allowlisted tables
 *   NOTIFY_TO / NOTIFY_FROM  optional
 */

var rateLimit = require("./_shared/rate-limit");

var BASEROW_TOKEN = process.env.BASEROW_DATABASE_TOKEN || "";
var BASEROW_API_URL = (process.env.BASEROW_API_URL || "https://api.baserow.io").replace(
  /\/+$/,
  ""
);
var SMTP2GO_API_KEY = process.env.SMTP2GO_API_KEY || "";
var NOTIFY_TO = process.env.NOTIFY_TO || "hello@growlocalbusiness.co.uk";
var NOTIFY_FROM_RAW =
  process.env.NOTIFY_FROM || "hello@growlocalbusiness.co.uk";

var ALLOWED_TABLES = {
  "1092861": { label: "Owner Leads", notify: true },
  "1092866": { label: "Customer Leads", notify: true },
  "1092867": { label: "Valuation Leads", notify: true },
  "1092868": { label: "Tool Ideas", notify: true },
  "1098284": { label: "Scorecard Runs", notify: false },
  "1098285": { label: "Booking Requests", notify: true }
};

var headersBase = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

function senderAddress(raw) {
  var s = String(raw || "").trim();
  var m = s.match(/<([^>]+)>/);
  if (m) return m[1].trim();
  return s;
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sanitizeRow(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) return {};
  var out = {};
  Object.keys(row).forEach(function (key) {
    if (typeof key !== "string" || key.length > 80) return;
    var val = row[key];
    if (val == null) {
      out[key] = "";
      return;
    }
    if (typeof val === "number" && Number.isFinite(val)) {
      out[key] = val;
      return;
    }
    if (typeof val === "boolean") {
      out[key] = val;
      return;
    }
    out[key] = String(val).slice(0, 2000);
  });
  return out;
}

async function notifyOperator(tableLabel, tool, fields) {
  if (!SMTP2GO_API_KEY) return;
  var sender = senderAddress(NOTIFY_FROM_RAW);
  if (!sender || sender.indexOf("@") === -1) return;

  var lines = Object.keys(fields || {}).map(function (k) {
    return (
      "<tr><td style=\"padding:4px 12px 4px 0;vertical-align:top;color:#555\"><strong>" +
      esc(k) +
      "</strong></td><td style=\"padding:4px 0\">" +
      esc(fields[k]) +
      "</td></tr>"
    );
  });
  var html =
    "<div style=\"font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.45\">" +
    "<p style=\"margin:0 0 12px\">New Grow Local enquiry.</p>" +
    "<p style=\"margin:0 0 16px\"><strong>Source:</strong> " +
    esc(tool || tableLabel) +
    " (" +
    esc(tableLabel) +
    ")</p>" +
    "<table style=\"border-collapse:collapse\">" +
    lines.join("") +
    "</table>" +
    "<p style=\"margin:18px 0 0;color:#666;font-size:13px\">Saved to Baserow. This alert is for you only; the visitor was not emailed a report.</p>" +
    "</div>";

  var textLines = Object.keys(fields || {}).map(function (k) {
    return k + ": " + String(fields[k] == null ? "" : fields[k]);
  });
  var text =
    "New Grow Local enquiry.\n\nSource: " +
    (tool || tableLabel) +
    " (" +
    tableLabel +
    ")\n\n" +
    textLines.join("\n") +
    "\n\nSaved to Baserow. This alert is for you only; the visitor was not emailed a report.";

  var subject =
    "[Grow Local] " +
    String(tool || tableLabel).slice(0, 80) +
    (fields && fields.Name ? " · " + String(fields.Name).slice(0, 60) : "");

  try {
    await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Smtp2go-Api-Key": SMTP2GO_API_KEY
      },
      body: JSON.stringify({
        sender: sender,
        to: [NOTIFY_TO],
        subject: subject,
        html_body: html,
        text_body: text
      })
    });
  } catch (err) {
    console.warn("[baserow-add] notify failed", err && err.message);
  }
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: headersBase, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: headersBase,
      body: JSON.stringify({ ok: false, error: "method_not_allowed" })
    };
  }

  var rl = rateLimit.checkRateLimit(event, "baserow-add", 40, 60 * 60 * 1000);
  if (rl.limited) {
    return {
      statusCode: 429,
      headers: headersBase,
      body: JSON.stringify({ ok: false, error: "rate_limited" })
    };
  }

  if (!BASEROW_TOKEN) {
    return {
      statusCode: 503,
      headers: headersBase,
      body: JSON.stringify({
        ok: false,
        error: "not_configured",
        hint: "Set BASEROW_DATABASE_TOKEN in Netlify env, then redeploy."
      })
    };
  }

  var body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      headers: headersBase,
      body: JSON.stringify({ ok: false, error: "invalid_json" })
    };
  }

  var tableId = String(body.tableId || "").trim();
  var meta = ALLOWED_TABLES[tableId];
  if (!meta) {
    return {
      statusCode: 403,
      headers: headersBase,
      body: JSON.stringify({ ok: false, error: "table_not_allowed" })
    };
  }

  var row = sanitizeRow(body.row);
  var url =
    BASEROW_API_URL +
    "/api/database/rows/table/" +
    tableId +
    "/?user_field_names=true";

  try {
    var res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Token " + BASEROW_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(row)
    });
    var text = await res.text();
    var json = null;
    try {
      json = JSON.parse(text);
    } catch (e) {
      json = null;
    }
    if (!res.ok) {
      console.error("[baserow-add] Baserow error", res.status, text.slice(0, 400));
      return {
        statusCode: 502,
        headers: headersBase,
        body: JSON.stringify({ ok: false, error: "baserow_failed", status: res.status })
      };
    }

    if (meta.notify) {
      var tool = String(body.tool || row.Tool || meta.label).slice(0, 80);
      // Fire-and-forget style: await briefly so serverless doesn't freeze early
      await notifyOperator(meta.label, tool, row);
    }

    return {
      statusCode: 200,
      headers: headersBase,
      body: JSON.stringify({ ok: true, row: json })
    };
  } catch (err) {
    console.error("[baserow-add] failed", err);
    return {
      statusCode: 500,
      headers: headersBase,
      body: JSON.stringify({ ok: false, error: "server_error" })
    };
  }
};
