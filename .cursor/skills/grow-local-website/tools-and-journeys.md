# Grow Local — Tools & Journeys

## Shared owner journey

```
Product page (teaching copy + CTA)
  → /{tool}/build/  (wizard only)
  → show value / preview
  → unlock with name + email + consent (when justified)
  → Baserow Owner Leads (+ operator email)
  → GLFlow.goToDone → /{tool}/done/
  → “Where to use it” placements + related tools
```

**Rules**

- Generators live on `/build/`. Keep product pages as marketing unless hash customer mode requires logic there.
- Unlock gates on-page assets only — never promise email delivery of reports/files.
- Consent copy stays; no fortnight/month nudge checkboxes.

---

## 1. Google Listing Scorecard

**Purpose:** Score a public Google listing out of 100; show top three gaps; unlock full nine-category breakdown.

**Paths:** `scorecard/` → `scorecard/build/` → `scorecard/done/`

**Steps (build):** search → pick / none / error / closed → scoring → result (capture + full report)

**APIs:** `places-search`, `places-details` (public data only; photo count not image proxy)

**Baserow:** Owner Leads on unlock; Scorecard Runs on every run (no operator email)

**UX requirements**

- Intro (“Type your business name…”) hides once scoring/results show; results headline e.g. “Your listing score”
- Empty profile photo circle stays hidden when no photo URL
- Unlock once: payload `unlocked` / `emailed` → hide `#doneCaptureCard` on done; strip injected `#captureCard`
- Browser Back via `GLFlow` step history

---

## 2. Instant Quote Form

**Purpose:** Trade price board → shareable customer form with ballpark prices.

**Paths:** `quote/` → `quote/build/` → `quote/done/` · customer `quote/index.html#q=`

**Steps:** name + trade → prices (+ phone) → preview + unlock → done (QR/link)

**Trades (order matters)**

1. Salon (first)
2. Garage, Plumber, Electrician, Locksmith, Roofer, Painter, Gardener, Pest Control
3. Create Custom Quote Form (last) — empty editable job list, no call-outs

**Do not include Handyman.**

**Landing audience tag:** `Garages · Trades · Salons · Any business that quotes`

**Baserow:** Owner Leads (unlock); Customer Leads (customer submit)

**Encode:** base64url JSON in `#q=` (supports quote-only / site-visit jobs)

---

## 3. Google Review QR

**Purpose:** Find listing → Google review URL → QR + shareable link.

**Paths:** `review/` → `review/build/` → `review/done/` · display `#r=`

**Steps:** search → pick / fallback → preview → capture unlock → done

**API:** `places-search`; manual URL fallback if zero results

**Baserow:** Owner Leads

---

## 4. Review Reply Writer

**Purpose:** Draft a short UK-English owner reply to a review.

**Paths:** `reply/` → `reply/build/` → `reply/done/`

**Journey difference:** Draft first — **no email gate** before generation. Optional “Save my profile” → Owner Leads (include Business type).

**API:** `review-reply` (OpenAI-compatible; OpenRouter preferred)

**On-screen line:** “Read it before you post it — this is a starting point, not the final word.”

**Safety (system prompt):** no invented facts, no liability admission, no public point-by-point dispute, no refunds/discounts, no competitor names; injury/legal → move offline.

---

## 5. Booking Link

**Purpose:** Weekly hours + slot length → shareable booking request link (not instant calendar sync).

**Paths:** `booking/` → `booking/build/` → `booking/done/` · customer `booking/request.html#bk=`

**Owner:** configure days/hours/slot length + notify email → unlock → QR/link

**Customer:** pick slot (Europe/London, 14-day horizon, ~2h lead) → name/mobile/what-for → Booking Requests

**Baserow:** Owner Leads; Booking Requests (`Date` = YYYY-MM-DD)

**Clash:** best-effort; never block the booking. Create-only token cannot reliably read conflicts.

---

## 6. Instant Valuation

**Purpose:** Agent-branded ballpark for homeowners; not a true AVM.

**Paths:** `valuation/` → `valuation/build/` → `valuation/done/` · homeowner `valuation/#v=`

**Owner journey (required order)**

1. Agency name  
2. Demo property inputs  
3. Business phone  
4. Full homeowner preview (**phone shown on preview**)  
5. Unlock name/email → QR + `#v=` link  
6. Done / placements  

Do **not** ask name/email immediately after phone.

**Maths guidance**

- Base £/bedroom + postcode area factor + condition multiplier
- Range ±15% (`rangeSpread: 0.15`)
- Keep honest “estimate / local averages” framing
- Calibrate toward realistic UK asking prices; keep Needs work < Average < Good < Excellent (do not invert multipliers)
- Update both `valuation/build/` and `valuation/index.html` if heuristic is duplicated

**Baserow:** Owner Leads; Valuation Leads (homeowner)

---

## Landing page

**File:** `index.html`

Must include:

- Brand-forward hero (Grow Local as hero-level signal)
- Headline treatment per current live copy; gold accent on “Nothing to pay” where specified
- Six tool cards with audience tags + outcomes
- Enquiry / Tool Ideas form → Baserow `1092868` + operator notify
- Text-first contact path

Audience positioning: established local businesses with physical operations — examples like kitchen fitter, accountancy practice, dental surgery.

---

## About + book

- `about/index.html` — from `growlocal-about-us-page.md`
- `book/index.html` — free chat CTA (Calendly embed or booking fallback)

---

## Multi-step Back button

For Quote, Scorecard, Review, Valuation (and any future stepped tools):

```js
function applyStep(step) { /* toggle UI only */ }
function show(step) {
  applyStep(step);
  GLFlow.pushStep("toolId", step);
}
GLFlow.bindStepHistory("toolId", applyStep, "first-step-id");
```

Do not push history inside the restore callback.
