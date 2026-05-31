import type React from 'react'
import type { PlannerBlockType, PlannerBlock, PlannerBlockContent } from '@/features/storage/types'
import { generateId } from '@/lib/utils'

export interface BlockEditorProps {
  block: PlannerBlock
  onChange: (content: PlannerBlockContent) => void
}

export interface BlockPreviewProps {
  block: PlannerBlock
}

export interface BlockPrintProps {
  block: PlannerBlock
}

export interface BlockRegistryEntry {
  type: PlannerBlockType
  label: string
  icon: string
  defaultContent: PlannerBlockContent
  EditorComponent: React.ComponentType<BlockEditorProps>
  PreviewComponent: React.ComponentType<BlockPreviewProps>
  PrintComponent: React.ComponentType<BlockPrintProps>
}

const registry = new Map<PlannerBlockType, BlockRegistryEntry>()

export const BlockRegistry = {
  register(entry: BlockRegistryEntry): void {
    registry.set(entry.type, entry)
  },
  get(type: PlannerBlockType): BlockRegistryEntry {
    const entry = registry.get(type)
    if (!entry) throw new Error(`Block type not registered: ${type}`)
    return entry
  },
  getAll(): BlockRegistryEntry[] {
    return Array.from(registry.values())
  },
  has(type: PlannerBlockType): boolean {
    return registry.has(type)
  },
  createBlock(type: PlannerBlockType): PlannerBlock {
    const entry = BlockRegistry.get(type)
    return {
      id: generateId(),
      type,
      label: entry.label,
      content: { ...entry.defaultContent },
      width: 'full',
      order: 0,
    }
  },
}
