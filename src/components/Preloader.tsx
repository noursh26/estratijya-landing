import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap, reduced } from '../lib/motion'
import { preloadAll } from '../lib/preload'

/** The door. It reports a real percentage of bytes pulled down and only opens
 *  once every asset is in the cache and the type has loaded — so nothing on the
 *  page ever appears mid-download. Reference: fantasy.co / refokus openings. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const shown = useRef(0)      // what the counter is currently displaying
  const target = useRef(0)     // what the download says it should be
  const finished = useRef(false)

  // Scroll stays locked while the door is shut.
  useLayoutEffect(() => {
    document.body.classList.add('is-loading')
    return () => document.body.classList.remove('is-loading')
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    let raf = 0
    let ctx: gsap.Context | undefined

    const open = () => {
      document.body.classList.remove('is-loading')
      if (reduced()) {
        gsap.set(el, { autoAlpha: 0, pointerEvents: 'none' })
        onDone()
        return
      }
      gsap.timeline({
        onComplete: () => {
          onDone()
          gsap.set(el, { pointerEvents: 'none', visibility: 'hidden' })
        },
      })
        .to('.preloader__inner', { autoAlpha: 0, duration: 0.4, ease: 'brandInOut' })
        .to('.preloader__col', {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1.05,
          ease: 'brand',
          stagger: { each: 0.07, from: 'start' },
        }, '-=0.1')
    }

    if (reduced()) {
      // no counted sequence, but still wait for the assets
      preloadAll(() => {}).then(open)
      return
    }

    ctx = gsap.context(() => {
      gsap.from('.preloader__mark', { scale: 0.72, autoAlpha: 0, duration: 0.9, ease: 'brand' })
      gsap.from('.preloader__word span', {
        yPercent: 115, duration: 0.8, ease: 'brand', stagger: 0.03, delay: 0.15,
      })
    }, el)

    /* The counter chases the real figure rather than jumping to it, so a burst
       of cached files still reads as a count rather than a flicker. */
    const chase = () => {
      raf = requestAnimationFrame(chase)
      shown.current += (target.current - shown.current) * 0.08
      if (target.current - shown.current < 0.0015) shown.current = target.current

      const pct = shown.current * 100
      if (count.current) count.current.textContent = String(Math.round(pct)).padStart(3, '0')
      if (bar.current) bar.current.style.transform = `scaleX(${shown.current.toFixed(4)})`

      if (finished.current && shown.current > 0.999) {
        cancelAnimationFrame(raf)
        open()
      }
    }
    raf = requestAnimationFrame(chase)

    preloadAll((f) => { target.current = f }).then(() => {
      target.current = 1
      finished.current = true
    })

    return () => {
      cancelAnimationFrame(raf)
      ctx?.revert()
    }
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
            <span key={i}>{c === ' ' ? ' ' : c}</span>
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
