# CONTENT_BRIEF.md — Trusted Termite & Pest Solutions

**Every writer on this build reads this file before writing a word.** It is the
highest-leverage file in the project: it carries the verbatim business facts, the
anti-slop rules, the voice, the section spec per page type, the valid slug list
and the internal-linking rules.

Issued August 2026 · sourced entirely from the owner intake (129 answers) and
cited market research. Question codes (`B-05`, `K-07`) trace every fact back to
the answer that authorised it.

---

## 0 · The one rule

**If a fact is not in `src/data/` or in this brief, it does not go on the site.**

Do not infer. Do not round up. Do not write "our team" for a one-man operation,
do not write "over a decade" for six years, and do not write a service he does
not perform. When you need a fact you do not have, leave a `TODO(fact):` marker
and flag it — a blank costs five minutes, a fabrication costs a client.

---

## 1 · Who this business actually is

| | |
|---|---|
| Legal name | Trusted Termite and Pest Solutions LLC |
| Owner | **Valentin Moriel**, Owner — the only person in the business (F-06: "Im solo") |
| Licence | TDA **TPCL 0918482**, Responsible Certified Applicator (B-01, B-03) |
| Categories | Pest Control · Termite Control · Lawn & Ornamental · Weed Control (B-02) |
| Experience | **6 years in the trade** (B-11) — business founded **November 2025** (A-10). Never blend these. |
| Trained | Pest Defense Solutions and a Terminix-Rentokil branch, El Paso — Operations Manager then Service Manager (B-12) |
| From | Seminole. Graduated high school here. (F-05) |
| Languages | English and **fluent Spanish** (F-07) |
| Insurance | Markel, $500k bodily injury and property damage / $1M aggregate (B-06) |
| Phone | (432) 278-7294 — his own cell, answered ~90% of the time (H-08, I-06) |
| Base | Seminole, TX 79360 — **address hidden**, service-area business (A-05, I-05, G-03) |

### Never write

- ❌ "Our team", "our technicians", "our staff" — **it is one man.**
- ❌ "Over a decade of experience" — six years.
- ❌ "Serving El Paso" — see §5.
- ❌ "Family-owned for generations" — founded November 2025.
- ❌ Any award, association or community involvement — he has none yet (B-09, F-12, F-13).
- ❌ "Bonded" — he is not (B-07).
- ❌ "100% satisfaction guarantee" — replaced by a defined 30-day term. See §6.
- ❌ "#1", "best", "top-rated" or any unsubstantiated superlative.

---

## 2 · Voice

Write the way Valentin talks. He is direct, unhurried, explains rather than
sells, and does not pressure. His own description of a sales call (F-14) is the
tuning fork for the entire site:

> "I usually start by listening and asking questions about exactly what they're
> dealing with instead of immediately trying to sell them something… I don't try
> to pressure them. I explain the problem, give them my recommendation, answer
> their questions, and let the quality of the service speak for itself."

**Rules that follow from that:**

1. **Explain the mechanism, not the benefit.** "Scorpions come in through weep
   holes, utility penetrations, the water heater closet and the irrigation box"
   beats "we protect your family from dangerous pests."
2. **Name the real thing.** Real product names (§4), real subdivisions (§5),
   real species, real ordinance numbers. Specificity is the whole strategy.
3. **Concede where a concession is true.** "You probably don't have the termite
   you think you have" is the strongest page on this site precisely because it
   costs us a sale sometimes.
4. **No fear selling.** Ever. He came from an operation that did it and left.
5. **Second person, plain sentences, no jargon without a translation.**
6. **British-style hedging is fine; marketing intensifiers are not.** No
   "cutting-edge", "state-of-the-art", "unparalleled", "peace of mind" as filler.

---

## 3 · The anti-slop rules

- **M1 — 3,000–5,000 unique words per indexable page.** The word-count auditor
  enforces it. A page under 3,000 does not ship; it stays `noindex` until it is
  written. A thin geo page is worse than no geo page.
- **No template variables in body copy.** The page title never appears verbatim
  inside a sentence. Generated sentences must read as if a person who knows the
  town wrote them for that town.
- **Research before writing.** Every writer pulls the real local facts — soil,
  housing stock, named neighbourhoods, ordinance, seasonal pressure — from
  `src/data/towns.ts` *before* drafting. This is the anti-slop engine, not a nicety.
- **Boilerplate lives in components, never in bodies.** The CTA, trust strip and
  service cards repeat by design and are excluded from the duplicate scanner.
  Page bodies must be unique.
- **Run the duplicate-sentence scanner between waves.** Any ≥10-word sentence on
  ≥3 pages gets rewritten unless it is a NAP line or a legal statement.
- **One idea per section, answer-first inside each.** Question-formed H2s.

---

## 4 · Products actually used (C-11 verbatim)

