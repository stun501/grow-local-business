# PRD: Local Business Lead-Magnet Toolkit

**Version:** 1.1 (decisions locked)  
**Status:** Approved for Phase 2 — open questions answered 21 Jul 2026  
**Date:** 21 July 2026  
**Source inputs:** `project-brief.md`, existing `instant-quote-form.html`, `SETUP-GUIDE.md`, stakeholder answers OQ1–OQ5 + trade templates

---

## 1. Product summary

A lightweight, mobile-first web toolkit that supports in-person cold outreach. A business owner scans a QR code, gets a working free digital tool in under 60 seconds, and only gives name + email when they want to download/share. That capture is the consultant’s lead. Each tool also creates warm leads for the business owner’s own customers.

**Primary in-field tool:** Instant Quote Form (garages / trades).  
**Secondary tools:** Google Review QR; Instant Valuation Form (estate agents).  
**Supporting assets:** Hub landing page, master QR, A4 4-up flyer, simple lead admin/export.

---

## 2. Personas & user stories

### 2.1 Consultant (you)

| ID | Story | Acceptance signal |
|----|--------|-------------------|
| C1 | As the consultant, I want a master QR that opens a trustworthy hub, so I can start demos on the spot without typing a URL. | Master QR opens hub on phone; flow usable in a noisy garage. |
| C2 | As the consultant, I want name + email captured when an owner unlocks download/share, so I can follow up for a 30-minute consultation. | Every unlock writes a lead row I can see/export. |
| C3 | As the consultant, I want leads tagged by tool type, company, and timestamp, so I know what I showed and when. | Lead record includes Name, Email, Business, Tool, Consent, Date (± Phone if collected). |
| C4 | As the consultant, I want leave-behind flyers with a scan CTA (no phone on flyer), so declines still get a path back via QR. | Printable A4 4-up PDF with benefit line, QR, brand name; phone only after wow. |
| C5 | As the consultant, I want to update job templates and copy without coding skill, so I can tweak in the field between visits. | Clear ops guide; config in one obvious place (or documented HTML edit). |
| C6 | As the consultant, I want near-zero running cost, so small-scale use stays free. | Static hosting + free-tier lead store; Google Places only for Review QR lookup. |
| C7 | As the consultant, I want my full contact details shown only after the owner has experienced the tool, so the flyer stays low-pressure. | Contact block (Think Beyond Automation, Craig, phone, email) on post-wow / result screens. |

### 2.2 Business owner (garage, salon, agent, etc.)

| ID | Story | Acceptance signal |
|----|--------|-------------------|
| O1 | As an owner, I want to enter only my company name first and see value immediately, so I don’t bounce. | Tool preview/working state appears before email gate. |
| O2 | As a garage owner, I want editable price ranges on common jobs, so I control my numbers. | Can edit/add/remove jobs and prices before finalising. |
| O3 | As an owner, I want a QR + shareable link + website-ready link after name/email, so I can use the tool today. | Result screen offers all three use cases. |
| O4 | As a salon/restaurant owner, I want a branded Google review QR, so customers can leave a review before they leave. | QR opens Google review flow for their business. |
| O5 | As an estate agent, I want a “What’s my home worth?” form that captures seller details, so I get hot leads. | Homeowner can submit postcode + basics + contact; agent gets QR/link. |
| O6 | As an owner, I don’t want a heavy sign-up, so I stay engaged in a busy reception. | No account/password; max fields as specified per stage. |

### 2.3 End customer (garage’s customer, homeowner, etc.)

| ID | Story | Acceptance signal |
|----|--------|-------------------|
| E1 | As a garage customer, I want to pick a job (and optionally vehicle), see a ballpark, and leave name + phone, so I can get a callback. | Customer form works from share link/QR without builder UI. |
| E2 | As a homeowner, I want a rough valuation ballpark and a way to leave details, so an agent can contact me. | Valuation customer flow completes on mobile. |
| E3 | As an end customer, I want no app install and no account, so I finish in seconds. | Single web page; name/phone (or equivalent) only. |

---

## 3. Staged lead-capture flow (shared pattern)

Applies to all three tools unless a tool-specific exception is approved.

