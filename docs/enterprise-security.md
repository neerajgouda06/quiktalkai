# Data and privacy section

Added 9 October 2026, immediately after the enterprise Features section.

## Design and content

The COSMOQ reference at https://cosmoq.framer.website/ informed the composition: two 568px desktop columns with a 64px gap, 56px heading, three outlined principles, and four overlapping translucent planes. Tablet and mobile stack the copy above the artwork. The artwork is an original inline SVG diagram in QuikTalk's existing green palette. No COSMOQ image, logo, runtime or proprietary artwork was added.

Copy describes approved business information, agreed actions, human handoff and launch review. It does not claim an unverified certification, threat-detection service, encryption capability or compliance guarantee.

## Source boundaries

- `src/enterprise-security.mjs` renders the section and original accessible diagram.
- `dist/security.css` scopes layout, responsive behavior and animation to this section.
- `dist/security.js` adds scroll reveal, bounded desktop drift and visibility control.
- `scripts/build.mjs` imports the section after `enterpriseFeatures(icon)` and loads its CSS/JS on the home page only.

The shared animation system, industry templates and existing content were not changed by this section. Other user-authorized chats concurrently own Features, integrations and the earlier statement/orb section.

## Motion and fallback

Four planes illuminate sequentially with 600ms offsets on a six-second cycle. Subtle vertical movement runs only on desktop; scroll drift is bounded to 9px and updates only on scroll/resize. The diagram has no image fetch or loading state. A one-time 700ms entrance uses the site's existing easing and a backwards fill to avoid a delayed first-frame flash.

The system reduced-motion setting and existing `data-motion="reduced"` site preference disable all decorative animation. Loops pause outside the viewport and while the document is hidden. Content and the static diagram remain visible without JavaScript. The SVG has an accessible title and description, and the section's labels remain ordinary text.

## Verification evidence

Responsive screenshots and recorded assertions are stored outside the deployment under `../qa-evidence/security-after/`. A frozen pre-change site and industry hashes are in `../qa-evidence/features-security-before/`. Check those reports for measured pass/fail results and coverage limitations.

The final Edge/Chromium run passed 126 assertions at 1440, 1024, 768, 390 and 320px with zero browser errors. It verified four layers, sequential illumination, no section/text overflow, no-JavaScript rendering, both motion preferences, saved-preference restoration, and unchanged hashes for all six industry pages. Offscreen clock snapshots in `motion-recheck.json` confirm all 16 decorative loops remain paused. The finite parallax transition is allowed to finish after leaving the viewport.

Baseline document widths were 393px at a 390px viewport and 330px at 320px before this work. Those inherited page-wide overflows are outside this section; the new section is checked separately for any added overflow. Browser checks do not establish screen-reader or cross-browser certification.
