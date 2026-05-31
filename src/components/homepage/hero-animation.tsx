'use client'

import { useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FloatingCard {
  x: number       // 0–1 (relative to canvas)
  y: number
  w: number       // px
  h: number
  opacity: number
  targetOpacity: number
  speed: number   // very slow drift
  driftX: number  // horizontal drift per second (fraction)
  lines: number   // number of ruled lines inside
  hasProgress: boolean
  progressW: number  // 0–1
  phase: number   // animation phase offset
}

interface GridFragment {
  x: number
  y: number
  cols: number
  rows: number
  cellSize: number
  opacity: number
  speed: number
  phase: number
}

interface RuledLine {
  x: number
  y: number
  w: number       // fraction of canvas width
  opacity: number
  speed: number
  phase: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// Safe zone: center column — elements avoid this area
function inSafeZone(x: number, canvasW: number): boolean {
  const left = canvasW * 0.22
  const right = canvasW * 0.78
  return x > left && x < right
}

// ─── Draw functions ───────────────────────────────────────────────────────────

function drawCard(
  ctx: CanvasRenderingContext2D,
  card: FloatingCard,
  canvasW: number,
  canvasH: number,
  t: number
) {
  const cx = card.x * canvasW
  const cy = card.y * canvasH
  const { w, h, lines, hasProgress, progressW } = card

  ctx.save()
  ctx.globalAlpha = card.opacity

  // Card background — subtle fill
  ctx.fillStyle = 'rgba(255,255,255,0.04)'
  ctx.beginPath()
  ctx.roundRect(cx, cy, w, h, 8)
  ctx.fill()

  // Card border — visible warm white
  ctx.strokeStyle = 'rgba(255,255,255,0.28)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.roundRect(cx, cy, w, h, 8)
  ctx.stroke()

  // Inner ruled lines
  const lineSpacing = (h - 24) / Math.max(lines, 1)
  const lineStartY = cy + 18
  for (let i = 0; i < lines; i++) {
    const ly = lineStartY + i * lineSpacing
    const lineW = (i === 0 ? 0.72 : i % 3 === 0 ? 0.52 : i % 2 === 0 ? 0.62 : 0.44) * (w - 16)
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(cx + 10, ly)
    ctx.lineTo(cx + 10 + lineW, ly)
    ctx.stroke()
  }

  // Progress bar
  if (hasProgress) {
    const barY = cy + h - 12
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(cx + 10, barY)
    ctx.lineTo(cx + w - 10, barY)
    ctx.stroke()
    ctx.strokeStyle = 'rgba(167,139,250,0.7)'
    ctx.beginPath()
    ctx.moveTo(cx + 10, barY)
    ctx.lineTo(cx + 10 + progressW * (w - 20), barY)
    ctx.stroke()
  }

  // Top indicator dot
  ctx.fillStyle = 'rgba(167,139,250,0.7)'
  ctx.beginPath()
  ctx.arc(cx + 12, cy + 9, 3, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function drawGridFragment(
  ctx: CanvasRenderingContext2D,
  g: GridFragment,
  canvasW: number,
  canvasH: number
) {
  const ox = g.x * canvasW
  const oy = g.y * canvasH

  ctx.save()
  ctx.globalAlpha = g.opacity
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'
  ctx.lineWidth = 0.75

  for (let c = 0; c <= g.cols; c++) {
    const x = ox + c * g.cellSize
    ctx.beginPath()
    ctx.moveTo(x, oy)
    ctx.lineTo(x, oy + g.rows * g.cellSize)
    ctx.stroke()
  }
  for (let r = 0; r <= g.rows; r++) {
    const y = oy + r * g.cellSize
    ctx.beginPath()
    ctx.moveTo(ox, y)
    ctx.lineTo(ox + g.cols * g.cellSize, y)
    ctx.stroke()
  }

  ctx.restore()
}

function drawRuledLine(
  ctx: CanvasRenderingContext2D,
  rl: RuledLine,
  canvasW: number,
  canvasH: number
) {
  const x = rl.x * canvasW
  const y = rl.y * canvasH
  const lineW = rl.w * canvasW

  ctx.save()
  ctx.globalAlpha = rl.opacity

  // Main line
  ctx.strokeStyle = 'rgba(255,255,255,0.22)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + lineW, y)
  ctx.stroke()

  // Short tick on the left — like a margin line
  ctx.strokeStyle = 'rgba(167,139,250,0.55)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(x, y - 4)
  ctx.lineTo(x, y + 4)
  ctx.stroke()

  ctx.restore()
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  // Static scene — created once, drifts very slowly
  const cardsRef = useRef<FloatingCard[]>([])
  const gridsRef = useRef<GridFragment[]>([])
  const ruledRef = useRef<RuledLine[]>([])

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

    // ── Seed elements — placed deliberately in left/right zones ──────────────

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight

    // Cards — clearly visible planner-page outlines
    cardsRef.current = [
      // Left side
      { x: 0.02, y: 0.04, w: 140, h: 95,  opacity: 0, targetOpacity: 0.85, speed: 0.006, driftX: 0.003,  lines: 4, hasProgress: true,  progressW: 0.6,  phase: 0 },
      { x: 0.05, y: 0.50, w: 115, h: 80,  opacity: 0, targetOpacity: 0.7,  speed: 0.005, driftX: -0.002, lines: 3, hasProgress: false, progressW: 0,    phase: 1.2 },
      { x: 0.00, y: 0.76, w: 150, h: 65,  opacity: 0, targetOpacity: 0.65, speed: 0.004, driftX: 0.002,  lines: 2, hasProgress: true,  progressW: 0.35, phase: 2.4 },
      { x: 0.09, y: 0.28, w: 100, h: 82,  opacity: 0, targetOpacity: 0.6,  speed: 0.007, driftX: 0.001,  lines: 3, hasProgress: false, progressW: 0,    phase: 0.8 },
      // Right side
      { x: 0.80, y: 0.08, w: 145, h: 90,  opacity: 0, targetOpacity: 0.8,  speed: 0.005, driftX: -0.003, lines: 4, hasProgress: true,  progressW: 0.75, phase: 1.8 },
      { x: 0.76, y: 0.44, w: 120, h: 72,  opacity: 0, targetOpacity: 0.7,  speed: 0.006, driftX: 0.002,  lines: 3, hasProgress: false, progressW: 0,    phase: 3.0 },
      { x: 0.82, y: 0.70, w: 130, h: 85,  opacity: 0, targetOpacity: 0.65, speed: 0.004, driftX: -0.001, lines: 4, hasProgress: true,  progressW: 0.5,  phase: 0.5 },
      { x: 0.73, y: 0.22, w: 105, h: 65,  opacity: 0, targetOpacity: 0.6,  speed: 0.007, driftX: 0.002,  lines: 2, hasProgress: false, progressW: 0,    phase: 2.1 },
    ]

    // Grid fragments — clearly visible notebook grid pieces in corners
    gridsRef.current = [
      { x: 0.0,  y: 0.0,  cols: 6, rows: 5, cellSize: 20, opacity: 0, speed: 0.004, phase: 0 },
      { x: 0.0,  y: 0.68, cols: 5, rows: 4, cellSize: 22, opacity: 0, speed: 0.003, phase: 1.5 },
      { x: 0.80, y: 0.0,  cols: 6, rows: 5, cellSize: 20, opacity: 0, speed: 0.004, phase: 0.7 },
      { x: 0.81, y: 0.70, cols: 5, rows: 4, cellSize: 22, opacity: 0, speed: 0.003, phase: 2.2 },
    ]

    // Ruled lines — clearly visible horizontal planner lines
    ruledRef.current = [
      { x: 0.02, y: 0.20, w: 0.18, opacity: 0, speed: 0.004, phase: 0.3 },
      { x: 0.02, y: 0.38, w: 0.15, opacity: 0, speed: 0.003, phase: 1.1 },
      { x: 0.02, y: 0.56, w: 0.20, opacity: 0, speed: 0.005, phase: 2.0 },
      { x: 0.02, y: 0.74, w: 0.16, opacity: 0, speed: 0.004, phase: 0.8 },
      { x: 0.79, y: 0.22, w: 0.18, opacity: 0, speed: 0.003, phase: 1.6 },
      { x: 0.79, y: 0.40, w: 0.16, opacity: 0, speed: 0.004, phase: 0.4 },
      { x: 0.79, y: 0.60, w: 0.18, opacity: 0, speed: 0.005, phase: 2.5 },
      { x: 0.79, y: 0.78, w: 0.17, opacity: 0, speed: 0.003, phase: 1.3 },
    ]

    // ── Render loop ───────────────────────────────────────────────────────────

    function draw(timestamp: number) {
      if (!canvas || !ctx) return
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const t = (timestamp - startTimeRef.current) / 1000  // elapsed seconds

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight

      ctx.clearRect(0, 0, W, H)

      // Ambient radial gradient — stronger glow at edges
      const ambientGrad = ctx.createRadialGradient(W * 0.1, H * 0.2, 0, W * 0.1, H * 0.2, W * 0.6)
      ambientGrad.addColorStop(0, 'rgba(100,70,180,0.18)')
      ambientGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = ambientGrad
      ctx.fillRect(0, 0, W, H)

      const ambientGrad2 = ctx.createRadialGradient(W * 0.9, H * 0.25, 0, W * 0.9, H * 0.25, W * 0.55)
      ambientGrad2.addColorStop(0, 'rgba(80,60,160,0.15)')
      ambientGrad2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = ambientGrad2
      ctx.fillRect(0, 0, W, H)

      // Grid fragments
      for (const g of gridsRef.current) {
        const pulse = Math.sin(t * g.speed + g.phase) * 0.04
        g.opacity = lerp(g.opacity, 0.65 + pulse, 0.01)
        drawGridFragment(ctx, g, W, H)
      }

      // Ruled lines
      for (const rl of ruledRef.current) {
        const pulse = Math.sin(t * rl.speed * 2 + rl.phase) * 0.06
        rl.opacity = lerp(rl.opacity, 0.8 + pulse, 0.008)
        drawRuledLine(ctx, rl, W, H)
      }

      // Cards
      for (const card of cardsRef.current) {
        const pulse = Math.sin(t * card.speed + card.phase) * 0.06
        card.opacity = lerp(card.opacity, card.targetOpacity + pulse, 0.006)

        // Extremely slow drift — almost imperceptible
        card.y -= card.speed * 0.008
        card.x += card.driftX * 0.004

        // Wrap at edges
        if (card.y < -0.18) card.y = 1.05
        if (card.x < -0.15) card.x = 0.95
        if (card.x > 1.1) card.x = -0.1

        drawCard(ctx, card, W, H, t)
      }

      // Vignette — softer, so side elements stay visible
      const vigW = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, W * 0.9)
      vigW.addColorStop(0, 'rgba(0,0,0,0)')
      vigW.addColorStop(1, 'rgba(0,0,0,0.2)')
      ctx.fillStyle = vigW
      ctx.fillRect(0, 0, W, H)

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
