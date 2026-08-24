/**
 * neighborhoods.ts — the hyper-local layer.
 *
 * No capacity gate. What gates this file is data, not ambition: a neighbourhood page only
 * exists where the owner named a real place at D-09. Lubbock is deliberately
 * empty because he named no Lubbock neighbourhoods — that is a TODO(fact), not
 * an invitation to invent one.
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
    slug: 'mission-estates',
    name: 'Mission Estates',
    town: 'odessa',
    character: 'North-east Odessa residential, in a part of the city with real rental turnover.',
    housing: 'A mix of owner-occupied and rental property — Odessa ran a 21.3% rental vacancy rate at the 2020 census.',
    pressures: ['Bed bugs, driven by turnover', 'Fire ants — Ector County IS quarantined', 'Roaches', 'Scorpions'],
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
 * TODO(fact) — Lubbock. D-09 named no Lubbock neighbourhoods ("residential
 * properties, apartment communities, commercial properties"). One question to
 * the owner unlocks 4–6 more pages in the largest market on the route. Do not
 * invent them.
 */
