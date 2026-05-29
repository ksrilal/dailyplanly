'use client'

import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Button } from '@/components/ui/button'
import { generateId } from '@/lib/utils'
import { Plus, X } from 'lucide-react'
import type { RoutineContent } from '@/features/storage/types'

function RoutineEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as RoutineContent
  return (
    <div className="flex flex-col gap-2">
      {content.slots.map((slot, i) => (
        <div key={slot.id} className="flex items-center gap-2">
          <input
            type="time"
            value={slot.time.includes(':') && slot.time.includes(' ')
              ? ''
              : slot.time.replace(' AM', '').replace(' PM', '')}
            onChange={(e) => {
              const slots = [...content.slots]
              slots[i] = { ...slot, time: e.target.value }
              onChange({ ...content, slots })
            }}
            className="text-xs border border-[var(--border)] rounded px-2 py-1 bg-[var(--bg-surface)] w-24"
          />
          <input
            type="text"
            value={slot.label}
            placeholder="Activity"
            onChange={(e) => {
              const slots = [...content.slots]
              slots[i] = { ...slot, label: e.target.value }
              onChange({ ...content, slots })
            }}
            className="flex-1 text-sm border-b border-[var(--border)] bg-transparent py-1 focus:outline-none"
          />
          <Button variant="ghost" size="icon-sm" onClick={() =>
            onChange({ ...content, slots: content.slots.filter((_, j) => j !== i) })
          }>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() =>
        onChange({ ...content, slots: [...content.slots, { id: generateId(), time: '', label: '', done: false }] })
      }>
        <Plus className="h-3.5 w-3.5" /> Add time slot
      </Button>
    </div>
  )
}

function RoutinePreview({ block }: BlockPreviewProps) {
  const content = block.content as RoutineContent
  return (
    <div className="p-3 flex flex-col gap-1">
      {content.slots.slice(0, 8).map((slot) => (
        <div key={slot.id} className="flex items-center gap-3 text-xs py-1" style={{ borderBottom: '1px solid var(--planner-border)' }}>
          <span className="w-16 flex-shrink-0 font-mono" style={{ color: 'var(--planner-text-muted)' }}>{slot.time}</span>
          <span style={{ color: 'var(--planner-text)' }}>{slot.label || '—'}</span>
        </div>
      ))}
    </div>
  )
}

function RoutinePrint({ block }: { block: import('@/features/storage/types').PlannerBlock }) {
  const content = block.content as RoutineContent
  return (
    <div style={{ padding: '8pt' }}>
      {content.slots.map((slot) => (
        <div key={slot.id} style={{ display: 'flex', gap: '12pt', borderBottom: '1px solid #eee', padding: '4pt 0', fontSize: '10pt' }}>
          <span style={{ width: '50pt', color: '#888', flexShrink: 0 }}>{slot.time}</span>
          <span>{slot.label}</span>
        </div>
      ))}
    </div>
  )
}

BlockRegistry.register({
  type: 'routine',
  label: 'Daily Routine',
  icon: 'Clock',
  defaultContent: {
    slots: Array.from({ length: 8 }, (_, i) => ({
      id: generateId(),
      time: `${8 + i}:00`,
      label: '',
      done: false,
    })),
  } satisfies RoutineContent,
  EditorComponent: RoutineEditor,
  PreviewComponent: RoutinePreview,
  PrintComponent: RoutinePrint,
})

export {}
