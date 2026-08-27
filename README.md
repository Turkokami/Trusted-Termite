# Trusted Termite & Pest Solutions — Keystone build

Astro static site. Build track 7A (Keystone Part 0.1).

**No capacity cap.** The owner wants all the work he can get; if demand outruns
one truck he hires. The build targets the full geographic and service surface.
The only thing that limits any page is whether we hold real local data for it —
never how busy he is this week.

## Status

| Phase | | |
|---|---|---|
| 0 | Defect remediation | work order written, **not yet executed on the live site** → `PHASE-0-WORK-ORDER.md` |
| 1 | Entity and schema foundation | complete |
| 2 | Money pages | complete — all 12 services |
| 3 | Geographic surface | complete — 11 town pages; neighbourhood layer scaffolded and queued |
| 4 | Authority layer | complete — compliance cluster, pest library, commercial verticals |
| 5 | Blue-ocean clusters | complete — Spanish tree started, WDI cluster built and parked |
| 6 | Cadence | complete → `CADENCE.md` + `src/data/maintenance.ts` |
| — | Wave 1 · neighbourhood layer | complete — 8 pages shipped from municipal plat and floodplain records; Seminole's 5 folded into the town page, see CONTENT_BRIEF §12c |
| — | Wave 2 · Spanish service tree | complete — all 12 services now have a Spanish page at the M1 floor, hreflang reciprocal both ways. Drift rule: `I18N-01` |
| — | Wave 3 · pest library | complete — all 12 entries written from AgriLife/CDC/DSHS/APHIS and peer-reviewed sources, with conflicting figures reported as conflicting. The index throws at build time if an entry ships unwritten. Accuracy rules: `BIO-01` |
| — | Wave 4 · service problem spokes | complete — 8 pages at `/services/{service}/{problem}/`, registered in `src/data/spokes.ts` and reconciled against the built routes in both directions by the harness |

**88 routes build. 88 indexable pages, every one past the 3,000-word M1 floor.
Nothing is held at `noindex`. 0 errors, 0 warnings.**

The WDI pair — the compliance explainer and the inspection service page — was
the last thing parked. Both were written to full depth months before either
could ship and sat behind a single boolean until the owner gave the operating
limit the page needed: a **90-mile WDI radius**, separate from and shorter than
the 100-mile general territory, because a report tied to a closing date is a
different promise from a pest call that can move to Thursday. Both shipped on
that one edit.

Held content is never shipped early and never shipped thin. What remains in the
held ledger is schema and copy, not pages — a rating that needs us to read the
live profile, a vertical that needs one real job, and community items that need
him to join something.

### Next, in order

Nothing. The build is complete and nothing is waiting on writing capacity or on
an owner answer.

What is left is the maintenance loop, which is the point of Phase 6: run
`npm run cadence` monthly, re-read whatever is due against its source, and act
on the three schema-and-copy items in `HELD` if they ever unblock. See
`CADENCE.md` §3 and §5.

The Lubbock neighbourhood tier was shelved in August 2026 rather than answered —
recorded in `HELD` with the condition that would reopen it, and not to be put
back on a list the owner is asked to work through.

## Going live

`DEPLOY.md` is the launch runbook — written to be handed to Claude Code on the
operator's machine and worked through top to bottom. It covers the pre-flight,
the Vercel deploy, the point where it stops and waits for a human, the domain
cutover, and the post-cutover verification.

`DNS-CUTOVER-GUIDE.pdf` is the domain half: live registry and DNS readings taken
27 August 2026, both cutover routes, and the rollback values. Read it before
anything touches DNS. Two findings in it are time-sensitive — the domain expires
**29 October 2026**, and it is transfer-locked at Name.com.

## Commands

```bash
npm install
npm run dev        # local
npm run build      # → dist/
npm run verify     # the Keystone harness — run between every content wave
npm run cadence    # the decay report — run the first working day of each month
```

`npm run verify` checks dead links, one H1 per page, title/description bands,
duplicate sentences across pages, the M1 word-count floor, and the schema graph
(single emitter, node completeness, no @id collisions, no unverified
aggregateRating). It also fails on any cited outside fact that has gone
unverified past its interval. It exits 1 on any hard failure.

`npm run cadence` is the other half: what needs re-reading against its source,
what is held and why, and what gets written next. See `CADENCE.md`.

## Where things live

```
src/data/business.ts   every NAP, licence, phone and social string. Nothing is
                       hardcoded in a page body. Each field cites the intake
                       question that authorised it.
src/data/towns.ts      the differentiator data set — soil, housing, neighbourhoods,
                       fire ant status, ordinance. Decides how much each town gets.
src/data/services.ts   the confirmed service tree, plus an EXCLUDED list recording
                       what he does NOT do and why, so it cannot creep back in.
src/lib/schema.ts      the ONLY emitter of structured data. Seven-node @graph.
src/layouts/           BaseLayout — the only place <head> and JSON-LD are written.
src/data/maintenance.ts  the decay registry, held ledger and publishing queue.
                       Every outside fact the site cites, its source, and when a
                       human last read it. Rendered by Verified.astro; read by
                       both scripts.
scripts/verify.mjs     the verification harness.
scripts/cadence.mjs    the decay report.
CONTENT_BRIEF.md       read before writing a single word.
CADENCE.md             what happens after the build — the publishing rhythm, the
                       unblock protocol and the same-day escalation list.
PHASE-0-WORK-ORDER.md  the live-site defect fixes.
REDIRECTS.md           the 301 map.
```

## Before deploying

1. Set the Vercel **framework preset explicitly** to Astro. If it is unset every
   route returns a platform 404 even though the build succeeded.
2. Confirm the domain registrant is the client, not the previous vendor.
3. `git add -A` from day one — a selective add is how a first deploy ships 0 pages.
4. Re-measure Core Web Vitals logged-out before claiming a Performance score.
5. Read the live Google Business Profile and set `reviews.verified = true` only
   after you have seen the count and rating yourself. Until then no
   `aggregateRating` is emitted, by design.
