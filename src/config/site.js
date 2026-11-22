// Single source of truth for site-wide values used in code (SEO tags, maps).
// If the domain or address changes, update it here and in the static tags in index.html.

export const SITE_URL = "https://www.goldenmagicelectronics.com";
export const SITE_NAME = "Golden Magic Electronics";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const CONTACT = {
  phone: "+971557557786",
  phoneDisplay: "+971 55 755 7786",
  whatsapp: "971557557786",
  email: "gme786@gmail.com",
  address: "Shop No.6, Behind ALTAJ Studio, Deira, Dubai, UAE",
  hoursDays: "Mon – Sat",
  hoursTime: "8:00 AM – 8:00 PM",
  hours: "Mon – Sat, 8:00 AM – 8:00 PM (GST)",
};

// Same hours in the 24-hour format Google expects. index.html's JSON-LD must match these
// (checked by src/test/structured-data.test.js). Closed on Sunday.
export const OPENING_HOURS = { opens: "08:00", closes: "20:00" };

// TODO(owner): add the Dubai trade licence number. The footer shows it only when this is set.
export const TRADE_LICENSE = "";

// GA4 Measurement ID comes from the VITE_GA_MEASUREMENT_ID environment variable (set in Netlify).
// When it is empty, analytics and the cookie consent banner are both switched off.
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

// Used for the Contact page map embed and the "Get Directions" link.
// TODO(owner): replace with the shop's exact Google Maps place link once confirmed.
export const MAP_QUERY = "Golden Magic Electronics, Deira, Dubai";
export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
