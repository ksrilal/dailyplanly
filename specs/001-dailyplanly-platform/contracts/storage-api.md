# Contract: Storage API

**Type**: Internal TypeScript module interface
**Consumer**: All feature modules (editor, templates, tools, recents)
**Date**: 2026-05-28

---

## WorkspaceStore

```typescript
interface WorkspaceStore {
  // Create a new workspace from a template
  createWorkspace(templateId: string, title?: string): Promise<Workspace>

  // Load a workspace by ID
  getWorkspace(id: string): Promise<Workspace | null>

  // Save workspace content (called by auto-save, debounced)
  saveWorkspace(id: string, content: WorkspaceContent): Promise<void>

  // Update workspace title
  renameWorkspace(id: string, title: string): Promise<void>

  // Delete a workspace and remove from recents
  deleteWorkspace(id: string): Promise<void>

  // List all workspaces, ordered by lastModifiedAt desc
  listWorkspaces(): Promise<Workspace[]>

  // Get workspaces for a specific template
  getWorkspacesByTemplate(templateId: string): Promise<Workspace[]>

  // Run schema migration if template schema version has changed
  migrateWorkspace(id: string, toSchemaVersion: number): Promise<Workspace>
}
```

## RecentsStore

```typescript
interface RecentsStore {
  // Get recent workspaces (max 10, ordered by lastOpenedAt desc)
  getRecents(): RecentsEntry[]

  // Record a workspace open event (upserts entry, evicts oldest if over limit)
  recordOpen(workspace: Workspace, template: Template): void

  // Remove a workspace from recents
  removeFromRecents(workspaceId: string): void

  // Clear all recents
  clearRecents(): void
}
```

## SettingsStore

```typescript
interface SettingsStore {
  getTheme(): 'light' | 'dark' | 'system'
  setTheme(theme: 'light' | 'dark' | 'system'): void
}
```

---

## Error Contracts

```typescript
class StorageQuotaExceededError extends Error {
  evictedWorkspaceId: string  // the workspace that was evicted to recover space
}

class WorkspaceNotFoundError extends Error {
  workspaceId: string
}

class SchemaMigrationError extends Error {
  workspaceId: string
  fromVersion: number
  toVersion: number
}
```
