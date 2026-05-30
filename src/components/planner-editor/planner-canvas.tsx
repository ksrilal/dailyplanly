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
import { PlannerPreviewAnimation } from './planner-preview-animation'

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
        block.width === 'half' ? 'col-span-1' : 'col-span-2',
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

  if (!planner) return null

  const sortedBlocks = [...planner.blocks].sort((a, b) => a.order - b.order)
  const blockIds = sortedBlocks.map((b) => b.id)
  const hasBlocks = sortedBlocks.length > 0

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = blockIds.indexOf(active.id as string)
    const newIndex = blockIds.indexOf(over.id as string)
    const reordered = arrayMove(blockIds, oldIndex, newIndex)
    reorderBlocks(reordered)
  }

  // Show animated preview when no blocks — same logic as Clear button's hasBlocks check
  if (!hasBlocks) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="w-full max-w-2xl h-full min-h-[500px] rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--bg-surface)]/80 backdrop-blur-md shadow-[var(--shadow-lg)]">
          <PlannerPreviewAnimation />
        </div>
      </div>
    )
  }

  // A4: 794×1123px  |  Letter: 816×1056px  (at 96dpi)
  const isLandscape = planner.orientation === 'landscape'
  const paperW = planner.paperSize === 'A4' ? 794 : 816
  const paperH = planner.paperSize === 'A4' ? 1123 : 1056
  const canvasWidth = isLandscape ? paperH : paperW
  const canvasMinHeight = isLandscape ? paperW : paperH

  return (
    <div
      className="planner-canvas mx-auto transition-all duration-300"
      style={{
        ...getThemeStyle(planner.theme),
        width: `${canvasWidth}px`,
        backgroundColor: 'var(--planner-bg)',
        minHeight: `${canvasMinHeight}px`,
        borderRadius: '12px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
        padding: '32px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) selectBlock(null)
      }}
      data-theme={planner.theme}
    >

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
          {/* 2-column grid: half-width blocks get col-span-1, full-width get col-span-2 */}
          <div className="grid grid-cols-2 gap-4">
            {sortedBlocks.map((block) => (
              <SortableBlock key={block.id} block={block} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
