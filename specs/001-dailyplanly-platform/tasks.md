---
description: "Task list for DailyPlanly Platform — Core Systems MVP"
---

# Tasks: DailyPlanly Platform — Core Systems

**Input**: Design documents from `specs/001-dailyplanly-platform/`

**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)
- Include exact file paths in descriptions

## Path Conventions

- App Router pages: `src/app/`
- Feature modules: `src/features/`
- Shared components: `src/components/`
- Design system primitives: `src/components/ui/`
- Styles: `src/styles/`
- Static assets: `public/`

---

## Phase 1: Foundation & Project Setup

**Purpose**: Initialize Next.js project, tooling, and repo structure from the static coming-soon page

- [ ] T001 Initialize Next.js 15 project with App Router, TypeScript strict mode, and Tailwind CSS v4 at repo root — replace `index.html` with Next.js scaffold (`package.json`, `tsconfig.json`, `next.config.ts`)
- [ ] T002 [P] Configure `next.config.ts` with `output: 'export'`, image optimization disabled for static export, and base path settings
- [ ] T003 [P] Configure TypeScript strict mode in `tsconfig.json` with path aliases (`@/` → `src/`)
- [ ] T004 [P] Configure ESLint with Next.js ruleset and TypeScript-aware rules in `.eslintrc.json`
- [ ] T005 [P] Configure Vitest with jsdom environment and React Testing Library in `vitest.config.ts`
- [ ] T006 [P] Configure Playwright for E2E tests with static export base URL in `playwright.config.ts`
- [ ] T007 Install and configure core dependencies: `zustand`, `idb`, `next-themes`, `next-sitemap` — update `package.json`
- [ ] T008 Install `@react-pdf/renderer` as a lazy-loaded optional dependency — configure dynamic import wrapper in `src/features/export/pdf-loader.ts`
- [ ] T009 [P] Install and initialize shadcn/ui with neutral base color in `components.json` — generate `src/lib/utils.ts`
- [ ] T010 [P] Create project directory structure per plan.md: `src/app/`, `src/features/`, `src/components/ui/`, `src/components/layout/`, `src/lib/`, `src/styles/`
- [ ] T011 [P] Create `src/lib/constants.ts` with app-wide constants (site name, base URL, storage keys, max recents)
- [ ] T012 [P] Create `vercel.json` with static export configuration (keep existing or update as needed)

---

## Phase 2: Design System & Shared Infrastructure

**Purpose**: Establish design tokens, UI primitives, and layout shell — blocks all UI work

**⚠️ CRITICAL**: No feature UI can begin until this phase is complete

- [ ] T013 Define design tokens in `src/styles/globals.css`: warm neutral palette, spacing scale, typography scale, border radius, shadow scale, and CSS variables for light/dark themes
- [ ] T014 [P] Create print stylesheet in `src/styles/print.css` with `@media print` rules: hide navigation, reset margins, optimize typography for print
- [ ] T015 [P] Configure `next-themes` provider in `src/app/layout.tsx` with system default and class-based theme switching
- [ ] T016 Add Inter and a secondary serif/display font via `next/font` in `src/app/layout.tsx` — paper-inspired typographic pairing
- [ ] T017 [P] Create shadcn/ui primitive: `src/components/ui/button.tsx` — variants: default, outline, ghost, destructive; sizes: sm, md, lg
- [ ] T018 [P] Create shadcn/ui primitive: `src/components/ui/input.tsx` — text input with label, error state, placeholder support
- [ ] T019 [P] Create shadcn/ui primitive: `src/components/ui/textarea.tsx` — multiline input with auto-resize
- [ ] T020 [P] Create shadcn/ui primitive: `src/components/ui/card.tsx` — surface container with header, content, footer slots
- [ ] T021 [P] Create shadcn/ui primitive: `src/components/ui/badge.tsx` — category and status labels
- [ ] T022 [P] Create shadcn/ui primitive: `src/components/ui/select.tsx` — accessible dropdown
- [ ] T023 [P] Create shadcn/ui primitive: `src/components/ui/checkbox.tsx` — accessible checkbox with indeterminate state
- [ ] T024 [P] Create shadcn/ui primitive: `src/components/ui/separator.tsx` — visual divider
- [ ] T025 [P] Create shadcn/ui primitive: `src/components/ui/dialog.tsx` — modal dialog with overlay and trap focus
- [ ] T026 [P] Create shadcn/ui primitive: `src/components/ui/tooltip.tsx` — hover tooltip
- [ ] T027 [P] Create shadcn/ui primitive: `src/components/ui/skeleton.tsx` — loading placeholder
- [ ] T028 Create `src/components/layout/page-shell.tsx` — standard page wrapper with max-width container, padding, and semantic `<main>` landmark
- [ ] T029 [P] Create `src/components/layout/print-shell.tsx` — print-optimized wrapper that suppresses all navigation and applies print tokens
- [ ] T030 [P] Create `src/components/layout/header.tsx` — site header with logo, primary navigation links (Templates, Tools), and theme toggle
- [ ] T031 [P] Create `src/components/layout/footer.tsx` — minimal footer with copyright, links, and no-login/privacy messaging
- [ ] T032 Create root `src/app/layout.tsx` integrating ThemeProvider, fonts, Header, Footer, PageShell, and global styles

