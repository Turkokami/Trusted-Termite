# PHASE 0 — Defect Remediation Work Order

**Target:** the live site at `trustedtermiteandpest.com` (Ailanding platform)
**Runs:** immediately, independent of the domain transfer and the WDI decision.
None of the items below touch DNS.
**Rule:** nothing new is built on top of a broken foundation.

Work top to bottom. Each item states what to do, why, and how to prove it landed.

---

## P0-1 · Remove the copied FAQ page — **legal, do this first**

**What:** delete `/faq` entirely and 301 it to `/` (or to `/services/` once the
new site is live).

**Why:** the page uses the phrase *"Trusted Termite and Pest Solutions' STEPS
Total Protection System"* four times. **STEPS® Total Protection System is the
registered service system of Arrow Exterminators.** The owner confirmed the
source at H-10: *"I copied it from a page online. I believe its the only page."*

That is a trademark exposure and a duplicate-content liability at the same time.
It is also the site's largest single content asset at ~3,500 words, so removing
it will look like a loss on a word count. It isn't.

**Also remove wherever they appear:** the national boilerplate in those answers —
"Forty-one states and Washington D.C.", West Nile spreading "from Pennsylvania to
Washington state". That is not West Texas content and not his content.

**Replacement:** none, immediately. FAQ content returns in Phase 2 as per-page
blocks of six to eight questions each, written from his own K-01 answers and
AgriLife sources, feeding one `FAQPage` node per URL. The ten questions at K-01
are already good enough to publish nearly as written.

**Proof it landed:** `/faq` returns 301 → 200 at the target. A logged-out fetch
of the whole site contains zero instances of the string `STEPS`.

---

## P0-2 · Strip the unsubstantiated superlative

**Where:** the homepage meta description, live now:

```
#1 pest control, lawn care, junk removal & property maintenance in Seminole TX.
Scorpion, termite & rodent exterminator.
```

**Replace with:**

```
Seminole-based scorpion, termite and rodent control for Gaines County and the
Permian Basin. Licensed TPCL 0976265. Free inspection — call (432) 278-7294.
```

(147 characters, ends on punctuation, in the M5 band.)

**Why:** "#1" is unsubstantiated, and in a trade regulated by the Texas
Department of Agriculture an unprovable superiority claim is a consumer-protection
problem as well as a ranking one.

**Sweep:** grep the whole site for `#1`, `best`, `top-rated`, `number one`.

---

## P0-3 · Publish the guarantee terms, and link every use of the word

**Create** `/our-guarantee/` carrying the exact scope the owner gave at E-09,
E-10 and E-11 — 30-day service guarantee with stated exclusions, plus the
one-year termite re-treatment warranty that covers re-treatment and *not*
structural damage.

**Then:** every instance of "guarantee" or "guaranteed" anywhere on the site
becomes a link to that page. Replace the bare string `100% satisfaction
guarantee` — it has no term, no scope and nothing behind it.

**Why:** Keystone doctrine 6 permits defined-term warranties only. A customer
cannot hold anyone to "100% satisfaction". They can hold him to thirty days, and
he already said he honours it.

**Note:** the page is already written and building in this repo at
`src/pages/our-guarantee.astro`. On the interim live site it can be a single
page with the same text.

---

## P0-4 · Publish the licence number

**Add to the footer of every page, and to the About page:**

```
Licensed and regulated by the Texas Department of Agriculture ·
Structural Pest Control Licence TPCL 0976265 ·
Valentin Moriel, Commercial Certified Applicator
```

**Why:** 4 TAC §7.174 requires the TPCL number on the written estimate a customer
receives before termite treatment. Publishing it on the site is free credibility,
the owner approved it explicitly at B-10, and **no competitor audited in this
market does it.**

**Do not** add: "bonded" (B-07 — he is not), any trade association (B-09 — none),
or any award (F-13 — none).

---

## P0-5 · Take El Paso out of the entity

**Remove from copy, footer and any service-area list:**

- the footer string `Seminole, TX — Permian Basin, Lubbock & El Paso`
- the homepage claim of El Paso service "on a scheduled basis"
- the **915 second number** as a published contact (A-07) — keep answering it,
  just do not publish it on a Seminole business