Name these. Do not invent others. Do not write "safe, effective treatments".

- **General pest:** Alpine WSG, Onslaught FastCap, Suspend PolyZone, Demand CS,
  Scion, Transport, Bifen LP, Talstar, DeltaGard, DeltaDust, Precor IGR, Niban,
  Advance 375A, professional roach and ant baits
- **Termite:** Termidor HE, Termidor SC, Trelona bait stations, Bora-Care
- **Rodent:** FirstStrike, plus professional bait stations, traps, monitoring, exclusion
- **Vegetation and lawn:** Ranger Pro, Prodiamine, Imazapyr, Celsius XTRA, professional marking dye

His own framing, worth paraphrasing but not overusing: *"We don't believe in
using one product for everything… The goal is to identify the problem, choose
the right approach, and solve it correctly — not just spray something and leave."*

---

## 5 · Territory and the local facts

**Towns served today (D-01):** Seminole, Seagraves, Denver City, Andrews, Lamesa,
Brownfield, Big Spring, Midland, Odessa, Lubbock. Maximum drive ~100 miles (D-03).
No trip fee; job minimums discussed for out-of-town work (D-05).

**Scaffolded, not served:** Kermit, Stanton (D-07). Built, held, `noindex`.

### El Paso — read this before writing anything about it

D-02 answered "By appointment only" at ~300 miles. B-12 and F-04 show he
**trained there** across two branches over six years.

- ❌ **Never** in `areaServed`, a city page, the footer, or a service area list.
  Google currently mis-resolves this business to El Paso and that defect is live.
- ✅ **Always fine** in his biography on `/about/` — it is the honest reason a
  nine-month-old company knows what it is doing.
- ❌ The 915 second number is **not published anywhere** on the site (A-07).

### Named neighbourhoods (D-09) — use them

- **Seminole:** Countryside Estates, Arrowhead Estates, Copper Ridge, Country
  View Estates, Diamond Hill Estates, the golf course, county-road acreage
- **Midland:** Green Tree, Grassland Estates, Saddle Club, Greathouse,
  Briarwood, Polo Park (north and northwest Midland)
- **Odessa:** Mission Estates, Parks Bell Ranch (north and northeast Odessa)
- **Lubbock:** residential, apartment communities, commercial — *no named
  neighbourhoods supplied yet.* `TODO(fact)` before the Lubbock page ships.

### The fire ant line — the best uncontested fact we have

Per TDA 4 TAC §19.101: **Gaines, Andrews, Yoakum and Dawson are NOT quarantined.
Midland, Ector, Howard and Winkler ARE. Lubbock is partial. Terry (Brownfield) is
unverified — do not claim either way.** Nobody in this market uses this.

### The termite honesty angle

AgriLife: subterranean termites thin out inland and are "noticed less often in
the High Plains and far West Texas." Formosan and drywood termites do **not**
occur here. What is here is the arid-land subterranean termite and the desert
termite — and the desert termite eats dead grass, not structures. The white
sheeting on a lawn after a summer storm is usually that.

**This is a real fact and it costs us sales. Publish it anyway.**

---

## 6 · Guarantee language (E-09, E-10, E-11)

Every use of "guarantee" links to `/our-guarantee/`. No exceptions.

- **30-day service guarantee** — pests included in the original treatment; we
  return, inspect and re-treat at no charge inside 30 days.
- **Does not cover** — a new or different pest, conditions outside the original
  scope, or specialty work (termites, bed bugs, rodents, wildlife, fleas, ticks).
- **Recurring plan customers** also get re-services between scheduled visits.
- **Termite: one-year re-treatment warranty.** Covers re-treatment **only** — not
  existing damage, not structural repair, not future damage. Renewable annually.

State the exclusions plainly. That clause is the one every competitor fudges and
it is a selling point, not a liability.

---

## 7 · Pricing (E-01 "ranges", E-02, E-03)

Publish **ranges**, never a fixed price.

- Recurring residential: **$140–$160+ per visit**, by home size, pressure, frequency
- Initial service: **$200–$250** — first visit is more extensive
- Termite, bed bug, mosquito, lawn, brush, junk: **individually quoted after inspection**
- **No contracts** (E-04) — say it often, it is the strongest offer in this market
- **Military discount only** (E-06). Do not list others.
- Financing on larger jobs, on agreed terms (E-08)

Note this is at the **top** of the West Texas range, not the bottom. Do not write
price-led copy. Lead with method and care.

---

## 8 · Page-type section spec

### T1 — Home
Hero value prop + primary CTA → trust strip → Quick Answer → service entry grid →
why-us (the Terminix contrast, in his words) → locations grid → guarantee →
FAQ (6–8) → CTA.