**Checkpoint**: Design system complete — all feature UI can now begin in parallel

---

## Phase 3: Storage & State Infrastructure

**Purpose**: Persistence layer and state management — required by editor, recents, and workspace recovery stories

- [ ] T033 Create `src/features/storage/db.ts` — idb database setup: open `dailyplanly` database, define `workspaces` object store with indexes (`templateId`, `lastModifiedAt`, `lastOpenedAt`), schema version 1
- [ ] T034 [P] Create TypeScript types file `src/features/storage/types.ts` — `Workspace`, `WorkspaceContent`, `FieldValue`, `RecentsEntry`, `StorageQuotaExceededError`, `WorkspaceNotFoundError`, `SchemaMigrationError` per data-model.md
- [ ] T035 Create `src/features/storage/workspace-store.ts` — implement `WorkspaceStore` interface: `createWorkspace`, `getWorkspace`, `saveWorkspace`, `renameWorkspace`, `deleteWorkspace`, `listWorkspaces`, `getWorkspacesByTemplate`, `migrateWorkspace`
- [ ] T036 [P] Create `src/features/storage/recents-store.ts` — implement `RecentsStore` interface using `dp:recents` localStorage key: `getRecents`, `recordOpen`, `removeFromRecents`, `clearRecents`; enforce max 10 entries with LRU eviction
- [ ] T037 [P] Create `src/features/storage/settings-store.ts` — implement `SettingsStore` using `dp:settings` localStorage key: `getTheme`, `setTheme`
- [ ] T038 Create `src/features/storage/auto-save.ts` — `useAutoSave` hook: debounced 800ms write to WorkspaceStore on content change, visual save-state indicator (`idle` | `saving` | `saved` | `error`)
- [ ] T039 [P] Create Zustand workspace slice in `src/features/storage/workspace-slice.ts` — client-side state: current workspace, content map, save status, dirty flag
- [ ] T040 [P] Create Zustand settings slice in `src/features/storage/settings-slice.ts` — UI preferences: theme, last visited category
- [ ] T041 Create `src/lib/db.ts` — re-export db instance and run pending schema migrations on app init

**Checkpoint**: Storage layer ready — workspace persistence, recents, and auto-save available

---

## Phase 4: Template & Checklist Data Layer

**Purpose**: Template registry, checklist model, and category definitions — required by all content features

