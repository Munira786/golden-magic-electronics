import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * Runs on every route change:
 * - scrolls to the #hash target if there is one, otherwise to the top (instantly: a smooth scroll on
 *   every page change feels slow, and it is unwanted for reduced-motion users);
 * - when the page (pathname) changes, moves keyboard/screen-reader focus to <main> so the new page
 *   is announced from its start instead of focus staying on the link that was clicked (now gone).
 *   Not on the first load, and not for in-page #hash links on the same page.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousPathname = useRef(null);

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    const pageChanged = previousPathname.current !== null && previousPathname.current !== pathname;
    previousPathname.current = pathname;
    if (pageChanged) document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}
