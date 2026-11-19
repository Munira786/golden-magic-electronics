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
  hours: "Mon – Sat, 9:00 AM – 7:00 PM (GST)",
};

// Used for the Contact page map embed and the "Get Directions" link.
// TODO(owner): replace with the shop's exact Google Maps place link once confirmed.
export const MAP_QUERY = "Golden Magic Electronics, Deira, Dubai";
export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