- [ ] T042 Create TypeScript types file `src/features/templates/types.ts` — `Template`, `TemplateCategory`, `TemplateSchema`, `TemplateField`, `FieldType`, `PrintConfig` per data-model.md
- [ ] T043 [P] Create TypeScript types file `src/features/checklist/types.ts` — `ChecklistNode`, `ChecklistProgress` per data-model.md
- [ ] T044 Create `src/features/checklist/model.ts` — pure functions: `addNode`, `removeNode`, `toggleNode`, `reorderNode`, `addChildNode`, `flattenTree`, `buildTree`, `computeProgress`, `getDepth`
- [ ] T045 [P] Create `src/features/templates/categories.ts` — define all template categories (Planners, Checklists, Calendars, Trackers, etc.) with slug, label, description, icon, order
- [ ] T046 Create initial template schemas — `src/features/templates/schemas/daily-planner.ts`, `src/features/templates/schemas/weekly-planner.ts`, `src/features/templates/schemas/simple-checklist.ts` (minimum 3 templates for launch)
- [ ] T047 Create `src/features/templates/registry.ts` — implement `TemplateRegistry` interface: `getAllTemplates`, `getTemplate`, `getTemplatesByCategory`, `getAllCategories`, `getCategory`, `searchTemplates`, `getRelatedTemplates`
- [ ] T048 [P] Create `src/features/tools/categories.ts` — define all tool categories (Health & Wellness, Finance, Education, Productivity, Office, Images & Documents) with slug, label, description, icon, order
- [ ] T049 Create initial tool modules — one per category minimum:
  `src/features/tools/health-wellness/bmi-calculator.ts`,
  `src/features/tools/finance/savings-calculator.ts`,
  `src/features/tools/education/gpa-calculator.ts`,
  `src/features/tools/productivity/study-timer.ts`,
  `src/features/tools/office/meeting-agenda.ts`,
  `src/features/tools/images-documents/image-resizer.ts`
- [ ] T050 Create `src/features/tools/registry.ts` — implement `ToolRegistry` interface: `getAllTools`, `getTool`, `getToolsByCategory`, `getAllToolCategories`, `getToolCategory`, `searchTools`

**Checkpoint**: Data layer ready — templates, tools, categories, and checklist model available to all features

---

## Phase 5: User Story 1 — Browse and Use a Template 🎯 MVP

**Goal**: User opens homepage, finds a template, edits it, and exports it — end-to-end flow.

**Independent Test**: Open homepage → select any template → edit a field → click Export → receive PDF. Zero login prompts. Network offline after first load still works.

### Shared Editor Infrastructure

- [ ] T051 [US1] Create `src/components/editor/field-editor.tsx` — renders correct editor component per `FieldType`: text → Input, textarea → Textarea, checkbox → Checkbox, time → Input[type=time], list → dynamic list, checklist-tree → ChecklistEditor
- [ ] T052 [P] [US1] Create `src/components/editor/autosave-indicator.tsx` — status badge showing `Saving…` / `Saved` / `Save failed` driven by `useAutoSave` hook
- [ ] T053 [P] [US1] Create `src/components/editor/template-editor.tsx` — orchestrates all field editors for a workspace: iterates template schema fields, renders FieldEditor per field, wires content to Zustand workspace slice

### Template Gallery UI

- [ ] T054 [P] [US1] Create `src/components/template-gallery/template-card.tsx` — card displaying template preview image, title, category badge, and "Use Template" CTA button
- [ ] T055 [P] [US1] Create `src/components/template-gallery/category-filter.tsx` — horizontal scrollable category pill filter; highlights active category
- [ ] T056 [P] [US1] Create `src/components/template-gallery/gallery-grid.tsx` — responsive CSS grid of TemplateCards with empty state and skeleton loading state

### Workspace Flow

- [ ] T057 [US1] Create workspace creation flow in `src/app/templates/[category]/[slug]/page.tsx` — SSG page: on "Use Template" click, create Workspace via WorkspaceStore, redirect to `/workspace/[id]`
- [ ] T058 [US1] Create `src/app/workspace/[id]/page.tsx` — fully client-side workspace editor page: load Workspace + Template from storage/registry, render TemplateEditor, wire AutosaveIndicator, show export actions toolbar
- [ ] T059 [US1] Create workspace toolbar in `src/app/workspace/[id]/page.tsx` — Export PDF button, Print button, Rename workspace input, Back to templates link

### Homepage

- [ ] T060 [US1] Create `src/app/page.tsx` — homepage: featured templates section (GalleryGrid), category filter, recents section (shows last 5 workspaces from RecentsStore), and hero messaging
- [ ] T061 [P] [US1] Add recents section component `src/components/recents/recents-grid.tsx` — displays RecentsEntry list as cards with template title, last modified date, and "Continue" CTA; shows empty state on first visit

**Checkpoint**: User Story 1 complete — homepage → template → editor → export flow is end-to-end testable

---

## Phase 6: User Story 2 — Use a Productivity Utility Tool

**Goal**: User navigates to Tools, uses a tool, sees instant results, optionally exports output.

