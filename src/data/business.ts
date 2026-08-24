/**
 * business.ts — the single source of truth for every NAP, licence, phone and
 * social string on this site. Nothing below may be hardcoded in a page body.
 *
 * Every value is taken verbatim from the owner intake returned August 2026.
 * The question code that produced each value is noted so any figure can be
 * traced back to the answer that authorised it.
 *
 * RULE: if a fact is not in here, it does not go on the site.
 */

export const SITE_URL = 'https://www.trustedtermiteandpest.com';

export const BUSINESS = {
  /* ---- identity (A-01, A-02) ---- */
  legalName: 'Trusted Termite and Pest Solutions LLC',
  name: 'Trusted Termite and Pest Solutions LLC',
  shortName: 'Trusted Termite & Pest Solutions',
  tagline: 'Seminole-based pest, termite, lawn and junk removal',

  /* ---- the named expert (F-01, F-03, B-01, B-03, B-11) ---- */
  owner: {
    name: 'Valentin Moriel',
    jobTitle: 'Owner',
    /** TDA structural pest control business licence. B-01. Published with
     *  explicit permission — B-10 answered "Yes". */
    tpcl: '0918482',
    licenceClass: 'Responsible Certified Applicator', // B-03
    /** B-02. Weed Control and Lawn & Ornamental are SEPARATE categories from
     *  Pest Control. Do not imply a category not listed here. */
    categories: [
      'Pest Control',
      'Termite Control',
      'Lawn & Ornamental',
      'Weed Control',
    ],
    /** B-05: licensed to complete a Texas Official WDI Report (form SPCS/T-5).
     *  NOTE — C-09 says he would rather not perform WDI inspections. No WDI or
     *  realtor-channel page ships until that decision is confirmed in writing. */
    canSignWDI: true,
    wdiDecisionConfirmed: false,
    yearsInTrade: 6, // B-11 — personal experience, NEVER conflated with foundingDate
    trainedAt: 'Pest Defense Solutions and a Terminix-Rentokil branch, El Paso', // B-12
    homeTown: 'Seminole, Texas', // F-05 — graduated high school here
    languages: ['en', 'es'], // F-07 — fluent Spanish
    photoPending: true, // F-10 — agreed to supply headshot + truck
  },

  /* ---- contact (A-06, A-08, I-06) ---- */
  phone: '(432) 278-7294',
  phoneE164: '+14322787294',
  /** A-07. A 915 (El Paso) number. DELIBERATELY NOT PUBLISHED — see
   *  PHASE-0-WORK-ORDER.md. Google currently mis-resolves this business to
   *  El Paso; a 915 number on a Seminole site confirms the wrong answer. */
  secondPhoneUnpublished: '(915) 474-1986',
  email: 'Trustedtermiteandpest@gmail.com', // A-08. A-09: branded address wanted, pending.

  /* ---- address (A-03, A-04, A-05, I-05) ---- */
  address: {
    street: '201 SW Ave H',
    locality: 'Seminole',
    region: 'TX',
    postalCode: '79360',
    country: 'US',
  },
  /** A-05 + I-05 + G-03: home address, hidden. Service-area business.
   *  The street address must NEVER render in visible HTML or in schema
   *  PostalAddress. Locality + region only. */
  publishStreetAddress: false,
  geo: { lat: 32.7195, lng: -102.6446 }, // Seminole, TX — city centroid, not the home

  /* ---- history (A-10) ---- */
  foundingDate: '2025-11',
  foundingDateHuman: 'November 2025',

  /* ---- credentials (B-06, B-07) ---- */
  insurance: {
    carrier: 'Markel',
    bodilyInjuryAndProperty: 500000,
    aggregate: 1000000,
  },
  bonded: false, // B-07 — do not claim
  associations: [], // B-09 — none yet. Do not invent.
  awards: [], // F-13 — none yet
  community: [], // F-12 — none yet

  /* ---- commercial terms (E-04, E-06, E-07, E-08) ---- */
  contracts: false, // E-04 — "No contracts"
  discounts: ['Military'], // E-06 — ONLY military. Do not add others.
  payments: ['Cash', 'Check', 'Card in person', 'Card online', 'Venmo', 'CashApp', 'Zelle'],
  financing: { offered: true, note: 'on certain terms, for larger jobs' }, // E-08

  /* ---- pricing (E-01 "ranges", E-02) ---- */
  pricing: {
    publish: 'ranges' as const,
    recurringPerVisit: '$140–$160+',
    initialService: '$200–$250',
    note: 'Termite, bed bug, mosquito, lawn and junk work is individually quoted.',
  },

  /* ---- guarantee (E-09, E-10, E-11) — verbatim scope, do not embellish ---- */
  guarantee: {
    termDays: 30,
    name: '30-day service guarantee',
    covers:
      'Pests included in the original treatment. If activity continues within 30 days of service we return, inspect and re-treat the affected area at no additional charge.',
    excludes:
      'A new or different pest problem, conditions outside the scope of the original service, and specialty work — termites, bed bugs, rodents, wildlife, fleas and ticks — which carry their own terms.',
    planExtra:
      'Customers on a recurring plan also receive complimentary re-services between scheduled visits for covered pests.',
    termsPath: '/our-guarantee/',
  },
  termiteWarranty: {
    termMonths: 12,
    covers: 'Re-treatment of the affected area if active termites are found in a covered area during the warranty period.',
    excludes: 'Existing termite damage, repairs to the structure, and damage caused by future termite activity.',
    renewable: true,
  },

  /* ---- reviews (G-01, G-02, G-03, G-04) ---- */
  reviews: {
    platform: 'Google Business Profile',
    /** Owner-reported at G-02. Keystone 5.3: aggregateRating is emitted ONLY
     *  from a verified platform reading. `verified` stays false — and
     *  buildGraph() suppresses the node — until we read it off the live
     *  profile ourselves. Owner-reported is not verified. */
    count: 12,
    rating: 5.0,
    verified: false,
    profileType: 'service-area, address hidden', // G-03
    primaryCategory: 'Pest Control', // G-04
    secondaryCategories: ['Lawn Care'],
  },

  /* ---- sameAs (G-07, G-08) ---- */
  social: {
    facebook: 'https://www.facebook.com/share/1HfqSSC2iZ/',
    /** G-07 lists Yelp but G-08 supplied no URL. Omitted rather than guessed. */
    yelp: null as string | null,
    googleBusinessProfile: null as string | null, // to be captured from the live profile
  },

  /* ---- brand (A-12, A-13) ---- */
  brand: {
    colors: ['black', 'white', 'lime green'],
    logoFormatOnHand: 'PNG',
    vectorPending: true, // A-11 unresolved — see open items
  },

  /* ---- operations (D-03, D-05, H-08, H-09, F-06) ---- */
  solo: true, // F-06 — "Im solo". Never write "our team" or "our technicians".
  answersOwnPhone: true, // H-08 — 90% of the time
  preferredContact: 'phone' as const, // H-09 — "Call is best to book"
  onlineBooking: false,
  maxDriveMiles: 100, // D-03 — "Lubbock or 100 miles"
  tripFee: false, // D-05 — no trip fee; job minimums discussed for out-of-town
} as const;

/** areaServed. D-01 confirmed towns only. El Paso is DELIBERATELY ABSENT —
 *  D-02 answered "By appointment only" at ~300 miles, which is not a routable
 *  market and is the cause of the live wrong-city indexing defect. */
export const COUNTIES_SERVED = [
  'Gaines County',
  'Yoakum County',
  'Andrews County',
  'Dawson County',
  'Terry County',
  'Howard County',
  'Midland County',
  'Ector County',
  'Lubbock County',
] as const;

export const NAP_LINE = `${BUSINESS.address.locality}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;

/** Single AEO Quick Answer string. Keystone doctrine 3: this exact text is
 *  reused three ways — meta description source, first FAQPage answer, and the
 *  SpeakableSpecification target. 47 words. */
export const QUICK_ANSWER =
  'Trusted Termite and Pest Solutions is a locally owned pest control, lawn and junk removal company based in Seminole, Texas, serving Gaines County and the Permian Basin. Owner Valentin Moriel holds Texas Department of Agriculture licence TPCL 0918482 in pest control, termite, lawn and weed categories.';
