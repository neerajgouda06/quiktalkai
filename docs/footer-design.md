# Cinematic CTA and footer — 9 October 2026

The supplied COSMOQ screenshot is the primary composition reference. The live
reference was also inspected at 1440, 1920, 768 and 390 pixels. Its Inter Display
regular type, closely joined circular letters, repeated cropped wordmarks,
illuminated dark CTA and static grain inform this treatment.

## Implementation

- `src/footer-art.mjs`: original geometric QUIKTALK AI SVG paths, circular Q,
  curved U, dim cropped Q echoes and layered ink gradients. The reference's
  wordmark is not reused as the site's branding.
- `dist/footer.css`: isolated final-section styles, continuous layered radial
  lighting, a curved light band, crisp foreground content, static grain above
  art and below interactive content, responsive crops and forced-color fallback.
- `scripts/build.mjs`: shared final CTA is placed within the footer composition;
  preserves home and industry CTA headings, existing copy, link order, headset,
  destinations, motion preference and metadata. Rebuilds all seven HTML pages.

No dependencies, decorative image downloads, animation loops or WebGL were
introduced. The existing stitched monochrome grain and self-hosted Inter fonts
are reused. SVG dimensions reserve space before fonts load. Decorative layers
are hidden from assistive technology and cannot receive pointer events or focus.

## Validation

Local evidence is in `../qa-evidence/footer/` relative to the project checkout's
parent workspace, including reference captures, responsive after screenshots,
an industry capture, no-JavaScript capture and `report.json`.

Browser checks cover 1440, 1920, 768, 390 and 320 pixel widths, all six industry
pages, homepage and industry content/link/metadata preservation, unchanged
layout of earlier homepage sections, footer foreground bounds, reduced-motion
video behavior, keyboard focus, forced colors and JavaScript-disabled rendering.
Screenshot review prompted corrections to the mobile Q crop and heading break,
desktop echo placement, and the under-letter light band.

## Intentional differences and limits

QUIKTALK has a longer wordmark with fewer circular letters than COSMOQ. Its
custom Q/U geometry and cropped Q repeats carry the reference's circular rhythm,
while retaining the actual brand. Green dominates the center; amber and muted
cyan remain supporting atmospheric accents. Existing secondary contact copy
and three footer content groups are retained, so spacing differs from the
reference's single CTA and four columns. Mobile crops the decorative wordmark
deliberately; the actual logo and all interactive content remain readable.

The existing unrelated hero overflow is 3 pixels at 390 and 10 pixels at 320.
The new footer is contained at both widths and creates no additional overflow.
Screenshots establish visual quality; no pixel-perfect claim or physical-device
performance certification is made. The existing private Sites publication is
updated; this checkout does not control the public quiktalkai.com domain.
