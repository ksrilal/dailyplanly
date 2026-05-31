'use client'

/**
 * PlannerPreview — stateless, read-only rendering of planner blocks.
 * Mirrors what the planner editor canvas shows. No DnD, no Zustand, no registry.
 * Safe to use in template detail pages, thumbnails, and anywhere a static preview is needed.
 */

import { getThemeStyle, THEME_MAP } from '@/features/planner/theme-tokens'
import type { PlannerTheme } from '@/features/storage/types'

const VALID_THEMES = new Set(Object.keys(THEME_MAP))
function safeTheme(t: string): PlannerTheme {
  return VALID_THEMES.has(t) ? (t as PlannerTheme) : 'minimal'
}

type RawContent = Record<string, unknown>
type RawBlock = {
  id: string
  type: string
  label?: string
  order: number
  width?: string
  content: RawContent
}

// ─── Individual block renderers ───────────────────────────────────────────────

function BlockLabel({ label }: { label?: string }) {
  if (!label) return null
  return (
    <div className="px-3 pt-2.5 pb-0 text-[9px] font-semibold uppercase tracking-widest"
      style={{ color: 'var(--planner-text-muted)' }}>
      {label}
    </div>
  )
}

function NotesBlock({ c }: { c: RawContent }) {
  const lines = Math.min(Number(c.lines) || 6, 8)
  return (
    <div className="px-3 py-2.5 flex flex-col gap-[10px]">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="w-full h-px" style={{ background: 'var(--planner-border)' }} />
      ))}
    </div>
  )
}

function FocusBlock({ c }: { c: RawContent }) {
  const items = (c.items as { label: string; priority: string }[]) ?? []
  const colors: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#6366f1' }
  return (
    <div className="px-3 py-2 flex flex-col gap-[5px]">
      {items.slice(0, 6).map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: colors[item.priority] ?? '#888' }} />
          <span className="text-[10px] leading-tight truncate" style={{ color: 'var(--planner-text)' }}>
            {item.label || 'Focus item'}
          </span>
        </div>
      ))}
    </div>
  )
}

function RoutineBlock({ c }: { c: RawContent }) {
  const slots = (c.slots as { time: string; label: string }[]) ?? []
  return (
    <div className="px-3 py-2 flex flex-col">
      {slots.slice(0, 8).map((s, i) => (
        <div key={i} className="flex items-center gap-3 py-[4px]"
          style={{ borderBottom: `1px solid var(--planner-border)` }}>
          <span className="w-12 shrink-0 font-mono text-[9px]" style={{ color: 'var(--planner-text-muted)' }}>{s.time}</span>
          <span className="text-[10px] truncate" style={{ color: 'var(--planner-text)' }}>{s.label || '—'}</span>
        </div>
      ))}
    </div>
  )
}

