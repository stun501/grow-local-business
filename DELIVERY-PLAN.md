# Delivery Plan: Local Business Lead-Magnet Toolkit

**Based on:** PRD v1.1 (decisions locked 21 Jul 2026)  
**Status:** Grow Local rebrand + M1–M3 live; flyer QR needs Netlify URL before field use  
**Primary brand:** Grow Local (product) · Think Beyond Automation (consultant, subtle)

---

## Priority order (fixed)

1. **M1** — Instant Quote Form + hub shell + lead capture (primary in-field tool)  
2. **M2** — Google Review QR Tool (Places auto-lookup)  
3. **M3** — Instant Valuation Form (rough guide)  
4. **M4** — Flyer (A4 4-up), master QR, ops/handover docs, Baserow tables for all tools  

M1 is the critical path. M2/M3 can partially parallelise after shared shell contracts exist. M4 print assets can start early once hub URL is known (placeholder QR until deploy).

---

## Target site structure

```
/
  index.html              ← Hub (3 tool cards) — master QR target
  quote/
    index.html            ← Instant Quote (builder + customer)
  review/
    index.html            ← Review QR tool
  valuation/
    index.html            ← Valuation form
  assets/
    shared.css            ← Design tokens / shared shell
    shared.js             ← Baserow helper, contact block, consent copy
    master-qr.png         ← Generated after deploy URL known
  flyer/
    flyer-a4-4up.html     ← Print-ready A4 4-up (no phone)
  netlify/
    functions/
      places-search.js    ← Places API proxy (M2)
  ops/
    OPERATIONS-GUIDE.md
    SETUP-GUIDE.md        ← Updated from existing
```

**Interface contracts (all tools):**

| Contract | Spec |
|----------|------|
| Owner lead row | `{ Name, Email, Business, Phone, Tool, Consent, Date }` → Baserow Owner Leads |
| Staged flow | Name(+trade) → wow/preview → business phone → name+email+consent → result + consultant contact |
| Consultant contact | Think Beyond Automation · Craig · 07379028832 · craig@thinkbeyondautomation.com — **result screens only** |
| Share config | URL hash / query encoding per tool (no per-business DB) |
| Design tokens | CSS variables in `shared.css` (ink, paper, accent, type scale, buttons, cards) |

---

## Milestone 1 — Instant Quote + Hub + Leads

**Goal:** Demo-ready garage/trades quote tool from master QR → hub → quote, with Baserow capture.

### Deliverables

| # | Deliverable |
|---|-------------|
| D1.1 | Hub `index.html` — Think Beyond Automation branding, 3 tool cards (Quote live; Review/Valuation “coming soon” or linked if ready) |
| D1.2 | Quote tool extended from `instant-quote-form.html`: trade picker + `TRADE_TEMPLATES` (Appendix A) |
| D1.3 | A3 flow: company name → trade → price board → preview → **business phone** → name+email+consent → QR/link |
| D1.4 | `quoteOnly` / site-visit jobs (customer CTA, no fake £) |
| D1.5 | Customer mode: job pick → ballpark or site-visit → name+phone (+ optional vehicle/notes) |
| D1.6 | Shared CSS/JS shell + consultant contact on result |
| D1.7 | Baserow wiring documented; Owner + Customer tables |
| D1.8 | Soft consult CTA on result (non-blocking) |

### Acceptance criteria

- [ ] Mobile (~390px): scan hub → Quote → preview working tool in ≤ 60s  
- [ ] Stage 1 does **not** ask for phone; phone appears before unlock  
- [ ] All 9 trades preload plausible jobs; owner can edit/add/remove  
- [ ] Roofer “Full re-roof” (and similar) shows site-visit path, not a fake range  
- [ ] Unlock writes Owner Lead; customer request writes Customer Quote Request (when Baserow configured)  
- [ ] Without Baserow, tool still works; customer sees phone fallback when available  
- [ ] Result shows QR, copy link, download QR, and full consultant contact  
- [ ] Flyer **not** required for M1 exit (M4)

### Dependencies

- Baserow account + tables (you can set up in parallel using ops instructions)  
- Netlify (or local static server) for share links/QR

