/**
 * Operator lead alert — emails hello@growlocalbusiness.co.uk when a key
 * Baserow row is created (Owner Leads, Tool Ideas, Customer Leads,
 * Valuation Leads, Booking Requests). Does NOT email end users.
 *
 * Env (Netlify only — never commit):
 *   SMTP2GO_API_KEY         required to send
 *   NOTIFY_TO               default hello@growlocalbusiness.co.uk
 *   NOTIFY_FROM             default hello@growlocalbusiness.co.uk
 *                           (must be a verified sender/domain in SMTP2GO)
 */

const SMTP2GO_API_KEY = process.env.SMTP2GO_API_KEY || "";
const NOTIFY_TO = process.env.NOTIFY_TO || "hello@growlocalbusiness.co.uk";
const NOTIFY_FROM_RAW =
  process.env.NOTIFY_FROM || "hello@growlocalbusiness.co.uk";

const headersBase = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

/** SMTP2GO sender must be a bare email; strip "Name <email>" if provided. */
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

function buildBody(payload) {
  const tool = payload.tool || payload.table || "Lead";
  const fields = payload.fields && typeof payload.fields === "object" ? payload.fields : {};
  const lines = Object.keys(fields).map(function (k) {
    return "<tr><td style=\"padding:4px 12px 4px 0;vertical-align:top;color:#555\"><strong>" +
      esc(k) +
      "</strong></td><td style=\"padding:4px 0\">" +
      esc(fields[k]) +
      "</td></tr>";
  });
  return (
    "<div style=\"font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.45\">" +
    "<p style=\"margin:0 0 12px\">New Grow Local enquiry.</p>" +
    "<p style=\"margin:0 0 16px\"><strong>Source:</strong> " +
    esc(tool) +
    (payload.table ? " (" + esc(payload.table) + ")" : "") +
    "</p>" +
    "<table style=\"border-collapse:collapse\">" +
    lines.join("") +
    "</table>" +
    "<p style=\"margin:18px 0 0;color:#666;font-size:13px\">Saved to Baserow. This alert is for you only; the visitor was not emailed a report.</p>" +
    "</div>"
  );
}

function buildText(payload) {
  const tool = payload.tool || payload.table || "Lead";
  const fields = payload.fields && typeof payload.fields === "object" ? payload.fields : {};
  const lines = Object.keys(fields).map(function (k) {
    return k + ": " + String(fields[k] == null ? "" : fields[k]);
  });
  return (
    "New Grow Local enquiry.\n\nSource: " +
    tool +
    (payload.table ? " (" + payload.table + ")" : "") +
    "\n\n" +
    lines.join("\n") +
    "\n\nSaved to Baserow. This alert is for you only; the visitor was not emailed a report."
  );
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: headersBase, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: headersBase,
      body: JSON.stringify({ ok: false, error: "Method not allowed" })
    };
  }

  if (!SMTP2GO_API_KEY) {
    return {
      statusCode: 503,
      headers: headersBase,
      body: JSON.stringify({
        ok: false,
        error: "SMTP2GO_API_KEY not configured",
        hint: "Add SMTP2GO_API_KEY in Netlify env, then redeploy."
      })
    };
  }

  var payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      headers: headersBase,
      body: JSON.stringify({ ok: false, error: "Invalid JSON" })
    };
  }

  var tool = payload.tool || payload.table || "Lead";
  var subject =
    "[Grow Local] " +
    String(tool).slice(0, 80) +
    (payload.fields && payload.fields.Name ? " · " + String(payload.fields.Name).slice(0, 60) : "");

  var sender = senderAddress(NOTIFY_FROM_RAW);
  if (!sender || sender.indexOf("@") === -1) {
    return {
      statusCode: 500,
      headers: headersBase,
      body: JSON.stringify({ ok: false, error: "NOTIFY_FROM is not a valid email" })
    };
  }

  try {
    var res = await fetch("https://api.smtp2go.com/v3/email/send", {
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
        html_body: buildBody(payload),
        text_body: buildText(payload)
      })
    });
    var text = await res.text();
    var parsed = null;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      parsed = null;
    }

    var succeeded =
      res.ok &&
      parsed &&
      parsed.data &&
      Number(parsed.data.succeeded) > 0;

    if (!succeeded) {
      console.error("SMTP2GO error", res.status, text);
      return {
        statusCode: 502,
        headers: headersBase,
        body: JSON.stringify({
          ok: false,
          error: "Send failed",
          status: res.status,
          detail:
            parsed && parsed.data && (parsed.data.error || parsed.data.error_code)
              ? parsed.data.error || parsed.data.error_code
              : undefined
        })
      };
    }

    return {
      statusCode: 200,
      headers: headersBase,
      body: JSON.stringify({
        ok: true,
        email_id: parsed.data.email_id || null
      })
    };
  } catch (err) {
    console.error("notify-lead failed", err);
    return {
      statusCode: 500,
      headers: headersBase,
      body: JSON.stringify({ ok: false, error: "Server error" })
    };
  }
};
