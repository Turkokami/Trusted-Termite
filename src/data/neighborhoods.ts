/**
 * neighborhoods.ts — the hyper-local layer.
 *
 * READ THIS FIRST — the file no longer feeds a page route.
 * There is no dynamic neighbourhood route any more. It was scaffolding and its
 * job is done; every neighbourhood page that ships is hand-written to the M1
 * floor in its own file under src/pages/locations/{town}/.
 *
 * The eight Midland and Odessa entries below have pages of their own, written
 * from primary municipal records — Midland's public ArcGIS Subdivision layer
 * (plat dates, surveyors, cabinet/page) and its floodplain/playa mapping, and
 * Odessa's Plats and Subdivision services (per-filing acreage). Those entries
 * are kept because the town pages render their names and character lines.
 *
 * THE FIVE SEMINOLE ENTRIES DO NOT HAVE PAGES AND ARE NOT GOING TO.
 * August 2026: nothing publishes anything verifiable about them. They return
 * listing aggregators only, and a search for "Copper Ridge" mostly returns a
 * different subdivision near New Braunfels. Under CONTENT_BRIEF §10 that means
 * no page ships. Rather than pad five pages around five proper nouns, the
 * material was folded into an "areas we work" section on /locations/seminole/,
 * which says out loud why it is written that way. These entries exist to feed
 * that section. Do not resurrect them as pages without new, checkable local
 * fact — the honest version already exists on the town page.
 *
 * No capacity gate. What gates this file is data, not ambition: a neighbourhood page only
 * exists where the owner named a real place at D-09. Lubbock is deliberately
 * empty because he named no Lubbock neighbourhoods — and as of August 2026 that
 * tier is SHELVED rather than pending, so the emptiness is now a decision and
 * not an outstanding task. It is still not an invitation to invent one.
 */

export interface Neighborhood {
  slug: string;
  name: string;
  town: string;          // town slug
  /** Why this area differs from the rest of the town. Written from D-09 plus
   *  the housing and soil notes at K-05 / K-06 / K-07. */
  character: string;
  /** Dominant construction — drives the termite and rodent angle. */
  housing: string;
  /** What actually gets called in from here. */
  pressures: string[];
}

