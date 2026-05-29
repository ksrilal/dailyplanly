'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

// ─── Sample data ──────────────────────────────────────────────────────────────

const SIMPLE_ITEMS = [
  { text: 'Morning workout', status: 'checked' as const, delay: 0 },
  { text: 'Review weekly goals', status: 'checked' as const, delay: 0.4 },
  { text: 'Read for 30 minutes', status: 'unchecked' as const, delay: 0.8 },
  { text: 'Drink 8 glasses of water', status: 'unchecked' as const, delay: 1.2 },
  { text: 'Plan tomorrow\'s tasks', status: 'invalid' as const, delay: 1.6 },
  { text: 'Evening journal', status: 'unchecked' as const, delay: 2.0 },
]

const ADVANCED_ITEMS = [
  { text: 'Project Planning', depth: 0, status: 'checked' as const, delay: 0 },
  { text: 'Define scope', depth: 1, status: 'checked' as const, delay: 0.3 },
  { text: 'Set milestones', depth: 1, status: 'checked' as const, delay: 0.5 },
  { text: 'Design Phase', depth: 0, status: 'unchecked' as const, delay: 0.8 },
  { text: 'Wireframes', depth: 1, status: 'checked' as const, delay: 1.1 },
  { text: 'Visual mockups', depth: 1, status: 'unchecked' as const, delay: 1.4 },
  { text: 'Review with team', depth: 2, status: 'invalid' as const, delay: 1.7 },
  { text: 'Development', depth: 0, status: 'unchecked' as const, delay: 2.1 },
  { text: 'Frontend', depth: 1, status: 'unchecked' as const, delay: 2.4 },
  { text: 'Backend', depth: 1, status: 'unchecked' as const, delay: 2.7 },
]

// ─── Checkbox component ───────────────────────────────────────────────────────

