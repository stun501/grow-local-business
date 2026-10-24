(function(root) {
  function integer(v, min, max) { return Number.isInteger(v) && v >= min && v <= max; }
  function valid(c) {
    const clock = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return !!c && typeof c === "object" && typeof c.n === "string" && c.n.trim().length > 0 && c.n.length <= 160 &&
      integer(c.len, 5, 480) && integer(c.buf, 0, 240) && Array.isArray(c.d) && c.d.length === 7 &&
      c.d.every(d => d && typeof d.o === "boolean" && typeof d.s === "string" && clock.test(d.s) &&
        typeof d.e === "string" && clock.test(d.e) && (!d.o || d.s < d.e)) &&
      (c.em === undefined || (typeof c.em === "string" && c.em.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(c.em))) &&
      (c.sv === undefined || (Array.isArray(c.sv) && c.sv.length <= 20 && c.sv.every(s => s &&
        typeof s.n === "string" && s.n.length > 0 && s.n.length <= 100 && integer(s.len, 5, 480))));
  }
  const api = { valid };
  if (typeof module !== "undefined") module.exports = api;
  else root.BookingConfig = api;
})(typeof window === "undefined" ? {} : window);
