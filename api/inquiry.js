/**
 * api/inquiry.js — the endpoint behind the form on /contact/.
 *
 * WHY THIS FILE IS HERE AND NOT IN src/pages/
 * -------------------------------------------
 * The site is a static Astro build with no adapter, and it stays that way.
 * Vercel deploys any file in a top-level `/api` directory as a function,
 * independently of the framework build. That is the documented path for a
 * static site needing one dynamic route, and it avoids adding @astrojs/vercel
 * and moving 87 prerendered pages onto a server renderer for the sake of a
 * single POST. It also leaves `outputDirectory: dist` and gen-static.mjs —
 * which walks dist/ to build the sitemap — working exactly as they do today.
 *
 * The same pattern is already in production on Graduate Pest Control, which is
 * an identical setup: static Astro, no adapter, outputDirectory dist.
 *
 * TRAILING SLASHES
 * ----------------
 * vercel.json sets `trailingSlash: true`, so /api/inquiry is 308-redirected to
 * /api/inquiry/. A 308 preserves both the method and the body, so a form POST
 * survives it intact. The form posts to the slashless path because that one
 * works whether or not the redirect applies.
 *
 * NO SILENT FAILURES
 * ------------------
 * The rule this file exists to enforce: nobody is told their message was sent
 * unless the provider accepted it. Missing API key, provider error, anything at
 * all — the response names the failure and gives the phone number. A form that
 * quietly drops enquiries is the worst outcome for a one-man business, because
 * it stays invisible until somebody notices the phone stopped ringing. Here it
 * would be worse still: /contact/ promises that getting in touch reaches a real
 * person, so a form that eats messages breaks the actual promise of the page.
 *
 * PRIVACY
 * -------
 * Nothing here logs a name, a phone number, an email address or a message body,
 * on success or on failure. Only which failure occurred, and the provider's
 * status code where there was one. Vercel function logs are retained and
 * readable, and a member of the public's contact details do not belong in them.
 * /contact/ makes this commitment in prose under "What happens to your
 * information" — it has to be true in the code as well, not just on the page.
 */

const PHONE = '(432) 278-7294';
const PHONE_E164 = '+14322787294';
const EMAIL = 'Trustedtermiteandpest@gmail.com';
const THANK_YOU = '/contact/thank-you/';
const CONTACT = '/contact/';

/** Minimum time between the page rendering and the form arriving, in ms. */
const MIN_FILL_MS = 3000;
/** Per-field ceiling. Longer than this is a paste bomb, not an enquiry. */
const MAX_FIELD = 4000;

/**
 * The fields, and why these ones.
 *
 * /contact/ has a section headed "What to have ready when you call" listing the
 * six things that turn a call into an accurate price instead of a second call:
 * where the property is, what kind of building, how many buildings, what you
 * are seeing and for how long, what has already been applied, and whether there
 * is a deadline. This form asks those six. A form collecting less than the
 * phone call does is precisely the form that page spent two paragraphs arguing
 * against, and the argument was a good one.
 *
 * EMAIL IS OPTIONAL, deliberately. This business runs on the phone — H-09, "Call
 * is best to book" — and demanding an email address from somebody who would
 * rather be rung back loses the job. When it is absent there is no reply_to and
 * the reply is a phone call, which is what most people here want anyway.
 */
const FIELDS = [
  { name: 'name', label: 'Your name', required: true, max: 200 },
  { name: 'phone', label: 'Phone', required: true, max: 60 },
  { name: 'email', label: 'Email', required: false, max: 254 },
  { name: 'town', label: 'Town', required: true, max: 200 },
  { name: 'property_type', label: 'Type of building', required: true, max: 60 },
  { name: 'buildings', label: 'How many buildings', required: false, max: 120 },
  { name: 'service', label: 'What you think you need', required: false, max: 80 },
  { name: 'seeing', label: 'What you are seeing, where, and for how long', required: true, max: MAX_FIELD },
  { name: 'already_applied', label: 'Anything already applied', required: false, max: MAX_FIELD },
  { name: 'deadline', label: 'Any deadline', required: false, max: 300 },
  { name: 'contact_pref', label: 'Best way to reach you', required: false, max: 40 },
];

