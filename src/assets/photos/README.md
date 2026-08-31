# Owner-supplied photographs

Files here are imported through `astro:assets`, NOT served from `public/`. That
is deliberate: these are multi-megabyte phone photographs and they appear on
pages that already carry 3,000 words. Astro hashes them, emits width and height
so nothing shifts on load, and converts to modern formats at build time. A raw
`public/` copy would ship the original bytes to every visitor.

Import them, do not reference them by path:

```astro
import { Image } from 'astro:assets';
import owner from '../../assets/photos/valentin-moriel-owner.jpg';
<Image src={owner} alt="Valentin Moriel beside the Trusted Termite truck" />
```

`alt` is not optional — verify.mjs §2 fails the build on any `<img>` without it.

## Expected files

| File | What it is | Where it goes |
|---|---|---|
| `valentin-moriel-owner.jpg` | Arms folded beside the truck | `/about/` — the F-10 headshot, and the Person node's `image` |
| `valentin-moriel-gloves.jpg` | Gloving up at the tailgate | `/services/pest-control/` |
| `valentin-moriel-cab.jpg` | In the driver's seat, door logo | `/contact/`, `/locations/seminole/` |
| `termite-mud-tube-block-pier.jpg` | Mud tube climbing a block pier to the sill | `/services/termite-control/mud-tubes-on-the-foundation/`, `/pest-library/subterranean-termite/` |
| `termite-bait-station-install.jpg` | Station hole augered into caliche | `/services/termite-control/` |

## Held out, and why

Two supplied photographs are NOT in this folder and must not be added without
resolving the reason first.

**Truck and trailer.** The fender reads `TPCL#0976265`. That was flagged as a
contradiction with the site (**P0-8**) and it turned out the TRUCK was right —
the number the site had been publishing did not exist. P0-8 is closed and the
site now agrees with the fender, so the licence number is no longer a reason to
hold this photograph.

It is still held, for the other reason: the livery panel shows the 915 number.
Crop that panel out and this one is publishable — it is the best image available
for junk removal and brush clearing, being the only one showing the trailer.

**Owner with the sprayer.** The livery panel legibly reads `915.474.1986`. That
number is withheld on purpose — see `business.ts → secondPhoneUnpublished` and
P0-5. Google currently mis-resolves this business to El Paso, and a 915 number
on a Seminole site confirms the wrong answer. The Phase 0 acceptance gate
requires it stay unpublished; a photograph publishes it just as effectively as
text does.

**Watch the headshot too.** `valentin-moriel-owner.jpg` has the same green livery
panel behind him, out of focus and partly blocked. It reads as illegible at
page size, but check it at full width after the first build rather than
assuming — the gate says the number is unpublished, and a photograph is a
publication.
