// ─── Planner types ───────────────────────────────────────────────────────────

export type PlannerTheme =
  | 'minimal'
  | 'soft-paper'
  | 'elegant-dark'
  | 'study-focus'
  | 'wellness-calm'

export type PaperSize = 'A4' | 'Letter'

export type PlannerBlockType =
  | 'calendar'
  | 'calendar-notes'
  | 'table'
  | 'habit-tracker'
  | 'timeline'
  | 'notes'
  | 'goal'
  | 'routine'
  | 'focus'
  | 'dashboard-card'

export interface CalendarContent {
  month?: number
  year?: number
  showWeekNumbers: boolean
  highlightToday: boolean
}

export interface CalendarNote {
  id: string
  text: string
  color: 'yellow' | 'pink' | 'blue' | 'green' | 'purple' | 'orange'
}

export interface CalendarNotesContent {
  month?: number
  year?: number
  notes: Record<number, CalendarNote[]> // day number → notes array
}

export interface TableContent {
  headers: string[]
  rows: string[][]
  caption?: string
}

export interface HabitTrackerContent {
  habits: { id: string; label: string }[]
  period: 'daily' | 'weekly'
  days: number
}

export interface TimelineContent {
  events: { id: string; label: string; date: string; note?: string }[]
}

export interface NotesContent {
  lines: number
  text?: string
}

export interface GoalContent {
  goal: string
  milestones: { id: string; label: string; done: boolean }[]
  deadline?: string
}

export interface RoutineContent {
  slots: { id: string; time: string; label: string; done: boolean }[]
}

export interface FocusContent {
  title: string
  items: { id: string; label: string; priority: 'high' | 'medium' | 'low' }[]
}

export interface DashboardCardContent {
  title: string
  value: string
  unit?: string
  note?: string
}

export type PlannerBlockContent =
  | CalendarContent
  | CalendarNotesContent
  | TableContent
  | HabitTrackerContent
  | TimelineContent
  | NotesContent
  | GoalContent
  | RoutineContent
  | FocusContent
  | DashboardCardContent

export interface PlannerBlock {
  id: string
  type: PlannerBlockType
  label?: string
  content: PlannerBlockContent
  width: 'full' | 'half'
  order: number
}

export interface Planner {
  id: string
  title: string
  theme: PlannerTheme
  paperSize: PaperSize
  orientation: 'portrait' | 'landscape'
  blocks: PlannerBlock[]
  createdAt: string
  lastModifiedAt: string
  lastOpenedAt: string
}

// ─── Checklist types ─────────────────────────────────────────────────────────

export type ChecklistItemStatus = 'unchecked' | 'checked' | 'invalid'

export interface ChecklistItem {
  id: string
  text: string
  checked: boolean
  status?: ChecklistItemStatus
  parentId: string | null
  order: number
  collapsed: boolean
}

export interface ChecklistProgress {
  total: number
  completed: number
  percentage: number
}

export interface Checklist {
  id: string
  title: string
  mode: 'simple' | 'advanced'
  items: ChecklistItem[]
  createdAt: string
  lastModifiedAt: string
  lastOpenedAt: string
}

// ─── Shared types ────────────────────────────────────────────────────────────

export interface RecentsEntry {
  workspaceId: string
  workspaceType: 'planner' | 'checklist'
  checklistMode?: 'simple' | 'advanced'
  title: string
  lastOpenedAt: string
  previewSnapshot?: string
}

export interface ExportConfig {
  format: 'pdf' | 'png' | 'jpg' | 'print' | 'text'
  paperSize: PaperSize
  orientation: 'portrait' | 'landscape'
  scale: number
  margins: { top: number; right: number; bottom: number; left: number }
  includeHeader: boolean
  includeFooter: boolean
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  defaultPaperSize: PaperSize
}

// ─── Errors ──────────────────────────────────────────────────────────────────

export class WorkspaceNotFoundError extends Error {
  constructor(
    public workspaceId: string,
    public workspaceType: 'planner' | 'checklist'
  ) {
    super(`Workspace not found: ${workspaceType}/${workspaceId}`)
    this.name = 'WorkspaceNotFoundError'
  }
}

export class StorageQuotaExceededError extends Error {
  constructor(public evictedWorkspaceId: string) {
    super(`Storage quota exceeded. Evicted workspace: ${evictedWorkspaceId}`)
    this.name = 'StorageQuotaExceededError'
  }
}
