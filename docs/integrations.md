# Connected ecosystem section

The homepage integrations section contains only the selected “One conversation. Everything connected.” panel. The earlier introduction, eight separate story cards, sidebar navigation and card scroll logic have been removed.

The panel retains the Phone call → QuikTalk AI → tools diagram, existing local logos, and subtle connection pulses. Its eight groups are Xero & MYOB, Google Calendar, ServiceTitan, Clio & LawPay, HubSpot CRM, Salesforce, Square & Stripe, and n8n & Zapier.

The section uses the existing 1200px page frame, four columns on desktop and two on mobile. The logo groups are noninteractive list items. Both `#integrations` and `#integration-ecosystem` remain valid anchors. The panel heading is the section's h2.

Markup lives in `src/integrations.mjs`; styling and motion enhancement live in `dist/integrations.css` and `dist/integrations.js`. `scripts/build.mjs` regenerates the homepage. Content remains visible without JavaScript. Animation runs only while the panel is visible and the user permits motion. The section makes no integration service requests.

Asset provenance remains in `docs/integration-assets.md`. Other homepage sections and industry pages are outside this change.