| Stage | What user sees | Required inputs | Outcome |
|-------|----------------|-----------------|---------|
| 0 | Scan → hub (3 tool cards) or deep-link into a tool | — | Trustworthy, fast load |
| 1 | Benefit headline + one-line explanation + first input | **Company name only** (A3); Quote also: **pick trade** | Instant generation / edit UI — “wow” moment |
| 2 | Working tool / preview on phone | Tool-specific edits (e.g. prices) | Owner sees real value |
| 2b | Business phone (A3) | **Business phone** before unlock (for customer-facing form / fallback) | Phone captured without blocking wow |
| 3 | Download / share gate | **Name + email** + GDPR consent checkbox | Unlock QR, shareable link, download |
| 4 | Result + consultant contact | — | Counter QR, mid-call link, web/GBP link; **Craig / Think Beyond Automation / phone / email** shown here |

**Consultant brand (locked):** Think Beyond Automation · Craig · 07379028832 · craig@thinkbeyondautomation.com  
**Flyer rule:** QR + benefit copy + brand name only — **no phone on flyer**. Full contact after wow / unlock.  
**Consultant lead fields (minimum):** Name, Email, Business (company), Tool type, Consent (Yes/No), Timestamp, Phone (business).

**Rule:** Never add form fields beyond the brief unless flagged as a conflict with a recommendation (see §8).

---

## 4. Functional requirements

### 4.1 Hub / landing page

| ID | Requirement |
|----|-------------|
| H1 | Hub reachable via master QR URL. |
| H2 | Minimal copy: benefit framing + clear paths into tools (at least Instant Quote first/prominent). |
| H3 | Mobile-first; professional, local-friendly, not corporate/scrappy. |
| H4 | Soft CTA toward booked consultation (does not block free tool). |
| H5 | Load fast on mid-range mobile data. |

### 4.2 Instant Quote Form (Milestone 1 — primary)

| ID | Requirement |
|----|-------------|
| Q1 | Builder + customer modes in one deployable surface (URL hash encodes config). |
| Q2 | Builder step: pick trade → preload `TRADE_TEMPLATES[trade]` (same structure as `DEFAULT_JOBS`). |
| Q3 | Trades: garage, plumber, electrician, locksmith, handyman, roofer, painter, gardener, pest control. |
| Q4 | Universal call-out layer on every non-garage trade (standard / OOH / same-day). Garage keeps vehicle-job defaults. |
| Q5 | Owner can edit job names, from/to prices, add/remove jobs before finalising. |
| Q6 | Support **quote-only / site-visit** jobs (no fake £ range) — customer sees “Request a site visit / callback” instead of a ballpark. |
| Q7 | Live preview of customer-facing form before email gate. |
| Q8 | After name + email + consent: generate QR, shareable link, downloadable QR image. |
| Q9 | Customer flow: pick job → ballpark **or** site-visit CTA → leave name + phone (+ optional vehicle/notes) → confirmation. |
| Q10 | Customer quote requests stored (or graceful fallback if storage unavailable). |
| Q11 | Owner lead stored on unlock (or graceful skip if storage unconfigured). |
| Q12 | Sub-60s path: scan → name → trade → prices → preview. |
| Q13 | Business phone collected after wow, before unlock (A3). |
| Q14 | Result screen shows consultant contact block. |
| Q15 | Embeddable/linkable share URL for website / Google Business Profile. |

**Existing asset:** `instant-quote-form.html` is the baseline — extend with `TRADE_TEMPLATES`, site-visit jobs, A3 phone timing, hub integration. Not a rebuild.

**Trade template data (locked starting points — owner edits anyway):** see Appendix A.

### 4.3 Google Review QR Tool

| ID | Requirement |
|----|-------------|
| R1 | Stage 1: company name → **auto-lookup** Google Place / review link (Places API). |
| R2 | Owner confirms correct business from lookup results before QR generate. |
| R3 | Manual paste fallback if lookup fails or finds nothing. |
| R4 | Instant branded review QR + preview on phone. |
| R5 | Gate on name + email + consent to unlock download/share. |
| R6 | Outputs: printable QR, shareable link, on-phone display for spot scans. |
| R7 | Suitable for salon, barber, dentist, restaurant; also garage bonus. |
| R8 | Owner lead stored with Tool = "Review QR". |
| R9 | Result screen shows consultant contact block. |
| R10 | Places key not exposed raw in static HTML — prefer Netlify Function proxy; document billing/quota. |

### 4.4 Instant Valuation Form (estate agents)

| ID | Requirement |
|----|-------------|
| V1 | Agent builder: company name → configurable form → preview → email gate → QR/link. |
| V2 | Homeowner flow: postcode + property basics → **rough guide** ballpark (heuristic) → leave contact. |
| V3 | Clearly labelled as rough guide only — not a formal valuation. |
| V4 | Agent receives QR, shareable link, embeddable/linkable form. |
| V5 | Homeowner leads stored for the agent; owner (agent) lead stored at unlock. |
| V6 | Same staged friction pattern (A3 phone timing). |
| V7 | Result screen shows consultant contact block. |

