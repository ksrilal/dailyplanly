import { savePlanner, getPlanner, deletePlanner, getAllPlanners } from '@/features/storage/workspace-db'
import { generateId } from '@/lib/utils'
import type { Planner, PlannerTheme, PaperSize } from '@/features/storage/types'
import type { Template } from '@/features/templates/types'

export async function createPlanner(fromTemplate?: Template): Promise<Planner> {
  const now = new Date().toISOString()
  const planner: Planner = {
    id: generateId(),
    title: fromTemplate?.title ?? 'My Planner',
    theme: (fromTemplate?.plannerDefaults?.theme ?? 'minimal') as PlannerTheme,
    paperSize: fromTemplate?.plannerDefaults?.paperSize ?? 'A4',
    orientation: fromTemplate?.plannerDefaults?.orientation ?? 'portrait',
    blocks: fromTemplate?.plannerDefaults?.blocks
      ? fromTemplate.plannerDefaults.blocks.map((b, i) => ({ ...b, id: generateId(), order: i })) as unknown as Planner['blocks']
      : [],
    createdAt: now,
    lastModifiedAt: now,
    lastOpenedAt: now,
  }
  await savePlanner(planner)
  return planner
}

export { getPlanner, savePlanner, deletePlanner, getAllPlanners }
