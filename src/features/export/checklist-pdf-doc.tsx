import React from 'react'
import { Document, Page, Text, View, StyleSheet, Svg, Path, Line } from '@react-pdf/renderer'
import type { Checklist, ChecklistItem, ExportConfig, ChecklistItemStatus } from '@/features/storage/types'
import { computeProgress } from '@/features/checklist/tree-ops'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  ink: '#111827',
  muted: '#6b7280',
  faint: '#d1d5db',
  accent: '#6366f1',
  green: '#16a34a',
  red: '#dc2626',
  greenBg: '#f0fdf4',
  line: '#e5e7eb',
  pageBg: '#ffffff',
}

const styles = StyleSheet.create({
  page: {
    padding: '18mm 16mm',
    fontFamily: 'Helvetica',
    backgroundColor: C.pageBg,
    fontSize: 10,
    color: C.ink,
    lineHeight: 1.5,
  },
  // Header
  header: { marginBottom: 14 },
  title: { fontSize: 20, fontWeight: 'bold', color: C.ink, letterSpacing: -0.5, marginBottom: 3 },
  subtitle: { fontSize: 8.5, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8 },
  divider: { borderBottom: `1pt solid ${C.line}`, marginVertical: 10 },

  // Progress
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  progressLabel: { fontSize: 8.5, color: C.muted, width: 80 },
  progressTrack: { flex: 1, height: 5, backgroundColor: C.faint, borderRadius: 3 },
  progressFill: { height: 5, backgroundColor: C.green, borderRadius: 3 },
  progressPct: { fontSize: 8.5, color: C.green, fontWeight: 'bold', width: 30, textAlign: 'right' },

  // Items
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 5, borderBottom: `0.5pt solid ${C.faint}` },
  checkbox: { width: 12, height: 12, border: `1.5pt solid ${C.faint}`, borderRadius: 2, marginRight: 8, marginTop: 1, flexShrink: 0 },
  checkboxChecked: { width: 12, height: 12, backgroundColor: C.green, borderRadius: 2, marginRight: 8, marginTop: 1, flexShrink: 0, alignItems: 'center', justifyContent: 'center' },
  checkboxInvalid: { width: 12, height: 12, backgroundColor: '#fee2e2', border: `1.5pt solid ${C.red}`, borderRadius: 2, marginRight: 8, marginTop: 1, flexShrink: 0, alignItems: 'center', justifyContent: 'center' },
  checkmark: { color: '#ffffff', fontSize: 7, fontWeight: 'bold' },
  xmark: { color: C.red, fontSize: 7, fontWeight: 'bold' },
  itemText: { flex: 1, fontSize: 10, color: C.ink, lineHeight: 1.4 },
  itemTextDone: { flex: 1, fontSize: 10, color: C.muted, lineHeight: 1.4, textDecoration: 'line-through' },
  itemTextInvalid: { flex: 1, fontSize: 10, color: C.red, lineHeight: 1.4, textDecoration: 'line-through', opacity: 0.7 },

  // Section headers (top-level groups in advanced)
  sectionHeader: { fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 10, marginBottom: 3 },
})

// ─── Recursive item renderer ──────────────────────────────────────────────────

function renderItems(items: ChecklistItem[], parentId: string | null = null, depth = 0): React.ReactElement[] {
  return items
    .filter((i) => i.parentId === parentId)
    .sort((a, b) => a.order - b.order)
    .flatMap((item) => {
      const status: ChecklistItemStatus = item.status ?? (item.checked ? 'checked' : 'unchecked')
      const indent = depth * 14

      const row = (
        <View key={item.id} style={{ ...styles.itemRow, paddingLeft: indent }}>
          {/* Checkbox drawn with SVG — reliable in @react-pdf/renderer */}
          {status === 'checked' ? (
            <View style={styles.checkboxChecked}>
              <Svg width={8} height={8} viewBox="0 0 10 10">
                <Path
                  d="M1.5 5 L4 7.5 L8.5 2"
                  stroke="white"
                  strokeWidth={1.8}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          ) : status === 'invalid' ? (
            <View style={styles.checkboxInvalid}>
              <Svg width={8} height={8} viewBox="0 0 10 10">
                <Line x1={2} y1={2} x2={8} y2={8} stroke={C.red} strokeWidth={1.8} strokeLinecap="round" />
                <Line x1={8} y1={2} x2={2} y2={8} stroke={C.red} strokeWidth={1.8} strokeLinecap="round" />
              </Svg>
            </View>
          ) : (
            <View style={styles.checkbox} />
          )}
          <Text style={
            status === 'checked' ? styles.itemTextDone :
            status === 'invalid' ? styles.itemTextInvalid :
            styles.itemText
          }>
            {item.text || '—'}
          </Text>
        </View>
      )

      const children = renderItems(items, item.id, depth + 1)
      return [row, ...children]
    })
}

// ─── Document ─────────────────────────────────────────────────────────────────

interface ChecklistPdfDocumentProps {
  checklist: Checklist
  config: ExportConfig
}

export function ChecklistPdfDocument({ checklist, config }: ChecklistPdfDocumentProps) {
  const progress = computeProgress(checklist.items)
  const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Document title={checklist.title}>
      <Page
        size={config.paperSize === 'Letter' ? 'LETTER' : config.paperSize}
        orientation={config.orientation}
        style={styles.page}
      >
        {/* Header — title only */}
        <View style={styles.header}>
          <Text style={styles.title}>{checklist.title}</Text>
        </View>

        <View style={styles.divider} />

        {/* Progress bar */}
        {progress.total > 0 && (
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>{progress.completed}/{progress.total} done</Text>
            {/* Use flexGrow ratio for the fill — works reliably in @react-pdf/renderer */}
            <View style={styles.progressTrack}>
              <View style={{ ...styles.progressFill, flexGrow: progress.percentage, maxWidth: `${progress.percentage}%` }} />
              <View style={{ flexGrow: 100 - progress.percentage, backgroundColor: 'transparent' }} />
            </View>
            <Text style={styles.progressPct}>{progress.percentage}%</Text>
          </View>
        )}

        {/* Items */}
        <View>{renderItems(checklist.items)}</View>

      </Page>
    </Document>
  )
}
