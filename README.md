# Trusted Termite & Pest Solutions — Keystone build

Astro static site. Tier 1.0 built to scale to 2.0. Build track 7A.

## Status

**Phase 0** — work order written, not yet executed on the live site → `PHASE-0-WORK-ORDER.md`
**Phase 1** — entity foundation, data layer, schema graph, templates, harness → **complete**
**Phase 2+** — money pages, geo surface, authority layer → not started (blocked on budget)

29 routes build. One page — `/locations/seminole/` — is written to full depth and
is the gold-standard exemplar every later page matches. Twenty-one routes exist as
`noindex` drafts so the link graph is whole and the harness can check it; they do
not ship until they are written past the 3,000-word M1 floor.

## Commands

```bash
npm install
npm run dev        # local
npm run build      # → dist/
npm run verify     # the Keystone harness — run between every content wave
```

`npm run verify` checks dead links, one H1 per page, title/description bands,
duplicate sentences across pages, the M1 word-count floor, and the schema graph
(single emitter, node completeness, no @id collisions, no unverified
aggregateRating). It exits 1 on any hard failure.

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
scripts/verify.mjs     the verification harness.
CONTENT_BRIEF.md       read before writing a single word.
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
