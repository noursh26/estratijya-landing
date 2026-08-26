import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap, Draggable, maskLines, revealOnScroll, reduced, magnetic } from '../lib/motion'
import { invitation, contact } from '../content'

const PRIZES = invitation.prizes
const N = PRIZES.length
const SEG = 360 / N
const CX = 200, CY = 200, R = 188

/** Wedge path for a segment spanning [a0, a1] degrees, 0° at twelve o'clock. */
function wedge(a0: number, a1: number, r = R) {
  const pt = (a: number) => {
    const rad = (a - 90) * (Math.PI / 180)
    return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
  }
  const [x0, y0] = pt(a0)
  const [x1, y1] = pt(a1)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M ${CX} ${CY} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`
}

/** The closing move: turn the dial, and the session it stops on is ours to
 *  cover. Drag it with inertia, or press to turn. */
export function Invitation() {
  const root = useRef<HTMLElement>(null)
  const wheel = useRef<SVGGElement>(null)
  const spinBtn = useRef<HTMLButtonElement>(null)
  const rotation = useRef(0)
  const spinning = useRef(false)

  const [result, setResult] = useState<number | null>(null)
  const [turning, setTurning] = useState(false)

  const settle = useCallback((deg: number) => {
    rotation.current = deg
    const index = ((-Math.round(deg / SEG)) % N + N) % N
    setResult(index)
    setTurning(false)
    spinning.current = false
    gsap.fromTo('.invite__result',
      { autoAlpha: 0, y: 26, scale: 0.97 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: 'brand' })
    gsap.fromTo('.invite__pulse',
      { scale: 0.86, autoAlpha: 0.75 },
      { scale: 1.16, autoAlpha: 0, duration: 1.1, ease: 'brand' })
  }, [])

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      maskLines('.invite__title')
      revealOnScroll(el)

      if (!reduced()) {
        gsap.from('.invite__wheel', {
          scale: 0.86, autoAlpha: 0, rotate: -22, duration: 1.4, ease: 'brand',
          scrollTrigger: { trigger: '.invite__wheel', start: 'top 84%' },
        })
      }
    }, el)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (spinBtn.current) return magnetic(spinBtn.current, 0.3)
  }, [])

  /* Keep every legend upright. The rotor spins; the labels do not. */
  useLayoutEffect(() => {
    const g = wheel.current
    if (!g) return
    const labels = Array.from(g.querySelectorAll<SVGGElement>('.invite__label'))
    const pivotY = CY - R * 0.58
    let visible = true

    const level = () => {
      if (!visible) return
      const rot = (gsap.getProperty(g, 'rotation') as number) || 0
      labels.forEach((label) => {
        const a = Number(label.dataset.angle || 0)
        label.setAttribute('transform', `rotate(${-(a + rot)} ${CX} ${pivotY})`)
      })
    }

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; level() })
    io.observe(g)
    gsap.ticker.add(level)
    level()
    return () => { gsap.ticker.remove(level); io.disconnect() }
  }, [])

  // Drag to turn, with inertia, snapping to whole segments.
  useLayoutEffect(() => {
    const g = wheel.current
    if (!g || reduced()) return
    const [drag] = Draggable.create(g, {
      type: 'rotation',
      inertia: true,
      cursor: 'grab',
      activeCursor: 'grabbing',
      allowNativeTouchScrolling: false,
      snap: { rotation: (v: number) => Math.round(v / SEG) * SEG },
      onPress() { setResult(null); spinning.current = true; setTurning(true) },
      onThrowComplete() { settle(gsap.getProperty(g, 'rotation') as number) },
      onDragEnd() {
        // a slow release never throws, so land it manually
        if (!this.tween || !this.tween.isActive()) {
          settle(Math.round((gsap.getProperty(g, 'rotation') as number) / SEG) * SEG)
        }
      },
    })
    return () => { drag.kill() }
  }, [settle])

  const spin = () => {
    const g = wheel.current
    if (!g || spinning.current) return
    setResult(null)
    setTurning(true)
    spinning.current = true

    if (reduced()) {
      settle(rotation.current - SEG * (1 + Math.floor(Math.random() * N)))
      return
    }

    const landOn = Math.floor(Math.random() * N)
    const current = gsap.getProperty(g, 'rotation') as number
    const currentIndex = ((-Math.round(current / SEG)) % N + N) % N
    let delta = ((currentIndex - landOn) % N + N) % N
    const target = current - delta * SEG - 360 * (4 + Math.floor(Math.random() * 2))

    gsap.to(g, {
      rotation: target,
      duration: 5.4,
      ease: 'power4.out',
      onComplete: () => settle(target),
    })
  }

  const prize = result === null ? null : PRIZES[result]
  const mailto = prize
    ? `mailto:${contact.email}?subject=${encodeURIComponent(`Invitation — ${prize.label}`)}&body=${encodeURIComponent(`I turned the dial and it stopped on the ${prize.label}.\n\nCompany:\nWhat is not moving:\n`)}`
    : `mailto:${contact.email}`

  return (
    <section className="invite ground-ink" id="invitation" ref={root}>
      <div className="invite__glow" aria-hidden="true" />

      <div className="shell invite__grid">
        <div className="invite__copy">
          <div className="section-mark" data-reveal>
            <span className="numeral">{invitation.no}</span>
            <span className="kicker">{invitation.kicker}</span>
          </div>
          <h2 className="invite__title h2">{invitation.title}</h2>
          <p className="lede" data-reveal data-reveal-delay="0.08">{invitation.lede}</p>

          <div className="invite__result" role="status" aria-live="polite">
            {prize ? (
              <>
                <span className="kicker">Yours</span>
                <h3 className="h3">{prize.label}</h3>
                <p>{prize.detail}</p>
                <div className="invite__result-actions">
                  <a className="btn btn--accent" href={mailto}>
                    <span>{invitation.claim} <i className="arrow">↗</i></span>
                  </a>
                  <button className="invite__again" type="button" onClick={spin}>{invitation.again}</button>
                </div>
              </>
            ) : (
              <p className="invite__placeholder">{turning ? 'Turning…' : invitation.hint}</p>
            )}
          </div>
        </div>

        <div className="invite__wheel">
          <span className="invite__needle" aria-hidden="true" />
          <span className="invite__pulse" aria-hidden="true" />

          <svg viewBox="0 0 400 400" className="invite__svg" role="img" aria-label="A dial of six working sessions">
            <g ref={wheel} className="invite__rotor" style={{ transformOrigin: '200px 200px' }}>
              <circle cx={CX} cy={CY} r={R + 6} className="invite__rim" />
              {PRIZES.map((p, i) => {
                const a = i * SEG
                return (
                <g key={p.label} className={`invite__seg ${result === i ? 'is-won' : ''}`}>
                  <path d={wedge(a - SEG / 2, a + SEG / 2)} />
                  {/* Outer group carries the label to its segment; the inner one
                      is counter-rotated every frame so the legend stays level
                      however far the dial has turned. */}
                  <g transform={`rotate(${a} ${CX} ${CY})`}>
                    <g className="invite__label" data-angle={a}>
                      <text x={CX} y={CY - R * 0.58} textAnchor="middle">
                        {p.label.split(' ').map((word, wi) => (
                          <tspan x={CX} dy={wi === 0 ? 0 : 17} key={word}>{word}</tspan>
                        ))}
                      </text>
                    </g>
                  </g>
                  <circle
                    className="invite__pip"
                    cx={CX + (R - 14) * Math.cos((a - SEG / 2 - 90) * Math.PI / 180)}
                    cy={CY + (R - 14) * Math.sin((a - SEG / 2 - 90) * Math.PI / 180)}
                    r="2.5"
                  />
                </g>
                )
              })}
            </g>

            <circle cx={CX} cy={CY} r="46" className="invite__hub" />
          </svg>

          <img className="invite__mark" src="assets/brand/icon-only-green.png" alt="" aria-hidden="true" />

          <button
            className="invite__spin btn btn--accent"
            type="button"
            ref={spinBtn}
            onClick={spin}
            disabled={turning}
          >
            <span data-magnetic-inner>{turning ? 'Turning…' : 'Turn the dial'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
