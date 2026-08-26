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

export const MANIFEST: string[] = Array.from(new Set([...STATIC, ...fromContent]))
  .map((path) => new URL(path, document.baseURI).href)

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
