# Data Model: DailyPlanly Platform — Core Systems

**Feature**: 001-dailyplanly-platform
**Date**: 2026-05-28

---

## Core Entities

### Template

A reusable productivity document definition. Templates are static — they define the structure.
Workspaces are the user-filled instances.

```
Template {
  id: string                    // unique slug, e.g. "daily-planner-minimal"
  slug: string                  // URL-safe identifier (same as id)
  title: string                 // display name, e.g. "Daily Planner — Minimal"
  description: string           // short SEO description
  category: TemplateCategory    // parent category reference
  type: TemplateType            // "planner" | "checklist" | "calendar" | "tracker" | "other"
  schema: TemplateSchema        // versioned field definitions
  schemaVersion: number         // integer, increments on breaking schema changes
  previewImage: string          // path to static preview image (OG + gallery)
  tags: string[]                // searchable keywords
  printConfig: PrintConfig      // paper size, orientation, margins
  createdAt: string             // ISO date
}
```

### TemplateCategory

```
TemplateCategory {
  id: string                    // e.g. "planners", "checklists", "trackers"
  slug: string                  // URL segment, e.g. "planners"
  label: string                 // display name, e.g. "Planners"
  description: string           // SEO category description
  icon: string                  // icon identifier
  order: number                 // display order in navigation
}
```

### TemplateSchema

Versioned field definitions. Each template type has its own schema shape.

```
TemplateSchema {
  version: number
  fields: TemplateField[]
}

TemplateField {
  id: string                    // unique within template
  type: FieldType               // "text" | "textarea" | "time" | "checkbox" | "list" | "checklist-tree"
  label: string
  placeholder?: string
  required: boolean
  maxLength?: number
  printLabel?: string           // label override for print rendering
}
```

### Workspace

A user-created instance of a Template with their entered content. Stored in IndexedDB.

```
Workspace {
  id: string                    // UUID, generated on creation
  templateId: string            // references Template.id
  templateSchemaVersion: number // schema version at time of creation (for migration)
  title: string                 // user-editable name (defaults to template title + date)
  content: WorkspaceContent     // map of field id → value
  createdAt: string             // ISO timestamp
  lastModifiedAt: string        // ISO timestamp, updated on every auto-save
  lastOpenedAt: string          // ISO timestamp, updated on open (used for recents ordering)
}

WorkspaceContent {
  [fieldId: string]: FieldValue
}

FieldValue = string | boolean | ChecklistNode[]
```

### ChecklistNode

Recursive tree node for nested checklists.

```
ChecklistNode {
  id: string                    // UUID
  text: string
  checked: boolean
  children: ChecklistNode[]     // empty array for leaf nodes
  order: number                 // display order among siblings
}
```

Computed from tree:
```
ChecklistProgress {
  total: number                 // total leaf nodes
  completed: number             // checked leaf nodes
  percentage: number            // 0–100
}
```

### Tool

A lightweight browser-based utility. Tools are stateless — no workspace storage.

```
Tool {
  id: string                    // unique slug, e.g. "bmi-calculator"
  slug: string
  title: string
  description: string           // SEO description
  category: ToolCategory
  inputSchema: ToolInputField[] // defines the tool's form
  hasExport: boolean            // whether tool output can be exported/printed
  relatedTemplateId?: string    // optional link to a related template
  tags: string[]
}

ToolCategory {
  id: string                    // "health-wellness" | "finance" | "education" | "productivity" | "office" | "images-documents"
  slug: string
  label: string
  description: string
  icon: string
  order: number
}

ToolInputField {
  id: string
  type: "number" | "text" | "select" | "range" | "file"
  label: string
  placeholder?: string
  unit?: string                 // e.g. "kg", "%", "years"
  min?: number
  max?: number
  options?: { label: string; value: string }[]
  required: boolean
}
```

### RecentsEntry

Stored in localStorage. Lightweight index pointing to Workspace records in IndexedDB.

```
RecentsEntry {
  workspaceId: string
  templateId: string
  title: string
  lastOpenedAt: string          // ISO timestamp
  previewSnapshot?: string      // optional short text preview of content
}
```

Max 10 entries; oldest evicted when limit exceeded.

### ExportConfig

Passed to the export renderer per export action.

```
ExportConfig {
  format: "pdf" | "print"
  paperSize: "A4" | "Letter" | "A5"
  orientation: "portrait" | "landscape"
  margins: {
    top: number                 // mm
    right: number
    bottom: number
    left: number
  }
  includeHeader: boolean
  includeFooter: boolean
  scale: number                 // 1.0 default
}
```

### PrintConfig

Embedded in Template; defines default export settings.

```
PrintConfig {
  defaultPaperSize: "A4" | "Letter" | "A5"
  defaultOrientation: "portrait" | "landscape"
  defaultMargins: { top: number; right: number; bottom: number; left: number }
  paginationStrategy: "auto" | "fixed"  // auto = break on content; fixed = fixed page count
}
```

### SiteMetadata (SEO)

Generated at build time for each template and tool page.

```
SiteMetadata {
  title: string                 // "<Template/Tool Title> — DailyPlanly"
  description: string           // 150-160 char SEO description
  canonicalUrl: string          // absolute URL
  ogTitle: string
  ogDescription: string
  ogImage: string               // absolute URL to preview image
  ogType: "website"
  keywords: string[]
}
```

---

## State Transitions

### Workspace Lifecycle

```
[Not Exists] → (user opens template) → [Created, empty]
[Created, empty] → (user types) → [Active, auto-saving]
[Active, auto-saving] → (user closes tab) → [Persisted in IndexedDB]
[Persisted] → (user returns) → [Restored, shown in Recents]
[Persisted] → (storage quota exceeded) → [Evicted, removed from Recents]
```

### Checklist Node Lifecycle

```
[unchecked] → (user checks) → [checked]
[checked] → (user unchecks) → [unchecked]
[leaf node] → (user adds child) → [parent node]
[parent node] → (all children removed) → [leaf node]
```

---

## Storage Schema

### IndexedDB — Database: `dailyplanly`

| Store | Key | Indexes | Notes |
|---|---|---|---|
| `workspaces` | `id` (UUID) | `templateId`, `lastModifiedAt`, `lastOpenedAt` | All workspace data |

### localStorage — Keys

| Key | Value | Notes |
|---|---|---|
| `dp:recents` | `RecentsEntry[]` (JSON) | Max 10, ordered by lastOpenedAt desc |
| `dp:settings` | `{ theme: 'light'\|'dark', ... }` | UI preferences |
| `dp:schema-migrations` | `{ [templateId]: number }` | Last migrated schema version per template |
