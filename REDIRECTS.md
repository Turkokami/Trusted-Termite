# 301 map — legacy Ailanding URLs → new taxonomy

**This file is documentation. `src/data/redirects.ts` is the source of truth.**
`npm run build` writes the map into `vercel.json`, and `scripts/verify.mjs` §8
fails the build if the two ever disagree, if a redirect points at a page that
was not built, if a source starts a chain, or if anything is emitted as a 302
instead of a 301. The table below is generated from the same data by hand and
should be regenerated if the data changes.

Every entry points at its FINAL destination. No A→B→C chains — Keystone Part 18J.

| Legacy URL | 301 → | Target status |
|---|---|---|
| `/pest-control-seminole` | `/locations/seminole/` | live |
| `/pest-control-seagraves` | `/locations/seagraves/` | live |
| `/pest-control-denver-city` | `/locations/denver-city/` | live |
| `/pest-control-andrews` | `/locations/andrews/` | live |
| `/pest-control-lamesa` | `/locations/lamesa/` | live |
| `/pest-control-big-spring` | `/locations/big-spring/` | live |
| `/pest-control-midland` | `/locations/midland/` | live |
| `/pest-control-odessa` | `/locations/odessa/` | live |
| `/pest-control-lubbock` | `/locations/lubbock/` | live |
| `/pest-control-kermit` | `/locations/kermit/` | live — **changed**, see note |
| `/services` | `/services/` | live |
| `/lawn-care` | `/services/lawn-care/` | live |
| `/about` | `/about/` | live |
| `/contact` | `/contact/` | live |
| `/schedule-service` | `/contact/` | live |
| `/testimonials` | `/` | deliberate — no equivalent page |
| `/faq` | `/` | deliberate — a removal, not a migration |

All seventeen targets are built pages verified by the harness on every build.

## Notes

- **Kermit changed in August 2026.** This used to point at the locations hub,
  because at the time no Kermit page existed and D-01 had him not serving the
  town. A by-request page has since shipped, and it states twice above the fold
  that Winkler County is outside the nine confirmed counties and that the town
  is served by request. A 1:1 redirect is now the honest destination: the
  visitor lands on a page that answers their question truthfully rather than a
  hub that makes them hunt for it. **If that page is ever withdrawn, this must
  go back to `/locations/`.**
- **`/schedule-service`** has no equivalent because there is no booking system —
  he answers his own phone. `/contact/` is the honest target.
- **`/testimonials`** has no equivalent and that is deliberate. The six
  testimonials on the old site carried no platform, no dates and no attribution.
  Reviews belong on the Google Business Profile where they are verifiable.
  Revisit only if `reviews.verified` goes true.
- **`/faq`** is a removal, not a migration — the old page was copied content and
  was struck in Phase 0 (P0-1). Do not recreate it.

## Verifying after switchover

Redirects are served by Vercel, so they cannot be tested until the domain
resolves to Vercel. After cutover:

```bash
for p in /pest-control-seminole /pest-control-kermit /services /faq; do
  curl -sSI "https://www.trustedtermiteandpest.com$p" | head -2
done
```

Each should return `HTTP/2 301` and a `location:` header pointing at the target
in the table above. Then confirm each target itself returns `200`.
