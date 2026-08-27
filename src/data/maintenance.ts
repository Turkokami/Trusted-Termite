/**
 * maintenance.ts — Phase 6. The decay registry.
 *
 * Everything on this site that is true today and can stop being true without
 * anybody touching the repo lives in this file. A page that cites a licence,
 * an ordinance height, a quarantine boundary or a statute is only honest for
 * as long as the source behind it is unchanged, and none of those sources ask
 * our permission before they change.
 *
 * Doctrine 6 — honesty is architecture, not a disclaimer — has a corollary in
 * time: a fact that was verified once and never again is a fabrication with a
 * delay fuse. This registry is the mechanism that stops that. `npm run cadence`
 * reads it, compares `lastVerified + intervalDays` against today, and reports
 * what is due. `verify.mjs` warns about anything overdue on every single build
 * so it cannot be quietly ignored.
 *
 * RULES
 *  · `lastVerified` is the date a human read the PRIMARY source. Not the date
 *    a page was edited, not the date somebody remembered the fact was right.
 *  · Moving a date without reading the source is falsifying a record. Do not.
 *  · `severity: 'critical'` means the site makes a statement about law or
 *    licensure. If the source has moved, the site is publishing a false legal
 *    statement — fix it the same day or pull the claim.
 *  · A new page that cites an outside authority ADDS A ROW HERE in the same
 *    commit. If it does not, the citation is unmaintained by construction.
 */

export type Severity = 'critical' | 'high' | 'routine';

export interface DecayingFact {
  /** Stable id. Referenced by CADENCE.md and by commit messages. */
  id: string;
  what: string;
  /** The primary authority that settles it — never a secondary write-up. */
  source: string;
  /** Where it renders. Page paths, or the data file that feeds them. */
  surfaces: string[];
  /** ISO date a human last read the source itself. */
  lastVerified: string;
  intervalDays: number;
  severity: Severity;
  /** The exact action when the source and the site disagree. */
  onChange: string;
}

const Q = 91;
const H = 182;
const Y = 365;
const BIENNIAL = 730;