### 4.5 Print & master QR

| ID | Requirement |
|----|-------------|
| P1 | A4 flyer, 4-up, cuttable: benefit headline, one line copy, "Scan to start free" + QR, **Think Beyond Automation**. **No phone on flyer.** |
| P2 | Master QR asset (PNG/SVG) pointing at **hub** URL; suitable full-screen on phone. |
| P3 | Flyer QR = hub URL. |

### 4.6 Admin / lead access

| ID | Requirement |
|----|-------------|
| A1 | View owner leads + customer/homeowner leads via Baserow. |
| A2 | CSV export without custom CRM for MVP. |
| A3 | GDPR consent at email step; stored with lead. |
| A4 | Create-only API token if client-visible. |

---

## 5. Non-functional requirements

| ID | Requirement | Target |
|----|-------------|--------|
| N1 | Mobile-first | Primary test viewport ~390×844; desktop secondary. |
| N2 | Time-to-value | ≤ 60 seconds from scan to working tool preview. |
| N3 | Performance | First meaningful paint usable on 4G; prefer static assets, minimal JS. |
| N4 | Cost | £0–low at small scale (free hosting + free lead DB tier). |
| N5 | Maintainability | Non-developer can change prices, copy, consent text via guide; no framework required for MVP. |
| N6 | Privacy (UK GDPR) | Lawful basis via consent checkbox; no more personal data than needed; clear purpose text. |
| N7 | Resilience | Tools remain usable if lead API fails; show honest fallback to end customers. |
| N8 | Accessibility (pragmatic) | Labels, focus states, 16px inputs, readable contrast. |
| N9 | Branding | Clean, trustworthy, local-friendly; shared visual system across tools. |

---

## 6. Data model

### 6.1 Owner Leads (consultant prospects)

| Field | Type | Notes |
|-------|------|--------|
| Name | text | Required at gate |
| Email | email | Required at gate |
| Business | text | From stage 1 |
| Phone | text | Optional / if collected |
| Tool | text | e.g. Instant Quote Form / Review QR / Valuation Form |
| Consent | text | Yes / No |
| Date | text/ISO | Timestamp |

### 6.2 Customer Quote Requests (garage’s leads)

| Field | Type |
|-------|------|
| Customer name | text |
| Phone | text |
| Vehicle | text (optional) |
| Job | text |
| Price range | text |
| Business | text |
| Date | text/ISO |

### 6.3 Valuation Leads (agent’s homeowner leads) — proposed

| Field | Type |
|-------|------|
| Customer name | text |
| Phone or Email | text (TBD — recommend phone for parity with quote tool) |
| Postcode | text |
| Property basics | text or structured fields |
| Ballpark | text |
| Business (agency) | text |
| Date | text/ISO |

### 6.4 Access / export

- **MVP recommendation:** Baserow (already specified in `SETUP-GUIDE.md`) as spreadsheet-like UI + CSV export.  
- No custom admin app required for MVP if Baserow UI is acceptable.  
- Optional later: thin read-only admin page (out of scope unless you request it).

---

## 7. Tech stack proposal

| Layer | Choice | Justification |
|-------|--------|----------------|
| App shape | Static HTML/CSS/JS site (`index.html` hub + tool pages) | Matches existing quote form; zero build step; easy to edit. |
| Hosting | Netlify (free) | Drag-drop/git deploy; HTTPS; Functions for Places proxy. |
| QR generation | Client-side (qrcodejs) | No server. |
| Lead storage | Baserow free tier + create-only API token | Spreadsheet UX; CSV export; already in setup guide. |
| Config encoding | URL hash payload for per-business tool state | No per-business DB. |
| Review lookup | Google Places API via **Netlify Function** proxy | Auto-lookup without exposing key in page source. |
| Valuation ballpark | Transparent UK rough-guide heuristic | Cheap, explainable; labelled “rough guide only”. |
| Print | HTML print stylesheet → PDF (or print-ready HTML) | A4 4-up cuttable. |

**Not recommended for MVP:** React/Next, custom backend/CRM, property data APIs.

---

## 8. Decisions locked (21 Jul 2026)

