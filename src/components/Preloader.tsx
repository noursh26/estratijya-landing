import { useLayoutEffect, useRef } from 'react'
import { gsap, reduced } from '../lib/motion'

/** Opening sequence: a counted load, the mark drawing itself, then a staggered
 *  column curtain lifting away. Reference: fantasy.co / refokus openings. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return

    if (reduced()) {
      gsap.set(el, { autoAlpha: 0, pointerEvents: 'none' })
      onDone()
      return
    }

    const ctx = gsap.context(() => {
      const value = { n: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          onDone()
          gsap.set(el, { pointerEvents: 'none', visibility: 'hidden' })
        },
      })

      tl.from('.preloader__mark', { scale: 0.72, autoAlpha: 0, duration: 0.9, ease: 'brand' })
        .from('.preloader__word span', { yPercent: 115, duration: 0.8, ease: 'brand', stagger: 0.03 }, 0.15)
        .to(value, {
          n: 100,
          duration: 1.85,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(value.n)).padStart(3, '0')
          },
        }, 0.1)
        .to(bar.current, { scaleX: 1, duration: 1.85, ease: 'power2.inOut' }, 0.1)
        .to('.preloader__inner', { autoAlpha: 0, duration: 0.4, ease: 'brandInOut' }, '-=0.15')
        .to('.preloader__col', {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1.05,
          ease: 'brand',
          stagger: { each: 0.07, from: 'start' },
        }, '-=0.1')
    }, el)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__curtain">
        {Array.from({ length: 6 }, (_, i) => <span className="preloader__col" key={i} />)}
      </div>
      <div className="preloader__inner">
        <img className="preloader__mark" src="assets/brand/icon-only-green.png" alt="" />
        <p className="preloader__word">
          {'Strategy becomes movement.'.split('').map((c, i) => (
            <span key={i}>{c === ' ' ? ' ' : c}</span>
          ))}
        </p>
        <div className="preloader__meter">
          <span className="preloader__count" ref={count}>000</span>
          <span className="preloader__track"><span className="preloader__bar" ref={bar} /></span>
        </div>
      </div>
    </div>
  )
}
