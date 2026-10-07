// Written, illustrative scenarios. Add approved audio and its matching transcript here later.
export const industries = [
  {
    slug: 'trades', name: 'Trades & home services', short: 'Trades', icon: 'tools',
    role: 'AI booking assistant', title: 'On the tools? Let your calls come to us.',
    description: 'Give customers a helpful answer while you are out on a job. Your AI employee collects the details and helps arrange the next visit.',
    card: 'Take the enquiry. Capture the job. Arrange the visit.',
    scenario: 'A homeowner calls about a dripping kitchen tap and wants to arrange a plumber.',
    result: 'A clear job request, ready for your team.', audioUrl: null,
    conversation: [
      ['AI booking assistant', 'Thanks for calling. I’m the AI booking assistant. How can I help?'],
      ['Caller', 'My kitchen tap is dripping. Can I get someone to have a look?'],
      ['AI booking assistant', 'I can help with a visit request. Is there any active flooding, or is it a slow drip?'],
      ['Caller', 'Just a slow drip. I’m Sam, at 24 Example Lane in Auckland.'],
      ['AI booking assistant', 'Thanks, Sam. What day would suit you, and can the team text this number about the visit?'],
      ['Caller', 'Thursday morning would be good. Yes, this number is fine.'],
      ['AI booking assistant', 'I’ll send your request to the team with those details. They’ll confirm an available time by text.']
    ],
    steps: [
      { title: 'Save the job details', text: 'Put the address, issue and preferred time into your connected job system.', type: 'Job request', detail: [['Customer', 'Sam'], ['Address', '24 Example Lane, Auckland'], ['Request', 'Dripping kitchen tap'], ['Preferred time', 'Thursday morning'], ['Status', 'Awaiting team confirmation']] },
      { title: 'Send a clear acknowledgement', text: 'Let the customer know the request has reached your team.', type: 'Example text message', message: 'Hi Sam, we’ve received your request about the kitchen tap. You asked for Thursday morning. Our team will text you to confirm an available visit time.' },
      { title: 'Give your team the next step', text: 'Send the job summary to the person who handles bookings.', type: 'Team handoff', detail: [['Task', 'Confirm a visit time'], ['Issue', 'Slow drip; no active flooding reported'], ['Contact', 'Caller’s number, approved for text'], ['Next step', 'Check availability and reply to Sam']] }
    ],
    handoff: 'Urgent problems, requests outside your service area or questions that need a tradesperson go to your team under the rules you agree.',
    capabilities: ['Capture new job enquiries', 'Answer service-area questions', 'Arrange bookings or callbacks']
  },
  {
    slug: 'healthcare', name: 'Dental & healthcare', short: 'Healthcare', icon: 'health',
    role: 'AI practice receptionist', title: 'A helpful first answer for your patients.',
    description: 'Help with routine appointment requests and practice information, so your reception team can focus on the people in front of them.',
    card: 'Handle routine enquiries. Help patients find a time.',
    scenario: 'A patient calls to request a routine dental check-up next week.',
    result: 'An appointment request your reception team can act on.', audioUrl: null,
    conversation: [
      ['AI practice receptionist', 'Thanks for calling the practice. I’m the AI receptionist. How can I help?'],
      ['Caller', 'I’d like to book a routine dental check-up.'],
      ['AI practice receptionist', 'Of course. Are you an existing patient, and what name should I put on the request?'],
      ['Caller', 'Yes, I’m Alex Taylor. A morning next week would suit me.'],
      ['AI practice receptionist', 'Thank you, Alex. May reception text you on this number with an available appointment?'],
      ['Caller', 'Yes, please.'],
      ['AI practice receptionist', 'I’ll pass on your request for a routine check-up next week in the morning. Reception will confirm the appointment with you.']
    ],
    steps: [
      { title: 'Record the appointment request', text: 'Save the booking preferences in the practice’s approved system.', type: 'Appointment request', detail: [['Patient', 'Alex Taylor · existing patient'], ['Visit', 'Routine dental check-up'], ['Preference', 'Next week, morning'], ['Status', 'Reception to confirm']] },
      { title: 'Acknowledge the request', text: 'Send a simple acknowledgement through the practice’s approved messaging service.', type: 'Example text message', message: 'Hi Alex, we’ve received your appointment request for a morning next week. Reception will contact you to confirm a suitable time.' },
      { title: 'Pass the details to reception', text: 'Give reception the information they need to find an appointment.', type: 'Reception handoff', detail: [['Task', 'Find an available morning appointment'], ['Request', 'Routine dental check-up'], ['Contact', 'Text the caller’s number'], ['Next step', 'Confirm the time with Alex']] }
    ],
    handoff: 'Clinical questions and urgent concerns are passed to staff using your practice’s agreed process. The AI receptionist handles administration and does not give clinical advice.',
    capabilities: ['Collect appointment requests', 'Share approved practice information', 'Pass messages to reception']
  },
  {
    slug: 'real-estate', name: 'Real estate', short: 'Real estate', icon: 'home',
    role: 'AI property assistant', title: 'Keep the conversation going between viewings.',
    description: 'Give property enquiries a prompt response. Your AI employee captures what the buyer needs and passes the next step to the right agent.',
    card: 'Capture buyer interest. Arrange the next conversation.',
    scenario: 'A buyer calls to request a viewing of a listed property.',
    result: 'A viewing enquiry with the details your agent needs.', audioUrl: null,
    conversation: [
      ['AI property assistant', 'Hello, I’m the AI property assistant. Which property are you calling about?'],
      ['Caller', 'The place at 18 Example Street. Could I view it this Saturday?'],
      ['AI property assistant', 'I can pass a viewing request to the agent. What name should I use, and what time would suit?'],
      ['Caller', 'Jordan Lee. Saturday afternoon, ideally. We’re looking for a three-bedroom home.'],
      ['AI property assistant', 'Thanks, Jordan. May the agent text this number to arrange the viewing?'],
      ['Caller', 'Yes, that works.'],
      ['AI property assistant', 'I’ll share your request for Saturday afternoon and your interest in a three-bedroom home. The agent will confirm the viewing time with you.']
    ],
    steps: [
      { title: 'Save the buyer enquiry', text: 'Add the property, buyer preferences and requested time to your connected customer system.', type: 'Buyer enquiry', detail: [['Buyer', 'Jordan Lee'], ['Property', '18 Example Street'], ['Looking for', 'Three-bedroom home'], ['Viewing request', 'Saturday afternoon']] },
      { title: 'Send an acknowledgement', text: 'Keep the buyer informed while the agent checks their diary.', type: 'Example text message', message: 'Hi Jordan, we’ve passed your viewing request for 18 Example Street to the agent. You requested Saturday afternoon. The agent will contact you to confirm a time.' },
      { title: 'Notify the listing agent', text: 'Send a concise summary and a clear follow-up task.', type: 'Agent handoff', detail: [['Task', 'Arrange a viewing'], ['Buyer preference', 'Saturday afternoon'], ['Interest', 'Three-bedroom home'], ['Next step', 'Text Jordan with an available time']] }
    ],
    handoff: 'Offers, negotiations and questions requiring the agent’s judgement go directly to your team.',
    capabilities: ['Capture property enquiries', 'Collect viewing preferences', 'Route messages to the right agent']
  },
  {
    slug: 'automotive', name: 'Automotive', short: 'Automotive', icon: 'car',
    role: 'AI service receptionist', title: 'Keep your workshop moving. And your calls answered.',
    description: 'Let an AI employee handle routine service enquiries, collect vehicle details and help your team organise the diary.',
    card: 'Collect vehicle details. Help fill the service diary.',
    scenario: 'A driver calls to arrange a routine vehicle service.',
    result: 'A service request ready for the workshop.', audioUrl: null,
    conversation: [
      ['AI service receptionist', 'Thanks for calling the workshop. I’m the AI service receptionist. How can I help?'],
      ['Caller', 'I need to book a routine service for my car.'],
      ['AI service receptionist', 'I can take the details for the team. What is your name, and what vehicle do you have?'],
      ['Caller', 'Casey Morgan. It’s a 2019 Toyota Corolla, registration DEMO19.'],
      ['AI service receptionist', 'Thank you. What day would suit, and can the team text this number with a time?'],
      ['Caller', 'Friday morning, please. And yes, text is good.'],
      ['AI service receptionist', 'I’ll send your routine service request to the workshop. They’ll confirm availability and any service details with you.']
    ],
    steps: [
      { title: 'Create the service request', text: 'Record the vehicle and requested day in your connected workshop system.', type: 'Service request', detail: [['Customer', 'Casey Morgan'], ['Vehicle', '2019 Toyota Corolla'], ['Registration', 'DEMO19'], ['Preference', 'Friday morning']] },
      { title: 'Acknowledge the enquiry', text: 'Give the driver a clear expectation of what comes next.', type: 'Example text message', message: 'Hi Casey, we’ve received your routine service request for Friday morning. The workshop will confirm a time and the service details with you.' },
      { title: 'Notify the service team', text: 'Put the useful details in front of the person managing the diary.', type: 'Workshop handoff', detail: [['Task', 'Confirm service availability'], ['Service', 'Routine vehicle service'], ['Contact', 'Text the caller’s number'], ['Next step', 'Confirm time and service details']] }
    ],
    handoff: 'Mechanical diagnosis, repair quotes and unusual requests go to your service team. Your AI employee sticks to the information and booking rules you approve.',
    capabilities: ['Capture service enquiries', 'Collect vehicle information', 'Arrange callbacks and bookings']
  },
  {
    slug: 'hospitality', name: 'Hospitality', short: 'Hospitality', icon: 'dining',
    role: 'AI reservations assistant', title: 'Look after the guests calling in, too.',
    description: 'Help callers with reservations and everyday questions while your team looks after guests. Connect your booking system to check real availability.',
    card: 'Check availability. Book a table. Keep your team informed.',
    scenario: 'A guest calls to reserve a table for four. In this example, the AI can access the restaurant’s booking system.',
    result: 'A reservation with a confirmation and a team note.', audioUrl: null,
    conversation: [
      ['AI reservations assistant', 'Thanks for calling. I’m the AI reservations assistant. How can I help?'],
      ['Caller', 'Could I book a table for four this Saturday at 7 pm?'],
      ['AI reservations assistant', 'I’ve checked the booking diary. There’s a table available at 7 pm. What name should I book it under?'],
      ['Caller', 'Riley Chen. Could we have a quiet table if possible?'],
      ['AI reservations assistant', 'I’ll note that preference for the team. May I send the confirmation to the number you’re calling from?'],
      ['Caller', 'Yes, please.'],
      ['AI reservations assistant', 'Your table for four is booked for Saturday at 7 pm. I’ll text the details. The team will do their best with your table preference.']
    ],
    steps: [
      { title: 'Share the reservation details', text: 'Make the booking completed during the call available to your team in the connected booking system.', type: 'Example reservation', detail: [['Guest', 'Riley Chen'], ['Party size', '4 people'], ['Time', 'Saturday · 7:00 pm'], ['Preference', 'Quiet table, if available']] },
      { title: 'Send the confirmation', text: 'Send the agreed reservation details to the guest.', type: 'Example text message', message: 'Hi Riley, your table for 4 is confirmed for Saturday at 7:00 pm. We’ve noted your preference for a quiet table, subject to availability. We look forward to seeing you.' },
      { title: 'Keep the floor team informed', text: 'Include the guest’s preference with the reservation for your team to review.', type: 'Team note', detail: [['Reservation', 'Riley Chen · 4 guests'], ['Guest request', 'Quiet table if possible'], ['Next step', 'Review table allocation'], ['Reminder', 'Seating preference is not guaranteed']] }
    ],
    handoff: 'Large events, unusual requests and anything needing manager approval go to your team. The assistant confirms reservations only when connected availability allows it.',
    capabilities: ['Handle table reservations', 'Share approved opening hours', 'Record guest requests']
  },
  {
    slug: 'professional-services', name: 'Professional services', short: 'Professional services', icon: 'briefcase',
    role: 'AI client intake assistant', title: 'Turn the first enquiry into a clear next step.',
    description: 'Give new callers a helpful welcome. Your AI employee collects the reason for the enquiry and helps arrange an introduction with your team.',
    card: 'Welcome new enquiries. Prepare your team for the call.',
    scenario: 'A small-business owner calls an accounting firm to request an introductory conversation.',
    result: 'A new enquiry with context for a useful first conversation.', audioUrl: null,
    conversation: [
      ['AI client intake assistant', 'Hello, I’m the AI client intake assistant. What would you like to speak to the team about?'],
      ['Caller', 'I run a small design studio and want to talk about bookkeeping support.'],
      ['AI client intake assistant', 'I can help arrange an introductory conversation. What is your name and business name?'],
      ['Caller', 'Taylor Brooks, from Example Studio.'],
      ['AI client intake assistant', 'When would a callback suit, and may the team use this number?'],
      ['Caller', 'Tuesday afternoon would be ideal. This number is fine.'],
      ['AI client intake assistant', 'I’ll pass your bookkeeping enquiry and callback preference to the team. They’ll contact you to arrange the conversation.']
    ],
    steps: [
      { title: 'Create the client enquiry', text: 'Save the business name, reason for calling and contact preference.', type: 'New enquiry', detail: [['Contact', 'Taylor Brooks'], ['Business', 'Example Studio'], ['Interested in', 'Bookkeeping support'], ['Callback preference', 'Tuesday afternoon']] },
      { title: 'Prepare a useful summary', text: 'Give your team context before they call the prospective client.', type: 'Example enquiry summary', message: 'Taylor Brooks runs a small design studio and is enquiring about bookkeeping support. They would prefer a callback on Tuesday afternoon, using the number they called from. A conversation has not yet been scheduled.' },
      { title: 'Assign the follow-up', text: 'Create a callback task for the person responsible for new enquiries.', type: 'Team handoff', detail: [['Task', 'Arrange an introductory conversation'], ['Topic', 'Bookkeeping support'], ['Contact', 'Call the supplied number'], ['Next step', 'Confirm a suitable callback time']] }
    ],
    handoff: 'Financial, legal or other professional advice stays with your qualified team. The assistant gathers enquiry details and arranges the next conversation.',
    capabilities: ['Welcome new client enquiries', 'Collect useful background details', 'Arrange consultations or callbacks']
  }
];
