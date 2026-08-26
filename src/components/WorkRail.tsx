import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reduced, clamp, pointerDrift } from '../lib/motion'
import { work } from '../content'

const ITEMS = work.items
const N = ITEMS.length

/* Same rhythm as the deck in section 02: a rest on every whole step, and the
   move itself in a short window so a scroll cannot stop halfway through it. */
const HOLD = 0.56

/* The strip does not begin already running. It opens on the first picture
   pushing in, with the neighbours sliding to their places at either side, so
   the section arrives rather than cutting straight to its first frame. */
const LEAD = 0.12

type Geo = {
  cx: number; cy: number     // centre of the strip
  gap: number                // horizontal distance between neighbours
  w: number; h: number       // preview size at scale 1
  hs: number                 // scale at which a preview hands off to full bleed
  mobile: boolean
}

function geometry(vw: number, vh: number): Geo {
  const mobile = vw < 900
  const w = mobile
    ? clamp(Math.min(vw * 0.44, vh * 0.24), 140, 220)
    : clamp(Math.min(vw * 0.21, vh * 0.34), 190, 330)
  return {
    cx: vw * 0.5, cy: vh * 0.5,
    // far enough out that a neighbour only ever shows an edge, and never
    // reaches the column the claim is set in
    gap: mobile ? vw * 0.74 : vw * 0.56,
    w, h: w * 0.7,
    hs: mobile ? Math.max(vw / w, vh / (w * 0.7)) * 1.05 : Math.max(vw / w, vh / (w * 0.7)) * 1.05,
    mobile,
  }
}

const ease = gsap.parseEase('power2.inOut')
const easeOut = gsap.parseEase('power3.out')

function plateau(p: number) {
  const seg = p * (N - 1)
  const i = Math.min(Math.floor(seg), N - 2)
  const f = seg - i
  return i + ease(clamp((f - HOLD) / (1 - HOLD), 0, 1))
}

/** The work, as one strip seen edge on. What you are reading fills the whole
 *  section; the piece before it and the piece after it sit small at either
 *  side. Scroll and the one in view shrinks away to the left while the next
 *  grows in from the right to take the section. No cards, no chrome — a
 *  picture and a sentence. */
