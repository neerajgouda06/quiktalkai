# AI Workflows and Web Development — 14 October 2026

All four service cards now open their own pages. The two additions are `/services/ai-workflows/` and `/services/web-development/`.

## Content and navigation

AI Workflows contains a direct definition, four capability topics, three labelled illustrative scenarios, a four-step setup outline, preparation guidance and eight FAQs. The existing “Less chasing. More done.” after-call panel was moved from the home page into this page, preserving its copy, example, links and visual treatment. Its new anchor is `#workflow-example`. The home card retains `id="ai-workflows"` for old home fragments.

Web Development covers audience and content planning, mobile layouts, enquiry paths, technical foundations, three example website briefs, project stages, preparation and eight FAQs. Illustrative briefs are not presented as client projects. The page makes no fixed-price, timeline, conversion, accessibility certification or ranking guarantee. Its footer invitation and contact button specifically discuss a website rather than a phone-call demonstration.

Both pages link to the three other services. The Infrastructure page and existing enterprise Technology feature now link directly to the Workflows page. Existing industry demonstration routes and enquiry destinations are retained.

## Implementation

- `src/ai-workflows.mjs` and `src/web-development.mjs` hold the individual content and metadata.
- `src/service-detail.mjs` renders the two new pages and their Organization, Service, WebPage and BreadcrumbList JSON-LD.
- `dist/service-details.css` is loaded only on those two pages. Existing artwork, local fonts, grain and shared site components are reused. No new dependency or browser script was added.
- `src/workflow-example.mjs` contains the moved after-call example.
- The shared footer accepts optional description and button text; existing pages use the original defaults.
- The build emits eleven HTML pages and includes both new routes in the sitemap.

## Search and answer-engine foundations

Both pages include unique titles/descriptions, canonical and social metadata, one H1, breadcrumbs, concise definitions, descriptive sections, visible FAQs and internal links. The structured data agrees with the visible service content and established NZ/Australia coverage. Content works without JavaScript. No hidden keyword content, special AI discovery-file claim, invented evidence or measured traffic/citation gain is included.

The approach follows [Google's AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features) and [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). The Site remains owner-private; [public accessibility is required for Google indexing](https://developers.google.com/search/docs/essentials/technical). No access-policy change or search-engine submission was made.

## Verification

Headless Edge checked both new pages at 1440, 1024, 768, 390 and 320px, with no horizontal page overflow or card containment failure. Desktop heroes, the Web Development mobile hero and the moved mobile workflow panel were visually inspected.

Checks passed for all four service-card destinations, removal of the after-call panel from the home page, eight keyboard-operated FAQs on each new page, three related service links, mobile navigation, accurate canonical/JSON-LD service names, no-JavaScript content and the website-specific contact invitation. Browser errors and failed resources: zero. All eleven static pages were checked for document headings, unique IDs, links, fragments and local assets. Existing non-HTML output files are unchanged.

No physical-device, screen-reader, live form submission or connected-business workflow test was performed. The sibling `qa-evidence/remaining-services` folder contains screenshots, the browser checks and verification results and is not deployed.
