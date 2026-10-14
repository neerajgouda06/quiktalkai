# Services — approved 14 October 2026

The Services section follows the voice statement and precedes Industry demos. The shared navigation now includes Services. Its two-column desktop grid becomes a single column at 809px and below.

The four approved titles and descriptions are real HTML in `src/services.mjs`. AI Employees links to the dedicated `/services/ai-employees/` page, AI Infrastructure to the connected-tools section, AI Workflows to the existing follow-up section, and Web Development and Let’s talk to the existing enquiry destination. No form submission or new external service was added.

## Artwork and texture

- AI Employees uses the original, unchanged `dist/assets/quiktalk-headset.png` logo, above a CSS glass plinth.
- `dist/assets/services-infrastructure.webp`, `services-workflows.webp` and `services-web-development.webp` are 900×600 transparent illustrations, approximately 213 KB combined. All load lazily with explicit dimensions. The built-in image-generation tool produced them from the approved mockup; WebP conversion retains their alpha channels.
- The generation brief for each asset was to isolate only its approved illustration on transparency, preserving chrome materials and sage reflections, with no labels, card background or grain. Individual subjects were the three-slab server stack, four connected chrome workflow discs, and two overlapping dark-glass browser windows. The supplied QuikTalk logo was reused directly rather than regenerated.
- `dist/services.css` scopes all new styles. The existing monochrome grain SVG supplies separate, static page and card background layers, beneath artwork and text. No grain animation, new JavaScript or dependency was added. Forced colors hides the decorative texture, and reduced motion disables hover transitions.

## Verification

The build and source syntax checks passed. A separate headless Edge browser checked 1440, 1024, 810, 768, 390 and 320px layouts, artwork loading, internal targets, background-layer order, navigation spacing and card containment. Keyboard activation/focus, the mobile Services menu link, no-JavaScript content and forced-color grain hiding passed. There were no page errors or failed resources.

The existing decorative mobile page overflow remains 3px at 390px and 10px at 320px, as documented in earlier QA; the new cards stay inside both viewports. Desktop and both small-screen screenshots were inspected. No physical-device or screen-reader session was performed.

The approval picture, browser script, screenshots and results are in the sibling `qa-evidence/services` folder, outside the deployed site.
