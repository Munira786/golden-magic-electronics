export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-row">
              <img src="/logo.png" alt="GME logo" className="footer-logo" />
              <h4 className="footer-brand-name">Golden Magic Electronics</h4>
            </div>
            <p className="footer-tagline">Your Trusted Partner in Electronics Solutions</p>
            <p className="footer-copy">
              Leading provider of integrated electronic solutions, IT infrastructure, and trading services in the
              heart of Dubai.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Contact Info</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <i className="fa-solid fa-map-pin" aria-hidden="true"></i>
                <p>Shop No.6, Behind ALTAJ Studio, Deira, Dubai</p>
              </div>
              <div className="footer-contact-item">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                <a href="mailto:gme786@gmail.com">gme786@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <a dir="ltr" href="tel:+971557557786">+971 55 755 7786</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Golden Magic Electronics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