### Effort

**~1–1.5 days** (extend existing prototype; hub + templates + A3 + site-visit)

### Parallel workstreams (M1)

| Stream | Owner | Can start |
|--------|-------|-----------|
| WS-A Shared shell + hub | Subagent | Immediately |
| WS-B Quote logic (trades, A3, quoteOnly, customer) | Subagent | Immediately (integrate shared.css after WS-A) |
| WS-C Lead/Baserow config + setup doc refresh | Subagent / lead | Immediately |
| WS-D Flyer draft layout (placeholder QR) | Subagent | Immediately (finish in M4 with real URL) |

---

## Milestone 2 — Google Review QR

**Goal:** Owner types business name → Places lookup → confirm → branded review QR → gate → download/share.

### Deliverables

| # | Deliverable |
|---|-------------|
| D2.1 | `review/index.html` — staged flow matching PRD |
| D2.2 | Netlify Function `places-search` (Text Search / Find Place → Place ID → review URL) |
| D2.3 | Confirm-business UI + manual URL paste fallback |
| D2.4 | QR + share link + download; Owner Lead `Tool=Review QR` |
| D2.5 | Hub card unlocked to live Review tool |
| D2.6 | Ops: how to create Google Cloud key, restrict, set Netlify env var |

### Acceptance criteria

- [ ] Search by name returns candidates; owner picks one  
- [ ] Generated QR opens Google review / write-review journey for that Place  
- [ ] Lookup failure → clear message + paste fallback still completes flow  
- [ ] Name+email+consent gate before download; lead stored  
- [ ] Consultant contact on result; no phone on flyer (unchanged)  
- [ ] API key only in Netlify env / function — not in client HTML  

### Dependencies

- M1 shared shell contracts  
- Google Cloud project + Places API enabled + billing (even if free credits)  
- Netlify Functions support (not pure drag-drop of one HTML file alone for Review)

### Effort

**~1 day** (UI + function + fallback + docs)

### Parallelisation

- After M1 shell exists: Review UI and Places function can run in parallel  
- Valuation (M3) can start in parallel with M2 (no Places dependency)

### Technical note (flag)

Places **requires** a Google Cloud billing account. Cost at outreach scale is usually pennies; still not £0. **Recommendation:** proceed with Function proxy + strict key restrictions + daily quota. If you later want zero Google cost, switch lookup off and keep paste-only.

---

## Milestone 3 — Instant Valuation Form

**Goal:** Estate agent gets “What’s my home worth?” rough-guide form with QR/link and homeowner lead capture.

### Deliverables

| # | Deliverable |
|---|-------------|
| D3.1 | `valuation/index.html` — builder + homeowner modes (hash config) |
| D3.2 | Rough-guide heuristic (postcode area + beds/type/condition multipliers); labelled clearly |
| D3.3 | A3 staged capture; Owner Lead + Valuation Leads Baserow table |
| D3.4 | Hub card live |
| D3.5 | Ops: how to tweak heuristic constants |

### Acceptance criteria

- [ ] Agent: name → preview → phone → email gate → QR/link ≤ 60s to preview  
- [ ] Homeowner: postcode + basics → rough £ range + disclaimer → name+phone → stored  
- [ ] Copy never claims formal valuation / RICS  
- [ ] Consultant contact on result  

### Dependencies

- M1 shared shell + Baserow pattern  
- Independent of Places

### Effort

**~0.75–1 day**

---

## Milestone 4 — Print assets, master QR, handover

**Goal:** You can print leave-behinds, point master QR at hub, run leads, and maintain tools without a developer.

### Deliverables

| # | Deliverable |
|---|-------------|
| D4.1 | `flyer/flyer-a4-4up.html` (or PDF) — benefit headline, one line, Scan CTA, hub QR, **Think Beyond Automation only — no phone** |
| D4.2 | `assets/master-qr.png` (+ full-screen HTML helper optional) |
| D4.3 | `ops/OPERATIONS-GUIDE.md` — view/export leads; edit prices/trades; consent copy; add trade; Places key; deploy |
| D4.4 | Updated `SETUP-GUIDE.md` for multi-page Netlify + Functions + all Baserow tables |
| D4.5 | Handover summary: delivered vs milestones, limitations, next improvements |

