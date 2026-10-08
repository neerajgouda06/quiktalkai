# QuikTalk integration content and asset provenance

The requested eight integration groups are taken verbatim from the user's supplied brief:

1. Xero & MYOB
2. Google Calendar
3. ServiceTitan
4. Clio & LawPay
5. HubSpot CRM
6. Salesforce
7. Square & Stripe
8. n8n & Zapier

The QuikTalk site (`https://www.quiktalkai.com/`) was retrieved on 2026-10-09 after reviewed network access. All eight groups appear verbatim in its `.int-item` elements. The unmodified source is saved as `quiktalk-source.html`. Its FAQ also explicitly states day-one connections with Google Calendar, HubSpot, Xero, MYOB, Stripe, Square, Twilio, Zapier and Make. Other listed integrations are present in the integration section but their detailed capabilities should not be expanded beyond the user's brief.

## Content guidance

Use the exact heading and supporting paragraph in the user's brief. For compact card language, the brief supports these illustrative workflows:

- Xero & MYOB: Customer details → business workflow → accounting.
- Google Calendar: Find availability → book appointment → update calendar.
- ServiceTitan: Qualify the job → book service → sync details.
- Clio & LawPay: Legal practice & payments. Avoid asserting specific payment or matter actions beyond the brief without product verification.
- HubSpot CRM: Qualify caller → capture lead → update CRM.
- Salesforce: CRM. Avoid asserting additional custom object, opportunity, or automation features beyond the integration listing.
- Square & Stripe: Payments & commerce. Avoid implying card collection or charging callers without verification.
- n8n & Zapier: Business automations. Avoid promising an exact app count or unlimited actions.

## Official brand reference pages

- ServiceTitan: https://brand.servicetitan.com/core-product/logos
- ServiceTitan downloadable assets: https://assets.servicetitan.com/share/AD757DD5-C0B8-4D3E-9B7D81C871903AEC/
- MYOB archival brand links: https://developer.myob.com/program/myob-developer-logos/

Simple Icons SVGs, where downloaded, are exact recognizable brand paths maintained by Simple Icons, not generated or hand-drawn assets. Their upstream project and individual icon metadata should be credited separately from official ownership. Preserve aspect ratio; use each logo next to its brand name.

## Downloaded compact SVGs

The following nine files were downloaded unchanged from `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/{name}.svg`:

`xero.svg`, `myob.svg`, `googlecalendar.svg`, `hubspot.svg`, `salesforce.svg`, `square.svg`, `stripe.svg`, `n8n.svg`, `zapier.svg`.

They are black monochrome brand marks and retain each logo's path proportions inside the standard 24×24 canvas. Exact public source and upstream project: https://github.com/simple-icons/simple-icons

## Official first-party assets

- `servicetitan.svg`: the unchanged `st-logo` symbol extracted from ServiceTitan's own homepage sprite, wrapped in a standalone SVG with the original viewBox: https://www.servicetitan.com/static/brand-static-sprite.6073efd1.svg . Source page https://www.servicetitan.com/ . No path geometry was redrawn.
- `clio.svg`: the first (blue) official SVG in the “Official Clio logo assets” table on https://docs.developers.clio.com/guides/sso/sso-button-guidelines/ . The page embeds the complete SVG as a base64 data URI; this file is that exact decoded asset.
- `lawpay.webp`: https://www.lawpay.com/logo.webp . This is the first-party logo referenced by the Organization structured data on https://www.lawpay.com/ ; published dimensions are 481×162.
- `lawpay.svg`: a lossless standalone SVG wrapper containing the original WebP as a base64 image, with viewBox `0 0 481 162`, for consistent SVG asset URLs. This is not a vector retracing and does not change the logo.

No generated imagery or invented brand symbols were used. The source HTML and the full ServiceTitan sprite are research evidence, not files to ship with the section.
