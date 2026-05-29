import type { Template, TemplateCategory } from './types'
import { TEMPLATE_CATEGORIES } from './categories'
import dailyPlanner from './schemas/daily-planner'
import weeklyPlanner from './schemas/weekly-planner'
import simpleChecklist from './schemas/simple-checklist'
import projectChecklist from './schemas/project-checklist'
import habitTracker from './schemas/habit-tracker'
import goalPlanner from './schemas/goal-planner'
import wellnessChecklist from './schemas/wellness-checklist'
import studyPlanner from './schemas/study-planner'

const ALL_TEMPLATES: Template[] = [
  dailyPlanner,
  weeklyPlanner,
  habitTracker,
  simpleChecklist,
  projectChecklist,
  goalPlanner,
  wellnessChecklist,
  studyPlanner,
]

export function getAllTemplates(): Template[] {
  return ALL_TEMPLATES
}

export function getTemplate(slug: string): Template | null {
  return ALL_TEMPLATES.find((t) => t.slug === slug) ?? null
}

export function getTemplatesByCategory(categorySlug: string): Template[] {
  return ALL_TEMPLATES.filter((t) => t.category === categorySlug)
}

export function getFeaturedTemplates(limit = 8): Template[] {
  return ALL_TEMPLATES.filter((t) => t.featured).slice(0, limit)
}

export function getAllCategories(): TemplateCategory[] {
  return TEMPLATE_CATEGORIES.sort((a, b) => a.order - b.order)
}

export function getCategory(slug: string): TemplateCategory | null {
  return TEMPLATE_CATEGORIES.find((c) => c.slug === slug) ?? null
}

export function searchTemplates(query: string): Template[] {
  const q = query.toLowerCase().trim()
  if (!q) return ALL_TEMPLATES
  return ALL_TEMPLATES.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

export function getRelatedTemplates(slug: string, limit = 4): Template[] {
  const template = getTemplate(slug)
  if (!template) return []
  return ALL_TEMPLATES.filter((t) => t.slug !== slug && t.category === template.category).slice(0, limit)
}
