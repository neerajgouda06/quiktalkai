# Enterprise features

Added 9 October 2026. Reference: https://cosmoq.framer.website/, FEATURES / All-in-one AI for enterprise.

The reference has three stacked cards, a desktop sticky sidebar, and cumulative category highlights. It does not replace panels like tabs. This implementation retains the measured composition and adds category links and keyboard arrow navigation as requested. Mobile keeps a compact sticky category bar; the reference hides its sidebar on phones.

## Source and boundaries

- `src/enterprise-features.mjs` renders only this section, with existing QuikTalk roles, approved-information language and CTA destinations.
- `src/features-art.mjs` renders decorative local illustrations.
- `dist/features.css` and `dist/features.js` load on the homepage only.
- `scripts/build.mjs` inserts it after Exceptionalities. It does not replace any existing section.
- No new dependencies, global typography changes, navigation changes or edits to the existing motion system.

## Reference measurements

1200px container, 80px vertical padding and heading/content gap, 64px sidebar gap, sidebar/card proportions .4:1.4, 48px card spacing, 24px corners. Sidebar sticks at 120px on desktop. Below 1200px the sidebar moves above full-width cards; below 810px the cards stack their text and image with a .875 image aspect ratio. Heading sizes are 56/45/36px; card headings 28/22/20px.

Cards translate horizontally from 80px to zero over their viewport entrance on desktop and tablet, using transform only. Phone cards do not translate. Sidebar opacity and gradient reveal follow their corresponding cards. A 700ms heading entrance uses the existing site's easing. Orb rotation is 15s linear, path traces 2s, and decorative prompt typing follows the reference's 100ms type / 1000ms hold / 50ms erase / 400ms pause sequence.

Animations pause offscreen and when the document is hidden. Device reduced motion and the existing saved Reduce motion setting both settle the illustrations and scrolling. Without JavaScript all content and category anchors remain readable and usable. Decorative prompt text is excluded from accessibility output and has a fixed footprint.

## Asset provenance

The final implementation contains no newly copied COSMOQ images or logos. `dist/assets/features-orb-original.webp` is original artwork produced once with the built-in image-generation tool, then encoded to WebP with alpha preserved. It is 1254×1254 and displayed at 36, 145 or 240px. Abstract background lighting is native CSS gradients. The connection paths, floating source nodes and QuikTalk role cards are native interface diagrams. All image dimensions are reserved and images are lazy loaded.

QuikTalk's existing headset is preserved. Usage cards show the site's receptionist, booking assistant and enquiry assistant. The original generated PNG remains outside the published site at `qa-evidence/original-features-orb.png`.

Generation prompt: Create one entirely original centered spherical green-tinted frosted-glass orb on genuine transparent alpha, with soft mint rim light, dark forest-green central refractions, emerald reflections and a pale-lime lower-left glow. Keep an even transparent margin, restrained polished 3D rendering, smooth optical gradients legible at 145–240px, and no text, logo, headset, icons, interface, background, checkerboard, hard shadow, particles, rings or extra objects. Do not reference or copy COSMOQ imagery. Built-in image generation returned 1254×1254; its pixels and transparency were preserved.

Reference inspection and focused browser QA evidence are in the workspace's `qa-evidence/features-reference-*` and `qa-evidence/features-qa/` folders, outside the published site.
