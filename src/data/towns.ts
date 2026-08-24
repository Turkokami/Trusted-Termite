/**
 * towns.ts — the differentiator data set.
 *
 * NO CAPACITY GATE. The owner wants all the work he can get; if demand outruns
 * one truck he hires. Build the full surface. The ONLY thing that decides how
 * much a town gets is how much real local data we hold for it — never how busy
 * he is this week.
 *
 * Keystone 6.3: each town row carries the facts that make its page impossible
 * to write as a template. The `tier` field decides how much gets built —
 * full (city + neighbourhoods + service matrix), triple, single, or scaffold.
 *
 * Neighbourhood lists come verbatim from D-09. Soil, housing and character
 * come from K-05, K-06 and K-07. Fire ant status is 4 TAC §19.101 (TDA
 * quarantine list) — the single most useful uncontested local fact available.
 *
 * VERIFY BEFORE PUBLISH: `distanceMiApprox` are road-distance estimates, not
 * measured. Confirm each against a real routing before it appears in copy.
 */

export type FireAntStatus = 'quarantined' | 'not-quarantined' | 'partial' | 'unverified';

export interface Town {
  slug: string;
  name: string;
  county: string;
  /** Approximate road miles from Seminole. ESTIMATE — verify before publish. */
  distanceMiApprox: number;
  direction: string;
  /** How much gets built. Gated on DATA held, never on workload. */
  tier: 'full' | 'triple' | 'single' | 'scaffold';
  /** D-09 verbatim. Empty array = we have no local proper nouns yet and the
   *  page does not ship until we do. */
  neighborhoods: string[];
  /** K-06 / K-07 / market research. */
  housing: string;
  soil: string;
  /** 4 TAC §19.101 — TDA red imported fire ant quarantine. */
  fireAnt: FireAntStatus;
  /** Local pest pressure notes, drawn from K-03 and AgriLife sources. */
  pestPressures: string[];
  /** Municipal weed / nuisance standard, where verified. Feeds the lawn and
   *  junk pages. `null` = not yet confirmed; do not write about it. */
  weedOrdinance: { heightInches: number; noticeDays: number | null; note: string } | null;
  /** Population, US Census QuickFacts 2025 estimate. */
  population: number;
  /** Short character line from K-05. */
  character: string;
}

