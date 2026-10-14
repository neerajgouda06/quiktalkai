const serviceLinks = [
  { name: 'AI Employees', path: '/services/ai-employees/', description: 'The roles that answer calls and help customers.' },
  { name: 'AI Infrastructure', path: '/services/ai-infrastructure/', description: 'The information and connections behind the assistant.' },
  { name: 'AI Workflows', path: '/services/ai-workflows/', description: 'The agreed steps that move work forward.' },
  { name: 'Web Development', path: '/services/web-development/', description: 'A website that helps visitors understand and enquire.' },
];

export function serviceDetailHead(page, origin) {
  const url = origin + page.path;
  const data = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': `${origin}/#organization`, name: 'QuikTalk AI', url: 'https://www.quiktalkai.com/', email: 'admin@quiktalkai.com', logo: `${origin}/assets/quiktalk-headset.png` },
    { '@type': 'Service', '@id': `${url}#service`, name: page.name, description: page.definition, serviceType: page.serviceType, provider: { '@id': `${origin}/#organization` }, areaServed: [{ '@type': 'Country', name: 'New Zealand' }, { '@type': 'Country', name: 'Australia' }], url },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: 'en-NZ', mainEntity: { '@id': `${url}#service` }, publisher: { '@id': `${origin}/#organization` }, breadcrumb: { '@id': `${url}#breadcrumb` } },
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` }, { '@type': 'ListItem', position: 2, name: page.name, item: url }] },
  ] };
  return `<link rel="stylesheet" href="/service-details.css"><meta property="og:image" content="${origin}${page.image}"><meta property="og:image:alt" content="QuikTalk AI ${page.name} illustration"><meta name="twitter:image" content="${origin}${page.image}"><script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export function serviceDetailBody(page, context) {
  const { icon, button, book, grain } = context;
  const arrow = icon('arrow');
  return `<div class="service-detail service-detail--${page.slug}">
    <nav class="breadcrumb container" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${page.name}</span></nav>
    <section class="sd-hero container" aria-labelledby="${page.slug}-title"><div><span class="eyebrow">${page.name.toUpperCase()}</span><h1 id="${page.slug}-title">${page.headline[0]}<br><span class="green-text">${page.headline[1]}</span></h1><p>${page.intro}</p><p class="sd-local">From QuikTalk AI in Auckland, for businesses in New Zealand and Australia.</p><div class="sd-hero-actions">${button(page.cta, book)}<a class="text-link" href="#${page.slug}-overview">${page.secondaryCta} ${arrow}</a></div></div><div class="sd-hero-art grain-surface" aria-hidden="true">${grain}<img src="${page.image}" width="900" height="600" alt="" decoding="async" fetchpriority="high"><span>${page.imageCaption}</span></div></section>
    <nav class="sd-jump-nav container" aria-label="On this page"><a href="#${page.slug}-overview">What it includes</a>${page.extraSection ? '<a href="#workflow-example">After-call example</a>' : ''}<a href="#${page.slug}-examples">${page.examplesLabel}</a><a href="#${page.slug}-setup">Getting started</a><a href="#${page.slug}-questions">Common questions</a></nav>
    <section class="sd-overview grain-surface" id="${page.slug}-overview" aria-labelledby="${page.slug}-definition-title">${grain}<div class="container"><div class="sd-heading"><span class="eyebrow">${page.overviewLabel}</span><h2 id="${page.slug}-definition-title">${page.definitionHeading}</h2><p class="sd-definition">${page.definition}</p><p>${page.overview}</p></div><div class="sd-capabilities">${page.capabilities.map(([symbol, title, text]) => `<article><span class="icon-tile">${icon(symbol)}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div></div></section>
    ${page.extraSection ? page.extraSection(context) : ''}
    <section class="sd-examples section container" id="${page.slug}-examples" aria-labelledby="${page.slug}-examples-title"><div class="sd-heading"><span class="eyebrow">${page.examplesEyebrow}</span><h2 id="${page.slug}-examples-title">${page.examplesTitle}</h2><p>${page.examplesIntro}</p></div><div class="sd-example-grid">${page.examples.map(item => `<article><h3>${item.title}</h3><p>${item.text}</p>${item.href ? `<a class="text-link" href="${item.href}">${item.linkLabel} ${arrow}</a>` : ''}</article>`).join('')}</div></section>
    <section class="sd-setup grain-surface" id="${page.slug}-setup" aria-labelledby="${page.slug}-setup-title">${grain}<div class="container"><div class="sd-heading"><span class="eyebrow">${page.setupEyebrow}</span><h2 id="${page.slug}-setup-title">${page.setupTitle}</h2><p>${page.setupIntro}</p></div><ol class="sd-setup-list">${page.steps.map(([title, text], i) => `<li><span aria-hidden="true">0${i + 1}</span><div><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ol><div class="sd-preparation"><div><h3>What to bring to the first conversation</h3><ul>${page.preparation.map(item => `<li>${item}</li>`).join('')}</ul></div><div>${button(page.cta, book)}<p>${page.preparationNote}</p></div></div></div></section>
    <section class="sd-faq section container" id="${page.slug}-questions" aria-labelledby="${page.slug}-questions-title"><div class="sd-heading"><span class="eyebrow">PRACTICAL ANSWERS</span><h2 id="${page.slug}-questions-title">Common questions about ${page.name.toLowerCase()}.</h2></div><div class="faq-list">${page.questions.map(([question, answer]) => `<details><summary>${question}${icon('plus')}</summary><div class="disclosure-content"><p>${answer}</p></div></details>`).join('')}</div></section>
    <section class="sd-related section container" aria-labelledby="${page.slug}-related-title"><div class="sd-heading"><span class="eyebrow">CONNECT THE NEXT PIECE</span><h2 id="${page.slug}-related-title">Explore the other services.</h2></div><div class="sd-related-grid">${serviceLinks.filter(item => item.path !== page.path).map(item => `<a href="${item.path}"><strong>${item.name}</strong><span>${item.description}</span>${arrow}</a>`).join('')}</div><p class="sd-page-note">Service information from QuikTalk AI · Auckland, New Zealand · Serving NZ &amp; Australia</p><a class="text-link sd-back" href="/#services">Explore all QuikTalk services ${arrow}</a></section>
  </div>`;
}
