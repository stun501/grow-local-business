---
name: grow-local-website
description: >-
  Rebuild or extend the Grow Local free-tools website for established local
  businesses (Shopfront design, six tools, Baserow leads, Netlify functions,
  SMTP2GO operator alerts). Use when recreating growlocalbusiness.co.uk,
  implementing Scorecard/Quote/Review/Reply/Booking/Valuation, flyer/planner
  print assets, or continuing Grow Local v2 work from scratch.
---

# Grow Local Website — Rebuild Skill

Definitive guide to recreate **Grow Local** (`www.growlocalbusiness.co.uk`) to the same standard on the first attempt.

**Product:** Free tools site for **established local businesses with a physical operation** (garages, trades, clinics, agents, professional services). Not micro-retail, not “high street” framing, not Think Beyond branding on customer surfaces.

**Stack:** Static HTML/CSS/JS on Netlify + Netlify Functions + Baserow (create-only) + Google Places + OpenRouter LLM + SMTP2GO operator email.

## When to use this skill

- Greenfield rebuild of Grow Local
- Adding a tool or page in the same pattern
- Resuming work after a long gap
- Checking brand, journey, Baserow, or deploy rules before editing

## Authoritative sources (read in this order)

1. `growlocal-copy-and-build-spec-v2.md` — voice, landing, product template
2. `growlocal-companion-build-doc.md` — mockups, Scorecard/Reply/Booking/Valuation PRDs
3. `growlocal-flyer-spec.md` — flyer wins on flyer conflicts
4. `growlocal-sutherland-implementation.md` — scorecard-first / implementation amendments
5. `growlocal-about-us-page.md` — About page
6. `ops/BASEROW-V2-TABLES.md` — live table IDs and date rules
7. `TOOL-STACK.md` + `ops/NETLIFY-DEPLOY.md` — hosting and secrets
8. This skill’s references (below) for the as-built architecture

Ignore stale “Think Beyond” / three-tool / Resend / ISO-date-for-Scorecard-Runs guidance in older ops docs.

## Progressive disclosure

- [architecture.md](architecture.md) — routes, files, functions, env, Baserow IDs
- [tools-and-journeys.md](tools-and-journeys.md) — each tool’s UX and data flow
- [design-and-copy.md](design-and-copy.md) — Shopfront tokens, voice, hard avoid rules
- [ops-and-deploy.md](ops-and-deploy.md) — Netlify, SMTP2GO, print assets, smoke tests

## Hard constraints (never violate)

| Rule | Detail |
|------|--------|
| Brand on customer UI | Grow Local only; `hello@growlocalbusiness.co.uk`; `07379 028832` (text-first) |
| Audience | Established local businesses with physical ops — not corner shops / market stalls |
| Design | Shopfront: Bottle/Bone/Gold/Brass; Fraunces + Archivo; **no** gradients, drop shadows, or pure white |
| Copy | No “Think Beyond”, “automation”, “workflow”, “AI”, “solution”, “high street”; avoid em dashes (—) |
| Journey | Product → `/{tool}/build/` → results/preview → unlock when justified → `/{tool}/done/` + “Where to use it” |
| Unlock | Name/email unlocks **on-page** value (report, QR, link, downloads). **Do not** email reports/files to users |
| Consent | Keep GDPR line (“It’s fine to email me about this tool…”). Do not add nudge/reminder checkboxes |
| Secrets | Never commit `.env`. LLM / Places / SMTP2GO keys only in Netlify env. Baserow create-only token may live in page CONFIG |
| Dates | Scorecard Runs + Booking Requests: `YYYY-MM-DD` via `TBA.baserowDateToday()` — never ISO datetime |
| Functions | Do not break working Places / Reply / notify-lead while doing UX work |
| Deploy | Prefer Netlify deploy when asked to go live; do not commit/push unless asked |

## Rebuild order (greenfield)

Copy this checklist and work top to bottom:

