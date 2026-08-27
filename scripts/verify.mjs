#!/usr/bin/env node
/**
 * The Keystone verification harness (Part 9.2).
 * Runs against dist/ between every content wave and before every push.
 *
 *   1 · Dead-link crawler      — every internal href must resolve to a built file
 *   2 · Per-page SEO audit     — one H1, title ≤60, description 110–165, alt on every image
 *   3 · Duplicate-sentence scan — any ≥10-word sentence appearing on ≥3 pages
 *   4 · Word-count auditor     — M1 floor, 3,000 words on every INDEXABLE page
 *   5 · Schema check           — one @graph, parses, node-complete, no @id collisions
 *   6 · Decay check            — every cited outside fact read inside its interval
 *
 * Exit 1 on any hard failure. Drafts (noindex) are reported but do not fail the run.
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadTs } from './load-ts.mjs';

const DIST = path.resolve('dist');
const M1_FLOOR = 3000;

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

/* ---------- collect ---------- */
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const files = walk(DIST);
const urlOf = (f) => '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');

const pages = files.map((f) => {
  const html = fs.readFileSync(f, 'utf8');
  return { file: f, url: urlOf(f), html };
});

const strip = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(header|footer|nav)[\s\S]*?<\/\1>/gi, ' ') // exclude chrome from word count
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const errors = [];
const warns = [];
const notes = [];

