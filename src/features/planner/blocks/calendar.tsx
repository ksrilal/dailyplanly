'use client'

import React from 'react'
import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Select } from '@/components/ui/select'
import type { CalendarContent } from '@/features/storage/types'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = (firstDay + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = Array(startOffset).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function CalendarEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as CalendarContent
  const now = new Date()
  const year = content.year ?? now.getFullYear()
  const month = content.month ? content.month - 1 : now.getMonth()

  return (
    <div className="flex flex-col gap-3">
      <Select
        label="Month"
        value={String(month + 1)}
        options={MONTHS.map((m, i) => ({ value: String(i + 1), label: m }))}
        onChange={(e) => onChange({ ...content, month: Number(e.target.value) })}
      />
      <Select
        label="Year"
        value={String(year)}
        options={Array.from({ length: 5 }, (_, i) => ({ value: String(now.getFullYear() + i - 1), label: String(now.getFullYear() + i - 1) }))}
        onChange={(e) => onChange({ ...content, year: Number(e.target.value) })}
      />
    </div>
  )
}

function CalendarPreview({ block }: BlockPreviewProps) {
  const content = block.content as CalendarContent
  // Use a stable reference — avoid new Date() during SSR to prevent hydration mismatch
  const [today, setToday] = React.useState<Date | null>(null)
  React.useEffect(() => { setToday(new Date()) }, [])

  const fallback = new Date(2026, 4, 1) // stable SSR fallback
  const now = today ?? fallback
  const year = content.year ?? now.getFullYear()
  const month = content.month ? content.month - 1 : now.getMonth()
  const cells = getMonthGrid(year, month)

  return (
    <div className="p-3">
      <p className="text-xs font-medium mb-2 text-center" style={{ color: 'var(--planner-text)' }}>
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-0.5">
        {DAYS.map((d, i) => (
          <div key={i} className="text-center text-xs font-medium" style={{ color: 'var(--planner-text-muted)' }}>{d}</div>
        ))}
        {cells.map((day, i) => (
          <div key={i} className="text-center text-xs py-0.5" style={{
            color: today && day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
              ? 'var(--planner-accent)'
              : 'var(--planner-text)',
            fontWeight: today && day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? 700 : 400,
          }}>
            {day ?? ''}
          </div>
        ))}
      </div>
    </div>
  )
}

function CalendarPrint({ block }: { block: import('@/features/storage/types').PlannerBlock }) {
  const content = block.content as CalendarContent
  const now = new Date()
  const year = content.year ?? now.getFullYear()
  const month = content.month ? content.month - 1 : now.getMonth()
  const cells = getMonthGrid(year, month)

  return (
    <div style={{ padding: '8pt' }}>
      <p style={{ textAlign: 'center', fontWeight: 600, marginBottom: '6pt' }}>{MONTHS[month]} {year}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
        <thead>
          <tr>{DAYS.map((d) => <th key={d} style={{ textAlign: 'center', color: '#888', padding: '2pt' }}>{d}</th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: cells.length / 7 }, (_, row) => (
            <tr key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((day, col) => (
                <td key={col} style={{ textAlign: 'center', padding: '4pt', border: '0.5pt solid #eee' }}>
                  {day ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

BlockRegistry.register({
  type: 'calendar',
  label: 'Calendar',
  icon: 'CalendarDays',
  defaultContent: { showWeekNumbers: false, highlightToday: true } satisfies CalendarContent,
  EditorComponent: CalendarEditor,
  PreviewComponent: CalendarPreview,
  PrintComponent: CalendarPrint,
})

export {}
