# Background grain — 9 October 2026

## Reference findings

Live inspection of https://cosmoq.framer.website/ found a static 256×256 monochrome PNG in the hero, displayed at 128 CSS pixels with normal blending and 0.14 wrapper opacity. The noise image has no alpha; its native mean luminance is about 54/255. At half size its standard deviation is about 22.6, giving approximately 3.2 luminance levels of grain variation at the reference opacity. Three samples over 2.1 seconds showed no grain animation; the underlying video supplies movement.

The reference texture is https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png. Feature and footer artwork has texture in its raster images, while text panels remain clean. Reference screenshots and computed-style evidence are outside the published project in `../qa-evidence/grain-reference/`.

## Implementation

`src/grain.mjs` exports one empty, aria-hidden span. The build templates place it only on selected backgrounds. `dist/grain.css` provides the shared layer and `dist/assets/grain.svg` provides an original deterministic monochrome texture (465 bytes). No reference image is copied into the site.

- The 512px SVG tile uses stitched fractal noise, frequency .82, three octaves and seed 17. A single channel drives all three colour channels, avoiding coloured speckles. The tile is unscaled and seamless.
- Normal blending is deliberate: soft-light/overlay becomes nearly invisible on the darkest backgrounds. Opacity is 5% over the hero, 4% on feature illustration backgrounds, 3% on the workflow and ecosystem panels, and 2.5% on broad sections and the footer. Small screens and coarse pointers reduce these strengths by 20%.
- Background-only layers sit below content in isolated stacking contexts. Hero and feature-art layers sit within existing decorative backgrounds, above their imagery and below their foreground objects. Broad sections fade the texture at top and bottom; panels inherit their existing corner radius. Nothing changes section overflow or dimensions.
- Coverage: hero atmosphere, statement, how-it-works, workflow panel, features section and its illustration backgrounds, security section, ecosystem panel, shared contact/footer, and all six industry hero sections.
- Navigation, controls, logos, icons, body text, small cards, conversation panels, outcomes and data displays receive no foreground overlay. Opaque nested panels cover section grain rather than accumulating it.
- The grain is always static, including mobile and reduced-motion modes. It needs no JavaScript, observers, compositor hints, continuous filter animation, or new dependency. It is hidden in forced-colour mode and print. Failure to load the SVG leaves the original backgrounds intact.

Tune opacity in `grain.css`; keep `grain-overlay` under a `grain-surface` parent or one of the two explicitly supported decorative background containers. Avoid adding grain to both a transparent parent and its child.

## Validation

Chrome and Playwright WebKit checked all seven routes at 1440, 768, 390 and 320px (56 route/viewport checks). With the grain nodes and stylesheet removed, foreground positions and dimensions matched exactly and document width was unchanged. Existing mobile overflow, where present, is unchanged. Page errors: zero.

Both engines passed mobile menu/Escape, FAQ and outcome keyboard interaction, desktop video playback, the saved reduced-motion toggle, device reduced motion and no-JavaScript fallback checks. Two settled background screenshots taken 600ms apart were identical, confirming static grain. Chrome forced-colour mode hides all grain layers. Desktop, tablet and mobile screenshots were inspected directly against the reference; final tuning lowers the grain slightly outside the hero.

Removing only the grain hooks and stylesheet link gives the exact original HTML on all seven routes. Every pre-existing CSS file, browser script, font, image, video and other static asset is byte-identical to the pre-edit snapshot. Added runtime resources total approximately 2.2KB uncompressed, plus the small decorative markup.

Evidence and browser scripts are in `../qa-evidence/grain-final/` and `../qa-evidence/grain-check.cjs`. WebKit on Windows is a Safari-engine compatibility check; actual macOS/iOS Safari and physical low-powered devices were not tested. No frame-rate or full accessibility certification is claimed.

## Destination

The existing owner-private QuikTalk Site is the publication target. The separate public quiktalkai.com domain serves a different design and is not changed by this project.
