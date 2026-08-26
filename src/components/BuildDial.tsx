import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reduced, clamp, fine } from '../lib/motion'
import { getLenis } from '../lib/useLenis'
import { build } from '../content'

const UNITS = build.units
const N = UNITS.length

/* Geometry of the imaginary dial.
   The hub sits just off the left edge; only the right half of the wheel is ever
   on screen. A unit enters at the top of the arc, swings out to the active
   position at three o'clock, then drops away below. Nothing is drawn — the
   motion is the wheel. */
const SWEEP = 58          // degrees from the active position to the edge of view
const GAP = 50            // angular distance between two consecutive units
const RAD = Math.PI / 180

type Geo = { hx: number; hy: number; r: number; size: number; mobile: boolean }

function geometry(w: number, h: number): Geo {
  const mobile = w < 900
  if (mobile) {
    // on a phone the disc spans wider than the screen and sits between the
    // section label and the panel, so the stage never has a dead band
    const r = h * 0.62
    const size = clamp(Math.min(w * 1.3, h * 0.6), 260, 520)
    return { hx: w * 0.5 - r, hy: h * 0.415, r, size, mobile }
  }
  // The disc is sized to fill the stage: it runs off the left edge and past the
  // top and bottom. Its rim is feathered rather than cropped, so none of that
  // reads as cut — it just dissolves into the ground.
  const r = h * 0.86
  const size = clamp(Math.min(h * 1.06, w * 0.64), 440, 1080)
  return { hx: w * 0.22 - r, hy: h * 0.52, r, size, mobile }
}

