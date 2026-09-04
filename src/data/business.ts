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
    /** What he goes by, and what this site calls him everywhere. Owner
     *  instruction, 31 August 2026: use Valentin. */
    name: 'Valentin Moriel',
    /** The name the TDA licence is issued in, read off the certificate on
     *  31 August 2026. NOT PUBLISHED anywhere on the site — it is here so the
     *  record is complete and so nobody re-verifying the licence concludes it
     *  has been pulled.
     *
     *  Why it is worth a field of its own: /about/ tells the reader to look the
     *  licence up by NUMBER and calls that check conclusive. They will find it,
     *  and the record will name Jesus Moriel over Trusted Termite and Pest
     *  Solutions LLC. The business name matches; the person's does not. Going
     *  by a middle name is ordinary, but this site's whole argument is that its
     *  claims are checkable, and a reader who checks deserves to not be
     *  surprised. Whether to say so on /about/ is the owner's call and has not
     *  been made — see P0-9. */
    legalName: 'Jesus Moriel',
    legalNamePublished: false,
    jobTitle: 'Owner',
    /** TDA structural pest control licence number. Published with explicit
     *  permission — B-10 answered "Yes".
     *
     *  CORRECTED 31 August 2026. B-01 recorded 0918482. That number is wrong —
     *  it appears nowhere on the licence and the owner has confirmed he gave it
     *  mistakenly. The correction was caught because the vehicle livery reads
     *  TPCL#0976265 and disagreed with the site, and it was then settled against
     *  the licence document itself, which prints "TDA TPCL No: 0976265".
     *
     *  The lesson is worth keeping: an owner-recalled licence number is not a
     *  source. Everything on this line now traces to the certificate. */
    tpcl: '0976265',
    /** The applicator licence number, printed on the same certificate as
     *  "License No" and distinct from the TPCL above. HELD, NOT PUBLISHED — the
     *  site makes one licensure claim and two numbers side by side invites a
     *  reader to check the wrong one against TDA. It lives here so the record is
     *  complete and so nobody mistakes it for the TPCL a second time. */
    applicatorLicenceNo: '0946390',
    /** The certificate is titled COMMERCIAL CERTIFIED APPLICATOR LICENSE and the
     *  covering letter uses the same phrase. B-03 said "Responsible Certified
     *  Applicator", which in Texas is a ROLE a licensed business designates,
     *  not a licence class — he may well hold it, being the sole owner, but the
     *  certificate does not evidence it and this site does not publish claims it
     *  cannot show. Reinstate only against something that says so. */
    licenceClass: 'Commercial Certified Applicator',
    /** Issued 31 December 2025, expires 30 November 2026 — read off the
     *  certificate. The whole site rests on this being current; see LIC-01,
     *  which now falls due before the expiry rather than after it. */
    licenceIssued: '2025-12-31',
    licenceExpires: '2026-11-30',
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
    /** C-09 ANSWERED YES, August 2026 — he will take WDI work. Both WDI pages
     *  ship on this flag; nothing else gates them. */
    wdiDecisionConfirmed: true,
    /** The WDI travel radius, owner-stated August 2026. NOT the same number as
     *  the general 100-mile territory (D-03) and it must never be conflated
     *  with it — a real-estate page makes a dated service promise, and a
     *  promise built on the wrong figure fails somebody at closing.
     *
     *  CONSEQUENCE, and it is a real one: Big Spring is about 95 miles out and
     *  therefore sits OUTSIDE this radius while remaining inside the general
     *  territory. Odessa and Stanton sit exactly on the line at 90. The WDI
     *  page derives that list from towns.ts rather than restating it, so the
     *  two can never drift apart. If he revises this number, the page follows
     *  automatically — see BIZ-06 in the cadence registry. */
    wdiRadiusMi: 90,
    /** B-05 follow-up, owner-stated August 2026: the notice he wants on a WDI
     *  booking. Three days is a minimum he named, not a guarantee we invented,
     *  and the page frames it as what he asks for rather than what he promises. */
    wdiNoticeDays: 3,
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
  /** A-08. A-09 asked whether he wanted a branded address at the domain; he
   *  answered Aug 2026 that the Gmail address "will work for the time being",
   *  so this stays as-is. Revisit once the domain question (H-01) settles —
   *  nothing hardcodes it, so it is a one-line change here when he wants it. */
  email: 'Trustedtermiteandpest@gmail.com',

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
  /** E-08 answered that financing was available on larger jobs. REVERSED by
   *  the owner in August 2026: he does not offer it and does not want it
   *  implied anywhere on the site. The flag stays here set false rather than
   *  being deleted, because "we asked and the answer is no" is a different
   *  fact from "we never asked" — and if he takes it on later this is the one
   *  line that turns it back on. /financing/ was retired at the same time and
   *  now redirects; see src/data/redirects.ts. */
  financing: { offered: false, note: null as string | null },

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
    /** G-07 lists Yelp but G-08 supplied no URL. Owner reported Aug 2026 that
     *  the listing is still under review by Yelp, so there is nothing to link
     *  yet. Omitted rather than guessed — a sameAs pointing at a listing that
     *  never publishes is worse than no sameAs at all. */
    yelp: null as string | null,
    googleBusinessProfile: null as string | null, // to be captured from the live profile
  },

  /* ---- brand (A-12, A-13) ---- */
  brand: {
    colors: ['black', 'white', 'lime green'],
    logoFormatOnHand: 'PNG',
    /** A-11 STILL UNRESOLVED. He supplied a dark-variant logo in August 2026 at
     *  1500px, which is bigger than anything we had — but it is raster, so this
     *  stays true. The vector is still outstanding and a raster logo will show
     *  its edges on print, vehicle livery and any large format. */
    vectorPending: true,

    /* ---- the two logo variants on hand, and why only one is usable in the UI ----
     *
     * /brand/logo.png       LIGHT variant. 512px, transparent, WHITE bug, BLACK
     *                       tagline. This is the header logo and the only one
     *                       that composites onto the page background.
     *
     * /brand/logo-dark.png  DARK variant, supplied August 2026 at 1500px, with
     *                       ONE correction applied by us — see below. Black bug,
     *                       black shield, baked-in black background, no alpha.
     *                       It CANNOT be made transparent: the bug and shield are
     *                       themselves black, so knocking out the background
     *                       would punch holes through the artwork. It therefore
     *                       only works composited on a dark ground, which is why
     *                       it drives the social card and nothing else.
     *
     * ⚠️ THE CORRECTION, recorded so nobody "fixes" it back. As supplied, the
     * tagline TERMITE & PEST SOLUTIONS was #151515 on #000000 — a measured
     * contrast ratio of 1.15:1, against the 4.5:1 WCAG asks for text at that
     * size. The words naming the actual service were invisible. We lifted only
     * those glyph pixels to #BEBEBE (11.3:1) and left every other pixel — shield,
     * bug, leaves, wordmark, background — untouched. The green wordmark was
     * already fine at 10:1 and was not altered.
     *
     * If he ever supplies a corrected original, replace logo-dark.png and
     * regenerate the social card from it rather than re-applying this patch. */
    logoDarkTaglineCorrected: true,
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
  'Trusted Termite and Pest Solutions is a locally owned pest control, lawn and junk removal company based in Seminole, Texas, serving Gaines County and the Permian Basin. Owner Valentin Moriel holds Texas Department of Agriculture licence TPCL 0976265 in pest control, termite, lawn and weed categories.';
