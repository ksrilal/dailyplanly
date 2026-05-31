import type { Planner, Checklist, ExportConfig } from '@/features/storage/types'

const DEFAULT_CONFIG: ExportConfig = {
  format: 'pdf',
  paperSize: 'A4',
  orientation: 'portrait',
  scale: 1,
  margins: { top: 15, right: 15, bottom: 15, left: 15 },
  includeHeader: true,
  includeFooter: false,
}

function buildConfig(override?: Partial<ExportConfig>): ExportConfig {
  return { ...DEFAULT_CONFIG, ...override }
}

// ─── Browser print (synchronous, no lazy load needed) ────────────────────────

export function printWorkspace(): void {
  window.print()
}

// ─── PNG / JPG export (lazy-loads html-to-image) ─────────────────────────────

export async function exportElementToPng(
  element: HTMLElement,
  filename: string,
  config?: Partial<ExportConfig>
): Promise<void> {
  const cfg = buildConfig(config)
  const { toPng } = await import('html-to-image')
  const dataUrl = await toPng(element, { pixelRatio: cfg.scale * 2 })
  downloadDataUrl(dataUrl, `${filename}.png`)
}

export async function exportElementToJpg(
  element: HTMLElement,
  filename: string,
  config?: Partial<ExportConfig>
): Promise<void> {
  const { toJpeg } = await import('html-to-image')
  const dataUrl = await toJpeg(element, { quality: 0.95, pixelRatio: 2 })
  downloadDataUrl(dataUrl, `${filename}.jpg`)
}

// ─── PDF export (lazy-loads @react-pdf/renderer) ─────────────────────────────

export async function exportPlannerToPdf(planner: Planner, config?: Partial<ExportConfig>): Promise<void> {
  const cfg = buildConfig({
    ...config,
    format: 'pdf',
    // Use the planner's own paper size and orientation settings
    paperSize: planner.paperSize ?? 'A4',
    orientation: planner.orientation ?? 'portrait',
  })
  const { renderPlannerPdf } = await import('./pdf-renderer')
  await renderPlannerPdf(planner, cfg)
}

export async function exportChecklistToPdf(checklist: Checklist, config?: Partial<ExportConfig>): Promise<void> {
  const cfg = buildConfig({ ...config, format: 'pdf' })
  const { renderChecklistPdf } = await import('./pdf-renderer')
  await renderChecklistPdf(checklist, cfg)
}

// ─── Plain text export ────────────────────────────────────────────────────────

export function exportChecklistToText(checklist: Checklist): void {
  const { getRoots, getChildren } = require('@/features/checklist/tree-ops') as typeof import('@/features/checklist/tree-ops')

  function renderItem(items: typeof checklist.items, parentId: string | null, depth: number): string {
    return items
      .filter((i) => i.parentId === parentId)
      .sort((a, b) => a.order - b.order)
      .map((i) => {
        const prefix = '  '.repeat(depth) + (i.checked ? '[x]' : '[ ]')
        const children = renderItem(items, i.id, depth + 1)
        return `${prefix} ${i.text}${children ? '\n' + children : ''}`
      })
      .join('\n')
  }

  const text = `${checklist.title}\n${'─'.repeat(40)}\n\n${renderItem(checklist.items, null, 0)}`
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${checklist.title}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function downloadDataUrl(dataUrl: string, filename: string): void {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.click()
}
