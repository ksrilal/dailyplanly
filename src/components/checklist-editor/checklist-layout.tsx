'use client'

import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove,
} from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { useChecklistEditor } from '@/features/checklist/editor-state'
import { getRoots } from '@/features/checklist/tree-ops'
import { ChecklistItemRow } from './checklist-item'
import { ChecklistProgressBar } from './progress-bar'
import { ChecklistToolbar } from './checklist-toolbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChecklistLayoutProps {
  onExport?: (format: 'pdf' | 'png' | 'jpg' | 'text' | 'print') => void
  onClear?: () => void
  onEnsureRecord?: () => Promise<string>
}

export function ChecklistLayout({ onExport, onClear, onEnsureRecord }: ChecklistLayoutProps) {
  const checklist = useChecklistEditor((s) => s.checklist)
  const filterQuery = useChecklistEditor((s) => s.filterQuery)
  const setFilterQuery = useChecklistEditor((s) => s.setFilterQuery)
  const addItem = useChecklistEditor((s) => s.addItem)
  const moveItem = useChecklistEditor((s) => s.moveItem)
  const getFilteredIds = useChecklistEditor((s) => s.getFilteredIds)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const roots = checklist ? getRoots(checklist.items) : []
  const rootIds = roots.map((r) => r.id)
  const filteredIds = checklist && filterQuery ? getFilteredIds() : undefined

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = rootIds.indexOf(active.id as string)
    const newIndex = rootIds.indexOf(over.id as string)
    if (oldIndex === -1 || newIndex === -1) return
    moveItem(active.id as string, newIndex, null)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Toolbar */}
      <div className="checklist-toolbar flex-shrink-0 border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          <ChecklistToolbar onExport={onExport} onClear={onClear} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">

          {/* No checklist yet — new mode empty state */}
          {!checklist && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
              <p className="text-sm font-medium text-[var(--text-secondary)]">Your checklist is empty</p>
              <p className="text-xs text-[var(--text-faint)]">Click "+ Add item" below to start. Saves automatically.</p>
            </div>
          )}

          {checklist && (
            <>
              {/* Progress */}
              <ChecklistProgressBar />

              {/* Search */}
              <div className="mb-4 mt-2">
                <Input
                  placeholder="Search tasks…"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  aria-label="Filter checklist items"
                />
              </div>

              {/* Items */}
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={rootIds} strategy={verticalListSortingStrategy}>
                  {roots.map((item) => (
                    <ChecklistItemRow
                      key={item.id}
                      item={item}
                      depth={0}
                      allItems={checklist.items}
                      filteredIds={filteredIds}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </>
          )}

          {/* Add item — always visible */}
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 w-full justify-start text-[var(--text-faint)] hover:text-[var(--text-primary)]"
            onClick={async () => {
              if (onEnsureRecord) await onEnsureRecord()
              addItem(roots[roots.length - 1]?.id ?? null)
            }}
          >
            <Plus className="h-4 w-4" /> Add item
          </Button>

        </div>
      </div>
    </div>
  )
}
