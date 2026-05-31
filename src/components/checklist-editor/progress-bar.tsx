'use client'

import { useChecklistEditor } from '@/features/checklist/editor-state'

export function ChecklistProgressBar() {
  const getProgress = useChecklistEditor((s) => s.getProgress)
  const progress = getProgress()

  if (progress.total === 0) return null

  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-1 h-2 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-[var(--text-muted)] tabular-nums whitespace-nowrap">
        {progress.completed}/{progress.total}
      </span>
      <span className="text-xs font-bold text-emerald-500 tabular-nums w-9 text-right">
        {progress.percentage}%
      </span>
    </div>
  )
}
