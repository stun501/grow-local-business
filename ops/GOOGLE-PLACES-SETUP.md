# Google Places API — step-by-step (Review QR auto-lookup)

You need this only for the **Google Review QR** tool’s “Find my business” search.
Without it, the tool still works via **paste your Google review link**.

Do this in your **browser** (Chrome or Edge), not in Cursor.

---

## Part A — Create the API key (Google Cloud)

1. Go to: https://console.cloud.google.com/
2. Sign in with a Google account.
3. If asked, accept terms / create a billing profile.
   - Google usually gives free credits.
   - At your demo scale, Places searches cost pennies.
   - You **must** have billing enabled for Places to return results (even if the bill is £0).
4. Top bar → project dropdown → **New Project**.
   - Name: `Grow Local` (or similar) → **Create**.
5. Make sure that project is selected in the top bar.
6. Open: https://console.cloud.google.com/apis/library
7. Search for **Places API** (the classic “Places API” is fine for Text Search / Find Place).
8. Click it → **Enable**.
9. Also search for **Geocoding API** → **Enable** (used to bias search around a UK postcode).
10. Go to: https://console.cloud.google.com/apis/credentials
11. **Create credentials** → **API key**.
12. Copy the key and store it somewhere safe (password manager).
13. Click **Edit API key** (or the key name):
    - **Application restrictions:** prefer **HTTP referrers** for browser use is NOT needed here — our key is used only on the server.
    - Better: **Application restrictions → IP addresses** leave unset for Netlify Functions, OR use **None** temporarily while testing, then tighten later.
    - **API restrictions → Restrict key** → select **Places API** and **Geocoding API** → **Save**.

You now have a key string like `AIza...`.

---

## Part B — Add the key to Netlify (so Grow Local can use it)

The key must **not** go in HTML. It goes in Netlify as an environment variable. The Review tool calls `netlify/functions/places-search.js`, which reads it securely.

1. Deploy the site to Netlify first (whole project folder), if you have not already.
2. In Netlify: open your site → **Site configuration** → **Environment variables**.
3. **Add a variable**:
   - Key: `GOOGLE_PLACES_API_KEY`
   - Value: paste your Google API key
4. Save.
5. **Trigger a redeploy** (Deploys → Trigger deploy → Deploy site), so the function picks up the new variable.

---

## Part C — Test it

1. On your live Netlify URL, open **Google Review QR**.
2. Enter a real local business name + town.
3. Tap **Generate the QR code**.
4. You should see a short list of matches → pick yours → QR preview.

If lookup fails, the paste-link fallback still appears — demos never break.

---

## What to send me (optional)

If you want me to verify wiring after you create the key:

1. Confirm the Netlify env var name is exactly `GOOGLE_PLACES_API_KEY`.
2. Tell me your Netlify site URL.
3. **Do not paste the full API key into chat** if you can avoid it — confirm only that it is set.

I can then help you smoke-test the Review lookup on the live site.

---

## Cost / safety notes

- Restrict the key to Places API only.
- Monitor usage in Google Cloud → APIs & Services → Dashboard.
- You can set a budget alert in Google Cloud Billing.
- Local testing without Netlify will always use paste-fallback (that is expected).
