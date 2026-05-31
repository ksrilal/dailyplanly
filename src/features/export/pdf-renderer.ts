// Lazy-loaded PDF rendering using @react-pdf/renderer
// This file is only ever imported via dynamic import from service.ts

import type { Planner, Checklist } from '@/features/storage/types'
import type { ExportConfig } from '@/features/storage/types'

export async function renderPlannerPdf(planner: Planner, config: ExportConfig): Promise<void> {
  const { pdf } = await import('@react-pdf/renderer')
  const { createElement } = await import('react')
  const { PlannerPdfDocument } = await import('./planner-pdf-doc')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = createElement(PlannerPdfDocument, { planner, config }) as any
  const blob = await pdf(doc).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${planner.title}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

export async function renderChecklistPdf(checklist: Checklist, config: ExportConfig): Promise<void> {
  const { pdf } = await import('@react-pdf/renderer')
  const { createElement } = await import('react')
  const { ChecklistPdfDocument } = await import('./checklist-pdf-doc')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = createElement(ChecklistPdfDocument, { checklist, config }) as any
  const blob = await pdf(doc).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${checklist.title}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}
