/**
 * services.ts — the confirmed service tree.
 *
 * Keystone Part 14: build only the confirmed set. Every entry below was ticked
 * by the owner at C-01 to C-04. Anything he did NOT tick is listed in
 * EXCLUDED at the bottom so a future writer cannot quietly reintroduce it.
 *
 * Products come from C-11 verbatim. Naming real products is what separates this
 * from "we use safe, effective treatments" — which is what every competitor says.
 */

export interface Service {
  slug: string;
  name: string;
  /** Short label for nav and cards. */
  short: string;
  group: 'pest' | 'termite' | 'lawn' | 'junk';
  /** Which TDA licence category authorises this. Cross-check against B-02. */
  licenceCategory: 'Pest Control' | 'Termite Control' | 'Lawn & Ornamental' | 'Weed Control';
  /** Real products used, from C-11. Empty = do not name products on that page. */
  products: string[];
  /** One-line promise. Not marketing copy — what actually happens. */
  summary: string;
  /** M5: 110–165 chars, ends on punctuation. Hand-written per service —
   *  never truncated from `summary`, which produces mid-word endings. */
  metaDescription: string;
  /** M5: the page title must fit in 60 chars WITH the suffix. */
  titleShort: string;
  /** Does the 30-day service guarantee apply, or does this carry its own terms? */
  guaranteeApplies: boolean;
  /** Build priority. J-05: "Recurring for sure then termites and commercial". */
  priority: 1 | 2 | 3;
  /** Spanish tree. `esSlug` is the URL segment under /es/servicios/, `esName`
   *  the heading. Written in Spanish rather than translated from the English —
   *  F-07 confirms the owner is fluent, and this market is heavily
   *  Spanish-speaking (Seagraves ISD 83.2% Hispanic, Denver City ISD 86.3%).
   *  A Spanish page only ships when it has been WRITTEN to M1 depth; declaring
   *  a slug here does not create a page. */
  esSlug: string;
  esName: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'pest-control',
    titleShort: 'Recurring Pest Control Seminole TX',
    metaDescription: 'Bi-monthly and quarterly pest control across Gaines County and the Permian Basin. Licensed TPCL 0918482, no contracts, 30-day guarantee.',
    name: 'Recurring Pest Control',
    short: 'Pest control',
    group: 'pest',
    licenceCategory: 'Pest Control',
    products: ['Alpine WSG', 'Onslaught FastCap', 'Suspend PolyZone', 'Demand CS', 'Scion', 'Transport', 'Bifen LP', 'Talstar'],
    summary:
      'Bi-monthly or quarterly service that keeps ahead of pressure instead of reacting to it. Complimentary re-services between visits for covered pests.',
    guaranteeApplies: true,
    priority: 1,
    esSlug: 'control-de-plagas',
    esName: 'Control de Plagas',
  },
  {
    slug: 'scorpion-control',
    titleShort: 'Scorpion Control &amp; Exclusion West Texas',
    metaDescription: 'Scorpion sealing and treatment for West Texas homes, aimed at weep holes and utility penetrations. Licensed TPCL 0918482. No contracts.',
    name: 'Scorpion Control & Exclusion',
    short: 'Scorpions',
    group: 'pest',
    licenceCategory: 'Pest Control',
    products: ['Demand CS', 'Talstar', 'DeltaDust'],
    summary:
      'Sealing and treatment aimed at where striped bark scorpions actually get in — weep holes, utility penetrations, the water heater closet and the irrigation box.',
    guaranteeApplies: true,
    priority: 1,
    esSlug: 'control-de-escorpiones',
    esName: 'Control de Escorpiones',
  },
  {
    slug: 'termite-control',
    titleShort: 'Termite Treatment Seminole &amp; Permian Basin',
    metaDescription: 'Liquid barrier, Trelona bait systems and new-construction pre-treats, quoted after inspection. One-year re-treatment warranty. TPCL 0918482.',
    name: 'Termite Treatment',
    short: 'Termites',
    group: 'termite',
    licenceCategory: 'Termite Control',
    products: ['Termidor HE', 'Termidor SC', 'Trelona bait stations', 'Bora-Care'],
    summary:
      'Liquid barrier treatment, Trelona bait systems, and new-construction pre-treats. Individually quoted after an inspection — linear footage, foundation type, soil and access all change the job.',
    guaranteeApplies: false, // carries its own one-year re-treatment warranty
    priority: 2,
    esSlug: 'control-de-termitas',
    esName: 'Control de Termitas',
  },
  {
    slug: 'rodent-control',
    titleShort: 'Rodent Control &amp; Exclusion West Texas',
    metaDescription: 'Trapping, bait stations, monitoring and the sealing work that actually ends it. Homes, barns and shops across Gaines County and the Basin.',
    name: 'Rodent Control & Exclusion',
    short: 'Rodents',
    group: 'pest',
    licenceCategory: 'Pest Control',
    products: ['FirstStrike'],
    summary:
      'Trapping, professional bait stations, monitoring and — the part that actually ends it — sealing the ways they get in.',
    guaranteeApplies: false,
    priority: 2,
    esSlug: 'control-de-roedores',
    esName: 'Control de Roedores y Exclusión',
  },
  {
    slug: 'wildlife-removal',
    titleShort: 'Wildlife Removal Seminole &amp; Gaines County',
    metaDescription: 'Evaluation, trapping and removal of skunks, raccoons and nuisance wildlife around West Texas properties. Licensed owner-operator, TPCL 0918482.',
    name: 'Wildlife Removal',
    short: 'Wildlife',
    group: 'pest',
    licenceCategory: 'Pest Control',
    products: [],
    summary: 'Evaluation, trapping and removal for skunks, raccoons and other nuisance wildlife around the property.',
    guaranteeApplies: false,
    priority: 3,
    esSlug: 'retiro-de-animales-silvestres',
    esName: 'Retiro de Animales Silvestres',
  },
  {
    slug: 'bed-bug-treatment',
    titleShort: 'Bed Bug Treatment Seminole &amp; Permian Basin',
    metaDescription: 'Chemical bed bug treatment, quoted individually by property size and severity. Discreet, thorough, and followed up. Call (432) 278-7294.',
    name: 'Bed Bug Treatment',
    short: 'Bed bugs',
    group: 'pest',
    licenceCategory: 'Pest Control',
    products: ['Alpine WSG', 'Precor IGR', 'Transport'],
    summary:
      'Chemical treatment, individually quoted. A light infestation and a severe whole-home infestation are completely different jobs.',
    guaranteeApplies: false,
    priority: 3,
    esSlug: 'tratamiento-de-chinches',
    esName: 'Tratamiento de Chinches',
  },
  {
    slug: 'mosquito-control',
    titleShort: 'Mosquito Control West Texas',
    metaDescription: 'One-off or seasonal mosquito treatment priced on property size, vegetation and harbourage. Covered by our 30-day service guarantee.',
    name: 'Mosquito Control',
    short: 'Mosquitoes',
    group: 'pest',
    licenceCategory: 'Pest Control',
    products: ['DeltaGard', 'Talstar'],
    summary: 'One-off treatment or a recurring programme through the season, priced on property size and harbourage.',
    guaranteeApplies: true,
    priority: 3,
    esSlug: 'control-de-mosquitos',
    esName: 'Control de Mosquitos',
  },
  {
    slug: 'flea-and-tick',
    titleShort: 'Flea &amp; Tick Treatment West Texas',
    metaDescription: 'Interior and exterior flea and tick treatment that targets where the activity is coming from, not just where you are seeing it. TPCL 0918482.',
    name: 'Flea & Tick Treatment',
    short: 'Fleas & ticks',
    group: 'pest',
    licenceCategory: 'Pest Control',
    products: ['Precor IGR', 'Talstar', 'DeltaGard'],
    summary: 'Interior and exterior treatment, targeting where the activity is coming from rather than where it is being seen.',
    guaranteeApplies: false,
    priority: 3,
    esSlug: 'pulgas-y-garrapatas',
    esName: 'Pulgas y Garrapatas',
  },
  {
    slug: 'bird-and-pigeon-control',
    titleShort: 'Bird &amp; Pigeon Control West Texas',
    metaDescription: 'Exclusion and deterrent work for pigeons and nuisance birds on roofs, signage, equipment and outbuildings across the Permian Basin.',
    name: 'Bird & Pigeon Control',
    short: 'Birds & pigeons',
    group: 'pest',
    licenceCategory: 'Pest Control',
    products: [],
    summary: 'Exclusion and deterrent work on roofs, signage, equipment and outbuildings.',
    guaranteeApplies: false,
    priority: 3,
    esSlug: 'control-de-aves-y-palomas',
    esName: 'Control de Aves y Palomas',
  },
  {
    slug: 'lawn-care',
    titleShort: 'Lawn Care &amp; Weed Control Seminole TX',
    metaDescription: 'Mowing, trimming, fertilization, tree trimming and weed spraying, priced on the property rather than a flat rate. Licensed in Lawn &amp; Ornamental.',
    name: 'Lawn Care & Weed Control',
    short: 'Lawn care',
    group: 'lawn',
    licenceCategory: 'Lawn & Ornamental',
    products: ['Ranger Pro', 'Prodiamine', 'Celsius XTRA'],
    summary: 'Mowing, trimming and edging, fertilization, tree trimming and weed spraying, priced on the property rather than a flat rate.',
    guaranteeApplies: false,
    priority: 2,
    esSlug: 'jardineria-y-control-de-maleza',
    esName: 'Jardinería y Control de Maleza',
  },
  {
    slug: 'brush-and-lot-clearing',
    titleShort: 'Brush &amp; Lot Clearing West Texas',
    metaDescription: 'Overgrown lots, fence lines and acreage cleared and hauled, including properties under a city or county notice. Licensed in Weed Control.',
    name: 'Brush & Lot Clearing',
    short: 'Brush clearing',
    group: 'lawn',
    licenceCategory: 'Weed Control',
    products: ['Ranger Pro', 'Imazapyr'],
    summary:
      'Overgrown lots, fence lines and acreage cleared and hauled — including properties under a city or county notice.',
    guaranteeApplies: false,
    priority: 2,
    esSlug: 'limpieza-de-terrenos',
    esName: 'Limpieza de Terrenos y Maleza',
  },
  {
    slug: 'junk-removal',
    titleShort: 'Junk Removal &amp; Cleanouts Seminole TX',
    metaDescription: 'Junk hauls, full property cleanouts and ongoing upkeep for owners who are not local. Priced on volume, material and disposal. No contracts.',
    name: 'Junk Removal & Property Cleanouts',
    short: 'Junk removal',
    group: 'junk',
    licenceCategory: 'Pest Control', // not a licensed activity; grouped for nav only
    products: [],
    summary:
      'Junk hauls, full property cleanouts, and ongoing upkeep for owners who are not local. Priced on volume, material and disposal.',
    guaranteeApplies: false,
    priority: 2,
    esSlug: 'retiro-de-escombros',
    esName: 'Retiro de Escombros y Limpieza',
  },
];

