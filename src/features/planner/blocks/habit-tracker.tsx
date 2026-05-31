'use client'

import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { generateId } from '@/lib/utils'
import { Plus, X } from 'lucide-react'
import type { HabitTrackerContent } from '@/features/storage/types'

function HabitTrackerEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as HabitTrackerContent
  return (
    <div className="flex flex-col gap-3">
      <Select
        label="Period"
        value={content.period}
        options={[{ value: 'daily', label: 'Daily' }, { value: 'weekly', label: 'Weekly' }]}
        onChange={(e) => onChange({ ...content, period: e.target.value as 'daily' | 'weekly' })}
      />
      <Input
        label="Days to track"
        type="number"
        value={content.days}
        min={7}
        max={30}
        onChange={(e) => onChange({ ...content, days: Number(e.target.value) })}
      />
      <div>
        <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">Habits</p>
        {content.habits.map((habit, i) => (
          <div key={habit.id ?? i} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={habit.label}
              placeholder={`Habit ${i + 1}`}
              onChange={(e) => {
                const habits = [...content.habits]
                habits[i] = { ...habit, label: e.target.value }
                onChange({ ...content, habits })
              }}
              className="flex-1 text-sm border-b border-[var(--border)] bg-transparent py-1 focus:outline-none"
            />
            <Button variant="ghost" size="icon-sm" onClick={() =>
              onChange({ ...content, habits: content.habits.filter((_, j) => j !== i) })
            }>
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <Button variant="ghost" size="sm" onClick={() =>
          onChange({ ...content, habits: [...content.habits, { id: generateId(), label: '' }] })
        }>
          <Plus className="h-3.5 w-3.5" /> Add habit
        </Button>
      </div>
    </div>
  )
}

function HabitTrackerPreview({ block }: BlockPreviewProps) {
  const content = block.content as HabitTrackerContent
  const displayDays = Math.min(content.days, 7)
  return (
    <div className="p-3 overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="text-left py-1 pr-3" style={{ color: 'var(--planner-text-muted)' }}>Habit</th>
            {Array.from({ length: displayDays }, (_, i) => (
              <th key={i} className="w-7 text-center" style={{ color: 'var(--planner-text-muted)' }}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.habits.map((habit, i) => (
            <tr key={habit.id ?? i}>
              <td className="py-1.5 pr-3" style={{ color: 'var(--planner-text)' }}>{habit.label || 'Habit'}</td>
              {Array.from({ length: displayDays }, (_, i) => (
                <td key={i} className="text-center">
                  <div className="w-5 h-5 mx-auto rounded-sm" style={{ border: '1px solid var(--planner-border)' }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function HabitTrackerPrint({ block }: { block: import('@/features/storage/types').PlannerBlock }) {
  const content = block.content as HabitTrackerContent
  return (
    <div style={{ padding: '8pt' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', paddingRight: '12pt', color: '#888' }}>Habit</th>
            {Array.from({ length: content.days }, (_, i) => (
              <th key={i} style={{ width: '16pt', textAlign: 'center', color: '#888' }}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.habits.map((habit, i) => (
            <tr key={habit.id ?? i}>
              <td style={{ paddingRight: '12pt', paddingTop: '4pt' }}>{habit.label}</td>
              {Array.from({ length: content.days }, (_, i) => (
                <td key={i} style={{ textAlign: 'center', paddingTop: '4pt' }}>
                  <div style={{ width: '12pt', height: '12pt', border: '1px solid #ccc', margin: '0 auto' }} />
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
  type: 'habit-tracker',
  label: 'Habit Tracker',
  icon: 'CheckSquare',
  defaultContent: {
    habits: [
      { id: generateId(), label: 'Exercise' },
      { id: generateId(), label: 'Read' },
      { id: generateId(), label: 'Meditate' },
    ],
    period: 'daily',
    days: 7,
  } satisfies HabitTrackerContent,
  EditorComponent: HabitTrackerEditor,
  PreviewComponent: HabitTrackerPreview,
  PrintComponent: HabitTrackerPrint,
})

export {}
