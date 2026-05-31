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
      ? (() => {
          // Build old-id → new-id map first so parentId references stay valid
          const idMap = new Map<string, string>()
          for (const item of fromTemplate.checklistDefaults!.items) {
            idMap.set(item.id, generateId())
          }
          return fromTemplate.checklistDefaults!.items.map((item) => ({
            ...item,
            id: idMap.get(item.id)!,
            parentId: item.parentId ? (idMap.get(item.parentId) ?? null) : null,
          })) as unknown as Checklist['items']
        })()
      : [],
    createdAt: now,
    lastModifiedAt: now,
    lastOpenedAt: now,
  }
  await saveChecklist(checklist)
  return checklist
}

export { getChecklist, saveChecklist, deleteChecklist, getAllChecklists }
