# QuikTalk integrations experience

The homepage's former five-label integrations strip is replaced by the eight integration groups specified in the supplied brief. It is rendered by `src/integrations.mjs`, styled by `dist/integrations.css`, and progressively enhanced by `dist/integrations.js`. The build includes these resources on the homepage only. The section anchor is `#integrations`.

## Reference and adaptations

The reference is the “All-in-one AI for enterprise” section at https://cosmoq.framer.website/, measured in a live browser on 9 October 2026. Its actual interaction is a sticky left category rail alongside naturally scrolling, horizontally entering panels. It does not pin or swap a single card. The implementation preserves that composition: a 1200px frame, 252px desktop rail, 64px column gap, approximately 884×424px panels, 48px panel spacing and 24px corners. The regular 56px heading and 28px panel titles use the site's local Inter Display fonts.

QuikTalk's green palette, supplied headset identity, exact requested heading/supporting copy and eight integration groups replace the reference content. The eight workflow diagrams are illustrative descriptions, not live connections or an interactive booking system. The final ecosystem links back to each integration. No requests are made to the depicted business services.

## Motion

- Desktop cards move horizontally by up to 80px during entry. Travel decreases at narrower desktop sizes so content stays inside the viewport.
- Entry and exit include subtle scale, opacity and artwork parallax. Blur is limited to the earliest entry phase and never applied to a settled reading state.
- Rail progress is cumulative. One `aria-current="step"` identifies the current integration; completed links retain their progress.
- Connection pulses run only on visible scenes. There is no idle JavaScript animation loop; scroll frames use cached untransformed layout measurements and write transforms/opacity.
- Resizing, local-font readiness and changes to preceding sections refresh geometry. Layout measurements use `offsetTop`/`offsetHeight`, not animated bounding rectangles.
- At 809px and below the rail disappears and every card becomes a content-over-diagram narrative. No mobile pinning or horizontal card travel is used.

## Access and fallbacks

All eight cards and the ecosystem exist in static HTML. Native fragment links remain functional without JavaScript. Enhanced navigation respects modified clicks and moves keyboard focus to the chosen card. Device reduced-motion preferences and the site's saved Reduce motion preference remove transforms, blur, transitions and decorative loops. Hidden documents pause ongoing visual loops. Brand assets are local; diagrams require no animation library.

Asset provenance and verified source content are recorded in `integration-assets.md`. Browser validation evidence is kept outside the deployed site in `qa-evidence/integrations-after/`.
