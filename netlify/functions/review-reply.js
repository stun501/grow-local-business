/**
 * Review Reply Writer — provider-agnostic OpenAI-compatible chat completions.
 * Keys stay server-side only. Default: OpenRouter + DeepSeek, Gemini Flash-Lite fallback.
 *
 * Env (Netlify):
 *   LLM_API_KEY or OPENROUTER_API_KEY
 *   LLM_BASE_URL          (default https://openrouter.ai/api/v1)
 *   LLM_MODEL             (default deepseek/deepseek-v3.2)
 *   LLM_FALLBACK_MODEL    (default google/gemini-2.0-flash-lite-001)
 *   LLM_SITE_URL          (optional OpenRouter HTTP-Referer)
 *   LLM_APP_NAME          (optional OpenRouter X-Title)
 *
 * Cost guardrails (in code):
 *   max_tokens ~120, review text capped ~1500 chars, ~10 gens/IP/hour, one retry max
 *
 * Operator setup (not a hard monthly spend CAP):
 *   Set a usage/spend ALERT in OpenRouter (or your LLM provider) so Craig is notified
 *   if spend rises. Do not block the tool with a hard monthly kill-switch unless asked.
 */

const API_KEY = process.env.LLM_API_KEY || process.env.OPENROUTER_API_KEY || "";
const BASE_URL = (process.env.LLM_BASE_URL || "https://openrouter.ai/api/v1").replace(/\/+$/, "");
const PRIMARY_MODEL = process.env.LLM_MODEL || "deepseek/deepseek-v3.2";
const FALLBACK_MODEL = process.env.LLM_FALLBACK_MODEL || "google/gemini-2.0-flash-lite-001";
const MAX_REVIEW_CHARS = 1500;
const MAX_TOKENS = 120;
const RATE_LIMIT_PER_HOUR = 10;

const rateBuckets = new Map();

const SYSTEM_PROMPT = `You draft a short, human reply from a UK local-business owner to a single customer review. The owner will read, edit and post it themselves — you are writing a first draft only.

Rules you must always follow:
- Stay under 80 words.
- Thank or acknowledge the reviewer within the first sentence.
- Sound like a real person who runs the business, not a brand or call-centre. Never use stock corporate phrases such as "we value your feedback" or "your satisfaction is our priority".
- Vary the opening line rather than defaulting to the same stock greeting every time.
- Use UK English spelling and tone — plain, warm, on the owner's side.
- Output only the reply text itself. No quotation marks around it, no preamble, no sign-off, no explanation, no markdown.

Rules you must never break:
- Never invent any fact that is not present in the review text or the owner's supplied context. No claimed refunds, no invented staff names, no "as we discussed on the phone" unless the owner's context says so.
- Never admit legal liability, fault for injury or damage, or breach of any regulation. If the review mentions injury, a safety issue, health risk, or any kind of legal threat, only acknowledge briefly and ask them to get in touch directly — say nothing further about the substance of it.
- Never argue with or dispute the reviewer's account point by point in public.
- Never offer compensation, a discount, a refund or a freebie of any kind. That decision belongs to the owner alone.
- Never mention or compare to a competitor.

For reviews rated 1 or 2 stars, follow this exact shape: (1) acknowledge what they said, (2) one short line of regret that does not admit fault, (3) invite them to get in touch directly to sort it out (use a phone number only if the owner's context supplies one, otherwise say "give us a call" or "get in touch").`;

const headersBase = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

