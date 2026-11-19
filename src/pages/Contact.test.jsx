// The quote form is the site's main lead source: test what it sends and how it reports the result.
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderApp } from "../test/renderApp.jsx";

async function fillRequiredFields(user) {
  await user.type(screen.getByLabelText(/^name/i), "Aisha Khan");
  await user.type(screen.getByLabelText(/email address/i), "aisha@example.com");
  await user.type(screen.getByLabelText(/phone number/i), "+971 50 123 4567");
  await user.type(screen.getByLabelText(/^message/i), "Need 8 CCTV cameras for a warehouse.");
}

function mockFetch(response) {
  const fetchMock = vi.fn(() => (response instanceof Error ? Promise.reject(response) : Promise.resolve(response)));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("quote form", () => {
  it("posts the form to Netlify Forms and shows success", async () => {
    const fetchMock = mockFetch({ ok: true, status: 200 });
    const user = userEvent.setup();
    renderApp("/contact");

    await fillRequiredFields(user);
    await user.selectOptions(screen.getByLabelText(/service required/i), "CCTV Installation");
    await user.click(screen.getByRole("button", { name: /send request/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/your request has been sent/i);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/x-www-form-urlencoded");
    const sent = Object.fromEntries(new URLSearchParams(options.body));
    expect(sent).toMatchObject({
      "form-name": "quote", // must match the hidden form in index.html
      "bot-field": "",
      name: "Aisha Khan",
      email: "aisha@example.com",
      phone: "+971 50 123 4567",
      service: "CCTV Installation",
      message: "Need 8 CCTV cameras for a warehouse.",
    });

    // Fields reset after success, and nothing personal is kept in the browser.
    expect(screen.getByLabelText(/^name/i)).toHaveValue("");
    expect(localStorage.length).toBe(0);
  });

  it("shows an error with WhatsApp and phone fallbacks when the server rejects the submission", async () => {
    mockFetch({ ok: false, status: 404 });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    renderApp("/contact");

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send request/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/couldn.t send your request/i);
    expect(alert.querySelector('a[href^="https://wa.me/"]')).not.toBeNull();
    expect(alert.querySelector('a[href^="tel:"]')).not.toBeNull();
    // The visitor's input is kept so they can retry.
    expect(screen.getByLabelText(/^name/i)).toHaveValue("Aisha Khan");
  });

  it("shows the error when the network request fails", async () => {
    mockFetch(new TypeError("Failed to fetch"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    renderApp("/contact");

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send request/i }));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("is pre-filled when arriving from a product's Request Quote button", () => {
    renderApp("/contact#quoteForm", { interest: "CCTV Camera" });
    expect(screen.getByLabelText(/service required/i)).toHaveValue("Product Enquiry");
    expect(screen.getByLabelText(/^message/i)).toHaveValue("I'm interested in: CCTV Camera");
  });

  it("is pre-filled when arriving from a service's Request a Quote button", () => {
    renderApp("/contact#quoteForm", { service: "Structured Cabling" });
    expect(screen.getByLabelText(/service required/i)).toHaveValue("Structured Cabling");
  });

  it("ignores an unknown service passed in router state", () => {
    renderApp("/contact", { service: "<script>alert(1)</script>" });
    expect(screen.getByLabelText(/service required/i)).toHaveValue("");
  });
});
