# Research: DailyPlanly MVP Platform

**Feature**: 002-dailyplanly-mvp-platform
**Date**: 2026-05-28
**Status**: Complete — all technical decisions resolved from user-provided stack

---

## 1. Stack Confirmation

**Decision**: Next.js 15 (App Router, `output: 'export'`), React 19, TypeScript strict,
Tailwind CSS v4, Zustand 5, idb 8 (IndexedDB), next-themes, next-sitemap

**Rationale**: Explicitly specified by user. Consistent with spec `001-dailyplanly-platform`
research decisions. No changes.

**Additions for this spec**:
- `@dnd-kit/core` + `@dnd-kit/sortable` — drag-and-drop for planner blocks and checklist
  items (replaces heavier alternatives; 8kb gzipped, accessible, touch-friendly)
- `html-to-image` — client-side PNG/JPG export from canvas DOM nodes (lazy-loaded)
- `@react-pdf/renderer` — PDF export (lazy-loaded, consistent with spec 001 decision)

---

## 2. Planner Block System

**Decision**: Block registry pattern — each block type is a self-contained module
registered in a central `BlockRegistry`. Blocks are identified by `type` string.

**Rationale**:
- Enables adding new block types without modifying the layout engine
- Each block module exports: `type`, `label`, `icon`, `defaultContent`, `EditorComponent`,
  `PreviewComponent`, `PrintComponent`
- Layout engine renders blocks by looking up registered components by type
- Drag-and-drop operates on block IDs in an ordered array

**Alternatives considered**:
- Switch statement in layout engine: Not scalable; becomes a monolith as block count grows
- Dynamic imports per block: Adds complexity; block modules are small enough to bundle together

---

## 3. Drag-and-Drop

**Decision**: `@dnd-kit/core` + `@dnd-kit/sortable` for both planner block reordering
and checklist item reordering

**Rationale**:
- Keyboard accessible out of the box (WCAG 2.1 compliance)
- Touch-friendly (mobile drag-and-drop works without extra config)
- 8kb gzipped — lightest production-ready accessible DnD library
- Works within Next.js RSC boundaries (client component islands)
- Used widely in productivity apps (Vercel's own products)

**Alternatives considered**:
- `react-beautiful-dnd`: Archived/unmaintained as of 2024
- `react-dnd`: Heavier, more complex setup, no built-in accessibility
- Native HTML5 drag-and-drop: No touch support, no keyboard support

---

## 4. PNG / JPG Export

**Decision**: `html-to-image` library (lazy-loaded) for canvas-to-image export

**Rationale**:
- Captures the rendered DOM canvas directly — no separate render pass required
- Outputs PNG and JPEG with configurable scale
- 28kb gzipped; acceptable as a lazy-loaded chunk
- Simple API: `toPng(element)`, `toJpeg(element, { quality: 0.95 })`

**Alternatives considered**:
- `html2canvas`: Older, higher fidelity issues with CSS gradients and custom fonts
- Server-side screenshot (Playwright/Puppeteer): Violates browser-first principle
- Canvas API manual rendering: Extremely high effort; not worth the cost for export-only

---

## 5. Planner Theme System

**Decision**: CSS custom properties (CSS variables) per theme, toggled by a `data-theme`
attribute on the planner canvas root element

**Rationale**:
- Zero JavaScript required for theme switching — no re-render of the entire canvas
- Themes defined as named token sets: `--planner-bg`, `--planner-text`, `--planner-accent`,
  `--planner-border`, `--planner-font-heading`, `--planner-font-body`
- Five themes: Minimal, Soft Paper, Elegant Dark, Study Focus, Wellness Calm
- Print-safe: `@media print` respects CSS variables correctly in modern browsers
- Themes are compatible with PNG/JPG export since `html-to-image` captures computed styles

**Alternatives considered**:
- Tailwind theme classes: Works but requires verbose class swapping per block component
- Inline styles per theme: Hard to maintain; breaks pseudo-element styling

---

## 6. Planner Layout Grid

**Decision**: Structured single-column page layout with configurable block height and
optional two-column arrangement per block — NOT a freeform canvas

**Rationale**:
- Aligns with constitution Anti-Scope principle (no freeform canvas tool)
- Matches print page structure: blocks stack vertically within page columns
- Drag-and-drop reorders blocks in the array; no x/y position state needed
- Simplifies PDF/print output significantly (no absolute positioning)
- `@dnd-kit/sortable` is built exactly for this use case

---

## 7. Checklist Tree Model

**Decision**: Recursive `ChecklistItem` tree stored as a flat array with `parentId`
references (same as spec 001 `ChecklistNode` model — unified)

**Rationale**:
- Flat storage is efficient for IndexedDB serialization
- Tree operations (add, remove, indent, outdent, move) are O(n) on flat array
- Progress aggregation walks the tree once — O(n)
- Compatible with `@dnd-kit/sortable` (sortable handles flat arrays with parent tracking)

---

## 8. Image Preview Generation (Template Gallery)

**Decision**: Static pre-rendered PNG screenshots committed to `public/previews/` —
generated once at template authoring time, not at runtime

**Rationale**:
- Zero runtime cost for gallery page rendering
- Works with Next.js `<Image>` optimization
- No dependency on server-side headless browser
- For MVP: hand-crafted or screenshot-generated images are acceptable
- Future: a build-time script can auto-generate previews using Playwright in CI

---

## 9. Testing Strategy

**Decision**: Vitest (unit/integration) + Playwright (E2E critical paths)

**Rationale**: Same as spec 001. Planner-specific additions:
- Unit tests for: BlockRegistry lookup, planner theme token resolution, checklist tree ops,
  progress aggregation
- E2E: planner create → add blocks → drag-reorder → export PDF flow

---

## 10. All Resolved Items

| Question | Resolution |
|---|---|
| DnD library? | @dnd-kit/core + @dnd-kit/sortable |
| PNG/JPG export? | html-to-image (lazy-loaded) |
| PDF export? | @react-pdf/renderer (lazy-loaded, from spec 001) |
| Planner layout model? | Structured column grid, not freeform canvas |
| Theme system? | CSS custom properties per theme on data-theme attribute |
| Checklist tree storage? | Flat array with parentId references |
| Template preview images? | Static PNGs in public/previews/ |
| Testing? | Vitest + Playwright |
