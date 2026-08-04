# Deploy Grow Local to Netlify (step-by-step)

Do this in your **web browser** (Chrome or Edge). Takes about 10–15 minutes.

---

## 1. Create a Netlify account

1. Go to https://app.netlify.com/signup
2. Sign up with **GitHub**, **Google**, or email (any is fine).
3. Confirm your email if asked.

---

## 2. Deploy the site (drag and drop — easiest)

1. On your computer, open File Explorer and go to:
   `g:\AI\projects\2. local-businesses-cold-outreach`
2. Make sure you can see folders like `assets`, `quote`, `review`, `valuation`, `flyer` and the file `index.html`.
3. In the browser, go to https://app.netlify.com/
4. Click **Add new site** → **Deploy manually**  
   (wording may be “Sites” → “Add new site” → “Deploy manually”).
5. **Drag the whole project folder** into the drop zone  
   (the folder that contains `index.html` — not a single file inside it).
6. Wait until Netlify finishes uploading. You will get a URL like:
   `https://random-name-123.netlify.app`
7. Optional but recommended: **Site configuration** → **Domain management** → **Options** → **Edit site name**  
   e.g. `grow-local-tools` → URL becomes `https://grow-local-tools.netlify.app`

Open that URL on your phone. You should see the Grow Local hub.

---

## 3. Add your Google Places API key

1. In Netlify, open your site.
2. Go to **Site configuration** → **Environment variables**.
3. Click **Add a variable** → **Add a single variable**.
4. Name (exactly): `GOOGLE_PLACES_API_KEY`
5. Value: paste your Places API key.
6. Save.
7. Go to **Deploys** → **Trigger deploy** → **Deploy site**  
   (needed so the Review lookup function picks up the new key).

## 3b. Operator lead emails (SMTP2GO)

These alert **Craig only** when someone unlocks a tool or submits a lead. They do **not** email the visitor a report.

1. In SMTP2GO, verify the sender domain (or single sender) for `growlocalbusiness.co.uk` and create an API key with `/email/send` permission.
2. In Netlify → **Site configuration** → **Environment variables**, add:
   - `SMTP2GO_API_KEY` = your SMTP2GO API key
   - `NOTIFY_TO` = `hello@growlocalbusiness.co.uk` (optional; this is the default)
   - `NOTIFY_FROM` = `hello@growlocalbusiness.co.uk` (optional; must be a verified sender)
3. Redeploy so the `notify-lead` function picks up the env vars.
4. Smoke-test: unlock any tool with a test name/email → you should get an email at hello@.
5. You can remove any old `RESEND_API_KEY` variable; it is no longer used.

---

## 4. Update the flyer QR to your live URL

After deploy, phones need the **live** hub URL (not `127.0.0.1`).

1. In **Cursor**, open `flyer/flyer-a4-4up.html`.
2. Near the top, change:
   ```js
   const HUB_URL = "http://127.0.0.1:8765/";
   ```
   to your real URL, for example:
   ```js
   const HUB_URL = "https://grow-local-tools.netlify.app/";
   ```
3. Save the file.
4. Redeploy to Netlify (drag the folder again, or Trigger deploy if using Git).
5. Print the flyer from:
   `https://YOUR-SITE.netlify.app/flyer/flyer-a4-4up.html`  
   (Ctrl+P → A4 → margins None → Background graphics ON)

Then scan the printed QR with your phone — it should open the hub.

---

## 5. (Optional) Master QR for your phone

1. Open any free QR generator in the browser.
2. Paste your hub URL (site root).
3. Download the image and save it full-screen on your phone for cold visits.

---

## Quick checks after deploy

- [ ] Hub opens on phone: `https://YOUR-SITE.netlify.app/`
- [ ] Quote / Review / Valuation each open from the hub cards
- [ ] Review “Find my business” works (Places key set + redeployed)
- [ ] Flyer printed with live `HUB_URL` scans correctly

---

## If something goes wrong

| Problem | Fix |
|--------|-----|
| Hub is blank / 404 | You uploaded the wrong folder — upload the folder that contains `index.html` |
| Review search fails | Check env var name is exactly `GOOGLE_PLACES_API_KEY`, then redeploy |
| Flyer QR opens nothing useful | `HUB_URL` still points at localhost — set it to your Netlify URL and reprint |
| Styles look broken | Hard-refresh on phone (or open in a private tab) |

When your Netlify URL is live, reply with it (no need to share the API key) and I can update `HUB_URL` / master QR for you if you want.
