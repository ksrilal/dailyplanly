'use client'

import { useRef, useEffect, useState } from 'react'
import {
  ChevronDown, ChevronRight, GripVertical, Trash2, Copy, X,
  Pencil, Plus, ArrowRight, ArrowLeft,
} from 'lucide-react'
import {
  SortableContext, verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useChecklistEditor } from '@/features/checklist/editor-state'
import { getChildren, getPrevSibling, isFirstAmongSiblings, MAX_DEPTH } from '@/features/checklist/tree-ops'
import { cn } from '@/lib/utils'
import type { ChecklistItem as Item, ChecklistItemStatus } from '@/features/storage/types'

// ─── Re-export the group wrapper used by checklist-layout ────────────────────

interface ChecklistGroupProps {
  parentId: string | null
  allItems: Item[]
  depth?: number
  filteredIds?: string[]
}

/**
 * Renders a group of sibling items at the same parent level,
 * each wrapped in their own SortableContext so drag-and-drop
 * stays within the same sibling group.
 */
export function ChecklistItemGroup({ parentId, allItems, depth = 0, filteredIds }: ChecklistGroupProps) {
  const siblings = allItems
    .filter((i) => i.parentId === parentId)
    .sort((a, b) => a.order - b.order)

  if (siblings.length === 0) return null

  const siblingIds = siblings.map((s) => s.id)

  return (
    <SortableContext items={siblingIds} strategy={verticalListSortingStrategy}>
      {siblings.map((item) => {
        if (filteredIds && !filteredIds.includes(item.id)) return null
        return (
          <ChecklistItemRow
            key={item.id}
            item={item}
            depth={depth}
            allItems={allItems}
            filteredIds={filteredIds}
          />
        )
      })}
    </SortableContext>
  )
}

// ─── Status button ────────────────────────────────────────────────────────────

