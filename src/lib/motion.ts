import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { Observer } from 'gsap/Observer'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, Observer, Draggable, InertiaPlugin, CustomEase)

/* The brand's entrance curve, registered as a named ease so every section
   shares one feel. cubic-bezier(.16,1,.3,1) — from tokens/motion.css. */
CustomEase.create('brand', 'M0,0 C0.16,1 0.3,1 1,1')
CustomEase.create('brandInOut', 'M0,0 C0.4,0 0.2,1 1,1')

export { gsap, ScrollTrigger, SplitText, Observer, Draggable }

export const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const fine = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

/** Split a heading into lines, each line wrapped in an overflow-hidden mask,
 *  then rise the lines in on scroll. This is the site's signature reveal. */
export function maskLines(
  target: gsap.DOMTarget,
  opts: { trigger?: Element; start?: string; delay?: number; stagger?: number; play?: boolean } = {},
) {
  const el = gsap.utils.toArray<HTMLElement>(target)[0]
  if (!el) return
  if (reduced()) { gsap.set(el, { autoAlpha: 1 }); return }

  const split = new SplitText(el, {
    type: 'lines',
    linesClass: 'line',
    mask: 'lines',
    autoSplit: true,
    onSplit(self: SplitText) {
      return gsap.from(self.lines, {
        yPercent: 118,
        rotate: 1.4,
        duration: 1.15,
        ease: 'brand',
        stagger: opts.stagger ?? 0.085,
        delay: opts.delay ?? 0,
        scrollTrigger: opts.play
          ? undefined
          : { trigger: opts.trigger ?? el, start: opts.start ?? 'top 88%' },
      })
    },
  })
  return split
}

/** Per-character stagger — used for short display lines and the loader. */
export function maskChars(target: gsap.DOMTarget, opts: { delay?: number; stagger?: number } = {}) {
  const el = gsap.utils.toArray<HTMLElement>(target)[0]
  if (!el) return
  if (reduced()) { gsap.set(el, { autoAlpha: 1 }); return }
  const split = new SplitText(el, { type: 'chars,lines', mask: 'lines', linesClass: 'line' })
  gsap.from(split.chars, {
    yPercent: 120,
    duration: 0.9,
    ease: 'brand',
    stagger: opts.stagger ?? 0.022,
    delay: opts.delay ?? 0,
  })
  return split
}

/** Generic scroll-in: fade + short rise, brand travel distance. */
export function revealOnScroll(root: Element) {
  if (reduced()) return
  gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-reveal]')).forEach((el) => {
    const d = Number(el.dataset.revealDelay ?? 0)
    gsap.from(el, {
      y: 48,
      autoAlpha: 0,
      duration: 1.05,
      ease: 'brand',
      delay: d,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    })
  })
}

/** Magnetic pull toward the pointer — refokus-style precision on controls. */
export function magnetic(el: HTMLElement, strength = 0.34) {
  if (!fine() || reduced()) return () => {}
  const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]') ?? el
  const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
  const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
  const ixTo = gsap.quickTo(inner, 'x', { duration: 0.65, ease: 'power3' })
  const iyTo = gsap.quickTo(inner, 'y', { duration: 0.65, ease: 'power3' })

  const move = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    xTo(dx * strength); yTo(dy * strength)
    ixTo(dx * strength * 0.4); iyTo(dy * strength * 0.4)
  }
  const leave = () => { xTo(0); yTo(0); ixTo(0); iyTo(0) }

  el.addEventListener('pointermove', move)
  el.addEventListener('pointerleave', leave)
  return () => {
    el.removeEventListener('pointermove', move)
    el.removeEventListener('pointerleave', leave)
  }
}

/** Scroll-velocity readout — drives marquee speed and skew across the page. */
export function velocityTracker() {
  const state = { v: 0 }
  const st = ScrollTrigger.create({
    onUpdate: (self) => { state.v = self.getVelocity() },
  })
  return { state, kill: () => st.kill() }
}

export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
