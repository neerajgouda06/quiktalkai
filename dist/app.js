const icons={lead:'<path d="M14 5h5v5M19 5l-7 7-4-4-5 5"/><path d="M4 20h16"/>',database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 5h2m4 0h2"/>',people:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0112 0v4m1-17a3 3 0 010 6m2 4a5 5 0 013 4v3"/>',check:'<path d="M5 12l4 4L19 6"/>'};
Object.assign(icons,{
  mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
  file:'<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9zM14 3v6h6M8 13h8m-8 4h5"/>',
  support:'<path d="M4 13V11a8 8 0 0116 0v2M4 12H2v7h4v-7zm16 0h2v7h-4v-7zm0 7c0 3-4 3-8 3"/>',
  workflow:'<rect x="2" y="2" width="6" height="6" rx="2"/><rect x="16" y="16" width="6" height="6" rx="2"/><rect x="2" y="16" width="6" height="6" rx="2"/><path d="M5 8v8m3-11h6a5 5 0 015 5v6M8 19h8"/>',
  research:'<circle cx="10" cy="10" r="7"/><path d="M15 15l6 6M7 10h6m-3-3v6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  tool:'<path d="M14 4a6 6 0 00-7 8L3 16a3 3 0 004 4l5-5a6 6 0 007-8l-4 4-3-3z"/>',
  health:'<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 7v10M7 12h10"/>',
  briefcase:'<rect x="3" y="7" width="18" height="14" rx="3"/><path d="M8 7V4h8v3M3 12a20 20 0 0018 0M12 12v4"/>',
  home:'<path d="M3 10l9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
  car:'<path d="M3 11l3-7h12l3 7v8H3zM3 11h18M6 15h2m8 0h2M5 19v2m14-2v2"/>',
  cup:'<path d="M4 8h12v7a6 6 0 01-12 0zm12 1h2a3 3 0 010 6h-2M3 22h15M8 3v2m4-2v2"/>'
});
function icon(name){return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.lead}</svg>`}
function renderIcons(){document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));}
renderIcons();
const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu');nav.classList.remove('open');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!open));menuToggle.setAttribute('aria-label',open?'Open menu':'Close menu');nav.classList.toggle('open',!open);if(!open)nav.querySelector('a').focus()});
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menuToggle.focus()}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu()});
window.matchMedia('(min-width:821px)').addEventListener('change',()=>closeMenu());

// All demonstration data is illustrative. No business systems are contacted.
const workflow=[
  {agent:'Lead agent',icon:'mail',title:'Start with understanding.',description:'An enquiry arrives. The agent identifies the request, extracts the details and checks what’s missing.',input:'“We need help organising our customer follow-ups.”',action:'Identify intent and create a structured enquiry.',tools:'Inbox · Enquiry form',output:'A clear request, with the relevant details.',handoff:'Missing information? Ask a clarifying question before proceeding.'},
  {agent:'Qualification agent',icon:'lead',title:'Find the right next step.',description:'The agent assesses the enquiry against your agreed criteria, including the type of work, location and priorities.',input:'The structured enquiry and your qualification rules.',action:'Assess fit, determine urgency and select a permitted next step.',tools:'Business knowledge · Qualification rules',output:'A qualified opportunity with a reason for the decision.',handoff:'An exception or uncertain match goes to your team for review.'},
  {agent:'CRM agent',icon:'database',title:'Bring the context together.',description:'The CRM agent looks for an existing customer, checks the history and prepares the record for the next action.',input:'The qualified opportunity and contact details.',action:'Find the matching record and add the enquiry without creating duplicates.',tools:'Connected CRM',output:'A customer record linked to the opportunity.',handoff:'Conflicting or duplicate records are flagged before a change is made.'},
  {agent:'Scheduling agent',icon:'calendar',title:'Turn interest into a plan.',description:'The scheduling agent checks the right calendar and proposes available times that fit your booking rules.',input:'A qualified opportunity and the customer’s availability.',action:'Check real availability and arrange an agreed time.',tools:'Connected calendar · Booking rules',output:'A meeting time agreed with the customer.',handoff:'If no suitable slot is available, the request goes to a coordinator.'},
  {agent:'Communication agent',icon:'check',title:'Close the loop. Check the work.',description:'The system sends the agreed confirmation, checks the booking exists and verifies the record update.',input:'The agreed booking and customer record.',action:'Send confirmation, update the CRM and check the tool results.',tools:'Email · Calendar · CRM',output:'A confirmed meeting, with the details recorded.',handoff:'A failed send or unverified booking is flagged for review, not marked complete.'},
  {agent:'Follow-up agent',icon:'people',title:'Your team takes it from here.',description:'Your sales team receives the context and the next action. A follow-up is scheduled according to your process.',input:'The verified booking and enquiry history.',action:'Prepare a concise handoff and schedule the next permitted follow-up.',tools:'CRM · Team notifications · Task queue',output:'A prepared team, a booked meeting and a clear next step.',handoff:'Your team owns the conversation and any decisions outside the agreed workflow.'}
];
let activeStep=0,playing=false,playTimer;
const stepButtons=[...document.querySelectorAll('[data-step]')];
const playButton=document.querySelector('#play-demo');
const playLabel=document.querySelector('#play-label');
const demoStatus=document.querySelector('#demo-status');
function setStep(index){
  activeStep=index;const step=workflow[index];
  stepButtons.forEach((button,i)=>{button.classList.toggle('is-active',i===index);button.setAttribute('aria-pressed',String(i===index))});
  document.querySelector('#detail-stage').textContent=`STEP ${String(index+1).padStart(2,'0')} / 06`;
  document.querySelector('#detail-agent').textContent=step.agent.toUpperCase();
  document.querySelector('#detail-icon').innerHTML=icon(step.icon);
  for(const key of ['title','description','input','action','tools','output','handoff'])document.querySelector(`#detail-${key}`).textContent=step[key];
}
function stopDemo(){clearTimeout(playTimer);playing=false;playLabel.textContent='Play workflow';}
function advanceDemo(){
  if(!playing)return;
  if(activeStep===workflow.length-1){stopDemo();playLabel.textContent='Replay workflow';demoStatus.textContent='Example complete. Your team receives a verified outcome.';return}
  setStep(activeStep+1);demoStatus.textContent=`Step ${activeStep+1} of 6: ${workflow[activeStep].agent}.`;playTimer=setTimeout(advanceDemo,2300);
}
stepButtons.forEach(button=>button.addEventListener('click',()=>{stopDemo();setStep(Number(button.dataset.step));demoStatus.textContent=`Exploring step ${activeStep+1} of 6.`}));
playButton.addEventListener('click',()=>{if(playing){stopDemo();demoStatus.textContent=`Paused at step ${activeStep+1} of 6.`;return}if(activeStep===workflow.length-1)setStep(0);playing=true;playLabel.textContent='Pause workflow';demoStatus.textContent=`Playing example: step ${activeStep+1} of 6.`;playTimer=setTimeout(advanceDemo,2300)});
document.querySelector('#reset-demo').addEventListener('click',()=>{stopDemo();setStep(0);demoStatus.textContent='Explore any step, or play the workflow.'});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){stopDemo();demoStatus.textContent=`Paused at step ${activeStep+1} of 6.`}});

