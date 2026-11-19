// Runs before every test file (see `test.setupFiles` in vite.config.js).
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom does not implement these browser APIs; the site uses them, so provide simple stand-ins.

// Used by the scroll-reveal hook: report every element as visible straight away.
class ImmediateIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    this.callback([{ isIntersecting: true, target }], this);
  }
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = ImmediateIntersectionObserver;

// Used by the mobile menu (desktop breakpoint) and reduced-motion checks. Defaults to "no match";
// tests can replace it to simulate a desktop-width window.
window.matchMedia = vi.fn((query) => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}));

window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.body.removeAttribute("style");
  document.body.className = "";
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