```
Rebuild progress:
- [ ] 1. Scaffold Netlify static site + netlify.toml redirects
- [ ] 2. Design tokens + product shell + shared.js brand/Baserow helpers
- [ ] 3. Landing page (hero, six tool cards, enquiry → Tool Ideas)
- [ ] 4. About + book + qr pages
- [ ] 5. tool-flow.js (sessionStorage handoff + step history)
- [ ] 6. Scorecard build/done + places-search/details functions
- [ ] 7. Quote build/done + customer #q= mode + trades (Salon first, Custom last)
- [ ] 8. Review build/done + places-search
- [ ] 9. Reply build/done + review-reply function (OpenRouter-compatible)
- [ ] 10. Booking build/done + request.html customer page
- [ ] 11. Valuation build/done + #v= homeowner mode + heuristic
- [ ] 12. notify-lead (SMTP2GO) wired from shared.js after key Baserow tables
- [ ] 13. Flyer A5 arms + flyer hub + A2 planner
- [ ] 14. Baserow tables + CONFIG IDs + create-only token
- [ ] 15. Netlify env vars + production deploy + smoke tests
```

## Canonical architecture (summary)

```
/{tool}/           marketing / teaching copy (product page)
/{tool}/build/     ONLY live generator (edit here first)
/{tool}/done/      sessionStorage result + “Where to use it”
assets/shared.js   window.TBA — brand, Baserow, notifyOperator
assets/tool-flow.js window.GLFlow — save/load/goToDone/pushStep
netlify/functions/ places-search, places-details, review-reply, notify-lead
```

Customer share links use hash payloads (no server accounts):

- Quote `#q=` · Review `#r=` · Valuation `#v=` · Booking `#bk=` on `booking/request.html`

## Unlock vs notify (do not confuse)

| Concern | Who | Mechanism |
|---------|-----|-----------|
| Unlock | Visitor | Name/email → show full report / QR / downloads on page |
| Operator alert | Craig | After Baserow create → `notify-lead` → SMTP2GO → hello@ |

Both can coexist. Never change unlock copy to “we'll email you the report.”

## Baserow tables (live IDs)

| Table | ID | Notify Craig? |
|-------|-----|---------------|
| Owner Leads | 1092861 | Yes |
| Customer Leads | 1092866 | Yes |
| Valuation Leads | 1092867 | Yes |
| Tool Ideas | 1092868 | Yes |
| Booking Requests | 1098285 | Yes |
| Scorecard Runs | 1098284 | No |

## Design quick reference

- Tokens: `assets/tokens-shopfront.css`
- Shell: `assets/product-shell.css`
- Colors: Bottle `#12291F`, Bone `#F2EFE6`, Gold `#C6A15B`, Brass `#A8813C`, Ink `#0E1613`
- Fonts: Fraunces (display), Archivo (body), Archivo Narrow (utility eyebrows)
- Do not use legacy `assets/shared.css` lime/teal for new pages

## Implementation best practices

1. **Edit `/build/` first** — product pages may hide duplicate generators; live CTAs hit build.
2. **Value before capture** — show a real preview before asking for email.
3. **Broken Baserow must not break tools** — catch errors; still deliver the asset.
4. **Operator email is fire-and-forget** — never block unlock UX on notify failure.
5. **Browser Back** — use `GLFlow.pushStep` + `bindStepHistory` on multi-step wizards; do not break `goToDone`.
6. **Scorecard unlock once** — if unlocked on build (`emailed`/`unlocked`), hide `#doneCaptureCard` on done.
7. **Reply Writer** — draft first with no gate; never fall back to canned reply templates; keys server-side only.
8. **Valuation** — ballpark heuristic, honest “estimate” framing; journey: name → demo → phone → preview (phone shown) → unlock → QR.
9. **Quote trades** — Salon top; no Handyman; “Create Custom Quote Form” last (empty editable board).
10. **Print** — A5 flyer trim 148×210mm with 4mm bleed; flyer wins from `growlocal-flyer-spec.md`.

## Smoke test after every deploy

1. Landing loads on `www.growlocalbusiness.co.uk` (no 404s on six tools)
2. Scorecard: search → score → unlock once → done has no second unlock
3. Quote: Salon/Custom present; unlock → done QR
4. Review / Reply / Booking / Valuation: happy path to done or customer hash
5. Baserow row appears for unlock
6. Operator email arrives at hello@ (except Scorecard Runs)
7. Reply Writer returns a draft (or clear failure + text-us line — never canned)

## Out of scope for v2 (do not invent)

- User accounts / OAuth GBP owner login
- Emailing PDFs/reports to visitors
- SMS operator alerts (email only)
- Analytics / cookie banners (unless later required)
- Cal.com as default booking (optional later; current is DIY booking link)

## After rebuild

Run the Final Project Review checklist in the user-facing summary for this skill session, or open `ops/BASEROW-V2-TABLES.md` + live site and compare against [architecture.md](architecture.md).