export const TOWNS: Town[] = [
  {
    slug: 'seminole',
    name: 'Seminole',
    county: 'Gaines County',
    distanceMiApprox: 0,
    direction: 'home',
    tier: 'full',
    neighborhoods: [
      'Countryside Estates',
      'Arrowhead Estates',
      'Copper Ridge',
      'Country View Estates',
      'Diamond Hill Estates',
    ],
    housing:
      'A mix of newer subdivisions, older in-town properties, manufactured and mobile homes, and a large number of rural and acreage properties on private and county roads outside the city limits.',
    soil:
      'Sandy soil, caliche, and areas with a mix of clay. Some properties sit on very loose sand; others have extremely hard caliche layers. New construction often has disturbed or imported fill around the foundation.',
    fireAnt: 'not-quarantined',
    pestPressures: [
      'Striped bark scorpions — peak July and August',
      'Ants, spiders and occasional invaders from surrounding fields',
      'Rodents moving indoors October through November',
      'Red harvester ants in open yards and play areas',
    ],
    weedOrdinance: null, // eCode360 blocks automated access — one phone call to the city inspector
    population: 7730,
    character:
      'Open land, agricultural areas and homes close to fields, with the oilfield and the cotton and peanut country around it.',
  },
  {
    slug: 'seagraves',
    name: 'Seagraves',
    county: 'Gaines County',
    distanceMiApprox: 16,
    direction: 'northeast',
    tier: 'triple',
    neighborhoods: [],
    housing: 'Older in-town housing stock with surrounding farm and acreage property.',
    soil: 'Sandy soils and caliche, the same profile as the rest of Gaines County.',
    fireAnt: 'not-quarantined',
    pestPressures: [
      'Scorpions and spiders through the summer',
      'Field-driven ant and rodent pressure',
    ],
    weedOrdinance: null,
    population: 2385,
    character: 'An oilfield and agricultural community sixteen miles up the road from the shop.',
  },
  {
    slug: 'denver-city',
    name: 'Denver City',
    county: 'Yoakum County',
    distanceMiApprox: 22,
    direction: 'northwest',
    tier: 'triple',
    neighborhoods: [],
    housing: 'In-town residential with oilfield housing and surrounding farmland.',
    soil: 'Sandy and caliche soils typical of the Yoakum County plains.',
    fireAnt: 'not-quarantined',
    pestPressures: ['Scorpions', 'Rodents in outbuildings and equipment yards'],
    weedOrdinance: {
      heightInches: 36,
      noticeDays: 30,
      note: 'Properties outside city limits fall under Texas Health & Safety Code §343.011 — weeds over 36 inches within 300 feet of a residence.',
    },
    population: 4368,
    character: 'An oilfield town on the New Mexico side of the county line, surrounded by farmland.',
  },
  {
    slug: 'andrews',
    name: 'Andrews',
    county: 'Andrews County',
    distanceMiApprox: 40,
    direction: 'south',
    tier: 'full',
    neighborhoods: [],
    housing: 'High owner-occupancy — 76.7% — with a stable stock of family homes and surrounding acreage.',
    soil: 'Sandy and caliche soils, with the same foundation conditions as Gaines County.',
    fireAnt: 'not-quarantined',
    pestPressures: [
      'Desert bark scorpions and striped bark scorpions',
      'Black widow and brown recluse spiders',
      'Rodent pressure from surrounding farmland',
    ],
    weedOrdinance: {
      heightInches: 12,
      noticeDays: 10,
      note: '12 inches on platted lots under an acre, 18 inches on undeveloped tracts over an acre. Immediate action above four feet. Ordinances 1080/1089.',
    },
    population: 13665,
    character: 'An oilfield economy with surrounding farmland, and no full-service pest company based in town.',
  },
  {
    slug: 'lamesa',
    name: 'Lamesa',
    county: 'Dawson County',
    distanceMiApprox: 41,
    direction: 'east',
    tier: 'triple',
    neighborhoods: [],
    housing: 'Older housing stock with farm and rural property around it.',
    soil: 'Farmed soils with clay content, differing from the sand around Seminole.',
    fireAnt: 'not-quarantined',
    pestPressures: ['Field-driven ants and rodents', 'Scorpions and spiders in summer'],
    weedOrdinance: null,
    population: 8103,
    character: 'The Cotton Patch of Texas — farm country, with the pest pressure that comes with it.',
  },
  {
    slug: 'brownfield',
    name: 'Brownfield',
    county: 'Terry County',
    distanceMiApprox: 41,
    direction: 'north-northeast',
    tier: 'triple',
    neighborhoods: [],
    housing: 'In-town residential and surrounding agricultural property.',
    soil: 'Sandy Terry County soils with caliche layers.',
    fireAnt: 'unverified', // Terry County not confirmed on the TDA list — do not claim either way
    pestPressures: ['Scorpions', 'Ants and rodents from surrounding farmland'],
    weedOrdinance: null,
    population: 9000,
    character: 'Farm country between Seminole and Lubbock, on the route north.',
  },
  {
    slug: 'big-spring',
    name: 'Big Spring',
    county: 'Howard County',
    distanceMiApprox: 95,
    direction: 'southeast',
    tier: 'triple',
    neighborhoods: [],
    housing: 'Mixed older housing stock, 64.7% owner-occupied.',
    soil: 'Drier Howard County soils with caliche.',
    fireAnt: 'quarantined',
    pestPressures: ['Fire ants — Howard County IS quarantined', 'Scorpions', 'Rodents'],
    weedOrdinance: null,
    population: 22290,
    character: 'The furthest point on the route, and a market in decline — lowest build priority.',
  },
  {
    slug: 'midland',
    name: 'Midland',
    county: 'Midland County',
    distanceMiApprox: 75,
    direction: 'southeast',
    tier: 'full',
    neighborhoods: [
      'Green Tree',
      'Grassland Estates',
      'Saddle Club',
      'Greathouse',
      'Briarwood',
      'Polo Park',
    ],
    housing:
      'Much more developed and densely populated than Seminole — more commercial property, apartments and newer subdivisions, with north and northwest Midland the strongest area.',
    soil: 'Developed and disturbed soils, with imported fill common around newer foundations.',
    fireAnt: 'quarantined',
    pestPressures: [
      'Fire ants — Midland County IS quarantined',
      'Subterranean termites in newer slab construction',
      'Scorpions',
      'Heavy oilfield activity changing where pests come from',
    ],
    weedOrdinance: { heightInches: 18, noticeDays: null, note: 'Grass and weeds under 18 inches on yards and vacant lots.' },
    population: 147615,
    character: 'The highest-value market on the route, and the most contested.',
  },
  {
    slug: 'odessa',
    name: 'Odessa',
    county: 'Ector County',
    distanceMiApprox: 65,
    direction: 'south',
    tier: 'full',
    neighborhoods: ['Mission Estates', 'Parks Bell Ranch'],
    housing:
      'North and northeast Odessa residential plus commercial property. 21.3% rental vacancy at the 2020 census — high turnover, which drives bed bug and roach cleanout work.',
    soil: 'Ector County caliche and developed fill.',
    fireAnt: 'quarantined',
    pestPressures: ['Fire ants — Ector County IS quarantined', 'Bed bugs in high-turnover rentals', 'Scorpions', 'Roaches'],
    weedOrdinance: {
      heightInches: 12,
      noticeDays: 7,
      note: 'Grass, weeds or wild brush over twelve inches. Major equipment $56/hr, labour $21/hr, $125 administration fee, landfill $52.50/ton. 48-inch emergency abatement without notice.',
    },
    population: 122707,
    character: 'A renter-heavy market with real turnover, and the strongest junk and cleanout demand on the route.',
  },
  {
    slug: 'lubbock',
    name: 'Lubbock',
    county: 'Lubbock County',
    distanceMiApprox: 75,
    direction: 'northeast',
    tier: 'full',
    neighborhoods: [],
    housing:
      'A larger urban environment — older established neighbourhoods, apartment communities and commercial property, with surrounding agricultural land.',
    soil: 'Lubbock County soils with irrigation and landscaping influence.',
    fireAnt: 'partial',
    pestPressures: [
      'Fire ants — a portion of Lubbock County is quarantined',
      'Mosquitoes from the playa lake system — the city runs a Vector Control programme',
      'Bed bugs in apartment communities',
      'Wind, dust, irrigation and nearby fields all moving pest activity',
    ],
    weedOrdinance: {
      heightInches: 8,
      noticeDays: 7,
      note: 'Eight inches averaged across the lot — the strictest standard in the region. $175 administrative fee per occurrence, lien at 10% interest.',
    },
    population: 273071,
    character: 'The Hub City — the largest market on the route and the furthest he will drive.',
  },
  {
    slug: 'kermit',
    name: 'Kermit',
    county: 'Winkler County',
    distanceMiApprox: 85,
    direction: 'south',
    tier: 'scaffold',
    neighborhoods: [],
    housing: 'Highest owner-occupancy in the region at 84.5% — a stable stock of family homes.',
    soil: 'Dry western-Basin caliche and sand.',
    fireAnt: 'quarantined',
    pestPressures: ['Fire ants — Winkler County IS quarantined', 'Scorpions sheltering under caliche pads and equipment yards', 'Rodents in outbuildings'],
    weedOrdinance: null,
    population: 6019,
    character: 'The dry western edge of the Basin, where caliche pads and equipment yards collect the debris scorpions shelter under. No pest company is based in town.',
  },
  {
    slug: 'stanton',
    name: 'Stanton',
    county: 'Martin County',
    distanceMiApprox: 90,
    direction: 'east',
    tier: 'scaffold',
    neighborhoods: [],
    housing: 'Small-town residential with surrounding farm and ranch property.',
    soil: 'Martin County farmed soils with caliche.',
    fireAnt: 'unverified',
    pestPressures: ['Scorpions', 'Field-driven ants and rodents'],
    weedOrdinance: null,
    population: 2500,
    character: 'On the road between Midland and Big Spring, and squarely on the route east.',
  },
];

/** D-07 — he wants these and does not run them yet. They are built as real
 *  pages at tier 'scaffold' so the day he starts serving them the switch is a
 *  one-line change, not a new build. They stay noindex until then. */
export const SCAFFOLD_TOWNS = TOWNS.filter((t) => t.tier === 'scaffold');

export const townBySlug = (slug: string) => TOWNS.find((t) => t.slug === slug);
export const publishedTowns = () => TOWNS.filter((t) => t.tier !== 'scaffold');
