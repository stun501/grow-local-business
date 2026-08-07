# Grow Local — Ops & Deploy

## Secrets

| Where | What |
|-------|------|
| Netlify env | `GOOGLE_PLACES_API_KEY`, `LLM_API_KEY` / `OPENROUTER_API_KEY`, `LLM_*`, `SMTP2GO_API_KEY`, optional `NOTIFY_TO` / `NOTIFY_FROM` |
| Page CONFIG | Baserow create-only token + table IDs (intentional client POST) |
| Local `.env` | Ops scripts / local function tests — **never commit** |

`.gitignore` must include `.env`, `.env.*` (keep `.env.example`), and `.netlify`.

## Baserow tables

See `ops/BASEROW-V2-TABLES.md`.

| Table | ID |
|-------|-----|
| Owner Leads | 1092861 |
| Customer Leads | 1092866 |
| Valuation Leads | 1092867 |
| Tool Ideas | 1092868 |
| Scorecard Runs | 1098284 |
| Booking Requests | 1098285 |

**Date rule:** Scorecard Runs + Booking Requests require `YYYY-MM-DD` (`TBA.baserowDateToday()`).

**Owner Leads** may include Business type (Reply Writer); keep that field.

Create-only token: browser POSTs rows; do not rely on PATCH/read for critical UX.

## Operator notifications (SMTP2GO)

1. Verify sender domain in SMTP2GO for `growlocalbusiness.co.uk`
2. Netlify env: `SMTP2GO_API_KEY` (+ optional `NOTIFY_TO` / `NOTIFY_FROM` = `hello@growlocalbusiness.co.uk`)
3. Function: `netlify/functions/notify-lead.js` → `POST https://api.smtp2go.com/v3/email/send`
4. Wired from `assets/shared.js` after successful `baserowAdd` on notify tables
5. Scorecard Runs are **not** notified
6. Never email the visitor a report

**Local test pattern:** load `.env`, `require` the function handler, POST a fake Owner Lead payload; expect `{ ok: true, email_id }`.

## Google Places

Guide: `ops/GOOGLE-PLACES-SETUP.md`

- Enable Places API; restrict key as appropriate
- Set `GOOGLE_PLACES_API_KEY` on Netlify and redeploy functions
- Search biases UK; details omit photo binary URLs by design

## Reply Writer LLM

- Provider-agnostic OpenAI-compatible chat completions
- Keys only in Netlify env
- Defaults: OpenRouter + DeepSeek; Gemini Flash-Lite fallback
- Cost/safety caps in `review-reply.js`: ~1500 char input, ~120 tokens out, ~10 gens/IP/hour, one retry
- **Spend alert (not hard monthly kill-switch):** set a usage/spend alert in OpenRouter billing so Craig is notified if spend rises. Do not add a hard monthly CAP that disables the tool unless explicitly requested.

## Deploy (Netlify)

Site already linked: `grow-local-business` / id `fd46aa9f-5d8e-4ea8-b87c-f13a3dcc0d9f`

```bash
npx netlify-cli deploy --prod --dir=. --message "describe change"
```

Or drag-drop the project folder in Netlify UI (see `ops/NETLIFY-DEPLOY.md`).

After env var changes, redeploy so functions pick them up.

## SEO / Search Console (after deploy)

1. Confirm `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/resources/` live
2. Submit sitemap in Google Search Console + Bing: `https://www.growlocalbusiness.co.uk/sitemap.xml`
3. GBP is separate (Craig); do not put street address back on the website

## Smoke checklist (production)

1. `https://www.growlocalbusiness.co.uk/` loads
2. Each of six tools: product → build → unlock/done (as applicable)
3. No 404 on `/TOOL/build/` or `/TOOL/done/`
4. Scorecard unlock-once on done; product subhead matches current copy lock
5. Quote shows Salon + Custom; landing tag includes Salons
6. Valuation: phone before preview; phone on preview; then unlock
7. Browser Back steps within Quote/Scorecard/Review/Valuation
8. Baserow row written; hello@ receives operator email on unlock
9. Reply Writer generates or fails honestly (no canned template)
10. Flyer hub `/flyer/` opens Arm A/B proofs
11. `/resources/` hub + four guides load; About has no postal address
12. Done pages show one Momentum next-step CTA

## Print handoff

| Asset | Notes |
|-------|-------|
| `flyer/flyer-a5-arm-a.html` + `arm-b.html` | Printer HTML; use `flyer-a5-print.css` |
| `flyer/index.html` | Online proof hub |
| `planner/a2-wall-planner-2026.html` | A2 planner |
| Spec | `growlocal-flyer-spec.md` wins conflicts |

QR targets should use the live custom domain when reprinting.

## Git hygiene

- Never commit `.env`
- Prefer not to paste tokens into chat
- Baserow create-only token in HTML is known tradeoff; rotate if leaked widely
- Stale docs (`SETUP-GUIDE.md`, parts of `OPERATIONS-GUIDE.md`) may still say Think Beyond — trust live HTML + this skill
