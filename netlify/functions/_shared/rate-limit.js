/**
 * Best-effort per-IP rate limits for Netlify Functions.
 * In-memory only (per warm instance). Reduces abuse; not a hard distributed lock.
 */

function clientIp(event) {
  var headers = (event && event.headers) || {};
  return String(
    headers["x-nf-client-connection-ip"] ||
      headers["x-forwarded-for"] ||
      headers["client-ip"] ||
      "unknown"
  )
    .split(",")[0]
    .trim();
}

var buckets = new Map();

/**
 * @param {object} event
 * @param {string} prefix
 * @param {number} maxHits
 * @param {number} windowMs
 * @returns {{ limited: boolean, ip: string, count: number }}
 */
function checkRateLimit(event, prefix, maxHits, windowMs) {
  var ip = clientIp(event);
  var key = String(prefix || "default") + ":" + ip;
  var now = Date.now();
  var window = windowMs || 60 * 60 * 1000;
  var max = maxHits || 30;
  var hits = (buckets.get(key) || []).filter(function (t) {
    return now - t < window;
  });
  hits.push(now);
  buckets.set(key, hits);
  return { limited: hits.length > max, ip: ip, count: hits.length };
}

module.exports = {
  clientIp: clientIp,
  checkRateLimit: checkRateLimit
};
