import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reduced, clamp } from '../lib/motion'
import { method } from '../content'

const STEPS = method.steps
const N = STEPS.length

/* How the pinned range is spent.

   LEAD  the stage opens empty. The deck flies in from the right before any
         move is dealt, so the section never starts mid-thought.
   HOLD  the share of each step spent resting on the settled state. The move
         itself happens in the remainder, which keeps the transition short
         enough that a scroll can't easily stop halfway through it.          */
const LEAD = 0.13
const HOLD = 0.58

/* Deck geometry. The stack lives on the right at card size; the move being read
   is not a card at all — it is the whole section, full bleed, with the claim
   written on it. A card exists only while it waits or travels. */
type Geo = {
  hx: number; hy: number; hs: number   // hand-off slot: where the card blooms
  sx: number; sy: number               // centre of the top card of the stack
  w: number; h: number                 // card size at scale 1
  ss: number                           // scale of the stack
  dx: number; dy: number               // offset per level of depth
  off: number                          // how far off-stage the deck starts
  mobile: boolean
}

function geometry(vw: number, vh: number): Geo {
  const mobile = vw < 900
  const h = mobile
    ? clamp(Math.min(vh * 0.44, 380), 260, 380)
    : clamp(Math.min(vh * 0.62, 560), 340, 560)
  const w = h * 0.78
  if (mobile) {
    return {
      hx: vw * 0.5, hy: vh * 0.5, hs: 1.5,
      sx: vw * 1.02, sy: vh * 0.62,
      w, h, ss: 0.62, dx: 14, dy: 19, off: vw * 1.1, mobile,
    }
  }
  return {
    hx: vw * 0.4, hy: vh * 0.5, hs: 1.7,
    sx: vw * 0.78, sy: vh * 0.6,
    w, h, ss: 0.5, dx: 26, dy: 32, off: vw * 0.9, mobile,
  }
}

type Slot = { x: number; y: number; s: number; z: number }

const ease = gsap.parseEase('power2.inOut')
const easeOut = gsap.parseEase('power3.out')

/* Linear — the easing lives in the plateau below, and doing it twice makes the
   move crawl at both ends. */
const mix = (a: Slot, b: Slot, u: number): Slot => ({
  x: a.x + (b.x - a.x) * u,
  y: a.y + (b.y - a.y) * u,
  s: a.s + (b.s - a.s) * u,
  z: a.z + (b.z - a.z) * u,
})

/** Scroll position → deck position, with a rest at every whole step. */
function plateau(dealP: number) {
  const seg = dealP * (N - 1)
  const i = Math.min(Math.floor(seg), N - 2)
  const f = seg - i
  return i + ease(clamp((f - HOLD) / (1 - HOLD), 0, 1))
}

/** Four moves as a deck. The stack sits on the right with the edges of the
 *  hidden cards showing. Scrolling lifts the top card, flies it left and blooms
 *  it into a full-bleed frame that fills the whole section, with the claim
 *  written straight onto the picture. Scroll on and it shrinks back into a card
 *  and slides under the pile while the next one comes forward. */
