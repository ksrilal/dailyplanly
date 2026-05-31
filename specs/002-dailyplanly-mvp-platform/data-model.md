# Data Model: DailyPlanly MVP Platform

**Feature**: 002-dailyplanly-mvp-platform
**Date**: 2026-05-28

---

## Core Entities

### Planner

A user-created visual document composed of ordered blocks with an applied theme.

```
Planner {
  id: string                      // UUID
  title: string                   // user-editable, default "My Planner"
  theme: PlannerTheme             // "minimal" | "soft-paper" | "elegant-dark" | "study-focus" | "wellness-calm"
  paperSize: PaperSize            // "A4" | "Letter"
  orientation: "portrait" | "landscape"
  blocks: PlannerBlock[]          // ordered array; order = render order
  createdAt: string               // ISO timestamp
  lastModifiedAt: string
  lastOpenedAt: string
}

PlannerTheme = "minimal" | "soft-paper" | "elegant-dark" | "study-focus" | "wellness-calm"
PaperSize = "A4" | "Letter"
```

### PlannerBlock

A single content unit within a planner. Each block type has its own content shape.

```
PlannerBlock {
  id: string                      // UUID
  type: PlannerBlockType
  label?: string                  // user-editable section title
  content: PlannerBlockContent    // discriminated union by type
  width: "full" | "half"          // layout width on page
  order: number                   // position in blocks array
}

PlannerBlockType =
  | "calendar"
  | "table"
  | "habit-tracker"
  | "timeline"
  | "notes"
  | "goal"
  | "routine"
  | "focus"
  | "dashboard-card"

PlannerBlockContent = (one of the following, matched by block type)

CalendarContent {
  month?: number                  // 1-12, null = current month
  year?: number
  showWeekNumbers: boolean
  highlightToday: boolean
}

TableContent {
  headers: string[]
  rows: string[][]
  caption?: string
}

HabitTrackerContent {
  habits: { id: string; label: string }[]
  period: "daily" | "weekly"
  days: number                    // 7, 14, 21, or 30
}

TimelineContent {
  events: { id: string; label: string; date: string; note?: string }[]
}

NotesContent {
  lines: number                   // number of ruled lines to render
  text?: string                   // freeform note content
}

GoalContent {
  goal: string
  milestones: { id: string; label: string; done: boolean }[]
  deadline?: string
}

RoutineContent {
  slots: { id: string; time: string; label: string; done: boolean }[]
}

FocusContent {
  title: string
  items: { id: string; label: string; priority: "high" | "medium" | "low" }[]
}

DashboardCardContent {
  title: string
  value: string
  unit?: string
  note?: string
}
```

### BlockRegistryEntry

Static module shape — not stored, defined at code time.

```
BlockRegistryEntry {
  type: PlannerBlockType
  label: string                   // e.g. "Calendar", "Habit Tracker"
  icon: string                    // icon identifier for block palette
  defaultContent: PlannerBlockContent
  EditorComponent: React.ComponentType<BlockEditorProps>
  PreviewComponent: React.ComponentType<BlockPreviewProps>
  PrintComponent: React.ComponentType<BlockPrintProps>
}
```

---

### Checklist

A user-created task list in Simple or Advanced mode.

```
Checklist {
  id: string                      // UUID
  title: string
  mode: "simple" | "advanced"
  items: ChecklistItem[]          // flat array; tree built from parentId refs
  createdAt: string
  lastModifiedAt: string
  lastOpenedAt: string
}
```

### ChecklistItem

```
ChecklistItem {
  id: string                      // UUID
  text: string
  checked: boolean
  parentId: string | null         // null = root item
  order: number                   // position among siblings
  collapsed: boolean              // Advanced mode only: controls child visibility
}
```

Computed:
```
ChecklistProgress {
  total: number                   // total leaf item count
  completed: number               // checked leaf item count
  percentage: number              // 0-100
  sectionProgress: Map<string, ChecklistProgress>  // per root item in advanced mode
}
```

---

### Template

A pre-defined planner or checklist structure with sample content.

