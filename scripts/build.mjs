import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { industries } from '../src/content.mjs';
import { exceptionalitiesArt } from '../src/exceptionalities-art.mjs';
import { enterpriseFeatures } from '../src/enterprise-features.mjs';
import { enterpriseSecurity } from '../src/enterprise-security.mjs';
import { grain } from '../src/grain.mjs';
import { footerArt } from '../src/footer-art.mjs';
import { bookingDemo } from '../src/booking-demo.mjs';
import { comparison } from '../src/comparison.mjs';
import { chromeIcons } from '../src/chrome-icons.mjs';
import { services } from '../src/services.mjs';
import { aiEmployeesPath, aiEmployeesTitle, aiEmployeesDescription, aiEmployeesHead, aiEmployeesBody } from '../src/ai-employees.mjs';
import { aiInfrastructurePath, aiInfrastructureTitle, aiInfrastructureDescription, aiInfrastructureHead, aiInfrastructureBody } from '../src/ai-infrastructure.mjs';
import { aiWorkflows } from '../src/ai-workflows.mjs';
import { webDevelopment } from '../src/web-development.mjs';
import { serviceDetailHead, serviceDetailBody } from '../src/service-detail.mjs';
import { privacyPolicyBody, termsBody } from '../src/legal.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = (process.env.SITE_URL || process.env.CF_PAGES_URL || 'https://www.quiktalkai.com').replace(/\/+$/, '');
const book = process.env.BOOKING_URL || 'https://www.quiktalkai.com/#demo';
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons = {
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>', phone:'<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z"/>',
 check:'<path d="m5 12 4 4L19 6"/>', calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>',
 note:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8m-8 4h8m-8 4h4"/>', message:'<path d="M21 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 0 1 19 0Z"/><path d="M7 10h10m-10 4h6"/>',
 tools:'<path d="M14 6 18 10M13 4a6 6 0 0 0-7 8l-4 5a3 3 0 0 0 4 4l6-6a6 6 0 0 0 8-7l-4 4-4-4 4-4h-3Z"/>',
 health:'<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 7v10M7 12h10"/>', home:'<path d="m3 10 9-7 9 7v11H3V10Z"/><path d="M9 21v-8h6v8"/>',
 car:'<path d="m5 6-2 7v6h3v-3h12v3h3v-6l-2-7H5Zm-2 7h18M7 6l1-3h8l1 3M6 13v1m12-1v1"/>',
 dining:'<path d="M5 3v6m4-6v6m-2 2v10M3 3v5a4 4 0 0 0 8 0V3m8 0v18m0-18c-4 3-5 9 0 9"/>',
 briefcase:'<rect x="3" y="7" width="18" height="14" rx="3"/><path d="M8 7V3h8v4M3 12l9 3 9-3m-9 0v4"/>',
 people:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m3 11v-3a6 6 0 0 0-2-4"/>',
 headset:'<path d="M4 13v-1a8 8 0 0 1 16 0v1M4 12H2v7h4v-7H4Zm16 0h2v7h-4v-7h2Zm0 7c0 3-3 3-6 3"/>',
 shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/>', plus:'<path d="M12 5v14M5 12h14"/>'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.note}</svg>`;
const arrow = icon('arrow');
const brand = '<img class="brand-mark" src="/assets/quiktalk-headset.png" width="52" height="52" alt=""><span>quiktalk<span class="brand-ai">ai</span></span>';
const atmosphere = `<div class="atmosphere" aria-hidden="true"><div class="atmosphere-scene"><img class="atmosphere-poster" src="/assets/atmosphere-poster.webp" width="1760" height="1152" alt="" fetchpriority="high"><video class="atmosphere-video" data-src="/assets/atmosphere.mp4" muted loop playsinline preload="none" tabindex="-1"></video></div><div class="atmosphere-frost"></div>${grain}</div>`;
const button = (label, href, secondary=false) => `<a class="button ${secondary?'button-secondary':'button-primary'}" href="${href}">${label}${arrow}</a>`;
function shell(title, description, path, body, closingHeading, head = '', contactOptions = {}) {
 return chromeIcons(`<!doctype html><html lang="en-NZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#030504"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${origin}${path}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${origin}${path}"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><link rel="icon" href="/assets/quiktalk-headset.png" type="image/png"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/motion.css"><link rel="stylesheet" href="/reference.css"><link rel="stylesheet" href="/grain.css"><link rel="stylesheet" href="/footer.css">${path === "/" ? '<link rel="stylesheet" href="/services.css">' : ""}<link rel="preload" href="/assets/fonts/inter-display-medium.woff2" as="font" type="font/woff2" crossorigin><script src="/app.js" defer></script><script src="/motion.js" defer></script>${path === '/' ? '<link rel="stylesheet" href="/comparison.css"><script src="/comparison.js" defer></script><link rel="stylesheet" href="/booking-demo.css"><script src="/booking-demo.js" defer></script><link rel="stylesheet" href="/features.css"><script src="/features.js" defer></script><link rel="stylesheet" href="/security.css"><script src="/security.js" defer></script>' : ''}${head}<link rel="stylesheet" href="/icons.css"><script src="/chrome-icons.js" defer></script></head><body><a class="skip-link" href="#main">Skip to content</a>
 <header class="site-header glass"><a class="brand" href="/" aria-label="QuikTalk AI home">${brand}</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav"><span>Menu</span><span class="menu-lines" aria-hidden="true"></span></button><nav id="primary-nav" aria-label="Main navigation"><div class="nav-links"><a href="/#services">Services</a><a href="/#industries">Industry demos</a><a href="/#how-it-works">How it works</a><a href="/services/ai-employees/"${path === aiEmployeesPath ? ' aria-current="page"' : ''}>AI employees</a></div><a class="nav-cta" href="${book}">Let’s talk ${arrow}</a></nav></header><main id="main" tabindex="-1">${body}</main>
 <footer class="footer grain-surface cinematic-footer">${grain}${contact(closingHeading, contactOptions)}${footerArt}<div class="container footer-top"><div class="footer-brand"><a class="brand" href="/" aria-label="QuikTalk AI home">${brand}</a><p>A helpful voice.<br>A useful next step.</p><span class="small">Auckland, New Zealand · Serving NZ &amp; Australia</span></div><div><h2>Explore the demos</h2><div class="footer-industries">${industries.map(i=>`<a href="/industries/${i.slug}/">${esc(i.name)}</a>`).join('')}</div></div><div><h2>Let’s talk</h2><a href="${book}">Book a demo ${arrow}</a><a href="mailto:admin@quiktalkai.com">admin@quiktalkai.com</a></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} QuikTalk AI</span><div><a href="/privacy-policy/">Privacy</a><a href="/terms-of-service/">Terms</a></div></div></footer></body></html>`);
}
const cards = (items=industries) => items.map(i=>`<a class="industry-card" href="/industries/${i.slug}/"><div class="card-top"><span class="icon-tile">${icon(i.icon)}</span><span class="card-number" aria-hidden="true">0${industries.indexOf(i)+1}</span></div><span class="role-label">${esc(i.role)}</span><h3>${esc(i.name)}</h3><p>${esc(i.card)}</p><span class="card-link">Explore the demo ${arrow}</span></a>`).join('');
const contact = (heading='Let’s give your business<br>a helpful new voice.', {description='Tell us what happens on your calls.<br>We’ll show you where an AI employee can help.', buttonLabel='Book a demo'} = {}) => `<section class="contact-section" id="contact" aria-labelledby="contact-title"><div class="container contact-panel glass"><div><span class="eyebrow">YOUR BUSINESS. YOUR WAY OF WORKING.</span><h2 id="contact-title">${heading}</h2><p>${description}</p></div><div class="contact-actions">${button(buttonLabel,book)}<a class="email-link" href="mailto:admin@quiktalkai.com">Or email the team ${arrow}</a><span class="small">Built around your business in New Zealand.</span></div></div></section>`;
// Existing QuikTalk copy, with one accessible text layer and decorative white ink.
const statementCopy = 'An AI employee that answers your calls, helps your customers and takes care of what happens next. Booking appointments, updating customer details and keeping people informed.';
const statement = `<section class="voice-statement grain-surface" id="our-approach" aria-label="A helpful voice, connected to your business">${grain}<div class="statement-composition"><p class="statement-text">${statementCopy.split(' ').map(word=>`<span class="statement-word">${esc(word)}<span class="statement-ink" aria-hidden="true">${esc(word)}</span></span>`).join(' ')}</p><div class="statement-orb" aria-hidden="true"><div class="statement-orb-surface"><img src="/assets/statement-orb.webp" alt="" width="692" height="692" loading="lazy" decoding="async"></div><div class="statement-orb-identity"><img src="/assets/quiktalk-headset.png" alt="" width="140" height="140" loading="lazy" decoding="async"><span>QuikTalk AI</span></div></div></div></section>`;
function homepage() {
 const controlCards = [['Your information','Answers come from the services, opening hours and business details you approve.'],['Your team','Complex requests, exceptions and sensitive questions reach the right person.'],['Your rules','You choose what it can book, send or update. We test those actions with you.'],['Your tools','We check how your phone, calendar and customer systems can work together.']].map(([title,text],index)=>`<article class="exceptionalities-card" data-card-index="${index}">${exceptionalitiesArt[index]}<div class="exceptionalities-caption"><h3>${title}</h3><p>${text}</p></div></article>`);
 const faq = [
  ['What is an AI voice agent?', 'It is an AI assistant that can speak with people on the phone. We give it a clear role, such as a receptionist or booking assistant, and train it on the business information and tasks you approve.'],
  ['What can it do after a call?', 'Depending on the tools we connect, it can save enquiry details, create a booking, send a confirmation or give your team a follow-up task. We agree on those actions with you before they go live.'],
  ['Will callers know they are speaking to AI?', 'We design the introduction to make that clear. The example conversations on this site show the assistant introducing itself as AI before helping with the request.'],
  ['Can a caller speak to a person?', 'Yes. We agree on when to transfer a call, take a message or request a callback. If your team is unavailable, the assistant explains the next step rather than promising an immediate transfer.'],
  ['Can it work with our existing phone number and software?', 'We review your current phone setup, calendar, booking tools and customer records first. Then we confirm what can be connected and how calls should be routed.'],
  ['How do we get started?', 'We learn about your calls, choose the first job for your AI employee and connect the tools it needs. You review example calls and follow-up actions with us before launch.']
 ];
 return shell('QuikTalk AI — Voice Agents That Answer, Help & Follow Up', 'AI voice agents for your business. Explore industry examples of AI employees answering calls, arranging bookings and handling the work that follows.', '/', `
 <section class="hero container" aria-labelledby="hero-title">${atmosphere}<div class="hero-copy"><h1 id="hero-title"><span class="hero-line">A helpful voice.</span><span class="hero-line green-text">A job well done.</span></h1><p class="hero-description">An AI employee that answers your calls, helps your customers and takes care of what happens next.</p><div class="hero-actions">${button('Explore industry demos','#industries')}${button('Book a demo',book,true)}</div><div class="hero-note">${icon('phone')} Answer calls. Arrange bookings. Follow up.</div></div>
 ${bookingDemo(icon)}</section>
 <div class="value-strip container"><span>${icon('phone')} A welcome for every enquiry</span><span>${icon('calendar')} Help with everyday bookings</span><span>${icon('people')} Your team stays in control</span></div>
 ${statement}
 ${services(grain, book)}
 <section class="section container" id="industries" aria-labelledby="industry-title"><div class="section-heading"><div><span class="eyebrow">SEE IT IN YOUR WORLD</span><h2 id="industry-title">Different businesses.<br><span class="green-text">The same helpful idea.</span></h2></div><p>Choose your industry. Meet an AI employee, follow an example call and see what happens afterwards.</p></div><div class="industry-grid">${cards()}</div><p class="demo-note">${icon('headset')} Written examples are ready to explore. Call recordings will be added later.</p></section>
 <section class="how-section grain-surface" id="how-it-works" aria-labelledby="how-title">${grain}<div class="container"><div class="center-heading"><span class="eyebrow">HOW IT WORKS</span><h2 id="how-title">One call. <span class="green-text">Three simple steps.</span></h2><p>Helpful on the phone. Useful after you hang up.</p></div><ol class="how-grid"><li><div class="step-top"><span class="step-number" aria-hidden="true">01</span>${icon('phone')}</div><h3>Your customer calls.</h3><p>Your AI employee answers, introduces itself and listens to what the caller needs.</p><span class="step-example">“Hi, I’d like to book a visit.”</span></li><li><div class="step-top"><span class="step-number" aria-hidden="true">02</span>${icon('message')}</div><h3>It helps with the request.</h3><p>It answers approved questions, collects the details and helps arrange the next step.</p><span class="step-example">“What day works best for you?”</span></li><li><div class="step-top"><span class="step-number" aria-hidden="true">03</span>${icon('check')}</div><h3>The follow-up gets handled.</h3><p>With your tools connected, it can save the details, send a message or notify your team.</p><span class="step-example">The right details, in the right hands.</span></li></ol><p class="control-note">${icon('shield')} You decide what it can do and when a person should take over.</p></div></section>
 ${comparison(icon, button, book)}
 <section class="section container control-section exceptionalities" id="exceptionalities" aria-labelledby="exceptionalities-title"><div class="exceptionalities-heading"><div class="exceptionalities-tag"><span class="eyebrow">${icon('shield')} BUILT AROUND YOUR BUSINESS</span></div><h2 id="exceptionalities-title">Helpful AI.<br><span class="green-text">Human judgement.</span></h2></div><div class="control-grid"><div class="exceptionalities-row exceptionalities-row--top">${controlCards.slice(0,2).join('')}</div><div class="exceptionalities-row exceptionalities-row--bottom">${controlCards.slice(2).join('')}<div class="exceptionalities-cta" data-card-index="4"><div><h3>A helpful voice.<br>A useful next step.</h3><p>Built around your business in New Zealand.</p></div><div class="exceptionalities-actions">${button('Book a demo',book)}${button('Or email the team','mailto:admin@quiktalkai.com',true)}</div></div></div></div></section>
 ${enterpriseFeatures(icon)}
 ${enterpriseSecurity(icon)}
 <section class="section container faq-section" id="faqs"><div><span class="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</span><h2>Good questions.<br><span class="green-text">Clear answers.</span></h2></div><div class="faq-list">${faq.map(([q,a])=>`<details><summary>${q}${icon('plus')}</summary><div class="disclosure-content"><p>${a}</p></div></details>`).join('')}</div></section>`);
}
function industryPage(item) {
 const path = `/industries/${item.slug}/`;
 const related = industries.filter(i=>i.slug!==item.slug).slice(0,3);
 const recording = item.audioUrl
  ? `<div class="audio-block"><audio controls preload="metadata" aria-label="${esc(item.name)} demonstration call" src="${esc(item.audioUrl)}"></audio><p data-audio-status role="status" hidden></p></div>`
  : `<div class="recording-notice">${icon('headset')}<div><strong>Call recording coming later</strong><span>For now, follow the written example below.</span></div></div>`;
 return shell(`${item.name} AI Voice Agent Demo — QuikTalk AI`, `${item.description} Follow an example call and see the after-call workflow.`, path, `
 <div class="container"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/#industries">Industry demos</a><span aria-hidden="true">/</span><span aria-current="page">${esc(item.name)}</span></nav>
 <section class="industry-hero grain-surface">${grain}<div><span class="eyebrow">${icon(item.icon)} ${esc(item.name.toUpperCase())}</span><h1>${esc(item.title)}</h1><p>${esc(item.description)}</p><div class="hero-actions">${button('Read the example call','#example-call')}${button('See the follow-up','#after-the-call',true)}</div></div><aside class="role-profile glass" aria-label="Meet the AI employee"><div class="voice-emblem">${icon(item.icon)}<span class="voice-ring ring-one"></span><span class="voice-ring ring-two"></span></div><span class="role-label">MEET YOUR AI EMPLOYEE</span><h2>${esc(item.role)}</h2><p>A helpful voice with a clear job to do.</p><ul>${item.capabilities.map(text=>`<li>${icon('check')}${esc(text)}</li>`).join('')}</ul></aside></section>
 <nav class="industry-switcher" aria-label="Choose an industry">${industries.map(i=>`<a href="/industries/${i.slug}/"${i.slug===item.slug?' aria-current="page"':''}>${esc(i.short)}</a>`).join('')}</nav>
 <section class="scenario" aria-label="The situation">${icon(item.icon)}<div><strong>The situation</strong><p>${esc(item.scenario)}</p></div></section>
 <div class="demo-layout"><section class="demo-column" id="example-call" aria-labelledby="call-heading"><span class="eyebrow">01 · ON THE CALL</span><h2 id="call-heading">A conversation that helps.</h2><p>See how your ${esc(item.role)} handles this enquiry.</p>${recording}<div class="transcript"><div class="transcript-title">WRITTEN EXAMPLE · FICTIONAL CALLER AND DETAILS</div><ol class="conversation">${item.conversation.map(([speaker,line])=>`<li class="${speaker==='Caller'?'caller':'assistant'}"><span class="speaker">${esc(speaker)}</span><p>${esc(line)}</p></li>`).join('')}</ol></div></section>
 <section class="demo-column" id="after-the-call" aria-labelledby="after-heading"><span class="eyebrow">02 · AFTER THE CALL</span><h2 id="after-heading">Here’s what happens next.</h2><p>With your tools connected, this example could trigger these follow-up actions. Open each step to see the details.</p><div class="outcome-list">${item.steps.map((step,index)=>`<details class="outcome-step"${index===0?' open':''}><summary><span class="outcome-number">${index+1}</span><strong>${esc(step.title)}</strong>${icon('plus')}</summary><div class="outcome-content disclosure-content"><p>${esc(step.text)}</p><div class="sample-output"><span>${esc(step.type)}</span>${step.detail?`<dl>${step.detail.map(([key,value])=>`<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>`:`<p>${esc(step.message)}</p>`}</div></div></details>`).join('')}</div><div class="result-line">${icon('check')}<span>${esc(item.result)}</span></div><div class="handoff-note"><h3>${icon('people')} When your team takes over</h3><p>${esc(item.handoff)}</p></div></section></div>
 <p class="demo-disclaimer">This is an illustrative conversation and workflow, not a live call or a customer result. The actions available depend on your connected tools, information and agreed rules. We test the full process with you before launch.</p>
 <section class="more-demos"><div class="section-heading"><h2>Explore another industry.</h2><a class="text-link" href="/#industries">View all demos ${arrow}</a></div><div class="industry-grid">${cards(related)}</div></section></div>`, 'Picture this working<br>for your business.');
}

function notFoundPage() {
 const head = '<meta name="robots" content="noindex, follow">';
 const body = `
 <div class="container" style="min-height: 55vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 6rem 1.5rem 4rem;">
  <span class="eyebrow">${icon('shield')} 404 · PAGE NOT FOUND</span>
  <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); margin: 1rem 0 1.25rem; line-height: 1.1;">We couldn’t find that page.</h1>
  <p style="max-width: 540px; margin: 0 auto 2.5rem; color: var(--color-muted, #94a3b8); font-size: 1.15rem; line-height: 1.6;">
   The page you requested may have moved, been renamed, or is temporarily unavailable. Let’s get you back on track.
  </p>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
   ${button('Return home', '/')}
   ${button('Explore industry demos', '/#industries', true)}
   ${button('Book a demo', book, true)}
  </div>
 </div>`;
 return shell('Page Not Found — QuikTalk AI', 'The page you requested could not be found. Explore our AI voice agents, service offerings, and industry demonstrations.', '/404.html', body, 'Let’s give your business<br>a helpful new voice.', head);
}

function privacyPolicyPage() {
 const head = '<meta property="og:image" content="' + origin + '/assets/quiktalk-headset.png">';
 return shell('Privacy Policy — QuikTalk AI', 'Privacy Policy for QuikTalk AI voice receptionists and customer workflow solutions, adhering to NZ Privacy Act 2020 and Australian Privacy Principles.', '/privacy-policy/', privacyPolicyBody({ icon }), 'Let’s give your business<br>a helpful new voice.', head);
}

function termsPage() {
 const head = '<meta property="og:image" content="' + origin + '/assets/quiktalk-headset.png">';
 return shell('Terms of Service — QuikTalk AI', 'Terms of Service governing use of the QuikTalk AI website, demonstrations, and AI employee solutions in New Zealand and Australia.', '/terms-of-service/', termsBody({ icon }), 'Let’s give your business<br>a helpful new voice.', head);
}

await mkdir(root, {recursive:true});
await writeFile(root + '/index.html', homepage());
await writeFile(root + '/404.html', notFoundPage());

for (const page of [aiWorkflows, webDevelopment]) {
 await mkdir(root + page.path, {recursive:true});
 await writeFile(root + page.path + 'index.html', shell(page.title, page.description, page.path, serviceDetailBody(page, {icon, button, book, grain}), page.closingHeading, serviceDetailHead(page, origin), page.contactOptions));
}
await mkdir(root + aiInfrastructurePath, {recursive:true});
await writeFile(root + aiInfrastructurePath + 'index.html', shell(aiInfrastructureTitle, aiInfrastructureDescription, aiInfrastructurePath, aiInfrastructureBody({icon, button, book, grain}), 'Let’s connect the tools<br>behind your business.', aiInfrastructureHead(origin)));
await mkdir(root + aiEmployeesPath, {recursive:true});
await writeFile(root + aiEmployeesPath + 'index.html', shell(aiEmployeesTitle, aiEmployeesDescription, aiEmployeesPath, aiEmployeesBody({icon, button, book, grain, industries}), 'Let’s find the right role<br>for your business.', aiEmployeesHead(origin))); 

for (const item of industries) {
 await mkdir(`${root}/industries/${item.slug}`, {recursive:true});
 await writeFile(`${root}/industries/${item.slug}/index.html`, industryPage(item));
}

await mkdir(root + '/privacy-policy', {recursive:true});
await writeFile(root + '/privacy-policy/index.html', privacyPolicyPage());

await mkdir(root + '/terms-of-service', {recursive:true});
await writeFile(root + '/terms-of-service/index.html', termsPage());

const allPublicRoutes = [
 '/',
 aiEmployeesPath,
 aiInfrastructurePath,
 aiWorkflows.path,
 webDevelopment.path,
 '/privacy-policy/',
 '/terms-of-service/',
 ...industries.map(item => `/industries/${item.slug}/`)
];

await writeFile(root + '/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allPublicRoutes.map(path=>`<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`);
await writeFile(root + '/robots.txt', `User-agent: *\nAllow: /\nDisallow: /404.html\nSitemap: ${origin}/sitemap.xml\n`);

const redirectsContent = `# Cloudflare Pages Redirect Rules
# Format: /source /destination [status]

# Service routes trailing-slash normalization
/services/ai-employees          /services/ai-employees/         301
/services/ai-infrastructure     /services/ai-infrastructure/    301
/services/ai-workflows          /services/ai-workflows/         301
/services/web-development       /services/web-development/      301

# Industry demo routes trailing-slash normalization
/industries/trades              /industries/trades/             301
/industries/healthcare          /industries/healthcare/         301
/industries/real-estate         /industries/real-estate/        301
/industries/automotive          /industries/automotive/         301
/industries/hospitality         /industries/hospitality/        301
/industries/professional-services /industries/professional-services/ 301

# Legal routes trailing-slash normalization
/privacy-policy                 /privacy-policy/                301
/terms-of-service               /terms-of-service/              301
`;
await writeFile(root + '/_redirects', redirectsContent);

console.log(`Built the home page, 404 page, four service pages, two legal pages, and ${industries.length} industry demo pages with origin "${origin}".`);