function AnimatedCheckbox({ status, visible, delay }: {
  status: 'checked' | 'unchecked' | 'invalid'
  visible: boolean
  delay: number
}) {
  const [marked, setMarked] = useState(false)

  useEffect(() => {
    if (!visible) { setMarked(false); return }
    const t = setTimeout(() => setMarked(true), delay * 1000 + 400)
    return () => clearTimeout(t)
  }, [visible, delay])

  return (
    <div className={cn(
      'w-4 h-4 rounded-sm border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300',
      status === 'unchecked' && 'border-[var(--border)]',
      status === 'checked' && (marked ? 'border-emerald-500 bg-emerald-500' : 'border-[var(--border)]'),
      status === 'invalid' && (marked ? 'border-red-400 bg-red-400/15' : 'border-[var(--border)]'),
    )}>
      {marked && status === 'checked' && (
        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 animate-in zoom-in-50 duration-200">
          <polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {marked && status === 'invalid' && (
        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 animate-in zoom-in-50 duration-200">
          <line x1="2" y1="2" x2="8" y2="8" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="8" y1="2" x2="2" y2="8" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}

// ─── Simple preview ───────────────────────────────────────────────────────────

function SimplePreview({ visible }: { visible: boolean }) {
  const total = SIMPLE_ITEMS.length
  const checked = SIMPLE_ITEMS.filter(i => i.status === 'checked').length
  const pct = Math.round((checked / total) * 100)

  return (
    <div className="flex flex-col gap-0 w-full max-w-sm">
      {/* Progress */}
      <div className={cn('flex items-center gap-3 mb-4 transition-all duration-500', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')}>
        <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-out"
            style={{ width: visible ? `${pct}%` : '0%' }}
          />
        </div>
        <span className="text-xs text-[var(--text-muted)] tabular-nums">{checked}/{total}</span>
        <span className="text-xs font-bold text-emerald-500 w-8 text-right">{pct}%</span>
      </div>

      {/* Items */}
      {SIMPLE_ITEMS.map((item, i) => (
        <div
          key={i}
          className={cn(
            'flex items-center gap-3 py-2.5 border-b border-[var(--border)]/40 transition-all duration-400',
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          )}
          style={{ transitionDelay: visible ? `${item.delay * 1000}ms` : '0ms' }}
        >
          <AnimatedCheckbox status={item.status} visible={visible} delay={item.delay} />
          <span className={cn(
            'text-sm transition-colors duration-300',
            item.status === 'checked' ? 'text-[var(--text-faint)] line-through' : 'text-[var(--text-primary)]',
            item.status === 'invalid' ? 'text-red-400/70 line-through' : '',
          )}>
            {item.text}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Advanced preview ─────────────────────────────────────────────────────────

function AdvancedPreview({ visible }: { visible: boolean }) {
  // A leaf is an item whose immediate next sibling/item doesn't go deeper than it.
  // In a sequential flat depth array: item i is a leaf if the item at i+1
  // has depth <= item[i].depth (or i is the last item).
  const leafItems = ADVANCED_ITEMS.filter((item, idx) => {
    const next = ADVANCED_ITEMS[idx + 1]
    return !next || next.depth <= item.depth
  })
  const checked = leafItems.filter(i => i.status === 'checked').length
  const total = leafItems.length
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0

  return (
    <div className="flex flex-col gap-0 w-full max-w-sm">
      {/* Progress */}
      <div className={cn('flex items-center gap-3 mb-4 transition-all duration-500', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2')}>
        <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
          <div className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-out" style={{ width: visible ? `${pct}%` : '0%' }} />
        </div>
        <span className="text-xs text-[var(--text-muted)] tabular-nums">{checked}/{total}</span>
        <span className="text-xs font-bold text-emerald-500 w-8 text-right">{pct}%</span>
      </div>

      {/* Items */}
      {ADVANCED_ITEMS.map((item, i) => (
        <div
          key={i}
          className={cn(
            'flex items-center gap-2 py-2 border-b border-[var(--border)]/30 transition-all duration-400',
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          )}
          style={{
            paddingLeft: `${8 + item.depth * 20}px`,
            transitionDelay: visible ? `${item.delay * 1000}ms` : '0ms',
          }}
        >
          {/* Indent guide line */}
          {item.depth > 0 && (
            <div className="flex-shrink-0" style={{ width: 0 }}>
              <div
                className={cn('absolute border-l border-[var(--border)]/30 transition-all duration-500', visible ? 'opacity-100' : 'opacity-0')}
                style={{ height: '100%', left: `${8 + (item.depth - 1) * 20 + 8}px` }}
              />
            </div>
          )}
          <AnimatedCheckbox status={item.status} visible={visible} delay={item.delay} />
          <span className={cn(
            'text-sm transition-colors duration-300',
            item.depth === 0 ? 'font-medium' : 'font-normal',
            item.status === 'checked' ? 'text-[var(--text-faint)] line-through' : 'text-[var(--text-primary)]',
            item.status === 'invalid' ? 'text-red-400/70 line-through' : '',
          )}>
            {item.text}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ChecklistPreviewAnimation({ mode }: { mode: 'simple' | 'advanced' }) {
  const [visible, setVisible] = useState(false)
  const [currentMode, setCurrentMode] = useState(mode)
  const [switching, setSwitching] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (mode === currentMode) return
    // Fade out, switch, fade in
    setSwitching(true)
    setVisible(false)
    const t1 = setTimeout(() => {
      setCurrentMode(mode)
      setSwitching(false)
    }, 350)
    const t2 = setTimeout(() => setVisible(true), 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [mode])

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[400px]">
      {/* Mode label */}
      <div className={cn(
        'mb-6 text-center transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      )}>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-faint)] mb-1">
          {currentMode === 'simple' ? 'Simple Checklist' : 'Advanced Checklist'}
        </p>
        <p className="text-xs text-[var(--text-faint)]/60">
          {currentMode === 'simple' ? 'Flat task list with progress tracking' : 'Nested hierarchy with sub-tasks'}
        </p>
      </div>

      {/* Preview */}
      <div className={cn('transition-all duration-300', visible ? 'opacity-100' : 'opacity-0')}>
        {currentMode === 'simple'
          ? <SimplePreview visible={visible} />
          : <AdvancedPreview visible={visible} />
        }
      </div>

      {/* CTA hint */}
      <div className={cn(
        'mt-8 text-center transition-all duration-500 delay-1000',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      )}>
        <p className="text-xs text-[var(--text-faint)]">Click <strong className="text-[var(--text-muted)]">+ Add item</strong> below to start your checklist</p>
      </div>
    </div>
  )
}
