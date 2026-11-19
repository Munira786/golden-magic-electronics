import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { initAnalytics } from "./lib/analytics.js";

import "./styles/index.css";

// Font Awesome icons are decorative, so load their stylesheet without blocking the first paint.
// Injected from JS (not an inline onload= handler) so it works under the site's Content-Security-Policy.
const iconStyles = document.createElement("link");
iconStyles.rel = "stylesheet";
iconStyles.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
// Subresource Integrity: the browser rejects the file if the CDN ever serves different content.
iconStyles.integrity = "sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==";
iconStyles.crossOrigin = "anonymous";
iconStyles.referrerPolicy = "no-referrer";
document.head.appendChild(iconStyles);

// Loads GA4 only if a Measurement ID is configured AND the visitor accepted cookies earlier.
initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
