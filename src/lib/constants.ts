export const SITE_NAME = 'DailyPlanly'
export const SITE_TAGLINE = 'Calm, printable-first productivity'
export const SITE_DESCRIPTION =
  'DailyPlanly is a printable planner and checklist platform for organized, calm productivity.'
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://dailyplanly.com'

export const STORAGE_KEYS = {
  RECENTS: 'dp:recents',
  SETTINGS: 'dp:settings',
  SCHEMA_VERSION: 'dp:schema-version',
} as const

export const DB_NAME = 'dailyplanly'
export const DB_VERSION = 1

export const MAX_RECENTS = 10
export const AUTOSAVE_DEBOUNCE_MS = 800
export const DEFAULT_PAPER_SIZE = 'A4' as const

export const PLANNER_THEMES = [
  'minimal',
  'soft-paper',
  'elegant-dark',
  'study-focus',
  'wellness-calm',
] as const

export const PAPER_SIZES = ['A4', 'Letter'] as const
