// The Home page "Learn More" links point at /services#<anchor>; these tests keep them from breaking.
import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SERVICES } from "../data/services.js";
import { renderApp } from "../test/renderApp.jsx";

describe("service anchors", () => {
  it("every Home page Learn More link targets a section that exists on the Services page", () => {
    const { unmount } = renderApp("/");
    const services = within(document.getElementById("services"));
    const targets = services
      .getAllByRole("link", { name: /learn more/i })
      .map((link) => link.getAttribute("href"));
    expect(targets).toHaveLength(SERVICES.length);
    unmount();

    renderApp("/services");
    for (const href of targets) {
      const [path, anchor] = href.split("#");
      expect(path).toBe("/services");
      expect(document.getElementById(anchor), `missing #${anchor} on /services`).not.toBeNull();
    }
  });

  it("highlights the card the visitor jumped to", () => {
    renderApp("/services#cctv-installation");
    expect(document.getElementById("cctv-installation")).toHaveClass("is-targeted");
    expect(document.getElementById("structured-cabling")).not.toHaveClass("is-targeted");
  });

  it("service anchors are unique", () => {
    const anchors = SERVICES.map((s) => s.anchor);
    expect(new Set(anchors).size).toBe(anchors.length);
  });

  it("each service card has a Request a Quote button", () => {
    renderApp("/services");
    for (const service of SERVICES) {
      const card = document.getElementById(service.anchor);
      expect(within(card).getByRole("link", { name: /request a quote/i })).toHaveAttribute("href", "/contact#quoteForm");
    }
    expect(screen.getAllByRole("link", { name: /request a quote/i }).length).toBeGreaterThanOrEqual(SERVICES.length);
  });
});