const industries={
  trades:{kicker:'Your AI job coordinator',title:'Keep the jobs moving.\nKeep your team on the tools.',description:'An enquiry arrives while your team is on site. Your AI employee captures the job details and coordinates what happens next.',tasks:['Capture the property, job type and urgency','Route urgent requests to the right person','Arrange a service window and update the job record'],outcome:'A clear job brief. A coordinated next step.'},
  healthcare:{kicker:'Your AI practice coordinator',title:'Less appointment admin.\nMore time for your patients.',description:'Help your front desk coordinate the administrative work around appointments, with clear handoffs to practice staff.',tasks:['Capture appointment requests and administrative details','Check available times and send confirmations','Route clinical questions to qualified staff'],outcome:'Appointments organised. Clinical decisions stay with people.'},
  professional:{kicker:'Your AI client intake employee',title:'Make the first enquiry\na useful conversation.',description:'Give your legal, financial or professional services team structured context before they meet a prospective client.',tasks:['Gather the enquiry details and service requirements','Route requests using your intake criteria','Prepare a client brief and arrange a consultation'],outcome:'A prepared team. A clearer first meeting.'},
  property:{kicker:'Your AI property coordinator',title:'Keep every enquiry\nmoving toward a viewing.',description:'Organise buyer and tenant enquiries so your property team can focus on relationships, viewings and decisions.',tasks:['Capture property interests and viewing preferences','Retrieve approved listing information and arrange a viewing','Update the CRM and schedule a follow-up'],outcome:'An organised enquiry. A viewing with the right context.'},
  automotive:{kicker:'Your AI service coordinator',title:'A smoother booking.\nA better-prepared workshop.',description:'Coordinate the information around service enquiries and bookings while your technicians focus on the vehicles.',tasks:['Collect vehicle and service-request details','Check service slots and send booking confirmations','Retrieve approved job-status updates for customers'],outcome:'A complete service brief. Fewer interruptions.'},
  hospitality:{kicker:'Your AI reservations employee',title:'Take care of the details.\nBe present for your guests.',description:'Handle the routine coordination around reservations and group enquiries while your team delivers the experience.',tasks:['Capture dates, group size and guest requests','Check availability and confirm permitted reservations','Pass special arrangements to your team with context'],outcome:'Reservations organised. Special requests in the right hands.'}
};
const industryTabs=[...document.querySelectorAll('[data-industry]')];
function selectIndustry(button,focus=false){
  const industry=industries[button.dataset.industry];
  industryTabs.forEach(tab=>{const selected=tab===button;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1});
  document.querySelector('#industry-panel').setAttribute('aria-labelledby',button.id);
  document.querySelector('#industry-kicker').textContent=industry.kicker.toUpperCase();
  document.querySelector('#industry-title').textContent=industry.title;
  document.querySelector('#industry-description').textContent=industry.description;
  document.querySelector('#industry-tasks').replaceChildren(...industry.tasks.map(task=>{const li=document.createElement('li');li.textContent=task;return li}));
  document.querySelector('#industry-outcome').textContent=industry.outcome;
  if(focus)button.focus();
}
industryTabs.forEach((button,index)=>{button.addEventListener('click',()=>selectIndustry(button));button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%industryTabs.length;if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index-1+industryTabs.length)%industryTabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=industryTabs.length-1;if(next!==undefined){event.preventDefault();selectIndustry(industryTabs[next],true)}})});

