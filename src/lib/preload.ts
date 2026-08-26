import { MANIFEST, estimateBytes, FONT_FACES } from './assets'

/* The gate. Nothing of the page is shown until every file in the manifest has
   been pulled down in full and the four type weights have loaded.

   Downloads go through fetch() with a streaming reader rather than <img> or
   <video> tags, for two reasons: it gives byte-level progress instead of a
   step per file, and it puts each response in the HTTP cache, so when the
   markup later asks for the same URL it is served from memory with no second
   request and no pop-in. */

const CONCURRENCY = 6

/** Nothing may hold the visitor at the door forever. If the network stalls we
 *  open anyway — a slow image is a worse outcome than a locked site. */
const MAX_WAIT = 45_000

type Progress = (fraction: number) => void

type Entry = { url: string; size: number; loaded: number; done: boolean }

async function pull(entry: Entry, tick: () => void, signal: AbortSignal) {
  try {
    const res = await fetch(entry.url, { signal, cache: 'force-cache' })
    if (!res.ok || !res.body) throw new Error(String(res.status))

    const declared = Number(res.headers.get('content-length') || 0)
    if (declared > 0) { entry.size = declared; tick() }

    const reader = res.body.getReader()
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      entry.loaded += value.byteLength
      tick()
    }
    // a body longer than its header, or no header at all
    if (entry.loaded > entry.size) entry.size = entry.loaded
  } catch {
    /* A file that 404s or is blocked must not hold the gate shut. It is
       counted as finished so the bar still reaches the end. */
  } finally {
    entry.done = true
    entry.loaded = entry.size
    tick()
  }
}

/** Download everything, reporting a real 0 → 1. Resolves when the page is
 *  genuinely ready to be shown. */
export async function preloadAll(onProgress: Progress): Promise<void> {
  const entries: Entry[] = MANIFEST.map((url) => ({
    url, size: estimateBytes(url), loaded: 0, done: false,
  }))

  const controller = new AbortController()
  const guard = setTimeout(() => controller.abort(), MAX_WAIT)

  let last = -1
  const tick = () => {
    let loaded = 0
    let total = 0
    for (const e of entries) {
      total += e.size
      loaded += Math.min(e.loaded, e.size)
    }
    // hold the last few per cent back for the fonts
    const f = total > 0 ? (loaded / total) * 0.96 : 0
    if (f > last) { last = f; onProgress(f) }
  }

  let cursor = 0
  const worker = async () => {
    while (cursor < entries.length) {
      const entry = entries[cursor++]
      await pull(entry, tick, controller.signal)
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, entries.length) }, worker),
  )
  clearTimeout(guard)

  // Type next: the shapes must be resolved before the first line is measured,
  // or every masked heading splits against the fallback face.
  try {
    if (document.fonts) {
      await Promise.all(FONT_FACES.map((f) => document.fonts.load(f)))
      await document.fonts.ready
    }
  } catch { /* a browser without the font API still gets the page */ }

  // Last: every <img> already in the tree is decoded. The bytes are in cache by
  // now, so this costs nothing on the network — but it means no element is
  // still rasterising when the curtain lifts, which is the difference between
  // "downloaded" and "ready to paint".
  await Promise.all(
    Array.from(document.images).map((img) =>
      img.decode ? img.decode().catch(() => {}) : Promise.resolve(),
    ),
  )

  onProgress(1)
}
