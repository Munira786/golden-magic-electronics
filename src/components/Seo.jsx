import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeadContext, pageHead } from "../lib/head.js";

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
  if (!href) {
    el?.remove();
    return;
  }
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
 *
 * Pre-rendered pages already contain these tags (scripts/prerender.js); in the browser this keeps
 * them correct as the visitor navigates between pages.
 */
export default function Seo({ title, description, image, noindex = false }) {
  const { pathname } = useLocation();
  const head = pageHead({ pathname, title, description, image, noindex });

  // While pre-rendering there is no document and effects do not run: hand the tags to the script.
  const collector = useContext(HeadContext);
  collector?.set(head);

  useEffect(() => {
    if (head.title) document.title = head.title;
    setMeta("description", head.description);
    setMeta("robots", head.noindex ? "noindex" : null);
    setCanonical(head.canonical);
    setMeta("og:title", head.title, "property");
    setMeta("og:description", head.description, "property");
    setMeta("og:url", head.ogUrl, "property");
    setMeta("og:image", head.image, "property");
    setMeta("twitter:title", head.title);
    setMeta("twitter:description", head.description);
    setMeta("twitter:image", head.image);
  }, [head.title, head.description, head.noindex, head.canonical, head.ogUrl, head.image]);

  return null;
}
