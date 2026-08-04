# Grow Local v2 — Build rationale (pre-build confirmation)

Confirmed against `growlocal-copy-and-build-spec-v2.md` and `growlocal-companion-build-doc.md` before implementation.

---

## 1. Flyer — front/back structure

**Format:** A6 portrait card, double-sided, proofed 4-up on A4 with 3mm bleed. Front must work alone.

| Side | Bands | Job |
|------|--------|-----|
| Front | Fascia (Bottle) → Hook (Bone) → QR action → Contact (Bottle) | Who we are, six free tools, scan |
| Back | Narrow Bottle head → numbered six-tool menu → pass-it-on → domain | Keep-worthiness + self-select |

**Why this shape:** Selling one tool made the flyer trade-specific and non-passable. A collection menu proves breadth, creates “which applies to me?”, and gives a non-owner an explicit pass-on line. Universal card only (estate-agent variant later if needed).

**QR:** Encodes hub root `https://grow-local-business.netlify.app/` until `growlocalbusiness.co.uk` is live on Netlify.

---

## 2. Six-item tool list (locked for launch)

1. Instant Quote Form  
2. Google Review QR  
3. Foundation Scorecard *(new)*  
4. Review Reply Writer *(new)*  
5. Booking Link *(new)*  
6. Instant Valuation  

No filters, no framework, no speculative plugins. Six hard-coded Shopfront pages sharing tokens + `shared.js`.

---

## 3. Mobile layout (hub)

- Sticky 56px Bottle header: wordmark left · “See the tools” right  
- Hero: more vertical breath; 2×2 bullets → 1 column under ~640px  
- Phone mock cycles 4s; `prefers-reduced-motion` → state 1 only  
- Tools: editorial rows, whole row clickable  
- Enquiry: stacked on mobile, two columns desktop  
- Test at **360px** first — no horizontal overflow  

---

## 4. Hard constraints (companion §2.2 / §3.3 / §4.2)

### Foundation Scorecard — Places-only
- Score **public** Place Details only. Never claim Q&A, posts, products, messaging, or insights.  
- Copy: “we check what your customers can see.”  
- Cap display score at 95. Never fabricate on API failure.  
- Score never email-gated; PDF/email gate is optional after.

### Review Reply Writer — guardrails
- Under 80 words; thank/acknowledge first; person not brand.  
- No invented facts, liability admissions, compensation, competitors.  
- 1–2★: acknowledge → regret without fault → offline route.  
- Banner: starting point, not final word. No generic fallback template on API failure.

### Booking Link — honesty
- v1 = **request**, not live calendar. Button: **Request this slot**.  
- Permanent line: slots are usual availability; business will confirm.  
- Never mark slots taken from unconfirmed requests; flag clashes to owner.  
- Email notify in v1 (no SMS cost on free product).

---

## 5. Brand rule (v2 §2.7a)

Customer-facing: **Grow Local** only · `hello@growlocalbusiness.co.uk` · **07379 028832** text-first.  
No “automation / consultancy / workflow / AI / solution” on flyer, hub, or product pages.  
Parent company name stays off the site (invoices/contracts only).

---

## 6. Build order (companion Part 6)

1. Shared brand + product shell  
2. Hub + sticky header + six tool rows + ideas form  
3. Review Reply Writer  
4. Foundation Scorecard (+ Place Details)  
5. Booking Link  
6. Existing tools → v2 template/copy/brand  
7. Mockups (all six)  
8. `/about`  
9. A6 flyer card  

Deploy only when Craig asks.
