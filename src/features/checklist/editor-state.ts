import { create } from 'zustand'
import { getChecklist, saveChecklist } from './checklist-store'
import {
  addItemAfter, addChildItem as addChildItemOp, removeItem, cycleItemStatus,
  indentItem, outdentItem, moveItem, toggleCollapse,
  computeProgress, filterItems, getRoots,
} from './tree-ops'
import type { Checklist, ChecklistProgress } from '@/features/storage/types'
import type { SaveStatus } from '@/components/ui/autosave-indicator'

interface ChecklistEditorState {
  checklist: Checklist | null
  focusedItemId: string | null
  filterQuery: string
  saveStatus: SaveStatus
  isDirty: boolean

  loadChecklist: (id: string) => Promise<void>
  addItem: (afterId: string | null) => void
  addChildItem: (parentId: string) => void
  removeItem: (id: string) => void
  updateItemText: (id: string, text: string) => void
  cycleStatus: (id: string) => void
  toggleItem: (id: string) => void
  indentItem: (id: string) => void
  outdentItem: (id: string) => void
  moveItem: (id: string, newIndex: number, newParentId: string | null) => void
  toggleCollapse: (id: string) => void
  setFilterQuery: (query: string) => void
  clearAll: () => void
  setMode: (mode: 'simple' | 'advanced') => void
  renameTitle: (title: string) => void
  setSaveStatus: (status: SaveStatus) => void
  getProgress: () => ChecklistProgress
  getFilteredIds: () => string[]
}

function now() { return new Date().toISOString() }

export const useChecklistEditor = create<ChecklistEditorState>((set, get) => ({
  checklist: null,
  focusedItemId: null,
  filterQuery: '',
  saveStatus: 'idle',
  isDirty: false,

  async loadChecklist(id) {
    const checklist = await getChecklist(id)
    if (checklist) set({ checklist, isDirty: false })
  },

  addItem(afterId) {
    const { checklist } = get()
    if (!checklist) return
    const sibling = afterId ? checklist.items.find((i) => i.id === afterId) : null
    const parentId = sibling?.parentId ?? null
    const newItems = addItemAfter(checklist.items, afterId, parentId)
    const newItem = newItems.find((i) => !checklist.items.some((old) => old.id === i.id))
    set({
      checklist: { ...checklist, items: newItems, lastModifiedAt: now() },
      focusedItemId: newItem?.id ?? null,
      isDirty: true,
    })
  },

  addChildItem(parentId) {
    const { checklist } = get()
    if (!checklist) return
    const before = checklist.items.length
    const newItems = addChildItemOp(checklist.items, parentId)
    const newItem = newItems.find((i) => !checklist.items.some((old) => old.id === i.id))
    set({
      checklist: { ...checklist, items: newItems, lastModifiedAt: now() },
      focusedItemId: newItem?.id ?? null,
      isDirty: true,
    })
  },

  removeItem(id) {
    const { checklist } = get()
    if (!checklist) return
    set({
      checklist: { ...checklist, items: removeItem(checklist.items, id), lastModifiedAt: now() },
      isDirty: true,
    })
  },

  updateItemText(id, text) {
    const { checklist } = get()
    if (!checklist) return
    set({
      checklist: { ...checklist, items: checklist.items.map((i) => i.id === id ? { ...i, text } : i), lastModifiedAt: now() },
      isDirty: true,
    })
  },

  // Cycle status on the item → propagates down then up
  cycleStatus(id) {
    const { checklist } = get()
    if (!checklist) return
    set({
      checklist: { ...checklist, items: cycleItemStatus(checklist.items, id), lastModifiedAt: now() },
      isDirty: true,
    })
  },

  // toggleItem = same as cycleStatus (used by DnD and legacy calls)
  toggleItem(id) {
    const { checklist } = get()
    if (!checklist) return
    set({
      checklist: { ...checklist, items: cycleItemStatus(checklist.items, id), lastModifiedAt: now() },
      isDirty: true,
    })
  },

  indentItem(id) {
    const { checklist } = get()
    if (!checklist || checklist.mode !== 'advanced') return
    set({
      checklist: { ...checklist, items: indentItem(checklist.items, id), lastModifiedAt: now() },
      isDirty: true,
    })
  },

  outdentItem(id) {
    const { checklist } = get()
    if (!checklist || checklist.mode !== 'advanced') return
    set({
      checklist: { ...checklist, items: outdentItem(checklist.items, id), lastModifiedAt: now() },
      isDirty: true,
    })
  },

  moveItem(id, newIndex, newParentId) {
    const { checklist } = get()
    if (!checklist) return
    set({
      checklist: { ...checklist, items: moveItem(checklist.items, id, newIndex, newParentId), lastModifiedAt: now() },
      isDirty: true,
    })
  },

  toggleCollapse(id) {
    const { checklist } = get()
    if (!checklist) return
    set({ checklist: { ...checklist, items: toggleCollapse(checklist.items, id) } })
  },

  clearAll() {
    const { checklist } = get()
    if (!checklist) return
    set({ checklist: { ...checklist, items: [], lastModifiedAt: now() }, isDirty: true })
  },

  setFilterQuery(query) { set({ filterQuery: query }) },

  setMode(mode) {
    const { checklist } = get()
    if (!checklist) return
    set({ checklist: { ...checklist, mode, lastModifiedAt: now() }, isDirty: true })
  },

  renameTitle(title) {
    const { checklist } = get()
    if (!checklist) return
    set({ checklist: { ...checklist, title, lastModifiedAt: now() }, isDirty: true })
  },

  setSaveStatus(status) { set({ saveStatus: status }) },

  getProgress() {
    return computeProgress(get().checklist?.items ?? [])
  },

  getFilteredIds() {
    const { checklist, filterQuery } = get()
    return filterItems(checklist?.items ?? [], filterQuery)
  },
}))
