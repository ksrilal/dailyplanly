'use client'

import { BlockRegistry } from '@/features/planner/block-registry'
import { usePlannerEditor } from '@/features/planner/editor-state'
import { CategoryIcon } from '@/components/ui/category-icon'
import type { PlannerBlockType } from '@/features/storage/types'

interface BlockPaletteProps {
  onEnsureRecord?: () => Promise<string>
}

export function BlockPalette({ onEnsureRecord }: BlockPaletteProps) {
  const addBlock = usePlannerEditor((s) => s.addBlock)
  const blocks = BlockRegistry.getAll()

  async function handleAdd(type: PlannerBlockType) {
    // Lazily create record on first block add
    if (onEnsureRecord) await onEnsureRecord()
    addBlock(type)
  }

  return (
    <div className="p-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] mb-3 px-1">
        Add Block
      </p>
      <div className="flex flex-col gap-1">
        {blocks.map((entry) => (
          <button
            key={entry.type}
            onClick={() => handleAdd(entry.type as PlannerBlockType)}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] transition-colors text-left"
          >
            <CategoryIcon name={entry.icon} className="h-4 w-4 flex-shrink-0" />
            <span>{entry.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
