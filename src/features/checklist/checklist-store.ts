import { saveChecklist, getChecklist, deleteChecklist, getAllChecklists } from '@/features/storage/workspace-db'
import { generateId } from '@/lib/utils'
import type { Checklist } from '@/features/storage/types'
import type { Template } from '@/features/templates/types'

export async function createChecklist(fromTemplate?: Template): Promise<Checklist> {
  const now = new Date().toISOString()
  const checklist: Checklist = {
    id: generateId(),
    title: fromTemplate?.title ?? 'My Checklist',
    mode: fromTemplate?.checklistDefaults?.mode ?? 'simple',
    items: fromTemplate?.checklistDefaults?.items
      ? fromTemplate.checklistDefaults.items.map((item) => ({ ...item, id: generateId() }))
      : [],
    createdAt: now,
    lastModifiedAt: now,
    lastOpenedAt: now,
  }
  await saveChecklist(checklist)
  return checklist
}

export { getChecklist, saveChecklist, deleteChecklist, getAllChecklists }