| ID | Decision |
|----|----------|
| OQ1 | **A3** — company name (and trade pick) first for wow; business phone before unlock. |
| OQ2 | **Auto-lookup** Google Place/review via Places API (+ manual paste fallback). |
| OQ3 | Valuation = **rough guide** heuristic only. |
| OQ4 | Brand: **Think Beyond Automation** · **Craig** · **07379028832** · **craig@thinkbeyondautomation.com**. Flyer: **no phone**. Full contact after wow / unlock / result. |
| OQ5 | Master QR → **hub with 3 tool cards**. |
| Trades | Full `TRADE_TEMPLATES` in Milestone 1 (not garage-only later). |
| Site-visit jobs | Quote-only jobs allowed (e.g. full re-roof) — no fake price. |
| OQ6–11 | Baserow yes; valuation phone required; free Netlify URL first; soft consult CTA on results; shared design tokens. |

### Resolved conflicts

- **A (phone):** A3 locked.  
- **B (trades):** Full trade set in M1 via `TRADE_TEMPLATES`.  
- **C (review find):** Auto-lookup locked; Netlify Function recommended.  
- **D (valuation):** Rough guide locked.  
- **Flyer phone:** Brief asked for phone on flyer; stakeholder override — **QR only on flyer**, contact after experience.

---

## 9. Out of scope (MVP)

- Owner accounts / logins / dashboards  
- Paid tiers / billing  
- Full GBP optimisation product (sold as consultation)  
- Custom AI workflows product  
- Native apps / multi-language  
- Email automation beyond storing the lead  
- Guaranteed / live property valuations  
- Heavy analytics  
- Per-business CMS  

---

## 10. Success criteria (testable)

1. Scan → working tool preview ≤ 60s on ~390px viewport.  
2. Unlock requires name + email + consent; Owner Lead row created.  
3. Quote customer request creates Customer Quote Request row (when configured).  
4. Review QR opens valid Google review journey for confirmed Place.  
5. Valuation produces rough guide + captures homeowner lead.  
6. A4 4-up flyer (no phone) + master QR ready.  
7. Ops guide covers leads export, price edits, adding trades, Places key.  
8. Cost stays free/low at demo scale (Places usage monitored).

---

## 11. Current codebase baseline

| Asset | State |
|-------|--------|
| `instant-quote-form.html` | Working dual-mode prototype |
| `SETUP-GUIDE.md` | Hosting + Baserow instructions |
| Review / Valuation / Hub / Flyer | Not built |
| Shared design system | Not extracted |

Extend and integrate — do not discard the quote prototype.

---

## Appendix A — Trade templates (locked starting points)

Job shape: `{ name, lo, hi }` or `{ name, quoteOnly: true }` for site-visit jobs.

### Universal call-out (prepend to every non-garage trade)

- Standard call-out / assessment: £50–£90  
- Out-of-hours or emergency call-out: £90–£150  
- Same-day call-out: £70–£120  

### Garage (existing defaults — no call-out layer required)

Front brake pads £90–£160; Full service £150–£260; Interim service £90–£150; MOT £40–£55; Clutch £450–£900; Timing belt £280–£550; Battery supply & fit £110–£190; Diagnostics £45–£80.

### Plumber (+ call-out)

Leak/dripping tap £70–£140; Blocked drain/toilet £80–£150; Boiler service £70–£110; Boiler repair (no parts) £120–£250; New toilet/tap fit £100–£200; Emergency burst pipe £120–£220.

### Electrician (+ call-out)

Fault finding £70–£150; Socket/switch install £50–£90; Consumer unit upgrade £350–£650; Full rewire (per room) £600–£1,200 **or quote-only if preferred**; PAT/safety check £80–£150; EV charger £600–£1,000.

### Locksmith (+ call-out)

Lockout (non-emergency) £60–£100; Emergency lockout £90–£150; Lock change £70–£130; Lock upgrade (BS) £120–£220.

### Handyman (+ call-out)

Hourly £30–£50; Half-day £120–£200; Furniture assembly £40–£90; General repairs £50–£150.

### Roofer (+ call-out)

Roof inspection £60–£100; Minor repair £150–£350; Gutter clean/repair £80–£180; **Full re-roof: quoteOnly** (“request a site visit”).

### Painter & decorator (+ call-out)

Single room £250–£450; Interior per room £200–£400; Exterior wall/fascia £400–£900.

### Gardener / landscaper (+ call-out)

Standard visit £40–£70; Full clearance £150–£350; Hedge trimming £60–£120.

### Pest control (+ call-out)

Standard treatment £80–£150; Wasp nest £70–£100; Rodent treatment £150–£300.

**Building rule:** Never invent a ballpark for jobs that need a site visit — use `quoteOnly` and customer CTA “This one needs a site visit — request a callback.”

---

## 12. Phase gate

PRD v1.1 decisions locked. Proceed to **Phase 2 — Delivery Plan**, then Phase 3 execution on plan approval.
