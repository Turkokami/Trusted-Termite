# 301 map — legacy Ailanding URLs → new taxonomy

Every rewrite is domain-guarded and points at its FINAL destination. No A→B→C
chains. Verify each source returns 301 and each target returns a live 200
*before* switchover — Keystone Part 18J.

| Legacy URL | 301 → | Status |
|---|---|---|
| `/pest-control-seminole` | `/locations/seminole/` | target written |
| `/pest-control-seagraves` | `/locations/seagraves/` | target draft |
| `/pest-control-denver-city` | `/locations/denver-city/` | target draft |
| `/pest-control-andrews` | `/locations/andrews/` | target draft |
| `/pest-control-lamesa` | `/locations/lamesa/` | target draft |
| `/pest-control-big-spring` | `/locations/big-spring/` | target draft |
| `/pest-control-midland` | `/locations/midland/` | target draft |
| `/pest-control-odessa` | `/locations/odessa/` | target draft |
| `/pest-control-lubbock` | `/locations/lubbock/` | target draft |
| `/pest-control-kermit` | `/locations/` | **not served** (D-01) — to the hub, not a page |
| `/services` | `/services/` | live |
| `/lawn-care` | `/services/lawn-care/` | target draft |
| `/about` | `/about/` | live |
| `/contact` | `/contact/` | live |
| `/schedule-service` | `/contact/` | live |
| `/testimonials` | `/` | no testimonials page in the new build — reviews live on the Google profile |
| `/faq` | `/` | **P0 removal** — see PHASE-0-WORK-ORDER.md |

## Notes

- **Kermit** is deliberately not a 1:1 redirect. D-01 confirms he does not
  currently serve it; sending traffic to a page that does not exist for a town he
  will not drive to generates calls he declines. It goes to the locations hub.
- **`/testimonials`** has no equivalent. The six on-site testimonials carry no
  platform, no dates and no attribution. Reviews belong on the Google Business
  Profile, where they are verifiable.
- **`/faq`** is a removal, not a migration. See P0-1.