/* ---------- 1 · dead links ---------- */
const built = new Set(pages.map((p) => p.url));
for (const p of pages) {
  const hrefs = [...p.html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const h of hrefs) {
    if (/^(https?:|tel:|mailto:|sms:|#|data:)/.test(h)) continue;
    const clean = h.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = clean.endsWith('/') ? clean : clean + '/';
    const asFile = path.join(DIST, clean.replace(/^\//, ''));
    if (!built.has(target) && !fs.existsSync(asFile)) {
      errors.push(`DEAD LINK  ${p.url} → ${h}`);
    }
  }
}

/* ---------- 2 · per-page SEO ---------- */
for (const p of pages) {
  const h1 = [...p.html.matchAll(/<h1[\s>]/gi)].length;
  if (h1 !== 1) errors.push(`H1 COUNT   ${p.url} has ${h1} H1s (must be exactly 1)`);

  const title = (p.html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const decoded = title.replace(/&amp;/g, '&');
  if (!decoded) errors.push(`NO TITLE   ${p.url}`);
  else if (decoded.length > 60) warns.push(`TITLE >60  ${p.url} (${decoded.length}) "${decoded}"`);

  const desc = (p.html.match(/<meta name="description" content="([^"]*)"/i) || [])[1] || '';
  const d = desc.replace(/&amp;/g, '&');
  if (!d) errors.push(`NO DESC    ${p.url}`);
  else {
    if (d.length < 110 || d.length > 165) warns.push(`DESC LEN   ${p.url} (${d.length}, need 110–165)`);
    if (!/[.!?]$/.test(d.trim())) warns.push(`DESC END   ${p.url} does not end on punctuation`);
  }

  if (!/rel="canonical"/.test(p.html)) errors.push(`NO CANON   ${p.url}`);
  if (!/property="og:image"/.test(p.html)) warns.push(`NO OG IMG  ${p.url}`);

  for (const img of [...p.html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])) {
    if (!/\balt=/.test(img)) errors.push(`IMG NO ALT ${p.url} ${img.slice(0, 70)}`);
  }
}

/* ---------- 3 · duplicate sentences ---------- */
/* Component boilerplate (the CTA, the trust strip, service cards) is SUPPOSED to
   repeat — Keystone 6.3 says keep boilerplate in components and keep page bodies
   unique. Strip anything marked data-boilerplate, plus card grids, so the scanner
   reports real body duplication rather than the design system. */
const stripBoilerplate = (h) =>
  h
    .replace(/<[^>]*\bdata-boilerplate\b[\s\S]*?<\/(section|div)>/gi, ' ')
    .replace(/<div class="grid[\s\S]*?<\/div>\s*<\/div>/gi, ' ');

const seen = new Map();
for (const p of pages) {
  const body = strip(stripBoilerplate(p.html));
  const sentences = body.split(/(?<=[.!?])\s+/);
  for (const s of sentences) {
    const t = s.trim();
    if (t.split(/\s+/).length < 10) continue;
    const key = t.toLowerCase().replace(/[^a-z0-9 ]/g, '');
    if (!seen.has(key)) seen.set(key, { text: t, urls: new Set() });
    seen.get(key).urls.add(p.url);
  }
}
for (const [, v] of seen) {
  if (v.urls.size >= 3) {
    warns.push(`DUP SENT   on ${v.urls.size} pages: "${v.text.slice(0, 90)}…"`);
  }
}

/* ---------- 4 · word count (M1) ---------- */
for (const p of pages) {
  const isDraft = /<meta name="robots" content="noindex/i.test(p.html);
  const words = strip(p.html).split(/\s+/).filter(Boolean).length;
  if (isDraft) {
    notes.push(`DRAFT      ${p.url} — ${words} words, noindex (not shipped)`);
  } else if (words < M1_FLOOR) {
    warns.push(`M1 FLOOR   ${p.url} — ${words} words, ${M1_FLOOR - words} short of the 3,000 floor`);
  } else {
    notes.push(`OK         ${p.url} — ${words} words`);
  }
}

/* ---------- 5 · schema ---------- */
const idsByPage = new Map();
for (const p of pages) {
  const blocks = [...p.html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (blocks.length === 0) { errors.push(`NO SCHEMA  ${p.url}`); continue; }
  if (blocks.length > 1) errors.push(`2+ EMITTER ${p.url} has ${blocks.length} JSON-LD blocks (must be 1)`);

  let parsed;
  try { parsed = JSON.parse(blocks[0][1]); }
  catch (e) { errors.push(`BAD JSON   ${p.url} — ${e.message}`); continue; }

  const graph = parsed['@graph'];
  if (!Array.isArray(graph)) { errors.push(`NO @graph  ${p.url}`); continue; }

  const types = graph.flatMap((n) => (Array.isArray(n['@type']) ? n['@type'] : [n['@type']]));
  for (const req of ['WebSite', 'WebPage', 'ImageObject', 'LocalBusiness', 'BreadcrumbList']) {
    // Home has no breadcrumb, and neither does a language root (/es/).
    if (req === 'BreadcrumbList' && (p.url === '/' || p.url === '/es/')) continue;
    if (!types.includes(req)) warns.push(`NODE MISS  ${p.url} — no ${req}`);
  }
  if (types.filter((t) => t === 'FAQPage').length > 1) errors.push(`2+ FAQPage ${p.url}`);

  // --- i18n: hreflang must resolve, and must be reciprocal -----------------
  const alts = [...p.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
    .map((m) => ({ lang: m[1], href: m[2] }));
  for (const a of alts) {
    if (a.lang === 'x-default') continue;
    const rel = a.href.replace(/^https?:\/\/[^/]+/, '');
    if (!pages.some((q) => q.url === rel)) {
      errors.push(`HREFLANG   ${p.url} → ${rel} (${a.lang}) does not exist`);
      continue;
    }
    const other = pages.find((q) => q.url === rel);
    if (!/<link rel="alternate"/.test(other.html) || !other.html.includes(p.url === '/' ? 'href="' : p.url)) {
      warns.push(`HREFLANG   ${p.url} ↔ ${rel} not reciprocal`);
    }
  }

  // @id collisions within a page
  const ids = graph.map((n) => n['@id']).filter(Boolean);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) errors.push(`@id CLASH  ${p.url} — ${[...new Set(dupes)].join(', ')}`);
  idsByPage.set(p.url, ids);

  // aggregateRating must never appear unverified
  if (JSON.stringify(graph).includes('aggregateRating')) {
    warns.push(`RATING     ${p.url} emits aggregateRating — confirm it came from a verified profile read`);
  }
}

/* ---------- 6 · decay (Phase 6) ---------- */
/* A page can be perfectly built and still be publishing something that stopped
   being true. The cadence registry is the record of when each outside fact was
   last read against its source; anything past its interval is surfaced here so
   it cannot be ignored on a build that otherwise passes. Full report: npm run cadence */
try {
  const { DECAYING_FACTS } = await loadTs('src/data/maintenance.ts');
  const now = Date.now();
  for (const f of DECAYING_FACTS) {
    const due = new Date(f.lastVerified + 'T00:00:00Z');
    due.setUTCDate(due.getUTCDate() + f.intervalDays);
    const over = Math.round((now - due) / 86400000);
    if (over <= 0) continue;
    const msg = `DECAY      ${f.id} (${f.severity}) unverified ${over}d past interval — ${f.what.slice(0, 80)}…`;
    if (f.severity === 'routine') warns.push(msg);
    else errors.push(msg + ' [npm run cadence]');
  }
} catch (e) {
  warns.push(`DECAY      cadence registry unreadable — ${e.message}`);
}

/* ---------- 7 · problem spokes (Wave 4) ---------- */
/* Spokes live one level below a service and are only reachable because
   SpokeLinks renders them from src/data/spokes.ts. If a page ships without a
   row, nothing links to it and nobody finds it; if a row ships without a page,
   the parent service page carries a dead link. Reconcile both directions. */
try {
  const { SPOKES } = await loadTs('src/data/spokes.ts');
  const { SERVICES } = await loadTs('src/data/services.ts');
  const serviceSlugs = new Set(SERVICES.map((x) => x.slug));
  const declared = new Set(SPOKES.map((x) => `/services/${x.service}/${x.slug}/`));

  for (const sp of SPOKES) {
    if (!serviceSlugs.has(sp.service))
      errors.push(`SPOKE      ${sp.slug} names service "${sp.service}", which is not in services.ts`);
    const url = `/services/${sp.service}/${sp.slug}/`;
    if (!built.has(url)) errors.push(`SPOKE      declared in spokes.ts but not built — ${url}`);
  }

  /* Any built page two levels under /services/ that nothing declares. */
  for (const url of built) {
    const m = url.match(/^\/services\/([^/]+)\/([^/]+)\/$/);
    if (!m) continue;
    if (declared.has(url)) continue;
    if (url === '/services/termite-control/wdi-inspection/') continue; // licensed-category page, linked from the compliance cluster
    errors.push(`SPOKE      built but absent from spokes.ts, so nothing links to it — ${url}`);
  }
} catch (e) {
  warns.push(`SPOKE      spoke registry unreadable — ${e.message}`);
}

/* ---------- 8 · launch plumbing ---------- */
/* A redirect that points at a 404 is worse than no redirect at all: it turns a
   recoverable dead link into a confident one and reads as a soft 404. And a
   sitemap that lists a held page publishes the thing we deliberately held.
   Both are only checkable after a build, which is why this runs against dist/. */
try {
  const { REDIRECTS } = await loadTs('src/data/redirects.ts');
  for (const r of REDIRECTS) {
    if (!r.to.endsWith('/')) errors.push(`REDIRECT   ${r.from} → ${r.to} has no trailing slash (site is trailingSlash:'always')`);
    if (r.from.endsWith('/')) errors.push(`REDIRECT   source ${r.from} must not end in a slash`);
    if (!built.has(r.to)) errors.push(`REDIRECT   ${r.from} → ${r.to} — destination was not built (a 301 into a 404)`);
    if (REDIRECTS.some((o) => o !== r && o.from === r.to)) errors.push(`REDIRECT   ${r.from} → ${r.to} starts a chain; point it at the final destination`);
  }

  const vj = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  const deployed = new Set((vj.redirects || []).map((x) => `${x.source}>${x.destination}`));
  for (const r of REDIRECTS) {
    if (!deployed.has(`${r.from}>${r.to}`))
      errors.push(`REDIRECT   ${r.from} is documented but absent from vercel.json — run npm run build`);
  }
  for (const x of vj.redirects || []) {
    if (!x.permanent) errors.push(`REDIRECT   ${x.source} is not permanent (must be 301, not 302)`);
  }

  const smPath = 'dist/sitemap.xml';
  if (!fs.existsSync(smPath)) errors.push('SITEMAP    dist/sitemap.xml was not generated — is gen-static.mjs in the build script?');
  else {
    const sm = fs.readFileSync(smPath, 'utf8');
    const listed = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    for (const p of pages) {
      const isNoindex = /<meta[^>]+name=["']robots["'][^>]*noindex/i.test(p.html);
      const inSitemap = listed.includes(p.url);
      if (isNoindex && inSitemap) errors.push(`SITEMAP    ${p.url} is noindex but listed in the sitemap`);
      if (!isNoindex && !inSitemap) errors.push(`SITEMAP    ${p.url} is indexable but missing from the sitemap`);
    }
  }

  if (!fs.existsSync('dist/robots.txt')) errors.push('ROBOTS     dist/robots.txt was not generated');
  else if (!fs.readFileSync('dist/robots.txt', 'utf8').includes('sitemap.xml'))
    warns.push('ROBOTS     robots.txt does not point at the sitemap');
} catch (e) {
  warns.push(`REDIRECT   launch plumbing unreadable — ${e.message}`);
}

/* ---------- report ---------- */
const line = '─'.repeat(72);
console.log(`\n${line}\nKEYSTONE VERIFICATION HARNESS — ${pages.length} pages in dist/\n${line}`);
const indexable = notes.filter((n) => n.startsWith('OK')).length;
const drafts = notes.filter((n) => n.startsWith('DRAFT')).length;
console.log(`Indexable and passing M1: ${indexable}   ·   Drafts held at noindex: ${drafts}\n`);

if (errors.length) { console.log('FAILURES'); errors.forEach((e) => console.log('  ✗ ' + e)); console.log(); }
if (warns.length) { console.log('WARNINGS'); warns.forEach((w) => console.log('  ! ' + w)); console.log(); }
console.log('PAGE REPORT'); notes.forEach((n) => console.log('  · ' + n));

console.log(`\n${line}`);
console.log(errors.length ? `FAILED — ${errors.length} error(s), ${warns.length} warning(s)` : `PASSED — 0 errors, ${warns.length} warning(s)`);
console.log(line + '\n');
process.exit(errors.length ? 1 : 0);
