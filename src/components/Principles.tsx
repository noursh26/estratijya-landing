import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, revealOnScroll, reduced } from '../lib/motion'
import { principles } from '../content'

/** Four claims, delivered one at a time. The line that owns the screen is lit;
 *  the others sit back. Then the values band runs the opposite way to the top
 *  marquee, so the page reads as a mechanism. */
export function Principles() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const ctx = gsap.context(() => {
      revealOnScroll(el)
      if (reduced()) return

      const lines = gsap.utils.toArray<HTMLElement>('.principle')
      lines.forEach((line) => {
        gsap.fromTo(line.querySelector('span'),
          { yPercent: 116, rotate: 1.5 },
          {
            yPercent: 0, rotate: 0, duration: 1.15, ease: 'brand',
            scrollTrigger: { trigger: line, start: 'top 86%' },
          })
        ScrollTrigger.create({
          trigger: line,
          start: 'top 68%',
          end: 'bottom 38%',
          toggleClass: { targets: line, className: 'is-lit' },
        })
      })

      gsap.to('.principles__watermark', {
        yPercent: -18, rotate: 4, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      const band = el.querySelector<HTMLElement>('.values__track')
      if (band) gsap.to(band, { xPercent: 50, duration: 30, ease: 'none', repeat: -1 })
    }, el)

    return () => ctx.revert()
  }, [])

  const values = [...principles.values, ...principles.values, ...principles.values]

  return (
    <section className="principles" data-ground="paper" id="principles" ref={root}>
      <img className="principles__watermark" src="assets/brand/icon-only-green.png" alt="" aria-hidden="true" />

      <div className="shell principles__inner">
        <div className="section-mark" data-reveal>
          <span className="numeral">{principles.no}</span>
          <span className="kicker">{principles.kicker}</span>
        </div>

        <div className="principles__lines">
          {principles.lines.map((line) => (
            <p className="principle" key={line}>
              <span>
                {line}
              </span>
            </p>
          ))}
        </div>
      </div>

      <div className="values" aria-label="Our values">
        <div className="values__track">
          {values.map((v, i) => <span key={`${v}-${i}`}>{v}<i aria-hidden="true">✦</i></span>)}
        </div>
      </div>
    </section>
  )
}
