import type { ToolCategoryInfo } from './types'

export const TOOL_CATEGORIES: ToolCategoryInfo[] = [
  {
    id: 'productivity',
    slug: 'productivity',
    label: 'Productivity',
    description: 'Timers, calculators, and planning helpers for focused work.',
    icon: 'Zap',
  },
  {
    id: 'education',
    slug: 'education',
    label: 'Education',
    description: 'GPA calculators, study planners, and academic tools.',
    icon: 'BookOpen',
  },
  {
    id: 'finance',
    slug: 'finance',
    label: 'Finance',
    description: 'Savings calculators, budget helpers, and financial planners.',
    icon: 'TrendingUp',
  },
]
