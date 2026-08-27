/**
 * 301 map — legacy Ailanding URLs → the new taxonomy.
 *
 * SINGLE SOURCE OF TRUTH. `scripts/gen-static.mjs` writes these into
 * vercel.json at build time, and `scripts/verify.mjs` §8 asserts that every
 * target below is a page that actually got built. A redirect pointing at a
 * 404 is worse than no redirect: it converts a recoverable dead link into a
 * confident one, and search engines treat it as a soft 404.
 *
 * RULES (Keystone Part 18J):
 *  - Every entry points at its FINAL destination. No A→B→C chains.
 *  - 301, not 302. These are permanent moves and the equity should transfer.
 *  - Sources are written WITHOUT a trailing slash HERE, but gen-static.mjs
 *    appends one before writing vercel.json. Vercel normalises the trailing
 *    slash BEFORE it evaluates redirects, so a slashless source is unreachable
 *    — /faq is 308'd to /faq/ first, and a rule keyed on /faq never fires.
 */
export interface Redirect {
  /** Legacy path on the Ailanding site, no trailing slash. */
  from: string;
  /** Destination in the new taxonomy, WITH trailing slash. */
  to: string;
  /** Why this destination and not the obvious one. Only where it is not 1:1. */
  note?: string;
}

export const REDIRECTS: Redirect[] = [
  { from: '/pest-control-seminole', to: '/locations/seminole/' },
  { from: '/pest-control-seagraves', to: '/locations/seagraves/' },
  { from: '/pest-control-denver-city', to: '/locations/denver-city/' },
  { from: '/pest-control-andrews', to: '/locations/andrews/' },
  { from: '/pest-control-lamesa', to: '/locations/lamesa/' },
  { from: '/pest-control-big-spring', to: '/locations/big-spring/' },
  { from: '/pest-control-midland', to: '/locations/midland/' },
  { from: '/pest-control-odessa', to: '/locations/odessa/' },
  { from: '/pest-control-lubbock', to: '/locations/lubbock/' },
  {
    from: '/pest-control-kermit',
    to: '/locations/kermit/',
    note:
      'CHANGED August 2026. This used to point at the locations hub, because at the time no Kermit page existed and D-01 had him not serving it. A by-request Kermit page has since shipped — it states twice, above the fold, that Winkler County is outside the nine confirmed counties and that the town is served by request. So a 1:1 redirect is now the honest destination: the visitor lands on a page that answers their question truthfully instead of a hub that makes them hunt. If the by-request page is ever withdrawn, this must go back to /locations/.',
  },
  { from: '/services', to: '/services/' },
  { from: '/lawn-care', to: '/services/lawn-care/' },
  { from: '/about', to: '/about/' },
  { from: '/contact', to: '/contact/' },
  {
    from: '/schedule-service',
    to: '/contact/',
    note: 'No booking system in the new build — he answers his own phone. The contact page is the honest equivalent.',
  },
  {
    from: '/testimonials',
    to: '/',
    note:
      'No equivalent page and deliberately so. The six testimonials on the old site carried no platform, no dates and no attribution. Reviews belong on the Google Business Profile where they are verifiable. Revisit only if reviews.verified goes true.',
  },
  {
    from: '/faq',
    to: '/',
    note:
      'A removal, not a migration — the old FAQ page was copied content and was struck in Phase 0 (P0-1). Do not recreate it.',
  },
];
