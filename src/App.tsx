import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, reduced } from './lib/motion'
import { useLenis } from './lib/useLenis'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Diagnosis } from './components/Diagnosis'
import { Method } from './components/Method'
import { Statement } from './components/Statement'
import { BuildDial } from './components/BuildDial'
import { WorkRail } from './components/WorkRail'
import { Principles } from './components/Principles'
import { Difference } from './components/Difference'
import { Invitation } from './components/Invitation'
import { Closing } from './components/Closing'

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)

  useLenis(entered)

  const onLoaded = useCallback(() => setEntered(true), [])

  // Scroll progress rail down the leading edge.
  useLayoutEffect(() => {
    if (!entered || reduced()) return
    const ctx = gsap.context(() => {
      gsap.to('.rail__fill', {
        scaleY: 1, transformOrigin: 'top', ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.25 },
      })
    })
    return () => ctx.revert()
  }, [entered])

  // Pinned sections change page height a lot; settle the measurements once
  // fonts and lazy images have landed.
  useEffect(() => {
    if (!entered) return
    const refresh = () => ScrollTrigger.refresh()
    const t = window.setTimeout(refresh, 400)
    document.fonts?.ready.then(refresh).catch(() => {})
    window.addEventListener('load', refresh)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('load', refresh)
    }
  }, [entered])

  return (
    <div className="site" ref={root}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Preloader onDone={onLoaded} />
      <Cursor />

      <div className="rail" aria-hidden="true"><span className="rail__fill" /></div>

      <Nav />

      <main id="main">
        <Hero start={entered} />
        <Marquee />
        <Diagnosis />
        <Method />
        <Statement />
        <BuildDial />
        <WorkRail />
        <Principles />
        <Difference />
        <Invitation />
        <Closing />
      </main>
    </div>
  )
}
