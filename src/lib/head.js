// Per-page <head> tags (title, description, canonical, Open Graph/Twitter), shared by:
// - src/components/Seo.jsx, which applies them in the browser, and
// - scripts/prerender.js, which writes them into each pre-rendered HTML file (effects do not run
//   during server rendering, so Seo hands its tags over through HeadContext instead).
import { createContext } from "react";
import { DEFAULT_OG_IMAGE, SITE_URL } from "../config/site.js";

export const HeadContext = createContext(null);

export function canonicalUrl(pathname) {
  // Strip a trailing slash (except for "/") so /about and /about/ share one canonical URL.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

/** The tags for one page. Pages that should not be indexed (404) get no canonical/og:url. */
export function pageHead({ pathname, title, description, image = DEFAULT_OG_IMAGE, noindex = false }) {
  const url = noindex ? null : canonicalUrl(pathname);
  return { title, description, image, noindex, canonical: url, ogUrl: url };
}

/** Used while pre-rendering: Seo stores the page's tags here during render. */
export function createHeadCollector() {
  let head = null;
  return {
    set(value) {
      head = value;
    },
    get() {
      return head;
    },
  };
}
