import { getDb } from './db'
import type { Planner, Checklist } from './types'

// ─── Planners ────────────────────────────────────────────────────────────────

export async function savePlanner(planner: Planner): Promise<void> {
  const db = await getDb()
  await db.put('planners', planner)
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
  const db = await getDb()
  await db.put('checklists', checklist)
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
