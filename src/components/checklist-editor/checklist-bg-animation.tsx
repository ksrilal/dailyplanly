'use client'

import { useEffect, useRef } from 'react'

interface Box {
  id: number
  x: number        // 0–1 within its side column
  y: number        // 0–1 of canvas height
  size: number     // px
  speed: number    // px/s drift down
  opacity: number
  phase: 'appearing' | 'marking' | 'fading'
  phaseTimer: number // seconds until next phase
  color: [number, number, number]  // rgb
  mark: 'none' | 'check' | 'cross'
  markProgress: number  // 0→1 drawing animation
  side: 'left' | 'right'
  fadeY: number    // y fraction at which fading starts
}

const COLORS: [number, number, number][] = [
  [255, 255, 255],  // white
  [74, 222, 128],   // green
  [248, 113, 113],  // red
]

const MARKS: Box['mark'][] = ['none', 'check', 'cross', 'check', 'none']

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function drawBox(ctx: CanvasRenderingContext2D, box: Box, col: { x: number; w: number }, H: number) {
  const cx = col.x + box.x * col.w
  const cy = box.y * H
  const s = box.size
  const [r, g, b] = box.color

  ctx.save()
  ctx.globalAlpha = box.opacity

  // Glow
  ctx.shadowColor = `rgba(${r},${g},${b},0.25)`
  ctx.shadowBlur = 5

  // Box border
  ctx.strokeStyle = `rgba(${r},${g},${b},0.5)`
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.roundRect(cx - s / 2, cy - s / 2, s, s, 3)
  ctx.stroke()

  // Draw mark animating in
  if (box.mark !== 'none' && box.markProgress > 0) {
    const p = Math.min(1, box.markProgress)
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.shadowBlur = 12

    if (box.mark === 'check') {
      ctx.strokeStyle = `rgba(74,222,128,${0.95 * p})`
      ctx.shadowColor = 'rgba(74,222,128,0.8)'
      // Draw checkmark progressively
      const pts = [
        [cx - s * 0.28, cy],
        [cx - s * 0.05, cy + s * 0.25],
        [cx + s * 0.30, cy - s * 0.25],
      ]
      const totalLen = 2 // 2 segments
      const drawn = p * totalLen
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      if (drawn <= 1) {
        const mid = lerp(0, 1, drawn)
        ctx.lineTo(lerp(pts[0][0], pts[1][0], mid), lerp(pts[0][1], pts[1][1], mid))
      } else {
        ctx.lineTo(pts[1][0], pts[1][1])
        const mid2 = lerp(0, 1, drawn - 1)
        ctx.lineTo(lerp(pts[1][0], pts[2][0], mid2), lerp(pts[1][1], pts[2][1], mid2))
      }
      ctx.stroke()
    } else {
      ctx.strokeStyle = `rgba(248,113,113,${0.95 * p})`
      ctx.shadowColor = 'rgba(248,113,113,0.8)'
      const inset = s * 0.28
      // X drawn progressively: first diagonal then second
      if (p <= 0.5) {
        const t = p * 2
        ctx.beginPath()
        ctx.moveTo(cx - inset, cy - inset)
        ctx.lineTo(lerp(cx - inset, cx + inset, t), lerp(cy - inset, cy + inset, t))
        ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.moveTo(cx - inset, cy - inset)
        ctx.lineTo(cx + inset, cy + inset)
        ctx.stroke()
        const t = (p - 0.5) * 2
        ctx.beginPath()
        ctx.moveTo(cx + inset, cy - inset)
        ctx.lineTo(lerp(cx + inset, cx - inset, t), lerp(cy - inset, cy + inset, t))
        ctx.stroke()
      }
    }
  }

  ctx.restore()
}

export function ChecklistBgAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const boxesRef = useRef<Box[]>([])
  const frameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const idRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx!.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let spawnTimer = 0
    const SPAWN_INTERVAL = 0.55

    function spawnBox(side: 'left' | 'right'): Box {
      const colorIdx = Math.floor(Math.random() * COLORS.length)
      const mark = MARKS[Math.floor(Math.random() * MARKS.length)]
      return {
        id: idRef.current++,
        x: 0.1 + Math.random() * 0.8,
        y: -0.05 - Math.random() * 0.1,
        size: 14 + Math.random() * 22,
        speed: 35 + Math.random() * 40,
        opacity: 0,
        phase: 'appearing',
        phaseTimer: 0.6 + Math.random() * 0.8,
        color: COLORS[colorIdx],
        mark,
        markProgress: 0,
        side,
        fadeY: 0.55 + Math.random() * 0.2,
      }
    }

    // Pre-seed
    for (let i = 0; i < 8; i++) {
      const side = i % 2 === 0 ? 'left' : 'right'
      const b = spawnBox(side)
      b.y = Math.random() * 0.7
      b.opacity = Math.random() * 0.18
      b.phase = 'marking'
      b.markProgress = Math.random()
      boxesRef.current.push(b)
    }

    function tick(timestamp: number) {
      if (!canvas || !ctx) return
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05)
      lastTimeRef.current = timestamp

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      const colW = W * 0.18  // side column width

      ctx.clearRect(0, 0, W, H)

      // Spawn
      spawnTimer += dt
      if (spawnTimer >= SPAWN_INTERVAL) {
        spawnTimer = 0
        boxesRef.current.push(spawnBox(Math.random() > 0.5 ? 'left' : 'right'))
      }

      const leftCol = { x: 0, w: colW }
      const rightCol = { x: W - colW, w: colW }

      boxesRef.current = boxesRef.current.filter((box) => {
        // Move down
        box.y += (box.speed / H) * dt

        // Phase transitions
        box.phaseTimer -= dt

        if (box.phase === 'appearing') {
          box.opacity = Math.min(0.3, box.opacity + dt * 0.8)
          if (box.phaseTimer <= 0) {
            box.phase = 'marking'
            box.phaseTimer = 1.0 + Math.random() * 1.5
          }
        } else if (box.phase === 'marking') {
          if (box.mark !== 'none') {
            box.markProgress = Math.min(1, box.markProgress + dt * 1.2)
          }
          if (box.phaseTimer <= 0) {
            box.phase = 'fading'
          }
        }

        // Fade near content area
        if (box.y > box.fadeY) {
          box.opacity -= dt * 1.4
        }

        const col = box.side === 'left' ? leftCol : rightCol
        if (box.opacity > 0.01) {
          drawBox(ctx, box, col, H)
          return true
        }
        return false
      })

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame((ts) => { lastTimeRef.current = ts; tick(ts) })

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.25 }}
      aria-hidden="true"
    />
  )
}
