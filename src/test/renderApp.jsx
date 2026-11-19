import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App.jsx";

/**
 * Render the whole site at a URL, the way a visitor would land on it.
 * `state` is router state (used e.g. to pre-fill the quote form from Products/Services).
 */
export function renderApp(path = "/", state = undefined) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: path.split("#")[0], hash: path.includes("#") ? `#${path.split("#")[1]}` : "", state }]}>
      <App />
    </MemoryRouter>
  );
}
