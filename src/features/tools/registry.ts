import type { Tool, ToolCategory, ToolCategoryInfo } from './types'
import { TOOL_CATEGORIES } from './categories'

import savingsCalculator from './finance/savings-calculator'
import budgetPlanner from './finance/budget-planner'
import gpaCalculator from './education/gpa-calculator'
import studySchedule from './education/study-schedule'
import focusTimer from './productivity/focus-timer'
import habitStreak from './productivity/habit-streak'

const ALL_TOOLS: Tool[] = [
  savingsCalculator,
  budgetPlanner,
  gpaCalculator,
  studySchedule,
  focusTimer,
  habitStreak,
]

export function getAllTools(): Tool[] {
  return ALL_TOOLS
}

export function getTool(slug: string): Tool | null {
  return ALL_TOOLS.find((t) => t.slug === slug) ?? null
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return ALL_TOOLS.filter((t) => t.category === category)
}

export function getAllToolCategories(): ToolCategoryInfo[] {
  return TOOL_CATEGORIES
}

export function getToolCategory(slug: string): ToolCategoryInfo | null {
  return TOOL_CATEGORIES.find((c) => c.slug === slug) ?? null
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim()
  if (!q) return ALL_TOOLS
  return ALL_TOOLS.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}
