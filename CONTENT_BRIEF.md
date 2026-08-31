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
| Licence | TDA **TPCL 0976265**, Commercial Certified Applicator (B-01, B-03) |
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
  neighbourhoods supplied, and the neighbourhood tier for Lubbock was shelved in
  August 2026 rather than answered.* The town page ships as it is; no
  neighbourhood page is written for Lubbock without real place names, which has
  not changed and is not negotiable.

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
- ~~Financing on larger jobs, on agreed terms (E-08)~~ — **WITHDRAWN August 2026.**
  He does not offer financing. E-08 said otherwise and every surface that repeated
  it has been cleared; `/financing/` is retired and redirects to `/contact/`.
  Do not reintroduce it from the intake, which still carries the old answer.

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

**COMPLETE as of August 2026.** All twelve services now have a Spanish page at
the full M1 floor, plus `/es/` and `/es/servicios/`. Every pair is reciprocal in
`hreflang`, verified by the harness.

**The maintenance rule this creates — read `I18N-01` in the decay registry.**
The drift risk runs one way and is easy to miss: somebody edits an English page
and the Spanish pair silently keeps the old claim. **Any change to a service
fact goes on both pages in the same commit.** The pairs carrying hard refusals
are the ones that must never diverge — chinches (no heat treatment), fauna (no
poison; bats referred out; a bite goes to animal control and a doctor), aves (no
poison or shooting; active nests untouched; native species protected), and the
guarantee split: rodent, bed bug, flea and tick, lawn and bird work do **not**
carry the 30-day guarantee, and mosquito work **does**.

---

## 11 · Held — do not write these yet

| What | Why | Unblocks when |
|---|---|---|
| ~~WDI / T-5 / realtor + lender cluster~~ | ~~B-05 / C-09~~ | **RESOLVED Aug 2026 — SHIPPED.** He confirmed YES, gave three days as the notice he asks for, and then the last missing figure: a **90-mile WDI travel radius**. `BUSINESS.owner.wdiDecisionConfirmed` went `true` and both `/compliance/wdi-report/` and `/services/termite-control/wdi-inspection/` shipped on that one edit — 88 indexable, 0 held, both past M1. The 90-mile radius is stored as `owner.wdiRadiusMi` and is **not** the 100-mile general territory (D-03); the service page states both numbers and says why they differ, and derives the outside-radius town list from `towns.ts` so it cannot drift — Big Spring falls out at ~95 miles while staying inside the ordinary territory. Tracked as `BIZ-06`. |
| Oilfield / man-camp vertical | C-07 shows no oilfield work done; C-12 says he wants it | There is a real job to point at |
| ~~Stanton city page~~ | ~~D-07~~ | **RESOLVED Aug 2026 — SHIPPED as a by-request page.** He answered "Have not currently serviced yet but would if a call came through," so the page was rewritten to claim exactly that and no more, and published. See §11b. |
| ~~Kermit city page~~ | ~~D-07~~ | **RESOLVED Aug 2026 — SHIPPED as a by-request page**, 4,291 words. Winkler County is still outside the nine confirmed counties and the page says so twice, in the quick answer and in the first paragraph under the H1. See §11b. |
| Community / sponsorship proof | F-12 — none yet | He joins something |
| `aggregateRating` in schema | Owner-reported 12 @ 5.0 is not a verified read | We read the live GBP ourselves |
| Any Lubbock neighbourhood claim | D-09 gave none for Lubbock | **SHELVED Aug 2026, by the agency — no longer a pending owner question.** His answer was "Wolfforth area of Lubbock", and Wolfforth is not a Lubbock neighbourhood: it is a separate incorporated city in Lubbock County (pop. 5,521 at the 2020 census) with its own weed ordinance at 12 inches / 7 days. The tier is off the list rather than answered. The rule below is unchanged and still binding — nothing about Lubbock neighbourhoods gets written without real place names. Reopens only if those arrive unprompted. See `HELD-LUBBOCK-HOODS`. |
| Caliche-and-termites causal claims | No extension-grade source found | A real source is located |
| ~~Seminole weed ordinance specifics~~ | ~~eCode360 blocks access~~ | **RESOLVED Aug 2026 (K-04).** 12 inches, 10 days, annual rule; § 6.403 verified against the published contents, figures relayed from the city office. Both surfaces attribute them as second-hand and the comparison table daggers the row — `figuresFromCityOffice` on the town row drives it. Do not drop that marker. |

