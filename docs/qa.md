# Voice-first revision — QA notes

## Approved comparison — 9 October 2026

- Added the five-row approved concept after How it works. Desktop table, mobile comparison cards, local Inter fonts and existing demo destination verified at 1440, 1024, 768, 390 and 320px.
- Heading/row entrances, drawn checkmarks and finite green glow verified. Twenty-three finite animations were observed on desktop; they settled to zero and did not replay on re-entry. Dynamic reduced motion cancelled active animations; OS-reduced, saved-reduced and no-JavaScript fallbacks retained all five rows.
- No new text clipping or section overflow. Existing unrelated decorative page overflow remains 393px at a 390px viewport and 330px at 320px, as previously documented.
- Browser runtime errors: none. Homepage markup outside the added section and its CSS/JS references matched baseline; six industry HTML hashes were unchanged. Evidence: `../qa-evidence/comparison/results.json` and `implemented-*.png`.
- Scope: local browser and source checks; no screen-reader session or live business integration was tested.

Revision date: 7 October 2026.

## Scope

Home page plus six independent industry demos. Audio was explicitly deferred; the site contains labelled fictional written conversations and illustrative follow-up outputs.

## Text and orb section — 9 October 2026

- Compared the supplied screenshot and live COSMOQ component source. Desktop now has five lines of Inter Display regular, a 519.64px sphere and 72.07px type at 1848px. Independent visual review found no blocking defect in desktop or 390px mobile screenshots.
- Headless Edge/Playwright checked 1848, 1440, 1024, 810, 809, 768, 390 and 320px widths. Forward/reverse word opacities match, intermediate values interpolate, and both endpoints settle exactly. Refresh restores progress. Mobile sphere moves while visible independently of the text.
- Device reduced motion, the existing saved motion toggle, and JavaScript-disabled white text passed. Browser runtime error list is empty. The six industry HTML files retain their pre-edit hashes. Homepage markup outside the added section is preserved.
- No additional horizontal overflow. The saved baseline and finished page both measure 393px at a 390px viewport and 330px at 320px because of an existing decorative hero light. That unrelated hero is preserved; the new section is contained at every checked width.
- Thirteen deterministic checks cover scroll reversibility, initialization/restoration, hidden-page wake, font/resize handling, preference changes, missing-section behavior, frame coalescing and termination. 600 synthetic scroll events coalesce into one queued animation frame. Visible opacity/transform layers receive compositor hints that are released offscreen.
- Performance limitation: on this test host, the final desktop scrolling sample measured a 32.4ms median frame and 203.7ms p95; idle was 16.5ms median and 24.1ms p95. JavaScript callbacks measured 0.1ms median / 13.6ms p95. Stable 60fps while scrolling is **not verified** and must not be claimed. A real-device performance pass remains advisable. Source/build syntax checks passed.

Evidence is saved outside the deployed project in `../qa-evidence/orb-browser-report.json`, `orb-performance-report.json`, `orb-motion-vm-results.json`, and `orb-*.png`.

## Passed

- Build completed for all seven pages. Browser and build JavaScript syntax checks passed.
- Read-only source audit: seven unique page titles, one H1 per page, no broken internal links or fragments.
- Browser checks: every page at 1440px and 390px; home and hospitality pages additionally at 1920px, 1024px, 768px and 320px. Document width matched the available viewport at every checked size; no horizontal page overflow.
- Trades hero link opens the correct standalone page; example-call and after-call links navigate to their sections.
- Mobile Menu opens, closes with Escape, returns focus to its button and closes after selecting How it works.
- Native outcome disclosures and the FAQ expand with Enter. Focus on an outcome summary is visible inside its card.
- Browser console inspection returned no errors or warnings.
- All six industry pages contain no audio elements while audioUrl is null. No fake audio controls, timings or waveforms.
- Content review matched enquiries, details, preferences and follow-up messages across all scenarios. Hospitality explicitly confirms 7 pm and shares a booking already created during the call.
- Visual review found no layout/readability blocker in the desktop trades and mobile outcome screenshots.
- The How it works section has exactly three steps, presented in a desktop row and a mobile column.

## Findings fixed

