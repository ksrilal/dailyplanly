'use client'

import { useState, useRef } from 'react'
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Plus, Search, X } from 'lucide-react'
import { useChecklistEditor } from '@/features/checklist/editor-state'
import { ChecklistProgressBar } from './progress-bar'
import { ChecklistToolbar } from './checklist-toolbar'
import { ChecklistBgAnimation } from './checklist-bg-animation'
import { ChecklistPreviewAnimation } from './checklist-preview-animation'
import { ChecklistPrintView } from './checklist-print-view'
import { ChecklistItemGroup } from './checklist-item'

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
  const addItemWithText = useChecklistEditor((s) => s.addItemWithText)
  const moveItem = useChecklistEditor((s) => s.moveItem)
  const reorderItem = useChecklistEditor((s) => s.reorderItem)
  const getFilteredIds = useChecklistEditor((s) => s.getFilteredIds)

  const [newText, setNewText] = useState('')
  const addInputRef = useRef<HTMLInputElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const allItems = checklist?.items ?? []
  const roots = allItems.filter((i) => i.parentId === null).sort((a, b) => a.order - b.order)
  const filteredIds = checklist ? getFilteredIds() : undefined
  const hasItems = allItems.length > 0
  const mode = checklist?.mode ?? 'simple'
  const isFiltering = !!filterQuery.trim()

  /**
   * Unified drag handler — works for any sibling group at any depth.
   * Finds which parent group the dragged item belongs to and reorders
   * only within that group, keeping children attached.
   */
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    reorderItem(active.id as string, over.id as string)
  }

  async function handleAddItem() {
    if (onEnsureRecord) await onEnsureRecord()
    const lastRoot = roots[roots.length - 1]
    if (newText.trim()) {
      addItemWithText(newText.trim(), lastRoot?.id ?? null)
    } else {
      addItem(lastRoot?.id ?? null)
    }
    setNewText('')
    addInputRef.current?.focus()
  }

  async function handleAddInputSubmit() {
    if (!newText.trim()) return
    if (onEnsureRecord) await onEnsureRecord()
    const lastRoot = roots[roots.length - 1]
    addItemWithText(newText.trim(), lastRoot?.id ?? null)
    setNewText('')
    addInputRef.current?.focus()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] relative overflow-hidden">

      {/* Background animation */}
      <ChecklistBgAnimation />

      {/* Toolbar */}
      <div className="checklist-toolbar relative z-10 flex-shrink-0 border-b border-[var(--border)] bg-[var(--bg-surface)]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          <ChecklistToolbar onExport={onExport} onClear={onClear} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">

          {/* Search — only when items exist */}
          {hasItems && (
            <div className="flex items-center gap-2 mb-3 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-sm px-3 py-2">
              <Search className="h-4 w-4 text-[var(--text-faint)] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search tasks…"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                aria-label="Filter checklist items"
                className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-none"
              />
              {isFiltering && (
                <button onClick={() => setFilterQuery('')} className="flex-shrink-0 text-[var(--text-faint)] hover:text-[var(--text-primary)] transition-colors" aria-label="Clear search">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Progress */}
          {hasItems && <div className="mb-4"><ChecklistProgressBar /></div>}

          {/* Empty state */}
          {!hasItems && (
            <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
              <div className="w-full max-w-md bg-[var(--bg-surface)]/80 backdrop-blur-md rounded-2xl border border-[var(--border)] shadow-[var(--shadow-lg)] p-8">
                <ChecklistPreviewAnimation mode={mode} />
              </div>
            </div>
          )}

          {/* Items — DndContext wraps all levels; each sibling group has its own SortableContext */}
          {hasItems && checklist && (
            <>
              {isFiltering && (
                <p className="text-xs text-[var(--text-faint)] mb-3">
                  {filteredIds?.length ?? 0} result{filteredIds?.length !== 1 ? 's' : ''} for "<span className="text-[var(--text-muted)]">{filterQuery}</span>"
                </p>
              )}
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                {/* Root-level group — children recursively create their own SortableContexts */}
                <ChecklistItemGroup
                  parentId={null}
                  allItems={checklist.items}
                  depth={0}
                  filteredIds={isFiltering ? filteredIds : undefined}
                />
              </DndContext>
            </>
          )}

          {/* Add item input */}
          {!isFiltering && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[var(--border)] hover:border-[var(--color-accent)]/40 bg-transparent hover:bg-[var(--bg-subtle)]/50 transition-all duration-200">
                <Plus className="h-4 w-4 text-[var(--text-faint)] flex-shrink-0" />
                <input
                  ref={addInputRef}
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onKeyDown={async (e) => { if (e.key === 'Enter') { e.preventDefault(); await handleAddInputSubmit() } }}
                  placeholder={hasItems ? 'Type a task and press Enter…' : 'Add your first item…'}
                  className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-none"
                />
              </div>
              <button
                onClick={handleAddItem}
                className="flex-shrink-0 px-3 py-2 rounded-lg text-xs font-semibold text-[var(--text-faint)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] border border-[var(--border)] hover:border-[var(--color-accent)]/30 transition-all duration-150"
              >
                Add item
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Print-only view */}
      <ChecklistPrintView />
    </div>
  )
}
