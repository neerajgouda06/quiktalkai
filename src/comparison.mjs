import { grain } from './grain.mjs';

const rows = [
  ['When your team is busy', 'phone', 'May go to voicemail', 'AI answers configured calls'],
  ['Customer enquiries', 'message', 'Your team answers each one', 'Answers approved questions'],
  ['Appointments', 'calendar', 'Details entered manually', 'Helps arrange bookings'],
  ['After the call', 'note', 'Separate follow-up tasks', 'Saves details and alerts your team'],
  ['Human judgement', 'people', 'Handled by your team', 'Hands over when a person is needed']
];

export function comparison(icon, button, book) {
  return `<section class="comparison-section grain-surface" id="comparison" aria-labelledby="comparison-title">
    ${grain}<div class="container">
      <div class="comparison-heading">
        <span class="comparison-tag">THE DIFFERENCE</span>
        <h2 id="comparison-title">Every call matters.<br><span class="green-text">Make the next step count.</span></h2>
        <p>Compare everyday call handling with a connected AI employee.</p>
      </div>
      <div class="comparison-panel">
        <span class="comparison-glow" aria-hidden="true"></span>
        <table class="comparison-table" role="table" aria-labelledby="comparison-title" aria-describedby="comparison-note">
          <colgroup><col class="comparison-label-col"><col class="comparison-typical-col"><col class="comparison-ai-col"></colgroup>
          <thead role="rowgroup"><tr role="row">
            <th scope="col" role="columnheader"><span class="comparison-sr-only">What happens on your calls</span></th>
            <th scope="col" role="columnheader"><div class="comparison-cell"><strong>Typical call handling</strong><span>Your team handles each step</span></div></th>
            <th scope="col" role="columnheader" class="comparison-ai"><div class="comparison-cell comparison-brand"><span class="comparison-headset">${icon('headset')}</span><div><strong>QuikTalk AI</strong><span>A helpful voice. A useful next step.</span></div></div></th>
          </tr></thead>
          <tbody role="rowgroup">${rows.map(([label, symbol, typical, ai]) => `<tr class="comparison-row" role="row">
            <th scope="row" role="rowheader"><div class="comparison-cell">${label}</div></th>
            <td role="cell"><div class="comparison-cell"><span class="comparison-mobile-label" aria-hidden="true">Typical call handling</span><div class="comparison-value">${icon(symbol)}<span>${typical}</span></div></div></td>
            <td role="cell" class="comparison-ai"><div class="comparison-cell"><span class="comparison-mobile-label" aria-hidden="true">QuikTalk AI</span><div class="comparison-value"><span class="comparison-check"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" pathLength="1"/></svg></span><span>${ai}</span></div></div></td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
      <div class="comparison-footer"><p id="comparison-note">Capabilities depend on your agreed call setup and connected tools.</p>${button('Book a demo', book)}</div>
    </div>
  </section>`;
}
