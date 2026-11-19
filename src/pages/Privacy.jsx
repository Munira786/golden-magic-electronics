import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { CONTACT } from "../config/site.js";
import { analyticsEnabled, openConsentSettings } from "../lib/analytics.js";

// NOTE for maintainers: this policy describes what the site's code actually does today
// (Netlify Forms, Google Maps embed, Google Fonts, cdnjs, WhatsApp links, GA4 after consent).
// Update it whenever a new third-party service is added. Have it reviewed by a legal adviser
// before launch, and fill in the retention period with the business owner.
const LAST_UPDATED = "19 November 2026";

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Golden Magic Electronics"
        description="How Golden Magic Electronics collects, uses, and protects personal data submitted through this website."
      />
      <div className="page-content simple-page legal-page">
        <p className="section-label">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: {LAST_UPDATED}</p>

        <section>
          <h2>Who we are</h2>
          <p>
            This website is operated by Golden Magic Electronics, {CONTACT.address} (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
            We handle personal data in line with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of
            Personal Data. For any privacy question, email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </section>

        <section>
          <h2>What we collect and why</h2>
          <ul>
            <li>
              <strong>Quote and contact form:</strong> your name, company, email address, phone number, the service
              you need, project location, and your message. We use this only to respond to your enquiry, prepare
              quotations, and deliver the services you ask for.
            </li>
            <li>
              <strong>Phone, email, and WhatsApp:</strong> if you contact us directly, we receive the details you
              share. WhatsApp conversations are also subject to WhatsApp&apos;s own privacy policy.
            </li>
            <li>
              <strong>Website analytics (only with your consent):</strong>{" "}
              {analyticsEnabled ? (
                <>
                  if you accept analytics cookies, we use Google Analytics 4 to understand which pages are visited
                  and how visitors contact us. It uses cookies and records information such as pages viewed, device
                  and browser type, and approximate location. It does not store your IP address. If you decline,
                  Google Analytics is not loaded.
                </>
              ) : (
                <>we do not currently use analytics on this website.</>
              )}
            </li>
          </ul>
          <p>We do not sell your personal data, and we do not use it for automated decision-making.</p>
        </section>

        <section>
          <h2>Service providers that receive data</h2>
          <ul>
            <li><strong>Netlify</strong> hosts this website and receives form submissions on our behalf.</li>
            <li>
              <strong>Google</strong> provides the map on our Contact page and the website fonts{analyticsEnabled ? ", and Google Analytics if you consent" : ""}.
              Loading the map may allow Google to set its own cookies.
            </li>
            <li><strong>Cloudflare (cdnjs)</strong> delivers the icon set used on the site.</li>
          </ul>
          <p>
            These providers may process data outside the UAE. They receive only what is needed to provide their
            service, such as your IP address when your browser loads their files.
          </p>
        </section>

        <section>
          <h2>How long we keep it</h2>
          <p>
            We keep enquiry details only as long as needed to respond to you, carry out any resulting work, and meet
            our legal and accounting obligations. After that, we delete them.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            You can ask us to access, correct, or delete your personal data, or object to how we use it. Email{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will respond within a reasonable time.
          </p>
          {analyticsEnabled && (
            <p>
              You can change your analytics choice at any time:{" "}
              <button type="button" className="inline-link-button" onClick={openConsentSettings}>
                open cookie settings
              </button>
              .
            </p>
          )}
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            We may update this policy when our website or services change. The date at the top shows when it was
            last updated. Questions? <Link to="/contact">Contact us</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
