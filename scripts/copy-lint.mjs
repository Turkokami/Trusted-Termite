#!/usr/bin/env node
/**
 * copy-lint.mjs — reads the BUILT site (dist/) and reports the copy and
 * styling habits that make a page read as generated rather than written.
 *
 *   npm run lint:copy              report only, always exits 0
 *   npm run lint:copy -- --strict  exits 1 if anything is found
 *   node scripts/copy-lint.mjs --dir some/other/build
 *
 * It is a report, not a gate. It is deliberately NOT part of `npm run build`:
 * several of the hits need a person to read the sentence (an initial like
 * "Max W." looks like a two-word sentence to a regex). No dependencies.
 *
 * Checks
 *   real / really         intensifier use. "real estate", "real property",
 *                          "real-time" and "realtor" are literal and skipped.
 *   quiet / quietly       usually a vaguer word for something specific.
 *   short sentences       1–2 word sentences inside a <p> (not the first one).
 *   arrows in links       → › » ➜ ➔ ⟶ ↗ in <a>/<button> text.
 *   dots in main          · or • between words inside <main>.
 *   eyebrow elements      class contains eyebrow / kicker / overline.
 *   border-left accents   border-left of 2px or more in built CSS or inline styles.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const dirFlag = args.indexOf('--dir');
const ROOT = dirFlag >= 0 && args[dirFlag + 1] ? args[dirFlag + 1] : 'dist';
const EXAMPLES = Number(process.env.COPY_LINT_EXAMPLES || 5);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    console.error(`copy-lint: no build output at ${dir}/ — run the build first.`);
    process.exit(strict ? 1 : 0);
  }
  for (const name of entries) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ', rsquo: '’', lsquo: '‘', mdash: '—', ndash: '–', middot: '·', rarr: '→', raquo: '»', rsaquo: '›' };
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z0-9#]+);/gi, (m, n) => ENT[n] ?? m);
const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const stripNonText = (html) =>
  html.replace(/<(script|style|svg|noscript|template)\b[\s\S]*?<\/\1>/gi, ' ');

const checks = {
  'real / really': [],
  'quiet / quietly': [],
  'short sentences (1-2 words) in paragraphs': [],
  'arrows in link/button text': [],
  'dots between words in main': [],
  'eyebrow / kicker / overline elements': [],
  'border-left accent rules (CSS)': [],
};
const hit = (key, file, sample) => checks[key].push({ file, sample });

const LITERAL_REAL = /\breal(?:[- ]estate|[- ]property|-time)\b|\brealtors?\b/gi;
const ARROWS = /[→›»➜➔⟶↗]/;
const BORDER_LEFT = /border-left(?:-width)?\s*:\s*([0-9.]+)px[^;}"]*/gi;

const files = walk(ROOT);
const pages = files.filter((f) => f.endsWith('.html'));
const styles = files.filter((f) => f.endsWith('.css'));

for (const file of pages) {
  const rel = relative(ROOT, file);
  const raw = readFileSync(file, 'utf8');

  // CSS inside the page (inline <style> and style="")
  for (const m of raw.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    for (const b of m[1].matchAll(BORDER_LEFT)) if (Number(b[1]) >= 2) hit('border-left accent rules (CSS)', rel, b[0].trim());
  }
  for (const m of raw.matchAll(/style="([^"]*)"/gi)) {
    for (const b of m[1].matchAll(BORDER_LEFT)) if (Number(b[1]) >= 2) hit('border-left accent rules (CSS)', rel, b[0].trim());
  }

  const html = stripNonText(raw);

  for (const m of html.matchAll(/<[a-z0-9]+\b[^>]*\bclass="([^"]*)"[^>]*>([\s\S]*?)<\//gi)) {
    if (/eyebrow|kicker|overline/i.test(m[1])) hit('eyebrow / kicker / overline elements', rel, text(m[2]).slice(0, 80));
  }

  for (const m of html.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const t = text(m[2]);
    if (ARROWS.test(t)) hit('arrows in link/button text', rel, t.slice(0, 80));
  }

  const body = text(html.replace(/^[\s\S]*?<body[^>]*>/i, ''));
  const withoutLiteral = body.replace(LITERAL_REAL, ' ');
  for (const m of withoutLiteral.matchAll(/.{0,45}\breal(?:ly)?\b.{0,30}/gi)) hit('real / really', rel, m[0].trim());
  for (const m of body.matchAll(/.{0,45}\bquiet(?:ly)?\b.{0,30}/gi)) hit('quiet / quietly', rel, m[0].trim());

  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const main = mainMatch ? mainMatch[1] : html;
  const mainText = text(main);
  for (const m of mainText.matchAll(/.{0,35}\S\s*[·•]\s*\S.{0,35}/g)) hit('dots between words in main', rel, m[0].trim());

  for (const p of main.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
    const sentences = text(p[1]).split(/(?<=[.!?])\s+/);
    sentences.forEach((s, i) => {
      if (i === 0) return;
      const words = s.match(/[A-Za-zÀ-ÿ0-9'’-]+/g) || [];
      if (words.length >= 1 && words.length <= 2 && s.endsWith('.') && !/\d/.test(s) && s.length < 30) {
        hit('short sentences (1-2 words) in paragraphs', rel, `${sentences[i - 1].slice(-50)} ${s}`);
      }
    });
  }
}

for (const file of styles) {
  const rel = relative(ROOT, file);
  const css = readFileSync(file, 'utf8');
  for (const b of css.matchAll(BORDER_LEFT)) if (Number(b[1]) >= 2) hit('border-left accent rules (CSS)', rel, b[0].trim());
}

let total = 0;
console.log(`copy-lint — ${pages.length} pages, ${styles.length} stylesheets in ${ROOT}/\n`);
for (const [name, list] of Object.entries(checks)) {
  total += list.length;
  const pagesHit = new Set(list.map((h) => h.file)).size;
  console.log(`${String(list.length).padStart(5)}  ${name}${list.length ? `  (${pagesHit} file${pagesHit === 1 ? '' : 's'})` : ''}`);
  for (const h of list.slice(0, EXAMPLES)) console.log(`         · ${h.file}: ${h.sample}`);
}
console.log(`\n${total} finding(s).${strict ? '' : ' Report only; pass --strict to fail on any finding.'}`);
process.exit(strict && total > 0 ? 1 : 0);
