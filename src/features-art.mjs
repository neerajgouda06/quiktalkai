// Local asset contract: copy the three matching files from qa-evidence to dist/assets.
// Every graphic is decorative; the accessible content belongs to the surrounding card.
const artIcon = (path, className = '') => `<svg class="feature-art-icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" focusable="false"><path d="${path}"/></svg>`;
const headset = 'M4 14v-3a8 8 0 0 1 16 0v3M5 12H3v7h4v-7H5Zm14 0h2v7h-4v-7h2Zm0 7v1a2 2 0 0 1-2 2h-4';
const calendar = 'M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2ZM7 3v4M17 3v4M3 10h18M7 14h3M14 14h3M7 17h3';
const message = 'M21 11a9 9 0 0 1-9 9H8l-5 2 1-6a9 9 0 1 1 17-5ZM7 9h10M7 13h7';
const agents = [
  [headset, 'Receptionist'],
  [calendar, 'Booking assistant'],
  [message, 'Enquiry assistant'],
  [headset, 'Receptionist'],
];
const agentCards = agents.map(([path, title], i) => `<div class="feature-art-agent feature-art-agent-${i + 1}"><div>${artIcon(path)}<span>${title}</span></div><i></i><i></i></div>`).join('');
const nodes = [
  'M4 5h16v14H4V5ZM4 6l8 7 8-7',
  calendar,
  message,
  'M12 3c5 0 9 2 9 4s-4 4-9 4-9-2-9-4 4-4 9-4Zm-9 4v10c0 2 4 4 9 4s9-2 9-4V7M3 12c0 2 4 4 9 4s9-2 9-4',
  'M14 2 5 14h7l-2 8 9-12h-7l2-8Z',
  headset,
];
const wirePaths = [
  ['M0 0C0 86.132 137.5 5 137.5 86.5', 'translate(0 .25)'],
  ['M124 0C124 86.63 0 5.029 0 87', 'translate(137.5 0)'],
  ['M0 0C0 80.5 100 12.5 100 86', 'translate(37.5 .25)'],
  ['M90 0C90 80.5 0 12.5 0 86', 'translate(137.5 0)'],
  ['M0 0C2.5 71.5 60 24.5 60 86', 'translate(77.5 .25)'],
  ['M54 0C51.75 71.5 0 24.5 0 86L0 317', 'translate(137.5 0)'],
];
const wires = wirePaths.map(([d, transform], i) => `<g transform="${transform}"><path class="feature-art-wire" d="${d}"/><path class="feature-art-signal" d="${d}" pathLength="100" style="--feature-art-delay:${i * -.37}s"/></g>`).join('');
const background = (name, width, height) => `<img class="feature-art-background" src="/assets/${name}" width="${width}" height="${height}" alt="" loading="lazy" decoding="async">`;
const globe = (className = '') => `<img class="feature-art-orb ${className}" src="/assets/features-orb.png" width="478" height="478" alt="" loading="lazy" decoding="async">`;

export const featuresArt = [
  `${background('features-technology.webp', 788, 922)}
    <div class="feature-art-agent-grid">${agentCards}</div>
    <div class="feature-art-prompt">${globe('feature-art-prompt-orb')}<span class="feature-art-prompt-text" data-feature-prompt>Book an appointment</span><span class="feature-art-cursor">|</span></div>`,
  `${background('features-technology.webp', 788, 922)}
    ${globe()}
    <img class="feature-art-brand" src="/assets/quiktalk-headset.png" width="1024" height="1024" alt="" loading="lazy" decoding="async">`,
  `${background('features-data.png', 591, 692)}
    <div class="feature-art-ecosystem"><div class="feature-art-nodes">${nodes.map((path, i) => `<span class="feature-art-node feature-art-node-${i + 1}">${artIcon(path)}</span>`).join('')}</div><svg class="feature-art-wires" viewBox="0 0 262 317" fill="none" focusable="false">${wires}</svg></div>
    ${globe()}`,
];
