'use client'

import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateId } from '@/lib/utils'
import { Plus, X } from 'lucide-react'
import type { GoalContent } from '@/features/storage/types'

function GoalEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as GoalContent
  return (
    <div className="flex flex-col gap-3">
      <Input label="Goal" value={content.goal} placeholder="Enter your goal…" onChange={(e) => onChange({ ...content, goal: e.target.value })} />
      <Input label="Deadline (optional)" type="date" value={content.deadline ?? ''} onChange={(e) => onChange({ ...content, deadline: e.target.value })} />
      <div>
        <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">Milestones</p>
        {content.milestones.map((m, i) => (
          <div key={m.id} className="flex items-center gap-2 mb-2">
            <input type="checkbox" checked={m.done} onChange={(e) => {
              const milestones = [...content.milestones]
              milestones[i] = { ...m, done: e.target.checked }
              onChange({ ...content, milestones })
            }} className="h-4 w-4" />
            <input type="text" value={m.label} placeholder={`Milestone ${i + 1}`} onChange={(e) => {
              const milestones = [...content.milestones]
              milestones[i] = { ...m, label: e.target.value }
              onChange({ ...content, milestones })
            }} className="flex-1 text-sm border-b border-[var(--border)] bg-transparent py-1 focus:outline-none" />
            <Button variant="ghost" size="icon-sm" onClick={() =>
              onChange({ ...content, milestones: content.milestones.filter((_, j) => j !== i) })
            }>
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <Button variant="ghost" size="sm" onClick={() =>
          onChange({ ...content, milestones: [...content.milestones, { id: generateId(), label: '', done: false }] })
        }>
          <Plus className="h-3.5 w-3.5" /> Add milestone
        </Button>
      </div>
    </div>
  )
}

function GoalPreview({ block }: BlockPreviewProps) {
  const content = block.content as GoalContent
  const done = content.milestones.filter((m) => m.done).length
  return (
    <div className="p-3">
      <p className="text-sm font-medium mb-2" style={{ color: 'var(--planner-text)' }}>{content.goal || 'Goal'}</p>
      <div className="flex flex-col gap-1">
        {content.milestones.map((m) => (
          <div key={m.id} className="flex items-center gap-2 text-xs">
            <span>{m.done ? '☑' : '☐'}</span>
            <span style={{ color: m.done ? 'var(--planner-text-muted)' : 'var(--planner-text)', textDecoration: m.done ? 'line-through' : 'none' }}>
              {m.label || 'Milestone'}
            </span>
          </div>
        ))}
      </div>
      {content.milestones.length > 0 && (
        <p className="text-xs mt-2" style={{ color: 'var(--planner-text-muted)' }}>{done}/{content.milestones.length} complete</p>
      )}
    </div>
  )
}

function GoalPrint({ block }: { block: import('@/features/storage/types').PlannerBlock }) {
  const content = block.content as GoalContent
  return (
    <div style={{ padding: '8pt' }}>
      <p style={{ fontWeight: 600, fontSize: '11pt', marginBottom: '6pt' }}>{content.goal}</p>
      {content.deadline && <p style={{ fontSize: '9pt', color: '#888', marginBottom: '6pt' }}>Deadline: {content.deadline}</p>}
      {content.milestones.map((m) => (
        <div key={m.id} style={{ display: 'flex', gap: '6pt', alignItems: 'center', marginBottom: '4pt', fontSize: '10pt' }}>
          <span>{m.done ? '☑' : '☐'}</span>
          <span style={{ textDecoration: m.done ? 'line-through' : 'none' }}>{m.label}</span>
        </div>
      ))}
    </div>
  )
}

BlockRegistry.register({
  type: 'goal',
  label: 'Goal Tracker',
  icon: 'Target',
  defaultContent: {
    goal: '',
    milestones: [
      { id: generateId(), label: '', done: false },
      { id: generateId(), label: '', done: false },
      { id: generateId(), label: '', done: false },
    ],
  } satisfies GoalContent,
  EditorComponent: GoalEditor,
  PreviewComponent: GoalPreview,
  PrintComponent: GoalPrint,
})

export {}
