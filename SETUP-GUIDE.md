# Grow Local — Setup Guide

Static multi-page site (hub + tools). No backend required for hosting — lead capture uses Baserow’s free API. Review lookup uses a Netlify Function + Google Places key (optional; paste fallback always works).

**Product:** Grow Local · Free tools. Real growth. No catch.  
**Consultant (result screens):** Think Beyond Automation · Craig · 07379028832 · craig@thinkbeyondautomation.com

---

## Site structure

Deploy the **whole project folder** to Netlify (not a single HTML file):

```
/
  index.html              ← Hub (3 tool cards) — master QR points here
  quote/
    index.html            ← Instant Quote (builder + customer)
  review/
    index.html            ← Review QR tool (Milestone 2)
  valuation/
    index.html            ← Valuation form (Milestone 3)
  assets/
    shared.css            ← Shared design tokens
    shared.js             ← Baserow helper, consent copy, contact block
  flyer/
    flyer-a4-4up.html     ← Print-ready leave-behinds (no phone on flyer)
  netlify/
    functions/
      places-search.js    ← Google Places proxy (Milestone 2 only)
```

**Master QR** and **flyer QR** both point at the **site root** (e.g. `https://yoursite.netlify.app/`), not at `/quote/`.

---

## 1. Host on Netlify (~10–15 minutes, free)

**Full step-by-step:** see **ops/NETLIFY-DEPLOY.md** (recommended).

Shareable links and QR codes only work once the site is on a real HTTPS URL.

### Option A — Drag and drop (easiest)