const employees={
  sales:{title:'Sales employee',icon:'lead',intro:'Give new opportunities a consistent next step, from the first enquiry to a prepared sales conversation.',tasks:['Research prospects using agreed information sources.','Assess enquiries against your qualification criteria.','Update contact records and prepare a handoff brief.','Send permitted follow-ups and coordinate the next meeting.'],handoff:'Your sales team handles negotiations, unusual requests and decisions that need judgement.'},
  support:{title:'Support employee',icon:'support',intro:'Handle recurring requests using your approved knowledge, with a clear route to a person when the answer needs one.',tasks:['Understand and classify incoming requests.','Retrieve answers from your approved business knowledge.','Update the support record and communicate the next step.','Escalate exceptions with the request history attached.'],handoff:'A person reviews sensitive complaints, unclear answers and actions outside the agreed permissions.'},
  operations:{title:'Operations employee',icon:'workflow',intro:'Coordinate the repeatable work between teams and tools, with each step tied to a defined outcome.',tasks:['Read structured inputs from your business systems.','Move approved data between connected tools.','Run multi-step tasks in the agreed order.','Check action results and surface failed or incomplete work.'],handoff:'Your operations team reviews exceptions, conflicting data and changes that need approval.'},
  admin:{title:'Admin employee',icon:'file',intro:'Take repetitive preparation and coordination out of your team’s day.',tasks:['Extract agreed fields from incoming documents.','Organise records using your naming and filing rules.','Prepare summaries and routine documents for review.','Create tasks and notify the right person.'],handoff:'Your team reviews unclear source material, sensitive changes and final documents that need sign-off.'},
  research:{title:'Research employee',icon:'research',intro:'Turn an agreed research question into an organised brief your team can examine and use.',tasks:['Gather information from approved sources.','Compare findings against your brief.','Separate documented facts from uncertain conclusions.','Produce a source-linked summary for your team.'],handoff:'People verify material claims and decide how to use the findings. Unavailable or conflicting sources are flagged.'},
  scheduling:{title:'Scheduling employee',icon:'calendar',intro:'Coordinate the small steps that turn a request into an organised appointment.',tasks:['Collect availability and booking requirements.','Check connected calendars against your rules.','Arrange agreed times and send confirmations.','Update the record and schedule permitted reminders.'],handoff:'Your coordinator handles exceptions, unavailable time slots and changes outside the booking policy.'}
};
const employeeDialog=document.querySelector('#employee-dialog');let lastEmployeeTrigger,contactOnClose=false;
document.querySelectorAll('[data-employee]').forEach(button=>button.addEventListener('click',()=>{
  const employee=employees[button.dataset.employee];lastEmployeeTrigger=button;contactOnClose=false;
  document.querySelector('#employee-dialog-title').textContent=employee.title;
  document.querySelector('#modal-avatar').innerHTML=icon(employee.icon);
  document.querySelector('#modal-intro').textContent=employee.intro;
  document.querySelector('#modal-tasks').replaceChildren(...employee.tasks.map(task=>{const li=document.createElement('li');li.textContent=task;return li}));
  document.querySelector('#modal-handoff').textContent=employee.handoff;
  employeeDialog.showModal();document.body.classList.add('dialog-open');document.querySelector('.dialog-close').focus();
}));
document.querySelector('.dialog-close').addEventListener('click',()=>employeeDialog.close());
employeeDialog.addEventListener('click',event=>{if(event.target===employeeDialog){const box=employeeDialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)employeeDialog.close()}});
employeeDialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(contactOnClose){document.querySelector('#contact a').focus({preventScroll:true});contactOnClose=false}else{lastEmployeeTrigger?.focus()}});
document.querySelector('#modal-contact').addEventListener('click',()=>{contactOnClose=true;employeeDialog.close()});
document.querySelector('#copyright-year').textContent=new Date().getFullYear();

// Short entrance transitions; content remains visible if scripting is unavailable.
const reducedMotion=window.matchMedia('(prefers-reduced-motion:reduce)');
if(!reducedMotion.matches&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');entry.target.classList.remove('pending');observer.unobserve(entry.target)}})},{threshold:.08});
  document.querySelectorAll('.section-heading,.center-heading,.employee-card,.comparison,.approach-grid li,.outcomes-grid article,.contact-card').forEach(element=>{if(element.getBoundingClientRect().top>window.innerHeight){element.classList.add('reveal','pending');observer.observe(element)}});
  reducedMotion.addEventListener('change',event=>{if(event.matches){document.querySelectorAll('.reveal.pending').forEach(element=>element.classList.remove('pending'));observer.disconnect()}});
}
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches&&!reducedMotion.matches){
  document.querySelectorAll('.employee-card').forEach(card=>card.addEventListener('pointermove',event=>{const rect=card.getBoundingClientRect();card.style.setProperty('--pointer-x',`${event.clientX-rect.left}px`);card.style.setProperty('--pointer-y',`${event.clientY-rect.top}px`)}));
}
