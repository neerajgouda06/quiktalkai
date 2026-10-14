# QuikTalk AI — Voice Agents and AI Employees

A dependency-free, high-performance static marketing and customer experience platform with a voice-first home page, four dedicated service pages, six interactive industry demo pages, custom 404 error handling, and privacy/terms compliance.

Designed for edge hosting on **Cloudflare Pages** and serving **https://www.quiktalkai.com**.

---

## Production Scripts

```bash
npm run build      # Generates all HTML pages, 404, sitemap.xml, robots.txt, and legal pages
npm test           # Runs 900+ automated production audits (links, assets, SEO, headers, JSON-LD)
npm run validate   # Builds and executes the complete test audit suite
npm run preview    # Serves the local site at http://127.0.0.1:4173/ (or npm start / npm run dev)
npm run deploy     # Deploys directly to Cloudflare Pages via Wrangler CLI
```

---

## Architecture & Codebase Organization

* `src/`: Modular template generators and content specifications.
  * `content.mjs`: Six illustrative industry scenarios, AI employee roles, dialogue transcripts, and after-call actions.
  * `booking-demo.mjs`, `booking-call.json`: Synchronized homepage booking demo component and audio timeline.
  * `ai-employees.mjs`: AI Employees service page definition, role architecture, and Schema.org metadata.
  * `ai-infrastructure.mjs`: AI Infrastructure service page, ecosystem architecture, and technical explanations.
  * `ai-workflows.mjs`, `web-development.mjs`: Workflow automation and web development service pages.
  * `legal.mjs`: Privacy Policy (NZ Privacy Act 2020 / APP compliant) and Terms of Service.
  * `services.mjs`, `comparison.mjs`, `enterprise-features.mjs`, `enterprise-security.mjs`: Homepage modular sections.
* `dist/`: Production build output and static assets.
  * `_headers`: Strict edge security headers (CSP, HSTS, X-Frame-Options, nosniff) and immutable asset caching.
  * `_redirects`: URL normalization rules and clean route handling for Cloudflare Pages.
  * `assets/`: WebP imagery, SVG icons, self-hosted WOFF2 Inter fonts, audio demo WAV, and MP4 atmosphere video.
  * `styles.css`, `reference.css`, `motion.css`: Visual styling, glass surfaces, layout tokens, and responsive design.
  * `motion.js`, `app.js`, `booking-demo.js`: Progressive enhancement scripts with zero runtime dependencies.
* `scripts/`:
  * `build.mjs`: Production HTML generator and sitemap/robots compiler with configurable environment origin.
  * `test-audit.mjs`: 900+ automated production assertions checking all assets, routes, schemas, and security rules.
  * `preview.mjs`: Lightweight, dependency-free local HTTP server with range request support.
* `.github/workflows/deploy.yml`: Automated CI/CD pipeline verifying builds, running tests, and deploying to Cloudflare Pages.
* `wrangler.toml`: Cloudflare Pages project configuration.
* `docs/deployment-and-domain-guide.md`: Comprehensive Cloudflare Pages setup and custom domain DNS guide.

---

## Environment Variables

Copy `.env.example` to `.env` to customize local builds:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `SITE_URL` | `https://www.quiktalkai.com` | Base canonical origin for sitemaps, OpenGraph, JSON-LD |
| `BOOKING_URL` | `https://www.quiktalkai.com/#demo` | Primary consultation / booking call to action destination |
| `PORT` | `4173` | Local HTTP preview port |

---

## Cloudflare Deployment & Custom Domain

For full deployment instructions, build settings, and DNS record preservation (including Hostinger MX business email preservation), consult:
👉 **[docs/deployment-and-domain-guide.md](docs/deployment-and-domain-guide.md)**

### Quick Summary for Cloudflare Pages:
1. **Build Command:** `npm run build`
2. **Build Output Directory:** `dist`
3. **Custom Domain:** `www.quiktalkai.com` & `quiktalkai.com`
4. **Preserve Email Records:** Keep MX records (`mx1.hostinger.com`, `mx2.hostinger.com`) and SPF TXT record intact.