export function Method() {
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
      const cards = gsap.utils.toArray<HTMLElement>('.mv-card')
      const frames = gsap.utils.toArray<HTMLElement>('.mv-frame')
      if (!cards.length) return

      let geo = geometry(window.innerWidth, window.innerHeight)

      const stackSlot = (k: number): Slot => ({
        x: geo.sx + k * geo.dx,
        y: geo.sy - k * geo.dy,
        s: geo.ss * (1 - k * 0.05),
        z: 200 - k * 20,
      })
      const handOff = (): Slot => ({ x: geo.hx, y: geo.hy, s: geo.hs, z: 220 })

      const place = (p: number) => {
        const enter = easeOut(clamp(p / LEAD, 0, 1))
        const cursor = plateau(clamp((p - LEAD) / (1 - LEAD), 0, 1))
        const slide = (1 - enter) * geo.off

        cards.forEach((card, i) => {
          const t = cursor - i
          const at = Math.abs(t)
          let slot: Slot

          if (t <= -1) slot = stackSlot(-t)
          else if (t < 0) slot = mix(stackSlot(1), handOff(), t + 1)
          else if (t < 1) slot = mix(handOff(), stackSlot(N - 1 - i), t)
          else slot = stackSlot(N - 1 - i)

          // As a card reaches the hand-off it stops being a card — corners,
          // shadow and hairline all go — so it dissolves into the picture
          // rather than fading out on top of it.
          const merge = 1 - clamp((at - 0.1) / 0.34, 0, 1)
          const cardAlpha = clamp((at - 0.2) / 0.32, 0, 1) * enter

          card.style.transform =
            'translate3d(' + (slot.x - geo.w / 2 + slide).toFixed(1) + 'px, ' +
            (slot.y - geo.h / 2).toFixed(1) + 'px, 0) scale(' + slot.s.toFixed(4) + ')'
          card.style.opacity = cardAlpha.toFixed(3)
          card.style.zIndex = String(Math.round(slot.z))
          card.style.setProperty('--merge', merge.toFixed(3))

          const frame = frames[i]
          if (frame) {
            const fa = (1 - clamp((at - 0.1) / 0.55, 0, 1)) * enter
            frame.style.opacity = fa.toFixed(3)
            frame.style.transform = 'scale(' + (1 + at * 0.08).toFixed(4) + ')'
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
        box.style.setProperty('--card-w', geo.w + 'px')
        box.style.setProperty('--card-h', geo.h + 'px')
      }

      // one resting point per step, at the head of each plateau
      const stops = Array.from({ length: N }, (_, i) => LEAD + (1 - LEAD) * (i / (N - 1)))

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => '+=' + window.innerHeight * (N * 1.25),
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

      gsap.to('.mv__bar span', {
        scaleX: 1, transformOrigin: 'left', ease: 'none',
        scrollTrigger: {
          trigger: el, start: 'top top',
          end: () => '+=' + window.innerHeight * (N * 1.25), scrub: 0.3,
        },
      })

      return () => st.kill()
    }, el)

    return () => ctx.revert()
  }, [])

  /* Before the deck has arrived nothing is showing at all. */
  const state = (i: number) =>
    !started ? 'is-next' : i === active ? 'is-on' : i < active ? 'is-past' : 'is-next'

  return (
    <section className="mv" id="method" ref={root}>
      <div className="mv__stage" ref={stage}>
        {/* the move being read: full bleed, edges dissolved into the ground */}
        <div className="mv__full" aria-hidden="true">
          {STEPS.map((step) => (
            <figure className="mv-frame" key={step.no}>
              <img
                src={step.image}
                alt=""
               
                decoding="async"
                style={step.crop as React.CSSProperties | undefined}
              />
            </figure>
          ))}
        </div>
        <div className="mv__scrim" aria-hidden="true" />

        <p className="mv__overline">
          <span className="numeral">{method.no}</span>
          <i aria-hidden="true" />
          <span className="kicker">{method.kicker}</span>
        </p>

        <div className="mv__claims">
          {STEPS.map((step, i) => (
            <h3 className={'mv-claim ' + state(i)} key={step.no} aria-hidden={i !== active}>
              <span>{step.title}</span>
            </h3>
          ))}
        </div>

        <div className="mv__lines">
          {STEPS.map((step, i) => (
            <p className={'mv-line ' + state(i)} key={step.no} aria-hidden={i !== active}>{step.text}</p>
          ))}
        </div>

        {/* the deck: a card exists only while it waits or travels */}
        <div className="mv__deck" aria-hidden="true">
          {STEPS.map((step) => (
            <article className="mv-card" key={step.no}>
              <span className="mv-card__frame">
                <img
                  src={step.image}
                  alt=""
                 
                  decoding="async"
                  style={step.crop as React.CSSProperties | undefined}
                />
              </span>
              <span className="mv-card__tint" />
              <span className="mv-card__label">{step.title}</span>
            </article>
          ))}
        </div>

        <div className="mv__bar" aria-hidden="true"><span /></div>
      </div>

      {/* Reduced motion: the deck laid out flat. */}
      <div className="mv__fallback">
        {STEPS.map((step) => (
          <article key={step.no}>
            <img src={step.image} alt="" decoding="async" />
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
