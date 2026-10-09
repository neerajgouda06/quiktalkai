# Homepage booking assistant

The 9 October 2026 brief upgrades the existing three-column section without changing other homepage sections or industry demonstrations. The original green call emblem, heading, dividers, card material and trades link are retained. Tablet combines call/transcript above the workflow; mobile stacks call controls, transcript and workflow.

## Recording and cues

`dist/assets/booking-call.wav` is a genuine prerecorded synthetic sample, generated with Runway's James customer voice and Paula assistant voice. The UI says “Illustrative call · Generated voices.” It is 22.26 seconds, 24kHz mono PCM, with seven distinct speaking turns. It includes connecting silence, inter-turn pauses, a processing pause and an after-call tail. No microphone or runtime voice synthesis is used.

`src/booking-call.json` contains PCM-measured turn boundaries and sentence/pause cues. The build embeds this same data into the homepage. Short sentences reveal as phrases; longer responses reveal in two measured parts. The service, Thursday preference, morning preference and request status match the recording. No availability is claimed or real notification sent.

## One timeline

Audio mode uses the audio element's `currentTime`. Silent mode uses monotonic animation-frame elapsed time, with a four-second completed hold before resetting. Speaker, transcript, status, booking fields and workflow all derive from that position. Silent autoplay starts on viewport entry and never loads or starts audio.

Play resets the silent preview and starts the recording after resuming AudioContext. A single media source connects to an analyser and then the audio destination. Smoothed RMS waveform energy drives CSS properties for circle/ring scale, glow and sound bars. Customer pulses are restrained; assistant pulses are brighter. Silent mode substitutes a deterministic envelope, and processing uses a slow pulse. Reduced motion removes movement and holds the glow steady.

Pause preserves audio and all timeline states. Resume continues the same recording position; Replay resets every stage. “Watch silently” stops audio and restarts the silent preview. A separate “Pause demo” freezes silent mode. Buffering freezes progression; errors and a 15-second stalled-loading watchdog fall back to a usable silent preview.

Viewport exit/page hiding cancels the animation frame and suspends audio. Return resumes an already requested recording. Pending playback attempts have cancellation tokens, including rapid viewport changes, preventing intentional pauses from becoming false failures. Page teardown removes observers/listeners, frames, watchdog and the audio graph. Back/forward cache suspension is supported.

Transcript scrolling follows new messages while the visitor remains near the bottom, including responsive resizes. Visitors can scroll back without automatic scrolling interrupting their reading. All completed messages remain in the transcript. With JavaScript disabled, the full conversation and workflow remain readable and enhancement-only controls remain hidden.

## Verification

Isolated Chromium checks exercised actual decoded audio, amplitude changes, customer/assistant cues, audio and silent pause, resume, offscreen suspension/reentry, request completion, replay, switching to silent mode, failed media and no-JavaScript fallback. Desktop, tablet and mobile were checked at 1440, 1024, 768, 390 and 320 pixels. Section overflow is absent. A pre-existing page overflow outside this section remains at narrow sizes (393px document at 390px viewport; removing this demo leaves the same width).

Device reduced motion and silent completion/reset are checked separately. Evidence and reproducible focused checks are in the workspace's `qa-evidence/booking-demo/` and `booking-demo-check.cjs`. A bounded independent source review reproduced the rapid viewport race before the fix and verified preserved audio position afterward. An old undefined `motionButton` reference in the focus handler was removed because it threw on the new playback controls.

Checks cover Chromium and CSS breakpoints, not manual screen-reader certification or every browser/device. The recording and workflow are frontend demonstrations only.
