# Baserow tables for Grow Local v2

All live table IDs are wired in page CONFIG. Create-only database token POSTs new rows (never PATCH).

Lead capture unlocks on-page value (full report, QR, link, downloads). We do **not** email reports or files to users.

Operator alerts: after a successful create on Owner Leads, Tool Ideas, Customer Leads, Valuation Leads, or Booking Requests, `assets/shared.js` also calls `/.netlify/functions/notify-lead` (SMTP2GO) so Craig gets an email at `hello@growlocalbusiness.co.uk`. Scorecard Runs are not alerted. Requires `SMTP2GO_API_KEY` in Netlify env (sender domain must be verified in SMTP2GO).

## Owner Leads — `1092861`

Used by every tool unlock (Scorecard, Quote, Review QR, Reply, Booking, Valuation).

| Field | Type |
|-------|------|
| Name | Text |
| Email | Email |
| Business | Text |
| Phone | Text |
| Tool | Text (free text; e.g. Google Listing Scorecard, Instant Quote Form) |
| Consent | Text (Yes/No) |
| Business type | Text (Reply Writer; optional elsewhere) |
| Date | Text (ISO datetime from site is fine) |

## Customer Leads — `1092866`

Used by Instant Quote customer (`#`) mode.

| Field | Type |
|-------|------|
| Customer name | Text |
| Phone | Text |
| Vehicle | Text |
| Job | Text |
| Price range | Text |
| Business | Text |
| Date | Text |

## Valuation Leads — `1092867`

Used by Instant Valuation homeowner flow.

| Field | Type |
|-------|------|
| Customer name | Text |
| Phone | Text |
| Email | Email |
| Postcode | Text |
| Property type | Text |
| Bedrooms | Text |
| Condition | Text |
| Ballpark | Text |
| Business | Text |
| Date | Text |

## Tool Ideas — `1092868`

Used by landing page enquiry form.

| Field | Type |
|-------|------|
| Name | Text |
| Business type | Text |
| Challenge | Text |
| Email | Email |
| Phone | Text |
| Notify | Text |
| Date | Text |

## Scorecard Runs — `1098284`

Used by `scorecard/build/` (and `scorecard/index.html`).

| Field | Type |
|-------|------|
| Business name | Text |
| Listing ID | Text |
| Address | Text |
| Score | Number |
| Band | Single select: Needs work · Getting there · In good shape |
| Top gaps | Long text |
| Business type | Text |
| Name | Text |
| Email | Email |
| Date | **Date** (`YYYY-MM-DD` only; ISO datetime is rejected) |

Also has unused template fields: Notes, Active.

## Booking Requests — `1098285`

Used by `booking/request.html`.

| Field | Type |
|-------|------|
| Customer name | Text |
| Mobile | Phone |
| What for | Long text |
| Business | Text |
| Slot | Text |
| Slot ISO | Text |
| Notify email | Email |
| Possible clash | Single select: Yes / No / Unknown |
| Date | **Date** (`YYYY-MM-DD` only; ISO datetime is rejected) |

Also has unused template fields: Name, Notes, Active.

Clash detection: same-browser local flag can mark **Yes**; Baserow read with create-only token usually falls back to **Unknown**. Requests are never blocked.