export function WorkRail() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const activeRef = useRef(0)
  const startedRef = useRef(false)

  useLayoutEffect(() => {
    const el = root.current
    const box = stage.current
    if (!el || !box || reduced()) return

    const ctx = gsap.context(() => {
      const thumbs = gsap.utils.toArray<HTMLElement>('.wk-thumb')
      const frames = gsap.utils.toArray<HTMLElement>('.wk-frame')
      if (!thumbs.length) return

      let geo = geometry(window.innerWidth, window.innerHeight)

      const place = (p: number) => {
        const enter = easeOut(clamp(p / LEAD, 0, 1))
        const cursor = plateau(clamp((p - LEAD) / (1 - LEAD), 0, 1))

        thumbs.forEach((thumb, i) => {
          const d = cursor - i          // positive once it has passed to the left
          const ad = Math.abs(d)
          const frame = frames[i]

          if (ad > 1.9) {
            thumb.style.visibility = 'hidden'
            if (frame) frame.style.opacity = '0'
            return
          }
          thumb.style.visibility = 'visible'

          // grows only across the last step into the centre
          const k = ease(clamp(1 - ad, 0, 1))
          const scale = 1 + (geo.hs - 1) * k
          const x = geo.cx - d * geo.gap
          // it hands the section over to the full-bleed frame as it arrives,
          // and drops out of sight once it is past its neighbour slot
          const near = clamp((ad - 0.12) / 0.3, 0, 1)
          const far = 1 - clamp((ad - 1.15) / 0.45, 0, 1)

          // the neighbours slide in from beyond their own side as it opens
          const slide = (1 - enter) * geo.gap * Math.sign(-d || 1)

          thumb.style.transform =
            'translate3d(' + (x - geo.w / 2 + slide).toFixed(1) + 'px, ' +
            (geo.cy - geo.h / 2).toFixed(1) + 'px, 0) scale(' + scale.toFixed(4) + ')'
          thumb.style.opacity = (near * far * enter).toFixed(3)
          thumb.style.zIndex = String(200 - Math.round(ad * 20))
          thumb.style.setProperty('--merge', (1 - near).toFixed(3))

          if (frame) {
            frame.style.opacity = ((1 - clamp((ad - 0.1) / 0.55, 0, 1)) * enter).toFixed(3)
            // the opening push-in: the first picture settles out of a slow zoom
            frame.style.transform =
              'translate3d(' + (-d * geo.gap * 0.16).toFixed(1) + 'px,0,0) scale(' +
              (1 + ad * 0.07 + (1 - enter) * 0.14).toFixed(4) + ')'
          }
        })

        const idx = clamp(Math.round(cursor), 0, N - 1)
        if (idx !== activeRef.current) {
          activeRef.current = idx
          setActive(idx)
        }
        const on = enter > 0.55
        if (on !== startedRef.current) {
          startedRef.current = on
          setStarted(on)
        }
      }

      const applyGeo = () => {
        geo = geometry(window.innerWidth, window.innerHeight)
        box.style.setProperty('--thumb-w', geo.w + 'px')
        box.style.setProperty('--thumb-h', geo.h + 'px')
      }

      const stops = Array.from({ length: N }, (_, i) => LEAD + (1 - LEAD) * (i / (N - 1)))

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => '+=' + window.innerHeight * (N * 1.1),
        pin: box,
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: stops,
          duration: { min: 0.3, max: 0.8 },
          delay: 0.02,
          ease: 'power2.inOut',
        },
        onRefreshInit: applyGeo,
        onUpdate: (self) => place(self.progress),
        onRefresh: (self) => { applyGeo(); place(self.progress) },
      })

      applyGeo()
      place(0)

return () => st.kill()
    }, el)

    const media = el.querySelector<HTMLElement>('.wk__full')
    const stopDrift = media ? pointerDrift(media) : undefined

    return () => { stopDrift?.(); ctx.revert() }
  }, [])

  /* Nothing is legible until the strip has arrived. */
  const state = (i: number) =>
    !started ? 'is-next' : i === active ? 'is-on' : i < active ? 'is-past' : 'is-next'

  return (
    <section className="wk" id="work" ref={root}>
      <div className="wk__stage" ref={stage}>
        {/* what is being read: the whole section, edges dissolved */}
        <div className="wk__full" aria-hidden="true">
          {ITEMS.map((item) => (
            <figure className="wk-frame" key={item.no}>
              <img src={item.image} alt="" decoding="async" />
            </figure>
          ))}
        </div>
        <div className="wk__scrim" aria-hidden="true" />

        <p className={'wk__overline ' + (started ? 'is-on' : '')}>
          <span className="numeral">{work.no}</span>
          <i aria-hidden="true" />
          <span className="kicker">{work.kicker}</span>
        </p>

        <div className="wk__claims">
          {ITEMS.map((item, i) => (
            <h3 className={'wk-claim ' + state(i)} key={item.no} aria-hidden={i !== active}>
              <span>{item.title}</span>
            </h3>
          ))}
        </div>

        <div className="wk__lines">
          {ITEMS.map((item, i) => (
            <p className={'wk-line ' + state(i)} key={item.no} aria-hidden={i !== active}>{item.text}</p>
          ))}
        </div>

        {/* the piece before and the piece after, sitting small at either side */}
        <div className="wk__strip" aria-hidden="true">
          {ITEMS.map((item) => (
            <figure className="wk-thumb" key={item.no}>
              <img src={item.image} alt="" decoding="async" />
              <span className="wk-thumb__tint" />
            </figure>
          ))}
        </div>

        
      </div>

      {/* Reduced motion: the strip laid out flat. */}
      <div className="wk__fallback">
        {ITEMS.map((item) => (
          <article key={item.no}>
            <img src={item.image} alt="" decoding="async" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
