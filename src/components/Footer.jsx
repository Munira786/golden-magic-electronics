import { Link } from "react-router-dom";
import { CONTACT, TRADE_LICENSE } from "../config/site.js";
import { analyticsEnabled, openConsentSettings } from "../lib/analytics.js";
import useHydrated from "../hooks/useHydrated.js";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact & Quote" },
];

export default function Footer() {
  // Pre-rendered HTML is built ahead of time, so during hydration use the build year (identical on
  // server and client, set in vite.config.js), then the visitor's current year straight after.
  const hydrated = useHydrated();
  const year = hydrated ? new Date().getFullYear() : __BUILD_YEAR__;

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-row">
              {/* Decorative: the company name is written right next to it. */}
              <img src="/logo-sm.png" alt="" width="150" height="124" className="footer-logo" />
              <p className="footer-brand-name">Golden Magic Electronics</p>
            </div>
            <p className="footer-tagline">Your Trusted Partner in Electronics Solutions</p>
            <p className="footer-copy">
              Leading provider of integrated electronic solutions, IT infrastructure, and trading services in the
              heart of Dubai.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer-heading">Quick Links</h2>
            <ul className="footer-links">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer-heading">Contact Info</h2>
            <address className="footer-contact-list">
              <div className="footer-contact-item">
                <i className="fa-solid fa-map-pin" aria-hidden="true"></i>
                <p>{CONTACT.address}</p>
              </div>
              <div className="footer-contact-item">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
              <div className="footer-contact-item">
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <a dir="ltr" href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>
              </div>
              <div className="footer-contact-item">
                <i className="fa-solid fa-clock" aria-hidden="true"></i>
                <p>{CONTACT.hours}</p>
              </div>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Golden Magic Electronics. All rights reserved.</p>
          {TRADE_LICENSE && <p>Dubai Trade Licence No. {TRADE_LICENSE}</p>}
          <p className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            {analyticsEnabled && (
              <>
                <span aria-hidden="true">·</span>
                <button type="button" className="footer-link-button" onClick={openConsentSettings}>
                  Cookie Settings
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
