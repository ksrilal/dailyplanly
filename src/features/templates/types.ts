import type { PlannerTheme, PaperSize, PlannerBlock, ChecklistItem } from '@/features/storage/types'

export interface TemplateCategory {
  id: string
  slug: string
  label: string
  description: string
  icon: string
  order: number
}

// Looser block type for template definitions — content is pre-filled data,
// not live editor state, so sub-item IDs are optional at definition time.
export type TemplatePlannerBlock = Omit<PlannerBlock, 'content'> & { content: Record<string, unknown> }

// Checklist item for templates — depth is a convenience field used in
// template definitions to document nesting; it is stripped when loading.
export type TemplateChecklistItem = Omit<ChecklistItem, 'status'> & { depth?: number; status?: string }

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
  schemaVersion?: number
  plannerDefaults?: {
    theme: PlannerTheme | string
    blocks: TemplatePlannerBlock[]
    paperSize: PaperSize
    orientation: 'portrait' | 'landscape'
  }
  checklistDefaults?: {
    mode: 'simple' | 'advanced'
    items: TemplateChecklistItem[]
  }
  createdAt?: string
}
