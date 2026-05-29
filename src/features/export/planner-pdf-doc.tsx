import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type {
  Planner, ExportConfig, PlannerBlock,
  CalendarNotesContent, CalendarNote,
  FocusContent, NotesContent, RoutineContent, GoalContent,
  HabitTrackerContent, CalendarContent, TableContent,
  TimelineContent, DashboardCardContent,
} from '@/features/storage/types'

const C = {
  ink: '#111827', muted: '#6b7280', faint: '#e5e7eb', fainter: '#f9fafb',
  accent: '#6366f1', accentLight: '#ede9fe',
  green: '#16a34a', red: '#dc2626', amber: '#d97706',
  line: '#e5e7eb', blockBg: '#fafafa', pageBg: '#ffffff',
}

const styles = StyleSheet.create({
  page: { padding: '18mm 16mm', fontFamily: 'Helvetica', backgroundColor: C.pageBg, fontSize: 10, color: C.ink, lineHeight: 1.5 },
  header: { marginBottom: 14 },
  title: { fontSize: 20, fontWeight: 'bold', color: C.ink, letterSpacing: -0.5, marginBottom: 3 },
  subtitle: { fontSize: 8.5, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8 },
  divider: { borderBottom: `1pt solid ${C.line}`, marginVertical: 10 },
  block: { marginBottom: 10, padding: '8pt 10pt', border: `0.75pt solid ${C.faint}`, borderRadius: 4, backgroundColor: C.blockBg },
  blockLabel: { fontSize: 7.5, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6, borderBottom: `0.5pt solid ${C.faint}`, paddingBottom: 4 },
  text: { fontSize: 10, color: C.ink },
  small: { fontSize: 8.5, color: C.muted },
  bold: { fontSize: 10, fontWeight: 'bold', color: C.ink },
  ruledLine: { borderBottom: `0.75pt solid ${C.faint}`, marginBottom: 10, paddingBottom: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  footer: { position: 'absolute', bottom: '12mm', left: '16mm', right: '16mm', borderTop: `0.5pt solid ${C.faint}`, paddingTop: 5 },
  footerText: { fontSize: 7.5, color: C.muted, textAlign: 'center' },
})

const PRIORITY_COLORS: Record<string, string> = { high: C.red, medium: C.amber, low: C.accent }
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su']

function NotesBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as NotesContent
  return (
    <View style={styles.block}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      {c.text ? <Text style={styles.text}>{c.text}</Text> : Array.from({ length: c.lines }, (_, i) => <View key={i} style={styles.ruledLine} />)}
    </View>
  )
}

function FocusBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as FocusContent
  return (
    <View style={styles.block}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      {c.items.map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: PRIORITY_COLORS[item.priority] ?? C.accent, flexShrink: 0 }} />
          <Text style={styles.text}>{item.label || 'Focus item'}</Text>
        </View>
      ))}
    </View>
  )
}

function RoutineBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as RoutineContent
  return (
    <View style={styles.block}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      {c.slots.map((slot) => (
        <View key={slot.id} style={{ flexDirection: 'row', gap: 10, borderBottom: `0.5pt solid ${C.faint}`, paddingVertical: 4 }}>
          <Text style={{ ...styles.small, width: 38, flexShrink: 0 }}>{slot.time}</Text>
          <Text style={styles.text}>{slot.label}</Text>
        </View>
      ))}
    </View>
  )
}

function GoalBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as GoalContent
  return (
    <View style={styles.block}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      <Text style={{ ...styles.bold, marginBottom: 6 }}>{c.goal || 'Goal'}</Text>
      {c.deadline && <Text style={{ ...styles.small, marginBottom: 6 }}>Deadline: {c.deadline}</Text>}
      {c.milestones.map((m) => (
        <View key={m.id} style={{ ...styles.row, marginBottom: 3 }}>
          <View style={{ width: 10, height: 10, border: `1.5pt solid ${m.done ? C.green : C.faint}`, borderRadius: 2, backgroundColor: m.done ? C.green : 'transparent', flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>
            {m.done && <Text style={{ color: '#fff', fontSize: 7 }}>v</Text>}
          </View>
          <Text style={m.done ? { ...styles.text, color: C.muted } : styles.text}>{m.label}</Text>
        </View>
      ))}
    </View>
  )
}

function HabitBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as HabitTrackerContent
  const days = Math.min(c.days, 31)
  return (
    <View style={styles.block}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      <View style={{ flexDirection: 'row', gap: 2, marginBottom: 4, paddingLeft: 70 }}>
        {Array.from({ length: days }, (_, i) => <Text key={i} style={{ fontSize: 5.5, color: C.muted, width: 10, textAlign: 'center' }}>{i + 1}</Text>)}
      </View>
      {c.habits.map((habit) => (
        <View key={habit.id} style={{ flexDirection: 'row', gap: 2, marginBottom: 4, alignItems: 'center' }}>
          <Text style={{ ...styles.small, width: 68, flexShrink: 0 }}>{habit.label}</Text>
          {Array.from({ length: days }, (_, i) => <View key={i} style={{ width: 10, height: 10, border: `1pt solid ${C.faint}`, borderRadius: 1.5 }} />)}
        </View>
      ))}
    </View>
  )
}

function CalendarBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as CalendarContent
  const now = new Date()
  const year = c.year ?? now.getFullYear()
  const month = c.month ? c.month - 1 : now.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = (firstDay + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = Array(startOffset).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return (
    <View style={styles.block}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      <Text style={{ ...styles.bold, textAlign: 'center', marginBottom: 6 }}>{MONTHS[month]} {year}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 3 }}>
        {DAYS.map((d) => <Text key={d} style={{ flex: 1, fontSize: 7, color: C.muted, textAlign: 'center' }}>{d}</Text>)}
      </View>
      {Array.from({ length: cells.length / 7 }, (_, w) => (
        <View key={w} style={{ flexDirection: 'row', marginBottom: 2 }}>
          {cells.slice(w * 7, w * 7 + 7).map((day, ci) => (
            <View key={ci} style={{ flex: 1, height: 16, border: `0.5pt solid ${C.faint}`, alignItems: 'center', justifyContent: 'center', backgroundColor: day === now.getDate() && month === now.getMonth() && year === now.getFullYear() ? C.accentLight : 'transparent' }}>
              {day != null && <Text style={{ fontSize: 7.5, color: day === now.getDate() && month === now.getMonth() && year === now.getFullYear() ? C.accent : C.ink }}>{day}</Text>}
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

function TableBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as TableContent
  return (
    <View style={styles.block}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      <View style={{ flexDirection: 'row', borderBottom: `1.5pt solid ${C.faint}`, marginBottom: 4, paddingBottom: 4 }}>
        {c.headers.map((h, i) => <Text key={i} style={{ flex: 1, fontSize: 8, fontWeight: 'bold', color: C.muted, textAlign: 'center' }}>{h}</Text>)}
      </View>
      {c.rows.map((row, ri) => (
        <View key={ri} style={{ flexDirection: 'row', borderBottom: `0.5pt solid ${C.faint}`, paddingVertical: 4 }}>
          {row.map((cell, ci) => <Text key={ci} style={{ flex: 1, fontSize: 9, color: C.ink, textAlign: 'center' }}>{cell}</Text>)}
        </View>
      ))}
    </View>
  )
}

function TimelineBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as TimelineContent
  return (
    <View style={styles.block}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      {c.events.map((ev) => (
        <View key={ev.id} style={{ flexDirection: 'row', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: C.accent, flexShrink: 0, marginTop: 2 }} />
          <View>
            <Text style={styles.text}>{ev.label || 'Event'}</Text>
            {ev.date && <Text style={styles.small}>{ev.date}</Text>}
          </View>
        </View>
      ))}
    </View>
  )
}

function DashboardCardBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as DashboardCardContent
  return (
    <View style={{ ...styles.block, alignItems: 'center', padding: '12pt 10pt' }}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      <Text style={{ ...styles.small, marginBottom: 4 }}>{c.title}</Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: C.accent }}>{c.value}{c.unit ? ` ${c.unit}` : ''}</Text>
      {c.note && <Text style={{ ...styles.small, marginTop: 4 }}>{c.note}</Text>}
    </View>
  )
}

function CalendarNotesBlock({ block }: { block: PlannerBlock }) {
  const c = block.content as CalendarNotesContent
  const now = new Date()
  const year = c.year ?? now.getFullYear()
  const month = c.month ? c.month - 1 : now.getMonth()
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su']
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = (firstDay + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = Array(startOffset).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  const notes = c.notes ?? {}

  const notePalette: Record<CalendarNote['color'], string> = {
    yellow: '#fef08a', pink: '#fbcfe8', blue: '#bfdbfe',
    green: '#bbf7d0', purple: '#ddd6fe', orange: '#fed7aa',
  }
  const noteAccent: Record<CalendarNote['color'], string> = {
    yellow: '#ca8a04', pink: '#db2777', blue: '#2563eb',
    green: '#16a34a', purple: '#7c3aed', orange: '#ea580c',
  }

  const rows = Array.from({ length: cells.length / 7 }, (_, r) => cells.slice(r * 7, r * 7 + 7))

  return (
    <View style={styles.block}>
      {block.label && <Text style={styles.blockLabel}>{block.label}</Text>}
      <Text style={{ ...styles.bold, textAlign: 'center', marginBottom: 6 }}>{MONTHS[month]} {year}</Text>
      {/* Day headers */}
      <View style={{ flexDirection: 'row', marginBottom: 3, borderBottom: `1pt solid ${C.faint}` }}>
        {DAYS.map((d) => <Text key={d} style={{ flex: 1, fontSize: 7, color: C.muted, textAlign: 'center' }}>{d}</Text>)}
      </View>
      {/* Weeks */}
      {rows.map((week, ri) => (
        <View key={ri} style={{ flexDirection: 'row', borderBottom: `0.5pt solid ${C.faint}` }}>
          {week.map((day, ci) => {
            const dayNotes = day ? (notes[day] ?? []) : []
            return (
              <View key={ci} style={{ flex: 1, minHeight: 32, padding: '1pt', borderRight: ci < 6 ? `0.5pt solid ${C.faint}` : 'none' }}>
                {day && (
                  <>
                    <Text style={{ fontSize: 7, fontWeight: 'bold', color: C.ink, marginBottom: 1 }}>{day}</Text>
                    {dayNotes.slice(0, 3).map((note) => (
                      <View key={note.id} style={{ backgroundColor: notePalette[note.color], borderLeft: `2pt solid ${noteAccent[note.color]}`, paddingHorizontal: 2, paddingVertical: 1, marginBottom: 1, borderRadius: 1.5 }}>
                        <Text style={{ fontSize: 5.5, color: '#111', lineHeight: 1.3 }}>{note.text.slice(0, 60)}</Text>
                      </View>
                    ))}
                    {dayNotes.length > 3 && <Text style={{ fontSize: 5, color: C.muted }}>+{dayNotes.length - 3}</Text>}
                  </>
                )}
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )
}

function BlockView({ block }: { block: PlannerBlock }) {
  switch (block.type) {
    case 'notes':          return <NotesBlock block={block} />
    case 'focus':          return <FocusBlock block={block} />
    case 'routine':        return <RoutineBlock block={block} />
    case 'goal':           return <GoalBlock block={block} />
    case 'habit-tracker':  return <HabitBlock block={block} />
    case 'calendar':       return <CalendarBlock block={block} />
    case 'calendar-notes': return <CalendarNotesBlock block={block} />
    case 'table':          return <TableBlock block={block} />
    case 'timeline':       return <TimelineBlock block={block} />
    case 'dashboard-card': return <DashboardCardBlock block={block} />
    default: return <View style={styles.block}>{block.label && <Text style={styles.blockLabel}>{block.label}</Text>}<Text style={styles.small}>[{block.type}]</Text></View>
  }
}

interface PlannerPdfDocumentProps { planner: Planner; config: ExportConfig }

export function PlannerPdfDocument({ planner, config }: PlannerPdfDocumentProps) {
  const sorted = [...planner.blocks].sort((a, b) => a.order - b.order)
  const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <Document title={planner.title}>
      <Page size={config.paperSize === 'Letter' ? 'LETTER' : config.paperSize} orientation={config.orientation} style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{planner.title}</Text>
          <Text style={styles.subtitle}>PLANNER · {now}</Text>
        </View>
        <View style={styles.divider} />
        {sorted.map((block) => <BlockView key={block.id} block={block} />)}
        <View style={styles.footer}><Text style={styles.footerText}>DailyPlanly · Exported {now}</Text></View>
      </Page>
    </Document>
  )
}