/** Fields that can legitimately hold line breaks. Everything else is a
 *  single-line input, and a CR or LF in it is stripped — `name` and `town` go
 *  into the email subject, where a line break is a header-injection attempt. */
const MULTILINE = new Set(['seeing']);

/** The honeypot. Hidden from people, offered to bots, cleared by the page's
 *  script on submit so an over-eager autofill cannot trip it for anyone with
 *  JavaScript on. */
const HONEYPOT = 'secondary_ref';

const NOT_DELIVERED =
  'Your message was not sent. Nothing reached us, so please call or text ' + PHONE + ' instead.';

/* -------------------------------------------------------------------------- */
/* Responses                                                                   */
/* -------------------------------------------------------------------------- */

const wantsJson = (request) => (request.headers.get('accept') || '').includes('application/json');

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ENTITIES[c]);

/**
 * The no-JavaScript failure page.
 *
 * Generated here rather than served from the static build, because the build
 * cannot know which failure occurred and a generic "something went wrong" page
 * is one step away from the silent drop this endpoint exists to prevent.
 * Deliberately self-contained: the visitor is already in a failure state and
 * this page must not depend on anything else loading. The palette is copied
 * from global.css so it does not look like it belongs to a different site.
 */
function errorPage(status, heading, detail, problems) {
  const items = (problems || []).map((p) => '<li>' + escapeHtml(p) + '</li>').join('');
  const body = [
    '<!doctype html>',
    '<html lang="en-US">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="robots" content="noindex, nofollow">',
    '<title>Your message was not sent | Trusted Termite &amp; Pest Solutions</title>',
    '<style>',
    ':root{--green-dark:#12351a;--green:#1e5b22;--lime:#7dc63f;--ink:#141814;',
    '--rule:#dbe1d6;--surface:#f6f8f4}',
    '*{box-sizing:border-box}',
    'body{margin:0;background:#fff;color:var(--ink);line-height:1.7;',
    'font-family:"Source Sans 3",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}',
    '.band{background:var(--green-dark);color:#fff;padding:3rem 20px 2.6rem}',
    '.inner{max-width:62ch;margin:0 auto}',
    'h1{margin:0;font-size:clamp(1.8rem,5vw,2.6rem);line-height:1.05;color:#fff;',
    'font-family:"Barlow Condensed","Arial Narrow",Impact,sans-serif;text-transform:uppercase}',
    '.site{margin:.9rem 0 0;font-size:1rem;color:#cfdcc9}',
    'main{max-width:62ch;margin:0 auto;padding:2.4rem 20px 3rem}',
    'ul{padding-left:1.15em}li{margin-bottom:.45em}',
    '.call{border:1px solid var(--rule);border-radius:6px;background:var(--surface);',
    'padding:1.2rem 1.4rem;margin:1.8rem 0}',
    '.call p{margin:0 0 .6em}.call p:last-child{margin-bottom:0}',
    'a{color:var(--green)}a:focus-visible{outline:3px solid var(--lime);outline-offset:2px}',
    '.back{margin-top:2rem}',
    '</style>',
    '</head>',
    '<body>',
    '<div class="band"><div class="inner">',
    '<h1>' + escapeHtml(heading) + '</h1>',
    '<p class="site">Trusted Termite &amp; Pest Solutions</p>',
    '</div></div>',
    '<main>',
    '<p>' + escapeHtml(detail) + '</p>',
    items ? '<ul>' + items + '</ul>' : '',
    '<div class="call">',
    '<p><strong>Nothing was sent, so nothing is waiting on our end.</strong></p>',
    '<p>Call or text <a href="tel:' + PHONE_E164 + '">' + PHONE + '</a>. It reaches Valentin directly.</p>',
    '<p>Or write to <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>.</p>',
    '</div>',
    '<p class="back"><a href="' + CONTACT + '">Back to the contact page</a></p>',
    '</main>',
    '</body>',
    '</html>',
  ].join('\n');

  return new Response(body, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}

/* -------------------------------------------------------------------------- */
/* Handlers                                                                    */
/* -------------------------------------------------------------------------- */

/** Nothing is served here. Anyone landing on it belongs on /contact/. */
export function GET() {
  return new Response(null, {
    status: 303,
    headers: { location: CONTACT, 'cache-control': 'no-store' },
  });
}

export async function POST(request) {
  let form;
  try {
    // formData() covers both the native urlencoded submit and a fetch sending
    // FormData, so the endpoint behaves identically with and without JavaScript.
    form = await request.formData();
  } catch {
    console.error('[inquiry] unreadable request body');
    return wantsJson(request)
      ? json(400, { ok: false, message: NOT_DELIVERED })
      : errorPage(400, 'Your message was not sent', 'The form data could not be read, so nothing was delivered.');
  }

  /* Every value is trimmed. Single-line fields lose any CR/LF (collapsed to a
     space) and other control characters; the one multi-line field keeps its
     line breaks but loses the rest. The email address is lowercased after
     trimming, so the reply_to is stored the way it will be compared. */
  const get = (k) => {
    const v = form.get(k);
    if (typeof v !== 'string') return '';
    let out = v.trim();
    out = MULTILINE.has(k)
      ? out.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
      : out.replace(/\s*[\r\n]+\s*/g, ' ').replace(/[\u0000-\u001F\u007F]/g, '').trim();
    if (k === 'email') out = out.toLowerCase();
    return out;
  };

  /* Spam gate 1 — the honeypot.
     A real person can trip this through an over-eager autofill, so the answer is
     a real message carrying the phone number, never a fake success page. */
  if (get(HONEYPOT)) {
    console.error('[inquiry] rejected: honeypot filled');
    const detail =
      'This was blocked as automated. If that is wrong, a browser has filled in a hidden field, and the quickest way through is to call rather than to fight the form.';
    return wantsJson(request)
      ? json(400, { ok: false, message: detail + ' ' + NOT_DELIVERED })
      : errorPage(400, 'Your message was not sent', detail);
  }

  /* Spam gate 2 — time on form. Only enforced when the stamp exists, since it is
     written by the page's script; somebody with JavaScript off is not judged
     against a stamp they were never given. */
  const stamp = Number(get('rendered_at'));
  if (Number.isFinite(stamp) && stamp > 0 && Date.now() - stamp < MIN_FILL_MS) {
    console.error('[inquiry] rejected: submitted faster than a human fills a form');
    const detail = 'That form was submitted faster than it can be filled in, so it was treated as automated.';
    return wantsJson(request)
      ? json(400, { ok: false, message: detail + ' ' + NOT_DELIVERED })
      : errorPage(400, 'Your message was not sent', detail);
  }

  /* Validation */
  const values = {};
  const problems = [];
  for (const f of FIELDS) {
    const v = get(f.name);
    if (f.required && !v) {
      problems.push(f.label + ' is needed before this can be sent.');
      continue;
    }
    if (v.length > f.max) {
      problems.push(f.label + ' is longer than this form accepts.');
      continue;
    }
    values[f.name] = v;
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    problems.push('That email address does not look complete.');
  }
  if (values.phone && (values.phone.match(/\d/g) || []).length < 10) {
    problems.push('That phone number is short by a digit or two. Check it and try again.');
  }
  if (problems.length) {
    // Deliberately no logging here: a validation failure's contents are still a
    // member of the public's contact details.
    return wantsJson(request)
      ? json(422, { ok: false, errors: problems, message: 'Nothing was sent. Fix the items above and try again.' })
      : errorPage(422, 'Your message was not sent', 'Some of the form still needs filling in:', problems);
  }

  /* Configuration. Loud and honest: an unconfigured endpoint returns an error
     the visitor can act on, never a success page for a message nobody got. */
  const apiKey = process.env.RESEND_API_KEY;
  // Owner-supplied 9 September 2026. Defaulted rather than left required so the
  // form starts working the moment the API key is set, instead of failing on a
  // second unset variable. Override with INQUIRY_TO if it ever moves.
  const to = process.env.INQUIRY_TO || 'info@trustedtermite.com';
  const from = process.env.INQUIRY_FROM || 'website@trustedtermite.com';

  if (!apiKey || !to) {
    const missing = [!apiKey && 'RESEND_API_KEY', !to && 'INQUIRY_TO'].filter(Boolean).join(', ');
    console.error('[inquiry] not configured: missing ' + missing + ' — nothing was sent');
    const detail =
      'The form on this site cannot deliver mail at the moment, so your message has not reached anybody. That is our fault and not yours.';
    return wantsJson(request)
      ? json(503, { ok: false, message: detail + ' ' + NOT_DELIVERED })
      : errorPage(503, 'Your message was not sent', detail);
  }

  /* The page it came from. Not a field anybody fills in — it records which page
     earned the enquiry. Stripped to a path so a crafted value cannot smuggle
     anything into the message body. */
  const sourcePath = (get('source_page') || '').replace(/[^\w\-/.]/g, '').slice(0, 120);

  // Only print what was actually given. Inventing "Not stated" for six optional
  // fields buries the answers that are real.
  const row = (label, v) => (v ? label + ': ' + v : null);
  const lines = [
    'New enquiry from the form on the website.',
    sourcePath ? 'Sent from: ' + sourcePath : null,
    '',
    row('Name', values.name),
    row('Phone', values.phone),
    row('Email', values.email),
    row('Best way to reach them', values.contact_pref),
    '',
    row('Town', values.town),
    row('Building type', values.property_type),
    row('Number of buildings', values.buildings),
    row('They think they need', values.service),
    row('Deadline', values.deadline),
    '',
    'WHAT THEY ARE SEEING',
    values.seeing,
    values.already_applied ? '' : null,
    values.already_applied ? 'ALREADY APPLIED' : null,
    values.already_applied || null,
    '',
    values.email
      ? 'Reply to this message to answer them by email, or call the number above.'
      : 'They did not leave an email address, so the reply is a phone call.',
  ].filter((l) => l !== null);

  const subject = values.town
    ? 'Website enquiry: ' + values.name + ' in ' + values.town
    : 'Website enquiry from ' + values.name;

  const payload = {
    from: 'Trusted Termite website <' + from + '>',
    to: [to],
    subject: subject,
    text: lines.join('\n'),
  };
  if (values.email) payload.reply_to = values.email;

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + apiKey, 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    console.error('[inquiry] delivery failed: provider unreachable');
    return wantsJson(request)
      ? json(502, { ok: false, message: NOT_DELIVERED })
      : errorPage(502, 'Your message was not sent', 'The mail provider could not be reached, so nothing was delivered.');
  }

  if (!response.ok) {
    // The provider's error body can echo the addresses back, so only the status
    // code is recorded.
    console.error('[inquiry] delivery failed: provider returned ' + response.status);
    return wantsJson(request)
      ? json(502, { ok: false, message: NOT_DELIVERED })
      : errorPage(502, 'Your message was not sent', 'The mail provider rejected the message, so nothing was delivered.');
  }

  // Delivered. Only now does anybody get told so.
  return wantsJson(request)
    ? json(200, { ok: true, redirect: THANK_YOU })
    : new Response(null, { status: 303, headers: { location: THANK_YOU, 'cache-control': 'no-store' } });
}
