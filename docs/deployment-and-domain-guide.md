# Cloudflare Deployment & Custom Domain Guide for QuikTalk AI

This guide documents the production deployment architecture, build configuration, and custom domain connection for **QuikTalk AI** (`quiktalkai.com`) hosted on **Cloudflare Pages**.

---

## 1. Hosting Architecture Overview

QuikTalk AI is architected as an ultra-high performance, zero-dependency static site.

* **Target Platform:** Cloudflare Pages
* **Edge Network:** Cloudflare Global Anycast Edge (275+ cities)
* **Build Command:** `npm run build`
* **Build Output Directory:** `dist`
* **Static Assets:** Cached immutably at the edge for 1 year (`Cache-Control: public, max-age=31536000, immutable`)
* **HTML Documents:** Revalidated automatically (`Cache-Control: public, max-age=0, must-revalidate`)
* **Security Layer:** HTTP Strict Transport Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Permissions-Policy

---

## 2. Cloudflare Pages Setup

### Method A: Connect via GitHub (Recommended for Automated CI/CD)

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** &gt; **Create application** &gt; **Pages** &gt; **Connect to Git**.
3. Select the repository: `neerajgouda06/quiktalkai`.
4. Configure the build settings:
   * **Project name:** `quiktalkai`
   * **Production branch:** `main`
   * **Framework preset:** `None`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
5. In **Environment variables (Advanced)**, add:
   * `NODE_VERSION` = `20`
   * `SITE_URL` = `https://www.quiktalkai.com`
   * `BOOKING_URL` = `https://www.quiktalkai.com/#demo`
6. Click **Save and Deploy**. Cloudflare Pages will execute `npm run build` and publish the site.

---

### Method B: Deploy via Wrangler CLI

If deploying directly from the command line:

```bash
# 1. Authenticate with your Cloudflare account
npx wrangler login

# 2. Build the production site and verify all assertions pass
npm run validate

# 3. Deploy to Cloudflare Pages
npm run deploy
```

---

## 3. Custom Domain & DNS Configuration for `quiktalkai.com`

### Existing DNS State Analysis

Before applying changes, an authoritative DNS audit was conducted on `quiktalkai.com` via Cloudflare DNS (`1.1.1.1`):

| Record Type | Host | Current Target / Value | Purpose | Action Required |
| :--- | :--- | :--- | :--- | :--- |
| **NS** | `@` | `artemis.dns-parking.com`<br>`hermes.dns-parking.com` | Hostinger Nameservers | Retain or migrate to Cloudflare NS |
| **MX (Priority 5)** | `@` | `mx1.hostinger.com` | Primary Business Email (`admin@quiktalkai.com`) | **CRITICAL: PRESERVE UNCHANGED** |
| **MX (Priority 10)**| `@` | `mx2.hostinger.com` | Backup Business Email | **CRITICAL: PRESERVE UNCHANGED** |
| **TXT (SPF)** | `@` | `v=spf1 include:_spf.mail.hostinger.com ~all` | Email Deliverability & Anti-Spoofing | **CRITICAL: PRESERVE UNCHANGED** |
| **TXT (DMARC)** | `_dmarc` | `v=DMARC1; p=none` | Domain Email Policy | **CRITICAL: PRESERVE UNCHANGED** |
| **TXT** | `@` | `google-site-verification=nTykP195BQiK2ItmCqFRrq87l0YfKIq8UEIXsUhiyZw` | Google Search Console Ownership | **CRITICAL: PRESERVE UNCHANGED** |
| **CNAME** | `www` | `quicktalk-ai.onrender.com` | Old Render Web Service | **REPLACE with Cloudflare Pages** |
| **A** | `@` | `216.24.57.1` | Old Render Static IP | **UPDATE to Cloudflare** |

> [!CAUTION]
> **DO NOT delete or modify MX or SPF records.** Doing so will immediately break incoming and outgoing email for `admin@quiktalkai.com`.

---

### Connection Option 1: Keeping DNS Managed on Hostinger (Fastest, Zero Risk to Mail)

If you keep your nameservers at Hostinger:

1. In the **Cloudflare Pages Dashboard**, go to **quiktalkai** &gt; **Custom domains** &gt; **Set up a custom domain**.
2. Enter `www.quiktalkai.com` and follow the prompt. Cloudflare will provide a CNAME target: `quiktalkai.pages.dev`.
3. In your **Hostinger DNS Zone Editor**:
   * Locate the existing CNAME record for `www` (currently pointing to `quicktalk-ai.onrender.com`).
   * Change the CNAME record value to: `quiktalkai.pages.dev`.
   * Set TTL to `Auto` or `300 seconds`.
4. For the apex domain `quiktalkai.com`:
   * In Hostinger Dashboard &gt; **Domains** &gt; **Redirects**, create an HTTP 301 redirect from `quiktalkai.com` to `https://www.quiktalkai.com`.
   * Alternatively, in Cloudflare Pages Custom Domains, add `quiktalkai.com` and configure the verification TXT/CNAME records provided by Cloudflare.

---

### Connection Option 2: Full Cloudflare DNS Management (Maximum Performance & Security)

If you prefer Cloudflare to manage your entire DNS zone:

1. In the Cloudflare Dashboard, click **Add a site** and enter `quiktalkai.com`.
2. Select the **Free** plan.
3. Cloudflare will scan existing DNS records. **Verify that the following records are imported exactly**:
   * `MX` (5) &rarr; `mx1.hostinger.com`
   * `MX` (10) &rarr; `mx2.hostinger.com`
   * `TXT` &rarr; `v=spf1 include:_spf.mail.hostinger.com ~all`
   * `TXT` (`_dmarc`) &rarr; `v=DMARC1; p=none`
   * `TXT` &rarr; `google-site-verification=nTykP195BQiK2ItmCqFRrq87l0YfKIq8UEIXsUhiyZw`
4. Set Web DNS Records:
   * **CNAME** `www` &rarr; `quiktalkai.pages.dev` (Proxy status: **Proxied** / Orange cloud)
   * **CNAME** `@` &rarr; `quiktalkai.pages.dev` (Proxy status: **Proxied** / Orange cloud via CNAME flattening)
5. Under **SSL/TLS Settings**:
   * Encryption mode: **Full (strict)**
   * **Always Use HTTPS**: Enabled
   * **Automatic HTTPS Rewrites**: Enabled
   * **Minimum TLS Version**: TLS 1.2 (TLS 1.3 enabled)
   * **Brotli**: Enabled
6. Update your registrar nameservers to the two Cloudflare nameservers assigned (e.g. `*.ns.cloudflare.com`).

---

## 4. Verification Checklist

After deployment and DNS propagation (typically 2 to 15 minutes):

- [ ] Check HTTPS response: `curl -I https://www.quiktalkai.com`
- [ ] Confirm HSTS, nosniff, and CSP headers are present in response.
- [ ] Confirm 404 handler: visit `https://www.quiktalkai.com/test-404-page` and verify the branded QuikTalk 404 renders.
- [ ] Test booking audio demo on home page (`Play call` and `Watch silently` toggle).
- [ ] Check all 4 service pages and 6 industry pages.
- [ ] Test enquiry destination: verify `Let's talk` buttons open booking URL and `mailto:admin@quiktalkai.com` opens email client.
- [ ] Send a test email to `admin@quiktalkai.com` to verify mail reception remains 100% unaffected.
