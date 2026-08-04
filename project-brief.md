# Project Brief: Local Business Lead-Magnet Toolkit

## 1. Background

I run a local consultancy helping small businesses (garages, salons, dental practices, estate agents, restaurants) with AI transformation, workflow automation, and local SEO. My client acquisition strategy is in-person cold visits to local businesses, where I open the conversation with a **free, instantly usable digital tool** (a lead magnet) rather than a sales pitch. The free tool builds goodwill, demonstrates capability, and creates a natural doorway to a booked 30-minute consultation and, from there, paid work (Google Business Profile optimisation, local SEO, custom AI workflows).

This project is to **build the digital infrastructure behind that strategy**: the landing pages, the free tools themselves, the lead-capture flow, and supporting print assets.

## 2. Objective

Build a lightweight web platform that lets a business owner, on the spot and on their own phone:

1. Scan a QR code from my phone (or a flyer).
2. Land on a clean, trustworthy landing page.
3. Enter minimal details and instantly generate a working free tool for their business.
4. Use that tool immediately, and download/share it — at which point their contact details are captured as a lead for me.

## 3. The Tools (Products) to Build

Each tool follows the same "instant win" pattern. Priority order:

**a) Instant Quote Form (for garages and trades) — primary tool**
- Owner selects their trade (e.g. garage) and gets a pre-built template of common jobs (brake pads, clutch, servicing, MOT, etc.) with rough price ranges.
- Owner can **edit/tweak the price ranges** before finalising — they must feel in control of their numbers.
- Output: a customer-facing quote form. A customer picks their job (and ideally vehicle type), sees a ballpark price, and **leaves their name and phone number** — creating a warm lead for the business, including from after-hours website visitors who would otherwise never call.
- Owner receives: a QR code for the form, a shareable link (for texting mid-call), and an embeddable/linkable version for their website and Google Business Profile.

**b) Google Review QR Tool (for salons, barbers, dentists, restaurants, and as a garage bonus)**
- Owner enters their business name; the tool finds/links their Google review link and generates a branded review QR code.
- Use cases to support: printed for the counter/table/wall, included on invoices/receipts, sent as a shareable link by text, or shown on the owner's phone for a customer to scan on the spot ("catch them at peak happiness, before they leave").

**c) Instant Valuation Form (for estate agents)**
- A "What's my home worth?" form: homeowner enters postcode and property basics, gets a rough ballpark, and leaves contact details — a hot seller lead for the agent.
- Same output pattern: QR, shareable link, embeddable form.

## 4. Landing Page & Lead-Capture Flow (critical UX requirement)

**Staged friction — value first, capture second:**

1. Scan → landing page. Minimal copy: one benefit headline (e.g. "More reviews, less hassle" / "Catch the customers who look you up but never call"), one line explaining what it does, then the input.
2. Step one asks for **company name only** — the tool then generates and displays instantly on their phone. This is the on-the-spot "wow" moment with near-zero friction.
3. To **download** the QR/assets or get the **shareable link**, they enter **name + email** (nothing more). This is my lead capture.
4. Leads (name, email, company, tool type, timestamp) must be stored somewhere I can access — a simple database or spreadsheet/CRM export is fine.

The pages must work flawlessly on mobile, load fast, and look professional but friendly — these will be scanned in noisy garages and busy receptions.

## 5. Supporting Assets

- **Flyer / leave-behind template** (A4, 4-per-page, cuttable): benefit headline, one line of copy, "Scan to start free" + QR, my name and phone number. For businesses that decline the in-person demo.
- **My master QR code** (linking to the landing page) in a format I can display full-screen on my phone.
- Simple **admin view or export** of captured leads.

## 6. Success Criteria

- A business owner can go from scanning to a working tool in under 60 seconds.
- I capture name + email for every download/share action.
- Each tool is genuinely useful standalone (free tier), while naturally pointing to the paid next step (e.g. "getting this onto your Google profile properly" = my consultation).
- Cheap or free to run at small scale; easy for me to maintain without deep technical skills.

## 7. Constraints & Notes

- Budget-conscious: prefer free/low-cost hosting and services.
- No heavy sign-up requirements for business owners — friction kills this.
- GDPR-aware lead capture (UK-based): a simple consent line at the email step.
- Branding: clean, trustworthy, local-friendly. Not corporate, not scrappy.
