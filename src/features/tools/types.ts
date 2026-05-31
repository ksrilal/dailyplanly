export type ToolCategory =
  | 'productivity'
  | 'health-wellness'
  | 'finance'
  | 'education'
  | 'career'
  | 'family-home'
  | 'travel'
  | 'events'
  | 'personal-development'
  | 'business'

export interface ToolInputField {
  id: string
  type: 'number' | 'text' | 'select' | 'range' | 'textarea' | 'date' | 'repeatable'
  label: string
  placeholder?: string
  unit?: string
  min?: number
  max?: number
  step?: number
  defaultValue?: string | number
  options?: { label: string; value: string }[]
  required: boolean
  hint?: string
}

// ─── Rich plan output ─────────────────────────────────────────────────────────

export interface PlanMilestone {
  label: string
  date?: string
  description?: string
}

export interface PlanWeekRow {
  week: string | number
  focus: string
  tasks: string
  notes?: string
}

export interface PlanChecklist {
  title: string
  items: string[]
}

export interface PlanScheduleBlock {
  time: string
  label: string
  type?: 'work' | 'break' | 'rest' | 'review'
}

export interface ToolPlan {
  headline: string            // bold summary line e.g. "You'll reach your goal in 14 months"
  subheadline?: string        // supporting line
  stats: { label: string; value: string; note?: string }[]  // key metrics grid
  milestones?: PlanMilestone[]
  weeklySchedule?: PlanWeekRow[]
  dailySchedule?: PlanScheduleBlock[]
  checklists?: PlanChecklist[]
  recommendations?: string[]
  nextActions?: string[]
  relatedTemplateSlug?: string
  relatedTemplateCategory?: string
  exportText?: string
}

export interface Tool {
  id: string
  slug: string
  title: string
  description: string
  category: ToolCategory
  icon: string                // Lucide icon name
  tags: string[]
  inputs: ToolInputField[]
  generate: (inputs: Record<string, string | number>) => ToolPlan
  relatedTemplateSlug?: string
  relatedTemplateCategory?: string
  featured?: boolean
}

export interface ToolCategoryInfo {
  id: ToolCategory
  slug: string
  label: string
  description: string
  icon: string
  color: string               // accent color class e.g. 'text-violet-400'
  bg: string                  // bg color class e.g. 'bg-violet-500/10'
}
