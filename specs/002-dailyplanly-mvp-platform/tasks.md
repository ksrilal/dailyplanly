---
description: "Task list for DailyPlanly MVP Platform — full platform build"
---

# Tasks: DailyPlanly MVP Platform

**Input**: Design documents from `specs/002-dailyplanly-mvp-platform/`

**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps to user story (US1=Planner, US2=Checklist, US3=Templates, US4=Tools, US5=Homepage, US6=Workspaces)

---

## Phase 1: Foundation & Project Setup

**Purpose**: Initialize Next.js project, dependencies, and repo structure from coming-soon page

- [x] T001 Initialize Next.js 15 project with App Router, TypeScript strict mode, and Tailwind CSS v4 at repo root — replace `index.html` with Next.js scaffold (`package.json`, `tsconfig.json`, `next.config.ts`)
- [x] T002 [P] Configure `next.config.ts` — `output: 'export'`, disable image optimization for static export, configure base path
- [x] T003 [P] Configure `tsconfig.json` — strict mode enabled, path aliases (`@/` → `src/`)
- [x] T004 [P] Configure ESLint with Next.js and TypeScript rules in `.eslintrc.json`
- [x] T005 [P] Configure Vitest in `vitest.config.ts` — jsdom environment, React Testing Library
- [x] T006 [P] Configure Playwright in `playwright.config.ts` — static export base URL, chromium
- [x] T007 Install core dependencies: `zustand`, `idb`, `next-themes`, `next-sitemap`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` — update `package.json`
- [x] T008 Install lazy-load dependencies: `@react-pdf/renderer`, `html-to-image` — configure as dynamic imports in `src/features/export/pdf-loader.ts` and `src/features/export/image-loader.ts`
- [x] T009 [P] Initialize shadcn/ui with neutral base — generate `components.json`, `src/lib/utils.ts`
- [x] T010 [P] Create full directory structure: `src/app/`, `src/features/`, `src/components/ui/`, `src/components/layout/`, `src/components/planner-editor/`, `src/components/checklist-editor/`, `src/components/template-gallery/`, `src/components/homepage/`, `src/components/workspace/`, `src/hooks/`, `src/lib/`, `src/styles/`, `src/templates/`
- [x] T011 [P] Create `src/lib/constants.ts` — site name, base URL, storage keys (`dp:recents`, `dp:settings`, `dp:schema-version`), max recents (10), default paper size
- [x] T012 [P] Update `vercel.json` for static export — trailing slash handling

---

## Phase 2: Design System & Shared Infrastructure

**Purpose**: Design tokens, UI primitives, layout shell — blocks all feature UI

**⚠️ CRITICAL**: No feature UI can begin until this phase is complete

- [x] T013 Define design tokens in `src/styles/globals.css` — warm neutral palette, spacing scale (4/8/12/16/24/32/48/64px), typography scale (xs/sm/base/lg/xl/2xl/3xl/4xl), border radius, shadow scale, CSS variables for light/dark themes
- [x] T014 [P] Create `src/styles/print.css` — `@media print` rules: hide header/footer/nav/toolbars, reset page margins, optimize line heights, force white background, preserve planner/checklist content layout
- [x] T015 Configure `next-themes` ThemeProvider in `src/app/layout.tsx` — system default, class-based theme switching, suppress hydration warning
- [x] T016 Add Inter as primary font and a serif display font via `next/font` in `src/app/layout.tsx` — paper-inspired typographic pairing
- [x] T017 [P] Create `src/components/ui/button.tsx` — variants: default, outline, ghost, destructive; sizes: sm, md, lg; loading state
- [x] T018 [P] Create `src/components/ui/input.tsx` — text input with label, helper text, error state, character count
- [x] T019 [P] Create `src/components/ui/textarea.tsx` — multiline with auto-resize, label, error state
- [x] T020 [P] Create `src/components/ui/card.tsx` — surface container with header, content, footer; hover variant for gallery cards
- [x] T021 [P] Create `src/components/ui/badge.tsx` — category and status labels; color variants
- [x] T022 [P] Create `src/components/ui/checkbox.tsx` — accessible, indeterminate state, custom styles
- [x] T023 [P] Create `src/components/ui/select.tsx` — accessible dropdown with search
- [x] T024 [P] Create `src/components/ui/dialog.tsx` — modal with overlay, focus trap, close on Escape
- [x] T025 [P] Create `src/components/ui/tooltip.tsx` — hover/focus tooltip
- [x] T026 [P] Create `src/components/ui/skeleton.tsx` — loading placeholder matching content shape
- [x] T027 [P] Create `src/components/ui/progress.tsx` — linear progress bar with percentage label, animated fill
- [x] T028 [P] Create `src/components/ui/separator.tsx` — horizontal and vertical divider
- [x] T029 [P] Create `src/components/ui/dropdown-menu.tsx` — triggered dropdown for toolbar menus
- [x] T030 Create `src/components/layout/page-shell.tsx` — max-width container, semantic `<main>`, responsive padding
- [x] T031 [P] Create `src/components/layout/print-shell.tsx` — print-optimized wrapper, suppresses non-print elements
- [x] T032 [P] Create `src/components/layout/header.tsx` — logo, nav links (Templates, Tools, New Planner, New Checklist), theme toggle; mobile hamburger menu at <768px
- [x] T033 [P] Create `src/components/layout/footer.tsx` — copyright, category links, philosophy tagline, no-login messaging
- [x] T034 Create root `src/app/layout.tsx` — integrates ThemeProvider, fonts, Header, Footer, PageShell, global styles

**Checkpoint**: Design system complete — all feature UI can begin in parallel

---

## Phase 3: Storage & State Infrastructure

**Purpose**: Persistence layer, Zustand stores, auto-save — required by all editor features

- [x] T035 Create `src/features/storage/db.ts` — idb database `dailyplanly`: object stores `planners` and `checklists` with indexes (`lastModifiedAt`, `lastOpenedAt`), schema version 1, `runMigrations()` function
- [x] T036 [P] Create `src/features/storage/types.ts` — all storage TypeScript types: `Planner`, `PlannerBlock`, `PlannerBlockContent` (all 9 discriminated union variants), `PlannerTheme`, `PaperSize`, `Checklist`, `ChecklistItem`, `ChecklistProgress`, `RecentsEntry`, `ExportConfig`, `WorkspaceNotFoundError`, `StorageQuotaExceededError`
- [x] T037 Create `src/features/storage/workspace-db.ts` — implement `WorkspaceDb` interface: `savePlanner`, `getPlanner`, `deletePlanner`, `getAllPlanners`, `saveChecklist`, `getChecklist`, `deleteChecklist`, `getAllChecklists`, `runMigrations`
- [x] T038 [P] Create `src/features/storage/recents.ts` — implement `RecentsStore` using `dp:recents` localStorage key: `getRecents`, `recordOpen`, `removeFromRecents`, `clearRecents`; enforce max 10 LRU eviction
- [x] T039 [P] Create `src/features/storage/settings.ts` — implement `SettingsStore` using `dp:settings` localStorage key: `getTheme`, `setTheme`, `getDefaultPaperSize`, `setDefaultPaperSize`
- [x] T040 Create `src/features/storage/auto-save.ts` — `useAutoSave` hook: debounced 800ms write, returns `{ status: 'idle' | 'saving' | 'saved' | 'error' }`; catches `StorageQuotaExceededError` and emits event
- [x] T041 [P] Create `src/components/ui/autosave-indicator.tsx` — status chip: idle=hidden, saving=spinner, saved=checkmark, error=warning; fades after 3s on saved

**Checkpoint**: Storage layer ready — auto-save, recents, settings all available

---

## Phase 4: Template & Tool Data Layer

**Purpose**: Registries, categories, initial content — required by gallery, editors, and SEO

- [x] T042 Create `src/features/templates/types.ts` — `Template`, `TemplateCategory` TypeScript types per data-model.md
- [x] T043 [P] Create `src/features/templates/categories.ts` — all 8 `TemplateCategory` definitions: productivity, health-wellness, finance, education, lifestyle, family-home, work-office, travel-events
- [x] T044 Create initial template schemas — minimum 3 per creator type:
  `src/features/templates/schemas/daily-planner.ts`,
  `src/features/templates/schemas/weekly-planner.ts`,
  `src/features/templates/schemas/monthly-planner.ts`,
  `src/features/templates/schemas/simple-checklist.ts`,
  `src/features/templates/schemas/project-checklist.ts`,
  `src/features/templates/schemas/habit-tracker.ts`
- [x] T045 Create `src/features/templates/registry.ts` — implement `TemplateRegistry` interface: `getAllTemplates`, `getTemplate`, `getTemplatesByCategory`, `getFeaturedTemplates`, `getAllCategories`, `getCategory`, `searchTemplates`, `getRelatedTemplates`
- [x] T046 [P] Create `src/features/tools/types.ts` — `Tool`, `ToolCategory`, `ToolInputField` TypeScript types
- [x] T047 [P] Create `src/features/tools/categories.ts` — 3 initial tool categories: productivity, education, finance
- [x] T048 Create initial tool modules — minimum 2 per category:
  `src/features/tools/productivity/focus-timer.ts`,
  `src/features/tools/productivity/habit-streak-calculator.ts`,
  `src/features/tools/education/gpa-calculator.ts`,
  `src/features/tools/education/study-schedule-builder.ts`,
  `src/features/tools/finance/savings-calculator.ts`,
  `src/features/tools/finance/budget-planner.ts`
- [x] T049 Create `src/features/tools/registry.ts` — implement `ToolRegistry` interface: `getAllTools`, `getTool`, `getToolsByCategory`, `getAllToolCategories`, `searchTools`

**Checkpoint**: Data layer ready — all template/tool content available to pages and editors

---

## Phase 5: User Story 1 — Planner Creation System 🎯 MVP

**Goal**: User creates a planner, adds and reorders blocks, applies a theme, and exports.

**Independent Test**: New Planner → add Calendar + Notes + Habit Tracker → drag-reorder → apply Soft Paper theme → Export PDF. Zero login. Works offline. Planner recovers on reopen.

### Planner Block System

- [x] T050 [US1] Create `src/features/planner/block-registry.ts` — implement singleton `BlockRegistry`: `register`, `get`, `getAll`, `has`, `createBlock`; initialize with all 9 block types on import
- [x] T051 [P] [US1] Create `src/features/planner/blocks/calendar.tsx` — exports `BlockRegistryEntry` for `calendar` type: `defaultContent`, `EditorComponent` (month/year picker, toggles), `PreviewComponent` (grid), `PrintComponent`
- [x] T052 [P] [US1] Create `src/features/planner/blocks/table.tsx` — exports `BlockRegistryEntry` for `table` type: `defaultContent` (3×3 grid), `EditorComponent` (add/remove rows/cols), `PreviewComponent`, `PrintComponent`
- [x] T053 [P] [US1] Create `src/features/planner/blocks/habit-tracker.tsx` — exports `BlockRegistryEntry` for `habit-tracker` type: `defaultContent` (3 habits, 7 days), `EditorComponent`, `PreviewComponent`, `PrintComponent`
- [x] T054 [P] [US1] Create `src/features/planner/blocks/timeline.tsx` — `timeline` block type: event list editor, timeline preview renderer, print component
- [x] T055 [P] [US1] Create `src/features/planner/blocks/notes.tsx` — `notes` block type: ruled lines count editor, text area, print component with ruled lines
- [x] T056 [P] [US1] Create `src/features/planner/blocks/goal.tsx` — `goal` block type: goal text + milestones list editor, preview, print component
- [x] T057 [P] [US1] Create `src/features/planner/blocks/routine.tsx` — `routine` block type: time slot list editor, preview grid, print component
- [x] T058 [P] [US1] Create `src/features/planner/blocks/focus.tsx` — `focus` block type: priority items list (high/medium/low), editor, print component
- [x] T059 [P] [US1] Create `src/features/planner/blocks/dashboard-card.tsx` — `dashboard-card` block type: title/value/unit/note fields, KPI card preview, print component

### Planner Theme System

- [x] T060 [US1] Create `src/features/planner/theme-tokens.ts` — define `ThemeMap`: all 5 themes (minimal, soft-paper, elegant-dark, study-focus, wellness-calm) as `PlannerThemeTokens` CSS variable maps; export `applyTheme(element, theme)` helper

### Planner Editor State

- [x] T061 [US1] Create `src/features/planner/planner-store.ts` — implement `PlannerStore` using `WorkspaceDb`: `createPlanner`, `getPlanner`, `savePlanner`, `deletePlanner`, `listPlanners`
- [x] T062 [P] [US1] Create `src/features/planner/editor-state.ts` — Zustand `PlannerEditorState` slice: `planner`, `selectedBlockId`, `saveStatus`, `isDirty`; all actions from contract: `loadPlanner`, `addBlock`, `removeBlock`, `updateBlockContent`, `reorderBlocks`, `setTheme`, `selectBlock`, `renameBlock`, `setBlockWidth`

### Planner Editor UI

- [x] T063 [US1] Create `src/components/planner-editor/editor-layout.tsx` — three-panel CSS grid layout: left sidebar (280px), center canvas (flex-grow), right sidebar (280px); responsive collapse on mobile
- [x] T064 [P] [US1] Create `src/components/planner-editor/block-palette.tsx` — left sidebar: scrollable list of all registered block types from `BlockRegistry.getAll()`; click-to-add; drag-from-palette preview; section structure tree below palette
- [x] T065 [P] [US1] Create `src/components/planner-editor/planner-toolbar.tsx` — top toolbar: planner title (inline edit), theme picker (5 swatches), paper size toggle (A4/Letter), Export dropdown (PDF/PNG/JPG/Print), Save status indicator, Preview button
- [x] T066 [US1] Create `src/components/planner-editor/planner-canvas.tsx` — center canvas: `@dnd-kit/core` `DndContext` wrapping `SortableContext` over `blocks` array; renders each `PlannerBlock` via `BlockRegistry.get(type).PreviewComponent`; applies `data-theme` attribute from current theme; handles `onDragEnd` → `reorderBlocks(newOrder)`
- [x] T067 [P] [US1] Create `src/components/planner-editor/block-settings.tsx` — right sidebar: shows selected block's `EditorComponent` from registry; block label edit; block width toggle (full/half); remove block button; empty state when no block selected
- [x] T068 [US1] Create `src/app/planner/[id]/page.tsx` — fully client-side planner editor: loads planner from `PlannerStore`, initializes `PlannerEditorState`, renders `EditorLayout` with all sub-components, wires `useAutoSave`
- [x] T069 [P] [US1] Create new planner entry: `src/app/planner/new/page.tsx` — client page that calls `PlannerStore.createPlanner()` and redirects to `/planner/[id]`
- [x] T070 [US1] Wire `useAutoSave` into `src/app/planner/[id]/page.tsx` — watches `editorState.planner`, debounces 800ms, calls `PlannerStore.savePlanner()`, updates `RecentsStore.recordOpen()`

**Checkpoint**: User Story 1 complete — full planner create → edit → theme → export flow testable

---

## Phase 6: User Story 2 — Checklist Creation System

**Goal**: User creates a checklist (simple or advanced), adds nested items, tracks progress, exports.

**Independent Test**: New Checklist → switch to Advanced → add 5 items, indent 2 as children → check items → verify progress bar → collapse a section → export as PDF and plain text. No login.

### Checklist Core

- [x] T071 [US2] Create `src/features/checklist/types.ts` — `Checklist`, `ChecklistItem`, `ChecklistProgress`, `ChecklistTreeNode` TypeScript types per data-model.md
- [x] T072 [US2] Create `src/features/checklist/tree-ops.ts` — implement all `ChecklistTreeOps` pure functions: `buildTree`, `flattenTree`, `addItemAfter`, `removeItem`, `toggleItem`, `indentItem`, `outdentItem`, `moveItem`, `toggleCollapse`
- [x] T073 [P] [US2] Create `src/features/checklist/progress.ts` — `computeProgress(items)`: counts leaf nodes, checked leaves, computes percentage; `computeSectionProgress(items)`: per root-item progress map
- [x] T074 [US2] Create `src/features/checklist/checklist-store.ts` — implement `ChecklistStore` using `WorkspaceDb`
- [x] T075 [P] [US2] Create `src/features/checklist/editor-state.ts` — Zustand `ChecklistEditorState` slice: all actions from contract

### Checklist Editor UI

- [x] T076 [US2] Create `src/components/checklist-editor/checklist-layout.tsx` — single-panel layout: toolbar at top, search bar, progress bar, scrollable item list; full-width on desktop, responsive on mobile
- [x] T077 [P] [US2] Create `src/components/checklist-editor/checklist-toolbar.tsx` — title (inline edit), mode toggle (Simple/Advanced), export dropdown (PDF/PNG/JPG/Text/Print), autosave indicator
- [x] T078 [P] [US2] Create `src/components/checklist-editor/checklist-search.tsx` — debounced filter input; calls `filterItems()` on change; shows match count; clear button
- [x] T079 [US2] Create `src/components/checklist-editor/checklist-item.tsx` — recursive component: checkbox, text input (inline edit), indent/outdent buttons (Advanced), collapse toggle (Advanced, if has children), drag handle; renders children recursively with left padding per depth level
- [x] T080 [P] [US2] Create `src/components/checklist-editor/progress-bar.tsx` — animated progress fill, percentage label, `X/Y complete` fraction; derives from `computeProgress()`
- [x] T081 [US2] Wire `@dnd-kit/sortable` into `src/components/checklist-editor/checklist-layout.tsx` — `SortableContext` over root items in Simple mode; `onDragEnd` → `moveItem()` in editor state; drag handle on each `ChecklistItem`
- [x] T082 [US2] Create `src/app/checklist/[id]/page.tsx` — client-only checklist editor: loads checklist, initializes `ChecklistEditorState`, renders `ChecklistLayout`, wires `useAutoSave`
- [x] T083 [P] [US2] Create `src/app/checklist/new/page.tsx` — creates new checklist, redirects to `/checklist/[id]`

**Checkpoint**: User Story 2 complete — simple + advanced checklist, progress, drag-drop, export all testable independently

---

## Phase 7: User Story 3 — Template Gallery & Discovery

**Goal**: User browses gallery, filters, searches, previews a template, and opens it in the editor.

**Independent Test**: Navigate `/templates` → filter by Education → search "weekly" → click template → preview visible → click "Use Template" → editor opens pre-filled.

- [x] T084 [US3] Create `src/components/template-gallery/template-card.tsx` — card: preview image (`next/image`), title, category badge, short description, "Use Template" CTA button; hover state shows preview overlay
- [x] T085 [P] [US3] Create `src/components/template-gallery/category-filter.tsx` — horizontal pill row of all 8 categories; active state highlight; "All" pill first; keyboard navigable
- [x] T086 [P] [US3] Create `src/components/template-gallery/gallery-grid.tsx` — responsive grid (4 cols desktop → 2 tablet → 1 mobile); accepts `templates` prop; skeleton loading state; empty state with category suggestion
- [x] T087 [US3] Create `src/app/templates/page.tsx` — SSG: all templates, featured section at top, GalleryGrid with CategoryFilter, client-side search input wired to `TemplateRegistry.searchTemplates()`
- [x] T088 [P] [US3] Create `src/app/templates/[category]/page.tsx` — SSG: category hero (name, description, icon), filtered GalleryGrid, breadcrumb, `generateStaticParams()` from `getAllCategories()`
- [x] T089 [US3] Create `src/app/templates/[category]/[slug]/page.tsx` — SSG: large preview image, title, description, related templates, "Use Template" button → creates workspace and redirects to editor; `generateStaticParams()` from `getAllTemplates()`
- [x] T090 [P] [US3] Add preview images to `public/previews/templates/` — one PNG per template schema (placeholder screenshots for MVP)

**Checkpoint**: User Story 3 complete — all 8 category pages, all template detail pages, search, and "Use Template" flow testable

---

## Phase 8: User Story 5 — Homepage Experience

**Goal**: Visitor lands on homepage, understands the product, and reaches their first editor in under 60 seconds.

**Independent Test**: Open homepage → scroll all sections → click a featured template → editor opens. Total time under 60 seconds from cold load.

- [x] T091 [US5] Create `src/components/homepage/hero.tsx` — full-width hero: headline, subheadline, primary CTA ("Browse Templates"), secondary CTA ("New Planner"); background: subtle paper grid or warm gradient; calm, spacious layout
- [x] T092 [P] [US5] Create `src/components/homepage/featured-templates.tsx` — "Featured Templates" section: 6-card GalleryGrid, "View All Templates" link; pulls from `getFeaturedTemplates(6)`
- [x] T093 [P] [US5] Create `src/components/homepage/product-sections.tsx` — two alternating sections: Planner Systems (screenshot/preview + feature bullets) and Checklist Systems; visual, not text-heavy
- [x] T094 [P] [US5] Create `src/components/homepage/categories-section.tsx` — 8 category cards in a grid; each links to `/templates/[category]`; icon + label + brief description
- [x] T095 [P] [US5] Create `src/components/homepage/philosophy-section.tsx` — calm centered section: "Simplicity is the product." quote, product values list, aesthetic typography treatment
- [x] T096 [P] [US5] Create `src/components/homepage/tools-preview.tsx` — preview of 2–3 tools with input mockups; "Explore Tools" link; lightweight, not overwhelming
- [x] T097 [US5] Create `src/app/page.tsx` — homepage: assembles all homepage sections; recent workspaces section (client island, RecentsGrid) after hero; fully SSG except recents island

**Checkpoint**: User Story 5 complete — homepage end-to-end flow testable, all 8 sections present

---

## Phase 9: User Story 6 — Workspace Management & Recovery

**Goal**: Returning user sees recents, restores workspace, can rename and delete.

**Independent Test**: Create planner → close browser → reopen → see recents → open workspace → all content restored → rename → delete.

- [x] T098 [US6] Create `src/components/workspace/workspace-card.tsx` — card: type icon (planner/checklist), title, last modified date, "Open" CTA, rename button (inline), delete button (with confirmation); feeds from `RecentsEntry`
- [x] T099 [P] [US6] Create `src/components/workspace/recents-grid.tsx` — 2-col grid of WorkspaceCards; empty state ("No recent workspaces — start with a template"); renders client-side from `RecentsStore.getRecents()`
- [x] T100 [US6] Create `src/app/workspace/page.tsx` — full workspace manager: all planners and checklists from `WorkspaceDb`, organized in tabs (All / Planners / Checklists), with search; rename and delete wired to storage ops
- [x] T101 [P] [US6] Wire workspace recovery into planner editor `src/app/planner/[id]/page.tsx` — on mount: call `RecentsStore.recordOpen()`; show `lastModifiedAt` timestamp in toolbar; handle `WorkspaceNotFoundError` with error boundary
- [x] T102 [P] [US6] Wire workspace recovery into checklist editor `src/app/checklist/[id]/page.tsx` — same pattern
- [x] T103 [P] [US6] Create `src/components/storage/quota-warning-toast.tsx` — toast notification on `StorageQuotaExceededError`: "Oldest unused workspace removed to free space"

**Checkpoint**: User Story 6 complete — full workspace lifecycle (create, save, recover, rename, delete) testable

---

## Phase 10: Export System

**Purpose**: PDF, PNG, JPG, plain text, and browser print — built after editors are functional

- [x] T104 Create `src/features/export/service.ts` — implement `ExportService` interface: all 8 export methods; delegates to pdf-renderer, image-exporter, print-renderer
- [x] T105 [P] Create `src/features/export/pdf-renderer.tsx` — `@react-pdf/renderer` document templates for planners and checklists; renders each block via its `PrintComponent`; dynamically imported via `src/features/export/pdf-loader.ts`
- [x] T106 [P] Create `src/features/export/image-exporter.ts` — `html-to-image` wrapper: `exportToPng(element, scale)`, `exportToJpeg(element, quality)`; dynamically imported via `src/features/export/image-loader.ts`
- [x] T107 [P] Create `src/features/export/print-renderer.tsx` — `window.print()` flow: clones canvas into print-safe container, applies `print-shell` styles, triggers print dialog, cleans up
- [x] T108 [P] Create `src/features/export/utils.ts` — `buildDefaultExportConfig(template)`, `requiresPagination(element)`, `ensureExportSafe(element)` (checks for overflow/clip issues)
- [x] T109 Create `src/components/print-preview/page-preview.tsx` — single-page PDF preview using `@react-pdf/renderer` PDFViewer in a scaled container
- [x] T110 [P] Create `src/components/print-preview/preview-modal.tsx` — Dialog wrapper for PagePreview: Export PDF button, Print button, paper size selector, close
- [x] T111 [P] Wire export into planner toolbar — Export dropdown in `src/components/planner-editor/planner-toolbar.tsx`: PDF → `exportPlannerToPdf()`, PNG → `exportPlannerToPng()`, JPG → `exportPlannerToJpg()`, Print → `printPlanner()`, Preview → opens PreviewModal
- [x] T112 [P] Wire export into checklist toolbar — Export dropdown in `src/components/checklist-editor/checklist-toolbar.tsx`: PDF, PNG, JPG, Text, Print buttons

**Checkpoint**: Export system complete — all 5 formats work for both planners and checklists

---

## Phase 11: SEO Architecture

**Purpose**: Metadata, sitemap, OG tags — added after pages are built

- [x] T113 Create `src/features/seo/metadata.ts` — implement `MetadataGenerator`: `forHome`, `forTemplate`, `forTemplateCategory`, `forTool`, `forToolCategory`
- [x] T114 [P] Wire `generateMetadata()` into all SSG pages: `src/app/page.tsx`, `src/app/templates/page.tsx`, `src/app/templates/[category]/page.tsx`, `src/app/templates/[category]/[slug]/page.tsx`, `src/app/tools/page.tsx`, `src/app/tools/[category]/[slug]/page.tsx`
- [x] T115 [P] Configure `next-sitemap` in `next-sitemap.config.js` — all template and tool pages with `changefreq: 'weekly'`, appropriate priorities; sitemap auto-generates on `pnpm build`
- [x] T116 [P] Add `robots.txt` via `next-sitemap.config.js` — allow all crawlers, reference sitemap
- [x] T117 [P] Add JSON-LD structured data to template detail pages in `src/app/templates/[category]/[slug]/page.tsx` — `WebApplication` schema with template name, description, category
- [x] T118 [P] Add `<link rel="canonical">` to all page metadata via MetadataGenerator
- [x] T119 Add tool pages routing: create `src/app/tools/page.tsx` and `src/app/tools/[category]/[slug]/page.tsx` with `generateStaticParams()` from `ToolRegistry.getAllTools()`

**Checkpoint**: SEO complete — all pages have unique titles, descriptions, OG tags, sitemap generated at build

---

## Phase 12: User Story 4 — Productivity Tools

**Goal**: User opens a tool, enters inputs, sees instant results, optionally sends output to editor.

**Independent Test**: Navigate to any tool → enter values → results appear instantly → click "Open in Planner" → planner opens with tool output in a Dashboard Card block.

- [x] T120 [US4] Create `src/features/tools/form.tsx` — reusable tool form: renders `ToolInputField[]` as typed inputs; calls `tool.calculate(inputs)` on every change; zero loading delay
- [x] T121 [P] [US4] Create `src/components/tools/tool-card.tsx` — card: icon, title, description, category badge, "Open Tool" CTA
- [x] T122 [P] [US4] Create `src/components/tools/tool-result.tsx` — structured result display; export button if `tool.hasExport`; "Open in Planner" / "Open in Checklist" CTA if `tool.relatedTemplateId`
- [x] T123 [US4] Create `src/app/tools/[category]/[slug]/page.tsx` — SSG tool page: ToolForm + ToolResult as client island; SEO metadata from MetadataGenerator
- [x] T124 [P] [US4] Create `src/app/tools/page.tsx` — all tools landing: ToolCard grid organized by category, tool count per category

**Checkpoint**: User Story 4 complete — all 6 tool modules callable, results instant, "Open in Planner" works

---

## Phase 13: Polish, Accessibility & Performance

**Purpose**: Cross-cutting improvements across all user stories

- [ ] T125 [P] Implement lazy loading for all heavy modules — confirm `pdf-loader.ts` and `image-loader.ts` use `next/dynamic` with `{ ssr: false, loading: () => <Skeleton /> }`; verify neither appears in initial bundle via `pnpm build --analyze`
- [ ] T126 [P] Audit ARIA attributes across all interactive components — planner canvas blocks, checklist items, toolbar buttons, category filter pills, search inputs — add missing `aria-label`, `role`, `aria-expanded`, `aria-checked`
- [ ] T127 [P] Add keyboard navigation to planner canvas — arrow keys move block selection, Delete removes selected block, Enter opens block settings sidebar
- [ ] T128 [P] Add keyboard navigation to checklist items — Enter creates new sibling, Tab indents, Shift+Tab outdents, Delete on empty item removes it, Arrow keys move focus
- [ ] T129 [P] Add keyboard navigation to template gallery — arrow keys navigate cards, Enter opens template detail
- [ ] T130 [P] Fix mobile layout for planner editor — collapse three-panel to single panel: tabs for Block Palette / Canvas / Settings; touch-friendly drag handles; min 44px touch targets
- [ ] T131 [P] Fix mobile layout for checklist editor — full-width single-column layout; touch drag-drop for checklist items (dnd-kit handles this natively)
- [ ] T132 [P] Fix mobile layout for template gallery — 1-column grid on <640px, 2-column on 640–1024px
- [ ] T133 [P] Add `loading.tsx` files — `src/app/templates/loading.tsx`, `src/app/tools/loading.tsx`, `src/app/planner/[id]/loading.tsx`, `src/app/checklist/[id]/loading.tsx`
- [ ] T134 [P] Add `error.tsx` boundary for editor routes — `src/app/planner/[id]/error.tsx` and `src/app/checklist/[id]/error.tsx`; handles `WorkspaceNotFoundError` with "Return to Templates" CTA
- [ ] T135 [P] Add `not-found.tsx` at `src/app/not-found.tsx` — calm 404 with link to homepage and template gallery
- [ ] T136 [P] Optimize all preview images in `public/previews/` — lossless PNG compression, correct `width`/`height` on all `<Image>` components to prevent layout shift
- [ ] T137 Run `pnpm typecheck` — resolve all TypeScript strict errors across `src/`
- [ ] T138 Run `pnpm build` — verify static export completes with zero errors; fix any SSR/hydration issues
- [ ] T139 [P] Validate print output for all template types — open each, fill minimal content, trigger Print, verify no overflow or clipping
- [ ] T140 [P] Validate PDF export for all template types — verify clean pagination, correct margins, legible typography across A4 and Letter
- [ ] T141 [P] Validate PNG/JPG export — verify correct dimensions, no artifacts, fonts rendered correctly
- [ ] T142 Deploy to Vercel/Netlify staging — verify all routes resolve on direct URL access, no 404s

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundation)**: No dependencies — start immediately
- **Phase 2 (Design System)**: Depends on Phase 1 — BLOCKS all feature UI
- **Phase 3 (Storage)**: Depends on Phase 1 — parallel with Phase 2
- **Phase 4 (Data Layer)**: Depends on Phase 1 — parallel with Phases 2–3
- **Phase 5 (US1 — Planner)**: Depends on Phases 2, 3, 4 — first MVP delivery
- **Phase 6 (US2 — Checklist)**: Depends on Phases 2, 3, 4 — parallel with Phase 5
- **Phase 7 (US3 — Templates)**: Depends on Phases 2, 4 — can start after Phase 5
- **Phase 8 (US5 — Homepage)**: Depends on Phases 2, 4, 7 — after template gallery
- **Phase 9 (US6 — Workspaces)**: Depends on Phases 3, 5, 6 — extends both editors
- **Phase 10 (Export)**: Depends on Phases 5, 6 — editors must exist
- **Phase 11 (SEO)**: Depends on Phases 7, 8, 19 (tools) — after all pages built
- **Phase 12 (US4 — Tools)**: Depends on Phases 2, 4 — parallel with Phase 7
- **Phase 13 (Polish)**: Depends on all previous phases

### User Story Dependencies

- **US1 (Planner)**: Depends on Phases 1–4 only — no story dependency
- **US2 (Checklist)**: Depends on Phases 1–4 — no dependency on US1
- **US3 (Templates)**: Depends on Phases 1–4; uses editor entry points from US1/US2
- **US4 (Tools)**: Depends on Phases 1–4 — parallel with US1–US3
- **US5 (Homepage)**: Depends on US3 (templates) for featured section
- **US6 (Workspaces)**: Depends on US1 and US2 (editors must exist)

### Parallel Opportunities

- All Phase 2 primitive tasks (T013–T034) — fully parallel after T013 (tokens)
- All Phase 3 store tasks (T035–T041) — parallel after T035 (db setup)
- All Phase 4 registry tasks (T042–T049) — fully parallel after T042 (types)
- All 9 block modules (T051–T059) — fully parallel
- Phases 5, 6, 7, 12 — all can proceed after Phases 1–4 complete (parallel tracks)
- All Phase 13 polish tasks — fully parallel

---

## Implementation Strategy

### MVP First (Planner Only)

1. Phase 1: Foundation
2. Phase 2: Design System (critical gate)
3. Phases 3 + 4 in parallel: Storage + Data Layer
4. Phase 5: Planner (US1)
5. **STOP and VALIDATE**: Create planner → add blocks → reorder → theme → export PDF
6. Deploy MVP

### Incremental Delivery

1. Foundation + Design System + Storage + Data → infrastructure ready
2. Phase 5 (US1) → Planner MVP ✅ Deploy
3. Phase 6 (US2) → Checklist added ✅ Deploy
4. Phase 7 (US3) → Template gallery ✅ Deploy
5. Phase 8 (US5) → Homepage complete ✅ Deploy
6. Phase 9 (US6) → Workspace recovery ✅ Deploy
7. Phase 10 → Export system ✅ Deploy
8. Phase 11 → SEO ✅ Deploy
9. Phase 12 (US4) → Tools ✅ Deploy
10. Phase 13 → Polish + accessibility ✅ Production

### Parallel Team Strategy (2 developers)

After Phases 1–4 complete:
- **Dev A**: US1 Planner (Phase 5) → Export (Phase 10) → Polish
- **Dev B**: US2 Checklist (Phase 6) → US3 Templates (Phase 7) → SEO (Phase 11)
- Both: US5 Homepage (Phase 8), US6 Workspaces (Phase 9), US4 Tools (Phase 12)

---

## Notes

- `[P]` tasks = different files, safe to run in parallel
- `[Story]` labels map tasks to user stories for traceability
- Each phase ends with an **Independent Test** — validate before moving on
- Block modules (T051–T059) are all parallel — each is a fully isolated file
- Export engines (T105, T106) MUST be lazy-loaded — never in the initial bundle
- `@dnd-kit` handles both planner block reordering and checklist item reordering — same dependency
- All 9 block `PrintComponent` exports must be wired into `pdf-renderer.tsx` (T105)
- `print.css` (T014) and PDF renderer (T105) are separate concerns — maintain both paths
