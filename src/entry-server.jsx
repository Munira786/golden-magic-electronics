// Server entry used only at build time by scripts/prerender.js (built with `vite build --ssr`).
// Renders one URL of the site to an HTML string, plus that page's <head> tags.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";
import { HeadContext, createHeadCollector } from "./lib/head.js";

export { ROUTES } from "./routes.js";

export function render(url) {
  const head = createHeadCollector();
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={head}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>
  );
  return { html, head: head.get() };
}
