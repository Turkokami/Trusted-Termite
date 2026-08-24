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
 *
 * Exit 1 on any hard failure. Drafts (noindex) are reported but do not fail the run.
 */
import fs from 'node:fs';
import path from 'node:path';

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
    if (req === 'BreadcrumbList' && p.url === '/') continue; // home has no breadcrumb
    if (!types.includes(req)) warns.push(`NODE MISS  ${p.url} — no ${req}`);
  }
  if (types.filter((t) => t === 'FAQPage').length > 1) errors.push(`2+ FAQPage ${p.url}`);

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
