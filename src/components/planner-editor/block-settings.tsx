'use client'

import { usePlannerEditor } from '@/features/planner/editor-state'
import { BlockRegistry } from '@/features/planner/block-registry'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'
import type { PlannerBlockContent } from '@/features/storage/types'

export function BlockSettings() {
  const planner = usePlannerEditor((s) => s.planner)
  const selectedBlockId = usePlannerEditor((s) => s.selectedBlockId)
  const updateBlockContent = usePlannerEditor((s) => s.updateBlockContent)
  const renameBlock = usePlannerEditor((s) => s.renameBlock)
  const setBlockWidth = usePlannerEditor((s) => s.setBlockWidth)
  const removeBlock = usePlannerEditor((s) => s.removeBlock)

  if (!planner || !selectedBlockId) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full text-center">
        <p className="text-sm text-[var(--text-faint)]">Select a block to edit its settings</p>
      </div>
    )
  }

  const block = planner.blocks.find((b) => b.id === selectedBlockId)
  if (!block) return null

  const entry = BlockRegistry.has(block.type) ? BlockRegistry.get(block.type) : null
  if (!entry) return null

  return (
    <div className="p-3 flex flex-col gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] mb-2">
          {entry.icon} {entry.label}
        </p>
        <Input
          label="Block label"
          value={block.label ?? ''}
          placeholder={entry.label}
          onChange={(e) => renameBlock(block.id, e.target.value)}
        />
      </div>

      <div>
        <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">Width</p>
        <div className="flex gap-2">
          {(['full', 'half'] as const).map((w) => (
            <button
              key={w}
              onClick={() => setBlockWidth(block.id, w)}
              aria-pressed={block.width === w}
              className={`flex-1 text-xs py-1.5 rounded border transition-colors ${
                block.width === w
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                  : 'border-[var(--border)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              {w === 'full' ? 'Full width' : 'Half width'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-[var(--text-secondary)]">Content</p>
        <entry.EditorComponent
          block={block}
          onChange={(content: PlannerBlockContent) => updateBlockContent(block.id, content)}
        />
      </div>

      <Button
        variant="destructive"
        size="sm"
        className="mt-auto"
        onClick={() => removeBlock(block.id)}
      >
        <Trash2 className="h-3.5 w-3.5" /> Remove block
      </Button>
    </div>
  )
}
