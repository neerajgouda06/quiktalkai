// Legal pages: Privacy Policy and Terms of Service adhering to NZ Privacy Act 2020 & Australian Privacy Principles (APP)

export function privacyPolicyBody({ icon }) {
  const arrow = icon('arrow');
  return `
  <div class="container legal-page" style="max-width: 860px; margin: 4rem auto 6rem; padding: 0 1.5rem;">
    <nav class="breadcrumb" aria-label="Breadcrumb" style="margin-bottom: 2rem;">
      <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Privacy Policy</span>
    </nav>
    <div style="margin-bottom: 3rem;">
      <span class="eyebrow">${icon('shield')} DATA INTEGRITY &amp; COMPLIANCE</span>
      <h1 style="font-size: clamp(2.2rem, 4vw, 3.5rem); margin: 0.75rem 0 1rem; line-height: 1.15;">Privacy Policy</h1>
      <p style="color: var(--color-muted, #94a3b8); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.1em;">Last Updated: October 2026 · Compliant with NZ Privacy Act 2020 &amp; Australian Privacy Principles (APP)</p>
    </div>

    <div class="legal-content" style="line-height: 1.8; color: #cbd5e1; font-size: 1.05rem;">
      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">1. Overview &amp; Commitment</h2>
        <p>QuikTalk AI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) provides AI voice receptionist and customer workflow automation solutions for businesses across New Zealand, Australia, and internationally. We are dedicated to protecting the privacy, confidentiality, and security of all personal information entrusted to us by our clients and their callers.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">2. Information We Collect</h2>
        <p>Depending on how you interact with our services and the specific setup chosen by your business, we may collect and process:</p>
        <ul style="padding-left: 1.5rem; margin-top: 0.75rem;">
          <li><strong>Caller Information:</strong> Name, phone number, enquiry details, service requirements, and appointment preferences communicated during phone interactions.</li>
          <li><strong>Audio &amp; Call Records:</strong> Call recordings and transcriptions where expressly authorized and consented to in accordance with applicable regional laws.</li>
          <li><strong>Business Contact Information:</strong> Name, work email address (such as enquiries to admin@quiktalkai.com), company details, and billing information for our clients.</li>
          <li><strong>Technical Metadata:</strong> Anonymized network logs, request timestamps, and performance telemetry to guarantee uptime and security.</li>
        </ul>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">3. Purpose of Collection &amp; Use</h2>
        <p>Personal data is collected strictly for legitimate business purposes:</p>
        <ul style="padding-left: 1.5rem; margin-top: 0.75rem;">
          <li>Delivering, operating, and improving AI phone reception and voice assistant services.</li>
          <li>Routing qualified leads, appointment bookings, and urgent messages to our clients&rsquo; designated staff and connected software (e.g. CRMs, calendars).</li>
          <li>Providing prompt support, addressing billing inquiries, and fulfilling contractual obligations.</li>
        </ul>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">4. Disclosure &amp; Data Sovereignty</h2>
        <p>We do not sell, rent, or trade personal data to third parties. Information is only disclosed to:</p>
        <ul style="padding-left: 1.5rem; margin-top: 0.75rem;">
          <li>The client business on whose behalf the call was handled.</li>
          <li>Vetted infrastructure sub-processors (such as telecom carriers and secure cloud providers) strictly necessary to run the service under confidentiality terms.</li>
          <li>Law enforcement or regulatory authorities where required by applicable New Zealand or Australian law.</li>
        </ul>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">5. Security &amp; Retention</h2>
        <p>We apply defense-in-depth security measures including TLS encryption in transit, encrypted storage at rest, restricted role-based access, and automated retention cleanup. Data is retained only for the minimum period agreed upon with our business clients.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">6. Your Rights &amp; Contact Information</h2>
        <p>Under the NZ Privacy Act 2020 and Australian Privacy Principles, you have the right to request access to and correction of your personal information held by us. For any privacy-related requests or questions, please contact our Privacy Officer:</p>
        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); padding: 1.25rem 1.5rem; border-radius: 8px; margin-top: 1rem;">
          <strong>QuikTalk AI Privacy Officer</strong><br>
          Auckland, New Zealand<br>
          Email: <a href="mailto:admin@quiktalkai.com" style="color: var(--color-green, #4ade80);">admin@quiktalkai.com</a>
        </div>
      </section>
    </div>
  </div>`;
}

