import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_OG_IMAGE, SITE_URL } from "../config/site.js";

function setMeta(name, content, attr = "name") {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-page SEO tags. Each page tells search engines its own URL (canonical), so /about is not
 * treated as a duplicate of the home page. Pass noindex for pages that should not be indexed (404).
 */
export default function Seo({ title, description, image = DEFAULT_OG_IMAGE, noindex = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Strip a trailing slash (except for "/") so /about and /about/ share one canonical URL.
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    if (title) document.title = title;
    setMeta("description", description);
    setMeta("robots", noindex ? "noindex" : null);

    if (noindex) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    } else {
      setCanonical(url);
    }

    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", url, "property");
    setMeta("og:image", image, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }, [pathname, title, description, image, noindex]);

  return null;
}