function GoalBlock({ c }: { c: RawContent }) {
  const milestones = (c.milestones as { label: string; done: boolean }[]) ?? []
  const done = milestones.filter((m) => m.done).length
  return (
    <div className="px-3 py-2.5">
      {!!c.goal && (
        <p className="text-[10px] font-semibold mb-2 leading-snug" style={{ color: 'var(--planner-text)' }}>
          {String(c.goal)}
        </p>
      )}
      <div className="flex flex-col gap-[4px]">
        {milestones.slice(0, 5).map((m, i) => (
          <div key={i} className="flex items-center gap-2 text-[9.5px]">
            <span style={{ color: m.done ? 'var(--planner-accent)' : 'var(--planner-border)', fontSize: 11 }}>
              {m.done ? '☑' : '☐'}
            </span>
            <span style={{
              color: 'var(--planner-text)',
              opacity: m.done ? 0.45 : 1,
              textDecoration: m.done ? 'line-through' : 'none',
            }}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
      {milestones.length > 0 && (
        <p className="text-[8px] mt-1.5" style={{ color: 'var(--planner-text-muted)' }}>
          {done}/{milestones.length} complete
        </p>
      )}
    </div>
  )
}

function HabitTrackerBlock({ c }: { c: RawContent }) {
  const habits = (c.habits as { label: string }[]) ?? []
  const days = Math.min(Number(c.days) || 7, 14)
  return (
    <div className="px-3 py-2 overflow-hidden">
      {/* Day number header */}
      <div className="flex mb-1">
        <div className="w-20 shrink-0" />
        {Array.from({ length: Math.min(days, 10) }, (_, i) => (
          <div key={i} className="flex-1 text-center text-[7.5px]" style={{ color: 'var(--planner-text-muted)' }}>
            {i + 1}
          </div>
        ))}
      </div>
      {habits.slice(0, 5).map((h, i) => (
        <div key={i} className="flex items-center mb-[3px]">
          <span className="w-20 shrink-0 text-[9px] truncate pr-1" style={{ color: 'var(--planner-text)' }}>
            {h.label}
          </span>
          {Array.from({ length: Math.min(days, 10) }, (_, j) => (
            <div key={j} className="flex-1 flex justify-center">
              <div className="w-4 h-4 rounded-[2px]" style={{ border: '1px solid var(--planner-border)' }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function TimelineBlock({ c }: { c: RawContent }) {
  const events = (c.events as { label: string; date: string }[]) ?? []
  return (
    <div className="px-3 py-2 flex flex-col gap-2 relative">
      <div className="absolute left-[22px] top-3 bottom-3 w-px" style={{ background: 'var(--planner-border)' }} />
      {events.slice(0, 6).map((e, i) => (
        <div key={i} className="flex items-start gap-2.5 pl-3 relative">
          <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5 absolute left-[-1px]"
            style={{ background: 'var(--planner-accent)', border: '2px solid var(--planner-bg)' }} />
          <div className="pl-2">
            <p className="text-[10px] font-medium leading-tight" style={{ color: 'var(--planner-text)' }}>{e.label}</p>
            {e.date && <p className="text-[8.5px]" style={{ color: 'var(--planner-text-muted)' }}>{e.date}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function TableBlock({ c }: { c: RawContent }) {
  const headers = (c.headers as string[]) ?? []
  const rows = (c.rows as string[][]) ?? []
  const maxCols = Math.min(headers.length, 4)
  return (
    <div className="px-2 py-2 overflow-hidden">
      <table className="w-full" style={{ borderCollapse: 'collapse', fontSize: '9px' }}>
        <thead>
          <tr>
            {headers.slice(0, maxCols).map((h, i) => (
              <th key={i} className="text-left px-1.5 py-1 font-semibold truncate"
                style={{ color: 'var(--planner-text-muted)', borderBottom: '1.5px solid var(--planner-border)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 5).map((row, i) => (
            <tr key={i}>
              {row.slice(0, maxCols).map((cell, j) => (
                <td key={j} className="px-1.5 py-1 truncate max-w-[80px]"
                  style={{ color: 'var(--planner-text)', borderBottom: '1px solid var(--planner-border)', opacity: 0.85 }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DashboardCardBlock({ c }: { c: RawContent }) {
  return (
    <div className="px-3 py-3 text-center">
      <div className="text-[9px] mb-1" style={{ color: 'var(--planner-text-muted)' }}>{String(c.title ?? '')}</div>
      <div className="text-2xl font-bold leading-none" style={{ color: 'var(--planner-accent)' }}>
        {String(c.value ?? '—')}
        {!!c.unit && <span className="text-sm font-normal ml-1" style={{ color: 'var(--planner-text-muted)' }}>{String(c.unit)}</span>}
      </div>
      {!!c.note && <div className="text-[8px] mt-1" style={{ color: 'var(--planner-text-muted)' }}>{String(c.note)}</div>}
    </div>
  )
}

function CalendarBlock({ c }: { c: RawContent }) {
  const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const now = new Date()
  const year = Number(c.year) || now.getFullYear()
  const month = (Number(c.month) || now.getMonth() + 1) - 1
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="px-3 py-2">
      <p className="text-[10px] font-semibold text-center mb-2" style={{ color: 'var(--planner-text)' }}>
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-px">
        {DAYS.map((d, i) => (
          <div key={i} className="text-center text-[7.5px] pb-1 font-semibold" style={{ color: 'var(--planner-text-muted)' }}>{d}</div>
        ))}
        {cells.map((d, i) => (
          <div key={i} className="text-center text-[8px] py-[2px]"
            style={{ color: 'var(--planner-text)', border: '0.5px solid var(--planner-border)', borderRadius: 2 }}>
            {d ?? ''}
          </div>
        ))}
      </div>
    </div>
  )
}

function SpacerBlock({ c }: { c: RawContent }) {
  return <div style={{ height: Math.min(Number(c.height) || 24, 40) }} />
}

// ─── Block wrapper ────────────────────────────────────────────────────────────

function Block({ block }: { block: RawBlock }) {
  const c = block.content
  let body: React.ReactNode

  switch (block.type) {
    case 'notes':         body = <NotesBlock c={c} />; break
    case 'focus':         body = <FocusBlock c={c} />; break
    case 'routine':       body = <RoutineBlock c={c} />; break
    case 'goal':          body = <GoalBlock c={c} />; break
    case 'habit-tracker': body = <HabitTrackerBlock c={c} />; break
    case 'timeline':      body = <TimelineBlock c={c} />; break
    case 'table':         body = <TableBlock c={c} />; break
    case 'dashboard-card':body = <DashboardCardBlock c={c} />; break
    case 'calendar':      body = <CalendarBlock c={c} />; break
    case 'spacer':        body = <SpacerBlock c={c} />; break
    default:              body = null
  }

  if (!body) return null

  const isHalf = block.width === 'half'

  return (
    <div
      className={isHalf ? 'col-span-1' : 'col-span-2'}
      style={{
        borderRadius: 'var(--planner-radius, 6px)',
        border: '1px solid var(--planner-border)',
        background: 'var(--planner-surface)',
        overflow: 'hidden',
      }}
    >
      <BlockLabel label={block.label} />
      {body}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface PlannerPreviewProps {
  blocks: RawBlock[]
  theme?: string
  className?: string
}

export function PlannerPreview({ blocks, theme = 'minimal', className }: PlannerPreviewProps) {
  const resolvedTheme = safeTheme(theme)
  const themeStyle = getThemeStyle(resolvedTheme)
  const sorted = [...blocks].sort((a, b) => a.order - b.order)

  return (
    <div
      className={className}
      style={{
        ...(themeStyle as React.CSSProperties),
        backgroundColor: (themeStyle as Record<string, string>)['--planner-bg'],
        fontFamily: (themeStyle as Record<string, string>)['--planner-font-body'],
        padding: '12px',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {sorted.length === 0 ? (
        <div className="flex items-center justify-center h-full opacity-30 text-sm">No blocks yet</div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {sorted.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </div>
      )}
    </div>
  )
}
