import { getDb } from './db'
import type { Planner, Checklist } from './types'

// ─── Storage full error ───────────────────────────────────────────────────────

export class StorageFullError extends Error {
  constructor() {
    super('Browser storage is full. Export your work as PDF and delete old workspaces to free up space.')
    this.name = 'StorageFullError'
  }
}

function isQuotaError(err: unknown): boolean {
  if (!(err instanceof Error)) return false
  // QuotaExceededError is the standard; DOMException name varies by browser
  return (
    err.name === 'QuotaExceededError' ||
    err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    err.message.toLowerCase().includes('quota') ||
    err.message.toLowerCase().includes('storage')
  )
}

// ─── Planners ────────────────────────────────────────────────────────────────

export async function savePlanner(planner: Planner): Promise<void> {
  try {
    const db = await getDb()
    await db.put('planners', planner)
  } catch (err) {
    if (isQuotaError(err)) throw new StorageFullError()
    throw err
  }
}

export async function getPlanner(id: string): Promise<Planner | null> {
  const db = await getDb()
  return (await db.get('planners', id)) ?? null
}

export async function deletePlanner(id: string): Promise<void> {
  const db = await getDb()
  await db.delete('planners', id)
}

export async function getAllPlanners(): Promise<Planner[]> {
  const db = await getDb()
  const all = await db.getAll('planners')
  return all.sort((a, b) => b.lastModifiedAt.localeCompare(a.lastModifiedAt))
}

// ─── Checklists ──────────────────────────────────────────────────────────────

export async function saveChecklist(checklist: Checklist): Promise<void> {
  try {
    const db = await getDb()
    await db.put('checklists', checklist)
  } catch (err) {
    if (isQuotaError(err)) throw new StorageFullError()
    throw err
  }
}

export async function getChecklist(id: string): Promise<Checklist | null> {
  const db = await getDb()
  return (await db.get('checklists', id)) ?? null
}

export async function deleteChecklist(id: string): Promise<void> {
  const db = await getDb()
  await db.delete('checklists', id)
}

export async function getAllChecklists(): Promise<Checklist[]> {
  const db = await getDb()
  const all = await db.getAll('checklists')
  return all.sort((a, b) => b.lastModifiedAt.localeCompare(a.lastModifiedAt))
}
