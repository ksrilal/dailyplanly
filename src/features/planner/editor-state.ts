import { create } from 'zustand'
import { getPlanner, savePlanner } from './planner-store'
import { BlockRegistry } from './block-registry'
import { generateId } from '@/lib/utils'
import type { Planner, PlannerBlock, PlannerBlockContent, PlannerBlockType, PlannerTheme, PaperSize } from '@/features/storage/types'
import type { SaveStatus } from '@/components/ui/autosave-indicator'

interface PlannerEditorState {
  planner: Planner | null
  selectedBlockId: string | null
  saveStatus: SaveStatus
  isDirty: boolean

  loadPlanner: (id: string) => Promise<void>
  addBlock: (type: PlannerBlockType) => void
  removeBlock: (id: string) => void
  updateBlockContent: (id: string, content: PlannerBlockContent) => void
  reorderBlocks: (newOrder: string[]) => void
  setTheme: (theme: PlannerTheme) => void
  setPaperSize: (size: PaperSize) => void
  selectBlock: (id: string | null) => void
  renameBlock: (id: string, label: string) => void
  setBlockWidth: (id: string, width: 'full' | 'half') => void
  clearAll: () => void
  renameTitle: (title: string) => void
  setSaveStatus: (status: SaveStatus) => void
}

export const usePlannerEditor = create<PlannerEditorState>((set, get) => ({
  planner: null,
  selectedBlockId: null,
  saveStatus: 'idle',
  isDirty: false,

  async loadPlanner(id) {
    const planner = await getPlanner(id)
    if (planner) {
      set({ planner, isDirty: false })
    }
  },

  addBlock(type) {
    const { planner } = get()
    if (!planner) return
    const newBlock: PlannerBlock = {
      ...BlockRegistry.createBlock(type),
      order: planner.blocks.length,
    }
    set({
      planner: {
        ...planner,
        blocks: [...planner.blocks, newBlock],
        lastModifiedAt: new Date().toISOString(),
      },
      selectedBlockId: newBlock.id,
      isDirty: true,
    })
  },

  removeBlock(id) {
    const { planner } = get()
    if (!planner) return
    set({
      planner: {
        ...planner,
        blocks: planner.blocks.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i })),
        lastModifiedAt: new Date().toISOString(),
      },
      selectedBlockId: null,
      isDirty: true,
    })
  },

  updateBlockContent(id, content) {
    const { planner } = get()
    if (!planner) return
    set({
      planner: {
        ...planner,
        blocks: planner.blocks.map((b) => b.id === id ? { ...b, content } : b),
        lastModifiedAt: new Date().toISOString(),
      },
      isDirty: true,
    })
  },

  reorderBlocks(newOrder) {
    const { planner } = get()
    if (!planner) return
    const blockMap = new Map(planner.blocks.map((b) => [b.id, b]))
    const reordered = newOrder
      .map((id, i) => blockMap.get(id) ? { ...blockMap.get(id)!, order: i } : null)
      .filter(Boolean) as PlannerBlock[]
    set({
      planner: { ...planner, blocks: reordered, lastModifiedAt: new Date().toISOString() },
      isDirty: true,
    })
  },

  setTheme(theme) {
    const { planner } = get()
    if (!planner) return
    set({ planner: { ...planner, theme, lastModifiedAt: new Date().toISOString() }, isDirty: true })
  },

  setPaperSize(paperSize) {
    const { planner } = get()
    if (!planner) return
    set({ planner: { ...planner, paperSize, lastModifiedAt: new Date().toISOString() }, isDirty: true })
  },

  selectBlock(id) {
    set({ selectedBlockId: id })
  },

  renameBlock(id, label) {
    const { planner } = get()
    if (!planner) return
    set({
      planner: {
        ...planner,
        blocks: planner.blocks.map((b) => b.id === id ? { ...b, label } : b),
        lastModifiedAt: new Date().toISOString(),
      },
      isDirty: true,
    })
  },

  setBlockWidth(id, width) {
    const { planner } = get()
    if (!planner) return
    set({
      planner: {
        ...planner,
        blocks: planner.blocks.map((b) => b.id === id ? { ...b, width } : b),
        lastModifiedAt: new Date().toISOString(),
      },
      isDirty: true,
    })
  },

  clearAll() {
    const { planner } = get()
    if (!planner) return
    set({
      planner: { ...planner, blocks: [], lastModifiedAt: new Date().toISOString() },
      selectedBlockId: null,
      isDirty: true,
    })
  },

  renameTitle(title) {
    const { planner } = get()
    if (!planner) return
    set({ planner: { ...planner, title, lastModifiedAt: new Date().toISOString() }, isDirty: true })
  },

  setSaveStatus(status) {
    set({ saveStatus: status })
  },
}))
