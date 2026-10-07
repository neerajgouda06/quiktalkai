# Validation record — 7 October 2026

## Completed

- Inspected the supplied Figma home frame in the editor and at its 1443px desktop prototype size, including the hero, navigation and industry cards. Studied both supplied glass material references.
- Research specialist retrieved the existing QuikTalk homepage and checked its business context, industries, integration names and contact links.
- UI design specialist reviewed the direction and contrast choices. An accessibility specialist reviewed source twice. A separate visual reviewer inspected desktop, mobile, employee cards and contact screenshots. The review's hero-copy correction was applied so mobile visitors also see “agentic systems”.
- JavaScript syntax validation passed using Node.
- Final browser overflow checks passed at 1920, 1440, 1024, 768, 390 and 320px. Document scroll width equalled its available content width at every tested size.
- Browser console inspection returned no warnings or errors during the tested flows.
- Employee dialog opens with the selected role; Escape closes it and restores focus. Its CTA closes the dialog and lands on the contact CTA with focus preserved.
- Industry tabs update the panel; arrow-key selection updates selected state and focus. Home and End are implemented in the same handler.
- Workflow step selection, reset, play and full completion were exercised. The completed example displays “Replay workflow” and its final outcome. Playback has a pause control and stops when the document is hidden.
- Mobile menu opens and focuses the first link; Escape closes it and restores the menu trigger.
- FAQ disclosure was exercised. All internal fragment targets resolve.
- Existing enquiry-page root, privacy policy and terms destinations returned HTTP 200. No lead form was submitted and no email was sent.
- The site uses local HTML, CSS and JavaScript; it has no third-party scripts, external fonts, image downloads or runtime framework dependencies.
- Static title, description, canonical URL, Open Graph text, robots and sitemap were checked for agreement.

## Corrected during review

Decorative glow overflow; small-screen headline wrapping; green-heading and small-copy contrast; mobile menu keyboard focus; accessible names matching visible labels; dialog contact focus race; redundant workflow announcements; entrance-transition placement. Main content paragraphs and small metadata were enlarged for readability.

## Scope and limits

The in-app Chromium browser was used. Screen-reader sessions, Safari/Firefox devices, 200% browser zoom and performance-lab scoring were not verified. Zoom keyboard shortcuts were attempted but did not provide a verifiable zoom state. Reduced-motion and forced-colours fallbacks were reviewed in source. This is not a WCAG conformance certificate.

Workflow activity is an explicitly labelled demonstration, not a live agent backend. Named integrations are examples requiring discovery and configuration. Booking reuses the company's existing enquiry page rather than a newly implemented lead service. The private hosted Site does not change the live QuikTalk domain.

Visual evidence is retained in the workspace's sibling `qa-evidence/` folder, outside the published assets.
