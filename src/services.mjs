// Approved Services concept: real content, separate artwork and static background grain.
export function services(grain, book) {
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';
  const items = [
    { slug: 'employees', title: 'AI Employees', description: 'Helpful AI for calls, bookings and customer support.', href: '#ai-employees', image: '/assets/quiktalk-headset.png', width: 1280, height: 1280 },
    { slug: 'infrastructure', title: 'AI Infrastructure', description: 'Connect your tools, data and AI in one reliable system.', href: '#integrations', image: '/assets/services-infrastructure.webp', width: 900, height: 600 },
    { slug: 'workflows', title: 'AI Workflows', description: 'Automate the repeat tasks that slow your team down.', href: '#ai-workflows', image: '/assets/services-workflows.webp', width: 900, height: 600 },
    { slug: 'web-development', title: 'Web Development', description: 'Fast, clear websites designed around your customers.', href: book, image: '/assets/services-web-development.webp', width: 900, height: 600 },
  ];
  return `<section class="services-section grain-surface" id="services" aria-labelledby="services-title">
    ${grain}
    <div class="container">
      <div class="services-heading">
        <div><span class="services-eyebrow">Services</span><h2 id="services-title">Built for the way<br>you work.</h2></div>
        <p>AI employees, connected systems and websites.<br class="services-intro-break"> Built around your business.</p>
      </div>
      <div class="services-grid">
        ${items.map((item, index) => `<a class="service-card service-card--${item.slug} grain-surface" href="${item.href}">
          ${grain}
          <span class="service-number" aria-hidden="true">0${index + 1}</span>
          <span class="service-art service-art--${item.slug}" aria-hidden="true">${item.slug === 'employees' ? '<span class="service-plinth"></span>' : ''}<img src="${item.image}" width="${item.width}" height="${item.height}" alt="" loading="lazy" decoding="async"></span>
          <div class="service-copy"><h3>${item.title}</h3><p>${item.description}</p></div>
          <span class="service-arrow" aria-hidden="true">${arrow}</span>
        </a>`).join('')}
      </div>
      <div class="services-closing"><p>Start with one service. Connect more as you grow.</p><a class="services-contact" href="${book}">Let’s talk ${arrow}</a></div>
    </div>
  </section>`;
}
