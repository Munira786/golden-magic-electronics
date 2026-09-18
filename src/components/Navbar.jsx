import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

function navClass({ isActive }) {
  return `nav-link${isActive ? " active" : ""}`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NavLink to="/" className="brand" aria-label="Home">
          <img src="/logo.png" alt="Golden Magic Electronics Logo" className="brand-logo" />
          <div className="brand-text">
            <p className="brand-name">Golden Magic Electronics</p>
            <p className="brand-tagline">Your Trusted Partner</p>
          </div>
        </NavLink>

        <nav className="desktop-nav" aria-label="Main Navigation">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="desktop-actions">
          <NavLink to="/contact" className="btn btn-primary btn-sm">
            Get a Quote
          </NavLink>
        </div>

        <button
          className="mobile-menu-btn"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <i className="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
      </div>

      <div className={`mobile-drawer${open ? " is-open" : ""}`} aria-modal="true">
        <div className="mobile-drawer-overlay" onClick={() => setOpen(false)}></div>
        <div className="mobile-drawer-panel">
          <div className="mobile-drawer-header">
            <p className="brand-name">Menu</p>
            <button className="mobile-drawer-close" aria-label="Close menu" onClick={() => setOpen(false)}>
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
          <nav className="mobile-nav" aria-label="Mobile Navigation">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={navClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-drawer-footer">
            <NavLink to="/contact" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
              Get a Quote
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