export const DECAYING_FACTS: DecayingFact[] = [
  /* ---------------- licensure and insurance — critical ---------------- */
  {
    id: 'LIC-01',
    what: 'TDA structural pest control business licence TPCL 0918482 is current, and Valentin Moriel is still its Responsible Certified Applicator.',
    source: 'Texas Department of Agriculture licensee search (TDA is the licensing authority under 4 TAC §7.121).',
    surfaces: ['every page footer', '/compliance/pest-control-licence/', 'LocalBusiness schema on every page', 'src/data/business.ts → owner.tpcl'],
    lastVerified: '2026-08-23',
    intervalDays: Q,
    severity: 'critical',
    onChange:
      'A lapsed or suspended licence invalidates the central claim of the site and every schema node that carries it. Pull the licence number and the category list the same day, take the site to a holding state, and tell the owner before anything else.',
  },
  {
    id: 'LIC-02',
    what: 'The four licensed categories — Pest Control, Termite Control, Lawn & Ornamental, Weed Control — still match the licence exactly.',
    source: 'TDA licensee record, category field. Categories are defined at 4 TAC §7.124.',
    surfaces: ['/compliance/pest-control-licence/', '/services/', 'src/data/business.ts → owner.categories'],
    lastVerified: '2026-08-23',
    intervalDays: H,
    severity: 'critical',
    onChange:
      'A category added means new service pages are now writable. A category dropped means the matching service pages assert work he is not licensed to perform — noindex them the same day, then remove the copy.',
  },
  {
    id: 'LIC-03',
    what: 'Continuing-education units are current for the licence period.',
    source: '4 TAC §7.134 (CEU requirement); TDA CEU record for the licensee.',
    surfaces: ['/compliance/pest-control-licence/ (describes the requirement)'],
    lastVerified: '2026-08-23',
    intervalDays: Y,
    severity: 'high',
    onChange:
      'CEU shortfall is an upstream risk to LIC-01, not a site defect on its own. Warn the owner well before the deadline; nothing on the site changes unless the licence itself moves.',
  },
  {
    id: 'INS-01',
    what: 'Markel policy in force at $500,000 bodily injury and property damage / $1,000,000 aggregate.',
    source: 'The certificate of insurance itself. Minimums are set by 4 TAC §7.123.',
    surfaces: ['/about/', '/our-guarantee/', '/contact/', 'src/data/business.ts → insurance'],
    lastVerified: '2026-08-23',
    intervalDays: Y,
    severity: 'critical',
    onChange:
      'Published coverage figures that no longer match the policy are a false representation to a customer deciding whether to let someone into their house. Update the figures from the certificate or remove them.',
  },

  /* ---------------- regulatory text — critical ---------------- */
  {
    id: 'REG-01',
    what: '4 TAC ch. 7 subch. H as described across the compliance cluster — §7.141 identification and vehicle markings, §7.144 records, §7.145 invoices and contracts, §7.146 the 48-hour pest control sign, §7.147 the Consumer Information Sheet, §7.148 the posting duty.',
    source: 'Texas Administrative Code, Title 4, Part 1, Chapter 7, Subchapter H.',
    surfaces: ['/compliance/', '/compliance/pest-control-licence/', '/compliance/landlord-tenant/', '/contact/', '/our-guarantee/', '/services/bed-bug-treatment/', '/services/flea-and-tick/', '/commercial/apartments/'],
    lastVerified: '2026-08-23',
    intervalDays: Y,
    severity: 'critical',
    onChange:
      'Read the amended rule in full before editing. This cluster has already been wrong once — the 48-hour sign ran backwards in four places, because the direction of the interval was assumed rather than read. Assume nothing; quote the rule.',
  },
  {
    id: 'REG-02',
    what: 'The Texas termite rules — 4 TAC §§7.172–7.177 — as described on the WDI pages, including what a Texas Official WDI Report (SPCS/T-5) covers and what it does not.',
    source: 'Texas Administrative Code, Title 4, Part 1, Chapter 7, Subchapter H, §§7.172–7.177.',
    surfaces: ['/compliance/wdi-report/', '/services/termite-control/wdi-inspection/', '/services/termite-control/', '/pest-library/subterranean-termite/'],
    lastVerified: '2026-08-23',
    intervalDays: Y,
    severity: 'critical',
    onChange:
      'Both WDI pages are held at noindex today, which lowers the urgency but not the standard. Re-read before they ship regardless of when this row last came due.',
  },
  {
    id: 'REG-03',
    what: 'Texas Property Code §92.052 and §92.056 as described on the landlord-tenant page — the landlord repair duty and the notice sequence a tenant must follow.',
    source: 'Texas Property Code, Chapter 92, Subchapter B.',
    surfaces: ['/compliance/landlord-tenant/', '/commercial/apartments/'],
    lastVerified: '2026-08-23',
    intervalDays: BIENNIAL,
    severity: 'critical',
    onChange:
      'The Texas Legislature meets in regular session in odd-numbered years, so this row is keyed to the session, not the calendar. Re-read after the 2027 session adjourns and after every regular session thereafter.',
  },
  {
    id: 'REG-04',
    what: 'Health and Safety Code §341.011 (public nuisance), §§342.001–342.008 (municipal weed and rubbish abatement) and §§343.011–343.023 (county nuisance abatement, including the 300-foot proximity test at §343.011(c)(4)).',
    source: 'Texas Health and Safety Code, Chapters 341, 342 and 343.',
    surfaces: ['/compliance/weed-ordinances/', '/services/brush-and-lot-clearing/', '/services/lawn-care/', '/locations/ town pages'],
    lastVerified: '2026-08-23',
    intervalDays: BIENNIAL,
    severity: 'critical',
    onChange:
      'Keyed to the legislative session like REG-03. Note the standing correction: §343.011(c)(4) defines the county nuisance by PROXIMITY, not by grass height. There is no county height figure. A "36 inches" county rule was published here once and had to be purged from four pages — do not let it back in.',
  },

  /* ---------------- quarantine and ordinances — high ---------------- */
  {
    id: 'QUAR-01',
    what: 'Red imported fire ant quarantine status for all nine served counties: Gaines, Yoakum, Andrews, Dawson, Terry, Howard, Midland, Ector, Lubbock.',
    source:
      'The APHIS document "Imported Fire Ant Quarantined Areas" implementing 7 C.F.R. §301.81-3, which 4 TAC ch. 19 subch. J adopts by reference. The copy read in August 2026 carried "Last updated: October 27, 2022" — record the version line on every re-read, because a changed date is the signal, not the county list itself.',
    surfaces: ['/compliance/fire-ant-quarantine/', 'every town page', 'every neighbourhood page', 'src/data/towns.ts → fireAnt'],
    lastVerified: '2026-08-23',
    intervalDays: H,
    severity: 'high',
    onChange:
      'Update towns.ts and the pages rebuild from it. BOTH long-standing soft spots closed in August 2026 by reading the APHIS PDF directly instead of secondary summaries. Martin County IS quarantined — settled, after one draft had it backwards and a later one hedged. Lubbock is partial and the boundary is now published verbatim: Highway 27 east, Ursuline Street north, Milwaukee Street west, 98 Street south. Quote those four streets rather than paraphrasing; a boundary drawn in street names is exactly the kind that gets redrawn, and paraphrase is how a redrawing goes unnoticed.',
  },
  {
    id: 'ORD-01',
    what: 'Municipal weed and grass ordinance heights, notice periods, repeat-violation windows and citations for Seagraves, Denver City, Andrews, Lamesa, Brownfield, Midland, Odessa, Lubbock, Stanton and Kermit.',
    source: 'Each city\'s own code of ordinances. Citations are carried per town in towns.ts → weedOrdinance.cite.',
    surfaces: ['/compliance/weed-ordinances/ (the table renders from towns.ts)', 'every town page', '/services/lawn-care/', '/services/brush-and-lot-clearing/'],
    lastVerified: '2026-08-23',
    intervalDays: Y,
    severity: 'high',
    onChange:
      'Edit towns.ts only — the comparison table and the town pages both render from it and cannot drift apart. One gap remains: Big Spring\'s height was never retrievable. Seminole is now populated but on a weaker footing than the rest — see ORD-03.',
  },
  {
    id: 'ORD-02',
    what: 'Local Government Code §217.042 (municipal nuisance abatement authority) and Business & Commerce Code §601.052 as cited in the compliance cluster.',
    source: 'Texas Local Government Code ch. 217; Texas Business & Commerce Code ch. 601.',
    surfaces: ['/compliance/weed-ordinances/', '/compliance/'],
    lastVerified: '2026-08-23',
    intervalDays: BIENNIAL,
    severity: 'routine',
    onChange: 'Session-keyed. Re-read after each regular session.',
  },
  {
    id: 'ORD-03',
    what: 'Seminole weed ordinance figures — 12 inches, 10 days\' notice, one notice covering repeat violations for a year.',
    source:
      'The City of Seminole code office, relayed by the owner (K-04, answered August 2026). The section number — ch. 6 art. 6.400 § 6.403 — IS verified against the city\'s published table of contents; the figures are not, because eCode360 serves Seminole\'s contents but blocks the section text.',
    surfaces: ['/locations/seminole/', '/compliance/weed-ordinances/', 'src/data/towns.ts → seminole.weedOrdinance'],
    lastVerified: '2026-08-25',
    intervalDays: H,
    severity: 'high',
    onChange:
      'This row exists separately from ORD-01 because it is the only ordinance on the site whose numbers were not read off the published text. Copy must attribute them to the city office rather than to the code. Re-read at twice the frequency of the other towns, and retire this row into ORD-01 the moment the section text becomes retrievable and confirms the figures.',
  },

  /* ---------------- business facts — high / routine ---------------- */
  {
    id: 'BIZ-01',
    what: 'Years in the trade — currently 6 (B-11) — and the founding date, November 2025 (A-10). These are two different numbers and are never blended.',
    source: 'The owner. Both increment on their own anniversaries.',
    surfaces: ['/about/', '/', 'src/data/business.ts → owner.yearsInTrade, foundingDate'],
    lastVerified: '2026-08-23',
    intervalDays: Y,
    severity: 'high',
    onChange:
      'Increment yearsInTrade on his trade anniversary, not on the business anniversary. The business anniversary changes how the founding date reads in prose ("founded November 2025" is fine at any age; "new to the area" is not) — reread /about/ each November.',
  },
  {
    id: 'BIZ-02',
    what: 'Published price ranges: $140–$160+ per recurring visit, $200–$250 initial service (E-01, E-02).',
    source: 'The owner.',
    surfaces: ['/', '/services/pest-control/', '/financing/', '/contact/', 'src/data/business.ts → pricing'],
    lastVerified: '2026-08-23',
    intervalDays: H,
    severity: 'high',
    onChange:
      'A published range he no longer honours is the fastest way to lose a call at the door. Ask him twice a year; if he will not commit to a number, remove the range rather than let it drift.',
  },
  {
    id: 'BIZ-03',
    what: 'Territory — the towns and counties he will actually drive to, and the 100-mile limit (D-03).',
    source: 'The owner.',
    surfaces: ['/locations/', 'every town page', 'areaServed in LocalBusiness schema', 'src/data/business.ts → COUNTIES_SERVED'],
    lastVerified: '2026-08-23',
    intervalDays: H,
    severity: 'high',
    onChange:
      'Adding a town is a build task, not an edit: it needs its own row in towns.ts and a page written to the M1 floor. Dropping one means noindex first, then remove. El Paso stays out regardless of what he says about appointments — see the Phase 0 work order. Live edge case: Winkler County is NOT in COUNTIES_SERVED but has a published by-request page at /locations/kermit/. That is deliberate and the page says so twice. If Winkler is ever added to the nine, the Kermit page gets rewritten rather than silently reclassified.',
  },
  {
    id: 'BIZ-06',
    what: 'The WDI operating limits — a 90-mile inspection radius and three days\' requested notice, both owner-stated August 2026. These are the figures that released the WDI pair from hold.',
    source: 'The owner. Nowhere else — no public record carries these, and they are not derivable from the territory.',
    surfaces: ['/services/termite-control/wdi-inspection/', 'src/data/business.ts → owner.wdiRadiusMi, owner.wdiNoticeDays'],
    lastVerified: '2026-08-26',
    intervalDays: H,
    severity: 'high',
    onChange:
      'Change the numbers in business.ts and the page follows — every scheduling statement and the outside-radius list are derived, nothing is typed twice. Two things to hold on to. FIRST, the WDI radius (90) is NOT the general territory (100, BIZ-03). They are separate commitments and conflating them is how a real-estate page starts promising a date it cannot make; the page says out loud that there are two numbers and why. SECOND, the derived list currently puts Big Spring outside the radius at ~95 miles while it stays inside the general territory, with Odessa and Stanton exactly on the line at 90. If he revises the radius, re-read that section rather than trusting the numbers to still read well — the prose around the derived list assumes there IS an excluded town, and a radius of 100 would empty it.',
  },
  {
    id: 'BRAND-01',
    what: 'Logo assets. A-11 is still open: both files on hand are raster, and the vector has never been supplied. The dark variant carries a contrast correction we applied ourselves.',
    source: 'The owner. There is no other source for brand artwork.',
    surfaces: ['/brand/logo.png (header)', '/brand/logo-dark.png', '/brand/social.png (og:image on every page)', 'src/data/business.ts → brand'],
    lastVerified: '2026-08-27',
    intervalDays: Y,
    severity: 'routine',
    onChange:
      'Two things to check, and the second is the one that gets forgotten. FIRST, if he supplies the VECTOR, set vectorPending false, regenerate the raster sizes from it, and re-cut the social card — a raster logo shows its edges on print, vehicle livery and any large format, which is where this actually costs him. SECOND, the dark variant we hold has a correction WE made: its tagline arrived at #151515 on #000000, a measured 1.15:1, and we lifted only those glyph pixels to #BEBEBE. If a corrected original ever arrives, replace the file and regenerate the card from it rather than re-applying the patch — and if a NEW dark file arrives uncorrected, measure it before shipping it. Do not assume a redelivery fixed the contrast.',
  },
  {
    id: 'REV-01',
    what: 'Google Business Profile review count and rating. Owner-reported at 12 reviews / 5.0 and NOT published — `reviews.verified` is false and buildGraph() suppresses aggregateRating entirely.',
    source: 'The live Google Business Profile, read by us. Owner-reported figures are not a verified reading and never satisfy this row.',
    surfaces: ['schema aggregateRating (currently suppressed)', 'src/data/business.ts → reviews'],
    lastVerified: '2026-08-23',
    intervalDays: Q,
    severity: 'high',
    onChange:
      'Once G-04 supplies the profile URL and we read it ourselves, set verified: true with the real figures and this row becomes a quarterly re-read. A rating that drifts below the published figure must be corrected within one interval — a stale 5.0 is a fabrication.',
  },
  {
    id: 'REV-02',
    what: 'The sameAs set: Facebook, Yelp (G-07, URL still missing), Google Business Profile (still missing).',
    source: 'The live profiles.',
    surfaces: ['LocalBusiness sameAs on every page', 'src/data/business.ts → social'],
    lastVerified: '2026-08-23',
    intervalDays: H,
    severity: 'routine',
    onChange:
      'A sameAs pointing at a dead or renamed profile is worse than an absent one. Remove rather than guess. Standing as of Aug 2026: the Yelp listing is still under review by Yelp and there is nothing to link; the Google profile URL was said to have been sent by email and has not been confirmed received.',
  },
  {
    id: 'BIZ-04',
    what: 'Contact points — the (432) 278-7294 cell and the email address. A-09 wants a branded address; the Gmail address is a placeholder that will be replaced.',
    source: 'The owner.',
    surfaces: ['every page', 'ContactPoint in schema', 'src/data/business.ts'],
    lastVerified: '2026-08-23',
    intervalDays: Q,
    severity: 'critical',
    onChange:
      'A wrong phone number breaks every other thing on this site at once. When the branded email lands, change it in business.ts only — nothing hardcodes it. The 915 number stays unpublished no matter what.',
  },

  /* ---------------- cited market data — routine ---------------- */
  {
    id: 'BIZ-05',
    what: 'The by-request towns — Stanton and Kermit — are still by request, and the pages still say so above the fold.',
    source: 'The owner. D-07, answered August 2026: "Have not currently serviced yet but would if a call came through."',
    surfaces: ['/locations/stanton/', '/locations/kermit/ (both written and shipped)', '/locations/ (grid labels and the route paragraph)', 'src/data/towns.ts → byRequest'],
    lastVerified: '2026-08-25',
    intervalDays: H,
    severity: 'high',
    onChange:
      'Two directions, both worth catching. If he starts genuinely running one of them, that page gets rewritten UP into a normal city page and byRequest comes off — good news, but a rewrite, not a flag. If he stops being willing to drive it, the page comes down. The failure mode in between is drift: a by-request page gains a sentence at a time until it reads like coverage. Re-read the first screen of each page, not the diff. Kermit carries a SECOND claim to check — that Winkler County is outside COUNTIES_SERVED — which must stay on the page for as long as it stays true.',
  },
  {
    id: 'GIS-01',
    what: 'Neighbourhood-page facts drawn from municipal GIS: Midland plat dates, surveyors and cabinet/page references; Midland 100-year and 500-year floodplain and named playa features; Odessa per-filing plat acreage and the 296.8-acre Mission Estates grouping.',
    source:
      "The City of Midland's public ArcGIS Subdivision and Drainage/Floodplain map services, and the City of Odessa's published Plats and Subdivision feature services. Primary municipal records in both cases.",
    surfaces: ['/locations/midland/ (6 neighbourhood pages)', '/locations/odessa/ (2 neighbourhood pages)'],
    lastVerified: '2026-08-25',
    intervalDays: Y,
    severity: 'routine',
    onChange:
      'Plat history does not change retroactively, so the dates are stable. What DOES move is floodplain and playa mapping, which cities revise — and the Saddle Club page publishes a floodplain statement, so re-read that one first. Standing rule for every page in this set: the pages tell readers to check their own parcel with the city rather than trust a pest control website for a floodplain determination. Never remove that sentence to make the copy flow better; it is the thing that makes publishing the mapping defensible at all. Note the asymmetry this row records: Seminole publishes NO equivalent source, which is why its five subdivisions live in a section of the town page rather than on pages of their own. If Seminole ever publishes plat or GIS data, that decision is worth revisiting.',
  },
  {
    id: 'I18N-01',
    what: 'The Spanish tree: twelve service pages plus /es/ and /es/servicios/, each paired to its English counterpart by reciprocal hreflang, and each carrying the same honesty gates as the English page.',
    source: 'The English pages themselves. A Spanish page is only correct for as long as its English pair is — they state the same figures, the same licence facts and the same refusals.',
    surfaces: ['/es/', '/es/servicios/', 'all 12 /es/servicios/{slug}/ pages', 'altLangPath on all 12 English service pages'],
    lastVerified: '2026-08-25',
    intervalDays: H,
    severity: 'high',
    onChange:
      'THE DRIFT RISK IS ONE-SIDED AND EASY TO MISS: somebody edits an English page — a price range, an ordinance figure, a product, a limit on what he will do — and the Spanish pair silently keeps the old claim. Any edit to a service fact must be made on BOTH pages in the same commit. Specific pairs that carry hard refusals and must never diverge: bed bug (no heat treatment), wildlife (no poison, bats referred out, bite/rabies sent to animal control and a doctor), birds (no poison or shooting, active nests untouched, native species protected), rodent/bed bug/flea/lawn/bird (do NOT carry the 30-day guarantee) and mosquito (DOES carry it). The harness checks that hreflang resolves and is reciprocal; it cannot check that the two pages still say the same thing.',
  },
  {
    id: 'BIO-01',
    what: 'Entomological, medical and outcome figures across the pest library: AgriLife identification and life-cycle data, CDC disease-reservoir lists, Texas DSHS case counts, and the published outcome studies quoted on the spider and ant pages.',
    source:
      'Texas A&M AgriLife Extension (texasinsects.tamu.edu, ENTO- and E-series, citybugs, School IPM), CDC, Texas DSHS, and named peer-reviewed papers. Every figure on those pages is attributed in the page comment to the source it came from.',
    surfaces: ['/pest-library/ and all 8 written entries'],
    lastVerified: '2026-08-26',
    intervalDays: Y,
    severity: 'high',
    onChange:
      'Biology does not change, but PUBLISHED FIGURES AND GUIDANCE DO — case counts accumulate, quarantine ranges shift, and label-based control advice is superseded. Three standing rules that must survive any edit. (1) Where sources CONFLICT, the pages say so rather than picking a number: fire ant anaphylaxis (AgriLife contradicts itself, 0.6–6% vs under 1%), house mouse litters per year (5–10 practical vs 13 theoretical), cockroach development time, and widow egg counts. Never tidy these into single figures. (2) Where a widely repeated claim is misleading, the pages correct it: harvester ants are not the record-holding venomous insect (that is P. maricopa, on a mouse LD50), the fire ant "80 deaths" is cumulative and not annual, and the widow "15x a rattlesnake" line must always carry DSHS\'s own qualifier that only minute quantities are injected. (3) HOUSE MICE ARE NOT THE HANTAVIRUS RESERVOIR — deer mice are, and Texas HPS cases are concentrated in this region. If anyone edits that page toward the easier scarier version, it is wrong.',
  },
  {
    id: 'MKT-01',
    what: 'Odessa 21.3% rental vacancy rate, cited on /locations/odessa/mission-estates/ and used to justify the bed-bug angle.',
    source: 'US Census, 2020 decennial.',
    surfaces: ['/locations/odessa/mission-estates/', '/commercial/apartments/'],
    lastVerified: '2026-08-23',
    intervalDays: Y,
    severity: 'routine',
    onChange:
      'The figure is dated in the copy, which keeps it honest as it ages. Replace when the 2030 decennial publishes, or sooner if ACS gives a defensible newer read.',
  },
  {
    id: 'DIST-01',
    what: 'Road-distance estimates from Seminole to each served town (towns.ts → distanceMiApprox).',
    source: 'A real routing engine. The file header requires road distance, never straight-line.',
    surfaces: ['every town page', '/locations/'],
    lastVerified: '2026-08-23',
    intervalDays: BIENNIAL,
    severity: 'routine',
    onChange:
      'Standing note: a straight-line figure was once written over Stanton\'s 90 road miles and had to be restored. If a number shrinks noticeably, check which kind of distance you just measured before you commit it.',
  },
];

