# CADENCE.md — Phase 6

**The build is finished when the site is correct. The engagement is finished
when nothing is left that can quietly stop being correct.**

Phases 0 through 5 built the surface. This phase is the machinery that keeps
it true and keeps it growing after the initial push — the publishing rhythm,
the release mechanism for pages that are written but held, and the loop that
re-reads every outside fact this site cites before it can rot.

Two documents and two commands carry it:

| | |
|---|---|
| `src/data/maintenance.ts` | The decay registry, the held ledger and the publishing queue, in machine-readable form. The site imports it; the harness reads it. |
| `CADENCE.md` (this file) | The operating procedure — who does what, when, and what each reading triggers. |
| `npm run verify` | Build correctness, plus a hard failure on any critical or high-severity fact past its verification interval. |
| `npm run cadence` | The full decay report, the held ledger reconciled against `dist/`, and the queue. |

---

## 1 · The two failure modes this phase exists to prevent

**A site that stops growing.** Nineteen strong pages beat forty thin ones, but
forty-nine strong pages beat nineteen. The queue in §4 exists so the next wave
is never a question of what to write — only of when.

**A site that quietly stops being true.** This is the dangerous one. Every page
in the compliance cluster cites a rule that a state agency can amend without
telling anybody. The fire ant quarantine list is amended county by county. A
licence lapses on a date. An ordinance height gets changed at a council meeting
nobody outside that town attended. None of these events touch the repository,
so nothing in a normal development workflow ever notices them.

Doctrine 6 says honesty is architecture, not a disclaimer. In time, that has a
corollary: **a fact verified once and never again is a fabrication on a delay
fuse.** The decay registry is the architecture that defuses it.

---

## 2 · The publishing loop — per wave

A *wave* is one coherent group of pages, written and shipped together. Waves
are listed in order in `QUEUE`. The loop for each:

1. **Confirm the data exists.** A wave starts only when every page in it can be
   written to 3,000 unique words from `src/data/` and `CONTENT_BRIEF.md`
   without inventing anything. If a page cannot, it is not in this wave — it is
   a `TODO(fact)` and it goes to the owner.
2. **Write.** Full M1 depth. Nothing is scaffolded and shipped, ever. A page
   that cannot reach depth stays at `noindex` and gets a row in `HELD`.
3. **Add decay rows in the same commit.** Any page citing an outside authority
   — a rule, an ordinance, a statistic — adds its row to `DECAYING_FACTS`
   before the commit lands. A citation with no row is unmaintained by
   construction, and unmaintained is how the 48-hour sign ran backwards on four
   pages.
4. **`npm run build && npm run verify`.** Zero errors, and read every warning
   rather than tolerating a standing set of them.
5. **`npm run cadence`.** The held count in the registry must reconcile exactly
   with the noindex count in `dist/`. A page held at `noindex` with no row in
   `HELD` is held *by accident*, which means one day somebody lifts it without
   knowing what it was waiting for.
6. **Ship, then re-run verify against the deployed build.** Clean-room from the
   tarball, not from the working tree.

**Rate.** One wave at a time, to completion. There is no capacity cap on this
build — the owner's position throughout has been that if the site brings in
more work than one truck can run, he hires. The only limiter is data.

---

## 3 · The calendar loop

Run `npm run cadence` on the first working day of each month. It tells you what
is due; this table tells you what "checking" means for each class.

| Class | Interval | What the check actually is |
|---|---|---|
| Licence and contact (`LIC-01`, `BIZ-04`, `REV-01`) | Quarterly | Read the TDA licensee record. Dial the published number. Confirm the categories still match. |
| Insurance, pricing, territory, categories, quarantine, sameAs | Semi-annual | Certificate of insurance from the owner; prices confirmed out loud; the APHIS regulated-areas list read county by county. |
| Rules, ordinances, CEUs, anniversary facts, cited statistics | Annual | Re-read the administrative code sections in full, not the parts you remember. Re-read each municipal ordinance at its citation. |
| Statutes (`REG-03`, `REG-04`, `ORD-02`) | Session-keyed | The Texas Legislature meets in regular session in odd-numbered years. Re-read after each session adjourns — the calendar interval is a backstop, the session is the real trigger. |

**`lastVerified` is a record of a human reading a primary source.** It is not
the date a page was edited, not the date somebody was fairly sure the fact was
still right, and not the date the row was added. Advancing it without reading
the source falsifies the one record that makes the rest of this trustworthy.
Secondary write-ups, summaries and search snippets never satisfy a row.

---

## 4 · The publishing queue

Ordered. A wave starts when the one above it verifies clean. Full detail lives
in `QUEUE` in the registry; the short form, as it now stands:

1. **Neighbourhood layer — complete.** Eight hand-written pages shipped from
   municipal plat and floodplain records: six in Midland, two in Odessa. The
   five Seminole entries became an "areas we work" section on the town page
   instead, for the reason set out in CONTENT_BRIEF §12c. The dynamic
   neighbourhood route has been deleted.
2. **Spanish service tree — complete.** All twelve services now have a Spanish
   page at the M1 floor, written in Spanish rather than translated, with every
   honesty gate carried across and `hreflang` reciprocal on both sides of all
   twelve pairs. See CONTENT_BRIEF §10b.
3. **Pest library — complete.** All twelve entries written. The index throws at
   build time if an entry ever ships unwritten.
4. **Service problem spokes — complete.** Eight shipped at
   `/services/{service}/{problem}/`, registered in `src/data/spokes.ts` and
   reconciled against the built routes in both directions by the harness. See
   CONTENT_BRIEF §12d.
5. **Held releases.** Owner answers, not writing — and now the only category of
   work left on the build. See §5.

