// Consent rules: Google Analytics must never load before the visitor accepts.
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

const gaScript = () => document.head.querySelector('script[src*="googletagmanager.com/gtag/js"]');

// The Measurement ID is read when the modules load, so each test re-imports them with fresh env.
async function loadApp(measurementId) {
  vi.resetModules();
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", measurementId);
  const { default: App } = await import("../App.jsx");
  const analytics = await import("./analytics.js");
  return { App, analytics };
}

async function renderSite(App, path = "/") {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
  });
}

afterEach(() => {
  gaScript()?.remove();
  delete window.gtag;
  delete window.dataLayer;
});

describe("analytics consent", () => {
  it("is completely off when no Measurement ID is configured", async () => {
    const { App, analytics } = await loadApp("");
    await renderSite(App);

    expect(analytics.analyticsEnabled).toBe(false);
    expect(screen.queryByRole("region", { name: /cookie consent/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /cookie settings/i })).not.toBeInTheDocument();
    analytics.trackEvent("generate_lead"); // must be a harmless no-op
    expect(gaScript()).toBeNull();
  });

  it("asks first and loads nothing from Google before consent", async () => {
    const { App, analytics } = await loadApp("G-TEST12345");
    analytics.initAnalytics();
    await renderSite(App);

    expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
    expect(gaScript()).toBeNull();
    expect(window.gtag).toBeUndefined();
  });

  it("loads GA after Accept and remembers the choice", async () => {
    const { App, analytics } = await loadApp("G-TEST12345");
    const user = userEvent.setup();
    await renderSite(App);

    await user.click(screen.getByRole("button", { name: "Accept" }));

    expect(screen.queryByRole("region", { name: /cookie consent/i })).not.toBeInTheDocument();
    expect(gaScript()?.getAttribute("src")).toContain("id=G-TEST12345");
    expect(localStorage.getItem("gme-analytics-consent")).toBe("granted");

    analytics.trackEvent("generate_lead", { form: "quote" });
    expect(window.dataLayer.at(-1)).toEqual(expect.objectContaining({ 0: "event", 1: "generate_lead" }));
  });

  it("stays off after Decline", async () => {
    const { App } = await loadApp("G-TEST12345");
    const user = userEvent.setup();
    await renderSite(App);

    await user.click(screen.getByRole("button", { name: "Decline" }));

    expect(gaScript()).toBeNull();
    expect(localStorage.getItem("gme-analytics-consent")).toBe("denied");
  });

  it("does not ask again on the next visit, and Cookie Settings re-opens the banner", async () => {
    localStorage.setItem("gme-analytics-consent", "denied");
    const { App } = await loadApp("G-TEST12345");
    const user = userEvent.setup();
    await renderSite(App);

    expect(screen.queryByRole("region", { name: /cookie consent/i })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /cookie settings/i }));
    expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
  });
});
