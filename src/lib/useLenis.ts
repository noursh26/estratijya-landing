import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reduced } from './motion'

let lenisInstance: Lenis | null = null

export const getLenis = () => lenisInstance

/** One smooth-scroll engine for the whole page, driven off the GSAP ticker so
 *  ScrollTrigger and Lenis never fight over the frame. */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled || reduced()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3.4),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.6,
    })
    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}

export function scrollTo(target: string) {
  const el = document.querySelector(target)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.5 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
