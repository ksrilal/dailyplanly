# Contract: Export API

**Type**: Internal TypeScript module interface
**Consumer**: Template editor, Tool output views
**Date**: 2026-05-28

---

## ExportService

```typescript
interface ExportService {
  // Generate and download a PDF from a workspace
  exportWorkspaceToPdf(
    workspace: Workspace,
    template: Template,
    config?: Partial<ExportConfig>
  ): Promise<void>

  // Trigger browser print dialog for a workspace
  printWorkspace(
    workspace: Workspace,
    template: Template,
    config?: Partial<ExportConfig>
  ): void

  // Generate and download a PDF from tool output
  exportToolOutputToPdf(
    toolId: string,
    output: Record<string, unknown>,
    config?: Partial<ExportConfig>
  ): Promise<void>

  // Render a workspace to a React PDF document (for preview)
  renderWorkspaceToPdfDocument(
    workspace: Workspace,
    template: Template,
    config?: Partial<ExportConfig>
  ): React.ReactElement  // @react-pdf/renderer Document element
}
```

## PrintRenderer

Low-level rendering interface consumed by ExportService.

```typescript
interface PrintRenderer {
  // Render template + content into print-safe React element
  render(
    template: Template,
    content: WorkspaceContent,
    config: ExportConfig
  ): React.ReactElement

  // Check if content requires multiple pages
  requiresPagination(
    template: Template,
    content: WorkspaceContent,
    config: ExportConfig
  ): boolean
}
```

---

## Export Events

```typescript
type ExportEvent =
  | { type: 'export:started'; format: 'pdf' | 'print' }
  | { type: 'export:completed'; format: 'pdf' | 'print'; durationMs: number }
  | { type: 'export:failed'; format: 'pdf' | 'print'; error: string }
```
