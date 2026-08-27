# DEPLOY — take this build live on Vercel

**Audience: Claude Code, running on the operator's machine, with this repository
checked out and a terminal.** A human is present and can log into things. Work
through this top to bottom. Stop where it says stop.

Read this whole file before running anything. Several steps are ordered the way
they are for a reason that is stated inline.

---

## 0 · What you are deploying

A static Astro 5 site. 88 routes, all pre-rendered, no server runtime, no
database, no environment variables, no secrets. That is why this is a short
document: there is very little that can go wrong at the application layer, and
almost everything that goes wrong at launch is DNS.

The deploy target is Vercel and `vercel.json` is already written.

**Two companion documents you will need:**

- `DNS-CUTOVER-GUIDE.pdf` — the domain half. Read it before touching DNS.
  It contains the live registry and DNS readings taken 27 August 2026, the
  rollback values, and the reason the radius of this decision is wider than it
  looks.
- `CADENCE.md` — what happens after launch.

---

## 1 · Pre-flight — do not skip, it takes two minutes

```bash
node --version          # expect 18.x or newer
npm ci                  # exact lockfile install, not `npm install`
npm run build           # astro build + gen-static
npm run verify          # the harness
npm run cadence         # the decay registry
```

**All four must succeed before you go near Vercel.**

`npm run verify` must end with `PASSED — 0 errors`. It checks dead links, one H1
per page, title and description lengths, the 3,000-word floor on every indexable
page, schema completeness, hreflang reciprocity, duplicate sentences across
pages, the cadence registry, the spoke registry, and the redirect and sitemap
plumbing. **If it reports errors, stop and fix them. Do not deploy past a red
harness** — every check in it exists because something went wrong once.

`npm run cadence` must end with `PASSED — every tracked fact is inside its
verification interval`. If a critical or high fact is overdue, the site is about
to publish something nobody has re-read against its source. Fix that first.

Expected output at the time of writing: **88 routes, 88 indexable, 0 held at
noindex, 0 errors, 0 warnings.**

---

## 2 · Deploy to Vercel

### 2a · Get the code somewhere Vercel can see it

Preferred: push to a Git remote (GitHub/GitLab/Bitbucket) and import the repo in
Vercel. That buys automatic deploys on push and a preview URL per branch, which
is worth having for a site that will be edited again.

```bash
git init                       # if not already a repo
git add -A
git commit -m "Keystone build — 88 routes, verified"
git branch -M main
git remote add origin <the remote you created>
git push -u origin main
```

Then in Vercel: **Add New → Project → import the repo.**

Alternative, if the human would rather not use Git yet:

```bash
npm i -g vercel
vercel login
vercel            # preview deploy
vercel --prod     # production deploy
```

### 2b · Project settings

Vercel reads `vercel.json` and should need nothing else. Confirm it detected:

| Setting | Expected |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm ci` |
| Node version | 18.x or newer |
| Environment variables | **none** |

If Vercel offers to add environment variables, it is guessing. This build has
none.

### 2c · Check the preview before any domain work

Vercel gives you a `*.vercel.app` URL. **Open it and verify the site properly
before you touch DNS.** This is the last moment where a mistake costs nothing.

```bash
# replace with the real preview URL
BASE=https://your-project.vercel.app

curl -sSI $BASE/ | head -1                    # 200
curl -sS  $BASE/robots.txt                    # points at the sitemap
curl -sS  $BASE/sitemap.xml | grep -c "<loc>" # expect 88
curl -sSI $BASE/services/pest-control/ | head -1
curl -sSI $BASE/es/servicios/control-de-plagas/ | head -1
```

Then in a browser: the home page, one service page, one Spanish page, one
neighbourhood page, one pest library page. Check the header logo renders, the
phone number is right, and the footer carries **TPCL 0918482**.

> **Note on redirects:** they will NOT work on the `.vercel.app` URL in the way
> you expect, because the sources are legacy Ailanding paths. Test them after
> the domain is attached, in step 4.

---

## 3 · STOP — the domain is not yours to point yet

**Do not attach the custom domain until a human has confirmed all three of
these.** They are not technical steps and you cannot do them yourself.

1. **The domain renewal is covered.** `trustedtermiteandpest.com` expires
   **29 October 2026**, registered through **Name.com**. As of 27 August 2026
   that was roughly 63 days out and nobody had confirmed who is paying it.
   Deploying onto a domain that lapses six weeks later wastes the whole cutover.
2. **Somebody has access to change DNS.** The nameservers are
   `ns1–ns4.landingsite.ai`, so Landingsite (Ailanding) currently answers all
   DNS. Either the human can get into that panel, or into the Name.com account.
3. **The notice period on the Ailanding agreement is known**, so the old service
   is not switched off mid-cutover and nobody pays two vendors longer than
   necessary.

If any of the three is unresolved, **stop here**. The site is deployed and
working on its `.vercel.app` URL, which is a perfectly good place for it to sit
for a week. Report status and wait.

---

## 4 · Attach the domain

Follow `DNS-CUTOVER-GUIDE.pdf`. The short version, with the parts that matter:

1. In Vercel: **Settings → Domains → Add**. Add **both**
   `trustedtermiteandpest.com` and `www.trustedtermiteandpest.com`.
   The site canonicalises to **www** (`SITE_URL` in `src/data/business.ts`), so
   www must serve the site and the apex should redirect to it.
2. **Read the A record and CNAME values off your own Vercel domain card.** Do
   not use a value from memory or a blog post — Vercel's docs say the correct
   value "is whatever your domain card shows", and newer projects get different
   anycast addresses.
3. Lower the TTL to 60 seconds in the DNS panel and wait an hour before changing
   anything. This is what makes the cutover reversible in a minute.
4. Replace **both** apex A records — `166.117.246.71` and `75.2.29.147`. Leaving
   either behind sends a share of visitors to the old site at random.
5. Repoint the www CNAME from `proxy-ssl.getlandingsite.com` to the Vercel
   target, copied exactly including any trailing dot.
6. **Leave the Google verification TXT record alone.**

Then verify:

```bash
python3 - <<'PY'
import socket
for h in ['trustedtermiteandpest.com','www.trustedtermiteandpest.com']:
    try: print(h, socket.gethostbyname_ex(h))
    except Exception as e: print(h, 'ERR', e)