### Acceptance criteria

- [ ] Print A4 → cut into 4 usable leave-behinds  
- [ ] Master QR opens hub on phone  
- [ ] Non-developer can follow ops guide for export + price edit  
- [ ] Deploy checklist completed (or local deployable with clear steps)  

### Dependencies

- Live (or final) hub URL for QR encoding  
- M1–M3 feature-complete preferred (flyer can use hub URL earlier)

### Effort

**~0.5 day**

---

## Parallelisation map

```
Week-shaped critical path (illustrative):

  [WS-A Hub + shared.css/js] ──┬──► integrate ──► M1 verify ──► M1 done
  [WS-B Quote trades/A3/...] ──┤
  [WS-C Baserow docs] ─────────┘
  [WS-D Flyer draft] ──────────────────────────────► M4 finalise QR URL

           M1 done
             │
             ├──► [WS-E Review UI] ──┬──► M2 verify
             │    [WS-F Places fn] ──┘
             │
             └──► [WS-G Valuation] ──► M3 verify

             M2+M3 done ──► M4 print + ops + handover
```

**Independent after M1 contracts:** Review UI, Places function, Valuation, Flyer polish.  
**Lead agent (integrator):** merges shared styles, checks acceptance criteria, E2E mobile verify per milestone, resolves conflicts.

---

## Verification protocol (after each milestone)

1. Phone-sized viewport (DevTools or real phone)  
2. Full path: scan/hub → generate → use customer path → unlock → confirm Baserow row (or mock)  
3. Fail Baserow on purpose once → confirm graceful fallback  
4. Fix defects before starting next milestone’s “done”  

---

## Subagent task specs (Phase 3 starter pack)

### WS-A — Shared shell + hub

- **In:** PRD branding, 3-card hub, contact-after-wow rule, design tokens  
- **Out:** `index.html`, `assets/shared.css`, `assets/shared.js` (contact block renderer, consent default text)  
- **AC:** Hub mobile-first; Quote card primary; Review/Valuation cards present; no phone on hub hero  

### WS-B — Quote tool

- **In:** Existing `instant-quote-form.html`, Appendix A templates, A3, quoteOnly rule  
- **Out:** `quote/index.html` using shared assets  
- **AC:** All trades; site-visit jobs; customer hash mode; Baserow fields match PRD  

### WS-C — Leads / setup

- **In:** SETUP-GUIDE, data model  
- **Out:** Updated setup for 3 tables (Owner, Customer Quote, Valuation); create-only token notes  
- **AC:** Field names exact; copy-paste CONFIG block  

### WS-D — Flyer

- **In:** Brand, no-phone rule, placeholder or real hub URL  
- **Out:** Print-ready A4 4-up  
- **AC:** Cut marks / equal quadrants; scannable QR  

### WS-E/F — Review + Places

- **In:** Shared shell, R1–R10  
- **Out:** `review/index.html` + `netlify/functions/places-search.js`  
- **AC:** Lookup + confirm + fallback; key server-side only  

### WS-G — Valuation

- **In:** Shared shell, rough-guide rules  
- **Out:** `valuation/index.html`  
- **AC:** Disclaimer + heuristic + dual mode + Baserow  

---

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Places billing surprise | Quota caps; Function-only key; paste fallback always available |
| Hash URLs get long | Compress job payload; warn if over ~2k chars |
| Design drift across tools | Integrator enforces `shared.css` only |
| Baserow CORS/token | Already proven in prototype; create-only token |

---

## Approval checkpoint

Reply **“approve plan”** (or list changes) to start Phase 3.  

On approval I will:
1. Spawn parallel subagents for WS-A, WS-B, WS-C, WS-D  
2. Integrate and run M1 mobile E2E verification  
3. Then parallelise M2 + M3, finish M4 handover  

**One action for you before/during M2:** create a Google Cloud project and enable Places API (I’ll give click-by-click steps when we reach M2). Baserow can be set up anytime using the existing guide pattern.
