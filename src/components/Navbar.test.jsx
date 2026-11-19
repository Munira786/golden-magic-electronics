// Mobile menu: keyboard access and the "scroll stays locked after Back" regression.
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../App.jsx";
import { renderApp } from "../test/renderApp.jsx";

const menuButton = () => screen.getByRole("button", { name: /open menu/i });
const isOpen = () => menuButton().getAttribute("aria-expanded") === "true";

describe("mobile menu", () => {
  it("opens as a labelled dialog, focuses Close, and locks page scroll", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(menuButton());

    expect(isOpen()).toBe(true);
    expect(screen.getByRole("dialog", { name: "Menu" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes on Escape and returns focus to the menu button", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(menuButton());
    await user.keyboard("{Escape}");

    expect(isOpen()).toBe(false);
    expect(menuButton()).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("keeps Tab focus inside the open menu", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(menuButton());
    const dialog = screen.getByRole("dialog", { name: "Menu" });

    for (let i = 0; i < 10; i++) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement);
    }
    await user.tab({ shift: true });
    expect(dialog).toContainElement(document.activeElement);
  });

  it("closes and unlocks scrolling when the browser goes Back, and stays closed on Forward", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter([{ path: "*", element: <App /> }], { initialEntries: ["/", "/about"], initialIndex: 1 });
    render(<RouterProvider router={router} />);

    await user.click(menuButton());
    expect(document.body.style.overflow).toBe("hidden");

    await act(() => router.navigate(-1)); // browser Back
    expect(router.state.location.pathname).toBe("/");
    expect(isOpen()).toBe(false);
    expect(document.body.style.overflow).toBe("");

    await act(() => router.navigate(1)); // browser Forward to the page where the menu was opened
    expect(isOpen()).toBe(false);
  });

  it("closes when a menu link is clicked", async () => {
    const user = userEvent.setup();
    renderApp("/");
    await user.click(menuButton());
    const dialog = screen.getByRole("dialog", { name: "Menu" });
    await user.click(dialog.querySelector('a[href="/services"]'));

    expect(isOpen()).toBe(false);
    expect(screen.getByRole("heading", { level: 1, name: /technology services/i })).toBeInTheDocument();
  });
});
