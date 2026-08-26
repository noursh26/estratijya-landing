import { useLayoutEffect, useRef } from 'react'
import { gsap, maskLines, revealOnScroll, reduced, fine } from '../lib/motion'
import { difference } from '../content'

/** A list of claims separated by hairlines — the design system's own pattern.
 *  On a fine pointer, the row under the cursor floats its photograph beside it. */
export function Difference() {
  const root = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return

    const ctx = gsap.context(() => {
      maskLines('.difference__title')
      revealOnScroll(el)
      if (reduced()) return

      gsap.utils.toArray<HTMLElement>('.difference-row').forEach((row) => {
        gsap.from(row.querySelector('.difference-row__rule'), {
          scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'brand',
          scrollTrigger: { trigger: row, start: 'top 90%' },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const el = root.current
    const box = preview.current
    if (!el || !box || !fine() || reduced()) return

    const frames = Array.from(box.querySelectorAll<HTMLElement>('.preview__frame'))
    const rows = Array.from(el.querySelectorAll<HTMLElement>('.difference-row'))

    gsap.set(box, { autoAlpha: 0, xPercent: -50, yPercent: -50 })
    const xTo = gsap.quickTo(box, 'x', { duration: 0.75, ease: 'power3' })
    const yTo = gsap.quickTo(box, 'y', { duration: 0.75, ease: 'power3' })
    const rTo = gsap.quickTo(box, 'rotate', { duration: 0.9, ease: 'power3' })

    let last = 0
    const move = (e: PointerEvent) => {
      xTo(e.clientX); yTo(e.clientY)
      rTo(gsap.utils.clamp(-9, 9, (e.clientX - last) * 0.32))
      last = e.clientX
    }

    const cleanups = rows.map((row, i) => {
      const enter = () => {
        gsap.to(box, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
        frames.forEach((f, j) => gsap.to(f, {
          autoAlpha: j === i ? 1 : 0, scale: j === i ? 1 : 1.08,
          duration: 0.55, ease: 'brand',
        }))
        row.classList.add('is-hot')
      }
      const leave = () => {
        gsap.to(box, { autoAlpha: 0, duration: 0.3 })
        row.classList.remove('is-hot')
      }
      row.addEventListener('pointerenter', enter)
      row.addEventListener('pointerleave', leave)
      return () => {
        row.removeEventListener('pointerenter', enter)
        row.removeEventListener('pointerleave', leave)
      }
    })

    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <section className="difference ground-paper" id="difference" data-ground="paper" ref={root}>
      <div className="shell difference__head">
        <div className="section-mark" data-reveal>
          <span className="numeral">{difference.no}</span>
          <span className="kicker kicker--ink">{difference.kicker}</span>
        </div>
        <h2 className="difference__title h2">{difference.title}</h2>
      </div>

      <div className="shell difference__rows">
        {difference.rows.map((row, i) => (
          <article className="difference-row" key={row.title}>
            <span className="difference-row__rule" aria-hidden="true" />
            <span className="difference-row__no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="difference-row__title">{row.title}</h3>
            <p className="difference-row__text">{row.text}</p>
            <img className="difference-row__thumb" src={row.image} alt="" decoding="async" />
            <i className="difference-row__arrow" aria-hidden="true">→</i>
          </article>
        ))}
      </div>

      <div className="preview" ref={preview} aria-hidden="true">
        {difference.rows.map((row) => (
          <div className="preview__frame" key={row.image + row.title}>
            <img src={row.image} alt="" decoding="async" />
            <span />
          </div>
        ))}
      </div>
    </section>
  )
}
