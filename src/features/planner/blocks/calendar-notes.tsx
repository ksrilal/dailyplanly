'use client'

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Select } from '@/components/ui/select'
import { generateId } from '@/lib/utils'
import type { CalendarNotesContent, CalendarNote, PlannerBlock } from '@/features/storage/types'

// ─── Shared constants ─────────────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS_SHORT = ['Mo','Tu','We','Th','Fr','Sa','Su']

const NOTE_COLORS: CalendarNote['color'][] = ['yellow','pink','blue','green','purple','orange']

const NOTE_PALETTE: Record<CalendarNote['color'], { bg: string; text: string; border: string }> = {
  yellow:  { bg: '#fef9c3', text: '#713f12', border: '#fde047' },
  pink:    { bg: '#fce7f3', text: '#831843', border: '#f9a8d4' },
  blue:    { bg: '#dbeafe', text: '#1e3a8a', border: '#93c5fd' },
  green:   { bg: '#dcfce7', text: '#14532d', border: '#86efac' },
  purple:  { bg: '#ede9fe', text: '#4c1d95', border: '#c4b5fd' },
  orange:  { bg: '#ffedd5', text: '#7c2d12', border: '#fdba74' },
}

// Dark-mode aware preview palette (uses opacity on dark bg)
const NOTE_PREVIEW: Record<CalendarNote['color'], { bg: string; accent: string }> = {
  yellow:  { bg: 'rgba(253,224,71,0.18)',  accent: '#fde047' },
  pink:    { bg: 'rgba(249,168,212,0.18)', accent: '#f9a8d4' },
  blue:    { bg: 'rgba(147,197,253,0.18)', accent: '#93c5fd' },
  green:   { bg: 'rgba(134,239,172,0.18)', accent: '#86efac' },
  purple:  { bg: 'rgba(196,181,253,0.18)', accent: '#c4b5fd' },
  orange:  { bg: 'rgba(253,186,116,0.18)', accent: '#fdba74' },
}

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = (firstDay + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = Array(startOffset).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

// ─── Sticky note chip ─────────────────────────────────────────────────────────

function NoteChip({
  note, onRemove, onColorChange,
}: { note: CalendarNote; onRemove: () => void; onColorChange: (c: CalendarNote['color']) => void }) {
  const [showColors, setShowColors] = useState(false)
  const pal = NOTE_PALETTE[note.color]

  return (
    <div
      className="relative group/note flex items-start gap-1 px-2 py-1 rounded-lg shadow-sm text-xs leading-snug cursor-default transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{ backgroundColor: pal.bg, color: pal.text, borderLeft: `3px solid ${pal.border}` }}
    >
      <span className="flex-1 min-w-0 break-words whitespace-pre-wrap">{note.text || '…'}</span>
      <div className="flex-shrink-0 flex gap-0.5 opacity-0 group-hover/note:opacity-100 transition-opacity">
        {/* Color picker toggle */}
        <button
          onClick={() => setShowColors(!showColors)}
          className="w-3.5 h-3.5 rounded-full border border-current/30 flex-shrink-0"
          style={{ background: pal.border }}
          title="Change color"
        />
        <button onClick={onRemove} title="Remove note" className="opacity-60 hover:opacity-100">
          <X className="h-3 w-3" />
        </button>
      </div>
      {/* Color picker popover */}
      {showColors && (
        <div
          className="absolute top-full left-0 z-50 mt-1 flex gap-1 p-1.5 rounded-lg bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)] border border-[var(--border)]"
          onMouseLeave={() => setShowColors(false)}
        >
          {NOTE_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => { onColorChange(c); setShowColors(false) }}
              className="w-4 h-4 rounded-full border-2 hover:scale-110 transition-transform"
              style={{ background: NOTE_PALETTE[c].border, borderColor: note.color === c ? '#111' : 'transparent' }}
              title={c}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Editor ───────────────────────────────────────────────────────────────────

function CalendarNotesEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as CalendarNotesContent
  const now = new Date()
  const year = content.year ?? now.getFullYear()
  const month = content.month ? content.month - 1 : now.getMonth()
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [draftText, setDraftText] = useState('')
  const [draftColor, setDraftColor] = useState<CalendarNote['color']>('yellow')

  const cells = getMonthGrid(year, month)
  const notes = content.notes ?? {}

  function addNote() {
    if (!selectedDay || !draftText.trim()) return
    const dayNotes = notes[selectedDay] ?? []
    const newNote: CalendarNote = { id: generateId(), text: draftText.trim(), color: draftColor }
    onChange({ ...content, notes: { ...notes, [selectedDay]: [...dayNotes, newNote] } })
    setDraftText('')
  }

  function removeNote(day: number, id: string) {
    const updated = (notes[day] ?? []).filter((n) => n.id !== id)
    const newNotes = { ...notes }
    if (updated.length === 0) delete newNotes[day]
    else newNotes[day] = updated
    onChange({ ...content, notes: newNotes })
  }

  function changeNoteColor(day: number, id: string, color: CalendarNote['color']) {
    onChange({
      ...content,
      notes: { ...notes, [day]: (notes[day] ?? []).map((n) => n.id === id ? { ...n, color } : n) },
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Month / Year */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Select
            label="Month"
            value={String(month + 1)}
            options={MONTHS.map((m, i) => ({ value: String(i + 1), label: m }))}
            onChange={(e) => onChange({ ...content, month: Number(e.target.value) })}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Year"
            value={String(year)}
            options={Array.from({ length: 5 }, (_, i) => ({
              value: String(now.getFullYear() + i - 1),
              label: String(now.getFullYear() + i - 1),
            }))}
            onChange={(e) => onChange({ ...content, year: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Mini calendar day picker */}
      <div>
        <p className="text-xs font-medium text-[var(--text-secondary)] mb-1.5">
          Click a day to add notes · <span className="text-[var(--text-faint)]">{MONTHS[month]} {year}</span>
        </p>
        <div className="grid grid-cols-7 gap-px text-xs">
          {DAYS_SHORT.map((d) => (
            <div key={d} className="text-center text-[10px] text-[var(--text-faint)] font-medium py-0.5">{d}</div>
          ))}
          {cells.map((day, i) => {
            const hasNotes = day !== null && (notes[day]?.length ?? 0) > 0
            const isSelected = day === selectedDay
            return (
              <button
                key={i}
                onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}
                disabled={!day}
                className={[
                  'aspect-square flex flex-col items-center justify-center rounded text-[11px] font-medium transition-all relative',
                  !day && 'invisible',
                  day && isSelected && 'bg-[var(--color-accent)] text-white shadow-sm',
                  day && !isSelected && 'hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]',
                ].filter(Boolean).join(' ')}
              >
                {day}
                {hasNotes && !isSelected && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Add note panel */}
      {selectedDay && (
        <div className="flex flex-col gap-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
          <p className="text-xs font-semibold text-[var(--text-secondary)]">
            Notes for {MONTHS[month]} {selectedDay}
          </p>

          {/* Existing notes */}
          {(notes[selectedDay] ?? []).length > 0 && (
            <div className="flex flex-col gap-1.5">
              {(notes[selectedDay] ?? []).map((note) => (
                <NoteChip
                  key={note.id}
                  note={note}
                  onRemove={() => removeNote(selectedDay, note.id)}
                  onColorChange={(c) => changeNoteColor(selectedDay, note.id, c)}
                />
              ))}
            </div>
          )}

          {/* Add new note */}
          <div className="flex gap-2 items-end">
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote() } }}
              placeholder="Add a note… (Enter to save)"
              rows={2}
              className="flex-1 text-xs bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-2.5 py-1.5 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--text-primary)] placeholder:text-[var(--text-faint)]"
            />
            <div className="flex flex-col gap-1.5">
              {/* Color swatches */}
              <div className="flex gap-1">
                {NOTE_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setDraftColor(c)}
                    className="w-4 h-4 rounded-full border-2 hover:scale-110 transition-transform"
                    style={{ background: NOTE_PALETTE[c].border, borderColor: draftColor === c ? '#111' : 'transparent' }}
                  />
                ))}
              </div>
              <button
                onClick={addNote}
                disabled={!draftText.trim()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--color-accent)] text-white text-xs font-semibold disabled:opacity-40 hover:bg-violet-700 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Preview ──────────────────────────────────────────────────────────────────

function CalendarNotesPreview({ block }: BlockPreviewProps) {
  const content = block.content as CalendarNotesContent
  const [today, setToday] = React.useState<Date | null>(null)
  React.useEffect(() => { setToday(new Date()) }, [])

  const fallback = new Date(2026, 4, 1)
  const now = today ?? fallback
  const year = content.year ?? now.getFullYear()
  const month = content.month ? content.month - 1 : now.getMonth()
  const cells = getMonthGrid(year, month)
  const notes = content.notes ?? {}

  return (
    <div className="p-2.5">
      <p className="text-[10px] font-semibold mb-2 text-center tracking-wide" style={{ color: 'var(--planner-text-muted)' }}>
        {MONTHS[month]} {year}
      </p>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-px mb-0.5">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="text-center text-[9px] font-medium" style={{ color: 'var(--planner-text-muted)' }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid — each cell taller to fit sticky notes */}
      <div className="grid grid-cols-7 gap-px">
        {cells.map((day, i) => {
          const dayNotes = day ? (notes[day] ?? []) : []
          const isToday = today && day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

          return (
            <div
              key={i}
              className="flex flex-col rounded-sm overflow-hidden"
              style={{ background: day ? 'var(--planner-surface)' : 'transparent', border: day ? '0.5px solid var(--planner-border)' : 'none' }}
            >
              {day && (
                <>
                  {/* Day number */}
                  <div
                    className="text-center text-[9px] py-0.5 font-medium"
                    style={{
                      color: isToday ? 'var(--planner-accent)' : 'var(--planner-text)',
                      background: isToday ? 'var(--planner-accent)15' : 'transparent',
                      fontWeight: isToday ? 700 : 400,
                    }}
                  >
                    {day}
                  </div>
                  {/* Notes — show ALL, no truncation, cell grows with content */}
                  {dayNotes.map((note) => {
                    const pal = NOTE_PREVIEW[note.color]
                    return (
                      <div
                        key={note.id}
                        className="mx-0.5 mb-0.5 px-1 rounded text-[7px] leading-snug break-words"
                        style={{ background: pal.bg, color: 'var(--planner-text)', borderLeft: `2px solid ${pal.accent}` }}
                      >
                        {note.text}
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Print ────────────────────────────────────────────────────────────────────

function CalendarNotesPrint({ block }: { block: PlannerBlock }) {
  const content = block.content as CalendarNotesContent
  const now = new Date()
  const year = content.year ?? now.getFullYear()
  const month = content.month ? content.month - 1 : now.getMonth()
  const cells = getMonthGrid(year, month)
  const notes = content.notes ?? {}

  const printPalette: Record<CalendarNote['color'], string> = {
    yellow: '#fef08a', pink: '#fbcfe8', blue: '#bfdbfe',
    green: '#bbf7d0', purple: '#ddd6fe', orange: '#fed7aa',
  }

  return (
    <div style={{ padding: '8pt' }}>
      <p style={{ textAlign: 'center', fontWeight: 700, fontSize: '11pt', marginBottom: '6pt' }}>
        {MONTHS[month]} {year}
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            {DAYS_SHORT.map((d) => (
              <th key={d} style={{ textAlign: 'center', fontSize: '7pt', color: '#888', padding: '2pt', borderBottom: '1pt solid #eee' }}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: cells.length / 7 }, (_, row) => (
            <tr key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
                const dayNotes = day ? (notes[day] ?? []) : []
                return (
                  <td key={col} style={{ border: '0.5pt solid #e5e7eb', verticalAlign: 'top', padding: '2pt', minHeight: '40pt' }}>
                    {day && (
                      <>
                        <div style={{ fontSize: '8pt', fontWeight: 600, marginBottom: '2pt', color: '#374151' }}>{day}</div>
                        {dayNotes.map((note) => (
                          <div key={note.id} style={{
                            fontSize: '6.5pt', lineHeight: 1.3, padding: '1.5pt 3pt',
                            marginBottom: '1.5pt', borderRadius: '2pt',
                            backgroundColor: printPalette[note.color],
                            borderLeft: `2pt solid ${NOTE_PALETTE[note.color].border}`,
                            color: '#111',
                          }}>
                            {note.text}
                          </div>
                        ))}
                      </>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Register ─────────────────────────────────────────────────────────────────

BlockRegistry.register({
  type: 'calendar-notes',
  label: 'Calendar Notes',
  icon: 'CalendarCheck2',
  defaultContent: { notes: {} } satisfies CalendarNotesContent,
  EditorComponent: CalendarNotesEditor,
  PreviewComponent: CalendarNotesPreview,
  PrintComponent: CalendarNotesPrint,
})

export {}
