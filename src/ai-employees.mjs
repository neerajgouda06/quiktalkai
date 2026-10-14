export const aiEmployeesPath = '/services/ai-employees/';
export const aiEmployeesTitle = 'AI Employees for NZ & Australian Businesses | QuikTalk AI';
export const aiEmployeesDescription = 'Explore AI receptionists, booking assistants and enquiry assistants for New Zealand and Australian businesses. See roles, examples, setup and FAQs.';

const roles = [
  ['headset', 'The receptionist', 'Welcomes callers, answers everyday questions and gets messages to the right person.'],
  ['calendar', 'The booking assistant', 'Collects the details and helps arrange appointments, service visits or reservations.'],
  ['briefcase', 'The enquiry assistant', 'Finds out what a new customer needs and prepares your team for the next conversation.'],
];

export const employeeQuestions = [
  ['What can an AI employee do for my business?', 'An AI employee can answer approved questions, collect enquiry details, take messages and help with bookings. With the right tools connected, it may also update a customer record, send an agreed confirmation or create a follow-up task. We confirm which actions fit your systems before enabling them.'],
  ['Is an AI employee the same as an AI voice agent?', 'An AI voice agent is the software that speaks with callers. An AI employee is the business role we give that agent, such as receptionist, booking assistant or enquiry assistant. That role defines the information it can use, the work it can do and when it should involve your team.'],
  ['Can it keep our existing phone number and booking software?', 'We review your current phone provider, call routing, booking tools and customer systems first. Some setups support forwarding or a direct integration; others need a different arrangement. Compatibility, access and any provider costs are confirmed before you commit to the setup.'],
  ['Will it confirm every appointment automatically?', 'Only when the connected booking system and your agreed rules allow it. If availability cannot be checked, or staff approval is required, it records a request for your team to confirm. The caller should know whether they have a confirmed booking or a pending request.'],
  ['What happens when the AI cannot answer a question?', 'We define the handoff process with you. The assistant can take a message, request a callback or transfer a call where supported by the phone setup. Complex, sensitive and out-of-scope requests go to a person; it should not invent an answer or promise an unavailable transfer.'],
  ['Can it answer calls outside our opening hours?', 'After-hours handling can be included in the call-routing plan. You choose what the assistant may answer, which requests it can collect and what the caller is told about response times. Availability depends on the agreed phone setup and connected services.'],
  ['How much does an AI employee cost?', 'We scope the role before quoting. Relevant factors include call volume and duration, the systems to connect, setup and testing, and the support you need. Ask for a quote that separates setup, ongoing service and any phone or software provider charges. No fixed price is published on this page.'],
  ['What do we need to provide to get started?', 'Bring your opening hours, services, common questions, booking rules, phone setup and the details of any tools you want to connect. Choose a team contact for exceptions. We use this information to define one role and review example calls and follow-up actions with you before launch.'],
];

const definition = 'An AI employee is a business-focused AI assistant with a defined role, approved information and agreed actions. It can handle routine phone enquiries, collect details and help with bookings, while passing requests that need human judgement to your team.';

