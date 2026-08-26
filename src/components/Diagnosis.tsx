import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reduced, clamp } from '../lib/motion'
import { scrollTo } from '../lib/useLenis'
import { diagnosis } from '../content'

const PANELS = diagnosis.panels
const N = PANELS.length

/** Full-screen symptom panels. The stage pins; scrolling swaps a full-bleed
 *  photograph and the claim over it. Lines already shown leave upward, lines
 *  not yet shown wait below — so the deck reads the same in both directions
 *  with nothing but a class change. Reference: fantasy.co services. */
export function Diagnosis() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useLayoutEffect(() => {
    const el = root.current
    const box = stage.current
    if (!el || !box || reduced()) return

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${window.innerHeight * N}`,
        pin: box,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (N - 1),
          duration: { min: 0.2, max: 0.6 },
          delay: 0.04,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const idx = clamp(Math.round(self.progress * (N - 1)), 0, N - 1)
          if (idx !== activeRef.current) {
            activeRef.current = idx
            setActive(idx)
          }
        },
      })

      gsap.to('.dx__bar span', {
        scaleX: 1, transformOrigin: 'left', ease: 'none',
        scrollTrigger: {
          trigger: el, start: 'top top',
          end: () => `+=${window.innerHeight * N}`, scrub: 0.3,
        },
      })

      return () => st.kill()
    }, el)

    return () => ctx.revert()
  }, [])

  /** past / present / future — drives every layer with one class. */
  const state = (i: number) => (i === active ? 'is-on' : i < active ? 'is-past' : 'is-next')

  return (
    <section className="dx" id="diagnosis" ref={root}>
      <div className="dx__stage" ref={stage}>
        <div className="dx__media" aria-hidden="true">
          {PANELS.map((p, i) => (
            <figure className={`dx-shot ${state(i)}`} key={p.no}>
              <img src={p.image} alt="" decoding="async" />
            </figure>
          ))}
        </div>
        <div className="dx__scrim" aria-hidden="true" />

        <p className="dx__overline">
          <span className="numeral">{diagnosis.no}</span>
          <i aria-hidden="true" />
          <span className="kicker">{diagnosis.kicker}</span>
        </p>

        <div className="dx__titles">
          {PANELS.map((p, i) => (
            <div className={`dx-title ${state(i)}`} key={p.no} aria-hidden={i !== active}>
              <span className="dx-title__no"><span>{p.no}</span></span>
              {p.title.map((line, li) => (
                <span className="dx-title__line" key={line} style={{ '--i': li } as React.CSSProperties}>
                  <span>{line}</span>
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="dx__foot">
          <div className="dx__texts">
            {PANELS.map((p, i) => (
              <p className={`dx-text ${state(i)}`} key={p.no} aria-hidden={i !== active}>{p.text}</p>
            ))}
          </div>
          <button
            className="dx__cta"
            type="button"
            onClick={() => scrollTo(`#${diagnosis.ctaTarget}`)}
          >
            {diagnosis.cta} <i className="arrow" aria-hidden="true">→</i>
          </button>
        </div>

        <p className="dx__count" aria-hidden="true">
          <b>{PANELS[active].no}</b> / {String(N).padStart(2, '0')}
        </p>
        <div className="dx__bar" aria-hidden="true"><span /></div>
      </div>

      {/* Reduced motion: the same panels as a plain stack, swapped in CSS. */}
      <div className="dx__fallback">
        {PANELS.map((p) => (
          <article key={p.no}>
            <img src={p.image} alt="" decoding="async" />
            <div>
              <span className="numeral">{p.no}</span>
              <h3>{p.title.join(' ')}</h3>
              <p>{p.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