**Independent Test**: Navigate to `/tools/finance/savings-calculator` → enter values → see result instantly → (if applicable) download or print output. No page reload required.

### Tool UI

- [ ] T062 [US2] Create `src/features/tools/form.tsx` — reusable tool form: renders `ToolInputField[]` schema as typed inputs (number, text, select, range, file), handles validation, calls `tool.calculate(inputs)` on change, returns result
- [ ] T063 [P] [US2] Create `src/components/tools/tool-card.tsx` — card displaying tool icon, title, description, category badge, and "Open Tool" CTA
- [ ] T064 [P] [US2] Create `src/components/tools/tool-result.tsx` — generic result display area: renders structured output from `tool.renderOutput()`, shows export button if `tool.hasExport`
- [ ] T065 [P] [US2] Create `src/components/tools/related-template-cta.tsx` — conditional CTA shown when `tool.relatedTemplateId` is set: "Use this result in a [template name]" link

### Tool Pages

- [ ] T066 [US2] Create `src/app/tools/[category]/[slug]/page.tsx` — SSG tool page: renders ToolForm + ToolResult + RelatedTemplateCta, all interaction is client-side island
- [ ] T067 [P] [US2] Create `src/app/tools/page.tsx` — all tools landing page: ToolCard grid organized by category with CategoryFilter
- [ ] T068 [P] [US2] Create `src/app/tools/[category]/page.tsx` — tool category page: header with category description, filtered ToolCard grid

**Checkpoint**: User Story 2 complete — all six tool categories accessible, tools compute results instantly, export available where applicable

---

## Phase 7: User Story 3 — Find Templates via Search or Category

**Goal**: User arrives via SEO or browses by category, lands on a well-structured page, previews and uses a template.

**Independent Test**: Navigate to `/templates/planners/daily-planner-minimal` directly → see template preview image, description, and "Use Template" CTA — without having visited homepage. Page has correct `<title>` and `<meta description>`.

### Template Browse UI

- [ ] T069 [US3] Create `src/app/templates/page.tsx` — all templates landing: category navigation sidebar or tabs, searchable GalleryGrid, total count
- [ ] T070 [P] [US3] Create `src/app/templates/[category]/page.tsx` — category listing: category hero (name, description, icon), GalleryGrid filtered to category, breadcrumb navigation
- [ ] T071 [P] [US3] Create `src/features/templates/preview-renderer.tsx` — renders a static visual preview of a template (field labels + placeholder content) for use in template detail pages and gallery cards
- [ ] T072 [US3] Enhance `src/app/templates/[category]/[slug]/page.tsx` — add template detail section above editor entry: preview image, title, description, field count, print config summary, and related templates grid

### Search

- [ ] T073 [US3] Create `src/components/search/search-input.tsx` — client-side search input that filters templates or tools using `TemplateRegistry.searchTemplates()` or `ToolRegistry.searchTools()` with debounce
- [ ] T074 [P] [US3] Create `src/components/search/search-results.tsx` — results panel showing matching templates and tools with category labels and direct-use links

**Checkpoint**: User Story 3 complete — all template category and detail pages are navigable, searchable, and show correct metadata

---

## Phase 8: User Story 4 — Manage and Recover Workspaces

**Goal**: Returning user sees recent workspaces with saved content restored on open.

**Independent Test**: Edit a template → close browser → reopen → verify recent workspace appears on homepage → click Continue → all content is exactly as left.

- [ ] T075 [US4] Implement workspace recovery in `src/app/workspace/[id]/page.tsx` — on mount: load workspace from IndexedDB, hydrate Zustand workspace slice, call `RecentsStore.recordOpen()`, show last-saved timestamp
- [ ] T076 [P] [US4] Add storage quota warning to `src/features/storage/workspace-store.ts` — catch `QuotaExceededError` from IndexedDB writes, evict oldest workspace not opened in 30+ days, emit `StorageQuotaExceededError` with evicted ID
- [ ] T077 [P] [US4] Create `src/components/storage/quota-warning-toast.tsx` — toast notification shown when storage quota eviction occurs: "Oldest workspace removed to free space"
- [ ] T078 [US4] Create workspace management page `src/app/workspaces/page.tsx` — list all saved workspaces (from `WorkspaceStore.listWorkspaces()`), show title, template name, last modified date, delete button, and "Continue" link
- [ ] T079 [P] [US4] Add workspace rename to `src/app/workspace/[id]/page.tsx` — inline editable title in toolbar, saves via `WorkspaceStore.renameWorkspace()` on blur

