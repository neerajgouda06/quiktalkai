// Original, geometric QUIKTALK AI lettering. Fixed paths keep the decorative
// composition independent of fonts, layout shifts and browser text shaping.
const letters = `
 <path fill-rule="evenodd" d="M150 0a150 150 0 1 1 0 300 150 150 0 0 1 0-300Zm0 39a111 111 0 1 0 0 222 111 111 0 0 0 0-222Z"/>
 <path d="m170 203 87 97h51l-87-97Z"/>
 <path d="M292 0h39v181c0 49 26 80 70 80s70-31 70-80V0h39v181c0 73-40 119-109 119s-109-46-109-119Z"/>
 <path d="M539 0h39v300h-39Z"/>
 <path d="M616 0h39v145L792 0h52L702 150l149 150h-53L655 155v145h-39Z"/>
 <path d="M846 0h240v39H986v261h-39V39H846Z"/>
 <path fill-rule="evenodd" d="M1155 0h44l126 300h-43l-34-83h-141l-34 83h-43Zm22 43-55 135h111Z"/>
 <path d="M1347 0h39v261h151v39h-190Z"/>
 <path d="M1560 0h39v145L1736 0h52l-142 150 149 150h-53l-143-145v145h-39Z"/>
 <path fill-rule="evenodd" d="M1943 0h44l126 300h-43l-34-83h-141l-34 83h-43Zm22 43-55 135h111Z"/>
 <path d="M2151 0h39v300h-39Z"/>`;
const echo = `<path fill-rule="evenodd" d="M150 0a150 150 0 1 1 0 300 150 150 0 0 1 0-300Zm0 39a111 111 0 1 0 0 222 111 111 0 0 0 0-222Z"/><path d="m170 203 87 97h51l-87-97Z"/>`;
export const footerArt = `<div class="footer-art" aria-hidden="true"><svg class="footer-wordmark" viewBox="-340 -35 2870 400" fill="none" focusable="false" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="footer-ink" x1="0" y1="0" x2="2190" y2="280" gradientUnits="userSpaceOnUse"><stop stop-color="#f2be82"/><stop offset=".16" stop-color="#e3ed9b"/><stop offset=".36" stop-color="#b8e7a5"/><stop offset=".48" stop-color="#f1f6e7"/><stop offset=".63" stop-color="#a5d5b4"/><stop offset=".82" stop-color="#88c5d4"/><stop offset="1" stop-color="#779caf"/></linearGradient><linearGradient id="footer-edge" x1="0" y1="0" x2="0" y2="300" gradientUnits="userSpaceOnUse"><stop stop-color="#ffffff" stop-opacity=".08"/><stop offset=".53" stop-color="#ffffff" stop-opacity="0"/><stop offset=".78" stop-color="#f3ffed" stop-opacity=".9"/><stop offset="1" stop-color="#7fa9da" stop-opacity=".1"/></linearGradient><g id="footer-letters">${letters}</g></defs><g class="footer-echo" fill="url(#footer-ink)"><g transform="translate(-340)">${echo}</g><g transform="translate(2230)">${echo}</g></g><use href="#footer-letters" fill="url(#footer-ink)"/><use href="#footer-letters" fill="url(#footer-edge)"/></svg></div>`;
