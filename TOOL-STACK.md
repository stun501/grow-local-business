# Grow Local — Tool stack (v2)

Approved for the six-tool launch rebuild. Revisit only if requirements or costs change.

## Primary stack

| Capability | Tool | Role | Status | Cost |
|---|---|---|---|---|
| Static site + hosting | Netlify | Pages, CDN, functions | Installed (`grow-local-business`) | Free tier |
| Design system | Shopfront CSS tokens | Palette, type, rules | `assets/tokens-shopfront.css` | Free |
| Shared helpers | `assets/shared.js` | Brand, Baserow, contact | Update brand to Grow Local | Free |
| Lead / ideas storage | Baserow (create-only token) | Owner Leads, Customer Leads, Tool Ideas, Scorecard Runs, Booking Requests | In use | Free tier |
| Business find | Google Places API | Text Search + Place Details (Scorecard, Review) | Partial (`places-search.js`) | Usage-based |
| Review replies | OpenAI API via Netlify function | Server-side draft generation | **To add** (`OPENAI_API_KEY`) | Usage-based |
| QR generation | qrcodejs (CDN) | Tool result QR codes | In use on Quote/Review | Free |
| Flyer proofing | HTML/CSS print 4-up A4 | A6 card with bleed | Rebuild | Free |

## Why this stack

- Keeps the existing Netlify + static HTML delivery model Craig already uses.  
- Places API already wired for Review; Scorecard extends it honestly (public data only).  
- LLM stays server-side so keys never ship in HTML.  
- Baserow remains create-only; broken capture must never break a tool.

## Alternatives not selected

| Alternative | Good at | Why not default |
|---|---|---|
| Cal.com / Calendly for Booking | Real calendar sync | Needs accounts; breaks “no sign-up”; paid upgrade path later |
| GBP owner OAuth for Scorecard | Full audit | Destroys 30-second promise; overkill for free tool |
| Client-side LLM | Simpler hosting | Exposes API key |
| Separate React SPA | Component reuse | Heavier than needed for six pages; would slow Craig’s edit loop |

## Do not use

- Review “gates” / feedback filters (Google policy)  
- Stock photos, gradients, drop shadows  
- Cookie banners unless analytics require them  
- Speculative plugin frameworks for future tools  

## Secrets (Netlify env — never commit)

- `GOOGLE_PLACES_API_KEY`  
- `OPENAI_API_KEY` (Reply Writer)  
- Baserow create-only token in page CONFIG (create rows only)