**Checkpoint**: User Story 4 complete — workspace lifecycle (create, edit, recover, manage, delete) fully functional

---

## Phase 9: Export System

**Purpose**: PDF generation and print rendering — usable after Phase 5 editor is complete

- [ ] T080 Create `src/features/export/service.ts` — implement `ExportService` interface: `exportWorkspaceToPdf`, `printWorkspace`, `exportToolOutputToPdf`, `renderWorkspaceToPdfDocument`
- [ ] T081 [P] Create `src/features/export/pdf-renderer.tsx` — `@react-pdf/renderer` document templates: page layout, typography, field rendering, checklist hierarchy rendering — loaded via dynamic import from `pdf-loader.ts`
- [ ] T082 [P] Create `src/features/export/print-renderer.tsx` — `window.print()` flow: clone workspace content into a print-only shadow DOM, apply `print.css`, trigger print dialog
- [ ] T083 [P] Create `src/features/export/utils.ts` — helpers: `calculatePageCount()`, `chunkContentByPage()`, `ensureExportSafe()` (overflow detection), `buildDefaultExportConfig(template)`
- [ ] T084 [P] Create `src/components/print-preview/page-preview.tsx` — single PDF page preview using `@react-pdf/renderer` PDFViewer embedded in a scaled iframe
- [ ] T085 Create `src/components/print-preview/preview-modal.tsx` — dialog wrapper for PagePreview: shows live PDF preview before export, with Export PDF and Print buttons
- [ ] T086 [P] Wire ExportService into workspace toolbar in `src/app/workspace/[id]/page.tsx` — Export PDF button triggers `exportWorkspaceToPdf()`, Print button triggers `printWorkspace()`, Preview button opens PreviewModal

**Checkpoint**: Export system complete — PDF download and browser print work for all template types

---

## Phase 10: SEO Architecture

**Purpose**: Metadata, sitemap, and OG tags — required for organic discovery

- [ ] T087 Create `src/features/seo/metadata.ts` — implement `MetadataGenerator` interface: `forTemplate`, `forTool`, `forTemplateCategory`, `forToolCategory`, `forHome` — returns `SiteMetadata` per data-model.md
- [ ] T088 [P] Wire `generateMetadata()` exports into all SSG pages using MetadataGenerator:
  - `src/app/page.tsx`
  - `src/app/templates/page.tsx`
  - `src/app/templates/[category]/page.tsx`
  - `src/app/templates/[category]/[slug]/page.tsx`
  - `src/app/tools/page.tsx`
  - `src/app/tools/[category]/page.tsx`
  - `src/app/tools/[category]/[slug]/page.tsx`
- [ ] T089 [P] Wire `generateStaticParams()` into all dynamic SSG routes to pre-render all template and tool pages at build time
- [ ] T090 [P] Create static preview images for initial templates in `public/previews/templates/` — one PNG per template schema (can be placeholder screenshots for MVP)
- [ ] T091 [P] Create static preview images for tool categories in `public/previews/tools/` — one PNG per tool category
- [ ] T092 Create `src/features/seo/sitemap.ts` — configure `next-sitemap` in `next-sitemap.config.js` to include all template and tool pages with `changefreq: weekly` and appropriate priorities
- [ ] T093 [P] Add `robots.txt` configuration to `next-sitemap.config.js` — allow all crawlers, reference sitemap URL
- [ ] T094 [P] Add structured data (JSON-LD) to template detail pages in `src/app/templates/[category]/[slug]/page.tsx` — `WebApplication` schema with template name, description, and category

**Checkpoint**: SEO architecture complete — all pages have unique titles, descriptions, OG tags, and sitemap is generated at build time

---

## Phase 11: Checklist Feature (Deep Integration)

**Purpose**: Full checklist editor with nested tree, progress tracking, and print rendering

