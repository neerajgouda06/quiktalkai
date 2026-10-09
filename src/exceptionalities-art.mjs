// Decorative geometry follows the reference's Speed, Depth, Control and Flexibility cards.
// All motion stays in the section stylesheet so the existing motion controller can pause it.
const speedPoints = [
  [[18.198529, -.45977], [54.963235, 8.735632], [101.838235, 21.37931], [54.963235, 8.735632]],
  [[84.742647, 102.528736], [79.044118, 48.965517], [73.713235, -2.068966], [79.044118, 48.965517]],
  [[40.992647, -2.068966], [-1.470588, 32.413793], [-1.470588, 32.413793], [20.220588, 14.712644]],
  [[101.838235, 92.183908], [10.477941, -2.068966], [10.477941, -2.068966], [53.860294, 43.218391]],
  [['calc(100% + 12px)', '90px'], ['-12px', '191px'], ['-12px', '191px'], [47.426471, '141px']],
  [[20.955882, 103.678161], [11.764706, -2.758621], [11.764706, -2.758621], [15.992647, 45.977011]],
  [[65.625, 15.632184], [36.213235, -1.609195], [65.625, 15.632184], [102.389706, 36.321839]],
  [[75.367647, -2.298851], [48.161765, 48.275862], [19.485294, 102.298851], [48.161765, 48.275862]],
];
const speedAngles = [12, 82, 147, 39, -9, -97, 26, -56];
const coordinate = value => typeof value === 'number' ? `${value}%` : value;
const streaks = speedPoints.map((points, index) => {
  const variables = points.map(([x, y], state) => `--x${state}:${coordinate(x)};--y${state}:${coordinate(y)}`).join(';');
  return `<span class="exceptionalities-streak" data-streak="${index}" style="${variables};--angle:${speedAngles[index]}deg"><span class="exceptionalities-streak-light"></span></span>`;
}).join('');

const circuit = "<svg class=\"exceptionalities-brain-circuit\" viewBox=\"0 0 256 241\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5.331\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\"><path d=\"M 26.442 0 L 0 18.63 L 0 66.106 L 18.63 78.726 L 87.14 78.726 L 105.769 103.365 L 149.639 103.365 L 149.639 138.822\" transform=\"translate(0 45)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(57 9.5)\"/><path d=\"M 32.5 11.5 L 51.442 0 L 100.12 0 L 109.735 12.62 M 0 64.5 L 42.428 34.254 L 101.322 34.254 L 139.182 84.134\" transform=\"translate(37.5 0)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(24.5 63.5)\"/><path d=\"M 0 0 L 63.164 0 L 76.385 18.63\" transform=\"translate(39 97.5)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(24.5 91.5)\"/><path d=\"M 0 76.5 L 13.726 66.999 L 13.726 11.711 L 3.5 0\" transform=\"translate(190 58)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(177.5 133.5)\"/><path d=\"M 0 16 L 0 0\" transform=\"translate(225 97)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(219.5 83)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(219.5 115.5)\"/><path d=\"M 0 204.375 L 0 167.067 L 79.928 109.375 L 79.928 75.721 L 55.289 42.668 M 70.914 31.851 L 46.875 0 L 4.808 0\" transform=\"translate(170 15.5)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(164 222.5)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(163 9.5)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(182 45.5)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(144 184.5)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(26 35.5)\"/><path d=\"M 0 24 L 0 0\" transform=\"translate(191 197)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(184.5 182.5)\"/><path d=\"M 0 0 L 24.99 0 L 65.254 48.076 L 65.254 63.701\" transform=\"translate(94 66)\"/><path d=\"M 0 6.01 C 0 2.691 2.691 0 6.01 0 C 9.329 0 12.02 2.691 12.02 6.01 C 12.02 9.329 9.329 12.02 6.01 12.02 C 2.691 12.02 0 9.329 0 6.01 Z\" transform=\"translate(80 60)\"/></svg>";
const shines = [[26, 8], [75, 22], [13, 42], [60, 81]].map(([x, y], index) =>
  `<span class="exceptionalities-shine exceptionalities-shine--${index + 1}" style="left:${x}%;top:${y}%"></span>`
).join('');

const sliders = [[.5, '50%', 1, '3.5px'], [.75, '23%', .17, '82%'], [.17, '81%', 1, '3.5px']].map(([fill, glow, endFill, endGlow], index) =>
  `<span class="exceptionalities-slider exceptionalities-slider--${index + 1}" style="--fill-from:${fill};--fill-to:${endFill};--glow-from:${glow};--glow-to:${endGlow}"><span class="exceptionalities-slider-track"><span class="exceptionalities-slider-fill"></span><span class="exceptionalities-slider-glow-motion"><span class="exceptionalities-slider-glow"></span></span></span></span>`
).join('');

function tickerRow(first, row) {
  const group = Array.from({ length: 4 }, (_, index) => `<span class="exceptionalities-integration"><span class="chrome-mask" style="--chrome-mask:url('/assets/exceptionalities-icon-${first + index}.svg')"></span></span>`).join('');
  return `<div class="exceptionalities-ticker exceptionalities-ticker--${row}"><div class="exceptionalities-ticker-track">${Array.from({ length: 4 }, () => `<span class="exceptionalities-ticker-group">${group}</span>`).join('')}</div></div>`;
}

const artwork = (name, background, decoration) => `<div class="exceptionalities-art exceptionalities-art--${name}" aria-hidden="true"><img class="exceptionalities-art-background" src="/assets/exceptionalities-${background}" alt="" decoding="async" loading="lazy">${decoration}</div>`;

export const exceptionalitiesArt = [
  artwork('speed', 'speed.webp', `<div class="exceptionalities-speed-network"><svg class="exceptionalities-network-lines" viewBox="0 0 578 462" fill="none" preserveAspectRatio="none"><path d="M0 144 222 0 577.5 162.5 325.5 461.5 0 245 119 0 577.5 95.5 0 199 577.5 419 69.5 0 119 461.5 428 0 487.5 461.5" stroke="currentColor" stroke-width="1"/></svg>${streaks}</div>`),
  artwork('depth', 'depth.png', `<div class="exceptionalities-brain">${circuit}${shines}</div>`),
  artwork('control', 'control.webp', `<div class="exceptionalities-sliders">${sliders}</div>`),
  artwork('flexibility', 'flexibility.webp', tickerRow(1, 1) + tickerRow(5, 2)),
];
