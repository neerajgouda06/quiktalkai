import { readFileSync } from 'node:fs';

const call = JSON.parse(readFileSync(new URL('./booking-call.json', import.meta.url), 'utf8'));
const escape = text => text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function bookingDemo(icon) {
  return `<div class="hero-demo glass booking-demo" id="booking-demo" aria-label="Illustrative AI booking assistant example">
    <div class="demo-label"><span>MEET YOUR AI BOOKING ASSISTANT</span><span class="example-badge">Example</span></div>
    <div class="booking-call">
      <div class="voice-emblem">${icon('phone')}<span class="voice-ring ring-one"></span><span class="voice-ring ring-two"></span><span class="voice-halo"></span></div>
      <div class="call-wave" aria-hidden="true">${Array.from({length: 15}, (_, i) => `<i style="--bar:${i}"></i>`).join('')}</div>
      <h2>Good conversations.<br>Great follow-through.</h2>
      <div class="call-controls" hidden>
        <div class="call-control-row"><button class="call-play" type="button" aria-label="Play sample call"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6Z"/></svg><span>Play call</span></button><button class="silent-toggle" type="button">Pause demo</button></div>
        <div class="call-meter"><progress class="call-progress" value="0" max="${call.duration}" aria-label="Sample call progress"></progress><span class="call-time">0:00 / 0:23</span></div>
        <div class="call-state"><span class="call-status" role="status" aria-live="polite">Ready</span><span class="call-mode">Silent preview</span></div>
        <p class="call-note">Illustrative call · Generated voices</p><p class="call-error" role="alert" hidden></p>
      </div>
    </div>
    <div class="mini-conversation booking-transcript" role="region" aria-label="Sample call transcript" tabindex="0">
      <p class="transcript-wait" hidden>Connecting<span aria-hidden="true">…</span></p>
      ${call.segments.map((segment, index) => `<article class="conversation-card ${segment.speaker === 'customer' ? 'mini-caller' : 'mini-ai'}" data-segment="${index}"><span class="speaker-label">${segment.speaker === 'customer' ? 'Customer' : `${icon('phone')} AI booking assistant`}<span class="speaker-wave" aria-hidden="true"><i></i><i></i><i></i></span></span><p>“${segment.phrases.map((p, i) => `<span class="transcript-phrase" data-phrase="${i}">${escape(p.text)}${i < segment.phrases.length - 1 ? ' ' : ''}</span>`).join('')}”</p></article>`).join('')}
    </div>
    <div class="hero-after booking-workflow"><span>THEN, AFTER THE CALL</span>
      <div class="workflow-save"><div class="workflow-label">${icon('note')}<strong>Details saved</strong><span class="workflow-check" aria-label="Details saved">${icon('check')}</span></div>
        <dl class="booking-fields"><div data-milestone="service"><dt>Service</dt><dd>Roof inspection</dd></div><div data-milestone="date"><dt>Requested day</dt><dd>Thursday</dd></div><div data-milestone="time"><dt>Preferred time</dt><dd>Morning</dd></div><div data-milestone="saved"><dt>Status</dt><dd>Request recorded</dd></div></dl>
      </div>
      <div class="workflow-connector" aria-hidden="true">${icon('arrow')}</div>
      <div class="workflow-team"><div class="workflow-label">${icon('people')}<strong>Team notified</strong><span class="workflow-check" aria-label="Team notified">${icon('check')}</span></div><p class="workflow-note">Demo only · Awaiting confirmation</p></div>
      <a class="hero-demo-link" href="/industries/trades/">Follow this example ${icon('arrow')}</a>
    </div>
    <audio class="call-audio" preload="none" src="/assets/booking-call.wav"></audio>
    <script type="application/json" class="booking-timeline">${JSON.stringify(call).replaceAll('<', '\\u003c')}</script>
  </div>`;
}
