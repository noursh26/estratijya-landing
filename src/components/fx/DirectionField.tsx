import { useEffect, useRef } from 'react'
import { lerp, reduced } from '../../lib/motion'

/** A field of hairline ticks that all turn to face the pointer — on touch, the
 *  last touch point; at rest, a slow travelling wave. The interaction is the
 *  brand argument made literal: everything points the same way once there is a
 *  direction to point at. */
export function DirectionField({ density = 46 }: { density?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvas.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    const slow = reduced()
    let w = 0, h = 0, dpr = 1
    let cols = 0, rows = 0, gap = 0
    let raf = 0, t = 0

    // pointer target + the eased value the ticks actually follow
    const target = { x: 0.62, y: 0.4, active: 0 }
    const eased = { x: 0.62, y: 0.4, active: 0 }
    const angles: number[] = []

    const resize = () => {
      const rect = cv.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width; h = rect.height
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      gap = Math.max(w, h) / density
      cols = Math.ceil(w / gap) + 1
      rows = Math.ceil(h / gap) + 1
      angles.length = cols * rows
      angles.fill(0)
    }

    const point = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = (e.clientY - r.top) / r.height
      target.active = 1
    }
    const away = () => { target.active = 0 }

    const draw = () => {
      raf = requestAnimationFrame(draw)
      t += slow ? 0.0015 : 0.006

      eased.x = lerp(eased.x, target.x, 0.075)
      eased.y = lerp(eased.y, target.y, 0.075)
      eased.active = lerp(eased.active, target.active, 0.06)

      ctx.clearRect(0, 0, w, h)
      const px = eased.x * w, py = eased.y * h
      const reach = Math.max(w, h) * 0.62
      const len = gap * 0.3

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const x = c * gap, y = r * gap
          const dx = px - x, dy = py - y
          const dist = Math.hypot(dx, dy)

          // rest state: a slow diagonal wave; active state: face the pointer
          const wave = Math.sin(x * 0.006 + y * 0.004 + t) * 0.9 - 0.4
          const toward = Math.atan2(dy, dx)
          const pull = eased.active * Math.max(0, 1 - dist / reach) ** 0.8

          // shortest-path interpolation so ticks never spin the long way round
          let delta = toward - wave
          delta = Math.atan2(Math.sin(delta), Math.cos(delta))
          const want = wave + delta * pull

          const i = r * cols + c
          let d2 = want - angles[i]
          d2 = Math.atan2(Math.sin(d2), Math.cos(d2))
          angles[i] += d2 * 0.16

          const a = angles[i]
          const near = 1 - Math.min(dist / (reach * 0.7), 1)
          const alpha = 0.1 + near * 0.5 * eased.active
          const grow = 1 + near * 0.7 * eased.active

          ctx.strokeStyle = `rgba(100,216,147,${alpha.toFixed(3)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(x - Math.cos(a) * len * grow, y - Math.sin(a) * len * grow)
          ctx.lineTo(x + Math.cos(a) * len * grow, y + Math.sin(a) * len * grow)
          ctx.stroke()
        }
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    window.addEventListener('pointermove', point, { passive: true })
    window.addEventListener('pointerdown', point, { passive: true })
    window.addEventListener('pointerleave', away)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', point)
      window.removeEventListener('pointerdown', point)
      window.removeEventListener('pointerleave', away)
    }
  }, [density])

  return <canvas className="direction-field" ref={canvas} aria-hidden="true" />
}
