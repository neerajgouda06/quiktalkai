// Each glyph owns its reflection so nearby icons can react independently.
export function chromeIcons(markup) {
  let index = 0;
  return markup.replace(/<svg\b([^>]*class="[^"]*\b(?:icon|feature-art-icon|chrome-icon|exceptionalities-brain-circuit)\b[^"]*"[^>]*)>/g, (_, attributes) => {
    const id = `chrome-metal-${++index}`;
    const paint = `url(#${id})`;
    attributes = attributes.replace(/class="([^"]*)"/, 'class="$1 chrome-glyph"');
    attributes = attributes.replace(/stroke="currentColor"/, `stroke="${paint}"`);
    const fill = /\bchrome-icon\b/.test(attributes) ? ` style="fill:${paint}"` : '';
    return `<svg${attributes}${fill}><defs><linearGradient class="chrome-reflection" id="${id}" x1="0" y1="0" x2=".35" y2="1"><stop stop-color="#6c7785"/><stop offset=".2" stop-color="#bdc7d3"/><stop offset=".42" stop-color="#f2f5fa"/><stop offset=".49" stop-color="#667281"/><stop offset=".56" stop-color="#8793a3"/><stop offset=".76" stop-color="#d4dce6"/><stop offset=".86" stop-color="#eef2f8"/><stop offset="1" stop-color="#7b8797"/></linearGradient></defs>`;
  });
}
