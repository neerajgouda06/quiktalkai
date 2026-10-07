# Voice-first revision — QA notes

Revision date: 7 October 2026.

## Scope

Home page plus six independent industry demos. Audio was explicitly deferred; the site contains labelled fictional written conversations and illustrative follow-up outputs.

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

