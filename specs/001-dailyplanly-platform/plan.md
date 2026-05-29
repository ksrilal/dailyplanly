# Implementation Plan: DailyPlanly Platform — Core Systems

**Branch**: `001-dailyplanly-platform` | **Date**: 2026-05-28 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-dailyplanly-platform/spec.md`

## Summary

Build the full DailyPlanly platform from a static coming-soon page into a production-ready,
printable-first productivity web app. The platform consists of seven interconnected systems:
Planner templates, Checklist system, Utility tools, Local storage, PDF export, SEO architecture,
and a Design system — all running entirely in the browser with no backend dependency.

The technical approach uses Next.js 15 (App Router, static export) with TypeScript strict mode,
Tailwind CSS v4, Zustand for client state, IndexedDB for workspace persistence, and
`@react-pdf/renderer` for client-side PDF generation.

## Technical Context

**Language/Version**: TypeScript 5.5 (strict mode), Node.js 20

**Primary Dependencies**:
- Next.js 15 (App Router, `output: 'export'`)
- React 19
- Tailwind CSS v4
- shadcn/ui (copied primitives, no runtime dep)
- Zustand 5
- idb 8 (IndexedDB wrapper, 1.1kb)
- @react-pdf/renderer 4
- next-themes (dark/light)
- next-sitemap

**Storage**: IndexedDB (workspaces) + localStorage (recents, settings)

**Testing**: Vitest (unit/integration), Playwright (E2E)

**Target Platform**: Modern browsers (Chrome 120+, Firefox 120+, Safari 17+), desktop-first

**Project Type**: Static web application (Next.js static export → CDN deployment)

**Performance Goals**:
- First Contentful Paint < 1.5s on broadband
- Template page JS payload < 50kb (excluding PDF engine, lazy loaded)
- PDF generation < 3s for single-page templates

**Constraints**:
- Zero server-side infrastructure (static export only)
- No authentication, no cloud storage, no external APIs
- Must work fully offline after initial load
- All processing browser-side

**Scale/Scope**:
- ~50 templates at launch across 5+ categories
- ~20 utility tools across 6 categories
- Single developer, iterative delivery

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Template-First Experience | ✅ PASS | Homepage is template gallery; all flows start from template |
| II. Engineering Discipline | ✅ PASS | TypeScript strict, feature-based architecture, no monoliths |
| III. Performance Standards | ✅ PASS | Lazy load PDF engine; RSC for static pages; minimal deps |
| IV. Product Scope | ✅ PASS | Planners + checklists + tools; no collaboration, no auth |
| V. Export & Print Quality | ✅ PASS | @react-pdf/renderer; print CSS; export-safe layouts |
| VI. Design Tone | ✅ PASS | Tailwind calm palette; shadcn/ui; paper-inspired tokens |
| VII. Success Definition | ✅ PASS | Open → find → customize → export in < 2 min, no login |
| VIII. No login | ✅ PASS | Zero auth anywhere |
| VIII. No backend (MVP) | ✅ PASS | Static export; IndexedDB only |
| VIII. Browser-first | ✅ PASS | All processing client-side |
| VIII. Local-first storage | ✅ PASS | IndexedDB + localStorage; no cloud |
| VIII. Privacy-first | ✅ PASS | No data transmitted; no analytics |
| VIII. Static deployment | ✅ PASS | `output: 'export'`; Vercel/Netlify/GitHub Pages compatible |
| Anti-scope | ✅ PASS | No Notion-like editors, no canvas, no collab, no enterprise |

**Post-Phase 1 re-check**: All gates still pass after data model and contracts design.
No complexity tracking violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-dailyplanly-platform/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: Technology decisions
├── data-model.md        # Phase 1: Entity definitions
├── quickstart.md        # Phase 1: Dev setup guide
├── contracts/
│   ├── storage-api.md   # WorkspaceStore, RecentsStore, SettingsStore interfaces
│   ├── export-api.md    # ExportService, PrintRenderer interfaces
│   └── template-api.md  # TemplateRegistry, ToolRegistry, MetadataGenerator, routes
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (theme provider, fonts)
│   ├── page.tsx                      # Homepage — template gallery + recents
│   ├── templates/
│   │   ├── page.tsx                  # All templates (SSG)
│   │   ├── [category]/
│   │   │   ├── page.tsx              # Category listing (SSG)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Template detail + editor entry (SSG + client island)
│   ├── tools/
│   │   ├── page.tsx                  # All tools (SSG)
│   │   ├── [category]/
│   │   │   ├── page.tsx              # Tool category (SSG)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Tool page (SSG + client island)
│   └── workspace/
│       └── [id]/
│           └── page.tsx              # Workspace editor (fully client-side, dynamic)
│
├── features/
│   ├── checklist/
│   │   ├── model.ts                  # ChecklistNode type, tree ops, progress aggregation
│   │   ├── editor.tsx                # ChecklistEditor component (recursive)
│   │   └── print-renderer.tsx        # Printable checklist hierarchy component
│   │
│   ├── templates/
│   │   ├── registry.ts               # TemplateRegistry implementation
│   │   ├── schemas/                  # One file per template type
│   │   │   ├── daily-planner.ts
│   │   │   ├── weekly-planner.ts
│   │   │   └── ...
│   │   ├── preview-renderer.tsx      # Template preview card component
│   │   └── categories.ts             # Category definitions
│   │
│   ├── tools/
│   │   ├── registry.ts               # ToolRegistry implementation
│   │   ├── form.tsx                  # Reusable tool form patterns
│   │   ├── health-wellness/          # Tool modules per category
│   │   │   ├── bmi-calculator.ts
│   │   │   └── ...
│   │   ├── finance/
│   │   │   ├── savings-calculator.ts
│   │   │   └── ...
│   │   ├── education/
│   │   ├── productivity/
│   │   ├── office/
│   │   └── images-documents/
│   │
│   ├── export/
│   │   ├── service.ts                # ExportService implementation
│   │   ├── pdf-renderer.tsx          # @react-pdf/renderer document templates
│   │   ├── print-renderer.tsx        # Print CSS + window.print() handler
│   │   └── utils.ts                  # Pagination, layout safety helpers
│   │
│   ├── storage/
│   │   ├── db.ts                     # idb setup, schema, migrations
│   │   ├── workspace-store.ts        # WorkspaceStore implementation
│   │   ├── recents-store.ts          # RecentsStore (localStorage)
│   │   ├── settings-store.ts         # SettingsStore (localStorage)
│   │   └── auto-save.ts              # Debounced auto-save hook
│   │
│   └── seo/
│       ├── metadata.ts               # MetadataGenerator implementation
│       └── sitemap.ts                # next-sitemap configuration helper
│
├── components/
│   ├── ui/                           # Design system primitives (shadcn/ui base)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── page-shell.tsx            # Standard page wrapper
│   │   └── print-shell.tsx           # Print-optimized wrapper
│   ├── template-gallery/
│   │   ├── gallery-grid.tsx
│   │   ├── template-card.tsx
│   │   └── category-filter.tsx
│   ├── editor/
│   │   ├── template-editor.tsx       # Orchestrates field editors
│   │   ├── field-editor.tsx          # Renders correct editor per field type
│   │   └── autosave-indicator.tsx
│   └── print-preview/
│       ├── preview-modal.tsx
│       └── page-preview.tsx
│
├── lib/
│   ├── utils.ts
│   └── constants.ts
│
└── styles/
    ├── globals.css                   # Tailwind base + design tokens (CSS variables)
    └── print.css                     # @media print rules
```

**Structure Decision**: Single Next.js project with App Router. No backend directory — the
product is a pure static web application. Feature modules under `src/features/` enforce
domain isolation; shared UI under `src/components/`.

## Complexity Tracking

> No constitution violations — this section is empty by design.