export function termsBody({ icon }) {
  const arrow = icon('arrow');
  return `
  <div class="container legal-page" style="max-width: 860px; margin: 4rem auto 6rem; padding: 0 1.5rem;">
    <nav class="breadcrumb" aria-label="Breadcrumb" style="margin-bottom: 2rem;">
      <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Terms of Service</span>
    </nav>
    <div style="margin-bottom: 3rem;">
      <span class="eyebrow">${icon('shield')} SERVICE TERMS &amp; CONDITIONS</span>
      <h1 style="font-size: clamp(2.2rem, 4vw, 3.5rem); margin: 0.75rem 0 1rem; line-height: 1.15;">Terms of Service</h1>
      <p style="color: var(--color-muted, #94a3b8); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.1em;">Last Updated: October 2026 · Governing New Zealand &amp; Australian Jurisdictions</p>
    </div>

    <div class="legal-content" style="line-height: 1.8; color: #cbd5e1; font-size: 1.05rem;">
      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">1. Acceptance of Terms</h2>
        <p>By accessing the QuikTalk AI website (quiktalkai.com), exploring our interactive demonstrations, or engaging our services, you agree to be bound by these Terms of Service and all applicable regional laws. If you do not agree with any part of these terms, please discontinue use immediately.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">2. Nature of Service &amp; Demonstrations</h2>
        <p>QuikTalk AI designs, builds, and deploys customized AI voice agents, phone receptionists, and workflow automations. Please note:</p>
        <ul style="padding-left: 1.5rem; margin-top: 0.75rem;">
          <li>All sample calls and transcripts on this website represent fictional scenarios and illustrative workflows created for demonstration purposes.</li>
          <li>Live capabilities, connected CRM actions, and calendar integrations are configured according to each client&rsquo;s individual, signed Statement of Work.</li>
          <li>AI voice assistants do not provide emergency services (e.g. 111 / 000 / 911) and are not intended as replacements for licensed professional medical or legal practitioners.</li>
        </ul>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">3. Client Responsibilities &amp; Acceptable Use</h2>
        <p>Clients utilizing QuikTalk AI voice agents agree to:</p>
        <ul style="padding-left: 1.5rem; margin-top: 0.75rem;">
          <li>Ensure callers are made aware they are speaking with an automated AI assistant.</li>
          <li>Comply with telecommunications, marketing, and recording consent regulations within their jurisdiction.</li>
          <li>Maintain human escalation procedures for emergency, high-risk, or sensitive matters.</li>
        </ul>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">4. Intellectual Property</h2>
        <p>All brand marks, visual materials, audio demonstrations, and proprietary workflow architectures appearing on this website are the property of QuikTalk AI or its licensors and are protected under copyright and trademark law.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">5. Limitation of Liability</h2>
        <p>To the maximum extent permitted by New Zealand and Australian Consumer Guarantees, QuikTalk AI shall not be liable for indirect, incidental, or consequential damages resulting from telecom carrier outages, client third-party CRM API disruptions, or unauthorized access beyond our reasonable security controls.</p>
      </section>

      <section style="margin-bottom: 2.5rem;">
        <h2 style="color: #fff; font-size: 1.4rem; margin-bottom: 1rem;">6. Governing Law &amp; Inquiries</h2>
        <p>These terms are governed by the laws of New Zealand. For questions regarding these terms, please contact:</p>
        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); padding: 1.25rem 1.5rem; border-radius: 8px; margin-top: 1rem;">
          <strong>QuikTalk AI Operations</strong><br>
          Auckland, New Zealand<br>
          Email: <a href="mailto:admin@quiktalkai.com" style="color: var(--color-green, #4ade80);">admin@quiktalkai.com</a>
        </div>
      </section>
    </div>
  </div>`;
}
