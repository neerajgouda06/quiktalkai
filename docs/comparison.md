# Comparison section

Added 9 October 2026 after the user approved the image concept. The original comparison URL could not be loaded during concept preparation; the approved copy is a new comparison based on the existing website's described capabilities.

The homepage places `#comparison` immediately after How it works and before AI employees. `src/comparison.mjs` owns the five rows and semantic table. The build loads `dist/comparison.css` and `dist/comparison.js` on the homepage only. The table retains its row and column headers; mobile layouts show each row as a two-column card with repeated visible column labels. The existing Book a demo destination is retained.

## Motion

The heading and footer enter once in 620ms. Visible rows enter over 560ms with 80ms stagger; mobile uses 380ms and 40ms stagger. Check strokes draw over 380ms after a 180ms delay. A single 1500ms glow entrance softly highlights the QuikTalk column. Fine-pointer hover adds a restrained row highlight. There is no repeating glow or idle animation loop.

IntersectionObserver triggers finite Web Animations. Underlying content is always visible; no script-controlled hidden state gates reading. Device reduced motion and the site's saved preference disable entrances and transitions. Preference changes, hidden-page events and keyboard focus cancel running effects. Without JavaScript, IntersectionObserver or Web Animations, the complete section remains static and readable.

## Verification

Browser checks cover 1440, 1024, 768, 390 and 320px widths; table/card bounds and text fit; five rows; placement; complete static/reduced-motion rendering; one-time animation behavior; drawn checkmarks; settled animations; dynamic motion preference changes; and browser runtime errors. Screenshots and results are stored outside the published project in `../qa-evidence/comparison/`.

The homepage outside the added section and its stylesheet/script references is compared against the saved baseline. All six industry-page hashes are unchanged. This verification is local browser testing, not a screen-reader certification or live telephone/integration test.
