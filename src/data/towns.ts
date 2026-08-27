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
  /** TRUE where the owner does NOT run the town on any route and would only
   *  drive it if somebody called (D-07, answered Aug 2026). Every surface that
   *  lists towns must label these differently from the ones he actually runs —
   *  a grid that renders a by-request town identically to a served one is a
   *  coverage claim made by omission. Absent means routine service. */
  byRequest?: boolean;
  /** Local pest pressure notes, drawn from K-03 and AgriLife sources. */
  pestPressures: string[];
  /** Municipal weed / nuisance standard, where verified. Feeds the lawn and
   *  junk pages. `null` = not yet confirmed; do not write about it. */
  weedOrdinance: {
    heightInches: number;
    /** Second threshold where a town sets one by lot size (Andrews). */
    heightInchesLarge?: number;
    noticeDays: number | null;
    /** Citation as it appears in the town's own code. */
    cite: string;
    /** Does one notice cover repeat violations for a year? Nearly all do. */
    /** TRUE where one notice can cover a later violation of the same kind
     *  without a fresh letter. Nearly universal on this route. */
    annualNotice: boolean;
    /** How long that memory lasts. Absent means the ordinary twelve months.
     *  Kermit runs TWENTY-FOUR (§ 7.02.009) — the only town on the route that
     *  does, and the single most consequential ordinance difference we have
     *  found. Do not fold it back into annualNotice to tidy the type. */
    repeatWindowMonths?: number;
    /** Height above which the city may abate with no notice at all. */
    noNoticeAboveInches?: number;
    /** TRUE when the height and notice figures came from the city office rather
     *  than from the published ordinance text. The comparison table marks these
     *  rows so a reader can tell which numbers we read ourselves and which were
     *  relayed to us. Default (absent) means we read the published text. */
    figuresFromCityOffice?: boolean;
    note: string;
  } | null;
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
    /** K-04 — RESOLVED Aug 2026. The section number is verified against the
     *  city's own published code (ch. 6 Health and Sanitation, art. 6.400,
     *  § 6.403 "Weeds and Other Unsightly Vegetation"); the FIGURES are not.
     *  eCode360 serves Seminole's table of contents but blocks the section
     *  text, so the height, notice period and annual rule below came from the
     *  city office, relayed by the owner, rather than from the published text.
     *  Copy must attribute them that way — see maintenance.ts ORD-03, which
     *  carries a shorter interval than the other towns for exactly that reason. */
    weedOrdinance: {
      heightInches: 12,
      noticeDays: 10,
      cite: 'Code of Ordinances ch. 6 art. 6.400 § 6.403',
      annualNotice: true,
      figuresFromCityOffice: true,
      note: 'Twelve inches with ten days to comply — a longer notice period than most of the route, and the same height Wolfforth and the majority of the region use. One notice covers repeat violations for a year. Figures confirmed with the city office; the published section text is not publicly accessible online.',
    },
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
    weedOrdinance: {
      heightInches: 12,
      noticeDays: 7,
      cite: 'Code of Ordinances ch. 7 art. 7.02',
      annualNotice: true,
      noNoticeAboveInches: 48,
      note: 'Shortest notice on the route. The duty runs to the curb line and to the centre of the alley (7.02.001(b)). Lien filed with the county clerk at 10% per annum, inferior only to tax liens and liens for street improvements (7.02.006). A courtesy notice before the formal one is discretionary, not required (7.02.008).',
    },
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
      heightInches: 12,
      noticeDays: 10,
      cite: 'Code of Ordinances ch. 6 art. 6.06',
      annualNotice: true,
      noNoticeAboveInches: 48,
      note: 'The only ordinance on the route that NAMES the regulated species (6.06.003) and that exempts undisturbed climax growth of native grasses, mesquite and shinnery oak. Five days to pay after billing before a lien follows (6.06.009). Scraping and tilling need prior city manager authorisation (6.06.010).',
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
      heightInchesLarge: 18,
      noticeDays: 10,
      cite: 'Ordinances 1080 and 1089, Code of Ordinances §18',
      annualNotice: true,
      noNoticeAboveInches: 48,
      note: 'Twelve inches on platted lots under an acre, eighteen on undeveloped tracts over an acre. The city notes in its own guidance that state law requires only one notice per year, which is the provision that catches people out.',
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
    weedOrdinance: {
      heightInches: 12,
      noticeDays: 7,
      cite: 'Code of Ordinances ch. 6 art. 6.02',
      annualNotice: true,
      noNoticeAboveInches: 48,
      note: 'Reaches 5,000 FEET beyond the city limits — the home-rule nuisance grant at Local Government Code §217.042. Scoped to vegetation within 100 feet of a property line or 50 feet of a structure. Thirty days before the lien attaches. Public health and sanitation violations carry a penalty band up to $2,000 (1.01.009(b)).',
    },
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
    fireAnt: 'not-quarantined', // VERIFIED Aug 2026 against the APHIS regulated-areas list adopted by 4 TAC §19.101
    pestPressures: ['Scorpions', 'Ants and rodents from surrounding farmland'],
    weedOrdinance: {
      heightInches: 12,
      noticeDays: 7,
      cite: 'Code of Ordinances ch. 6 art. 6.900',
      annualNotice: true,
      noNoticeAboveInches: 48,
      note: 'Two clocks: seven days under the weeds article 6.900, but ten under the separate offensive conditions article 6.500. Which article the notice cites decides how long you have. Lien at 10% under both (6.906, 6.510), notice by certified mail. The town also keeps a standalone rat control article at 6.600.',
    },
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
    weedOrdinance: {
      heightInches: 18,
      noticeDays: null,
      cite: 'City of Midland Code of Ordinances',
      annualNotice: true,
      note: 'The most permissive city standard on the route at eighteen inches. The notice period is not independently verified — confirm with code enforcement before relying on it.',
    },
    population: 147615,
    character: 'The highest-value market on the route, and the most contested.',
  },
  {
    slug: 'odessa',
    name: 'Odessa',
    county: 'Ector County',
    distanceMiApprox: 90,
    direction: 'southeast',
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
      cite: 'City of Odessa Code of Ordinances',
      annualNotice: true,
      noNoticeAboveInches: 48,
      note: 'The only town on the route that publishes itemised abatement costs: major equipment $56/hr, labour $21/hr, a $125 administration fee and landfill at $52.50/ton.',
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
    /** PARTIAL, and the APHIS list draws it street by street: "That portion of
     *  the City of Lubbock located within Highway 27 to the East, Ursuline
     *  Street to the North, Milwaukee Street to the West, and 98 Street to the
     *  South." Retrieved cleanly Aug 2026 after two earlier failed attempts.
     *  Everything else in Lubbock County is outside the quarantine. */
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
      cite: 'Lubbock Code of Ordinances §34.02.033(b)',
      annualNotice: true,
      note: 'Eight inches averaged across the lot — the strictest standard in the region by a clear margin. A $175 administrative fee per occurrence, and a lien at 10% interest.',
    },
    population: 273071,
    character: 'The Hub City — the largest market on the route and the furthest he will drive.',
  },
  {
    slug: 'kermit',
    name: 'Kermit',
    county: 'Winkler County',
    distanceMiApprox: 85,
    /** South to Andrews on US-385, then west on TX-115 — the same dogleg
     *  through Andrews the Stanton route uses in the other direction. */
    direction: 'south-west',
    tier: 'single',
    /** D-07 covered Kermit in the same breath as Stanton. Unlike Stanton the
     *  page has not been written up to the by-request framing yet, so it stays
     *  a noindex scaffold — but the flag is set so no town grid can render it
     *  as routine coverage in the meantime. */
    byRequest: true,
    neighborhoods: [],
    housing: 'Highest owner-occupancy in the region at 84.5% — a stable stock of family homes.',
    soil: 'Dry western-Basin caliche and sand.',
    fireAnt: 'quarantined',
    pestPressures: ['Fire ants — Winkler County IS quarantined', 'Scorpions sheltering under caliche pads and equipment yards', 'Rodents in outbuildings and long-vacant houses'],
    /** Kermit Code ch. 7 art. 7.02, "Weeds, Rubbish, Brush, and Other
     *  Unsanitary Matter", §§ 7.02.001–7.02.013 (eCode360, read Aug 2026).
     *  The strictest package on this route: tightest height bar Lubbock, the
     *  only 24-month repeat window, and a no-advance-notice abatement power
     *  over 48 inches at § 7.02.011. */
    weedOrdinance: {
      heightInches: 10,
      noticeDays: 10,
      cite: 'Code of Ordinances ch. 7 art. 7.02 §§ 7.02.004, .008–.011',
      annualNotice: true,
      repeatWindowMonths: 24,
      noNoticeAboveInches: 48,
      note: 'Ten inches is the tightest standard on this route after Lubbock, and it binds tenants and lessees as well as owners. Mailed notice is deemed received five days after posting, and notice may also be given by newspaper, by a posting on the door or by a stake driven into the lot. One notice covers a repeat violation for twenty-four months — twice every other town here. Over forty-eight inches the city may abate with no advance notice at all, telling you within ten days afterwards; you can request a hearing within thirty days of that letter. Lien at ten percent, and the cost is a personal liability as well as a charge on the property.',
    },
    population: 6019,
    character: 'The driest county on the route at twelve inches of rain a year, with a belt of sand dunes across its middle and one in six houses standing empty. Winkler County seat since 1910. No pest company is based in town.',
  },
  {
    slug: 'stanton',
    name: 'Stanton',
    county: 'Martin County',
    distanceMiApprox: 90,
    direction: 'south-east',
    tier: 'single',
    /** D-07, Aug 2026: "Have not currently serviced yet but would if a call
     *  came through." The page ships on exactly that claim and no more. */
    byRequest: true,
    neighborhoods: [],
    housing: 'Small-town residential with surrounding farm and ranch property.',
    soil: 'Martin County farmed soils with caliche.',
    // CONFIRMED Aug 2026 against the APHIS regulated-areas list itself (7 C.F.R.
    // §301.81-3, last updated 27 Oct 2022), which 4 TAC §19.101 adopts by
    // reference. An early draft had this backwards; a later one hedged. Settled.
    fireAnt: 'quarantined',
    pestPressures: ['Fire ants — Martin County IS quarantined', 'Scorpions', 'Field-driven ants and rodents'],
    weedOrdinance: {
      heightInches: 12,
      noticeDays: 7,
      cite: 'Code of Ordinances ch. 7 art. 7.03',
      annualNotice: true,
      note: 'The article is headed "Stagnant Water, Filth and Tall Weeds and Grass" — the town treats all three as one problem. Privileged lien filed with the county clerk, second only to tax liens, at 10% per annum (7.03.007). Also carries the only dimensional landscaping standard on the route, at 7.03.003: 100ft sight lines, parkway bushes capped at 2.5ft above gutter elevation, trees 7ft above ground and 8ft above sidewalks.',
    },
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
