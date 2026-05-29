import { openDB, type IDBPDatabase } from 'idb'
import { DB_NAME, DB_VERSION } from '@/lib/constants'
import type { Planner, Checklist } from './types'

interface DailyPlanlyDB {
  planners: {
    key: string
    value: Planner
    indexes: {
      lastModifiedAt: string
      lastOpenedAt: string
    }
  }
  checklists: {
    key: string
    value: Checklist
    indexes: {
      lastModifiedAt: string
      lastOpenedAt: string
    }
  }
}

let _db: IDBPDatabase<DailyPlanlyDB> | null = null

export async function getDb(): Promise<IDBPDatabase<DailyPlanlyDB>> {
  if (_db) return _db

  _db = await openDB<DailyPlanlyDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('planners')) {
        const plannerStore = db.createObjectStore('planners', { keyPath: 'id' })
        plannerStore.createIndex('lastModifiedAt', 'lastModifiedAt')
        plannerStore.createIndex('lastOpenedAt', 'lastOpenedAt')
      }
      if (!db.objectStoreNames.contains('checklists')) {
        const checklistStore = db.createObjectStore('checklists', { keyPath: 'id' })
        checklistStore.createIndex('lastModifiedAt', 'lastModifiedAt')
        checklistStore.createIndex('lastOpenedAt', 'lastOpenedAt')
      }
    },
  })

  return _db
}