/**
 * NOT OFFERED — do not build, do not imply, do not add to a nav.
 * Each entry records why, so nobody has to re-litigate it.
 */
export const EXCLUDED = {
  'bed bug heat treatment': 'C-01 — chemical only. No heat equipment (C-10).',
  fumigation: 'C-01 not ticked, and no Structural Fumigation licence category (B-02).',
  landscaping: 'C-03 not ticked.',
  'dumpster rental': 'C-04 not ticked.',
  'pressure washing': 'C-04 not ticked.',
  demolition: 'C-04 not ticked.',
  'K9 / dog detection': 'C-13 — explicit "No". Belongs to other portfolio brands and must never appear here.',
  'WDI inspections / T-5 reports':
    'HELD. B-05 confirms he is licensed; C-09 says he would rather not do them. No page ships until that decision is confirmed in writing.',
  'oilfield / man camp vertical':
    'HELD. C-07 shows no oilfield work done yet; C-12 says he wants it. Build when there is a real job to point at.',
} as const;

/** C-07 — commercial types he has ACTUALLY worked. Only these get a page. */
export const VERTICALS = [
  { slug: 'apartments', name: 'Apartments & Property Management' },
  { slug: 'restaurants', name: 'Restaurants & Food Service' },
  { slug: 'hotels', name: 'Hotels & Motels' },
  { slug: 'warehouses', name: 'Warehouses' },
  { slug: 'retail', name: 'Retail' },
  { slug: 'offices', name: 'Offices' },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const serviceByEsSlug = (esSlug: string) => SERVICES.find((s) => s.esSlug === esSlug);