---

## 12 · Cadence — after the build

The build ends; the site does not. `CADENCE.md` is the operating procedure and
`src/data/maintenance.ts` is its machine-readable half — the decay registry, the
held ledger and the publishing queue.

**The rule this adds to §0.** §0 says a fact not in `src/data/` or this brief
does not go on the site. §12 adds the second half: **a fact from an outside
authority gets a row in `DECAYING_FACTS` in the same commit as the page that
cites it.** A citation with no row is unmaintained by construction — which is
exactly how the 48-hour sign at 4 TAC §7.146 came to run backwards on four
pages before it was caught.

`lastVerified` records a human reading the primary source. Not the date a page
was edited, not the date somebody was fairly confident. Moving it without
reading the source falsifies the one record that makes the rest trustworthy.

Two commands:

- `npm run verify` — build correctness, and now a hard failure on any critical
  or high-severity fact past its interval.
- `npm run cadence` — the full decay report, the held ledger reconciled against
  `dist/`, and the queue. Run it on the first working day of each month.

`Verified.astro` renders the stamp on the compliance and WDI pages, so the
registry is visible to the reader rather than being an internal promise. Pass
it the fact ids the page actually depends on; the oldest date wins, because a
page is only as current as its stalest claim.

**The queue, in order:** neighbourhood layer (13 pages, all data in hand) →
Spanish service tree (9) → pest library (6–8) → service problem spokes (8–12) →
held releases. See `CADENCE.md` §4.


---

## 11b · By-request towns — the rule

A town where the owner does **not** run a route but **would** drive if somebody
called is not a served town and is not nothing. `byRequest: true` on the town
row in `towns.ts` marks it, and every surface that lists towns must render it
differently from the ones he actually runs. A grid that shows a by-request town
identically to a served one makes a coverage claim by omission.

**Stanton is the exemplar — match it.** The rules a by-request page lives by:

- **The framing goes above the fold.** First screen, in the quick answer and the
  first paragraph under the H1. A disclaimer at the foot of a page that reads as
  a coverage claim at the top *is* a coverage claim.
- **Never imply a call history.** This is the trap. A normal city page writes
  "what we get called about here" from real calls. In a by-request town there
  are none, so the section becomes what that county's ground, climate and
  construction produce — sourced from entomology and the quarantine — and the
  page says out loud that this is what it is doing.
- **No existing customers, no route, no schedule.** Say all three plainly once.
- **Name what does not fit.** The page should send same-day work to a closer
  company by name of city. That is the sentence that makes the rest credible.
- **It does not drift upward.** If he starts running the town, the page gets
  rewritten *up* into a normal city page and the flag comes off. It never gets
  there one added sentence at a time. `BIZ-05` in the decay registry re-reads
  the first screen of each by-request page twice a year for exactly this.

**Kermit carries a second burden Stanton does not, and it is the harder one.**
Winkler County is not in `COUNTIES_SERVED` — Kermit is outside the declared
territory as well as off the route. A page existing is itself a kind of claim,
so that page states the exclusion twice: once in the quick answer and once in
the opening. If Winkler is ever added to the nine, the page gets rewritten
rather than silently reclassified.

Current by-request towns: **Stanton** (shipped, 4,211 words) and **Kermit**
(shipped, 4,291 words). Both are watched by `BIZ-05` in the decay registry.


---