export const NEIGHBORHOODS: Neighborhood[] = [
  /* ---- Seminole (D-09, verbatim list) ---- */
  {
    slug: 'countryside-estates',
    name: 'Countryside Estates',
    town: 'seminole',
    character: 'A newer Seminole subdivision on the edge of town, close enough to open ground that field pressure reaches the perimeter.',
    housing: 'Slab-on-grade construction, much of it recent, with imported fill common around the foundations.',
    pressures: ['Scorpions through July and August', 'Ants and spiders off the surrounding ground', 'Subterranean termite risk concentrated at plumbing penetrations and expansion joints'],
  },
  {
    slug: 'arrowhead-estates',
    name: 'Arrowhead Estates',
    town: 'seminole',
    character: 'An established Seminole subdivision with mature landscaping, which changes where scorpions and spiders shelter.',
    housing: 'Predominantly slab homes with settled landscaping and irrigation.',
    pressures: ['Scorpions sheltering in landscaping and under stored material', 'Irrigation boxes as a recurring entry point', 'Occasional rodent pressure in autumn'],
  },
  {
    slug: 'copper-ridge',
    name: 'Copper Ridge',
    town: 'seminole',
    character: 'A Seminole subdivision where newer construction meets the sandier ground west of the town centre.',
    housing: 'Newer slab construction on sandy soil with caliche layers underneath.',
    pressures: ['Scorpions', 'Ant activity in open yards', 'Harvester ant mounds on unlandscaped lots'],
  },
  {
    slug: 'country-view-estates',
    name: 'Country View Estates',
    town: 'seminole',
    character: 'Larger lots on the town edge, with more open ground per property and more perimeter to treat.',
    housing: 'A mix of slab homes and larger-lot properties, some with outbuildings.',
    pressures: ['Rodents in outbuildings and equipment storage', 'Scorpions', 'Field-driven ant and spider pressure'],
  },
  {
    slug: 'diamond-hill-estates',
    name: 'Diamond Hill Estates',
    town: 'seminole',
    character: 'A Seminole subdivision with a mix of build ages, which means a mix of foundation types on the same street.',
    housing: 'Slab and some older construction, so the termite conversation genuinely differs house to house.',
    pressures: ['Scorpions', 'Termite inspection demand on the older stock', 'Rodents from October onward'],
  },

  /* ---- Midland (D-09, verbatim list) ---- */
  {
    slug: 'green-tree',
    name: 'Green Tree',
    town: 'midland',
    character: 'An established north-west Midland area with mature trees and irrigation — a very different environment from the open ground around Seminole.',
    housing: 'Established homes with mature landscaping and long-standing irrigation.',
    pressures: ['Fire ants — Midland County IS quarantined', 'Subterranean termites', 'Spiders and scorpions in landscaping'],
  },
  {
    slug: 'grassland-estates',
    name: 'Grassland Estates',
    town: 'midland',
    character: 'North-west Midland residential, in the part of the city where newer development meets older stock.',
    housing: 'Predominantly slab construction across a range of build years.',
    pressures: ['Fire ants', 'Termites at foundation penetrations', 'General crawling insects through summer'],
  },
  {
    slug: 'saddle-club',
    name: 'Saddle Club',
    town: 'midland',
    character: 'A north Midland area with larger properties and more ground per home.',
    housing: 'Larger-lot homes, some with outbuildings and equipment storage.',
    pressures: ['Rodents in outbuildings', 'Fire ants', 'Scorpions'],
  },
  {
    slug: 'greathouse',
    name: 'Greathouse',
    town: 'midland',
    character: 'A north-west Midland residential area in one of the faster-growing parts of the city.',
    housing: 'Newer slab construction, much of it recent enough that pre-treat history matters.',
    pressures: ['Fire ants', 'New-construction termite considerations', 'Ants and spiders'],
  },
  {
    slug: 'briarwood',
    name: 'Briarwood',
    town: 'midland',
    character: 'An established Midland neighbourhood with settled landscaping and older infrastructure.',
    housing: 'Older established homes where foundation type and age drive the termite conversation.',
    pressures: ['Termites in older stock', 'Fire ants', 'Rodents in autumn'],
  },
  {
    slug: 'polo-park',
    name: 'Polo Park',
    town: 'midland',
    character: 'A north-west Midland residential area, part of the growth corridor on that side of the city.',
    housing: 'Newer residential construction on developed and often imported fill.',
    pressures: ['Fire ants', 'Termite risk at slab penetrations', 'Summer crawling insects'],
  },

  /* ---- Odessa (D-09, verbatim list) ---- */
  {
    /** CORRECTED Aug 2026. An earlier version described this as an area "with
     *  real rental turnover" and led on bed bugs, citing Odessa's 21.3% rental
     *  vacancy rate at the 2020 census. That figure is a CITY-WIDE statistic
     *  and says nothing about this subdivision; no source supports a rental
     *  characterisation here. Research found the opposite profile: a 296.8-acre
     *  covenanted addition of roughly 584 homes with an active owners
     *  association enforcing a no-weeds landscaping standard. The claim is
     *  removed rather than softened — see /locations/odessa/mission-estates/,
     *  which is written to depth off the association's own published rules and
     *  the City of Odessa plat records. */
    slug: 'mission-estates',
    name: 'Mission Estates',
    town: 'odessa',
    character:
      'A covenanted north-east Odessa subdivision of about 584 homes across 296.8 platted acres, laid out from 1983 and still being extended — irrigated and alley-served, which is what shapes the pest pressure.',
    housing:
      'Four decades of building on the same streets: a 1983–1985 core, infill through the 1990s and 2000s, a substantial second wave in 2008 and a 13th Filing recorded in 2023. Slab construction of widely varying age.',
    pressures: [
      'Fire ants — Ector County IS on the federal quarantine, and irrigated turf is the habitat they exploit best',
      'Rodents moving along the alleys, which run the full length of each block',
      'Termites at irrigated foundations, whatever the rainfall',
      'Scorpions through the dry months, following moisture indoors',
    ],
  },
  {
    slug: 'parks-bell-ranch',
    name: 'Parks Bell Ranch',
    town: 'odessa',
    character: 'A north Odessa residential area with newer development and adjoining commercial property.',
    housing: 'Newer slab construction with developed and imported fill around foundations.',
    pressures: ['Fire ants', 'Termite risk at foundation penetrations', 'Scorpions and general pests'],
  },
];

export const neighborhoodsOf = (townSlug: string) => NEIGHBORHOODS.filter((n) => n.town === townSlug);
export const neighborhoodBySlug = (town: string, slug: string) =>
  NEIGHBORHOODS.find((n) => n.town === town && n.slug === slug);

/**
 * LUBBOCK — SHELVED, August 2026, at the agency's direction. Not a TODO.
 *
 * D-09 named no Lubbock neighbourhoods ("residential properties, apartment
 * communities, commercial properties"), and the follow-up answer named
 * Wolfforth, which is a separate incorporated city rather than a Lubbock
 * neighbourhood. Rather than keep asking, the tier has been taken off the
 * pending list; `HELD-LUBBOCK-HOODS` in maintenance.ts carries the full
 * reasoning and the condition that reopens it.
 *
 * Two things that do NOT change because of the shelving:
 *  1. No Lubbock neighbourhood page gets written without real place names. The
 *     eight that shipped were built from Midland's and Odessa's published plat,
 *     surveyor and floodplain records; Lubbock publishes no comparable service
 *     that we located, so this tier would need owner knowledge rather than
 *     municipal GIS. Shelving removes the question, not the standard.
 *  2. /locations/lubbock/ ships as it is and is unaffected. It never depended
 *     on this file having Lubbock entries.
 */
