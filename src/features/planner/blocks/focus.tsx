'use client'

import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateId } from '@/lib/utils'
import { Plus, X } from 'lucide-react'
import type { FocusContent } from '@/features/storage/types'

const priorityColors: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#6366f1',
}

function FocusEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as FocusContent
  return (
    <div className="flex flex-col gap-2">
      <Input
        label="Section title"
        value={content.title}
        onChange={(e) => onChange({ ...content, title: e.target.value })}
      />
      {content.items.map((item, i) => (
        <div key={item.id ?? i} className="flex items-center gap-2">
          <select
            value={item.priority}
            onChange={(e) => {
              const items = [...content.items]
              items[i] = { ...item, priority: e.target.value as 'high' | 'medium' | 'low' }
              onChange({ ...content, items })
            }}
            className="text-xs border border-[var(--border)] rounded px-1 py-1 bg-[var(--bg-surface)]"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input
            type="text"
            value={item.label}
            placeholder={`Item ${i + 1}`}
            onChange={(e) => {
              const items = [...content.items]
              items[i] = { ...item, label: e.target.value }
              onChange({ ...content, items })
            }}
            className="flex-1 text-sm border-b border-[var(--border)] bg-transparent py-1 focus:outline-none"
          />
          <Button variant="ghost" size="icon-sm" onClick={() => {
            onChange({ ...content, items: content.items.filter((_, j) => j !== i) })
          }}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() =>
        onChange({ ...content, items: [...content.items, { id: generateId(), label: '', priority: 'medium' as const }] })
      }>
        <Plus className="h-3.5 w-3.5" /> Add item
      </Button>
    </div>
  )
}

function FocusPreview({ block }: BlockPreviewProps) {
  const content = block.content as FocusContent
  return (
    <div className="p-3 flex flex-col gap-1.5">
      {content.items.map((item, i) => (
        <div key={item.id ?? i} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: priorityColors[item.priority] }} />
          <span style={{ color: 'var(--planner-text)' }}>{item.label || 'Focus item'}</span>
        </div>
      ))}
    </div>
  )
}

function FocusPrint({ block }: { block: import('@/features/storage/types').PlannerBlock }) {
  const content = block.content as FocusContent
  return (
    <div style={{ padding: '8pt' }}>
      {content.items.map((item, i) => (
        <div key={item.id ?? i} style={{ display: 'flex', alignItems: 'center', gap: '6pt', marginBottom: '6pt' }}>
          <div style={{ width: '8pt', height: '8pt', borderRadius: '50%', backgroundColor: priorityColors[item.priority], flexShrink: 0 }} />
          <span style={{ fontSize: '10pt' }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

BlockRegistry.register({
  type: 'focus',
  label: 'Focus Section',
  icon: 'Focus',
  defaultContent: {
    title: "Today's Focus",
    items: [
      { id: generateId(), label: '', priority: 'high' },
      { id: generateId(), label: '', priority: 'medium' },
      { id: generateId(), label: '', priority: 'low' },
    ],
  } satisfies FocusContent,
  EditorComponent: FocusEditor,
  PreviewComponent: FocusPreview,
  PrintComponent: FocusPrint,
})

export {}
