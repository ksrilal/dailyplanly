# Research: DailyPlanly Platform — Core Systems

**Feature**: 001-dailyplanly-platform
**Date**: 2026-05-28
**Status**: Complete — all NEEDS CLARIFICATION resolved

---

## 1. Framework Decision

**Decision**: Next.js 15 (App Router) with React 19, TypeScript strict mode

**Rationale**:
- Static site export (`output: 'export'`) satisfies static deployment compatibility
- App Router enables file-system-based SEO-friendly routing with zero config
- Server Components allow metadata generation (title, OG tags) at build time with no JS cost
- RSC reduces hydration cost — static template/tool pages ship minimal client JS
- `next/dynamic` provides lazy loading for heavy modules (PDF engine, editors)
- Industry standard for printable-first, SEO-critical web apps in 2026

**Alternatives considered**:
- Astro: Excellent for static/SEO but weaker React ecosystem for interactive editors
- Vite + React Router: No SSR/SSG metadata generation without extra config
- Remix: Server-first model adds backend complexity; violates static deployment principle

---

## 2. PDF / Print Export

**Decision**: `@react-pdf/renderer` for programmatic PDF generation; native browser `window.print()` for print dialog

**Rationale**:
- Fully client-side; no server round-trip
- React-native component model — reuses layout primitives
- Produces consistent output regardless of browser print settings
- `window.print()` as fast secondary path for users who prefer browser print
- Print CSS (`@media print`) used for direct print styling as a zero-dependency fallback

**Alternatives considered**:
- `jsPDF` + `html2canvas`: Lower fidelity; canvas rasterization produces blurry output
- Puppeteer/headless Chrome: Requires server; violates browser-first principle
- `pdfmake`: JSON-driven; harder to align with React component model

---

## 3. Local Storage / Persistence

**Decision**: `idb` (lightweight IndexedDB wrapper) as primary; `localStorage` for small metadata (recents list, settings)

**Rationale**:
- IndexedDB handles large workspace blobs without 5MB quota limits
- `idb` is 1.1kb gzipped — minimal bundle impact
- localStorage used only for recents index and UI preferences (fast, synchronous)
- Auto-save via debounced writes on every content change
- No cloud sync — all data stays in browser storage

**Alternatives considered**:
- PouchDB: Too heavy (40kb+); CouchDB sync model unnecessary
- localStorage only: 5MB quota too small for rich template workspaces
- OPFS (Origin Private File System): Promising but browser support not yet universal (2026)

---

## 4. State Management

**Decision**: Zustand for lightweight client state; React Server Components for static/read-only data

**Rationale**:
- Zustand is 1.1kb gzipped; avoids Redux/Context boilerplate
- Server Components handle template/tool catalog (static data, no client JS)
- Zustand slices per feature domain: workspace, editor, settings, recents
- Eliminates prop drilling without hydration penalty

**Alternatives considered**:
- Redux Toolkit: Heavier; overkill for this scope
- Jotai/Recoil: Fine alternatives; Zustand chosen for simpler API
- React Context only: Performance issues with frequent auto-save updates

---

## 5. Design System / Styling

**Decision**: Tailwind CSS v4 + custom design tokens; `shadcn/ui` primitives for accessible components

**Rationale**:
- Tailwind v4 CSS-first config eliminates build-step overhead
- `shadcn/ui` components are copied into the codebase (no runtime dependency)
- Design tokens encode calm palette, spacing scale, and typography in one place
- Dark/light theme via CSS variables + `next-themes`
- Paper-inspired aesthetic via warm neutrals, soft shadows, generous whitespace

**Alternatives considered**:
- CSS Modules: More verbose; harder to maintain design token consistency
- Styled Components/Emotion: Runtime CSS-in-JS increases hydration cost
- Material UI / Radix (full): Too opinionated; conflicts with DailyPlanly aesthetic

---

## 6. SEO Architecture

**Decision**: Next.js App Router `generateMetadata()` + static params for all template/tool routes

**Rationale**:
- `generateMetadata()` produces unique `<title>`, `<meta description>`, and OG tags per page at build time
- `generateStaticParams()` pre-renders all template/tool pages as static HTML
- No JS required for search engine indexing
- `next-sitemap` generates sitemap.xml automatically from all static routes
- Open Graph image generation via `next/og` (Edge runtime, no server)

**Alternatives considered**:
- Client-side meta tags (react-helmet): Not SSR-friendly; poor crawler support
- Manual sitemap: Brittle; grows unmaintainable as template/tool count scales

---

## 7. Checklist Data Model

**Decision**: Recursive tree model with flat storage representation

**Rationale**:
- Nested checklists require parent-child relationships with unlimited depth
- Flat array + `parentId` references allows efficient storage and traversal
- Progress aggregation walks the tree and counts completion ratios
- Printable hierarchy rendering flattens tree with indentation levels

---

## 8. Template Schema

**Decision**: JSON schema per template type; versioned schemas with migration support

**Rationale**:
- Templates vary by type (daily planner, weekly calendar, habit tracker, etc.)
- JSON schema enables type-safe editing in TypeScript
- Versioned schemas allow safe migration of stored user workspaces
- Category metadata (name, slug, description) lives alongside schema for SEO use

---

## 9. Testing Strategy

**Decision**: Vitest (unit/integration) + Playwright (E2E critical paths)

**Rationale**:
- Vitest integrates with Vite/Next.js toolchain natively
- Unit tests for: storage utilities, export helpers, checklist tree operations, form validators
- Playwright for: template open → edit → export flow, workspace recovery, tool calculations
- No backend to mock — all tests run against real browser APIs

---

## 10. Resolved NEEDS CLARIFICATION Items

All items from spec.md were fully resolved by constitution + user input. No open questions remain.

| Question | Resolution |
|---|---|
| Framework? | Next.js 15, App Router, static export |
| PDF library? | @react-pdf/renderer (client-side) |
| Storage? | IndexedDB (idb) + localStorage |
| State? | Zustand slices + RSC |
| Styling? | Tailwind v4 + shadcn/ui + next-themes |
| SEO metadata? | generateMetadata() + generateStaticParams() |
| Testing? | Vitest + Playwright |
