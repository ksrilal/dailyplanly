# Contract: Export API

**Type**: Internal TypeScript module interfaces
**Consumer**: Planner editor, checklist editor, tool output views
**Date**: 2026-05-28

---

## ExportService

```typescript
interface ExportService {
  // Export a planner to PDF (lazy-loads @react-pdf/renderer)
  exportPlannerToPdf(planner: Planner, config?: Partial<ExportConfig>): Promise<void>

  // Export a planner to PNG (lazy-loads html-to-image)
  exportPlannerToPng(element: HTMLElement, config?: Partial<ExportConfig>): Promise<void>

  // Export a planner to JPG (lazy-loads html-to-image)
  exportPlannerToJpg(element: HTMLElement, config?: Partial<ExportConfig>): Promise<void>

  // Trigger browser print for a planner
  printPlanner(planner: Planner, config?: Partial<ExportConfig>): void

  // Export a checklist to PDF
  exportChecklistToPdf(checklist: Checklist, config?: Partial<ExportConfig>): Promise<void>

  // Export a checklist to plain text (.txt download)
  exportChecklistToText(checklist: Checklist): void

  // Export a checklist to PNG
  exportChecklistToPng(element: HTMLElement, config?: Partial<ExportConfig>): Promise<void>

  // Trigger browser print for a checklist
  printChecklist(checklist: Checklist, config?: Partial<ExportConfig>): void
}
```

## PrintRenderer

```typescript
interface PrintRenderer {
  // Render planner into print-safe React tree (used by both PDF and window.print())
  renderPlanner(planner: Planner, config: ExportConfig): React.ReactElement

  // Render checklist into print-safe React tree
  renderChecklist(checklist: Checklist, config: ExportConfig): React.ReactElement

  // Check if content needs multi-page layout
  requiresPagination(element: HTMLElement, config: ExportConfig): boolean
}
```

## Export Events

```typescript
type ExportEvent =
  | { type: 'export:started'; format: ExportConfig['format'] }
  | { type: 'export:completed'; format: ExportConfig['format']; durationMs: number }
  | { type: 'export:failed'; format: ExportConfig['format']; error: string }
```
