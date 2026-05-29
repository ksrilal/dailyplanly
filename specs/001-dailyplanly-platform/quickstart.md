# Quickstart: DailyPlanly Platform

**Date**: 2026-05-28
**Branch**: `001-dailyplanly-platform`

---

## Prerequisites

- Node.js 20+
- pnpm 9+ (`npm i -g pnpm`)

---

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```text
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage / template gallery
│   ├── templates/
│   │   ├── page.tsx              # All templates
│   │   ├── [category]/
│   │   │   ├── page.tsx          # Category page
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Template detail + editor entry
│   ├── tools/
│   │   ├── page.tsx              # All tools
│   │   ├── [category]/
│   │   │   ├── page.tsx          # Tool category
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Tool page
│   └── workspace/
│       └── [id]/
│           └── page.tsx          # Workspace editor (client-side, dynamic)
│
├── features/
│   ├── checklist/                # Checklist data model, tree ops, editor, print renderer
│   ├── templates/                # Template registry, schemas, preview renderer
│   ├── tools/                    # Tool registry, form patterns, calculation modules
│   ├── export/                   # PDF generation, print renderer, export utilities
│   ├── storage/                  # IndexedDB workspace store, localStorage recents/settings
│   └── seo/                      # Metadata generator, sitemap utilities
│
├── components/
│   ├── ui/                       # Design system primitives (Button, Input, Card, etc.)
│   ├── layout/                   # Header, Footer, PageShell, PrintShell
│   ├── template-gallery/         # Gallery grid, template card, category filter
│   ├── editor/                   # Template field editors, autosave indicator
│   └── print-preview/            # Print preview modal, page preview
│
├── lib/
│   ├── db.ts                     # idb database setup and migrations
│   ├── utils.ts                  # shared utilities
│   └── constants.ts              # app-wide constants
│
└── styles/
    ├── globals.css               # Tailwind base + CSS variables (theme tokens)
    └── print.css                 # @media print overrides
```

---

## Key Development Commands

```bash
pnpm dev          # development server (localhost:3000)
pnpm build        # production build + static export
pnpm preview      # preview static export locally
pnpm typecheck    # TypeScript strict check
pnpm test         # Vitest unit tests
pnpm test:e2e     # Playwright E2E tests
pnpm lint         # ESLint
```

---

## Adding a New Template

1. Create a schema file in `src/features/templates/schemas/[slug].ts`
2. Register it in `src/features/templates/registry.ts`
3. Add a preview image to `public/previews/templates/[slug].png`
4. The page at `/templates/[category]/[slug]` is auto-generated

## Adding a New Tool

1. Create a module in `src/features/tools/[category]/[slug].ts` with `inputs`, `calculate()`, and optional `renderOutput()`
2. Register it in `src/features/tools/registry.ts`
3. The page at `/tools/[category]/[slug]` is auto-generated

---

## Validation Checklist

After initial setup, verify:

- [ ] Homepage loads with template gallery (at least 1 template visible)
- [ ] Opening a template renders an editable form
- [ ] Editing a field triggers auto-save (check IndexedDB in DevTools → Application)
- [ ] Recents section appears after first workspace use
- [ ] Closing and reopening restores workspace content
- [ ] Export PDF downloads a clean PDF file
- [ ] Print dialog opens with correct layout
- [ ] All pages have correct `<title>` and `<meta description>`
- [ ] `pnpm build` completes with zero errors
- [ ] Static export deploys to Vercel/Netlify without server config
