# Cosmoq reference adaptation

## Text and orb addition — 9 October 2026

The supplied text/orb screenshot is reproduced in a dedicated, full-width black section after the value strip. Existing hero, business copy, links, background video, Exceptionalities section and six industry pages are preserved. The statement uses the existing hero description and after-call actions, condensed to match the five-line reference composition. The supplied QuikTalk headset is rendered white through CSS, with the QuikTalk AI label centered below it.

The live reference and its public component source establish Inter Display 400, 1.2 line height, -.03em tracking, white text over a 40% white base, and a reversible scroll range from viewport bottom to center with a 140px desktop offset. The screenshot shows approximately 1.5x the reference's native 48px text / 346px sphere. This implementation scales the composition with the viewport (72px type and a 520px orb at approximately 1848px), then stacks at 809px. There is no pinned scroll or scroll interception.

The 14,952-byte sphere texture is self-hosted as `dist/assets/statement-orb.webp`, from `https://framerusercontent.com/images/emEabgUGaj1mrFtUh9nCcNLOsk.webp?width=692&height=692`. Its original pixels and the reference's brightness(1.3) treatment are preserved. A 75-degree starting orientation positions the warm light upper-left and cool light below. The reference continuously rotates its texture; the user's request for subtle, scroll-connected motion is implemented as a bounded 10-degree rotation and 14px drift instead. The mobile sphere has its own progress so it continues moving after the paragraph has been read.

Text is accessible once in the semantic paragraph; the white opacity overlays and orb are decorative. Progress is handled by the existing shared on-demand animation frame, with geometry reads before writes, 65ms time-based interpolation, font/resize resynchronization and exact settled endpoints. No dependency or continuous idle animation loop is added. No-JavaScript text remains white; the existing system/saved reduced-motion controls reveal all words and stop orb movement.

Date: 8 October 2026.

## Source and interpretation

User supplied `index.html` and `styles.css` from the Cosmoq automation and AI agent template export. The local reference was rendered and inspected, including its animated horizon and foreground dashboard. Design, frontend/performance and accessibility specialists independently reviewed the source. The template content is reference material only.

| Feature | Extracted reference | QuikTalk adaptation |
| --- | --- | --- |
| Canvas | Black, near-black surfaces, white text, cool muted text | #030504 base, dark green-neutral surfaces, #f4f7f3 text, green accents |
| Content | 1200px maximum, 40px desktop and 20px mobile gutters | Same container rhythm |
| Display typography | Inter Display, H1 82/58/46px, weight 500, 1.2 line height, -.03em tracking | Same headline scale, with 39px only at the narrowest widths |
| Section headings | 56/45/36px, weight 400, 1.2 line height, -.02em tracking | Same hierarchy, 32px narrow-screen exceptions |
| Navigation | Separate logo, blurred central capsule and illuminated CTA | Same three-part desktop structure; readable single-column mobile menu |
| Hero | Centered headline and subcopy, atmospheric video, large foreground dashboard | Unchanged QuikTalk headline/copy above a wide booking-assistant example |
| Background | 857px desktop video with bottom mask, frost layer, blue/orange horizon | Supplied video with green CSS treatment, smooth bottom fade, lightweight stable scrim; static CSS horizon at smaller sizes |
| Surfaces | 24px panels, 1px translucent edges; buttons approximately 16px radius | Thin dark panels and internally illuminated green buttons |
| Rhythm | Approximately 80px section/heading gaps, varied compositions | Centered industries/process, editorial roles, split workflow, four control cells, centered FAQ and horizon CTA |
| Motion | Recorded Framer entrance data: title y80/scale.9 over2s; background1.6s; delayed CTA | Shorter accessible entrance with same ease-out character; bounded scroll drift, finite reveals, existing reversible native disclosures |

The export did not include the complete local Framer interaction implementation. Hover/exit/parallax behavior is an informed adaptation; exact byte-for-byte runtime reproduction is not claimed. No Framer dependency or particle runtime was copied.

## Assets

The hero video URL was explicitly present in the supplied reference:
`https://framerusercontent.com/assets/XyQKBChh8CZBaaXrJoxPbwvI.mp4`

Its original pixels are preserved; CSS uses grayscale, sepia and hue rotation to fit QuikTalk green. File size is 4,734,221 bytes. No poster existed in the source, so the fallback is a CSS horizon with translucent light columns. Mobile/tablet up to900px and reduced/data-saving modes do not initially request the video. Loading failures leave the fallback visible.

Five Latin WOFF2 font files come from the reference's declared font-face URLs: Inter400/500/600 and Inter Display400/500. They are self-hosted; no remote fonts or scripts run on the page. The existing supplied headset PNG remains unchanged.

## Content gate

The preceding revision is `b6913e0ab8bb345e3ce9aa41fb14976721367679`. Before edits, a snapshot recorded normalized text, ordered link labels/destinations and metadata for all7 generated pages. `scripts/check-content.py` compares the finished output to that snapshot; only theme-color is deliberately excluded. It passed exactly.

Unchanged `src/content.mjs` SHA256:
`2158B9CAE03870BCDED73217A28D6D4ABB5AC28858756B9E412311933B4F126F`

The background control contains no additional business copy. Its stable accessible label is “Reduce background motion,” with pressed state meaning reduction is enabled. The original footer toggle retains its wording. Audio remains deferred and the demos still contain only clearly labelled illustrative conversations.
