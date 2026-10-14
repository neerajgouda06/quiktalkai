import { grain } from './grain.mjs';

const connections = [
  { name: 'Xero & MYOB', logos: ['xero', 'myob'] },
  { name: 'Google Calendar', logos: ['googlecalendar'] },
  { name: 'ServiceTitan', logos: ['servicetitan'] },
  { name: 'Clio & LawPay', logos: ['clio', 'lawpay'] },
  { name: 'HubSpot CRM', logos: ['hubspot'] },
  { name: 'Salesforce', logos: ['salesforce'] },
  { name: 'Square & Stripe', logos: ['square', 'stripe'] },
  { name: 'n8n & Zapier', logos: ['n8n', 'zapier'] }
];
const labels = { xero:'Xero', myob:'MYOB', googlecalendar:'Google Calendar', servicetitan:'ServiceTitan', clio:'Clio', lawpay:'LawPay', hubspot:'HubSpot', salesforce:'Salesforce', square:'Square', stripe:'Stripe', n8n:'n8n', zapier:'Zapier' };
const logo = key => `<span class="integration-logo integration-logo--${key} chrome-mask" role="img" aria-label="${labels[key]}" style="--chrome-mask:url('/assets/integrations/${key}.${key === 'lawpay' ? 'webp' : 'svg'}')"></span>`;
const logoGroup = item => `<div class="integration-brand-group">${item.logos.map(logo).join('<span class="integration-brand-divider" aria-hidden="true"></span>')}</div>`;
const paths = 'M400 0v12C400 42 100 8 100 64M400 0v12C400 42 300 8 300 64M400 0v12C400 42 500 8 500 64M400 0v12C400 42 700 8 700 64';

export function integrations() {
  return `<section class="integration-story" id="integrations" aria-labelledby="integration-ecosystem-title">
    <div class="integration-container">
      <div class="integration-ecosystem grain-surface" id="integration-ecosystem">${grain}
        <div class="integration-ecosystem-copy">
          <span class="integration-category">ONE CONNECTED ECOSYSTEM</span>
          <h2 id="integration-ecosystem-title">One conversation.<br>Everything connected.</h2>
          <p>AI voice. Your tools. The next step, handled.</p>
        </div>
        <div class="integration-network">
          <div class="integration-network-source"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z"/></svg><span>Phone call</span></div>
          <div class="integration-conduit" aria-hidden="true"><i></i></div>
          <div class="integration-network-hub"><img src="/assets/quiktalk-headset.png" width="36" height="36" alt=""><span>QuikTalk AI</span></div>
          <svg class="integration-network-lines" viewBox="0 0 800 64" preserveAspectRatio="none" aria-hidden="true"><path d="${paths}"/><path class="integration-flow" d="${paths}"/></svg>
          <ul class="integration-network-endpoints" aria-label="Example tools to review for integration">${connections.map(item => `<li>${logoGroup(item)}<span>${item.name}</span></li>`).join('')}</ul>
        </div>
        <p class="integration-setup-note">Example tools. Each connection depends on supported access, your software plan and the workflow we agree.</p>
      </div>
    </div>
  </section>`;
}
