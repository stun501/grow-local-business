#!/usr/bin/env python3
"""Create Grow Local /guides/ hub + four practical guides."""
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
 <link rel="icon" href="{asset_prefix}assets/monogram-gl.svg" type="image/svg+xml" />
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
 <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600&family=Archivo:wght@400;500;600&family=Fraunces:opsz,SOFT,WONK,wght@9..144,0,0,400;9..144,0,0,500;9..144,0,0,600&display=swap" rel="stylesheet" />
 <link rel="stylesheet" href="{asset_prefix}assets/tokens-shopfront.css" />
 <link rel="stylesheet" href="{asset_prefix}assets/product-shell.css" />
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
   max-width: 18ch;
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
  .guide-list {{
   display: grid;
   gap: 0;
   margin-top: 28px;
   border-top: 1px solid var(--gl-gold-40);
  }}
  .guide-list a {{
   display: block;
   padding: 18px 0;
   border-bottom: 1px solid var(--gl-gold-40);
  }}
  .guide-list a:hover .guide-list__title {{ color: var(--gl-brass); }}
  .guide-list__title {{
   font-family: var(--gl-font-display);
   font-size: 1.25rem;
   font-weight: 500;
   margin: 6px 0 8px;
  }}
  .guide-list__blurb {{ color: var(--gl-slate); max-width: 40rem; }}
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
  <a class="sticky-bar__mark" href="{home}">Grow Local</a>
  <a class="sticky-bar__link" href="{home}#tools">See the tools</a>
 </header>
{body}
 <footer class="site-footer">
  <div class="wrap">
   <p style="font-family: var(--gl-font-display); font-size: 1.25rem; font-weight: 500;">Grow Local</p>
   <div style="height: 1px; width: 6rem; background: var(--gl-gold); margin: 8px 0 16px;"></div>
   <p>Grow Local · a growth agency for local business.</p>
   <p><a href="{home}#tools">See the free tools</a> · <a href="{guides_hub}">Guides</a> · <a href="{about}">About</a></p>
   <p class="utility site-footer__domain">www.growlocalbusiness.co.uk</p>
  </div>
 </footer>
</body>
</html>
"""

GUIDES = [
    {
        "slug": "google-listing-checklist",
        "title": "Google listing checklist for local businesses · Grow Local",
        "desc": "A practical checklist for your Google Business Profile. See what customers notice first, then score your listing free.",
        "h1": "A practical checklist for your Google listing.",
        "sub": "Most customers see your Google listing before they ever visit your website. These are the bits that quietly decide whether they ring you, or the next business down.",
        "cta_href": "../../scorecard/build/",
        "cta_label": "Score your Google listing free",
        "cta_why": "Want a score out of 100 and the three gaps costing you customers? It takes about thirty seconds.",
        "sections": [
            (
                "Start with what people notice first",
                "<p>Open your listing on your phone the way a stranger would. Name, category, hours, photos, and the first few reviews do most of the work. If any of those look unfinished, people bounce before they read a word about you.</p>",
            ),
            (
                "Checklist worth finishing this week",
                """<ul>
 <li>Primary category matches what you actually sell; add a second if it is honest.</li>
 <li>Opening hours are right, including bank holidays.</li>
 <li>Phone number is the one you answer (or the one that texts you).</li>
 <li>At least a handful of clear photos of real work, not stock.</li>
 <li>Recent reviews have replies, even short ones.</li>
 <li>Services or products are listed in plain language.</li>
 <li>Questions on the listing have answers from you, not strangers.</li>
