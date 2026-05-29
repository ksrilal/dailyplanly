# Contract: Planner API

**Type**: Internal TypeScript module interfaces
**Consumer**: Planner editor pages, export system, template system
**Date**: 2026-05-28

---

## BlockRegistry

```typescript
interface BlockRegistry {
  // Register a block type (called at module init time)
  register(entry: BlockRegistryEntry): void

  // Get a registered block entry by type
  get(type: PlannerBlockType): BlockRegistryEntry

  // Get all registered block types (for block palette)
  getAll(): BlockRegistryEntry[]

  // Check if a type is registered
  has(type: PlannerBlockType): boolean

  // Create a new block instance with default content
  createBlock(type: PlannerBlockType): PlannerBlock
}
```

## PlannerStore

```typescript
interface PlannerStore {
  createPlanner(fromTemplate?: Template): Promise<Planner>
  getPlanner(id: string): Promise<Planner | null>
  savePlanner(planner: Planner): Promise<void>
  deletePlanner(id: string): Promise<void>
  listPlanners(): Promise<Planner[]>
}
```

## PlannerEditorState (Zustand slice)

```typescript
interface PlannerEditorState {
  planner: Planner | null
  selectedBlockId: string | null
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  isDirty: boolean

  // Actions
  loadPlanner(id: string): Promise<void>
  addBlock(type: PlannerBlockType): void
  removeBlock(id: string): void
  updateBlockContent(id: string, content: PlannerBlockContent): void
  reorderBlocks(newOrder: string[]): void           // array of block IDs in new order
  setTheme(theme: PlannerTheme): void
  selectBlock(id: string | null): void
  renameBlock(id: string, label: string): void
  setBlockWidth(id: string, width: 'full' | 'half'): void
}
```

## PlannerThemeTokens

```typescript
interface PlannerThemeTokens {
  '--planner-bg': string
  '--planner-surface': string
  '--planner-text': string
  '--planner-text-muted': string
  '--planner-accent': string
  '--planner-border': string
  '--planner-font-heading': string
  '--planner-font-body': string
  '--planner-radius': string
}

type ThemeMap = Record<PlannerTheme, PlannerThemeTokens>
```
