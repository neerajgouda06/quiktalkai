const connections = [
  { id: 'xero-myob', name: 'Xero & MYOB', category: 'Accounting', text: 'Connect customer and job information to your accounting workflow.', tags: ['Customer details', 'Job information'], action: 'Accounting workflow updated', steps: ['Captures the details', 'Connects the workflow'], logos: ['xero', 'myob'] },
  { id: 'google-calendar', name: 'Google Calendar', category: 'Scheduling', text: 'From finding a time to making the booking. Your calendar stays in sync.', tags: ['Availability', 'Appointments'], action: 'Appointment added to calendar', steps: ['Checks availability', 'Books the appointment'], logos: ['googlecalendar'] },
  { id: 'servicetitan', name: 'ServiceTitan', category: 'Field service', text: 'Qualify the job on the call and send the service booking straight to your team.', tags: ['Job qualification', 'Service bookings'], action: 'Service booking shared', steps: ['Understands the job', 'Qualifies the request'], logos: ['servicetitan'] },
  { id: 'clio-lawpay', name: 'Clio & LawPay', category: 'Legal practice', text: 'Connect the first enquiry to your legal intake and payment workflows.', tags: ['Client intake', 'Payment workflows'], action: 'Client intake connected', steps: ['Captures the enquiry', 'Connects your workflow'], logos: ['clio', 'lawpay'] },
  { id: 'hubspot', name: 'HubSpot CRM', category: 'Customer relationships', text: 'Qualify the caller, capture the lead and keep the customer record up to date.', tags: ['Lead qualification', 'CRM updates'], action: 'Qualified lead saved to CRM', steps: ['Qualifies the caller', 'Captures the lead'], logos: ['hubspot'] },
  { id: 'salesforce', name: 'Salesforce', category: 'Sales operations', text: 'Keep caller details and qualified enquiries connected to your sales team.', tags: ['Caller details', 'Sales follow-up'], action: 'Customer record updated', steps: ['Understands the enquiry', 'Prepares the follow-up'], logos: ['salesforce'] },
  { id: 'square-stripe', name: 'Square & Stripe', category: 'Orders & payments', text: 'Connect the conversation to the order and payment tools your business uses.', tags: ['Order details', 'Payment workflows'], action: 'Order workflow connected', steps: ['Captures the request', 'Connects the next step'], logos: ['square', 'stripe'] },
  { id: 'n8n-zapier', name: 'n8n & Zapier', category: 'Business automation', text: 'Let the next step happen automatically, across the tools in your workflow.', tags: ['Connected actions', 'Automated follow-up'], action: 'Connected workflow triggered', steps: ['Understands the request', 'Triggers the workflow'], logos: ['n8n', 'zapier'] }
];
const symbols = {
  phone: '<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  connect: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6h5a3 3 0 0 1 3 3v5M6 10v5a3 3 0 0 0 3 3h5"/>',
  detail: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8m-8 4h8m-8 4h4"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[name]}</svg>`;
const labels = { xero:'Xero', myob:'MYOB', googlecalendar:'Google Calendar', servicetitan:'ServiceTitan', clio:'Clio', lawpay:'LawPay', hubspot:'HubSpot', salesforce:'Salesforce', square:'Square', stripe:'Stripe', n8n:'n8n', zapier:'Zapier' };
const logo = key => `<img class="integration-logo integration-logo--${key}" src="/assets/integrations/${key}.${key === 'lawpay' ? 'webp' : 'svg'}" alt="${labels[key]}" width="144" height="48" decoding="async">`;
const logoGroup = item => `<div class="integration-brand-group" aria-label="${item.name}">${item.logos.map(logo).join('<span class="integration-brand-divider" aria-hidden="true"></span>')}</div>`;
const scene = (item, i) => `<div class="integration-scene" aria-label="Example workflow: call, QuikTalk AI, ${item.name}, ${item.action}">
  <div class="integration-scene-top"><span>CONNECTED WORKFLOW</span><span>0${i+1}</span></div>
  <div class="integration-call">${icon('phone')}<span>Incoming call</span><span class="integration-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></div>
  <div class="integration-conduit integration-conduit--in" aria-hidden="true"><i></i></div>
  <div class="integration-agent"><img src="/assets/quiktalk-headset.png" width="28" height="28" alt=""><span>quiktalk<span>ai</span></span></div>
  <div class="integration-branches" aria-hidden="true"><svg viewBox="0 0 360 70" preserveAspectRatio="none"><path d="M180 0v18c0 18-106 4-106 28v24M180 0v18c0 18 106 4 106 28v24M180 0v70"/><path class="integration-flow" d="M180 0v70"/></svg></div>
  <div class="integration-understanding" aria-hidden="true"><span>${item.steps[0]}</span><span>${item.steps[1]}</span></div>
  <div class="integration-endpoint">${logoGroup(item)}</div>
  <div class="integration-result">${icon('check')}<span>${item.action}</span></div>
</div>`;
export function integrations() {
 return `<section class="integration-story" id="integrations" aria-labelledby="integrations-title">
  <div class="integration-container">
    <header class="integration-heading"><div class="integration-eyebrow">${icon('connect')}<span>INTEGRATIONS</span></div><div class="integration-heading-row"><h2 id="integrations-title">Connects with your<br>POS, Calendar &amp; CRM.</h2><p>Every booking, order, and qualified lead lands directly in the tools your business relies on — updated in real time while the caller is still on the phone.</p></div></header>
    <div class="integration-layout">
      <aside class="integration-rail"><nav aria-label="Explore integrations">${connections.map((item,i)=>`<a href="#integration-${item.id}" data-integration-link="${i}"><span class="integration-nav-number" aria-hidden="true">0${i+1}</span><span>${item.name}</span><span class="integration-nav-line" aria-hidden="true"></span></a>`).join('')}</nav><div class="integration-rail-note"><span>CALL</span><i></i><span>QUIKTALK AI</span><i></i><span>YOUR TOOLS</span></div><a class="integration-skip" href="#integration-ecosystem">See the whole ecosystem</a></aside>
      <div class="integration-cards">${connections.map((item,i)=>`<article class="integration-card" id="integration-${item.id}" data-integration-card="${i}" aria-labelledby="integration-title-${i}"><div class="integration-card-content"><span class="integration-category">${item.category}</span><h3 id="integration-title-${i}">${item.name}</h3><p>${item.text}</p><div class="integration-tags">${item.tags.map(tag=>`<span>${icon('detail')}${tag}</span>`).join('')}</div><div class="integration-card-foot"><span>CALL → AI → ACTION</span><span>0${i+1} / 08</span></div></div>${scene(item,i)}</article>`).join('')}
      <div class="integration-ecosystem" id="integration-ecosystem" aria-labelledby="integration-ecosystem-title"><div class="integration-ecosystem-copy"><span class="integration-category">ONE CONNECTED ECOSYSTEM</span><h3 id="integration-ecosystem-title">One conversation.<br>Everything connected.</h3><p>AI voice. Your tools. The next step, handled.</p></div><div class="integration-network"><div class="integration-network-source">${icon('phone')}<span>Phone call</span></div><div class="integration-conduit" aria-hidden="true"><i></i></div><div class="integration-network-hub"><img src="/assets/quiktalk-headset.png" width="36" height="36" alt=""><span>QuikTalk AI</span></div><svg class="integration-network-lines" viewBox="0 0 800 64" preserveAspectRatio="none" aria-hidden="true"><path d="M400 0v12C400 42 100 8 100 64M400 0v12C400 42 300 8 300 64M400 0v12C400 42 500 8 500 64M400 0v12C400 42 700 8 700 64"/><path class="integration-flow" d="M400 0v12C400 42 100 8 100 64M400 0v12C400 42 300 8 300 64M400 0v12C400 42 500 8 500 64M400 0v12C400 42 700 8 700 64"/></svg><div class="integration-network-endpoints">${connections.map(item=>`<a href="#integration-${item.id}" aria-label="Explore ${item.name}">${logoGroup(item)}<span>${item.name}</span></a>`).join('')}</div></div><p class="integration-setup-note">Connections and actions are configured around your business and agreed workflows.</p></div>
      </div>
    </div>
  </div>
 </section>`;
}
