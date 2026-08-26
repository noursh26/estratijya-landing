import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reduced, clamp } from '../lib/motion'
import { marquee } from '../content'

/** A band that runs on its own, then reads scroll velocity: faster and skewed
 *  while you move, settling the moment you stop. Reference: refokus / fantik. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || reduced()) return

    const ctx = gsap.context(() => {
      const track = el.querySelector<HTMLElement>('.marquee__track')
      if (!track) return

      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 26,
        ease: 'none',
        repeat: -1,
      })

      const skewTo = gsap.quickTo(el, 'skewX', { duration: 0.6, ease: 'power3' })

      // Scroll writes a velocity; one ticker decays it back to rest. Never spawn
      // a tween per scroll frame.
      let vel = 0
      let dir = 1
      const settle = () => {
        vel *= 0.9
        if (Math.abs(vel) < 0.5) vel = 0
        loop.timeScale(clamp(1 + Math.abs(vel) / 900, 1, 5.5) * dir)
        skewTo(clamp(vel / -420, -7, 7))
      }
      gsap.ticker.add(settle)

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          vel = self.getVelocity()
          dir = vel < 0 ? -1 : 1
        },
      })

      return () => { gsap.ticker.remove(settle); st.kill() }
    }, el)

    return () => ctx.revert()
  }, [])

  const line = [...marquee, ...marquee]

  return (
    <div className="marquee" ref={root} aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((pass) => (
          <div className="marquee__group" key={pass}>
            {line.map((text, i) => (
              <span key={`${pass}-${i}`}>
                {text}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
