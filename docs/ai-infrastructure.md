# AI Infrastructure — 14 October 2026

The Infrastructure card opens `/services/ai-infrastructure/`. The existing connected-ecosystem panel was moved there from the home page, retaining its diagram, twelve local software logos in eight groups, grain and motion preferences. The accessible list label and note now explicitly identify the tools as examples that require compatibility review.

The service page explains AI infrastructure as the information, connections, permissions and operating rules behind an assistant. It includes four foundation topics, an illustrative booking-request sequence, a setup outline, preparation guidance and eight FAQs about compatibility, existing software, hosting, related services, data location, account ownership, failures and cost factors. Scope-dependent actions are qualified; no fixed price, certification, uptime, residency or universal compatibility claim is made.

## Implementation

- `src/ai-infrastructure.mjs`: page content, FAQs and structured data.
- `dist/ai-infrastructure.css`: responsive page styles. The approved server artwork is reused unchanged.
- `src/integrations.mjs`: retained diagram and clarified example-tool note.
- `src/services.mjs`: card destination and useful legacy fragment targets.
- The home enterprise Data feature links to Infrastructure. The Employees page includes a contextual link; Infrastructure links back to Employees and the dedicated Workflows page.
- `scripts/build.mjs` emits nine HTML pages and adds Infrastructure to the sitemap. The homepage no longer loads integration-specific CSS or JavaScript.

## Search and answer-engine foundations

The page has a descriptive title, meta description, canonical and social metadata, one H1, breadcrumb navigation, a direct definition, question-led answers and contextual links. JSON-LD describes the visible Organization, Service, WebPage and BreadcrumbList with the established NZ/Australia service areas and business contact details. All information and native FAQ disclosures work without JavaScript.

This follows [Google's AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features) and [helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). No keyword stuffing, invented evidence, special AI-file requirement or ranking/citation guarantee was added.

The Site remains owner-private. [Public accessibility is required for Google indexing](https://developers.google.com/search/docs/essentials/technical); these changes prepare the content and technical structure but do not establish public search visibility. Search Console, indexing submission and traffic/citation measurement have not been configured.

## Verification

Headless Edge checked 1440, 1024, 768, 390 and 320px layouts, with no horizontal page overflow. Desktop/mobile hero screenshots and the mobile ecosystem panel were visually inspected. Checks passed for the home-card transition, absence of the ecosystem panel on the home page, cross-links between service pages, eight tool groups, eight keyboard-operated FAQs, mobile navigation, reduced-motion animation suppression and no-JavaScript content. Page errors and failed resources: zero.

The complete nine-page static output was checked for document headings, unique IDs, links, fragment destinations and local assets. Existing images, fonts, scripts and styles remain unchanged; only the expected HTML and sitemap changed among pre-existing output files. No screen-reader or physical-device test was performed. Evidence is in the sibling `qa-evidence/ai-infrastructure` directory, outside the deployment.