## 12b · Neighbourhood pages — what Wave 1 established

Eight of the thirteen neighbourhood pages shipped in August 2026. The other
five did not, and the reason is a rule rather than a shortfall.

**The data splits by city, hard.**

- **Midland** publishes a public ArcGIS Subdivision layer carrying, for every
  platted addition, the `NAME`, the `SURVEYOR`, the plat recording date and the
  cabinet/page instrument reference — plus a separate drainage service with the
  100-year and 500-year floodplain and a `PLAYA` attribute naming individual
  playa lakes. That is primary municipal record, and it is where the plat
  chronologies, the Saddle Club floodplain material and the playa findings come
  from.
- **Odessa** publishes Plats and Subdivision feature services with per-filing
  acreage and surveyor initials. Note its `Lots` field is aliased "Lots
  Complete" with a Yes/No domain — it is **not** a lot count and must never be
  reported as one.
- **Seminole** publishes nothing comparable. Its five subdivisions return only
  listing aggregators, and "Copper Ridge" mostly returns a different
  subdivision near New Braunfels. Under §10, they do not ship — and they are
  **not going to**. See §12c.

**Each page must carry its own argument.** The eight that shipped are
deliberately not variations on one template:

| Page | The argument |
|---|---|
| Mission Estates, Odessa | An enforced "no weeds or dirt" covenant means irrigation; alleys are the rodent corridor |
| Saddle Club, Midland | A named playa on the edge and floodplain across the Lakes section — mosquitoes run on rainfall, not the calendar |
| Green Tree, Midland | 45 years irrigating 176 acres of golf turf on ground that was "a sandy old farm with one sickly tree" |
| Parks Bell Ranch, Odessa | New build on former rangeland — construction displaces, and the builder can still answer the pre-treat question |
| Polo Park, Midland | Stabled horses next door make flies the lead pest; 1982 covenants say nothing about yards |
| Briarwood, Midland | Two association pools — pool plant that fails becomes mosquito habitat in a week |
| Greathouse, Midland | A twelve-year platting gap makes it post-2004 stock; a school sits inside the plat |
| Grassland Estates, Midland | Building continuously since 1984 and still going — every slab age on one street grid |

**Three standing rules for this page type.**

1. **Publish the provenance.** Where a section describes what conditions
   produce rather than jobs actually done there, say so in the section. Every
   one of these pages carries that note.
2. **Never state a floodplain determination for an address.** The mapping is
   the city's; the reading is ours. Each page tells the reader to check their
   own parcel with the city. That sentence is what makes publishing the mapping
   defensible — do not edit it out for flow.
3. **Mark inference as inference.** Golf-course adjacency at Mission Estates,
   detention use of Greathouse's common areas, and whether the Midland Polo
   Club's turf is irrigated are all framed conditionally on purpose. So is the
   Briarwood 259-homes-versus-18-sections discrepancy, which is flagged and
   left unresolved rather than tidied.


---

## 12c · The Seminole subdivisions — resolved, not deferred

Countryside Estates, Arrowhead Estates, Copper Ridge, Country View Estates and
Diamond Hill Estates were scaffolded, held, researched and then **deliberately
not built as pages**. The material lives in the "areas we work" section of
`/locations/seminole/` instead, and that page states plainly why it is written
that way rather than quietly presenting less.

**The reasoning, so nobody reverses it by accident.** Five pages would have
needed fifteen thousand words about five subdivisions in a small town on flat
ground with one climate, one water table and one set of pests. Nothing about
crossing from one into the next changes the biology, and no published source
describes any of them. That is the exact shape of content this build exists to
not produce.

**What the town-page section does instead** is name the three things that
genuinely do vary in Seminole, and it varies them property by property rather
than subdivision by subdivision:

1. **Build era** — decides whether the termite conversation is about imported
   fill and a builder's pre-treat, or about four decades of perimeter history.