/* ------------------------------------------------------------------ */

/** A page or cluster written and deliberately not shipped, and the single
 *  thing that releases it. Mirrors CONTENT_BRIEF §11 in machine-readable form
 *  so `npm run cadence` can count what is parked. */
export interface HeldItem {
  id: string;
  what: string;
  /** Pages currently held at noindex behind this gate. */
  pages: number;
  /** Intake question code, where one exists. */
  gate: string;
  askedOf: 'owner' | 'city' | 'platform' | 'us';
  /** The mechanical release — what actually gets typed when the answer lands. */
  release: string;
  /** Written to depth already, or still to be written after release. */
  written: boolean;
  /** Set when an item has been deliberately taken OFF the pending list rather
   *  than answered. The string records who decided, when, and — the part that
   *  matters — the specific condition that reopens it. A shelved row is not
   *  chased in the monthly loop and is not counted as waiting on the owner.
   *  It stays in the ledger because deleting it would erase the reasoning, and
   *  in six months nobody would remember whether the gap was a decision or an
   *  oversight. */
  shelved?: string;
}

export const HELD: HeldItem[] = [
  {
    id: 'HELD-LUBBOCK-HOODS',
    what: 'Lubbock neighbourhood pages — 4 to 6 pages in the largest market on the route.',
    pages: 0,
    gate: 'D-09 — ANSWERED, but the answer is not a neighbourhood',
    askedOf: 'owner',
    release:
      'August 2026 he answered "Wolfforth area of Lubbock." Wolfforth is not a Lubbock neighbourhood — it is a separate incorporated city in Lubbock County, 5,521 people at the 2020 census, and it has its own weed ordinance (12 inches, 7 days, ecode360 § 6.03.001–6.03.003). So this unlocks at most ONE town page, not the neighbourhood tier, and only once he confirms he means the city rather than the south-west side of Lubbock.',
    written: false,
    shelved:
      'SHELVED at the agency\'s direction, August 2026. Stop asking for this and stop counting it as a pending owner answer. Nothing about it was wrong — the tier simply is not worth another round of chasing right now, and a question that gets asked repeatedly without landing costs more goodwill than the pages are worth. REOPENS ON: real Lubbock place names arriving unprompted, from him or from a job. Note what is genuinely available if it does reopen — Lubbock publishes no subdivision or plat service comparable to Midland\'s or Odessa\'s that we located, so this tier would need owner knowledge rather than municipal GIS, which is the opposite of how the eight shipped neighbourhood pages were built. The separate Wolfforth question — whether he means the city or the south-west side of Lubbock — is also shelved with it, and would unlock at most one town page.',
  },
  {
    id: 'HELD-RATING',
    what: 'aggregateRating in LocalBusiness schema.',
    pages: 0,
    gate: 'G-04',
    askedOf: 'platform',
    release:
      'Read the live Google Business Profile ourselves, then set reviews.verified = true with the figures we read. buildGraph() emits the node automatically. August 2026: he says an invitation was sent by email — confirm it arrived and what access it grants before treating this as answered.',
    written: false,
  },
  {
    id: 'HELD-OILFIELD',
    what: 'Oilfield and man-camp commercial vertical — the one vertical he explicitly wants (C-12) and has no work to point at (C-07).',
    pages: 0,
    gate: 'C-12',
    askedOf: 'owner',
    release: 'One real job. Then the page is writable without a single invented claim. August 2026: none yet, and he will tell us.',
    written: false,
  },
  {
    id: 'HELD-COMMUNITY',
    what: 'Community involvement, sponsorships, associations and awards.',
    pages: 0,
    gate: 'F-12, F-13, B-09',
    askedOf: 'owner',
    release: 'He joins or sponsors something. Until then business.ts keeps three empty arrays and the site says nothing. August 2026: "I will let you know once I land a job." Nothing to add.',
    written: false,
  },
];

