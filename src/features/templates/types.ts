import type { PlannerTheme, PaperSize, PlannerBlock, ChecklistItem } from '@/features/storage/types'

export interface TemplateCategory {
  id: string
  slug: string
  label: string
  description: string
  icon: string
  order: number
}

export interface Template {
  id: string
  slug: string
  title: string
  description: string
  category: string
  type: 'planner' | 'checklist'
  previewImage: string
  featured: boolean
  tags: string[]
  schemaVersion: number
  plannerDefaults?: {
    theme: PlannerTheme
    blocks: PlannerBlock[]
    paperSize: PaperSize
    orientation: 'portrait' | 'landscape'
  }
  checklistDefaults?: {
    mode: 'simple' | 'advanced'
    items: ChecklistItem[]
  }
  createdAt: string
}