- Mobile navigation now collapses only when the JavaScript enhancement has initialized. Without JavaScript, the primary navigation remains visible and the menu button stays hidden.
- Outcome-summary focus outlines are inset so the card cannot clip them.
- Eight low-contrast text selectors use the darker shared muted colour.
- Metadata/captions are at least 12px; call conversation text is 15px.
- Decorative card and process numbers are hidden from assistive technology.

## Limits

No screen-reader session, real telephone call, connected calendar/CRM, customer workflow execution, audio playback or enquiry submission was tested. No audio has been supplied. The existing booking and email destinations are retained; no external message was sent.

Accessibility work consists of source review, contrast calculations and keyboard/browser checks, not a claim of full WCAG conformance. Browser zoom was not separately tested. Motion and forced-colour fallbacks were inspected in source.

The Site remains owner-private and does not replace the public QuikTalk website.

## Motion revision — 8 October 2026

- Read-only specialist reviews covered design/storytelling, frontend performance and accessibility. Findings fixed: focused entrance race, mobile expanded-menu anchor offset, rapid disclosure opacity reversal, connector endpoint thresholds, touch hover and reduced-motion arrow transforms.
- Rebuilt all seven pages and checked the motion JavaScript syntax successfully.
- Browser checked home and hospitality at 320px and 768px, home at 390px by 500px, and home/trades at 1440px. No horizontal overflow at the checked sizes.
- At 390px by 500px, the expanded Menu closed after selecting How it works. Its heading remained below the sticky header (heading top about 197px; header bottom about 77px). Escape closed the menu and returned focus to Menu.
- The hospitality after-call heading at 320px remained below the sticky header (about 128px versus 77px).
- FAQ Enter/Space activation and rapid reversal settled correctly. Initially open trades outcome details closed/reopened with keyboard input, with the temporary overflow style removed afterwards.
- The Reduce motion control changed the page to reduced mode, removed the compact-header transform, completed the connector and persisted to the trades page. Restored full motion through the same control after testing.
- Browser console inspection during the interaction checks returned no errors or warnings. Hospitality still contained zero audio elements.
- The three-step connector, sticky glass header and retained headset logo were visually reviewed in desktop and mobile previews.

Limits for this revision: the browser inspection bridge does not expose document.getAnimations, so active-animation counts were not measured. Device-level reduced-motion behavior, coarse-pointer media handling, no-JavaScript fallbacks and lack of idle loops were source-reviewed rather than emulated in the browser. No screen-reader session, frame-rate benchmark or Lighthouse performance score is claimed.

## Cosmoq visual redesign — 8 October 2026

- Exact normalized text, ordered link labels/destinations and metadata comparison passed for all seven pages. The industry data file hash is unchanged. Only theme-color metadata changed.
- All seven pages checked at320px and1440px with no horizontal overflow. A decorative industry background initially exceeded the page edge; its bounds were corrected and all six industry routes rechecked.
- Home checked at390px by550px,768px and1440px. Mobile/tablet video had no src; desktop video fired its playing event and displayed the green atmospheric background. Title used Inter Display at82px desktop and46px mobile.
- Hero motion reduction toggled aria-pressed and removed video src. Returning to full motion restored normal behavior. The label remains stable so pressed state is unambiguous.
- Expanded mobile menu closed on How it works; heading was below the sticky header. Escape closed the menu. Tablet hero actions were centered after correcting an inherited alignment rule.
- FAQ and after-call native disclosures opened with Enter and reversed with Space. Temporary overflow cleared after completion. A320px expanded outcome showed its complete illustrative message and visible inset focus outline.
- Console inspection returned no errors or warnings. No call audio or fake playback controls were added.
- Desktop hero, industry cards and whole-page screenshots were reviewed against the supplied reference. Final visual review passed with no clipped sections or remaining light-theme surfaces. A translucent dark backing fixed the small hero note's contrast over the bright horizon.
- Source review covered dynamic data-saver changes, reduced motion, offscreen/hidden pause, source detachment at smaller sizes, and back-forward cache resynchronization. No idle JavaScript animation loop was added.

Limits: this is a visual, keyboard and responsive browser review plus source inspection. It does not claim screen-reader certification, device-level reduced-motion emulation, measured video frame rate, Lighthouse performance scores or live workflow/audio integration. Full template motion could not be established from its captured export; the implemented timing is deliberately bounded and documented in reference-design.md.