1. In your **browser**, go to [app.netlify.com](https://app.netlify.com/) and create a free account.
2. Click **Add new site → Deploy manually**.
3. Drag the **entire project folder** (the folder that contains `index.html`, `quote/`, `assets/`, etc.) into the drop zone.
4. Netlify gives you a URL like `https://random-name.netlify.app`.
5. Optional: **Site configuration → Domain management → Edit site name** for a cleaner URL.
6. Add Places key: **Site configuration → Environment variables** → `GOOGLE_PLACES_API_KEY` → then **Deploys → Trigger deploy**.
7. Update `flyer/flyer-a4-4up.html` `HUB_URL` to your live URL, redeploy, then reprint the flyer.

### Option B — Git deploy (optional)

Connect the repo to Netlify so each push redeploys automatically. Publish directory = folder root where `index.html` lives.

### Master QR

1. Open any free QR generator in your **browser**.
2. Encode your **hub URL** (site root), e.g. `https://yoursite.netlify.app/`.
3. Save the image full-screen on your phone for cold visits.

**Flyer rule:** Printed flyer shows QR + Grow Local + tagline — **no phone**. Full contact appears on tool result screens after the wow moment.

---

## 2. Set up Baserow lead capture (~20 minutes, free)

Create a free account at [baserow.io](https://baserow.io), then create **four tables** in one database (e.g. name the database **Grow Local**).

Field names must match **exactly** (including capitalisation and spaces). Use **Single line text** for every field unless noted.

### Table 1 — Owner Leads

Consultant prospects (captured when a business owner unlocks download/share on any tool).

| Field name | Type |
|---|---|
| Name | Single line text |
| Email | Email |
| Business | Single line text |
| Phone | Single line text |
| Tool | Single line text |
| Consent | Single line text |
| Date | Single line text |

Used by: Instant Quote · Review QR · Instant Valuation.

### Table 2 — Customer Quote Requests

Warm leads for the garage/trade (from the customer-facing quote form).

| Field name | Type |
|---|---|
| Customer name | Single line text |
| Phone | Single line text |
| Vehicle | Single line text |
| Job | Single line text |
| Price range | Single line text |
| Business | Single line text |
| Date | Single line text |

Used by: Instant Quote (customer mode).

### Table 3 — Valuation Leads

Homeowner leads for estate agents (from the customer-facing valuation form).

| Field name | Type |
|---|---|
| Customer name | Single line text |
| Phone | Single line text |
| Email | Email |
| Postcode | Single line text |
| Property type | Single line text |
| Bedrooms | Single line text |
| Condition | Single line text |
| Ballpark | Single line text |
| Business | Single line text |
| Date | Single line text |

Used by: Instant Valuation (homeowner mode).

### Table 4 — Tool Ideas

Hub enquiry form (“What should we build next?”).

| Field name | Type |
|---|---|
| Business type | Single line text |
| Challenge | Single line text (or Long text) |
| Name | Single line text |
| Email | Email |
| Phone | Single line text |
| Notify | Single line text |
| Date | Single line text |

Used by: Hub (`index.html`).

### API token and table IDs

1. In Baserow: **Settings → Database tokens** (or **API tokens**) → **Create token**.
2. Grant **Create** only (create rows) on all **four** tables. Do **not** grant read, update, or delete.
3. Copy the token.
4. Find each table ID: open the table and check the browser URL — `.../database/xxx/table/12345/` — the number after `/table/` is the ID.

### CONFIG blocks (paste the same token everywhere)

| File | Keys to fill |
|------|----------------|
| `quote/index.html` | `BASEROW_TOKEN`, `OWNER_LEADS_TABLE_ID`, `CUSTOMER_LEADS_TABLE_ID` |
| `review/index.html` | `BASEROW_TOKEN`, `OWNER_LEADS_TABLE_ID` |
| `valuation/index.html` | `BASEROW_TOKEN`, `OWNER_LEADS_TABLE_ID`, `VALUATION_LEADS_TABLE_ID` |
| `index.html` (hub) | `BASEROW_TOKEN`, `TOOL_IDEAS_TABLE_ID` |

Example (quote tool):

```js
const CONFIG = {
  BASEROW_TOKEN: "...",
  OWNER_LEADS_TABLE_ID: "...",
  CUSTOMER_LEADS_TABLE_ID: "...",
  BASEROW_URL: "https://api.baserow.io"
};
```

Example (hub Tool Ideas):

```js
var CONFIG = {
  BASEROW_TOKEN: "...",
  TOOL_IDEAS_TABLE_ID: "...",
  BASEROW_URL: "https://api.baserow.io"
};
```

After CONFIG is filled, redeploy to Netlify so the live site can save leads. Every unlock, customer/valuation submission, and hub idea will then write to Baserow.

**If Baserow is not configured yet:** tools still work — they skip saving leads. Customer flows may fall back to showing the business phone when storage is unavailable.

---

## 3. Security note (important)

The Baserow token is visible in page source (it ships in each tool’s `CONFIG`). That is acceptable **only** if the token has **create rows** permission on those tables — **never** grant read, update, or delete. The worst case then is someone adding a junk row.

---

## 4. In-field flow (hub → quote)

1. Owner scans **master QR** → lands on **hub** (`index.html`).
2. They tap **Instant Quote** → enter **business name + pick trade** → see editable price board → tweak prices → live preview on their phone.
3. They enter **business phone** (before unlock).
4. To get QR, shareable link, and download: **name + email + GDPR consent** → saved to **Owner Leads**.
5. They get: counter QR, mid-call link, website/Google Profile link; **consultant contact block** on the result screen.
6. Their customers pick a job, see ballpark (or site-visit CTA), leave name + mobile → **Customer Quote Requests**.

Review QR and Valuation Form follow the same staged pattern when those milestones are live.

---

## 5. Milestone 2 — Google Places (Review tool)

Step-by-step: **ops/GOOGLE-PLACES-SETUP.md**

Summary: enable Places API in Google Cloud → create restricted API key → add Netlify env var `GOOGLE_PLACES_API_KEY` → redeploy. Until then, Review tool uses paste-link fallback.

---

## 6. Day-to-day changes (no developer needed)

For viewing/exporting leads, editing default prices, adding trades, and updating consent or contact copy, use **ops/OPERATIONS-GUIDE.md** — written for non-technical use in the field.

---

## Quick checklist

- [ ] Whole site folder deployed to Netlify; hub URL works on phone  
- [ ] Master QR points at site **root** (hub)  
- [ ] Four Baserow tables created with exact field names (Owner Leads, Customer Quote Requests, Valuation Leads, Tool Ideas)  
- [ ] Create-only API token; CONFIG filled in hub + `quote/` + `review/` + `valuation/`  
- [ ] Redeployed after CONFIG change  
- [ ] Test unlock → row appears in Owner Leads  
- [ ] Test customer quote → row appears in Customer Quote Requests  
- [ ] Test valuation homeowner submit → row in Valuation Leads  
- [ ] Test hub “Send my idea” → row in Tool Ideas  

