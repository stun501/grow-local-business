# Session carry-forward — Grow Local toolkit (v2 rebuild)

Paste everything below the line into a new Cursor chat to resume.

---

## Role

Lead engineering agent for **Grow Local** at `g:\AI\projects\2. local-businesses-cold-outreach`.

**Specs:** `growlocal-copy-and-build-spec-v2.md` · `growlocal-companion-build-doc.md` · `BUILD-RATIONALE-V2.md` · `TOOL-STACK.md`

## Brand (locked)

Grow Local · hello@growlocalbusiness.co.uk · 07379 028832 (text-first) · Shopfront design · no Think Beyond / automation / AI wording on customer surfaces.

Live: https://grow-local-business.netlify.app/  
Hub QR: https://grow-local-business.netlify.app/qr/

## Built in this phase

| Item | Path | Status |
|------|------|--------|
| Hub v2 | `index.html` | Done |
| About | `about/index.html` | Done |
| Reply Writer | `reply/index.html` + `netlify/functions/review-reply.js` | Done — needs `OPENAI_API_KEY` |
| Scorecard | `scorecard/index.html` + `netlify/functions/places-details.js` | Done — needs Places key + Baserow table ID |
| Booking Link | `booking/index.html` + `booking/request.html` | Done — needs Booking Requests table ID |
| A6 card flyer | `flyer/flyer-a4-4up-card.html` | Done |
| Shared | `assets/shared.js`, `product-shell.css`, tokens | Done |
| Brand on quote/review/valuation/qr | email/name updated | Done (Quote keeps garage look) |

## Craig still needs to do

1. **Netlify env** (Site settings → Environment variables):
   - `GOOGLE_PLACES_API_KEY` (if not already)
   - `OPENAI_API_KEY` (new — for Reply Writer)
2. **Baserow tables** — see `ops/BASEROW-V2-TABLES.md`, then paste IDs into:
   - `scorecard/index.html` → `SCORECARD_RUNS_TABLE_ID`
   - `booking/index.html` + `booking/request.html` → `BOOKING_REQUESTS_TABLE_ID`
3. **Local check** — open `index.html` in browser, click through six tools at phone width
4. **Deploy when ready** (Cursor terminal from project root):  
   `npx netlify-cli deploy --prod --dir .`  
   Only when Craig asks — free-tier budget.
5. **Flyer print** — open `flyer/flyer-a4-4up-card.html` → Print → A4, margins none, background graphics ON

## Do not

- Redeploy or commit unless Craig asks  
- Invent Baserow tokens  
- Build review “gates” / feedback filters  

## Optional next polish

- Full 9-section rewrite of Quote / Review / Valuation to v2 teaching copy  
- Estate-agent flyer variant  
- Valuation mockup (`£412,000`) on product page  
