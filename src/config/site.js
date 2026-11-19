// Single source of truth for site-wide values used in code (SEO tags, maps).
// If the domain or address changes, update it here and in the static tags in index.html.

export const SITE_URL = "https://www.goldenmagicelectronics.com";
export const SITE_NAME = "Golden Magic Electronics";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// Used for the Contact page map embed and the "Get Directions" link.
// TODO(owner): replace with the shop's exact Google Maps place link once confirmed.
export const MAP_QUERY = "Golden Magic Electronics, Deira, Dubai";
export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