**Replace the service area with the confirmed set (D-01):** Gaines, Yoakum,
Andrews, Dawson, Terry, Howard, Midland, Ector and Lubbock counties.

**Why:** Google currently returns the homepage as *"Trusted Termite and Pest
Solutions - El Paso's Reliable Pest Control"*. El Paso is ~300 miles from
Seminole and D-02 confirmed it is by-appointment only — not a routable market.
Every El Paso signal on the site reinforces an indexing defect that is costing
Gaines County relevance right now.

**Keep El Paso** in the biography on `/about/` — six years at Pest Defense
Solutions and a Terminix-Rentokil branch is the honest reason a nine-month-old
company knows its trade. That is a *credential*, not a service area.

**Proof it landed:** resubmit the homepage in Search Console and watch the
rendered SERP title. Expect days to weeks, not hours.

---

## P0-6 · Pull the near-duplicate city pages out of the index

**Do:** add `noindex` to all ten `/pest-control-{city}` pages on the live site
until each is rebuilt to depth. Do **not** delete them yet — the 301 map in
`REDIRECTS.md` needs them resolvable at switchover.

**Why:** the ten pages average 210 words of main content, share one title
template, one H1 template and one body skeleton, and carry sixty byte-identical
service headings between them. Denver City and Kermit are functionally the same
document with the town and county find-and-replaced. Leaving them indexed while
the new pages go up guarantees the two sets compete.

---

## P0-7 · Verify the domain registrant — **start today, it gates go-live**

> **UPDATED Aug 2026.** The client has confirmed the site will NOT be hosted on
> Ailanding — it moves to separate hosting (Vercel is already the deploy target
> in `astro.config.mjs`). **That does not close this item.** Hosting and domain
> registration are different things. If Ailanding holds the registrar account
> they control DNS, which means the domain cannot be pointed at the new host
> without either their cooperation or a transfer. Read the **registrant name**
> and the **transfer lock status**. If the registrant is Valentin or the LLC,
> this item is closed. If it is Ailanding, start the transfer now — it is the
> longest-lead item in the whole build and everything else is ready.

Not a content fix, but it belongs in Phase 0 because it has the longest lead time.

1. Run a WHOIS on `trustedtermiteandpest.com` and read the **registrant name**.
2. H-01 says the domain "is owned by Ailanding.com". If the registrant is not
   Valentin Moriel or Trusted Termite and Pest Solutions LLC, request a transfer
   to a registrar in his own name before any build work touches DNS.
3. Get the **notice period** on the Ailanding monthly agreement so nothing is
   switched off early and nobody pays two vendors through the changeover.

**Nothing launches on a domain the client does not hold.**

---

## P0-8 · The truck and the schema published different licence numbers — **RESOLVED 31 Aug 2026**

**What:** the vehicle livery, photographed 31 August 2026, reads `TPCL#0976265`.
Every page of the new site publishes `TPCL 0976265`, and `buildGraph()` emits it
as an `EducationalOccupationalCredential` named *Texas Department of Agriculture
Structural Pest Control Licence*. Both numbers cannot be the structural pest
control business licence.

**Why it matters:** this is a licensure statement, which the cadence registry
classes as critical — if it is wrong the site is publishing a false regulatory
claim, and it is doing so on 87 pages and inside the JSON-LD that search engines
read as a credential assertion. P0-4 published the number precisely because no
competitor in this market does; publishing the wrong one is worse than not
publishing at all.

**The likely explanation, and it is UNCONFIRMED:** Texas requires the *business*
licence number to be displayed on the service vehicle. That points to 0976265
being the business licence and 0918482 being Valentin's individual certified
applicator licence. B-01 recorded 0918482 as the business licence; B-03 records
him as a Commercial Certified Applicator. If that split is real then
`business.ts` needs two fields rather than one, and `schema.ts` must stop
describing an applicator number as a business licence.

**Do not** change any number until he confirms which is which. Guessing here
replaces one false licensure statement with a different false licensure
statement, and the schema makes it machine-readable either way.

**Held pending this:** the truck-and-trailer photograph is the only supplied
image in which a licence number is legible. It stays out of the build until the
number is settled.

