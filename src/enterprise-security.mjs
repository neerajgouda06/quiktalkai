import { grain } from './grain.mjs';

// Original vector diagram: four translucent planes represent the boundaries
// agreed for a QuikTalk AI employee. No reference artwork is used.
const layerNames = ['Approved information', 'Agreed actions', 'Human handoff', 'Review before launch'];

const securityDiagram = `<svg class="security-diagram" viewBox="0 0 560 500" fill="none" role="img" aria-labelledby="security-diagram-title security-diagram-desc">
  <title id="security-diagram-title">Four layers of control around your AI employee</title>
  <desc id="security-diagram-desc">Approved information, agreed actions, human handoff and review before launch form four connected layers.</desc>
  <defs>
    <linearGradient id="security-chrome" x1="0" y1="0" x2=".35" y2="1"><stop stop-color="#7a8798"/><stop offset=".38" stop-color="#edf2fa"/><stop offset=".48" stop-color="#6a788b"/><stop offset=".75" stop-color="#d3deeb"/><stop offset="1" stop-color="#8190a3"/></linearGradient>
    <linearGradient id="security-glass" x1="0" y1="160" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="#d9e8ab" stop-opacity=".28"/><stop offset=".46" stop-color="#7ab67c" stop-opacity=".4"/><stop offset="1" stop-color="#619b8a" stop-opacity=".16"/></linearGradient>
    <radialGradient id="security-light" cx="0" cy="0" r="1" gradientTransform="translate(84 265) rotate(-28) scale(240 185)" gradientUnits="userSpaceOnUse"><stop stop-color="#d7e6a5" stop-opacity=".86"/><stop offset=".44" stop-color="#7fb873" stop-opacity=".56"/><stop offset="1" stop-color="#3a7165" stop-opacity="0"/></radialGradient>
    <linearGradient id="security-edge" x1="30" y1="60" x2="230" y2="420" gradientUnits="userSpaceOnUse"><stop stop-color="#e1f0bf" stop-opacity=".5"/><stop offset=".5" stop-color="#9bc9a1" stop-opacity=".12"/><stop offset="1" stop-color="#91bca1" stop-opacity="0"/></linearGradient>
    <linearGradient id="security-fade" x1="0" y1="0" x2="0" y2="480" gradientUnits="userSpaceOnUse"><stop offset=".1" stop-color="white"/><stop offset=".64" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient>
    <mask id="security-mask"><rect width="560" height="500" fill="url(#security-fade)"/></mask>
  </defs>
  <g mask="url(#security-mask)">
    ${[3, 2, 1, 0].map(index => `<g class="security-layer security-layer--${index}" style="--layer-index:${index}" transform="translate(${54 + index * 69} ${20 - index * 3})">
      <g class="security-layer-float">
        <path class="security-plane" d="M0 94 258 24V463L0 400Z" fill="url(#security-glass)"/>
        <path class="security-illumination" d="M0 94 258 24V463L0 400Z" fill="url(#security-light)"/>
        <path d="M.5 399.5V94.5L257.5 24.5V463" stroke="url(#security-edge)"/>
        <path class="security-trace" d="M0 94 258 24V463" stroke="#c9e8ab" stroke-opacity=".5" stroke-width="1" pathLength="100"/>
        <g class="security-plane-symbol" transform="translate(95 193) skewY(-8)" stroke="#e3f3d5" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
          ${index === 0 ? '<path d="M34 0 61 12v26c0 22-27 38-27 38S7 60 7 38V12L34 0Z"/><path d="m22 36 9 9 17-20"/>' : index === 1 ? '<rect x="8" y="16" width="52" height="47" rx="5"/><path d="M20 16V5h28v11M21 32h25M21 44h18"/>' : index === 2 ? '<circle cx="34" cy="23" r="13"/><path d="M8 69V58c0-15 12-24 26-24s26 9 26 24v11"/>' : '<path d="m15 35 14 14 27-31"/><circle cx="34" cy="35" r="32"/>'}
        </g>
      </g>
    </g>`).join('')}
  </g>
</svg>`;

export function enterpriseSecurity(icon) {
  return `<section class="enterprise-security grain-surface" id="data-and-privacy" aria-labelledby="security-title">${grain}
    <div class="security-container">
      <div class="security-copy">
        <div class="security-label">${icon('shield')}<span>DATA AND PRIVACY</span></div>
        <h2 id="security-title">Multi-Layer Security</h2>
        <p class="security-intro">Build your AI employee around approved information, agreed actions and clear handoffs. We review your data, access and privacy requirements before launch.</p>
        <ul class="security-principles">
          <li>${icon('note')}<span>Approved business knowledge</span></li>
          <li>${icon('shield')}<span>Actions within your rules</span></li>
          <li>${icon('people')}<span>Human oversight when it matters</span></li>
        </ul>
      </div>
      <div class="security-visual">
        <div class="security-parallax">${securityDiagram}</div>
        <ol class="security-layer-key" aria-label="Layers of control">${layerNames.map((name, index) => `<li><span aria-hidden="true">0${index + 1}</span>${name}</li>`).join('')}</ol>
      </div>
    </div>
  </section>`;
}
