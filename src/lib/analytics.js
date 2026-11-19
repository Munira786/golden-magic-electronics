// Google Analytics 4, loaded only after the visitor gives consent.
//
// Flow: ConsentBanner asks once -> the choice is saved in localStorage -> on "granted" we inject
// gtag.js. Nothing is sent to Google before consent. If no Measurement ID is configured, every
// function here is a no-op and the banner never shows.

import { GA_MEASUREMENT_ID } from "../config/site.js";

const CONSENT_KEY = "gme-analytics-consent"; // "granted" | "denied"
export const OPEN_CONSENT_EVENT = "gme:open-consent-settings";

export const analyticsEnabled = Boolean(GA_MEASUREMENT_ID);

let loaded = false;

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null; // storage blocked (private mode etc.): treat as "not decided"
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore: the choice just won't be remembered */
  }
  if (value === "granted") loadAnalytics();
  if (value === "denied" && loaded) {
    // gtag cannot be unloaded mid-session; disable it and drop its cookies.
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    clearGaCookies();
  }
}

function clearGaCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      const domain = window.location.hostname.replace(/^www\./, "");
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
      document.cookie = `${name}=; Max-Age=0; path=/`;
    }
  });
}

function loadAnalytics() {
  if (!analyticsEnabled || loaded) return;
  loaded = true;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the real `arguments` object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // GA4 "enhanced measurement" records SPA page views from history changes automatically.
  // (GA4 does not log or store IP addresses, so the old anonymize_ip flag is not needed.)
  window.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

/** Load GA on startup if the visitor already consented on a previous visit. */
export function initAnalytics() {
  if (analyticsEnabled && getConsent() === "granted") loadAnalytics();
  if (analyticsEnabled) trackContactClicks();
}

/** Send a GA4 event. Safe to call anytime: does nothing without consent. */
export function trackEvent(name, params = {}) {
  if (!loaded || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

// One delegated listener tracks every call / WhatsApp / email link on the site, so individual
// links don't need tracking code.
function trackContactClicks() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const href = link.getAttribute("href");
    const page = window.location.pathname;
    if (href.startsWith("tel:")) trackEvent("click_call", { page });
    else if (href.includes("wa.me/")) trackEvent("click_whatsapp", { page });
    else if (href.startsWith("mailto:")) trackEvent("click_email", { page });
  });
}
