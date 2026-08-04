# Operations Guide — Grow Local

Simple day-to-day tasks for Craig. No coding experience needed for most steps.

**Product:** Grow Local · Free tools. Real growth. No catch.  
**Your contact on result screens:** Think Beyond Automation · Craig · 07379028832 · craig@thinkbeyondautomation.com

**Important:** Printed flyers show Grow Local + QR + tagline only — **no phone number on the flyer**. Owners see your full contact details **after** they use a tool and unlock download/share.

---

## View and export leads (Baserow)

Use your **web browser** — not the terminal.

1. Go to [baserow.io](https://baserow.io) and log in.
2. Open your database.
3. Pick the table you need:
   - **Owner Leads** — business owners who gave name + email when unlocking a tool
   - **Customer Quote Requests** — their customers who requested a quote/callback
   - **Valuation Leads** — homeowners from the Instant Valuation form
   - **Tool Ideas** — hub enquiries (“What should we build next?”)
4. Browse rows like a spreadsheet. Sort by **Date** to see newest first.
5. To export:
   - Click the **three dots** (⋯) menu for the table (or use the table’s export option).
   - Choose **Export table to CSV**.
   - Open the CSV in Excel or Google Sheets for follow-up.

**Tip:** Check **Owner Leads** after field days; check **Customer Quote Requests** so you can tell garage owners how many warm leads their form captured.

---

## Change default job prices or add a trade

Default starting jobs live in the **Instant Quote** tool file.

### Where to edit

1. In **Cursor**, open the project folder:  
   `g:\AI\projects\2. local-businesses-cold-outreach`
2. Open **`quote/index.html`**.
3. Search for **`TRADE_TEMPLATES`** (near the top of the script section).

### Edit an existing trade

Each trade is a list of jobs. A normal priced job looks like:

```js
{ name: "Front brake pads", lo: 90, hi: 160 }
```

Change `lo` and `hi` (low and high £ amounts). Save the file.

For jobs that need a site visit (no fake price), use:

```js
{ name: "Full re-roof", quoteOnly: true }
```

### Add a new trade

1. Inside `TRADE_TEMPLATES`, copy an existing trade block (e.g. `plumber`).
2. Paste it below and rename the key (e.g. `locksmith`).
3. Change the job names and prices.
4. Non-garage trades should include the standard call-out jobs at the top (see other trades in the same file for the pattern).
5. Save the file.

### Put changes live

Redeploy to Netlify (same as setup):

- **Browser:** Netlify dashboard → your site → drag the **whole project folder** onto **Deploy manually**, **or**
- If Git is connected: save in Cursor, commit, and push (Netlify redeploys automatically).

Test on your phone: hub → Instant Quote → pick the trade → confirm new defaults appear.

---

## Update consent wording or your contact block

Shared copy used across tools is in one place.

1. In **Cursor**, open **`assets/shared.js`**.
2. Search for **consent** — update the checkbox label / GDPR text there.
3. Search for **contact** — update your name, phone, or email in the consultant contact block (result screens only).
4. Save and redeploy to Netlify (see above).

Do **not** put your phone on the flyer HTML — flyers stay QR-only; contact belongs on result screens and in this shared block.

---

## Master QR and flyer reminder

| Asset | Points to | Shows phone? |
|---|---|---|
| Master QR (your phone) | Site root / hub | No — hub only |
| Flyer QR | Site root / hub | **No** — flyer has QR + Grow Local + tagline only (TBA tiny footer) |
| Tool result screen | — | **Yes** — full contact after unlock |

If you change your Netlify URL, regenerate the master QR and reprint flyers with the new link.

---

## Google Places / Review tool setup

Full click-by-click guide: **`GOOGLE-PLACES-SETUP.md`** (same folder).

Short version: Google Cloud → enable Places API → create API key → Netlify env var `GOOGLE_PLACES_API_KEY` → redeploy. Until then, Review uses paste-link fallback.

---

## Quick reference — which file for what

| Task | File | Tool |
|---|---|---|
| Baserow token & table IDs | `CONFIG` in `index.html`, `quote/index.html`, `review/index.html`, `valuation/index.html` | Cursor |
| Default jobs / new trade | `quote/index.html` → `TRADE_TEMPLATES` | Cursor |
| Consent text & your contact | `assets/shared.js` | Cursor |
| View / export leads | Baserow website | Browser |
| Publish site changes | Netlify dashboard | Browser |

For first-time hosting and Baserow table setup, see **`SETUP-GUIDE.md`** in the project root.
