import { STORAGE_KEYS, MAX_RECENTS } from '@/lib/constants'
import type { RecentsEntry, Planner, Checklist } from './types'

function readRecents(): RecentsEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENTS)
    return raw ? (JSON.parse(raw) as RecentsEntry[]) : []
  } catch {
    return []
  }
}

function writeRecents(entries: RecentsEntry[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify(entries))
}

export function getRecents(): RecentsEntry[] {
  return readRecents().sort((a, b) => b.lastOpenedAt.localeCompare(a.lastOpenedAt))
}

export function recordOpen(workspace: Planner | Checklist, type: 'planner' | 'checklist'): void {
  const entries = readRecents().filter((e) => e.workspaceId !== workspace.id)
  const preview =
    type === 'planner'
      ? (workspace as Planner).blocks[0]?.label ?? ''
      : (workspace as Checklist).items[0]?.text ?? ''

  const entry: RecentsEntry = {
    workspaceId: workspace.id,
    workspaceType: type,
    checklistMode: type === 'checklist' ? (workspace as Checklist).mode : undefined,
    title: workspace.title,
    lastOpenedAt: new Date().toISOString(),
    previewSnapshot: preview,
  }

  const updated = [entry, ...entries].slice(0, MAX_RECENTS)
  writeRecents(updated)
}

export function removeFromRecents(workspaceId: string): void {
  writeRecents(readRecents().filter((e) => e.workspaceId !== workspaceId))
}

export function clearRecents(): void {
  writeRecents([])
}
