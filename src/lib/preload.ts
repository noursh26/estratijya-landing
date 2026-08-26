import { DEFERRED, FONT_FACES } from './assets'

/* The gate. Nothing of the page is shown until every picture on it has
   downloaded and decoded and the four type weights have resolved.

   It waits on the <img> elements themselves rather than fetching the same
   files a second time. Every image in the markup is eager, so by the time this
   runs the browser is already pulling them down; issuing a parallel fetch for
   each one only raced the tag for the same bytes — six of them were cancelled
   mid-flight on a live load — and on a slow connection risked paying for some
   files twice.

   The films are the one thing not waited on, and they are not even started
   until the door is open: three 6 MB downloads competing with the pictures for
   bandwidth was what turned an eight-second load into ninety. */

/** Nothing may hold the visitor at the door forever. If the network stalls we
 *  open anyway — a slow image is a worse outcome than a locked site. */
const MAX_WAIT = 45_000

type Progress = (fraction: number) => void

const settled = (img: HTMLImageElement) => img.complete && img.naturalWidth > 0

function whenLoaded(img: HTMLImageElement): Promise<void> {
  if (settled(img)) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const done = () => {
      img.removeEventListener('load', done)
      img.removeEventListener('error', done)
      resolve()
    }
    img.addEventListener('load', done)
    // a broken file must not hold the gate shut
    img.addEventListener('error', done)
  })
}

/** Resolves when the page is genuinely ready to be shown. */
export async function preloadAll(onProgress: Progress): Promise<void> {
  const images = Array.from(document.images)
  const total = images.length || 1

  let done = 0
  const tick = () => {
    // the last slice is held back for the fonts and the decode pass
    onProgress(Math.min((done / total) * 0.94, 0.94))
  }
  tick()

  let opened = false
  const openAnyway = new Promise<void>((resolve) =>
    setTimeout(() => { opened = true; resolve() }, MAX_WAIT),
  )

  const all = Promise.all(
    images.map((img) => whenLoaded(img).then(() => { done += 1; tick() })),
  ).then(() => undefined)

  await Promise.race([all, openAnyway])

  // Type next: the shapes must be resolved before the first line is measured,
  // or every masked heading splits against the fallback face.
  try {
    if (document.fonts) {
      await Promise.all(FONT_FACES.map((f) => document.fonts.load(f)))
      await document.fonts.ready
    }
  } catch { /* a browser without the font API still gets the page */ }

  // Last: decode, so nothing is still rasterising when the curtain lifts —
  // the difference between "downloaded" and "ready to paint".
  if (!opened) {
    await Promise.all(
      images.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())),
    )
  }

  onProgress(1)

  // Only now do the films get the network to themselves.
  for (const url of DEFERRED) {
    fetch(url, { cache: 'force-cache' }).catch(() => {})
  }
}
