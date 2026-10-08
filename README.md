# QuikTalk AI — Voice agents and AI employees

A dependency-free, static marketing site with a voice-first home page and six industry demo pages.

## Build and preview

Run `node scripts/build.mjs` to generate the seven HTML pages, sitemap and robots file. Then run `node scripts/preview.mjs` and open http://127.0.0.1:4173/. The preview serves the existing `dist/` files. Keep the process running while viewing the site; press Ctrl+C to stop it. To use another port in PowerShell, set `$env:PORT = 4174` before starting the preview and open http://127.0.0.1:4174/ instead.

There are no package dependencies. The browser receives ordinary HTML, shared CSS and a small progressive-enhancement script.

## Editing

- `src/content.mjs`: six illustrative industry scenarios, AI employee roles, conversations, follow-up actions and human-handoff guidance.
- `scripts/build.mjs`: shared header/footer, home-page sections, industry-page template and page-specific metadata.
- `dist/styles.css`: design tokens, reflective glass material, layout, responsive rules and accessibility fallbacks.
- `dist/app.js`: mobile-menu behavior and future audio error handling.
- `dist/motion.css`: shared timings, subtle glass effects, process connector and reduced-motion styles.
- `dist/motion.js`: finite entrances, scroll progress, pointer light, disclosure transitions and the saved Reduce motion preference.
- `dist/reference.css`: the current dark visual system, local Inter fonts, centered cinematic hero and responsive component treatments. This stylesheet loads last.
- `src/grain.mjs`, `dist/grain.css`, `dist/assets/grain.svg`: shared decorative background grain. See `docs/grain-system.md` for reference measurements, placement, tuning and validation.
- `.openai/hosting.json`: existing private Sites identity; preserve it.

Rebuild after changing content or templates. CSS and browser JavaScript remain directly editable in dist, preserving the existing static architecture.

## Industry demonstrations

Trades & home services, dental & healthcare, real estate, automotive, hospitality and professional services each have an independent URL under `/industries/`.

All conversations use clearly labelled fictional callers and details. Follow-up records and messages are illustrative. Five examples create requests awaiting staff confirmation; the hospitality example shows a booking completed during the call using connected availability, followed by shared details, a confirmation and a team note.

Audio was explicitly deferred by the user. No play button, waveform, invented duration or simulated recording is displayed. The content model has `audioUrl: null` for each industry. To add an approved demonstration later, supply a supported audio file or HTTPS URL, update the conversation to match it, and rebuild. A native, non-autoplaying audio player will replace the recording notice. Keep the written transcript accessible.

The demos do not execute business workflows or contact anyone.

## Design and business sources

The supplied Figma Home Desktop frame (28-127) and glass images informed the light canvas, green palette, bold type, split hero, silver-rimmed navigation and dimensional panels. Glass is used selectively. The reference checkerboard is not embedded.

The user's latest direction makes voice agents the primary service, AI employees the role-based explanation, and agentic workflows the plain-language after-call story. This supersedes the original attachment's opposite positioning.

The existing QuikTalk website supplied the Auckland/NZ/AU context, industry use cases, integration examples and contact destinations. No testimonials, client logos, measured results or performance guarantees have been invented. Tool compatibility and actions depend on the client's agreed setup.

Conversion links open the existing enquiry page at https://www.quiktalkai.com/#demo or email admin@quiktalkai.com. No lead endpoint, CRM or new external submission is configured here.

## Validation and hosting

See `docs/qa.md` for checked scope and limitations. The existing owner-private Site is retained; this does not replace the company website or change its public domain.

The motion system has no external dependencies and keeps the underlying HTML visible. Read `docs/motion-system.md` before changing animation behavior.


## Brand asset

The header, footer and browser icon use the user-supplied transparent headset PNG at dist/assets/quiktalk-headset.png, with the existing QuikTalk AI wordmark. The original image is preserved unchanged.

## Reference redesign — 8 October 2026

The user-supplied Cosmoq HTML/CSS reference supersedes the earlier light/glass presentation. Its centered composition, Inter/Inter Display scale, 1200px content width, thin translucent borders, separate navigation capsule and cinematic horizon are adapted to QuikTalk green. The headset is unchanged and sits on a small light backing for legibility.

All existing text, CTA labels/destinations and metadata (except the theme color) were compared against the preceding revision on all seven pages. `src/content.mjs` is unchanged. No pricing, testimonials, product claims or sections from Cosmoq were added.

Fonts are self-hosted under `dist/assets/fonts` (approximately 137KB total). The supplied reference's 4.73MB atmospheric video is self-hosted at `dist/assets/atmosphere.mp4` and colored green through CSS. The exported 72.7MB HTML, remote Framer runtime and embedded dashboard imagery are not included. `docs/reference-design.md` records measurements, adaptations and asset provenance.

Video starts only on visible desktop layouts with motion enabled and data saver off. It pauses offscreen/when hidden and detaches its source for reduced motion, data saver or smaller layouts. A CSS horizon remains without video or JavaScript. The hero's background-motion control and footer Reduce motion control share the saved preference.
