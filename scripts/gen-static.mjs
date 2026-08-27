/**
 * Post-build generator: sitemap.xml, robots.txt, and the vercel.json redirect
 * block.
 *
 * Runs AFTER `astro build`, against dist/, so it describes what actually
 * shipped rather than what anybody intended to ship. That ordering is the whole
 * point:
 *
 *  - The sitemap is built by reading every index.html in dist/ and EXCLUDING
 *    any page carrying <meta name="robots" content="noindex">. A held draft can
 *    therefore never leak into the sitemap, which is the usual way a page
 *    nobody meant to publish gets crawled anyway.
 *  - The redirects are written into vercel.json from src/data/redirects.ts, so
 *    the documented map and the deployed config cannot drift apart.
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadTs } from './load-ts.mjs';

const DIST = 'dist';
const { SITE_URL } = await loadTs('src/data/business.ts');
const { REDIRECTS } = await loadTs('src/data/redirects.ts');

/* ---------- walk dist/ ---------- */
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') {
      const html = fs.readFileSync(p, 'utf8');
      const url = '/' + path.relative(DIST, p).replace(/index\.html$/, '').split(path.sep).join('/');
      pages.push({ url: url === '//' ? '/' : url, html, file: p });
    }
  }
})(DIST);

const noindex = (h) => /<meta[^>]+name=["']robots["'][^>]*noindex/i.test(h);
const indexable = pages.filter((p) => !noindex(p.html)).sort((a, b) => a.url.localeCompare(b.url));
const held = pages.length - indexable.length;

/* ---------- sitemap.xml ----------
   No <lastmod>: we do not track per-page modification dates, and a lastmod
   stamped with the build time would tell crawlers every page changed on every
   deploy, which is false and teaches them to ignore the field. No <priority>
   either — Google has said publicly it does not use it. An honest sitemap is a
   list of URLs. */
const esOf = (h) => {
  const m = h.match(/<link[^>]+hreflang=["']es-US["'][^>]+href=["']([^"']+)["']/i);
  return m ? m[1] : null;
};
const enOf = (h) => {
  const m = h.match(/<link[^>]+hreflang=["']en-US["'][^>]+href=["']([^"']+)["']/i);
  return m ? m[1] : null;
};

const entries = indexable.map((p) => {
  const loc = new URL(p.url, SITE_URL).href;
  const es = esOf(p.html);
  const en = enOf(p.html);
  let alts = '';
  if (es && en) {
    alts =
      `\n    <xhtml:link rel="alternate" hreflang="en-US" href="${en}"/>` +
      `\n    <xhtml:link rel="alternate" hreflang="es-US" href="${es}"/>`;
  }
  return `  <url>\n    <loc>${loc}</loc>${alts}\n  </url>`;
});

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join('\n') +
    `\n</urlset>\n`,
);

/* ---------- robots.txt ---------- */
fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  `# ${new URL(SITE_URL).host}\n` +
    `User-agent: *\n` +
    `Allow: /\n\n` +
    `Sitemap: ${new URL('/sitemap.xml', SITE_URL).href}\n`,
);

/* ---------- vercel.json redirects ---------- */
const cfg = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
/* Sources are emitted WITH the trailing slash. Vercel applies the
   trailingSlash:true normalisation BEFORE it evaluates these rules, so a source
   written without the slash is never reached: a request for /faq is first 308'd
   to /faq/, and /faq/ then matches nothing and 404s. Writing the slash into the
   source matches the path as normalisation leaves it.

   That turns the entries whose only job was to ADD the slash (/about -> /about/)
   into a rule pointing a path at itself, which Vercel serves as a redirect loop.
   Normalisation already does that job, so they are dropped here. */
const source = (r) => `${r.from}/`;
cfg.redirects = REDIRECTS
  .filter((r) => source(r) !== r.to)
  .map((r) => ({ source: source(r), destination: r.to, permanent: true }));
fs.writeFileSync('vercel.json', JSON.stringify(cfg, null, 2) + '\n');

console.log(
  `gen-static: sitemap ${indexable.length} urls (${held} noindex excluded) · robots.txt · ${cfg.redirects.length} redirects → vercel.json`,
);
