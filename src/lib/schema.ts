/**
 * schema.ts — the ONLY emitter of structured data on this site.
 *
 * Keystone Part 5. Rules enforced here rather than trusted to a writer:
 *   · One emitter. No plugin, no second snippet, no inline JSON-LD in a page.
 *   · Every node is @id-anchored and referenced, never redeclared.
 *   · aggregateRating is emitted ONLY when BUSINESS.reviews.verified is true.
 *     Owner-reported numbers do not qualify. Stars come from the Google
 *     Business Profile, never from markup on our own pages.
 *   · No PostalAddress street line — this is a service-area business whose
 *     address is the owner's home (A-05, I-05, G-03).
 *   · NAP inside schema matches the visible NAP character for character.
 */

import { BUSINESS, SITE_URL, COUNTIES_SERVED, QUICK_ANSWER } from '../data/business';

const abs = (path: string) => new URL(path, SITE_URL).href.replace(/([^:]\/)\/+/g, '$1');

export const ID = {
  website: `${SITE_URL}/#website`,
  business: `${SITE_URL}/#localbusiness`,
  logo: `${SITE_URL}/#logo`,
  person: `${SITE_URL}/#named-expert`,
  webpage: (path: string) => `${abs(path)}#webpage`,
  service: (path: string) => `${abs(path)}#service`,
  faq: (path: string) => `${abs(path)}#faq`,
  breadcrumb: (path: string) => `${abs(path)}#breadcrumb`,
};

export interface Crumb { name: string; path: string }
export interface Faq { q: string; a: string }

export interface GraphInput {
  path: string;
  title: string;
  description: string;
  /** The 40–60 word answer at the top of the page. Also the Speakable target. */
  quickAnswer?: string;
  breadcrumbs?: Crumb[];
  faqs?: Faq[];
  /** Present on service spokes only. */
  service?: { name: string; description: string; areaServed?: string[] };
  image?: string;
  datePublished?: string;
  dateModified?: string;
}

/* ---------- node 1 · WebSite ---------- */
function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${SITE_URL}/`,
    name: BUSINESS.name,
    publisher: { '@id': ID.business },
    inLanguage: 'en-US',
  };
}

/* ---------- node 3 · ImageObject (logo) ---------- */
function logoNode() {
  return {
    '@type': 'ImageObject',
    '@id': ID.logo,
    url: abs('/brand/logo.png'),
    contentUrl: abs('/brand/logo.png'),
    caption: BUSINESS.name,
  };
}

/* ---------- the named expert · Person ---------- */
function personNode() {
  const o = BUSINESS.owner;
  return {
    '@type': 'Person',
    '@id': ID.person,
    name: o.name,
    jobTitle: o.jobTitle,
    worksFor: { '@id': ID.business },
    knowsLanguage: ['en-US', 'es'],
    // hasCredential — the cheapest E-E-A-T win available, and published with
    // explicit owner permission (B-10).
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `Texas Department of Agriculture Structural Pest Control Licence TPCL ${o.tpcl}`,
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Texas Department of Agriculture',
        url: 'https://texasagriculture.gov/',
      },
    },
  };
}

/* ---------- node 4 · LocalBusiness ---------- */
function businessNode() {
  const b = BUSINESS;
  const sameAs = [b.social.facebook, b.social.yelp, b.social.googleBusinessProfile].filter(Boolean);

  const node: Record<string, unknown> = {
    // Subtype list, most specific first. Never grep for a bare "LocalBusiness"
    // string when auditing this — parse the @graph and match the array.
    '@type': ['PestControlService', 'LocalBusiness'],
    '@id': ID.business,
    name: b.name,
    legalName: b.legalName,
    url: `${SITE_URL}/`,
    telephone: b.phoneE164,
    email: b.email,
    image: { '@id': ID.logo },
    logo: { '@id': ID.logo },
    founder: { '@id': ID.person },
    employee: { '@id': ID.person },
    foundingDate: b.foundingDate,
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: b.payments.join(', '),
    // Address WITHOUT a street line — service-area business, address hidden.
    address: {
      '@type': 'PostalAddress',
      addressLocality: b.address.locality,
      addressRegion: b.address.region,
      postalCode: b.address.postalCode,
      addressCountry: b.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
    areaServed: COUNTIES_SERVED.map((c) => ({
      '@type': 'AdministrativeArea',
      name: c,
      containedInPlace: { '@type': 'State', name: 'Texas' },
    })),
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
      geoRadius: String(b.maxDriveMiles * 1609), // D-03 — 100 miles, in metres
    },
    knowsLanguage: ['en-US', 'es'],
  };

  if (sameAs.length) node.sameAs = sameAs;

  // THE GATE. Owner-reported 12 reviews at 5.0 is not a verified reading.
  // This stays suppressed until we read it off the live profile ourselves.
  if (b.reviews.verified && b.reviews.count > 0) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: b.reviews.rating,
      reviewCount: b.reviews.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return node;
}

/* ---------- node 2 · WebPage ---------- */
function webpageNode(input: GraphInput) {
  const node: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': ID.webpage(input.path),
    url: abs(input.path),
    name: input.title,
    description: input.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.business },
    inLanguage: 'en-US',
    primaryImageOfPage: { '@id': ID.logo },
  };
  if (input.datePublished) node.datePublished = input.datePublished;
  if (input.dateModified) node.dateModified = input.dateModified;
  if (input.breadcrumbs?.length) node.breadcrumb = { '@id': ID.breadcrumb(input.path) };

  // M4 — voice search. Points at the Quick Answer and the FAQ region.
  const targets: string[] = [];
  if (input.quickAnswer) targets.push('[data-speakable]');
  if (input.faqs?.length) targets.push('.faq-speakable');
  if (targets.length) {
    node.speakable = { '@type': 'SpeakableSpecification', cssSelector: targets };
  }
  return node;
}

/* ---------- node 7 · BreadcrumbList ---------- */
function breadcrumbNode(input: GraphInput) {
  if (!input.breadcrumbs?.length) return null;
  return {
    '@type': 'BreadcrumbList',
    '@id': ID.breadcrumb(input.path),
    itemListElement: input.breadcrumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/* ---------- node 6 · FAQPage ---------- */
function faqNode(input: GraphInput) {
  if (!input.faqs?.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': ID.faq(input.path),
    mainEntity: input.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/* ---------- node 5 · Service ---------- */
function serviceNode(input: GraphInput) {
  if (!input.service) return null;
  return {
    '@type': 'Service',
    '@id': ID.service(input.path),
    name: input.service.name,
    description: input.service.description,
    serviceType: input.service.name,
    provider: { '@id': ID.business },
    // Reviewed by the named credentialed operator — real attribution.
    // NOTE: Service is not an eligible type for review snippets and we never
    // attach review markup to it. This is an authorship signal only.
    areaServed:
      input.service.areaServed?.map((a) => ({ '@type': 'AdministrativeArea', name: a })) ??
      COUNTIES_SERVED.map((c) => ({ '@type': 'AdministrativeArea', name: c })),
  };
}

/**
 * buildGraph — assemble the connected @graph for one URL.
 * Exactly one of these renders per page, inside a real <script type="application/ld+json">.
 */
export function buildGraph(input: GraphInput) {
  const nodes = [
    websiteNode(),
    webpageNode(input),
    logoNode(),
    businessNode(),
    personNode(),
    serviceNode(input),
    faqNode(input),
    breadcrumbNode(input),
  ].filter(Boolean);

  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Default Quick Answer for pages that do not define their own. */
export const DEFAULT_QUICK_ANSWER = QUICK_ANSWER;
