#!/usr/bin/env python3
"""Phase 2: keyword resource pages for tool ownership."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SHELL = """<!DOCTYPE html>
<html lang="en-GB">
<head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>{title}</title>
 <meta name="description" content="{desc}" />
 <link rel="icon" href="../../assets/monogram-gl.svg" type="image/svg+xml" />
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
 <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600&family=Archivo:wght@400;500;600&family=Fraunces:opsz,SOFT,WONK,wght@9..144,0,0,400;9..144,0,0,500;9..144,0,0,600&display=swap" rel="stylesheet" />
 <link rel="stylesheet" href="../../assets/tokens-shopfront.css" />
 <link rel="stylesheet" href="../../assets/product-shell.css" />
 <style>
  .guide-hero {{
   background: var(--gl-bottle);
   color: var(--gl-bone);
   border-bottom: 1px solid var(--gl-gold);
   padding: 36px 0 44px;
  }}
  .guide-hero h1 {{
   font-family: var(--gl-font-display);
   font-size: clamp(1.85rem, 5vw, 2.5rem);
   font-weight: 500;
   letter-spacing: var(--gl-track-display);
   line-height: var(--gl-lead-display);
   max-width: 20ch;
   margin-top: 12px;
  }}
  .guide-hero__sub {{
   margin-top: 16px;
   color: var(--gl-slate-on-bottle);
   max-width: 38rem;
  }}
  .guide-body {{ padding: 40px 0 48px; }}
  .guide-body .measure {{ max-width: 40rem; }}
  .guide-body h2 {{
   font-family: var(--gl-font-display);
   font-size: clamp(1.35rem, 3.5vw, 1.65rem);
   font-weight: 500;
   margin: 28px 0 12px;
  }}
  .guide-body p + p {{ margin-top: 14px; }}
  .guide-body ul {{
   margin: 14px 0 0;
   padding-left: 1.2rem;
   max-width: 40rem;
  }}
  .guide-body li + li {{ margin-top: 8px; }}
  .guide-cta {{
   margin-top: 32px;
   padding-top: 24px;
   border-top: 1px solid var(--gl-gold);
  }}
  .guide-cta p {{ margin-bottom: 16px; color: var(--gl-slate); max-width: 36rem; }}
  .back-link {{
   display: inline-flex;
   color: var(--gl-gold);
   font-weight: 500;
   margin-top: 20px;
  }}
  .back-link:hover {{ color: var(--gl-bone); }}
 </style>
</head>
<body>
 <header class="sticky-bar">
  <a class="sticky-bar__mark" href="../../index.html">Grow Local</a>
  <a class="sticky-bar__link" href="../../index.html#tools">See the tools</a>
 </header>
 <section class="guide-hero">
  <div class="wrap">
   <p class="utility" style="color: var(--gl-gold);">Resource · Grow Local</p>
   <h1>{h1}</h1>
   <p class="guide-hero__sub">{sub}</p>
   <a class="back-link" href="../">← All resources</a>
  </div>
 </section>
 <main class="guide-body">
  <div class="wrap measure">
{body}
   <div class="guide-cta">
    <p>{cta_why}</p>
    <a class="btn-brass" href="{cta_href}">{cta_label}</a>
   </div>
  </div>
 </main>
 <footer class="site-footer">
  <div class="wrap">
   <p style="font-family: var(--gl-font-display); font-size: 1.25rem; font-weight: 500;">Grow Local</p>
   <div style="height: 1px; width: 6rem; background: var(--gl-gold); margin: 8px 0 16px;"></div>
   <p>Grow Local · a growth agency for local business.</p>
   <p><a href="../../index.html#tools">See the free tools</a> · <a href="../">Resources</a> · <a href="../../about/">About</a></p>
   <p class="utility site-footer__domain">www.growlocalbusiness.co.uk</p>
  </div>
 </footer>
