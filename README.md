# QuikTalk AI — AI workforce website

A dependency-free marketing website for AI employees and connected agentic systems. The deployable website is in `dist/`; there is no build step.

## Preview

Serve `dist/` with any static HTTP server. For example:

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

## Source

- `dist/index.html`: semantic page content, SEO metadata and native employee dialog.
- `dist/styles.css`: shared design tokens, physical glass surfaces, section layouts and responsive breakpoints.
- `dist/app.js`: shared SVG icon renderer, mobile menu, role details, workflow simulation, industry selector and motion preferences.
- `dist/robots.txt`, `dist/sitemap.xml`, `dist/_headers`: indexing and static-host headers.
- `.openai/hosting.json`: private Sites project identity and static output directory.

## Design references

The [provided Figma](https://www.figma.com/design/ID9t5ltpOi0MjLIi598txg/Untitled?node-id=28-127) was inspected in the editor and prototype. Its light `#F7F7F7` canvas, green `#229118` / `#82C87C` swatches, bold dark sans-serif type, split hero, wide glass pill navigation and reflective cards informed this implementation. The supplied square and pill images informed the layered silver rims and internal highlights; the checkerboard reference is not embedded as a background.

Glass is made from separately controlled surface tint, rim, inset highlight, reflection and shadow layers. The workforce console and interaction panels carry most of the material treatment; prose and role cards are calmer. Lighter green text was darkened where necessary for contrast.

The [existing QuikTalk website](https://www.quiktalkai.com/) supplied the Auckland/NZ/AU business context, industry workflows, named integration examples and contact destinations. AI employee / agentic system positioning comes from the new brief. No customer logos, testimonials, outcome statistics or performance guarantees have been invented.

## Functional scope

Six employee-role detail dialogs; a six-stage, pausable workflow demonstration; six keyboard-operable industry tabs; native FAQ disclosures; mobile navigation; source-visible content and working anchor links.

The workflow is illustrative and does not connect to business systems. Named integration feasibility is confirmed during discovery. The conversion CTA opens the established QuikTalk enquiry page at `https://www.quiktalkai.com/#demo`; email links use the verified `admin@quiktalkai.com` address. This site has no new lead database or submission endpoint. No enquiry was sent during testing.

## Validation

See `docs/qa.md` for the scope and limitations of the checks performed. Source review does not constitute accessibility conformance certification. Private publication does not replace the existing public company website or change its domain.
