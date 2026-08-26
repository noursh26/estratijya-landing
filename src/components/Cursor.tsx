import { useEffect, useRef } from 'react'
import { gsap, fine, reduced } from '../lib/motion'

/** Two-part cursor: a tight dot and a lagging ring that swells into a labelled
 *  disc over anything carrying data-cursor. Reference: fantasy.co / instrument. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!fine() || reduced()) return
    const d = dot.current, r = ring.current, l = label.current
    if (!d || !r || !l) return

    gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 0 })

    const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3' })
    const dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3' })
    const rx = gsap.quickTo(r, 'x', { duration: 0.5, ease: 'power3' })
    const ry = gsap.quickTo(r, 'y', { duration: 0.5, ease: 'power3' })

    let shown = false
    const move = (e: PointerEvent) => {
      if (!shown) { shown = true; gsap.to([d, r], { autoAlpha: 1, duration: 0.3 }) }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY)
    }

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement
      const hit = t.closest<HTMLElement>('[data-cursor]')
      const link = t.closest('a, button, input, [role="button"]')

      if (hit) {
        const text = hit.dataset.cursor ?? ''
        l.textContent = text
        r.dataset.state = text ? 'label' : 'grow'
      } else if (link) {
        l.textContent = ''
        r.dataset.state = 'link'
      } else {
        l.textContent = ''
        r.dataset.state = 'idle'
      }
      // Invert over paper grounds so the cursor never disappears.
      const light = t.closest('[data-ground="paper"]')
      r.classList.toggle('is-inverted', Boolean(light))
      d.classList.toggle('is-inverted', Boolean(light))
    }

    const leave = () => { shown = false; gsap.to([d, r], { autoAlpha: 0, duration: 0.2 }) }
    const down = () => gsap.to(r, { scale: 0.82, duration: 0.2, ease: 'power2.out' })
    const up = () => gsap.to(r, { scale: 1, duration: 0.35, ease: 'power2.out' })

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div className="cursor-ring" ref={ring} data-state="idle"><span ref={label} /></div>
      <div className="cursor-dot" ref={dot} />
    </div>
  )
}
