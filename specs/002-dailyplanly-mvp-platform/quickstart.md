# Quickstart: DailyPlanly MVP Platform

**Date**: 2026-05-28
**Branch**: `002-dailyplanly-mvp-platform`

---

## Prerequisites

- Node.js 20+
- pnpm 9+

---

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Key Commands

```bash
pnpm dev          # dev server
pnpm build        # static export build
pnpm preview      # preview static export
pnpm typecheck    # TypeScript strict check
pnpm test         # Vitest unit tests
pnpm test:e2e     # Playwright E2E tests
pnpm lint         # ESLint
```

---

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx                        # Root layout: ThemeProvider, fonts, Header, Footer
│   ├── page.tsx                          # Homepage
│   ├── templates/
│   │   ├── page.tsx                      # Template gallery
│   │   ├── [category]/
│   │   │   ├── page.tsx                  # Category listing
│   │   │   └── [slug]/page.tsx           # Template detail + use
│   ├── tools/
│   │   ├── page.tsx                      # All tools
│   │   └── [category]/
│   │       └── [slug]/page.tsx           # Tool page
│   ├── planner/
│   │   └── [id]/page.tsx                 # Planner editor (client-only)
│   ├── checklist/
│   │   └── [id]/page.tsx                 # Checklist editor (client-only)
│   └── workspace/
│       └── page.tsx                      # Workspace manager
│
├── features/
│   ├── planner/
│   │   ├── block-registry.ts             # BlockRegistry implementation
│   │   ├── blocks/                       # One file per block type
│   │   │   ├── calendar.tsx
│   │   │   ├── table.tsx
│   │   │   ├── habit-tracker.tsx
│   │   │   ├── timeline.tsx
│   │   │   ├── notes.tsx
│   │   │   ├── goal.tsx
│   │   │   ├── routine.tsx
│   │   │   ├── focus.tsx
│   │   │   └── dashboard-card.tsx
│   │   ├── theme-tokens.ts               # CSS variable maps per theme
│   │   ├── planner-store.ts              # IndexedDB planner persistence
│   │   └── editor-state.ts              # Zustand planner editor slice
│   │
│   ├── checklist/
│   │   ├── tree-ops.ts                   # Pure tree operations
│   │   ├── progress.ts                   # Progress aggregation
│   │   ├── checklist-store.ts            # IndexedDB checklist persistence
│   │   └── editor-state.ts              # Zustand checklist editor slice
│   │
│   ├── templates/
│   │   ├── registry.ts                   # TemplateRegistry implementation
│   │   ├── categories.ts                 # Category definitions (8 categories)
│   │   └── schemas/                      # Template definitions
│   │       ├── daily-planner.ts
│   │       ├── weekly-planner.ts
│   │       ├── simple-checklist.ts
│   │       └── ...
│   │
│   ├── tools/
│   │   ├── registry.ts                   # ToolRegistry implementation
│   │   ├── productivity/
│   │   ├── education/
│   │   └── finance/
│   │
│   ├── export/
│   │   ├── service.ts                    # ExportService implementation
│   │   ├── pdf-renderer.tsx              # @react-pdf/renderer templates (lazy)
│   │   ├── image-exporter.ts             # html-to-image wrapper (lazy)
│   │   ├── print-renderer.tsx            # window.print() handler
│   │   └── utils.ts                      # Pagination helpers
│   │
│   ├── storage/
│   │   ├── db.ts                         # idb setup + migrations
│   │   ├── recents.ts                    # RecentsStore (localStorage)
│   │   ├── settings.ts                   # SettingsStore (localStorage)
│   │   └── auto-save.ts                  # useAutoSave hook
│   │
│   └── seo/
│       ├── metadata.ts                   # MetadataGenerator
│       └── sitemap.ts                    # next-sitemap config helper
│
├── components/
│   ├── ui/                               # shadcn/ui design system primitives
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── page-shell.tsx
│   │   └── print-shell.tsx
│   ├── planner-editor/
│   │   ├── editor-layout.tsx             # Three-panel layout
│   │   ├── block-palette.tsx             # Left sidebar
│   │   ├── planner-canvas.tsx            # Center canvas + DnD context
│   │   ├── block-settings.tsx            # Right sidebar
│   │   └── planner-toolbar.tsx           # Top toolbar
│   ├── checklist-editor/
│   │   ├── checklist-layout.tsx
│   │   ├── checklist-toolbar.tsx
│   │   ├── checklist-item.tsx            # Recursive item component
│   │   ├── progress-bar.tsx
│   │   └── checklist-search.tsx
│   ├── template-gallery/
│   │   ├── gallery-grid.tsx
│   │   ├── template-card.tsx
│   │   └── category-filter.tsx
│   ├── homepage/
│   │   ├── hero.tsx
│   │   ├── featured-templates.tsx
│   │   ├── product-sections.tsx
│   │   └── tools-preview.tsx
│   └── workspace/
│       ├── recents-grid.tsx
│       └── workspace-card.tsx
│
├── hooks/
│   ├── use-auto-save.ts
│   ├── use-planner.ts
│   └── use-checklist.ts
│
├── lib/
│   ├── utils.ts
│   └── constants.ts
│
├── styles/
│   ├── globals.css                       # Tailwind + design tokens (CSS vars)
│   └── print.css                         # @media print rules
│
└── templates/                            # Static template data files
    ├── planners/
    └── checklists/
```

---

## Adding a Block Type

1. Create `src/features/planner/blocks/[type].tsx` exporting `BlockRegistryEntry`
2. Register in `src/features/planner/block-registry.ts`
3. Block palette auto-updates; no page changes needed

## Adding a Template

1. Create definition in `src/features/templates/schemas/[slug].ts`
2. Register in `src/features/templates/registry.ts`
3. Add preview image to `public/previews/templates/[slug].png`
4. Template page at `/templates/[category]/[slug]` auto-generates

## Validation Checklist

- [ ] Homepage loads with featured templates visible
- [ ] "New Planner" → editor opens with three-panel layout
- [ ] Adding a Calendar block renders on canvas
- [ ] Dragging a block reorders it correctly
- [ ] Theme switch updates canvas instantly
- [ ] Export PDF downloads clean output
- [ ] Print opens browser print dialog with correct layout
- [ ] Checklist: add items, check off, progress bar updates
- [ ] Checklist Advanced: indent creates parent-child, collapse hides children
- [ ] Template gallery: filter by category, search by keyword both work
- [ ] Workspace closed → reopened → content restored in Recents
- [ ] `pnpm build` completes with zero errors
