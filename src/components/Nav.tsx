import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reduced } from '../lib/motion'
import { scrollTo } from '../lib/useLenis'
import { nav, contact } from '../content'

/** The header is deliberately almost nothing: the wordmark and one word. No
 *  ground, no blur, no rule, no counters — it floats over whatever is behind it
 *  and inverts to ink over the paper sections. Everything else lives in the
 *  overlay. */
export function Nav() {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const overlay = useRef<HTMLDivElement>(null)

  /* Invert over light grounds so two white marks never sit on paper.
     Measured live rather than through a ScrollTrigger start/end pair: the
     pinned sections change the document height after this mounts, and a cached
     trigger position would be reading the wrong part of the page. */
  useLayoutEffect(() => {
    const el = header.current
    if (!el) return
    const line = 46 // the header's own centre line
    const paper = gsap.utils.toArray<HTMLElement>('[data-ground="paper"]')
    if (!paper.length) return

    let ink = false
    const check = () => {
      const next = paper.some((section) => {
        const r = section.getBoundingClientRect()
        return r.top <= line && r.bottom >= line
      })
      if (next !== ink) { ink = next; el.classList.toggle('is-ink', next) }
    }

    const st = ScrollTrigger.create({ onUpdate: check, onRefresh: check })
    check()
    return () => st.kill()
  }, [])

  useLayoutEffect(() => {
    const el = overlay.current
    if (!el) return
    document.body.classList.toggle('is-locked', open)

    if (reduced()) { gsap.set(el, { autoAlpha: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }); return }

    const links = el.querySelectorAll('.menu__link span')
    const meta = el.querySelectorAll('.menu__meta > *')
    const tl = gsap.timeline()

    if (open) {
      gsap.set(el, { pointerEvents: 'auto' })
      tl.set(el, { autoAlpha: 1 })
        .fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.85, ease: 'brand' })
        .fromTo(links, { yPercent: 118 }, { yPercent: 0, duration: 0.9, ease: 'brand', stagger: 0.06 }, '-=0.5')
        .fromTo(meta, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'brand', stagger: 0.06 }, '-=0.5')
    } else {
      gsap.set(el, { pointerEvents: 'none' })
      tl.to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'brandInOut' })
        .set(el, { autoAlpha: 0 })
    }
    return () => { tl.kill() }
  }, [open])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    window.setTimeout(() => scrollTo(`#${id}`), open ? 420 : 0)
  }

  return (
    <>
      <header className="nav" ref={header}>
        <a className="nav__logo" href="#top" onClick={go('top')} aria-label="Estratijiya — home">
          <img className="nav__logo-light" src="/assets/brand/logo-white.png" alt="Estratijiya" />
          <img className="nav__logo-ink" src="/assets/brand/logo-dark.png" alt="" aria-hidden="true" />
        </a>

        <button
          className={`nav__menu ${open ? 'is-open' : ''}`}
          type="button"
          aria-expanded={open}
          aria-controls="menu-overlay"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <div className="menu" id="menu-overlay" ref={overlay}>
        <nav className="menu__nav" aria-label="Menu">
          {nav.map((item) => (
            <a className="menu__link" key={item.id} href={`#${item.id}`} onClick={go(item.id)} data-cursor="Go">
              <em>{item.no}</em>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="menu__meta">
          <div>
            <span className="kicker">Get in touch</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
          </div>
          <div>
            <span className="kicker">Visit</span>
            <p>Office 501<br />Dubai, United Arab Emirates</p>
          </div>
          <a className="btn btn--accent menu__cta" href="#invitation" onClick={go('invitation')}>
            <span>Start a conversation <i className="arrow">↗</i></span>
          </a>
        </div>
      </div>
    </>
  )
}