export function BuildDial() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useLayoutEffect(() => {
    const el = root.current
    const box = stage.current
    if (!el || !box) return

    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray<HTMLElement>('.dial-cell')
      if (!cells.length) return

      if (reduced()) {
        cells.forEach((c) => c.classList.add('is-static'))
        return
      }

      let geo = geometry(window.innerWidth, window.innerHeight)

      /** Place every unit for a given scroll progress. */
      const place = (p: number) => {
        const cursor = p * (N - 1)
        cells.forEach((cell, i) => {
          // negative is above the hub, positive below: a unit swings down into
          // the active slot at three o'clock, then keeps going and drops away
          const deg = (cursor - i) * GAP
          const off = Math.abs(deg)

          if (off > SWEEP + GAP * 0.5) {
            cell.style.visibility = 'hidden'
            return
          }
          cell.style.visibility = 'visible'

          const t = clamp(off / SWEEP, 0, 1)
          const scale = gsap.utils.interpolate(1, 0.28, t ** 0.72)
          // on a phone the arc sweeps much wider across the screen, so
          // neighbours have to clear out sooner or they sit under the copy
          const fadeFrom = SWEEP * (geo.mobile ? 0.16 : 0.55)
          const opacity = 1 - clamp((off - fadeFrom) / (SWEEP * 0.45), 0, 1)

          const x = geo.hx + geo.r * Math.cos(deg * RAD) - geo.size / 2
          const y = geo.hy + geo.r * Math.sin(deg * RAD) - geo.size / 2

          cell.style.transform =
            `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`
          cell.style.opacity = opacity.toFixed(3)
          cell.style.zIndex = String(100 - Math.round(off))
          // the photograph drifts inside its own frame so the crop feels alive.
          // Target the <img>, not .dial-cell__photo — the pointer tilt owns that
          // element's transform and the two would overwrite each other.
          const img = cell.querySelector('img')
          if (img) img.style.transform = `translate3d(0, ${(deg * 0.24).toFixed(1)}px, 0) scale(1.18)`
        })

        const idx = clamp(Math.round(cursor), 0, N - 1)
        if (idx !== activeRef.current) {
          activeRef.current = idx
          setActive(idx)
        }
      }

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${window.innerHeight * (N * 0.92)}`,
        pin: box,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // detents: the dial settles on a division rather than resting between
        // two, so one unit always owns the centre of the screen
        snap: {
          snapTo: 1 / (N - 1),
          duration: { min: 0.18, max: 0.5 },
          delay: 0.06,
          ease: 'power2.inOut',
        },
        onRefreshInit: () => { geo = geometry(window.innerWidth, window.innerHeight) },
        onUpdate: (self) => place(self.progress),
        onRefresh: (self) => {
          geo = geometry(window.innerWidth, window.innerHeight)
          box.style.setProperty('--cell', `${geo.size}px`)
          place(self.progress)
        },
      })

      box.style.setProperty('--cell', `${geo.size}px`)
      place(0)

      // the rail on the right fills as the dial turns
      gsap.to('.dial-rail__fill', {
        scaleY: 1, transformOrigin: 'top', ease: 'none',
        scrollTrigger: {
          trigger: el, start: 'top top',
          end: () => `+=${window.innerHeight * (N * 0.92)}`, scrub: 0.3,
        },
      })

      // pointer tilt on the active photograph
      if (fine()) {
        const tilt = (e: PointerEvent) => {
          const cell = box.querySelector<HTMLElement>('.dial-cell.is-active .dial-cell__photo')
          if (!cell) return
          const r = cell.getBoundingClientRect()
          const nx = (e.clientX - (r.left + r.width / 2)) / (r.width || 1)
          const ny = (e.clientY - (r.top + r.height / 2)) / (r.height || 1)
          gsap.to(cell, {
            rotateY: clamp(nx * 13, -13, 13),
            rotateX: clamp(ny * -13, -13, 13),
            duration: 0.7, ease: 'power3', overwrite: 'auto',
          })
        }
        window.addEventListener('pointermove', tilt, { passive: true })
        return () => window.removeEventListener('pointermove', tilt)
      }

      return () => st.kill()
    }, el)

    return () => ctx.revert()
  }, [])

  /* Clicking an index number scrolls the pinned range to that unit. */
  const jump = (i: number) => {
    const el = root.current
    if (!el) return
    const st = ScrollTrigger.getAll().find((t) => t.trigger === el && t.pin)
    if (!st) return
    const target = st.start + (st.end - st.start) * (i / (N - 1))
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(target, { duration: 1.4 })
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const unit = UNITS[active]

  return (
    <section className="build ground-ink" id="build" ref={root}>
      <div className="build__stage" ref={stage}>
        {/* the wheel itself is never drawn — only the light it turns through */}
        <div className="build__halo" aria-hidden="true" />

        {/* the label sits in the copy column — the dial owns the left half */}
        <p className="build__overline">
          <span className="numeral">{build.no}</span>
          <i aria-hidden="true" />
          <span className="kicker">{build.kicker}</span>
        </p>

        <div className="dial" aria-hidden="true">
          {UNITS.map((u, i) => (
            <div className={`dial-cell ${i === active ? 'is-active' : ''}`} key={u.no}>
              <div className="dial-cell__photo">
                <img src={u.image} alt="" loading="lazy" decoding="async" />
                <span className="dial-cell__tint" />
              </div>
            </div>
          ))}
        </div>

        <div className="build__panel" role="region" aria-live="polite">
          <p className="build__panel-no">{unit.no} <i /> {String(N).padStart(2, '0')}</p>
          <h3 className="build__panel-name" key={`n-${unit.no}`}>{unit.name}</h3>
          <p className="build__panel-line" key={`l-${unit.no}`}>{unit.line}</p>
        </div>

        <nav className="dial-rail" aria-label="Divisions">
          <span className="dial-rail__track" aria-hidden="true"><span className="dial-rail__fill" /></span>
          {UNITS.map((u, i) => (
            <button
              type="button"
              className={i === active ? 'is-active' : ''}
              key={u.no}
              onClick={() => jump(i)}
              aria-current={i === active}
            >
              <em>{u.no}</em><span>{u.name}</span>
            </button>
          ))}
        </nav>

        <p className="build__hint"><i aria-hidden="true" />Scroll to turn the dial</p>
      </div>

      {/* Reduced motion: no pin, no dial — the same seven divisions as a plain
          stack. Swapped entirely in CSS so there is no second code path. */}
      <ul className="build__fallback shell">
        {UNITS.map((u) => (
          <li key={u.no}>
            <img src={u.image} alt="" loading="lazy" decoding="async" />
            <div>
              <span className="numeral">{u.no}</span>
              <h3 className="h3">{u.name}</h3>
              <p>{u.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