</body>
</html>
"""

PAGES = [
    {
        "slug": "free-google-listing-scorecard",
        "title": "Free Google Listing Scorecard | Grow Local",
        "desc": "Score your Google Business Profile out of 100 in about 30 seconds. Free Google Listing Scorecard from Grow Local for established local businesses.",
        "h1": "A free Google Listing Scorecard for local businesses.",
        "sub": "Most local listings score under 50. Check yours in about thirty seconds and see what is quietly costing you customers.",
        "cta_href": "../../scorecard/build/",
        "cta_label": "Score my Google listing free",
        "cta_why": "No sign-up. Results stay on the page.",
        "sections": [
            (
                "What a listing scorecard is for",
                "<p>A Google Listing Scorecard looks at how complete and useful your Google Business Profile appears to a customer; categories, hours, photos, reviews, replies and a few other basics. It is a practical checklist score, not a secret Google ranking number.</p>",
            ),
            (
                "Who it helps",
                "<p>Garages, trades, clinics, agents and professional services that rely on local search. If people find you on Google before they find your website, this is usually worth ten minutes.</p>",
            ),
            (
                "What it does not do",
                "<p>It does not log into your Google account, change your listing for you, or email you a report. You see the gaps on the page and decide what to fix.</p>",
            ),
        ],
    },
    {
        "slug": "google-review-qr-code",
        "title": "Google Review QR Code for Local Businesses | Grow Local",
        "desc": "Create a free Google review QR code that sends happy customers straight to your review box. Ready in about a minute from Grow Local.",
        "h1": "A Google review QR code that removes the friction.",
        "sub": "Most five-star experiences never become five-star reviews. A short link or QR at the right moment closes the gap.",
        "cta_href": "../../review/build/",
        "cta_label": "Build my Google Review QR",
        "cta_why": "Print it, text it, or put it on the invoice.",
        "sections": [
            (
                "Why QR codes work for reviews",
                "<p>People will leave a review when the path is short. Hunting through Google Search is enough friction to kill the moment. A QR on the counter, card or invoice opens the review box directly.</p>",
            ),
            (
                "When to ask",
                "<p>Ask when the job feels finished; keys handed over, appointment done, work signed off. Waiting a week usually means they have moved on.</p>",
            ),
            (
                "What this free tool does",
                "<p>Grow Local's Google Review QR builds a code pointed at your Google review link. It does not post reviews for you, and it will not invent fake ratings.</p>",
            ),
        ],
    },
    {
        "slug": "reply-to-google-reviews",
        "title": "How to Reply to Google Reviews | Free Writer · Grow Local",
        "desc": "Paste a Google review, pick a tone, and get a reply you can edit and post. Free Review Reply Writer from Grow Local for local businesses.",
        "h1": "How to reply to Google reviews without sounding robotic.",
        "sub": "Unanswered reviews look like an empty shop. A short, human reply builds trust; this free writer drafts one you can edit before you post.",
        "cta_href": "../../reply/build/",
        "cta_label": "Write a review reply free",
        "cta_why": "Starting point only. Always read it before you post it.",
        "sections": [
            (
                "Why replies matter",
                "<p>Customers read replies as much as ratings. A calm thank-you on a five-star, and a careful reply on a tougher review, shows you are paying attention.</p>",
            ),
            (
                "Rules worth keeping",
                "<ul><li>Do not invent facts.</li><li>Do not admit legal fault in public.</li><li>Do not argue point-by-point.</li><li>Move injury, safety or legal issues offline.</li></ul>",
            ),
            (
                "What the free writer does",
                "<p>You paste the review, choose a tone, and get a draft. It is not a canned template library, and it will not post anything for you.</p>",
            ),
        ],
    },
    {
        "slug": "estate-agent-instant-valuation",
        "title": "Instant Valuation Tool for Estate Agents | Grow Local",
        "desc": "Free instant valuation tool for estate agents and lettings. Give sellers a rough guide and capture a named lead. From Grow Local.",
        "h1": "An instant valuation tool for estate agents.",
        "sub": "Sellers browsing at midnight will not leave a voicemail. A simple valuation tool turns a few of them into named leads.",
        "cta_href": "../../valuation/build/",
        "cta_label": "Build my Instant Valuation tool",
        "cta_why": "Honest ballpark framing. Capture a name and contact when they use it.",
        "sections": [
            (
                "Who this is for",
                "<p>Estate agents and lettings teams who want a simple valuation lead magnet on their site, listing or follow-up texts; not a full RICS appraisal substitute.</p>",
            ),
            (
                "What good looks like",
                "<p>Clear that it is a rough guide, a named lead when someone uses it, and a path to book a proper appraisal. Over-promising precise prices damages trust.</p>",
            ),
            (
                "What the free tool does",
                "<p>Grow Local's Instant Valuation builds a shareable tool with a ballpark range and lead capture. It does not replace a surveyor or guarantee a sale price.</p>",
            ),
        ],
    },
]


def body_html(sections):
    parts = []
    for h, html in sections:
        parts.append(f"   <h2>{h}</h2>\n   {html}")
    return "\n".join(parts)


def main() -> None:
    for p in PAGES:
        html = SHELL.format(
            title=p["title"],
            desc=p["desc"],
            h1=p["h1"],
            sub=p["sub"],
            body=body_html(p["sections"]),
            cta_why=p["cta_why"],
            cta_href=p["cta_href"],
            cta_label=p["cta_label"],
        )
        out = ROOT / "resources" / p["slug"] / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(html, encoding="utf-8")
        print("OK", out.relative_to(ROOT).as_posix())


if __name__ == "__main__":
    main()