export function aiEmployeesHead(origin) {
  const url = origin + aiEmployeesPath;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${origin}/#organization`, name: 'QuikTalk AI', url: 'https://www.quiktalkai.com/', email: 'admin@quiktalkai.com', logo: `${origin}/assets/quiktalk-headset.png` },
      { '@type': 'Service', '@id': `${url}#service`, name: 'AI Employees', description: definition, serviceType: ['AI receptionist', 'AI booking assistant', 'AI enquiry assistant'], provider: { '@id': `${origin}/#organization` }, areaServed: [{ '@type': 'Country', name: 'New Zealand' }, { '@type': 'Country', name: 'Australia' }], url },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: aiEmployeesTitle, description: aiEmployeesDescription, inLanguage: 'en-NZ', mainEntity: { '@id': `${url}#service` }, publisher: { '@id': `${origin}/#organization` }, breadcrumb: { '@id': `${url}#breadcrumb` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` }, { '@type': 'ListItem', position: 2, name: 'AI Employees', item: url }] },
    ],
  };
  return `<link rel="stylesheet" href="/ai-employees.css"><meta property="og:image" content="${origin}/assets/quiktalk-headset.png"><meta property="og:image:alt" content="QuikTalk AI chrome headset logo"><meta name="twitter:image" content="${origin}/assets/quiktalk-headset.png"><script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export function aiEmployeesBody({ icon, button, book, grain, industries }) {
  const arrow = icon('arrow');
  const capabilities = [
    ['phone', 'A useful first answer', 'Share the services, opening hours and answers you approve. Collect the details needed for the next step instead of sending your team an incomplete message.'],
    ['calendar', 'Clear booking requests', 'Gather the customer’s preferred time, location and reason for calling. Confirm a booking only when connected availability and your rules permit it.'],
    ['note', 'A clear next step', 'With your tools connected, save agreed details, create a follow-up task or send an approved message. Your team can see what still needs attention.'],
  ];
  const setup = [
    ['Choose one role', 'Start with the calls that create the most repeated work: reception, bookings or new enquiries. Agree on what a useful outcome looks like.'],
    ['Set the information and rules', 'Provide accurate service details, opening hours, common answers, booking conditions and a named handoff contact. Decide what needs approval.'],
    ['Check the connections', 'Review phone routing and any calendar, booking or customer-system access. Confirm compatibility, permissions and provider costs before connecting tools.'],
    ['Review calls before launch', 'Try routine enquiries, unclear requests and cases that need a person. Review the answers and follow-up actions with your team, then agree on ongoing updates.'],
  ];
  return `<div class="ai-employees-page">
    <nav class="breadcrumb container" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">AI Employees</span></nav>
    <section class="section container employee-section ai-employees-hero" id="ai-employees" aria-labelledby="employees-title">
      <div class="employee-copy"><span class="eyebrow">VOICE AGENTS. REAL BUSINESS ROLES.</span><h1 id="employees-title">Meet your next<br><span class="green-text">AI employee.</span></h1><p>Start with a job your business needs help with. We shape the voice, knowledge and actions around that role.</p><p class="employees-location">AI receptionists and booking assistants for New Zealand and Australian businesses.</p><a class="text-link" href="#employee-examples">Find a role for your business ${arrow}</a></div>
      <div class="employee-list">${roles.map(([symbol, title, text]) => `<article><span class="icon-tile">${icon(symbol)}</span><div><h2>${title}</h2><p>${text}</p></div></article>`).join('')}</div>
    </section>
    <nav class="employees-jump-nav container" aria-label="On this page"><a href="#what-is-an-ai-employee">What it does</a><a href="#employee-examples">Industry examples</a><a href="#employee-setup">Getting started</a><a href="#employee-questions">Common questions</a></nav>
    <section class="employees-overview grain-surface" id="what-is-an-ai-employee" aria-labelledby="employee-definition-title">${grain}<div class="container">
      <div class="employees-section-heading"><span class="eyebrow">A CLEAR ROLE. A USEFUL NEXT STEP.</span><h2 id="employee-definition-title">What is an AI employee?</h2><p class="employees-definition">${definition}</p><p>QuikTalk AI is based in Auckland and works with businesses in New Zealand and Australia. We shape the assistant around your calls, business information and connected tools.</p></div>
      <div class="employees-capabilities">${capabilities.map(([symbol, title, text]) => `<article><span class="icon-tile">${icon(symbol)}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
      <aside class="employees-handoff"><span class="icon-tile">${icon('people')}</span><div><h3>Your team keeps the decisions that need a person.</h3><p>Complaints, unusual requests, sensitive questions and anything outside the approved role follow your handoff rules. You decide what the assistant may book, send or update, and what needs staff approval.</p></div></aside>
    </div></section>
    <section class="employees-examples section container" id="employee-examples" aria-labelledby="employee-examples-title"><div class="employees-section-heading"><span class="eyebrow">SEE IT IN YOUR WORLD</span><h2 id="employee-examples-title">Find a role for your business.</h2><p>Explore a written example call and the work that follows. These are illustrative scenarios with fictional callers, not customer case studies or a live service.</p></div><div class="employees-example-grid">${industries.map(item => `<a class="employees-example" href="/industries/${item.slug}/"><span class="icon-tile">${icon(item.icon)}</span><div><h3>${item.name}</h3><p>${item.card}</p><span class="employees-example-role">${item.role}</span></div><span class="employees-example-arrow">${arrow}</span></a>`).join('')}</div></section>
    <section class="employees-setup grain-surface" id="employee-setup" aria-labelledby="employee-setup-title">${grain}<div class="container"><div class="employees-section-heading"><span class="eyebrow">START WITH ONE JOB</span><h2 id="employee-setup-title">How we shape your AI employee.</h2><p>A clear scope makes the assistant easier to review and gives your team a useful first step.</p></div><ol class="employees-setup-list">${setup.map(([title, text], index) => `<li><span class="employees-step" aria-hidden="true">0${index + 1}</span><div><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ol><div class="employees-setup-contact">${button('Discuss your first AI employee', book)}<p>Bring a few common enquiries and tell us how your team handles them today.</p></div></div></section>
    <section class="employees-comparison section container" aria-labelledby="employees-comparison-title"><div class="employees-section-heading"><span class="eyebrow">CHOOSE THE RIGHT SUPPORT</span><h2 id="employees-comparison-title">Where does an AI employee fit?</h2><p>Different types of call handling solve different problems. Choose around the work your callers need done.</p></div><div class="employees-table-wrap"><table><caption>Comparing call-handling options</caption><thead><tr><th scope="col">Option</th><th scope="col">What it is designed to do</th><th scope="col">What to consider</th></tr></thead><tbody><tr><th scope="row">Voicemail</th><td>Record a message for your team to return.</td><td>A person still needs to listen, collect any missing details and follow up.</td></tr><tr><th scope="row">Phone menu</th><td>Route a caller through a set of options.</td><td>A fixed menu may not resolve a question or collect the details of a new request.</td></tr><tr><th scope="row">AI employee</th><td>Have a conversation within an approved role and help with agreed tasks.</td><td>Accurate business information, supported connections and clear handoff rules are essential.</td></tr><tr><th scope="row">Your team</th><td>Handle judgement, exceptions, relationships and complex decisions.</td><td>Keep people involved where context, care or authority is needed.</td></tr></tbody></table></div></section>
    <section class="employees-faq section container" id="employee-questions" aria-labelledby="employee-questions-title"><div class="employees-section-heading"><span class="eyebrow">PRACTICAL ANSWERS</span><h2 id="employee-questions-title">Common questions about AI employees.</h2></div><div class="faq-list">${employeeQuestions.map(([question, answer]) => `<details><summary>${question}${icon('plus')}</summary><div class="disclosure-content"><p>${answer}</p></div></details>`).join('')}</div><p class="employees-page-note">Service information from QuikTalk AI · Auckland, New Zealand · Serving NZ &amp; Australia</p><a class="text-link employees-back" href="/#services">Explore all QuikTalk services ${arrow}</a></section>
  </div>`;
}