```
Template {
  id: string                      // slug, e.g. "daily-planner-minimal"
  slug: string                    // URL segment
  title: string
  description: string
  category: TemplateCategory
  type: "planner" | "checklist"
  previewImage: string            // path in public/previews/templates/
  featured: boolean
  tags: string[]
  schemaVersion: number
  plannerDefaults?: {             // if type === "planner"
    theme: PlannerTheme
    blocks: PlannerBlock[]
    paperSize: PaperSize
    orientation: "portrait" | "landscape"
  }
  checklistDefaults?: {           // if type === "checklist"
    mode: "simple" | "advanced"
    items: ChecklistItem[]
  }
  createdAt: string
}
```

### TemplateCategory

```
TemplateCategory {
  id: string
  slug: string
  label: string
  description: string
  icon: string
  order: number
}
```

Eight categories: productivity, health-wellness, finance, education, lifestyle,
family-home, work-office, travel-events.

---

### Tool

```
Tool {
  id: string
  slug: string
  title: string
  description: string
  category: ToolCategory          // "productivity" | "education" | "finance"
  inputs: ToolInputField[]
  hasExport: boolean
  relatedTemplateId?: string
  tags: string[]
}

ToolCategory = "productivity" | "education" | "finance"

ToolInputField {
  id: string
  type: "number" | "text" | "select" | "range"
  label: string
  placeholder?: string
  unit?: string
  min?: number
  max?: number
  options?: { label: string; value: string }[]
  required: boolean
}
```

---

### Workspace (union)

```
Workspace =
  | { workspaceType: "planner" } & Planner
  | { workspaceType: "checklist" } & Checklist
```

### RecentsEntry

```
RecentsEntry {
  workspaceId: string
  workspaceType: "planner" | "checklist"
  title: string
  lastOpenedAt: string
  previewSnapshot?: string        // short text summary of first block/item
}
```

Max 10 entries; LRU eviction.

### ExportConfig

```
ExportConfig {
  format: "pdf" | "png" | "jpg" | "print" | "text"
  paperSize: PaperSize
  orientation: "portrait" | "landscape"
  scale: number                   // 1.0 default; 2.0 for high-DPI PNG
  margins: { top: number; right: number; bottom: number; left: number }  // mm
  includeHeader: boolean
  includeFooter: boolean
}
```

---

## Storage Schema

### IndexedDB — Database: `dailyplanly`

| Store | Key | Indexes | Notes |
|---|---|---|---|
| `planners` | `id` (UUID) | `lastModifiedAt`, `lastOpenedAt` | Planner documents |
| `checklists` | `id` (UUID) | `lastModifiedAt`, `lastOpenedAt` | Checklist documents |

### localStorage — Keys

| Key | Value | Notes |
|---|---|---|
| `dp:recents` | `RecentsEntry[]` | Max 10, ordered by `lastOpenedAt` desc |
| `dp:settings` | `{ theme: 'light'\|'dark', defaultPaperSize: PaperSize }` | |
| `dp:schema-version` | `number` | Current DB schema version |

---

## State Transitions

### Planner Lifecycle

```
[Not Exists] → (user clicks "New Planner" or "Use Template") → [Created, empty/pre-filled]
[Created] → (user adds block) → [Active, dirty]
[Active, dirty] → (debounced 800ms) → [Active, auto-saved to IndexedDB]
[Active] → (user closes tab) → [Persisted]
[Persisted] → (user returns) → [Restored, shown in Recents]
[Persisted] → (quota exceeded) → [Evicted]
```

### Checklist Item State

```
[unchecked, visible] → (user checks) → [checked, visible]
[checked] → (user unchecks) → [unchecked]
[parent, expanded] → (user collapses) → [parent, collapsed, children hidden]
[leaf] → (user indents) → [child of previous sibling]
[child] → (user outdents) → [sibling of parent]
[leaf] → (user presses Enter at end) → [new sibling item created below]
```

### Export State

```
[idle] → (user clicks Export) → [rendering]
[rendering] → (export complete) → [download triggered] → [idle]
[rendering] → (error) → [error toast shown] → [idle]
```
