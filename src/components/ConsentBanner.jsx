import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OPEN_CONSENT_EVENT, analyticsEnabled, getConsent, setConsent } from "../lib/analytics.js";
import useHydrated from "../hooks/useHydrated.js";

// Asks once for analytics consent. Google Analytics is not loaded until the visitor clicks Accept.
// Re-opened from "Cookie Settings" in the footer or the Privacy Policy.
export default function ConsentBanner() {
  // The saved choice lives in localStorage, which does not exist when pages are pre-rendered, so the
  // banner is never part of the pre-rendered HTML; it appears right after hydration if needed.
  const hydrated = useHydrated();
  const [answered, setAnswered] = useState(false);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return undefined;
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const open = analyticsEnabled && hydrated && (reopened || (!answered && !getConsent()));

  // Lets other fixed elements (the WhatsApp button) move out of the banner's way.
  useEffect(() => {
    document.body.classList.toggle("consent-open", open);
    return () => document.body.classList.remove("consent-open");
  }, [open]);

  if (!open) return null;

  function choose(value) {
    setConsent(value);
    setAnswered(true);
    setReopened(false);
  }

  return (
    <section className="consent-banner" role="region" aria-label="Cookie consent">
      <p>
        We&apos;d like to use Google Analytics cookies to understand how visitors use our site, so we can improve
        it. Nothing is tracked unless you accept. <Link to="/privacy">Privacy Policy</Link>
      </p>
      <div className="consent-actions">
        <button type="button" className="btn btn-outline btn-sm" onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </section>
  );
}
