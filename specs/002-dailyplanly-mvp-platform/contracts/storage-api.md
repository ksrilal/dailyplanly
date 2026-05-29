# Contract: Storage & State API

**Type**: Internal TypeScript module interfaces
**Consumer**: All feature modules
**Date**: 2026-05-28

---

## WorkspaceDb

Thin wrapper around idb for both planners and checklists.

```typescript
interface WorkspaceDb {
  // Planners
  savePlanner(planner: Planner): Promise<void>
  getPlanner(id: string): Promise<Planner | null>
  deletePlanner(id: string): Promise<void>
  getAllPlanners(): Promise<Planner[]>

  // Checklists
  saveChecklist(checklist: Checklist): Promise<void>
  getChecklist(id: string): Promise<Checklist | null>
  deleteChecklist(id: string): Promise<void>
  getAllChecklists(): Promise<Checklist[]>

  // Schema migration
  runMigrations(): Promise<void>
}
```

## RecentsStore

```typescript
interface RecentsStore {
  getRecents(): RecentsEntry[]
  recordOpen(workspace: Planner | Checklist, type: 'planner' | 'checklist'): void
  removeFromRecents(workspaceId: string): void
  clearRecents(): void
}
```

## AutoSaveHook

```typescript
interface UseAutoSaveOptions {
  debounceMs?: number             // default 800
  onSave?: () => void
  onError?: (error: Error) => void
}

// Returns save status for UI indicator
function useAutoSave(
  data: Planner | Checklist | null,
  saveFn: (data: Planner | Checklist) => Promise<void>,
  options?: UseAutoSaveOptions
): { status: 'idle' | 'saving' | 'saved' | 'error' }
```

## Error Types

```typescript
class WorkspaceNotFoundError extends Error {
  workspaceId: string
  workspaceType: 'planner' | 'checklist'
}

class StorageQuotaExceededError extends Error {
  evictedWorkspaceId: string
}
```
