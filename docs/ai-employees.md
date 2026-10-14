# AI Employees page — 14 October 2026

The two supplied screenshots showed the same employee-role section. That section has been moved once from the home page to `/services/ai-employees/`. Its original heading, introductory copy, three role names, descriptions and chrome icons are preserved. The page heading is now its H1, with role names as H2s.

The AI Employees service card, shared navigation and existing enterprise-feature link now open the new page. The home card retains `id="ai-employees"` so an old home-page fragment still lands on a useful link. Infrastructure, Workflows and Web Development retain their existing destinations.

## Visitor content

`src/ai-employees.mjs` supplies the definition, practical capabilities, human handoff guidance, six clearly labelled illustrative industry examples, a four-step setup outline, a call-handling comparison and eight FAQs. The answers cover compatibility, booking approval, exceptions, after-hours scope, quote factors and what information the business should provide. No new prices, guaranteed outcomes, client stories, legal compliance claims or unsupported integrations are asserted.

`dist/ai-employees.css` is loaded only on this service page. Shared fonts, navigation, role-card materials, static grain, footer and enquiry destination are reused. No dependencies, generated imagery or new browser script were added.

## Search and answer-engine foundations

- Unique title and description, canonical URL, social metadata, one H1, semantic sections and a readable definition.
- Native HTML content and FAQ disclosures, available without JavaScript.
- Internal links from the home page and all shared navigation, plus links to the six existing industry demonstrations.
- The new route is included in the XML sitemap. Existing robots directives are preserved.
- JSON-LD describes the visible Organization, Service, WebPage and BreadcrumbList. Provider details, NZ/Australia service areas and contact email match visible existing business information. No review scores, prices or fabricated evidence are included.

The content follows [Google's helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [guidance for AI features](https://developers.google.com/search/docs/appearance/ai-features): useful information, internal discovery, textual content and structured data that agrees with the page. No special AI file, keyword stuffing or guaranteed citation/ranking claim was added.

The Site remains owner-private. [Google requires publicly accessible pages for indexing](https://developers.google.com/search/docs/essentials/technical), so this work prepares the page but cannot increase public rankings while access requires sign-in. Public access, Search Console verification/submission, crawl/index status and traffic or AI-citation measurement have not been enabled or claimed.

## Verification

Eight generated pages passed checks for one document title/H1, unique IDs, existing local links, fragment targets and asset references. JSON-LD parsed successfully and its page URL matches the canonical URL. Existing non-HTML assets are unchanged.

A separate headless Edge browser checked 1440, 1024, 768, 390 and 320px. The new page has no horizontal page overflow at these sizes. Desktop and mobile hero screenshots and the service overview were visually inspected. Checks passed for the service-card transition to the new page, removal of the old role section from the home page, three role cards, six demo links, eight keyboard-operated FAQs, mobile menu navigation and no-JavaScript content. Browser errors and failed resources: zero. No screen-reader or physical-device test was performed.

Evidence is in the sibling `qa-evidence/ai-employees` directory and is not published with the website.
