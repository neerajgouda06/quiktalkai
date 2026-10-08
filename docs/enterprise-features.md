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

The user requested faithful recreation of the supplied public reference. The three brand-free reference images below are self-hosted; CSS tints them to the site's green palette.

- `features-technology.webp`: https://framerusercontent.com/images/4ABnXaFshXBVkaMyEU2NjeeqE.webp (788×922)
- `features-data.png`: https://framerusercontent.com/images/rYyqmKb6ZW8scPMDoDnkLicukfc.png (591×692)
- `features-orb.png`: https://framerusercontent.com/images/LSyUU59PqiiX3GNMxMMlFDJb8I.png (478×478)

QuikTalk's existing headset is preserved. The reference's COSMOQ wordmark and baked-in Banking Agent card labels are not used. Usage cards instead show the site's receptionist, booking assistant and enquiry assistant. Total added raster assets are approximately 298KB. All image dimensions are reserved and images are lazy loaded.

Reference inspection and focused browser QA evidence are in the workspace's `qa-evidence/features-reference-*` and `qa-evidence/features-qa/` folders, outside the published site.
