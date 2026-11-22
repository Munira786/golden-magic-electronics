// Smoke tests: every page renders, sets its SEO tags, and passes automated accessibility checks.
import axe from "axe-core";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderApp } from "./renderApp.jsx";
import { ROUTES } from "../routes.js";
import { CONTACT } from "../config/site.js";

const SITE = "https://www.goldenmagicelectronics.com";

const PAGES = [
  { path: "/", h1: /IT Infrastructure, CCTV & Networking Solutions/i, title: /Golden Magic Electronics/ },
  { path: "/about", h1: /20\+ Years of Trusted Technology Solutions/i, title: /^About Golden Magic Electronics/ },
  { path: "/services", h1: /Technology Services Designed for UAE Businesses/i, title: /^IT, CCTV & Networking Services in Dubai/ },
  { path: "/products", h1: /High-quality electronics and networking equipment/i, title: /^Business IT & Security Products in Dubai/ },
  { path: "/contact", h1: /Reach Out to the Golden Magic Electronics Team/i, title: /^Contact Us & Request a Quote/ },
  { path: "/privacy", h1: /Privacy Policy/i, title: /^Privacy Policy/ },
];

function canonical() {
  return document.head.querySelector('link[rel="canonical"]')?.getAttribute("href");
}

describe.each(PAGES)("page $path", ({ path, h1, title }) => {
  it("renders its heading, title, description and canonical URL", () => {
    renderApp(path);
    expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeInTheDocument();
    expect(document.title).toMatch(title);
    expect(document.head.querySelector('meta[name="description"]')?.content.length).toBeGreaterThan(50);
    expect(canonical()).toBe(path === "/" ? `${SITE}/` : `${SITE}${path}`);
  });

  it("has no automated accessibility violations (axe-core)", async () => {
    const { container } = renderApp(path);
    const results = await axe.run(document.body, {
      iframes: false, // the Google Maps embed is third-party content
      rules: {
        "color-contrast": { enabled: false }, // jsdom has no layout/rendering to measure colours
      },
    });
    const summary = results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length}x) e.g. ${v.nodes[0].html}`);
    expect(summary, summary.join("\n")).toEqual([]);
    expect(container).toBeTruthy();
  });
});

describe("unknown URL", () => {
  it("shows the 404 page and tells search engines not to index it", () => {
    renderApp("/this-page-does-not-exist");
    expect(screen.getByRole("heading", { level: 1, name: /page not found/i })).toBeInTheDocument();
    expect(document.head.querySelector('meta[name="robots"]')?.content).toBe("noindex");
    expect(canonical()).toBeUndefined();
  });
});

describe("site-wide elements", () => {
  it("has a skip link, a main landmark, and the floating WhatsApp button", () => {
    renderApp("/");
    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute("href", "#main");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    expect(screen.getByRole("link", { name: /chat with us on whatsapp/i }).getAttribute("href")).toMatch(/^https:\/\/wa\.me\/971557557786\?text=/);
  });
});

describe("support hours", () => {
  // The business is open Mon–Sat, 8 AM – 8 PM. Promising round-the-clock support it does not
  // offer misleads customers, so no page may claim it.
  it.each(ROUTES.map((r) => r.path))("%s does not claim 24/7 support", (path) => {
    const { container } = renderApp(path);
    expect(container.textContent).not.toMatch(/24\s*[/x]\s*7|round[- ]the[- ]clock/i);
  });

  it("shows the real opening hours in the footer and on the Contact page", () => {
    renderApp("/contact");
    expect(screen.getByText(CONTACT.hours)).toBeInTheDocument();
    expect(screen.getByText(CONTACT.hoursTime)).toBeInTheDocument();
  });
});