### T4 — City page (see `/locations/seminole/` — **the exemplar, match its depth**)
Quick Answer scoped to the city → H1 `Pest Control in {City}, Texas` → trust strip
→ who else serves this town and from how far → local ground conditions (soil,
housing, fields) → what we get called about here (4 cards, real species) → named
neighbourhoods → services in this city → how the work goes (products, guarantee)
→ month-by-month for this town → things we'd rather say up front → FAQ (6–8, at
least one Spanish) → city-named CTA.

### T2 — Service spoke
Quick Answer → expert block → what's included → method → what it costs → problem-page
links → local proof → guarantee link → FAQ → CTA.

### T8 — Compliance / ordinance page
The rule stated plainly → who it applies to → obligations → penalties → how we
help → source citation and review date → FAQ.

**Every page also carries:** the shared hero/social image and logo (M7); Speakable
hooks on the Quick Answer and FAQ (M4); optimised title ≤60 and description
110–165 ending on punctuation (M5); alt text on every image (M6); 3,000–5,000
unique words (M1); links **up** to its parent, **in** to the hub and **laterally**
to siblings (M3).

---

## 9 · URL taxonomy — frozen, do not add patterns

```
/                                 home / hub
/services/                        services hub (never two)
/services/{service}/              service spoke
/services/{service}/{problem}/    problem micro page
/locations/                       geo hub
/locations/{city}/                city page
/locations/{city}/{neighborhood}/ neighbourhood page
/pest-library/{pest}/             library profile
/commercial/{vertical}/           industry vertical
/compliance/{topic}/              code / ordinance page
/our-guarantee/                   defined warranty terms
/financing/                       BNPL + payment
/about/                           named-expert Person page
/es/servicios/{service}/          Spanish tree
```

Valid service slugs are exactly the twelve in `src/data/services.ts`. Valid town
slugs are exactly the ten in `src/data/towns.ts`. Anything else is a dead link
and the harness will fail the build.

---

## 10 · Scope

**There is no capacity cap on this build.** Build the full surface — every town
he serves, every neighbourhood he named, every confirmed service, the Spanish
tree, the pest library, the commercial verticals. If the site brings in more work
than one truck can run, he hires; that is his call, not a reason to build less.

The only limiter is data. A page ships when we hold enough real local fact to
write it past 3,000 unique words, and not before.

---

## 10b · Spanish tree — the rule

Spanish pages are **written in Spanish, not translated**. Neutral Latin
American Spanish, *usted* throughout. Regional vocabulary for this market:
**alacrán** leads over *escorpión* (alacrán is the common term in northern
Mexico and among Mexican-American families here), *chinches*, *plomería*.

**Every honesty gate carries over unchanged.** Same licence facts, same
guarantee terms, same refusals (no fumigación, no tratamiento térmico para
chinches), no pricing figures, no `aggregateRating`, and never *nuestro
equipo* — he is a solo operator.

**A Spanish page ships only when written to the full M1 floor.** A half-
translated page is worse than an English page with a Spanish phone
conversation behind it. Declaring an `esSlug` in `services.ts` does **not**
create a page; the hubs link only what exists and list the rest without links.

**hreflang is reciprocal or it is absent.** `altLangPath` is set on BOTH sides
of a pair, never one. The harness fails the build on a hreflang that points at
a page which does not exist — verified by negative test.

Written so far: `/es/`, `/es/servicios/`, `control-de-plagas`,
`control-de-escorpiones`, `control-de-termitas`. The other nine services have
slugs reserved in `services.ts` and no pages.

---

## 11 · Held — do not write these yet

| What | Why | Unblocks when |
|---|---|---|
| WDI / T-5 / realtor + lender cluster | B-05 says he's licensed; C-09 says he'd rather not do them | Owner confirms in writing. **BUILT AND PARKED** — `/compliance/wdi-report/` and `/services/termite-control/wdi-inspection/` are written to depth and held at noindex. Both gate on `BUSINESS.owner.wdiDecisionConfirmed`. Flip that ONE flag in `business.ts` to `true` and both ship. Verified: flag true → 46 indexable, both pass M1. ⚠️ Before shipping, replace the placeholder scheduling limits on the service page with his actual answer on radius and notice period. |
| Oilfield / man-camp vertical | C-07 shows no oilfield work done; C-12 says he wants it | There is a real job to point at |
| Kermit, Stanton city pages | D-07 — wants them, doesn't serve them | He starts running them |
| Community / sponsorship proof | F-12 — none yet | He joins something |
| `aggregateRating` in schema | Owner-reported 12 @ 5.0 is not a verified read | We read the live GBP ourselves |
| Any Lubbock neighbourhood claim | D-09 gave none for Lubbock | He names some |
| Caliche-and-termites causal claims | No extension-grade source found | A real source is located |
| Seminole weed ordinance specifics | eCode360 blocks access | One call to the city inspector |
