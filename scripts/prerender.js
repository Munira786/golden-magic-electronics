// Build step 3 of 3 (see "build" in package.json):
//   1. vite build                      -> dist/ (browser bundle + index.html template)
//   2. vite build --ssr ...            -> dist-ssr/entry-server.js (renders a URL to HTML)
//   3. node scripts/prerender.js       -> one HTML file per page in dist/, plus dist/404.html
//
// Files are written as dist/about.html (not dist/about/index.html) because Netlify serves
// about.html at /about with no trailing slash, matching the canonical URLs. Netlify serves
// 404.html with a real 404 status for any URL that has no file.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
const { render, ROUTES } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const escapeText = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (s) => escapeText(s).replace(/"/g, "&quot;");

/** Replace the content="" of an existing <meta> tag in the template; fail loudly if it is missing. */
function setMetaContent(html, attr, name, value) {
  const pattern = new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`index.html is missing <meta ${attr}="${name}">`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

function buildPage(url, { html, head }, label) {
  if (!head?.title || !head?.description) throw new Error(`${label}: page rendered without <Seo> title/description`);
  if (!/<h1[\s>]/.test(html)) throw new Error(`${label}: page has no <h1>`);

  let page = template;
  if (!page.includes('<div id="root"></div>')) throw new Error('index.html is missing <div id="root"></div>');
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(head.title)}</title>`);
  page = setMetaContent(page, "name", "description", head.description);
  page = setMetaContent(page, "property", "og:title", head.title);
  page = setMetaContent(page, "property", "og:description", head.description);
  page = setMetaContent(page, "property", "og:image", head.image);
  page = setMetaContent(page, "name", "twitter:title", head.title);
  page = setMetaContent(page, "name", "twitter:description", head.description);
  page = setMetaContent(page, "name", "twitter:image", head.image);

  const extra = head.noindex
    ? ['<meta name="robots" content="noindex">']
    : [`<link rel="canonical" href="${escapeAttr(head.canonical)}">`, `<meta property="og:url" content="${escapeAttr(head.ogUrl)}">`];
  page = page.replace("</head>", `  ${extra.join("\n  ")}\n</head>`);
  return page;
}

const outputs = [];
for (const { path: url } of ROUTES) {
  const file = url === "/" ? "index.html" : `${url.slice(1)}.html`;
  fs.writeFileSync(path.join(distDir, file), buildPage(url, render(url), url));
  outputs.push(`${url.padEnd(10)} -> dist/${file}`);
}

// Any URL that matches no page renders the app's NotFound route (marked noindex).
fs.writeFileSync(path.join(distDir, "404.html"), buildPage("/404", render("/__not-found__"), "404 page"));
outputs.push(`${"(other)".padEnd(10)} -> dist/404.html`);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered ${outputs.length} pages:\n  ${outputs.join("\n  ")}`);