PY
```

Wait for SSL to issue — Vercel does it automatically via Let's Encrypt once the
domain resolves to it. As of 27 August 2026 there was no CAA record and no stale
`_acme-challenge` record on this domain, which are the two usual blockers, so it
should issue without intervention.

---

## 5 · Post-cutover checks

Redirects only become testable now.

```bash
BASE=https://www.trustedtermiteandpest.com

# every legacy URL must 301 to a live target
for p in /pest-control-seminole /pest-control-seagraves /pest-control-denver-city \
         /pest-control-andrews /pest-control-lamesa /pest-control-big-spring \
         /pest-control-midland /pest-control-odessa /pest-control-lubbock \
         /pest-control-kermit /services /lawn-care /about /contact \
         /schedule-service /testimonials /faq; do
  code=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE$p")
  loc=$(curl -sSI "$BASE$p" | awk 'tolower($1)=="location:"{print $2}' | tr -d '\r')
  echo "$code  $p  ->  $loc"
done
```

Every line should read `301` with a `location`. Then confirm each destination
returns `200`.

```bash
curl -sSI $BASE/ | head -1                       # 200
curl -sS  $BASE/sitemap.xml | grep -c "<loc>"    # 88
curl -sS  $BASE/robots.txt                       # sitemap line present
curl -sSI http://trustedtermiteandpest.com/ | head -3   # apex → https + www
```

**In a browser, on mobile data and in a private window** — not your normal
browser, which caches aggressively: home page, a service page, a Spanish page,
the guarantee page, and the phone link on a phone.

Finally, **raise the TTL back to 3600** a day or two later once you are
satisfied.

---

## 6 · Tell Google

1. **Google Search Console** — the property should still be verified, because
   the verification TXT record was preserved. Confirm it. Then submit
   `https://www.trustedtermiteandpest.com/sitemap.xml`.
2. **Google Business Profile** — update the website URL if it points anywhere
   else. This is also the moment to sort out profile access, which is a held
   item: `HELD-RATING` in `src/data/maintenance.ts`. Until somebody reads the
   live profile, `aggregateRating` stays suppressed and the site publishes no
   review claims. Do not fill that in from memory.

---

## 7 · What is deliberately not automated

- **No analytics.** Nothing was added because nobody asked for it and it is a
  decision with privacy consequences. Vercel Analytics is one toggle if wanted.
- **No forms backend.** The contact route is the phone. There is nothing to
  wire up and no form spam to manage.
- **No CMS.** Content lives in the repo, which is what keeps the honesty gates
  and the harness enforceable. A CMS would let someone publish a page that
  bypasses every check in `verify.mjs`.

---

## 8 · After launch

Run `npm run cadence` monthly. It reports every fact whose verification interval
has lapsed and reconciles the held-page ledger against what is actually at
`noindex` in `dist/`. `CADENCE.md` §3 is the monthly loop and §5 is the list of
things still waiting on somebody.

The build fails if a critical or high fact goes unverified past its interval.
That is deliberate. A reference site that nobody re-reads starts drifting the
week it launches, and quietly wrong is the worst way for this particular site to
fail.

---

## Rollback

If the site is live and something is badly wrong:

- **DNS level** — restore the values in §7 of `DNS-CUTOVER-GUIDE.pdf`. With the
  TTL at 60 seconds this takes about a minute and the old Landingsite site
  returns.
- **Deploy level** — in Vercel, **Deployments → the previous good one →
  Promote to Production**. Instant, and it does not touch DNS.

Rolling back is not a failure. It is why the TTL was lowered first.