function StatusButton({ item }: { item: Item }) {
  const cycleStatus = useChecklistEditor((s) => s.cycleStatus)
  const status: ChecklistItemStatus = item.status ?? (item.checked ? 'checked' : 'unchecked')
  return (
    <button
      onClick={() => cycleStatus(item.id)}
      className={cn(
        'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 cursor-pointer hover:scale-110',
        status === 'unchecked' && 'border-[var(--border)] bg-transparent hover:border-[var(--color-accent)]/70',
        status === 'checked'   && 'border-emerald-500 bg-emerald-500',
        status === 'invalid'   && 'border-red-400 bg-red-400/15',
      )}
      title={status === 'unchecked' ? 'Mark checked' : status === 'checked' ? 'Mark invalid' : 'Clear status'}
    >
      {status === 'checked' && (
        <svg viewBox="0 0 10 10" className="w-3 h-3">
          <polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {status === 'invalid' && <X className="h-3 w-3 text-red-400" strokeWidth={2.5} />}
    </button>
  )
}

// ─── Action button helper ─────────────────────────────────────────────────────

function ActionBtn({
  onClick, icon: Icon, title, enabled = true, danger = false, accent = false,
}: {
  onClick: () => void
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  enabled?: boolean
  danger?: boolean
  accent?: boolean
}) {
  return (
    <button
      onClick={enabled ? onClick : undefined}
      title={title}
      className={cn(
        'flex items-center justify-center w-7 h-7 rounded-md transition-all duration-100 cursor-pointer',
        enabled && !danger && !accent && 'text-[var(--text-faint)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]',
        enabled && danger && 'text-[var(--text-faint)] hover:text-red-400 hover:bg-red-500/10',
        enabled && accent && 'text-[var(--text-faint)] hover:text-emerald-400 hover:bg-emerald-500/10',
        !enabled && 'text-[var(--text-faint)]/20 cursor-not-allowed',
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
    </button>
  )
}

// ─── Row ──────────────────────────────────────────────────────────────────────

interface ChecklistItemProps {
  item: Item
  depth?: number
  allItems: Item[]
  filteredIds?: string[]
}

function ChecklistItemRow({ item, depth = 0, allItems, filteredIds }: ChecklistItemProps) {
  const mode = useChecklistEditor((s) => s.checklist?.mode)
  const focusedItemId = useChecklistEditor((s) => s.focusedItemId)
  const updateItemText = useChecklistEditor((s) => s.updateItemText)
  const toggleCollapse = useChecklistEditor((s) => s.toggleCollapse)
  const addItem = useChecklistEditor((s) => s.addItem)
  const addChildItem = useChecklistEditor((s) => s.addChildItem)
  const removeItem = useChecklistEditor((s) => s.removeItem)
  const indentItem = useChecklistEditor((s) => s.indentItem)
  const outdentItem = useChecklistEditor((s) => s.outdentItem)

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const viewRef = useRef<HTMLSpanElement>(null)
  const editRef = useRef<HTMLInputElement>(null)

  const children = getChildren(allItems, item.id)
  const hasChildren = children.length > 0

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })

  useEffect(() => {
    if (focusedItemId === item.id && !editing) viewRef.current?.focus()
  }, [focusedItemId, item.id, editing])

  useEffect(() => {
    if (editing) { editRef.current?.focus(); editRef.current?.select() }
  }, [editing])

  const style = { transform: CSS.Transform.toString(transform), transition }
  const status: ChecklistItemStatus = item.status ?? (item.checked ? 'checked' : 'unchecked')
  const isAdvanced = mode === 'advanced'
  const isFirst = isFirstAmongSiblings(allItems, item.id)
  const prevSibling = getPrevSibling(allItems, item.id)
  const canIndent = isAdvanced && !isFirst && !!prevSibling && depth < MAX_DEPTH
  const canOutdent = isAdvanced && item.parentId !== null
  const canAddChild = isAdvanced && depth < MAX_DEPTH

  function startEdit() { setDraft(item.text); setEditing(true) }
  function commitEdit() { updateItemText(item.id, draft.trim() || item.text); setEditing(false) }
  function cancelEdit() { setEditing(false) }

  async function copyToClipboard() {
    if (!item.text) return
    try { await navigator.clipboard.writeText(item.text) } catch {}
  }

  return (
    // setNodeRef on the outer wrapper so the entire row + its children move together
    <div ref={setNodeRef} style={{ ...style, opacity: isDragging ? 0.4 : 1 }}>
      <div
        className={cn(
          'checklist-item group flex items-center gap-2 py-2.5 pr-2 rounded-lg transition-colors cursor-default',
          editing ? 'bg-[var(--bg-subtle)]' : 'hover:bg-[var(--bg-subtle)]',
        )}
        style={{ paddingLeft: `${10 + depth * 24}px` }}
      >
        {/* Drag handle — only activates drag, doesn't move children */}
        <div
          {...attributes}
          {...listeners}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-[var(--text-faint)] hover:text-[var(--text-muted)]"
          title="Drag to reorder within same level"
        >
          <GripVertical className="h-4 w-4" />
        </div>

        {/* Collapse toggle (advanced) */}
        {isAdvanced && (
          <button
            onClick={() => hasChildren && toggleCollapse(item.id)}
            className={cn('flex-shrink-0 text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors cursor-pointer', !hasChildren && 'invisible')}
          >
            {item.collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}

        {/* Status checkbox */}
        <StatusButton item={item} />

        {/* Text */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              ref={editRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); commitEdit() }
                if (e.key === 'Escape') { e.preventDefault(); cancelEdit() }
              }}
              className="w-full bg-transparent text-sm border-b-2 border-[var(--color-accent)] focus:outline-none py-0.5 text-[var(--text-primary)] font-medium"
            />
          ) : (
            <span
              ref={viewRef}
              tabIndex={0}
              onDoubleClick={startEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); addItem(item.id) }
                if (e.key === 'Backspace' && item.text === '') { e.preventDefault(); removeItem(item.id) }
                if (e.key === 'Tab') {
                  e.preventDefault()
                  if (!e.shiftKey && canIndent) indentItem(item.id)
                  else if (e.shiftKey && canOutdent) outdentItem(item.id)
                }
              }}
              className={cn(
                'block w-full text-sm font-medium py-0.5 focus:outline-none cursor-text select-none',
                status === 'checked'   && 'line-through text-[var(--text-faint)]',
                status === 'invalid'   && 'line-through text-red-400/70',
                status === 'unchecked' && 'text-[var(--text-primary)]',
                !item.text && 'text-[var(--text-faint)] italic',
              )}
            >
              {item.text || 'Empty item'}
            </span>
          )}
        </div>

        {/* Actions */}
        {!editing && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            {isAdvanced && (
              <>
                <ActionBtn onClick={() => outdentItem(item.id)} icon={ArrowLeft} title={canOutdent ? 'Outdent' : 'Already at root'} enabled={canOutdent} />
                <ActionBtn onClick={() => indentItem(item.id)} icon={ArrowRight} title={canIndent ? 'Indent' : depth >= MAX_DEPTH ? 'Max depth reached' : 'No item above to indent under'} enabled={canIndent} />
                <ActionBtn onClick={() => addChildItem(item.id)} icon={Plus} title={canAddChild ? 'Add child item' : 'Max depth reached'} enabled={canAddChild} accent />
                <div className="w-px h-4 bg-[var(--border)] mx-0.5" />
              </>
            )}
            <ActionBtn onClick={startEdit} icon={Pencil} title="Edit (or double-click)" />
            <ActionBtn onClick={copyToClipboard} icon={Copy} title="Copy text to clipboard" />
            <ActionBtn onClick={() => removeItem(item.id)} icon={Trash2} title="Delete" danger />
          </div>
        )}
        {editing && (
          <span className="text-[10px] text-[var(--text-faint)] flex-shrink-0 pr-2 select-none">Enter to save · Esc to cancel</span>
        )}
      </div>

      {/* Children — each level gets its own SortableContext */}
      {!item.collapsed && hasChildren && (
        <ChecklistItemGroup
          parentId={item.id}
          allItems={allItems}
          depth={depth + 1}
          filteredIds={filteredIds}
        />
      )}
    </div>
  )
}

export { ChecklistItemRow }
