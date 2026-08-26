import { diagnosis, method, build, work, difference } from '../content'

/* Every file the page needs before it is allowed to open. Paths are written the
   same way the markup writes them — relative — and resolved against the
   document base, so a manifest entry and an <img src> always request the exact
   same URL and the tag gets a cache hit rather than a second download. */

const STATIC = [
  'assets/brand/logo-white.png',
  'assets/brand/logo-dark.png',
  'assets/brand/icon-only-green.png',
  'assets/generated/hero-path.webp',
  'assets/generated/closing-path.webp',
]

/* The films are the only assets that do not gate the door.

   Every one of them sits behind a still of the same shot at 32% opacity under
   a heavy scrim, so a film that arrives a second late fades up rather than
   pops — nothing on the page is missing while it loads. They are also 18 of
   the site's 26 MB, and holding the door for them cost 75s on a live GitHub
   Pages load against 8s for everything else. They start downloading with the
   rest and simply are not waited on.

   To gate on them too, move these three back into STATIC above. */
const DEFERRED_PATHS = [
  'assets/video/01-hero.mp4',
  'assets/video/02-statement.mp4',
  'assets/video/03-closing.mp4',
]

const fromContent = [
  ...diagnosis.panels.map((p) => p.image),
  ...method.steps.map((s) => s.image),
  ...build.units.map((u) => u.image),
  ...work.items.map((i) => i.image),
  ...difference.rows.map((r) => r.image),
]

const resolve = (path: string) => new URL(path, document.baseURI).href

/** Held at the door. */
export const MANIFEST: string[] = Array.from(new Set([...STATIC, ...fromContent])).map(resolve)

/** Fetched alongside, but never waited on. */
export const DEFERRED: string[] = DEFERRED_PATHS.map(resolve)

/** Rough size per type, corrected from content-length as each response lands.
 *  Only used so the bar is weighted sensibly before the headers arrive. */
export function estimateBytes(url: string): number {
  if (url.endsWith('.mp4')) return 6_000_000
  if (url.endsWith('.png')) return 120_000
  return 300_000
}

export const FONT_FACES = [
  '400 1rem "IBM Plex Sans Arabic"',
  '500 1rem "IBM Plex Sans Arabic"',
  '600 1rem "IBM Plex Sans Arabic"',
  '700 1rem "IBM Plex Sans Arabic"',
]