- [ ] T095 Create `src/features/checklist/editor.tsx` — `ChecklistEditor` component: recursive tree rendering, keyboard navigation (Enter = new sibling, Tab = indent, Shift+Tab = outdent), drag-to-reorder nodes, add/remove nodes, toggle checked state
- [ ] T096 [P] Create `src/features/checklist/print-renderer.tsx` — `PrintableChecklist` component: renders tree with visual indentation levels, progress summary header, print-safe CSS classes, compatible with both `print.css` and `@react-pdf/renderer`
- [ ] T097 [P] Create `src/features/checklist/progress-bar.tsx` — visual progress indicator: completion percentage, `completed / total` fraction, animated fill strip
- [ ] T098 Wire `ChecklistEditor` into `field-editor.tsx` for fields with `type: 'checklist-tree'` in `src/components/editor/field-editor.tsx`
- [ ] T099 [P] Add checklist-specific template schema `src/features/templates/schemas/nested-checklist.ts` — project checklist with sections, sub-tasks, and priority levels
- [ ] T100 [P] Wire `PrintableChecklist` into PDF renderer in `src/features/export/pdf-renderer.tsx` — detect checklist field type and use correct print component

**Checkpoint**: Checklist system complete — nested checklists editable, progress tracked, print-safe rendering functional

---

## Phase 12: Polish, Performance & Accessibility

**Purpose**: Cross-cutting improvements across all user stories

- [ ] T101 [P] Implement lazy loading for export module: confirm `src/features/export/pdf-loader.ts` uses `next/dynamic` with `{ loading: () => <Skeleton />, ssr: false }` — PDF engine must not appear in initial bundle
- [ ] T102 [P] Implement lazy loading for ChecklistEditor in `src/components/editor/field-editor.tsx` — load checklist tree component only when a checklist-type field is present
- [ ] T103 [P] Add ARIA labels and roles to all interactive components: TemplateEditor fields, ChecklistEditor nodes, toolbar buttons, CategoryFilter pills, SearchInput — audit `src/components/` for missing ARIA attributes
- [ ] T104 [P] Add keyboard navigation to GalleryGrid in `src/components/template-gallery/gallery-grid.tsx` — arrow keys to navigate cards, Enter to open
- [ ] T105 [P] Add keyboard navigation to ChecklistEditor in `src/features/checklist/editor.tsx` — Tab/Shift+Tab for indent/outdent, Enter for new sibling, Delete on empty node removes it
- [ ] T106 [P] Audit and fix responsive layout for mobile in `src/components/layout/header.tsx` — hamburger menu or condensed nav for <768px viewports
- [ ] T107 [P] Audit and fix responsive layout for mobile in `src/components/template-gallery/gallery-grid.tsx` — single-column layout on mobile, touch-friendly card sizes
- [ ] T108 [P] Audit and fix responsive layout for tool pages in `src/app/tools/[category]/[slug]/page.tsx` — stacked form + result layout on mobile
- [ ] T109 [P] Add `loading.tsx` files for all major route segments to show skeleton UI during navigation: `src/app/templates/loading.tsx`, `src/app/tools/loading.tsx`, `src/app/workspace/[id]/loading.tsx`
- [ ] T110 [P] Add `error.tsx` boundary for workspace route in `src/app/workspace/[id]/error.tsx` — handles WorkspaceNotFoundError with "Return to Templates" CTA
- [ ] T111 [P] Add `not-found.tsx` global 404 page in `src/app/not-found.tsx` — calm design with link to homepage and template gallery
- [ ] T112 [P] Optimize all preview images: compress PNGs in `public/previews/` using lossless compression, add `width` and `height` attributes to all `<Image>` components to prevent layout shift
- [ ] T113 Run `pnpm build` and verify static export completes with zero errors — fix any SSR/hydration issues in client components
- [ ] T114 [P] Validate print output for all initial templates: open each template, fill minimal content, trigger Print, verify no overflow or clipping — fix `print.css` as needed
- [ ] T115 [P] Validate PDF export for all initial templates: export each to PDF, verify clean pagination, correct margins, and legible typography
- [ ] T116 Run `pnpm typecheck` and resolve all TypeScript strict mode errors across `src/`
- [ ] T117 [P] Add `<link rel="canonical">` to all page metadata via MetadataGenerator — prevent duplicate content indexing issues from URL variations
- [ ] T118 Deploy to Vercel/Netlify staging environment and verify: static export serves correctly, all routes resolve, no 404s on direct URL access

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundation)**: No dependencies — start immediately
- **Phase 2 (Design System)**: Depends on Phase 1 — BLOCKS all UI work
- **Phase 3 (Storage)**: Depends on Phase 1 — can run in parallel with Phase 2
- **Phase 4 (Data Layer)**: Depends on Phase 1 — can run in parallel with Phases 2–3
- **Phase 5 (US1 — Template Use)**: Depends on Phases 2, 3, 4 — first MVP delivery
- **Phase 6 (US2 — Tools)**: Depends on Phases 2, 4 — can start after Phase 5 in parallel
- **Phase 7 (US3 — Discovery)**: Depends on Phases 2, 4, 5 — enhances template pages from Phase 5
- **Phase 8 (US4 — Workspace Recovery)**: Depends on Phases 3, 5 — extends Phase 5 workspace
- **Phase 9 (Export)**: Depends on Phase 5 — wires into workspace editor
- **Phase 10 (SEO)**: Depends on Phases 4, 7 — metadata added to pages built in Phases 5–7
- **Phase 11 (Checklists)**: Depends on Phases 2, 4, 5 — extends Phase 5 editor
- **Phase 12 (Polish)**: Depends on all previous phases