Waves 1 to 4 are done. Nothing in the queue is waiting on writing capacity; the
remaining items are waiting on two answers from the owner.

---

## 5 · The unblock protocol

Each parked item is one answer away, and each has a mechanical release recorded
in `HELD` so that whoever receives the answer does not have to reconstruct what
it unlocks.

| Held | Gate | What the answer releases |
|---|---|---|
| `aggregateRating` | G-04, platform | We read the live profile ourselves and set `reviews.verified = true`. |
| Oilfield vertical | C-12, owner | One real job to point at. |
| Community / awards | F-12, F-13, B-09, owner | He joins or sponsors something. |

**Nothing on that list is a page.** All three are schema or copy — an empty
array in `business.ts` and a site that says nothing rather than something
invented. **No page is held at noindex any more**, and `npm run cadence`
reconciles that claim against `dist/` on every run rather than asking you to
take it on trust.

Cleared since this table was first written:

- **WDI cluster (2 pages).** Released August 2026. Written to depth early and
  parked at noindex behind `wdiDecisionConfirmed` for the whole build, waiting
  on one figure. He gave it — a 90-mile inspection radius, and three days as the
  notice he asks for — and both pages shipped on that edit. The radius is
  deliberately *not* the 100-mile general territory, and the page says so out
  loud; see BIZ-06.
- **Stanton and Kermit.** Both written and shipped as by-request pages,
  CONTENT_BRIEF §11b.
- **Seminole ordinance row.** Confirmed with the city office and recorded with
  `figuresFromCityOffice: true`, because eCode360 blocks retrieval of the
  published section text and a second-hand figure should be labelled as one.
  See CONTENT_BRIEF §12c.

**Shelved, which is different from held.**

| Shelved | Decided | Reopens on |
|---|---|---|
| Lubbock neighbourhoods | August 2026, by the agency | Real Lubbock place names arriving unprompted, from him or from a job. |

A shelved item is not chased in the monthly loop and is not counted as waiting
on the owner. It stays in `HELD` with a `shelved` field carrying the reasoning,
because deleting the row would erase why the gap exists — and six months from
now nobody would be able to tell a decision from an oversight. `npm run cadence`
prints shelved items in their own section, below the pending ones.

One practical note if the Lubbock tier ever reopens: the eight shipped
neighbourhood pages were built from municipal plat, surveyor and floodplain
records that Midland and Odessa publish. We found no comparable Lubbock service.
That tier would have to be built from owner knowledge instead, which is a
different and slower kind of sourcing.

**Rule: an answer arrives, the page ships in the same session.** Held content
that sits after its gate clears is the failure mode this ledger exists to
prevent — that is how a written, corrected, ready page ends up forgotten in a
repository for a year.

**Rule: nothing ships early.** A gate is not cleared by the owner being likely
to say yes.

---

## 6 · Escalation — the same-day list

Most of this document runs on a monthly rhythm. These do not. If any of the
following is true, the site is publishing a false statement about law,
licensure or safety, and it is fixed or pulled the same day:

- The TDA licence is lapsed, suspended, or the responsible applicator changed.
- A licensed category was dropped that a live service page claims.
- Insurance is not in force at the published figures.
- A cited rule was amended in a way that changes what the site tells a customer
  to expect — most sharply anything in the 48-hour sign, Consumer Information
  Sheet or records provisions of 4 TAC ch. 7 subch. H.
- A county's fire ant quarantine status flipped against what a town page says.
- The published phone number stops reaching him.

The response is the same in every case: correct it if the correct version is
known within the hour, otherwise `noindex` the affected pages and remove the
claim. **A page held is recoverable. A false legal statement served to a
customer is not.**

---

## 7 · Adding a page after this phase

The checklist does not change, and step 4 is the one that gets skipped:

1. The data exists in `src/data/` or `CONTENT_BRIEF.md`. If not, `TODO(fact)`.
2. The URL matches the frozen taxonomy in CONTENT_BRIEF §9. No new patterns.
3. Written to the M1 floor, in the voice, past every "never write" in §1.
4. **Every outside citation gets a row in `DECAYING_FACTS`, in the same commit.**
5. Linked from its hub; the hub links only what exists.
6. `npm run build && npm run verify && npm run cadence` — all clean.

---

## 8 · What this looks like when it is working

The first working day of the month, someone runs two commands. Most months the
answer is "nothing due" and it costs four minutes. Some months a fact comes due
and someone reads a rule for twenty minutes and moves a date. Occasionally a
quarantine boundary moves, one line changes in `towns.ts`, and every page that
mentions it corrects itself on the next build.

That is the entire mechanism. It is unglamorous on purpose. The alternative —
a site that was accurate the week it launched and has been drifting ever since,
with nobody able to say which parts — is the ordinary state of almost every
site in this industry, and it is the thing this build is supposed to not be.

---

## 9 · Who owns this after launch

The build and launch are a one-time engagement. Ongoing support after launch
runs through the agency, so the monthly loop in §3 is an agency task, not
something handed to the owner with a set of commands and a hope.

That distinction matters for how this file is written. It does not assume a
publishing retainer, and none of the waves in §4 are scheduled — they are
ordered, and they run when there is a reason to run them. What *is* fixed is
§3 and §6: the monthly decay check and the same-day escalation list. Those are
the floor. A site that ships and is never checked again starts drifting the
week the last page goes live, and the only person positioned to notice is
whoever holds this file.

What the owner is asked for is narrow and stays narrow: the answers on the
open-items sheet, then the handful of facts in §3 that only he can confirm —
the insurance certificate each year, the prices twice a year, and word when the
territory or the licence changes. Everything else is read from a primary source
by whoever runs the loop.
