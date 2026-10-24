const { createHash } = require("node:crypto");
const buckets = new Map();
const SCRIPT = "local n=tonumber(redis.call('GET',KEYS[1]) or '0'); if n>=tonumber(ARGV[1]) then return 0 end; n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('PEXPIRE',KEYS[1],ARGV[2]) end; return 1";
function clientIp(event) {
  const h = event.headers || {};
  return String(h["x-nf-client-connection-ip"] || (process.env.NETLIFY_DEV === "true" ? h["x-forwarded-for"] : "") || "unknown").split(",")[0].trim().slice(0,100);
}
async function take(key, max, windowMs) {
  if (!Number.isSafeInteger(max) || max < 1 || !Number.isSafeInteger(windowMs) || windowMs < 1) return false;
  const digest = createHash("sha256").update(key).digest("hex");
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      if (new URL(url).protocol !== "https:") return false;
      const res = await fetch(url, { method: "POST", signal: AbortSignal.timeout(3000),
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify(["EVAL", SCRIPT, "1", "grow:quota:" + digest, String(max), String(windowMs)]) });
      if (!res.ok) return false;
      const data = await res.json(); return !data.error && data.result === 1;
    } catch { return false; }
  }
  if (process.env.NODE_ENV !== "test" && process.env.NETLIFY_DEV !== "true") return false;
  const now = Date.now();
  for (const [id,b] of buckets) if (b.resetAt <= now) buckets.delete(id);
  let b = buckets.get(digest);
  if (!b) { if (buckets.size >= 10000) return false; b = { count: 0, resetAt: now + windowMs }; buckets.set(digest,b); }
  if (b.count >= max) return false;
  b.count++; return true;
}
async function checkRateLimit(event, prefix, maxHits, windowMs) {
  const ip = clientIp(event);
  const allowed = await take(prefix + ":" + ip, maxHits, windowMs);
  const daily = prefix === "review-reply" ? 100 : 500;
  const globalAllowed = allowed && await take(prefix + ":daily", daily, 86400000);
  return { limited: !globalAllowed, ip, count: globalAllowed ? 1 : maxHits + 1 };
}
module.exports = { clientIp, checkRateLimit, take };
