import { useLayoutEffect, useRef } from 'react'
import { gsap, reduced, fine } from '../lib/motion'
import { scrollTo } from '../lib/useLenis'
import { DirectionField } from './fx/DirectionField'
import { hero } from '../content'

/** Three lines and a film. Nothing else carries its weight at this size, so
 *  nothing else is here. */
export function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el || !start) return
    if (reduced()) return

    const ctx = gsap.context(() => {
      // ── entrance ──────────────────────────────────────────────────────────
      gsap.timeline({ defaults: { ease: 'brand' } })
        .from('.hero__line span', { yPercent: 118, duration: 1.35, stagger: 0.11 })
        .from('.hero__cue', { autoAlpha: 0, y: 26, duration: 0.9 }, 0.7)
        .from('.direction-field', { autoAlpha: 0, duration: 1.6 }, 0.2)

      // ── exit: the hero sinks and dims as the next ground rises over it ────
      gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
        .to('.hero__media', { scale: 1.14, yPercent: 12, ease: 'none' }, 0)
        .to('.hero__content', { yPercent: -22, autoAlpha: 0.15, ease: 'none' }, 0)
        .to('.hero__veil', { opacity: 1, ease: 'none' }, 0)

      // ── pointer: the display type drifts a few pixels with the cursor ─────
      if (fine()) {
        const xTo = gsap.quickTo('.hero__title', 'x', { duration: 1.1, ease: 'power3' })
        const yTo = gsap.quickTo('.hero__title', 'y', { duration: 1.1, ease: 'power3' })
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          xTo(nx * -26); yTo(ny * -14)
        }
        window.addEventListener('pointermove', move, { passive: true })
        return () => window.removeEventListener('pointermove', move)
      }
    }, el)

    return () => ctx.revert()
  }, [start])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__media is-placeholder" aria-hidden="true">
        <img src="/assets/generated/hero-path.webp" alt="" />
        <video autoPlay muted loop playsInline preload="metadata">
          <source src="/assets/video/01-hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <DirectionField />
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__content shell">
        <h1 className="hero__title display display--xl">
          {hero.lines.map((line, i) => (
            <span className="hero__line" key={line}>
              <span className={i === hero.lines.length - 1 ? 'is-accent' : undefined}>{line}</span>
            </span>
          ))}
        </h1>
      </div>

      <button
        className="hero__cue"
        type="button"
        onClick={() => scrollTo('#diagnosis')}
        aria-label="Scroll to the diagnosis"
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle className="cue-base" cx="50" cy="50" r="48" />
          <circle className="cue-draw" cx="50" cy="50" r="48" />
          <path d="M50 34 v32 M40 56 l10 10 10-10" />
        </svg>
      </button>
    </section>
  )
}