### Resolution

The owner supplied the licence certificate on 31 August 2026 and confirmed that
the number he gave at B-01 was mistaken. The certificate settles it:

| Field on the certificate | Value |
|---|---|
| TDA TPCL No | **0976265** — the number now published |
| License No (applicator) | 0946390 — held in `business.ts`, not published |
| Licence title | **Commercial Certified Applicator** |
| Issued / expires | 31 Dec 2025 / **30 Nov 2026** |

**0918482 was not a mix-up between two real numbers.** It appears nowhere on the
certificate. The site published a licence number that does not exist, on 87
pages and inside a JSON-LD credential assertion, for the whole of Phase 0
through Phase 5.

**What changed:** 112 hardcoded occurrences of `TPCL 0976265` corrected across
51 files, both languages. `licenceClass` moved from "Responsible Certified
Applicator" to the phrase the certificate actually uses — the old wording named
a role a business designates rather than a licence class, and nothing evidenced
it. LIC-01 in the cadence registry now cites the certificate rather than an
owner recollection, and its interval is cut to 60 days so it falls due before
the 30 November expiry instead of a month after it.

**What this cost, worth writing down:** the number was hardcoded 113 times in
page bodies, in flat contradiction of the rule at the top of `business.ts` that
nothing there may be hardcoded in a page body. Had it been read from
`BUSINESS.owner.tpcl` throughout, this would have been a one-line fix. It is
still hardcoded — correcting that is a separate task, and until it is done this
defect can recur.

---

## P0-9 · The licence is held in a different name to the one the site uses — **open, owner's call**

**What:** the TDA certificate is issued to **JESUS MORIEL**. The site names
**Valentin Moriel** on all 87 pages, in the Person node, and in the biography.
The owner instructed on 31 August 2026 to use Valentin, and that instruction
stands — this item is not about changing the name.

**Why it is still open:** `/about/` carries a section headed *How to verify it
yourself*. It tells the reader to look the licence up by number, and calls that
check "the only piece of due diligence in this industry that is both free and
conclusive". A reader who does it finds the licence, sees TRUSTED TERMITE AND
PEST SOLUTIONS LLC — which matches — and sees a first name that does not. The
page has invited a check and then surprised the person who took it up.

The sharper version is the WDI channel. A Texas Official WDI Report (SPCS/T-5)
is signed by the licensed applicator, in the licensed name. A realtor holding a
report signed by one name and a website naming another is the exact reader this
site is written for, and the exact moment it cannot afford to look evasive.

**The fix is one clause, not a rename.** Something on `/about/` to the effect
that the licence is held in his legal name and Valentin is what he goes by.
Publishing a person's legal name is his decision and it has not been asked. It
is already public — TDA's register is public and it appears on every WDI report
he signs — so this is about presentation, not disclosure.

**Meanwhile:** `business.ts → owner.legalName` carries it, unpublished, behind
`legalNamePublished: false`. LIC-01 warns whoever next verifies the licence to
search by NUMBER, because a search for "Valentin Moriel" returns nothing and
looks precisely like a licence that has been revoked.

**Proof it landed:** he says yes or no. If yes, one sentence on `/about/` and
`legalNamePublished` goes true. If no, this item closes as a decision taken
rather than a defect outstanding, and LIC-01's warning stays.

---

## Acceptance gate — Phase 1 does not begin until all of this is true

- [ ] `/faq` is gone; a logged-out fetch of the site returns zero `STEPS` matches
- [ ] Zero unsubstantiated superlatives sitewide
- [ ] `/our-guarantee/` is live and every "guarantee" string links to it
- [ ] TPCL 0976265 appears in the footer of every page
- [x] P0-8 resolved — TPCL 0976265 published sitewide, matching the certificate
      and the vehicle; the applicator number is held unpublished
- [ ] Zero El Paso references outside the About biography; 915 number unpublished
- [ ] All ten legacy city pages are `noindex` and still resolve
- [ ] WHOIS registrant confirmed, transfer started if needed
- [ ] Every check above verified with an anonymous fetch —
      `fetch(url, { credentials: 'omit', cache: 'no-store' })` — after clearing
      cache. The live site is the source of truth, not a report and not memory.
