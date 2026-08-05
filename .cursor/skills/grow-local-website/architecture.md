# Grow Local — Architecture Reference

## Live targets

| Item | Value |
|------|-------|
| Custom domain | https://www.growlocalbusiness.co.uk |
| Netlify site | `grow-local-business` |
| Site ID | `fd46aa9f-5d8e-4ea8-b87c-f13a3dcc0d9f` |
| Publish dir | `.` (repo root) |
| Functions | `netlify/functions` |

## Site map

### Hub & marketing

| Route | File |
|-------|------|
| `/` | `index.html` |
| `/about/` | `about/index.html` |
| `/book/` | `book/index.html` |
| `/guides/` | `guides/index.html` (+ 4 guide children) |
| `/qr/` | `qr/index.html` |
| `/flyer/` | `flyer/index.html` |
| `/llms.txt` | AI crawler summary |
| `/sitemap.xml` / `/robots.txt` | Technical SEO |

### Six tools

| Tool | Product | Build (canonical) | Done | Customer mode |
|------|---------|-------------------|------|---------------|
| Scorecard | `scorecard/` | `scorecard/build/` | `scorecard/done/` | — |
| Quote | `quote/` | `quote/build/` | `quote/done/` | `quote/#q=` |
| Review | `review/` | `review/build/` | `review/done/` | `review/#r=` |
| Reply | `reply/` | `reply/build/` | `reply/done/` | — |
| Booking | `booking/` | `booking/build/` | `booking/done/` | `booking/request.html#bk=` |
| Valuation | `valuation/` | `valuation/build/` | `valuation/done/` | `valuation/#v=` |

Trailing-slash redirects: `netlify.toml`.

### Print / extras

| Route | File | Notes |
|-------|------|-------|
| Flyer Arm A | `flyer/flyer-a5-arm-a.html` | Scorecard hook |
| Flyer Arm B | `flyer/flyer-a5-arm-b.html` | Hub / six tools |
| Planner | `planner/a2-wall-planner-2026.html` | A2 2026 |
| Legacy quote | `instant-quote-form.html` | Do not use; PASTE IDs |

## Shared client modules

### `assets/shared.js` → `window.TBA`

- `BRAND` / `PRODUCT` / `TOOLS` / `BUSINESS_TYPES`
- `baserowReady`, `baserowAdd`, `baserowDateToday`
- `notifyOperator` (POST `/.netlify/functions/notify-lead`)
- Auto-notify after successful `baserowAdd` for tables: Owner Leads, Tool Ideas, Customer Leads, Valuation Leads, Booking Requests

### `assets/tool-flow.js` → `window.GLFlow`

| API | Purpose |
|-----|---------|
| `saveResult` / `loadResult` / `clearResult` | sessionStorage handoff |
| `goToDone(toolId, payload, path?)` | Save + navigate to done |
| `showStep` | Toggle `.active` on step IDs |
| `pushStep` / `bindStepHistory` | Browser Back within wizards |

**Storage key:** `gl_tool_result_{toolId}`  
**Shape:** `{ t: timestamp, data: payload }`  
**TTL:** 6 hours default  
**toolId:** `scorecard` | `quote` | `review` | `reply` | `booking` | `valuation`

## Netlify functions

| Function | Env | Role |
|----------|-----|------|
| `places-search` | `GOOGLE_PLACES_API_KEY` | Text search for Scorecard/Review |
| `places-details` | `GOOGLE_PLACES_API_KEY` | Place details for Scorecard |
| `review-reply` | `LLM_API_KEY` or `OPENROUTER_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL`, `LLM_FALLBACK_MODEL` | Server-side draft only |
| `notify-lead` | `SMTP2GO_API_KEY`, optional `NOTIFY_TO`, `NOTIFY_FROM` | Operator email via SMTP2GO |

### LLM defaults

- Base: `https://openrouter.ai/api/v1`
- Model: `deepseek/deepseek-v3.2`
- Fallback: `google/gemini-2.0-flash-lite-001`
- Caps: ~1500 char input, ~120 tokens out, ~10 gens/IP/hour, one retry max
- On failure: plain message + text-us — **never** canned reply template

### SMTP2GO send

- Endpoint: `https://api.smtp2go.com/v3/email/send`
- Auth header: `X-Smtp2go-Api-Key`
- Body: `sender`, `to[]`, `subject`, `html_body`, `text_body`
- Sender must be a verified domain/address in SMTP2GO

## Baserow

- API: `https://api.baserow.io`
- Token: create-only, in page `CONFIG` (POST rows; never PATCH from browser)
- Guard: values starting with `PASTE` disable capture

### Date fields

| Tables | Format |
|--------|--------|
| Scorecard Runs `1098284`, Booking Requests `1098285` | `YYYY-MM-DD` only |
| Owner/Customer/Valuation/Tool Ideas text dates | ISO or date string OK |

Helper: `window.TBA.baserowDateToday()`.

## Page CONFIG pattern

Each tool page ends with a CONFIG object:

```js
const CONFIG = {
  BASEROW_TOKEN: "...",
  OWNER_LEADS_TABLE_ID: "1092861",
  // tool-specific table IDs
  BASEROW_URL: "https://api.baserow.io"
};
```

Prefer calling `window.TBA.baserowAdd(CONFIG, tableId, row)` so operator notify fires automatically.

## File roles to prefer

| Prefer | Avoid for new work |
|--------|--------------------|
| `assets/tokens-shopfront.css` | `assets/shared.css` (legacy lime/teal) |
| `*/build/index.html` generators | Hidden generators on product pages |
| SMTP2GO notify-lead | Resend |
| Google Listing Scorecard naming | “Foundation Scorecard” in new copy |

## Brand constants

From `shared.js`:

- Name: Grow Local
- Tagline: A growth agency for local business
- Email: hello@growlocalbusiness.co.uk
- Phone: 07379028832 / display 07379 028832
- Domain: www.growlocalbusiness.co.uk
- **No postal address** in `BRAND`, About, footers, schema, or `llms.txt` (GBP only, off-site)

## SEO (as-built)

- Checklist: `ops/SEO-REQUIREMENTS.md`
- Head patcher: `ops/patch-seo-heads.py` (canonical, OG/Twitter, Organization JSON-LD, WebApplication on tools, noindex on build/done)
- Guides writer: `ops/write-guides.py`
- FAQ + FAQPage schema on home + Scorecard
- Organization schema: phone + email only (no `PostalAddress`)