### User Story Dependencies

- **US1 (P1 — Template Use)**: Depends on Phases 1–4 only. No user story dependencies.
- **US2 (P2 — Tools)**: Depends on Phases 1–4. No dependency on US1.
- **US3 (P3 — Discovery)**: Depends on US1 template pages (Phase 5) for editor entry point.
- **US4 (P4 — Workspace Recovery)**: Depends on US1 workspace creation (Phase 5).

### Within Each User Story

- Data model/types → Registry/store → Components → Pages → Integration
- Export and SEO wired in after editor pages exist
- Checklist deep integration after editor infrastructure is established

### Parallel Opportunities

- All Phase 2 primitive tasks (T017–T031) are fully parallel
- All Phase 3 store implementations (T033–T041) are fully parallel after T033 (db setup)
- All Phase 4 registry tasks (T042–T050) are fully parallel after T042/T043 (types)
- Phases 6, 7, 8, 9, 10, 11 can all begin once Phase 5 is complete (parallel team tracks)
- All Phase 12 polish tasks are fully parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Foundation
2. Complete Phase 2: Design System (CRITICAL — blocks all UI)
3. Complete Phases 3 + 4 in parallel: Storage + Data Layer
4. Complete Phase 5: User Story 1 — Template Use
5. **STOP and VALIDATE**: Open homepage → pick template → edit → export PDF
6. Deploy MVP to staging

### Incremental Delivery

1. Foundation + Design System + Storage + Data Layer → infrastructure ready
2. Phase 5 (US1) → MVP: template browsing, editing, auto-save, export ✅ Deploy
3. Phase 6 (US2) → Tools added ✅ Deploy
4. Phase 7 (US3) → Search and discovery ✅ Deploy
5. Phase 8 (US4) → Workspace recovery ✅ Deploy
6. Phase 9 (Export) → PDF quality improvements ✅ Deploy
7. Phase 10 (SEO) → Full SEO metadata ✅ Deploy
8. Phase 11 (Checklists) → Nested checklist feature ✅ Deploy
9. Phase 12 (Polish) → Performance, a11y, responsive ✅ Production release

### Parallel Team Strategy (2 developers)

After Phases 1–4 (foundation) are complete:

- **Developer A**: US1 (Phase 5) → Export (Phase 9) → Checklists (Phase 11)
- **Developer B**: US2 (Phase 6) → US3 (Phase 7) → SEO (Phase 10)
- Both: US4 (Phase 8) and Polish (Phase 12) together

---

## Notes

- `[P]` tasks = different files, no dependencies — safe to run in parallel
- `[Story]` label maps each task to its user story for traceability
- Each user story phase has an **Independent Test** — validate before moving to next phase
- Auto-save (T038) must be integrated before any editor work is considered complete
- PDF engine (T008, T080–T085) MUST be lazy-loaded — never in the initial bundle
- Print CSS (T014) and PDF renderer (T081) are separate concerns — maintain both
- Template schemas (T046) and tool modules (T049) are the primary content expansion path
- Commit after each phase checkpoint or logical group of tasks