function clientIp(event) {
  return (
    (event.headers["x-nf-client-connection-ip"] ||
      event.headers["x-forwarded-for"] ||
      event.headers["client-ip"] ||
      "unknown")
      .split(",")[0]
      .trim()
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  let bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.start > windowMs) {
    bucket = { start: now, count: 0 };
    rateBuckets.set(ip, bucket);
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_PER_HOUR;
}

function buildUserPrompt({ businessName, businessType, reviewText, starRating, tone, context }) {
  const lines = [
    `Business: ${businessName}${businessType ? " (" + businessType + ")" : ""}`,
    `Star rating on the review: ${starRating} out of 5`,
    `Tone requested by the owner: ${tone}`,
    `Review text: "${reviewText}"`
  ];
  if (context) {
    lines.push(
      `Extra context from the owner — only use facts stated here, never go beyond them: ${context}`
    );
  } else {
    lines.push("The owner gave no extra context — do not invent any.");
  }
  lines.push("Write one reply now, following every rule.");
  return lines.join("\n");
}

async function callModel(model, userPrompt) {
  const url = BASE_URL + "/chat/completions";
  const reqHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + API_KEY
  };
  if (process.env.LLM_SITE_URL) reqHeaders["HTTP-Referer"] = process.env.LLM_SITE_URL;
  if (process.env.LLM_APP_NAME) reqHeaders["X-Title"] = process.env.LLM_APP_NAME;

  const res = await fetch(url, {
    method: "POST",
    headers: reqHeaders,
    body: JSON.stringify({
      model,
      temperature: 0.7,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ]
    })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = (data && data.error && (data.error.message || data.error)) || "upstream " + res.status;
    const err = new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
    err.status = res.status;
    throw err;
  }

  const reply =
    data &&
    data.choices &&
    data.choices[0] &&
    data.choices[0].message &&
    data.choices[0].message.content
      ? String(data.choices[0].message.content).trim()
      : "";

  if (!reply) {
    const err = new Error("empty_response");
    err.status = 502;
    throw err;
  }
  return reply;
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: headersBase, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: headersBase, body: JSON.stringify({ error: "method_not_allowed" }) };
  }

  if (!API_KEY) {
    return {
      statusCode: 503,
      headers: headersBase,
      body: JSON.stringify({
        error: "not_configured",
        message: "Reply writer isn't switched on yet — text 07379 028832 and we'll sort it."
      })
    };
  }

  const ip = clientIp(event);
  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      headers: headersBase,
      body: JSON.stringify({
        error: "rate_limited",
        message: "You've hit the limit for now. Text 07379 028832 if you need a hand, or try again later."
      })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers: headersBase, body: JSON.stringify({ error: "invalid_json" }) };
  }

  const businessName = String(body.businessName || "").trim();
  const businessType = String(body.businessType || "").trim();
  let reviewText = String(body.reviewText || "").trim();
  const context = String(body.context || "").trim();
  const tone = ["Warm", "Brief", "Formal"].includes(body.tone) ? body.tone : "Warm";
  const starRating = Number(body.starRating != null ? body.starRating : body.rating);

  if (!businessName || !reviewText) {
    return {
      statusCode: 400,
      headers: headersBase,
      body: JSON.stringify({ error: "missing_fields", message: "Business name and review text are required." })
    };
  }
  if (!Number.isInteger(starRating) || starRating < 1 || starRating > 5) {
    return {
      statusCode: 400,
      headers: headersBase,
      body: JSON.stringify({ error: "invalid_star_rating", message: "Star rating must be a whole number from 1 to 5." })
    };
  }

  if (reviewText.length > MAX_REVIEW_CHARS) {
    reviewText = reviewText.slice(0, MAX_REVIEW_CHARS);
  }

  const userPrompt = buildUserPrompt({
    businessName,
    businessType,
    reviewText,
    starRating,
    tone,
    context
  });

  const failBody = {
    error: "upstream_error",
    message: "We couldn't write a reply just now. Text 07379 028832 and we'll sort it, or try again shortly."
  };

  try {
    let reply;
    try {
      reply = await callModel(PRIMARY_MODEL, userPrompt);
    } catch (primaryErr) {
      // One retry only, on the fallback model — never a canned template reply.
      reply = await callModel(FALLBACK_MODEL, userPrompt);
    }
    return { statusCode: 200, headers: headersBase, body: JSON.stringify({ reply }) };
  } catch (err) {
    return {
      statusCode: 502,
      headers: headersBase,
      body: JSON.stringify(failBody)
    };
  }
};
