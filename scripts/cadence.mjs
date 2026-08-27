#!/usr/bin/env node
/**
 * The Keystone cadence report (Phase 6).
 *
 * verify.mjs answers "is the site correct as built?". This answers the other
 * question, the one that only has a wrong answer if nobody asks it: "is the
 * site still correct today?"
 *
 * Reads src/data/maintenance.ts, compares every decaying fact against the
 * calendar, and prints three things — what needs re-reading, what is parked
 * and why, and what gets written next.
 *
 *   npm run cadence            report and exit 0 unless something critical or
 *                              high-severity is overdue
 *   npm run cadence -- --all   include facts that are current
 *
 * Exit 1 means a fact the site publishes has gone unverified past its interval
 * and the site may now be asserting something untrue. That is a release
 * blocker, not a chore.
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadTs } from './load-ts.mjs';

const { DECAYING_FACTS, HELD, QUEUE } = await loadTs('src/data/maintenance.ts');

const showAll = process.argv.includes('--all');
const today = new Date();
today.setHours(0, 0, 0, 0);
const DAY = 86400000;
const SOON = 30;

const rows = DECAYING_FACTS.map((f) => {
  const due = new Date(f.lastVerified + 'T00:00:00Z');
  due.setUTCDate(due.getUTCDate() + f.intervalDays);
  const daysLeft = Math.round((due - today) / DAY);
  return { ...f, due, daysLeft, state: daysLeft < 0 ? 'OVERDUE' : daysLeft <= SOON ? 'DUE SOON' : 'CURRENT' };
});

const rank = { critical: 0, high: 1, routine: 2 };
const order = { OVERDUE: 0, 'DUE SOON': 1, CURRENT: 2 };
rows.sort((a, b) => order[a.state] - order[b.state] || rank[a.severity] - rank[b.severity] || a.daysLeft - b.daysLeft);

const iso = (d) => d.toISOString().slice(0, 10);
const line = '─'.repeat(76);
const pad = (s, n) => String(s).padEnd(n);

console.log(`\n${line}\nKEYSTONE CADENCE — ${iso(today)}\n${line}`);

/* ---------- 1 · decaying facts ---------- */
const overdue = rows.filter((r) => r.state === 'OVERDUE');
const soon = rows.filter((r) => r.state === 'DUE SOON');
const blocking = overdue.filter((r) => r.severity !== 'routine');

console.log(
  `\nDECAY REGISTRY  ${DECAYING_FACTS.length} tracked facts   ·   ` +
    `${overdue.length} overdue   ·   ${soon.length} due within ${SOON} days\n`
);

const show = showAll ? rows : rows.filter((r) => r.state !== 'CURRENT');
if (show.length === 0) {
  console.log('  Nothing due. Every tracked fact was read against its source inside its interval.');
} else {
  for (const r of show) {
    const mark = r.state === 'OVERDUE' ? '✗' : r.state === 'DUE SOON' ? '!' : '·';
    const when = r.daysLeft < 0 ? `${-r.daysLeft}d OVERDUE` : `due in ${r.daysLeft}d`;
    console.log(`  ${mark} ${pad(r.id, 9)} ${pad(r.severity.toUpperCase(), 9)} ${pad(when, 14)} (${iso(r.due)})`);
    console.log(`      ${r.what}`);
    console.log(`      source: ${r.source}`);
    if (r.state === 'OVERDUE') console.log(`      → ${r.onChange}`);
    console.log();
  }
}

/* ---------- 2 · held, cross-checked against dist ---------- */
let built = null;
const DIST = path.resolve('dist');
if (fs.existsSync(DIST)) {
  const walk = (dir, out = []) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, out);
      else if (e.name.endsWith('.html')) out.push(p);
    }
    return out;
  };
  built = walk(DIST).filter((f) =>
    /<meta name="robots" content="noindex/i.test(fs.readFileSync(f, 'utf8'))
  ).length;
}

const heldPages = HELD.reduce((n, h) => n + h.pages, 0);
const pending = HELD.filter((h) => !h.shelved);
const shelved = HELD.filter((h) => h.shelved);
console.log(line);
console.log(`\nHELD — written or scaffolded and deliberately not shipped\n`);
for (const h of pending) {
  const n = h.pages ? `${h.pages} page${h.pages === 1 ? '' : 's'}` : 'schema / copy only';
  console.log(`  ${pad(h.id, 20)} ${pad(n, 18)} gate ${h.gate}  (${h.askedOf})`);
  console.log(`      ${h.what}`);
  console.log(`      release: ${h.release}`);
  console.log();
}
if (shelved.length) {
  console.log(`  SHELVED — decided against for now. Not chased, not asked for again.\n`);
  for (const h of shelved) {
    console.log(`  ${pad(h.id, 20)} ${pad('shelved', 18)} gate ${h.gate}  (${h.askedOf})`);
    console.log(`      ${h.what}`);
    console.log(`      ${h.shelved}`);
    console.log();
  }
}
if (built !== null) {
  const flag = built === heldPages ? '·' : '!';
  console.log(`  ${flag} registry accounts for ${heldPages} held pages; dist/ carries ${built} noindex pages.`);
  if (built !== heldPages)
    console.log(`      A page held at noindex with no row above is held by accident. Reconcile before shipping.`);
  console.log();
}

/* ---------- 3 · queue ---------- */
console.log(line);
console.log(`\nPUBLISHING QUEUE — in order; a wave starts when the one above verifies clean\n`);
for (const w of QUEUE) {
  console.log(`  ${w.n}. ${pad(w.name, 26)} ${pad(w.pages, 44)}${w.blockedBy ? ' BLOCKED: ' + w.blockedBy : ''}`);
  console.log(`     ${w.why}`);
  console.log();
}

/* ---------- verdict ---------- */
console.log(line);
if (blocking.length) {
  console.log(
    `FAILED — ${blocking.length} fact(s) of critical or high severity are past their verification interval.`
  );
  console.log('The site may be publishing a statement that is no longer true. Read the sources before shipping.');
} else if (overdue.length) {
  console.log(`PASSED with ${overdue.length} routine fact(s) overdue.`);
} else {
  console.log(`PASSED — every tracked fact is inside its verification interval.`);
}
console.log(line + '\n');
process.exit(blocking.length ? 1 : 0);