</ul>""",
            ),
            (
                "What this is not",
                "<p>This is not a full SEO project. It is the tidy-up that stops you losing easy work. A finished listing will not replace good work or good prices, but an unfinished one will quietly cost you both.</p>",
            ),
        ],
    },
    {
        "slug": "more-google-reviews",
        "title": "How local businesses get more Google reviews · Grow Local",
        "desc": "Simple ways to ask for reviews at the right moment. Build a free Google Review QR in about a minute.",
        "h1": "How local businesses get more Google reviews.",
        "sub": "Most five-star experiences never become five-star reviews. The fix is usually timing and a simple ask, not a campaign.",
        "cta_href": "../../review/build/",
        "cta_label": "Build your Google Review QR",
        "cta_why": "A QR on a card, counter or invoice sends happy customers straight to your Google review box.",
        "sections": [
            (
                "Ask when the job feels finished",
                "<p>The best moment is right after a good outcome; keys handed over, appointment done, job signed off. Waiting a week means they have already moved on. Keep the ask short: if you were happy, would you leave a quick Google review?</p>",
            ),
            (
                "Make the path short",
                "<p>Do not send people hunting through Google Search. A direct review link or QR removes the friction. Print it, text it, or put it on the invoice. One step beats a paragraph of instructions.</p>",
            ),
            (
                "Reply to what you get",
                "<p>Fresh reviews help. Replied-to reviews help more. A short thank-you on a five-star, and a calm, factual reply on a tougher one, shows the next customer you are paying attention.</p>",
            ),
        ],
    },
    {
        "slug": "quote-form-for-trades",
        "title": "Quote forms for trades and salons · Grow Local",
        "desc": "Why after-hours browsers leave without asking for a price, and how a simple quote form captures them.",
        "h1": "Catch them before they ring your competitor.",
        "sub": "Someone looking at your prices at 9pm will not leave a voicemail. A simple quote form answers them while you sleep.",
        "cta_href": "../../quote/build/",
        "cta_label": "Build your Instant Quote Form",
        "cta_why": "Add your services and prices once. Share the link on your site, Google listing, or texts.",
        "sections": [
            (
                "Why the phone is not enough",
                "<p>Garages, trades and salons still live on the phone, and that is fine for daytime. After hours, browsers compare two or three businesses and pick the one that answers first. Silence feels like a no.</p>",
            ),
            (
                "What a good quote form does",
                "<p>It shows typical prices or packages in plain language, captures a name and contact, and tells them what happens next. It does not need every edge case. It needs enough clarity that they stop shopping around.</p>",
            ),
            (
                "Where to put the link",
                "<p>Website header, Google listing website field, follow-up texts, and emails after a missed call. One link, used in a few places, beats a form nobody can find.</p>",
            ),
        ],
    },
    {
        "slug": "booking-without-back-and-forth",
        "title": "Booking without the back-and-forth · Grow Local",
        "desc": "Cut the diary ping-pong. Let customers pick a slot from your usual hours with a free booking link.",
        "h1": "Booking without the back-and-forth.",
        "sub": "Three texts to agree a Tuesday morning is work you should not be doing. A booking link lets them pick a slot from your usual hours.",
        "cta_href": "../../booking/build/",
        "cta_label": "Build your Booking Link",
        "cta_why": "Set your hours and buffer once. Share one link. Confirm when it suits you.",
        "sections": [
            (
                "What the diary ping-pong costs",
                "<p>Every unanswered \"does Thursday work?\" is a chance for the customer to book elsewhere. Clinics, salons and trades feel this hardest when the phone is on a job or reception is slammed.</p>",
            ),
            (
                "Keep it simple on purpose",
                "<p>You do not need a full clinic system for this. Usual hours, a buffer between slots, and a confirmation step for you are enough. Fancy calendars can wait until the simple link is earning its keep.</p>",
            ),
            (
                "Pair it with price clarity",
                "<p>Bookings stall when people still wonder what it costs. If you quote fixed work, put a quote form next to the booking link so the two common questions get answered without a call.</p>",
            ),
        ],
    },
]


def guide_body(g: dict) -> str:
    sections = "\n".join(f"   <h2>{h}</h2>\n   {html}" for h, html in g["sections"])
    return f""" <section class="guide-hero">
  <div class="wrap">
   <p class="utility" style="color: var(--gl-gold);">Guide</p>
   <h1>{g["h1"]}</h1>
   <p class="guide-hero__sub">{g["sub"]}</p>
   <a class="back-link" href="../">← All guides</a>
  </div>
 </section>
 <main class="guide-body">
  <div class="wrap measure">
{sections}
   <div class="guide-cta">
    <p>{g["cta_why"]}</p>
    <a class="btn-brass" href="{g["cta_href"]}">{g["cta_label"]}</a>
   </div>
  </div>
 </main>
"""


def hub_body() -> str:
    items = []
    for g in GUIDES:
        items.append(
            f"""   <a href="{g["slug"]}/">
    <span class="utility" style="color: var(--gl-gold);">Guide</span>
    <p class="guide-list__title">{g["h1"].rstrip(".")}</p>
    <p class="guide-list__blurb">{g["sub"]}</p>
   </a>"""
        )
    return f""" <section class="guide-hero">
  <div class="wrap">
   <p class="utility" style="color: var(--gl-gold);">Guides</p>
   <h1>Practical guides for local businesses.</h1>
   <p class="guide-hero__sub">Short, useful reads for established local businesses with a real operation; premises, appointments, customers who turn up. Each guide ends with a free tool you can set up in about a minute.</p>
   <a class="back-link" href="../index.html">← Back to the free tools</a>
  </div>
 </section>
 <main class="guide-body">
  <div class="wrap">
   <div class="guide-list">
{chr(10).join(items)}
   </div>
  </div>
 </main>
"""


def write(path: Path, title: str, desc: str, body: str, depth: int) -> None:
    asset_prefix = "../" * depth
    home = "../" * depth + "index.html"
    about = "../" * depth + "about/"
    guides_hub = "../" if depth == 2 else "./"
    if depth == 1:
        guides_hub = "./"
        home = "../index.html"
        about = "../about/"
        asset_prefix = "../"
    html = SHELL.format(
        title=title,
        desc=desc,
        asset_prefix=asset_prefix,
        home=home,
        about=about,
        guides_hub=guides_hub if depth == 1 else "../",
        body=body,
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")
    print("OK", path.relative_to(ROOT).as_posix())


def main() -> None:
    write(
        ROOT / "guides" / "index.html",
        "Guides for local businesses · Grow Local",
        "Practical guides for established local businesses; Google listings, reviews, quote forms and booking links. Free tools included.",
        hub_body(),
        depth=1,
    )
    for g in GUIDES:
        write(
            ROOT / "guides" / g["slug"] / "index.html",
            g["title"],
            g["desc"],
            guide_body(g),
            depth=2,
        )


if __name__ == "__main__":
    main()
