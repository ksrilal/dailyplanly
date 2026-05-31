'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { LayoutTemplate } from 'lucide-react'

// ─── Sample block data ────────────────────────────────────────────────────────

const SAMPLE_BLOCKS = [
  {
    label: "Today's Focus",
    delay: 0,
    width: 'half' as const,
    content: (
      <div className="p-3 flex flex-col gap-1.5">
        {[
          { dot: 'bg-red-400', text: "Ship new feature", w: '80%' },
          { dot: 'bg-amber-400', text: "Review pull requests", w: '65%' },
          { dot: 'bg-violet-400', text: "Update docs", w: '50%' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={cn('w-2 h-2 rounded-full flex-shrink-0', item.dot)} />
            <div className="h-1.5 rounded-full bg-current opacity-20 flex-shrink-0" style={{ width: item.w }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Daily Routine',
    delay: 0.25,
    width: 'half' as const,
    content: (
      <div className="p-3 flex flex-col gap-1">
        {['8:00', '9:30', '12:00', '2:00', '5:00'].map((t, i) => (
          <div key={i} className="flex items-center gap-2 border-b border-current/5 pb-1">
            <span className="text-[9px] opacity-25 font-mono w-8 flex-shrink-0">{t}</span>
            {i === 1 && <div className="h-1.5 rounded-full bg-[var(--planner-accent)] opacity-30 w-3/4" />}
            {i === 3 && <div className="h-1.5 rounded-full bg-[var(--planner-accent)] opacity-20 w-1/2" />}
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Habit Tracker',
    delay: 0.5,
    width: 'full' as const,
    content: (
      <div className="p-3">
        <div className="flex items-center gap-1 mb-2 ml-16">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flex-1 text-center text-[8px] opacity-20">
              {['M','T','W','T','F','S','S'][i]}
            </div>
          ))}
        </div>
        {['Exercise', 'Read', 'Meditate'].map((h, ri) => (
          <div key={h} className="flex items-center gap-1 mb-1.5">
            <span className="text-[9px] opacity-25 w-14 flex-shrink-0">{h}</span>
            {Array.from({ length: 7 }, (_, ci) => (
              <div
                key={ci}
                className={cn(
                  'flex-1 h-4 rounded-sm border border-current/10',
                  ri === 0 && ci < 5 ? 'bg-[var(--planner-accent)] opacity-30' :
                  ri === 1 && ci < 3 ? 'bg-[var(--planner-accent)] opacity-20' : 'opacity-5 bg-current'
                )}
              />
            ))}
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Notes',
    delay: 0.75,
    width: 'half' as const,
    content: (
      <div className="p-3 flex flex-col gap-2">
        {[1, 0.7, 0.85, 0.6].map((w, i) => (
          <div key={i} className="h-px w-full border-b border-current/10" style={{ marginBottom: '10px' }} />
        ))}
      </div>
    ),
  },
  {
    label: 'Weekly Goal',
    delay: 1.0,
    width: 'half' as const,
    content: (
      <div className="p-3 flex flex-col gap-2">
        <div className="h-1.5 rounded-full bg-current opacity-15 w-3/4" />
        {[true, true, false, false].map((done, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={cn('w-3.5 h-3.5 rounded-sm border flex-shrink-0 flex items-center justify-center',
              done ? 'bg-emerald-500 border-emerald-500' : 'border-current/20'
            )}>
              {done && <svg viewBox="0 0 10 10" className="w-2 h-2"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>}
            </div>
            <div className="h-1.5 rounded-full bg-current opacity-15" style={{ width: `${50 + i * 10}%` }} />
          </div>
        ))}
      </div>
    ),
  },
]

// ─── Animated block card ──────────────────────────────────────────────────────

function SampleBlock({ block, visible, theme }: {
  block: typeof SAMPLE_BLOCKS[0]
  visible: boolean
  theme: { bg: string; text: string; accent: string; border: string; surface: string }
}) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!visible) { setShown(false); return }
    const t = setTimeout(() => setShown(true), block.delay * 1000 + 200)
    return () => clearTimeout(t)
  }, [visible, block.delay])

  return (
    <div
      className={cn(
        'rounded-lg border transition-all duration-500',
        block.width === 'full' ? 'col-span-2' : 'col-span-1',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      )}
      style={{
        borderColor: theme.border,
        background: theme.surface,
        color: theme.text,
        '--planner-accent': theme.accent,
        '--planner-text': theme.text,
        '--planner-border': theme.border,
      } as React.CSSProperties}
    >
      {block.label && (
        <div className="px-3 pt-2.5 pb-0 text-[9px] font-bold uppercase tracking-widest opacity-30">
          {block.label}
        </div>
      )}
      {block.content}
    </div>
  )
}

// ─── Theme cycling ────────────────────────────────────────────────────────────

const THEMES = [
  { name: 'Minimal',       bg: '#ffffff', surface: '#fafafa', text: '#111111', accent: '#6366f1', border: '#e8e8e8' },
  { name: 'Soft Paper',    bg: '#faf7f2', surface: '#f5f0e8', text: '#2d2520', accent: '#8b5e3c', border: '#e0d8cc' },
  { name: 'Study Focus',   bg: '#f8f6ff', surface: '#f0ecff', text: '#1e1b4b', accent: '#6366f1', border: '#e0dcff' },
  { name: 'Wellness Calm', bg: '#f5fbf5', surface: '#eef8ee', text: '#1a2e1a', accent: '#4caf50', border: '#d4ebd4' },
]

// ─── Main component ───────────────────────────────────────────────────────────

export function PlannerPreviewAnimation() {
  const [visible, setVisible] = useState(false)
  const [themeIdx, setThemeIdx] = useState(0)
  const [switching, setSwitching] = useState(false)

  const theme = THEMES[themeIdx]

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  // Cycle through themes every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSwitching(true)
      setVisible(false)
      setTimeout(() => {
        setThemeIdx((i) => (i + 1) % THEMES.length)
        setSwitching(false)
      }, 400)
      setTimeout(() => setVisible(true), 600)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center transition-all duration-500 rounded-xl"
      style={{ background: theme.bg, color: theme.text }}
    >
      {/* Header */}
      <div className={cn('text-center mb-6 transition-all duration-500', visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2')}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
          style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: theme.text, opacity: 0.5 }}>
            {theme.name}
          </span>
        </div>
        <p className="text-xs font-medium opacity-40">
          Click a block from the left sidebar to start
        </p>
      </div>

      {/* Sample blocks grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-lg px-4">
        {SAMPLE_BLOCKS.map((block, i) => (
          <SampleBlock key={i} block={block} visible={visible} theme={theme} />
        ))}
      </div>

      {/* Theme indicator dots */}
      <div className={cn('flex gap-1.5 mt-6 transition-all duration-500', visible ? 'opacity-100' : 'opacity-0')}>
        {THEMES.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === themeIdx ? theme.accent : theme.border, transform: i === themeIdx ? 'scale(1.4)' : 'scale(1)' }}
          />
        ))}
      </div>

      {/* Instruction */}
      <div className={cn('mt-4 flex items-center gap-2 transition-all duration-700 delay-1000', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')}>
        <LayoutTemplate className="h-3.5 w-3.5" style={{ color: theme.accent, opacity: 0.7 }} strokeWidth={2} />
        <p className="text-[10px] font-medium" style={{ color: theme.text, opacity: 0.4 }}>
          Blocks auto-save as you build
        </p>
      </div>
    </div>
  )
}
