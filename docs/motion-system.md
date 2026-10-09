# Motion system

Added 8 October 2026. The original layout, copy, green palette, silver glass and supplied headset logo are retained.

## Section map

| Area | Motion | Purpose |
| --- | --- | --- |
| Header | Brief entrance; compact glass treatment when scrolling | Keep navigation available without changing its layout footprint |
| Hero | Short headline and action stagger; caller, assistant and follow-up sequence | Introduce the service in the same order a customer experiences it |
| Glass surfaces | One reflection on hero/contact; pointer light on desktop hero/cards | Add depth without persistent movement |
| Industry cards | Grouped one-time entrances; 2px pointer hover lift | Make the available demonstrations easy to scan |
| How it works | Three fixed readable steps, measured connector and progressive dots | Explain the call and follow-up with a simple visual progression |
| Roles and workflows | Grouped entrances; three finite workflow highlights | Reinforce the relationship between a role and its actions |
| FAQ and after-call details | Native details with reversible 300ms height and 200ms opacity transitions | Reveal useful detail without an abrupt layout change |
| Contact and footer | Restrained entrance, reflection and link feedback | Give the page a clear ending |

## Timing and implementation

Shared CSS timings are 200ms for small feedback, 300ms for controls, 620ms for entrances and 1000ms for the largest decorative effect. Mobile entrances use 360ms, capped delays and 8px travel. Desktop entrances normally travel 16px. The longest automatic hero sequence finishes in approximately 1.77 seconds.

The Web Animations API handles finite entrances and disclosures. A shared IntersectionObserver triggers entrances once. Scroll and pointer events share an on-demand requestAnimationFrame; there is no idle animation loop. ResizeObserver measures header and process geometry. The only height animation is a user-triggered disclosure. No dependency, canvas, particle field, custom cursor or looping ambient effect was added.

The connector uses measured step offsets so its endpoint and dot thresholds match the responsive layout. Progress advances as the section is read. Content is never pinned or gated by scroll progress.

## Accessibility and fallback

Device reduced-motion settings take precedence over previously saved site preferences. The hero pause button and footer Reduce motion button were removed at the user's request on 9 October 2026; their styling and event handlers were also removed. Reduced mode cancels decorative animations, settles disclosures, completes the process connector and removes hover translation. Fine-pointer hover is separated from touch behavior.

Keyboard focus cancels an entrance affecting the focused control, and future entrances skip its ancestors. Disclosure state settles on resize, hidden-page events and preference changes. Closing content is inert only during its brief transition. Native details remain usable without the enhancement. HTML has no reveal-dependent hidden state, so content stays available if JavaScript, IntersectionObserver or animation support is unavailable.

The homepage booking demo was upgraded at the user's request on 9 October 2026. It owns its separate synchronized silent/audio timeline; its transcript and workflow are excluded from the original one-time hero entrance sequence. Audio never autoplays. Industry-page recordings remain deferred. See `booking-demo.md` for the measured call timeline and lifecycle behavior.
