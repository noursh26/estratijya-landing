import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, maskLines, revealOnScroll, reduced } from '../lib/motion'
import { work } from '../content'

/** Scroll down, the work moves sideways. The section pins and the track
 *  translates on X for the length of the pin. */
export function WorkRail() {
  const root = useRef<HTMLElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    const view = viewport.current
    const rail = track.current
    if (!el || !view || !rail) return

    const ctx = gsap.context(() => {
      maskLines('.work__title')
      revealOnScroll(el)
      if (reduced()) return

      const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth + window.innerWidth * 0.06)

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: view,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // each card settles as it crosses the middle of the screen
      gsap.utils.toArray<HTMLElement>('.work-card').forEach((card) => {
        gsap.fromTo(card,
          { yPercent: 5, scale: 0.96 },
          {
            yPercent: 0, scale: 1, ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left 92%',
              end: 'center 55%',
              scrub: true,
            },
          })
        // the photograph drifts inside its own frame as the card passes
        const shot = card.querySelector('.work-card__shot img')
        if (shot) {
          gsap.fromTo(shot, { xPercent: -6 }, {
            xPercent: 6, ease: 'none',
            scrollTrigger: {
              trigger: card, containerAnimation: tween,
              start: 'left right', end: 'right left', scrub: true,
            },
          })
        }
      })

      gsap.to('.work__progress span', {
        scaleX: 1, transformOrigin: 'left', ease: 'none',
        scrollTrigger: {
          trigger: view, start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.4}`, scrub: 0.3,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="work ground-dark" id="work" ref={root}>
      <div className="work__viewport" ref={viewport}>
        <header className="work__head shell">
          <div className="section-mark" data-reveal>
            <span className="numeral">{work.no}</span>
            <span className="kicker">{work.kicker}</span>
          </div>
          <h2 className="work__title h2">{work.title}</h2>
          <p className="work__lede" data-reveal data-reveal-delay="0.08">{work.lede}</p>
        </header>

        <div className="work__track" ref={track}>
          {work.items.map((item) => (
            <article className="work-card" key={item.no}>
              <div className="work-card__shot">
                <img src={item.image} alt="" loading="lazy" decoding="async" />
                <span className="work-card__tint" aria-hidden="true" />
                <span className="work-card__no" aria-hidden="true">{item.no}</span>
              </div>
              <div className="work-card__body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
          <article className="work-card work-card--close">
            <p>{work.close}</p>
          </article>
        </div>

        <p className="work__hint" aria-hidden="true">Scroll — the work moves sideways<i /></p>
        <div className="work__progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  )
}
