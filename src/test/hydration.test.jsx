// Pre-rendered pages must hydrate cleanly: the HTML built at build time (src/entry-server.jsx) has to
// match React's first render in the browser exactly, or React logs a mismatch and may re-render or
// leave stale content. Browser-only state (localStorage, URL #hash) is the usual cause.
import { StrictMode } from "react";
import { act, screen } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ROUTES } from "../routes.js";

let mounted = null;

afterEach(() => {
  act(() => mounted?.root.unmount());
  mounted?.container.remove();
  mounted = null;
  window.history.replaceState({}, "", "/");
});

/** Server-render `path`, then hydrate it like the browser does; collect any mismatch reports. */
async function prerenderAndHydrate(path, { measurementId = "", savedConsent = null, hash = "" } = {}) {
  vi.resetModules();
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", measurementId);
  const { render } = await import("../entry-server.jsx");
  const { default: App } = await import("../App.jsx");

  const { html } = render(path); // what scripts/prerender.js writes into the HTML file

  if (savedConsent) localStorage.setItem("gme-analytics-consent", savedConsent);
  window.history.replaceState({}, "", path + hash);
  const container = document.createElement("div");
  container.id = "root";
  container.innerHTML = html;
  document.body.appendChild(container);

  const problems = [];
  const consoleError = vi.spyOn(console, "error").mockImplementation((...args) => problems.push(args.join(" ")));
  let root;
  await act(async () => {
    root = hydrateRoot(
      container,
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
      { onRecoverableError: (error) => problems.push(`recoverable: ${error.message}`) }
    );
  });
  consoleError.mockRestore();
  mounted = { root, container };
  return { html, problems };
}

describe("pre-rendered pages hydrate without mismatches", () => {
  it.each([...ROUTES.map((r) => r.path), "/no-such-page"])("%s", async (path) => {
    const { html, problems } = await prerenderAndHydrate(path);
    expect(html).toMatch(/<h1[\s>]/);
    expect(problems, problems.join("\n")).toEqual([]);
  });
});

describe("browser-only state is applied right after hydration", () => {
  it("consent banner: not in the HTML, shown after hydration for a first-time visitor", async () => {
    const { html, problems } = await prerenderAndHydrate("/", { measurementId: "G-TEST12345" });
    expect(html).not.toContain("consent-banner");
    expect(problems, problems.join("\n")).toEqual([]);
    expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
  });

  it("consent banner: stays hidden for a visitor who already chose", async () => {
    const { problems } = await prerenderAndHydrate("/", { measurementId: "G-TEST12345", savedConsent: "denied" });
    expect(problems, problems.join("\n")).toEqual([]);
    expect(screen.queryByRole("region", { name: /cookie consent/i })).not.toBeInTheDocument();
  });

  it("service highlight: the #hash card is highlighted after hydration", async () => {
    const { html, problems } = await prerenderAndHydrate("/services", { hash: "#cctv-installation" });
    expect(html).not.toContain("is-targeted");
    expect(problems, problems.join("\n")).toEqual([]);
    expect(document.getElementById("cctv-installation")).toHaveClass("is-targeted");
  });

  it("footer year: shows the current year after hydration", async () => {
    const { problems } = await prerenderAndHydrate("/");
    expect(problems, problems.join("\n")).toEqual([]);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} Golden Magic Electronics`))).toBeInTheDocument();
  });
});
