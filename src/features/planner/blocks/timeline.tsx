'use client'

import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Button } from '@/components/ui/button'
import { generateId } from '@/lib/utils'
import { Plus, X } from 'lucide-react'
import type { TimelineContent } from '@/features/storage/types'

function TimelineEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as TimelineContent
  return (
    <div className="flex flex-col gap-2">
      {content.events.map((event, i) => (
        <div key={event.id ?? i} className="flex items-start gap-2">
          <input
            type="date"
            value={event.date}
            onChange={(e) => {
              const events = [...content.events]
              events[i] = { ...event, date: e.target.value }
              onChange({ ...content, events })
            }}
            className="text-xs border border-[var(--border)] rounded px-2 py-1 bg-[var(--bg-surface)] w-32"
          />
          <input
            type="text"
            value={event.label}
            placeholder="Event"
            onChange={(e) => {
              const events = [...content.events]
              events[i] = { ...event, label: e.target.value }
              onChange({ ...content, events })
            }}
            className="flex-1 text-sm border-b border-[var(--border)] bg-transparent py-1 focus:outline-none"
          />
          <Button variant="ghost" size="icon-sm" onClick={() =>
            onChange({ ...content, events: content.events.filter((_, j) => j !== i) })
          }>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() =>
        onChange({ ...content, events: [...content.events, { id: generateId(), label: '', date: '', note: '' }] })
      }>
        <Plus className="h-3.5 w-3.5" /> Add event
      </Button>
    </div>
  )
}

function TimelinePreview({ block }: BlockPreviewProps) {
  const content = block.content as TimelineContent
  return (
    <div className="p-3 flex flex-col gap-2 relative">
      <div className="absolute left-5 top-3 bottom-3 w-px" style={{ backgroundColor: 'var(--planner-border)' }} />
      {content.events.map((event, i) => (
        <div key={event.id ?? i} className="flex items-start gap-3 pl-2 relative z-10">
          <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--planner-accent)', border: '2px solid var(--planner-bg)' }} />
          <div>
            <p className="text-xs font-medium" style={{ color: 'var(--planner-text)' }}>{event.label || 'Event'}</p>
            {event.date && <p className="text-xs" style={{ color: 'var(--planner-text-muted)' }}>{event.date}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function TimelinePrint({ block }: { block: import('@/features/storage/types').PlannerBlock }) {
  const content = block.content as TimelineContent
  return (
    <div style={{ padding: '8pt' }}>
      {content.events.map((event, i) => (
        <div key={event.id ?? i} style={{ display: 'flex', gap: '8pt', marginBottom: '8pt', alignItems: 'flex-start' }}>
          <div style={{ width: '8pt', height: '8pt', borderRadius: '50%', backgroundColor: '#333', flexShrink: 0, marginTop: '3pt' }} />
          <div>
            <p style={{ fontWeight: 600, fontSize: '10pt' }}>{event.label}</p>
            {event.date && <p style={{ fontSize: '9pt', color: '#888' }}>{event.date}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

BlockRegistry.register({
  type: 'timeline',
  label: 'Timeline',
  icon: 'GitCommitHorizontal',
  defaultContent: {
    events: [
      { id: generateId(), label: '', date: '', note: '' },
      { id: generateId(), label: '', date: '', note: '' },
      { id: generateId(), label: '', date: '', note: '' },
    ],
  } satisfies TimelineContent,
  EditorComponent: TimelineEditor,
  PreviewComponent: TimelinePreview,
  PrintComponent: TimelinePrint,
})

export {}
