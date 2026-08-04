**Growlocal \- ADDITIONAL CHANGES THAT ARE REQUIRED**

Landing page \- The headline that says: "More customers, fewer headaches, nothing to pay." I want you to change the colour of the "Nothing to Pay" to the gold colour. 

Landing page (Header section) \- The bullet points. 

* Change “Start using it immediately.” to “Add your business name.”  
* Change “No sign-up required.” to “Start using it immediately.”  
* Change “No sales pitch.” to “No sign-up required”

Landing page (Header section) \- Change the Sub-header from “Six practical tools for high-street business.” to “Six practical tools for established local businesses.”

Landing page (Choose A Tool section) \- In the Google Review QR tab, change the tagline from “More recent reviews means higher in local search” to “More recent reviews means You’re higher in local search”

The “Instant Quote Form”, “Google Review QR” and “Instant Valuation” tools do not have any copy on its product page and only show the forms. Pls read the “Grow Local — Copy & Build Specification (v2)” and the “Grow Local — Companion Build Document” and use them to rebuild the page

In the “foundation scorecard” product page, the “Need a Hand?” section is misaligned from the rest of the page. please correct this. It is misaligned in terms of that section extending much wider past the product page and does not align with the rest of the text or copy on the product page. Please amend this. 

**Please make these Additions BELOW to the Review Reply Writer PRD and implement them — model, provider and guardrails**

Build the Reply Writer **provider-agnostic**. Don't hard-code any one vendor's SDK. Call the model through an OpenAI-compatible chat-completions interface so the provider and model are set by config/environment variables and can be swapped by changing one string, with no code rewrite.  Just to let you know I’m using Openrouter and I have updated the Netlify environment variables with this.

**Provider and model**

* Route through **OpenRouter** (one OpenAI-compatible key, many models, lets us switch freely). Keep Groq and Together AI in mind as drop-in alternatives.  
* Default model: **DeepSeek V3.2** (open-weight, cheap, more than good enough for this task). Keep **Google Gemini Flash-Lite** configured as a one-line fallback in case a provider has an outage.  
* Put the provider base URL, API key and model name in environment variables — never in client-side code, never committed to the repo.

**This call must be server-side only.** The key must never appear in the browser or in any artifact source. The page calls our own backend endpoint; the backend calls the model. If that isn't possible in the current setup, stop and flag it rather than exposing the key.

**Cost guardrails**

* Cap output at \~120 tokens (the PRD's 80-word limit) via max\_tokens. Never leave output length unbounded.  
* Cap input: reject or truncate any pasted "review" over \~1,500 characters — real reviews are short, and a giant paste is either abuse or a mistake.  
* Rate-limit per IP: a sensible ceiling (e.g. \~10 generations/hour) to stop anyone hammering the endpoint and running up the bill or draining the free tier.  
* Add a usage / spend **alert** at the provider (OpenRouter) if available, so rising cost is noticed early. A hard monthly spend **cap** that kills the tool is not required unless Craig asks for one.  
* Don't retry automatically more than once on failure — retry loops multiply cost.

**Safety and quality guardrails (these still live in the system prompt regardless of model)**

* Enforce every rule from PRD §3.3: never invent facts, never admit legal liability or fault for injury/damage, never dispute the reviewer point-by-point in public, never offer refunds/discounts/compensation, never name a competitor, move anything touching injury/health/safety/legal offline immediately.  
* Keep the on-screen line above every draft: "Read it before you post it — this is a starting point, not the final word."  
* On any model or provider failure, show a plain message plus the text-us line. **Never fall back to a canned template reply** — a generic auto-reply posted under a real review is worse than none.

**Privacy**

* Don't store pasted review text beyond the session unless the owner explicitly saves it.  
* Prefer a provider/model with a no-training-on-data policy, and confirm which one that is before launch. If EU/GDPR data residency becomes a concern for UK customer data, **Mistral Small 4** is the swap-in option, which is exactly why we're keeping this provider-agnostic.

With regards to creating new baserow tables and updating baserow, I prefer you do this programmatically. I have updated the .env file with my baserow login and password so complete all baserow tasks programmatically and keep me updated.  Once you create the tables I can then provide you the table ID.  

Update the Grow Local brand URL to www.growlocalbusiness.co.uk. Update this on the flyer and on the landing page and in all necessary files. 

Make sure the landing page and each of the product pages align well in mobile view and that there is no misalignment in terms of the design and the view when viewing on a mobile. 

Replace every instance of "high street" and any high-street framing. Our audience is **established local businesses with a physical operation** — garages, trades, home-improvement firms, professional services, clinics, agents — based in workshops, yards, industrial units, offices or from home. Position us warmly around **"local business"** rather than "the high street," and never imply we serve micro-businesses, corner shops or small retail. Where examples are used, choose ones that signal a real operation and higher-value work (a kitchen fitter, an accountancy practice, a dental surgery), not a newsagent or a market stall.  Please amend the landing page, product pages, the flyer, and any other relevant pages or files where there are references to high street, or have high street framing, or indicate that we support micro businesses or small retail stores. Please remove any of those types of references and replace them with this angle of established local businesses with a physical operation. For example, anywhere that reads "a growth agency for high-street business" , change to → "a growth agency for local business."