/** Publishing queue. Waves are ordered; a wave does not start until the one
 *  above it is verified clean. Sizes are pages, not hours — the constraint on
 *  this build has never been capacity, only whether the data exists to write
 *  a page honestly. */
export interface Wave {
  n: number;
  name: string;
  pages: string;
  blockedBy: string | null;
  why: string;
}

export const QUEUE: Wave[] = [
  {
    n: 1,
    name: 'Neighbourhood layer',
    pages: 'COMPLETE — 8 pages shipped (6 Midland, 2 Odessa); 5 Seminole folded into the town page.',
    blockedBy: null,
    why: 'The hyper-local tier is the thesis of this build and it split hard on data. Midland and Odessa publish primary municipal records — plat dates, surveyors, acreage, floodplain and named playa mapping — and those eight pages are written from them and shipped, each on a distinct argument rather than a template. Seminole publishes nothing comparable, so rather than pad five pages around five proper nouns, that material became an "areas we work" section on /locations/seminole/ which states plainly why it is written that way. The dynamic neighbourhood route has been deleted; every neighbourhood page that ships is now hand-written.',
  },
  {
    n: 2,
    name: 'Spanish service tree',
    pages: 'COMPLETE — all 12 services now have a Spanish page at the M1 floor.',
    blockedBy: null,
    why: 'Fluent Spanish is the owner\'s clearest differentiator in this market. Finished August 2026: written in Spanish rather than translated, every honesty gate carried across unchanged (no fumigación, no tratamiento térmico, no veneno para fauna, the services that do NOT carry the 30-day guarantee named as such), and hreflang reciprocal on both sides of all twelve pairs — verified by the harness, which fails the build on a hreflang pointing at a page that does not exist.',
  },
  {
    n: 3,
    name: 'Pest library',
    pages: 'COMPLETE — all 12 entries shipped at or above the M1 floor.',
    blockedBy: null,
    why: 'Finished August 2026. Twelve entries: striped bark scorpion, subterranean termite, red harvester ant, red imported fire ant, recluse spiders, black widow, house mouse, Norway and roof rat, German cockroach, field crickets, paper wasps and yellowjackets, and mosquitoes — each written from AgriLife, CDC, DSHS, APHIS and peer-reviewed sources with every figure attributed and every source conflict reported as a conflict rather than resolved by picking one. Several pages argue AGAINST treatment, which is the point: crickets are a lighting problem, most yellowjacket nests should be left alone, and no yard treatment controls a mosquito that flies ten miles. The index no longer carries a "still to be written" list and throws at build time if an entry ships unwritten.',
  },
  {
    n: 4,
    name: 'Service problem spokes',
    pages: 'COMPLETE — 8 shipped at /services/{service}/{problem}/, one per service that had real material.',
    blockedBy: null,
    why: 'Finished August 2026. Eight spokes, each named after a sentence a customer actually says: bites with no bed bug found, noises in the attic, roaches in a clean house, a scorpion in the bathtub, something dead in a wall, mud tubes on the foundation, grass burs, and fleas after the pet was treated. Each argues something its parent service page does not. Four of them are built on refusing a claim the rest of the trade repeats: no odour-duration figure exists in any source, the scorpion drain and porcelain stories have no source at all, the 5%-adults flea statistic is not in any extension publication, and "spraying a mud tube is counterproductive" is commercial-blog only. src/data/spokes.ts is the single source of truth and the harness reconciles it against the built routes in both directions, so a spoke cannot ship orphaned and a row cannot ship without a page.',
  },
  {
    n: 5,
    name: 'Held releases',
    pages: 'CLEARED — the WDI pair shipped August 2026. Nothing is held at noindex.',
    blockedBy: null,
    why: 'Closed August 2026. The WDI pair — the compliance explainer and the inspection service page — was written to depth early and sat at noindex behind a single boolean for the whole build, waiting on his travel radius. He gave it: 90 miles, alongside three days\' requested notice. Both pages shipped on that one edit and the site now carries zero noindex drafts. The Lubbock neighbourhood tier was SHELVED at the agency\'s direction rather than answered; its HELD row carries the reasoning and the condition that reopens it, and it is not to be put back on a list he is asked to work through. What remains in HELD is not writing and not his: a rating that needs us to read the live profile, a vertical that needs one real job, community items that need him to join something, and one ordinance row that needs a phone call to a city inspector.',
  },
];
