'use client'

import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Input } from '@/components/ui/input'
import type { DashboardCardContent } from '@/features/storage/types'

function DashboardCardEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as DashboardCardContent
  return (
    <div className="flex flex-col gap-3">
      <Input label="Title" value={content.title} placeholder="e.g. Steps Today" onChange={(e) => onChange({ ...content, title: e.target.value })} />
      <Input label="Value" value={content.value} placeholder="e.g. 8,432" onChange={(e) => onChange({ ...content, value: e.target.value })} />
      <Input label="Unit (optional)" value={content.unit ?? ''} placeholder="e.g. steps, $, %" onChange={(e) => onChange({ ...content, unit: e.target.value })} />
      <Input label="Note (optional)" value={content.note ?? ''} placeholder="Short context note" onChange={(e) => onChange({ ...content, note: e.target.value })} />
    </div>
  )
}

function DashboardCardPreview({ block }: BlockPreviewProps) {
  const content = block.content as DashboardCardContent
  return (
    <div className="p-4 text-center">
      <p className="text-xs font-medium mb-1" style={{ color: 'var(--planner-text-muted)' }}>{content.title || 'Metric'}</p>
      <p className="text-2xl font-bold" style={{ color: 'var(--planner-accent)', fontFamily: 'var(--planner-font-heading)' }}>
        {content.value || '—'}
        {content.unit && <span className="text-sm ml-1" style={{ color: 'var(--planner-text-muted)' }}>{content.unit}</span>}
      </p>
      {content.note && <p className="text-xs mt-1" style={{ color: 'var(--planner-text-muted)' }}>{content.note}</p>}
    </div>
  )
}

function DashboardCardPrint({ block }: { block: import('@/features/storage/types').PlannerBlock }) {
  const content = block.content as DashboardCardContent
  return (
    <div style={{ padding: '12pt', textAlign: 'center', border: '1pt solid #eee', borderRadius: '4pt' }}>
      <p style={{ fontSize: '9pt', color: '#888', marginBottom: '4pt' }}>{content.title}</p>
      <p style={{ fontSize: '20pt', fontWeight: 700 }}>{content.value}{content.unit && <span style={{ fontSize: '12pt', marginLeft: '4pt' }}>{content.unit}</span>}</p>
      {content.note && <p style={{ fontSize: '9pt', color: '#888', marginTop: '4pt' }}>{content.note}</p>}
    </div>
  )
}

BlockRegistry.register({
  type: 'dashboard-card',
  label: 'Dashboard Card',
  icon: 'BarChart2',
  defaultContent: { title: '', value: '', unit: '', note: '' } satisfies DashboardCardContent,
  EditorComponent: DashboardCardEditor,
  PreviewComponent: DashboardCardPreview,
  PrintComponent: DashboardCardPrint,
})

export {}
