import { featuresArt } from './features-art.mjs';

// This section is deliberately isolated from the existing homepage components.
export function enterpriseFeatures(icon) {
  const navIcon = category => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{
    usage: '<path d="M3 4v16M21 4v16"/><rect x="6" y="4" width="12" height="16" rx="1"/>',
    technology: '<path d="m8 3-4 4 4 4m8-8 4 4-4 4M4 14v7h16v-7"/>',
    data: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  }[category]}</svg>`;
  const features = [
    {
      id: 'usage', label: 'Usage', icon: 'people', title: 'AI employees for work',
      description: 'An AI employee that answers calls, helps your customers and handles what happens next.',
      tags: [['headset', 'Receptionist'], ['calendar', 'Bookings'], ['briefcase', 'Enquiries'], ['message', 'Follow-up']],
      cta: 'Find a role for your business', href: '#ai-employees',
    },
    {
      id: 'technology', label: 'Technology', icon: 'tools', title: 'Agentic workflows',
      description: 'Connect calls to bookings, customer records and the next steps your team needs.',
      tags: [['phone', 'Voice agents'], ['note', 'Details saved'], ['message', 'Confirmations'], ['people', 'Human handoff']],
      cta: 'See an example follow-up', href: '/industries/hospitality/#after-the-call',
    },
    {
      id: 'data', label: 'Data', icon: 'note', title: 'Your knowledge. Your tools.',
      description: 'We connect your approved business information and confirm which tools work with your setup.',
      tags: [['calendar', 'Google Calendar'], ['people', 'HubSpot'], ['briefcase', 'Salesforce'], ['note', 'Xero']],
      cta: 'Book a demo', href: 'https://www.quiktalkai.com/#demo',
    },
  ];
  return `<section class="enterprise-features" id="enterprise-features" aria-labelledby="features-title">
    <div class="features-container">
      <div class="features-heading">
        <div class="features-label">${icon('note')}<span>FEATURES</span></div>
        <div class="features-title-row"><h2 id="features-title">All-in-one AI for enterprise</h2><p>Simplify, accelerate, and transform with one connected AI ecosystem.</p></div>
      </div>
      <div class="features-layout">
        <nav class="features-nav" aria-label="Explore AI features">${features.map((f, i) => `<a class="features-nav-link" href="#feature-${f.id}"${i === 0 ? ' aria-current="location"' : ''}>${navIcon(f.id)}<span>${f.label}</span><span class="features-nav-line" aria-hidden="true"><i></i></span></a>`).join('')}</nav>
        <div class="features-panels">${features.map((f, i) => `<div class="feature-slot" id="feature-${f.id}"><article class="feature-card" aria-labelledby="feature-${f.id}-title">
          <div class="feature-copy"><div class="feature-main"><div class="feature-title"><h3 id="feature-${f.id}-title">${f.title}</h3><p>${f.description}</p></div><ul class="feature-tags">${f.tags.map(([symbol, text]) => `<li>${icon(symbol)}<span>${text}</span></li>`).join('')}</ul></div><a class="feature-cta" href="${f.href}"><span>${f.cta}</span></a></div>
          <div class="feature-art feature-art--${f.id}" aria-hidden="true">${featuresArt[i]}</div>
        </article></div>`).join('')}</div>
      </div>
    </div>
  </section>`;
}