2. **Distance to the field edge** — the single biggest driver here, and a fact
   about a lot rather than about a development.
3. **Landscaping maturity** — established planting and irrigation boxes as
   harbourage, versus stacked construction material on newer ground.

**Structural consequences already applied:**

- The dynamic route `src/pages/locations/[town]/[hood].astro` has been
  **deleted**. It was scaffolding; every neighbourhood page that ships is now
  hand-written in its own file. Do not reintroduce a generated neighbourhood
  route.
- The five Seminole entries stay in `neighborhoods.ts` because the town page
  renders their names and character lines. The file header now says so.
- Cards for them render as `<div>`, not links. Nothing points at a page that
  does not exist.

**What would reopen this.** New, checkable local fact — the owner describing
what he has actually seen in each, or Seminole publishing plat or GIS data of
the kind Midland and Odessa do. Not a decision to try harder with the same
material.

---

## 12d · Service problem spokes — what Wave 4 established

**The rule for what earns a spoke.** A spoke is named after a sentence somebody
actually says on the phone, not after a keyword. It ships only when it carries
an argument its parent service page does not already make, at the M1 floor,
from sources. Eight shipped in August 2026 — one per service that had real
material. Eight was never the target; it is how many problems there was
something honest to say about.

| Parent service | Spoke | The argument |
|---|---|---|
| `bed-bug-treatment` | `bites-but-no-bed-bugs` | Bite marks identify nothing in either direction — ~32% of people in confirmed-infested homes reported no symptoms at all |
| `rodent-control` | `noises-in-the-attic` | Time of day narrows it; sound does not identify a species; the legal position differs per animal |
| `pest-control` | `roaches-in-a-clean-house` | Introduction is independent of housekeeping — but cleaning is still a control lever, and the page holds both |
| `scorpion-control` | `scorpion-in-the-bathroom` | The drain story and the porcelain story have no source at all |
| `wildlife-removal` | `dead-animal-in-the-wall` | No odour-duration figure exists anywhere; the mechanism is drying |
| `termite-control` | `mud-tubes-on-the-foundation` | Breaking tubes does nothing to a colony in the soil; bath traps are the Texas-specific entry |
| `lawn-care` | `grassburs` | A soil-temperature and seed-bank problem — 52°F, and at least three years |
| `flea-and-tick` | `fleas-after-treating-the-pet` | The pupal window: the cocoon resists insecticide and waits for a host cue |

**Four of the eight are built on refusing a claim the trade repeats.** That was
not planned; it is what the research kept turning up. Specifically not
published, and flagged in each file header:

- no dead-animal odour-duration figure exists in any extension, public health
  or peer-reviewed source — every version traces to marketing;
- neither the scorpion drain story nor the smooth-surface story has any source,
  and AgriLife's scorpion publication does not mention tubs, sinks or drains;
- the "5% adults / 95% other stages" flea statistic is in none of eleven
  extension and CDC sources checked — it is likely a garbling of a different,
  spatial claim;
- "spraying a mud tube is counterproductive" is commercial-blog only; the
  sourced objection is simply that it does not reach the colony.

**Registry, and why it is enforced.** `src/data/spokes.ts` is the single source
of truth. `SpokeLinks.astro` renders each service's spokes on its parent page,
so a spoke cannot ship orphaned. `scripts/verify.mjs` §7 reconciles the registry
against the built routes **in both directions** — a page without a row fails the
build, and a row without a page fails the build. `/services/termite-control/
wdi-inspection/` is the one deliberate exemption, because it is a licensed
category page linked from the compliance cluster rather than a problem spoke.

**The lead-in copy is per spoke, not shared.** `Spoke.intro` exists because
eight identical paragraphs across eight service pages is exactly the templating
this build exists to avoid — and the duplicate-sentence scanner caught the first
attempt, correctly.

**What would add a ninth.** A problem with enough sourced material to sustain
3,000 words that the parent page does not already cover. Not a keyword gap.
