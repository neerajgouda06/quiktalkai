# Exceptionalities section

Updated 8 October 2026. Only the home page's existing `.control-section` is changed. Its four original benefit headings and descriptions remain in their original order. The fifth card reuses the site's existing contact copy and demo destination to match the reference's five-card composition. No shared brand tokens, header, footer, other sections, or industry pages were changed.

## Reference behavior

The public Cosmoq homepage markup, stylesheet, component code, and visibility helper were inspected. The section has two broad cards above three narrow cards, 32px gaps, 24px outer radii, and glass text panels inset 16px. The four background images and eight decorative SVGs are self-hosted in `dist/assets/exceptionalities-*`; CSS applies the existing green palette. The source artwork geometry lives in `src/exceptionalities-art.mjs`, imported by the existing build script.

Each card enters once when visible height reaches half the smaller of its height and the viewport height. It rises 20px and fades from zero to full opacity over 400ms with `cubic-bezier(.12,.23,.5,1)`. Delays are 0/100ms in the top row and 0/100/200ms in the lower row. Normal scroll exits do not reset the cards. The reference's sticky top is 120px, with no extra scroll runway; there is no scrubbed scale or long pin to reproduce.

Internal art follows the original four-state streak motion (1-second transitions), four-state node glow (1-second transitions at 1.5-second intervals), slider motion (4-second state intervals, including the third slider's delayed 3-second move), and opposing 25px/second icon rows. The slider spring is sampled from the reference's no-bounce solver. All loops pause outside the viewport and when the document is hidden.

## Responsive and accessible behavior

At 810–1199px the cards use two columns. Below 810px they become a vertical reading sequence, without sticky positioning. Entrances travel 12px, text panels retain readable sizing, and narrow-screen sliders scale down to leave room for the copy. The ticker repeats enough artwork for the widest single-column tablet layout.

The existing device and saved Reduce motion preferences disable the loops and entrances. The complete section remains visible and static without JavaScript or the required browser APIs. Keyboard focus immediately settles any entrance on the focused card. Decorative images and SVGs are excluded from the accessibility tree.

## Verification status

- Build and JavaScript syntax checks pass.
- The homepage outside this section is byte-equivalent to the original. All six generated industry pages are byte-equivalent. The shared content data is unchanged.
- Independent source review checked timing, trajectories, reduced motion, keyboard settlement, and responsive selector interactions.
- After user authorization, Playwright/Edge checks passed at 320, 375, 390, 430, 768, 810, 1024, and 1440px. The full section was compared with the live reference while scrolling; desktop card dimensions match within subpixel rounding. Mobile cards allow additional height for the existing copy, with a darker caption background for readability.
- Real touch swipes, system and saved reduced-motion preferences, and the no-JavaScript fallback passed. There were no console errors, clipped section text, section overflow, or section layout shifts after page readiness. Decorative animation is inactive in each static fallback.
- Unrelated content, computed styles, and visible geometry match the baseline. Preexisting page-wide overflow outside this section remains unchanged (10px at 320px, 6px at 375px, and 3px at 390/430px); every target card fits its requested viewport.
- Browser results and screenshots are in `../qa-evidence/exceptionalities-after/`, including `verification-summary.json`. Live-reference comparisons and final section screenshots are in `../qa-evidence/exceptionalities-visual/`.
