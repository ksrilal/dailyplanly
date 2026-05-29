'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { usePlannerEditor } from '@/features/planner/editor-state'
import { BlockRegistry } from '@/features/planner/block-registry'
import { getThemeStyle } from '@/features/planner/theme-tokens'
import { cn } from '@/lib/utils'
import type { PlannerBlock } from '@/features/storage/types'

function SortableBlock({ block }: { block: PlannerBlock }) {
  const selectedBlockId = usePlannerEditor((s) => s.selectedBlockId)
  const selectBlock = usePlannerEditor((s) => s.selectBlock)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const entry = BlockRegistry.has(block.type) ? BlockRegistry.get(block.type) : null
  if (!entry) return null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'planner-block group relative rounded-[var(--planner-radius,8px)] border transition-all cursor-pointer',
        block.width === 'half' ? 'w-[49%] inline-block align-top' : 'w-full',
        selectedBlockId === block.id
          ? 'border-[var(--color-accent)] shadow-[0_0_0_2px_var(--color-accent-soft)]'
          : 'border-[var(--planner-border,var(--border))] hover:border-[var(--color-accent)]'
      )}
      onClick={() => selectBlock(block.id)}
      role="button"
      aria-pressed={selectedBlockId === block.id}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && selectBlock(block.id)}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 text-[var(--text-faint)]"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Block label */}
      {block.label && (
        <div className="px-3 pt-2.5 pb-1">
          <p className="text-xs font-semibold" style={{ color: 'var(--planner-text-muted)' }}>
            {block.label}
          </p>
        </div>
      )}

      {/* Block preview */}
      <entry.PreviewComponent block={block} />
    </div>
  )
}

export function PlannerCanvas() {
  const planner = usePlannerEditor((s) => s.planner)
  const reorderBlocks = usePlannerEditor((s) => s.reorderBlocks)
  const selectBlock = usePlannerEditor((s) => s.selectBlock)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  if (!planner) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
        <p className="text-4xl">📋</p>
        <p className="text-sm font-medium text-[var(--text-secondary)]">Your planner is empty</p>
        <p className="text-xs text-[var(--text-faint)] max-w-xs">
          Add a block from the left sidebar to get started. Your work saves automatically.
        </p>
      </div>
    )
  }

  const sortedBlocks = [...planner.blocks].sort((a, b) => a.order - b.order)
  const blockIds = sortedBlocks.map((b) => b.id)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = blockIds.indexOf(active.id as string)
    const newIndex = blockIds.indexOf(over.id as string)
    const reordered = arrayMove(blockIds, oldIndex, newIndex)
    reorderBlocks(reordered)
  }

  const paperWidth = planner.paperSize === 'A4' ? '794px' : '816px'

  return (
    <div
      className="planner-canvas mx-auto"
      style={{
        ...getThemeStyle(planner.theme),
        maxWidth: paperWidth,
        backgroundColor: 'var(--planner-bg)',
        minHeight: '1000px',
        borderRadius: '12px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
        padding: '32px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) selectBlock(null)
      }}
      data-theme={planner.theme}
    >
      {sortedBlocks.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-2xl mb-3">📋</p>
          <p className="text-sm font-medium" style={{ color: 'var(--planner-text-muted)' }}>
            Add blocks from the left sidebar to start building your planner
          </p>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
          <div className="flex flex-wrap gap-4">
            {sortedBlocks.map((block) => (
              <SortableBlock key={block.id} block={block} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
