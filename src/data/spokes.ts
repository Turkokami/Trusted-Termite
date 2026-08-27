/**
 * Service problem spokes — Wave 4.
 *
 * A spoke is a page named after a sentence a customer actually says on the
 * phone, not a keyword. It lives at /services/{service}/{problem}/ under the
 * frozen taxonomy in CONTENT_BRIEF §9.
 *
 * This file is the single source of truth: the SpokeLinks component renders
 * from it so a spoke can never ship orphaned, and scripts/verify.mjs asserts
 * that every entry here corresponds to a built page and that every built spoke
 * page appears here. Adding a page without adding a row fails the build.
 *
 * RULE FOR ADDING ONE: it must carry an argument the parent service page does
 * not already make, at the M1 floor, from sources. Eight is not a target; it is
 * how many problems we had real material for.
 */
export interface Spoke {
  /** Parent service slug — must exist in services.ts. */
  service: string;
  /** Final path segment. */
  slug: string;
  /** Link text on the parent page. Phrased as the customer says it. */
  label: string;
  /** One line of why the page exists, shown under the link. */
  blurb: string;
  /** Lead-in sentence on the parent service page. Written fresh per spoke —
   *  shared boilerplate here would trip the duplicate-sentence scanner, and
   *  rightly so: eight identical paragraphs across eight service pages is
   *  exactly the templating this build exists to avoid. */
  intro: string;
}

export const SPOKES: Spoke[] = [
  {
    service: 'bed-bug-treatment',
    slug: 'bites-but-no-bed-bugs',
    label: 'I have bites but nobody can find a bed bug',
    blurb:
      'Bite marks cannot identify what caused them — in either direction. Roughly a third of people with a confirmed infestation report no symptoms at all.',
    intro:
      'The single most common bed bug call we take is not about bed bugs at all — it is about marks on skin with nothing found. It is worth its own page, because the honest answer is longer than a paragraph.',
  },
  {
    service: 'rodent-control',
    slug: 'noises-in-the-attic',
    label: 'Something is scratching in the attic at night',
    blurb:
      'Time of day narrows the list, but sound alone does not identify an animal — and what you may legally do next depends entirely on which one it is.',
    intro:
      'Before any of the above applies, somebody has to work out what is up there. That question has a real method behind it, and a legal dimension most people are not expecting.',
  },
  {
    service: 'pest-control',
    slug: 'roaches-in-a-clean-house',
    label: 'Roaches, and the house is genuinely clean',
    blurb:
      'They arrive as cargo, not as a verdict on your housekeeping. What cleaning changes is whether an arrival establishes.',
    intro:
      'One conversation comes up so often, and carries so much unnecessary embarrassment, that we have set the sourced answer out in full rather than repeat it on doorsteps.',
  },
  {
    service: 'scorpion-control',
    slug: 'scorpion-in-the-bathroom',
    label: 'A scorpion in the bathtub',
    blurb:
      'The drain story and the porcelain story are both unsourced. The documented mechanism is moisture and attic heat, which points somewhere else entirely.',
    intro:
      'There is one scorpion story everybody in West Texas tells, and when we went looking for where it came from, we could not find a source for any part of it. That deserved writing up properly.',
  },
  {
    service: 'wildlife-removal',
    slug: 'dead-animal-in-the-wall',
    label: 'Something died in the wall',
    blurb:
      'Nobody can honestly quote you a duration. What is documented is the drying mechanism, the fly and beetle timeline, and why an ozone machine is the wrong answer.',
    intro:
      'The other half of wildlife work arrives after the animal is dead, usually with one question attached that nobody can honestly answer with a number.',
  },
  {
    service: 'termite-control',
    slug: 'mud-tubes-on-the-foundation',
    label: 'I found mud tubes on the foundation',
    blurb:
      'Break one open — but breaking them achieves nothing else. The colony is in the soil, and bath traps are where a Texas slab actually lets them in.',
    intro:
      'Most termite calls start with the same finding, and with two instincts about what to do next that both leave the colony untouched.',
  },
  {
    service: 'lawn-care',
    slug: 'grassburs',
    label: 'Grass burs all over the yard',
    blurb:
      'A soil temperature problem and a seed bank problem. The trigger is 52 degrees of soil, and the honest horizon is at least three years.',
    intro:
      'One weed accounts for more calls than the rest of the lawn combined out here, and it is the one where the popular approach reliably fails on a schedule.',
  },
  {
    service: 'flea-and-tick',
    slug: 'fleas-after-treating-the-pet',
    label: 'Still fleas after the pet was treated',
    blurb:
      'The cocoon resists insecticide and waits for a host cue. Expect fleas for weeks after a correct treatment — four weeks is the threshold that matters.',
    intro:
      'There is one flea question that makes people lose faith in this trade, and the answer is a life stage that no treatment can reach. Worth reading before you book anything.',
  },
];

/** Spokes belonging to one service, in file order. */
export function spokesFor(service: string): Spoke[] {
  return SPOKES.filter((s) => s.service === service);
}
