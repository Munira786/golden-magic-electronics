import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

// Must match the desktop breakpoint in css/layout/header.css, where the drawer is display: none.
const DESKTOP_QUERY = "(min-width: 1024px)";

function navClass({ isActive }) {
  return `nav-link${isActive ? " active" : ""}`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  function closeMenu() {
    setOpen(false);
    menuButtonRef.current?.focus(); // return focus to where the user opened the menu
  }

  // Close on any page change, including the browser Back/Forward buttons. Without this, going Back
  // with the menu open left it "open" and the page scroll-locked.
  // Done during render (React's "adjust state when a prop changes" pattern) rather than in an
  // effect, which would render the new page once with the menu still open and then again closed.
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  // Lock page scroll behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // At desktop width the drawer is hidden by CSS, so close it or the scroll lock would stay on.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // While open: move focus into the drawer, close on Escape, and keep Tab / Shift+Tab inside it
  // (a modal dialog must not let keyboard focus wander to the page hidden behind it).
  useEffect(() => {
    if (!open) return undefined;
    closeButtonRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!panelRef.current.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <NavLink to="/" className="brand" aria-label="Home">
          <img src="/logo-sm.png" alt="Golden Magic Electronics Logo" width="150" height="124" className="brand-logo" />
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
          ref={menuButtonRef}
          type="button"
          className="mobile-menu-btn"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <i className="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
      </div>

      <div className={`mobile-drawer${open ? " is-open" : ""}`}>
        <div className="mobile-drawer-overlay" aria-hidden="true" onClick={closeMenu}></div>
        <div
          ref={panelRef}
          id="mobile-menu"
          className="mobile-drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="mobile-drawer-header">
            <p id="mobile-menu-title" className="brand-name">Menu</p>
            <button
              ref={closeButtonRef}
              type="button"
              className="mobile-drawer-close"
              aria-label="Close menu"
              onClick={closeMenu}
            >
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
                // Also closes when the link is the current page (no route change to trigger the effect).
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
