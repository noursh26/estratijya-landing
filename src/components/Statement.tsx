import { useLayoutEffect, useRef } from 'react'
import { gsap, reduced } from '../lib/motion'

const LINES = ['We start where the work', 'cannot be seen —', 'so we can end where', 'the customer can.']

/** The film opens. A framed clip grows to full bleed as you scroll while the
 *  claim assembles over it, line by line. Reference: fantasy.co / instrument
 *  full-bleed transitions. */
export function Statement() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (reduced()) {
      gsap.set(el.querySelectorAll('.statement__line span'), { yPercent: 0, autoAlpha: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=190%',
          pin: '.statement__stage',
          scrub: 0.7,
          anticipatePin: 1,
        },
      })

      tl.fromTo('.statement__frame',
        { clipPath: 'inset(22% 30% 22% 30% round 28px)', scale: 1.04 },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, ease: 'brandInOut', duration: 1 }, 0)
        .fromTo('.statement__media', { scale: 1.4 }, { scale: 1.06, ease: 'none', duration: 1.6 }, 0)
        .fromTo('.statement__veil', { opacity: 0 }, { opacity: 1, ease: 'none', duration: 1 }, 0.25)
        .fromTo('.statement__line span',
          { yPercent: 120 },
          { yPercent: 0, ease: 'brand', duration: 0.55, stagger: 0.18 }, 0.45)
        .fromTo('.statement__foot', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.25)
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="statement" ref={root} aria-label="Where we begin">
      <div className="statement__stage">
        <div className="statement__frame">
          <div className="statement__media is-placeholder">
            <img src="assets/units/scene-plane.webp" alt="" />
            <video autoPlay muted loop playsInline preload="auto">
              <source src="assets/video/02-statement.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="statement__veil" aria-hidden="true" />
        </div>

        <div className="statement__copy shell">
          <h2 className="statement__title">
            {LINES.map((line) => (
              <span className="statement__line" key={line}><span>{line}</span></span>
            ))}
          </h2>
          <p className="statement__foot">Each phase prepares the one after it. The order is a condition, not a preference.</p>
        </div>
      </div>
    </section>
  )
}
