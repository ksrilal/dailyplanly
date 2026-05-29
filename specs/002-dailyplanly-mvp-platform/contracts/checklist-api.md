# Contract: Checklist API

**Type**: Internal TypeScript module interfaces
**Consumer**: Checklist editor pages, export system, template system
**Date**: 2026-05-28

---

## ChecklistStore

```typescript
interface ChecklistStore {
  createChecklist(fromTemplate?: Template): Promise<Checklist>
  getChecklist(id: string): Promise<Checklist | null>
  saveChecklist(checklist: Checklist): Promise<void>
  deleteChecklist(id: string): Promise<void>
  listChecklists(): Promise<Checklist[]>
}
```

## ChecklistTreeOps

Pure functions — no side effects, no storage calls.

```typescript
interface ChecklistTreeOps {
  // Build tree structure from flat array
  buildTree(items: ChecklistItem[]): ChecklistTreeNode[]

  // Flatten tree back to flat array (maintains order)
  flattenTree(tree: ChecklistTreeNode[]): ChecklistItem[]

  // Add a new item after a given sibling (or as root if siblingId is null)
  addItemAfter(items: ChecklistItem[], siblingId: string | null): ChecklistItem[]

  // Remove an item and all its children
  removeItem(items: ChecklistItem[], id: string): ChecklistItem[]

  // Toggle checked state of an item
  toggleItem(items: ChecklistItem[], id: string): ChecklistItem[]

  // Indent an item (make it a child of the previous sibling)
  indentItem(items: ChecklistItem[], id: string): ChecklistItem[]

  // Outdent an item (move it up one level)
  outdentItem(items: ChecklistItem[], id: string): ChecklistItem[]

  // Move an item to a new position (for drag-and-drop)
  moveItem(items: ChecklistItem[], id: string, newIndex: number, newParentId: string | null): ChecklistItem[]

  // Toggle collapse state (Advanced mode only)
  toggleCollapse(items: ChecklistItem[], id: string): ChecklistItem[]

  // Compute progress statistics
  computeProgress(items: ChecklistItem[]): ChecklistProgress

  // Filter items by query string (returns matching item IDs)
  filterItems(items: ChecklistItem[], query: string): string[]
}
```

## ChecklistEditorState (Zustand slice)

```typescript
interface ChecklistEditorState {
  checklist: Checklist | null
  focusedItemId: string | null
  filterQuery: string
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  isDirty: boolean

  // Actions
  loadChecklist(id: string): Promise<void>
  addItem(afterId: string | null): void
  removeItem(id: string): void
  updateItemText(id: string, text: string): void
  toggleItem(id: string): void
  indentItem(id: string): void
  outdentItem(id: string): void
  moveItem(id: string, newIndex: number, newParentId: string | null): void
  toggleCollapse(id: string): void
  setFilterQuery(query: string): void
  setMode(mode: 'simple' | 'advanced'): void
}
```
