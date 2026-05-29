'use client'
import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useChecklistEditor } from '@/features/checklist/editor-state'
import { saveChecklist } from '@/features/checklist/checklist-store'
import { recordOpen } from '@/features/storage/recents'
import { useAutoSave } from '@/features/storage/auto-save'
import { ChecklistLayout } from '@/components/checklist-editor/checklist-layout'
import { exportChecklistToPdf } from '@/features/export/service'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function ChecklistEditorInner({ id }: { id: string }) {
  const router = useRouter()
  const loadChecklist = useChecklistEditor((s) => s.loadChecklist)
  const checklist = useChecklistEditor((s) => s.checklist)
  const setSaveStatus = useChecklistEditor((s) => s.setSaveStatus)
  const clearAll = useChecklistEditor((s) => s.clearAll)

  useEffect(() => {
    loadChecklist(id).catch(() => router.replace('/workspace'))
  }, [id, loadChecklist, router])

  useEffect(() => {
    if (checklist) recordOpen(checklist, 'checklist')
  }, [checklist?.id])

  const { status } = useAutoSave(checklist, async (c) => { await saveChecklist(c) }, {
    onSave: () => setSaveStatus('saved'),
    onError: () => setSaveStatus('error'),
  })
  useEffect(() => { setSaveStatus(status) }, [status, setSaveStatus])

  function printChecklist() {
    const cl = checklist
    if (!cl) return
    const { computeProgress } = require('@/features/checklist/tree-ops') as typeof import('@/features/checklist/tree-ops')
    const progress = computeProgress(cl.items)
    const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    function renderItemHtml(items: NonNullable<typeof cl>['items'], parentId: string | null, depth: number): string {
      return items
        .filter((i) => i.parentId === parentId)
        .sort((a, b) => a.order - b.order)
        .map((item) => {
          const status = item.status ?? (item.checked ? 'checked' : 'unchecked')
          const indent = depth * 20
          const isParent = items.some((c) => c.parentId === item.id)
          const boxStyle = status === 'checked'
            ? 'background:#16a34a;border:none;'
            : status === 'invalid'
            ? 'background:#fee2e2;border:1.5px solid #dc2626;'
            : 'background:transparent;border:1.5px solid #d1d5db;'
          const icon = status === 'checked'
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`
            : status === 'invalid'
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10"><line x1="2" y1="2" x2="8" y2="8" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="2" x2="2" y2="8" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/></svg>`
            : ''
          const textColor = status === 'checked' ? '#9ca3af' : status === 'invalid' ? '#ef4444' : '#111827'
          const textDeco = status !== 'unchecked' ? 'line-through' : 'none'
          const fontWeight = isParent && status === 'unchecked' ? 600 : 400
          return `
            <div style="display:flex;align-items:flex-start;padding:7px 0;padding-left:${indent}px;border-bottom:0.5px solid #f3f4f6;page-break-inside:avoid">
              <div style="width:16px;height:16px;border-radius:3px;${boxStyle}flex-shrink:0;margin-right:10px;margin-top:1px;display:flex;align-items:center;justify-content:center;">${icon}</div>
              <span style="font-size:10pt;line-height:1.5;color:${textColor};text-decoration:${textDeco};font-weight:${fontWeight};">${item.text || '—'}</span>
            </div>
            ${renderItemHtml(items, item.id, depth + 1)}
          `
        }).join('')
    }

    const pct = progress.percentage
    const progressBar = progress.total > 0 ? `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
        <span style="font-size:9pt;color:#6b7280;width:80px">${progress.completed}/${progress.total} done</span>
        <div style="flex:1;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:#16a34a;border-radius:3px"></div>
        </div>
        <span style="font-size:9pt;font-weight:700;color:#16a34a;width:36px;text-align:right">${pct}%</span>
      </div>` : ''

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
      <title>${cl.title}</title>
      <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:"Helvetica Neue",Arial,sans-serif;color:#111827;background:#fff}
        /* margin:0 removes browser date/URL/page-number header & footer */
        @page{margin:0;size:A4 portrait}
        @media print{
          html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
          /* Replicate page margins in body padding since @page margin is 0 */
          body{padding:15mm 16mm}
          .page{padding:0}
        }
        .page{padding:15mm 16mm}
      </style>
    </head><body><div class="page">
      <h1 style="font-size:22pt;font-weight:700;letter-spacing:-0.5px;margin-bottom:12px">${cl.title}</h1>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin-bottom:14px">
      ${progressBar}
      <div>${renderItemHtml(cl.items, null, 0)}</div>
    </div></body></html>`

    const win = window.open('', '_blank', 'width=800,height=900')
    if (!win) return
    win.document.open()
    win.document.write(html)
    win.document.close()
    // Wait for content to fully render before printing
    setTimeout(() => {
      win.focus()
      win.print()
      // Close after print dialog is handled (delay so dialog doesn't close the window)
      setTimeout(() => win.close(), 500)
    }, 600)
  }

  async function handleExport(format: 'pdf' | 'png' | 'jpg' | 'text' | 'print') {
    if (format === 'print') {
      printChecklist()
      return
    }
    if (format === 'pdf' && checklist) {
      try {
        await exportChecklistToPdf(checklist)
      } catch (err) {
        console.error('PDF export failed:', err)
      }
    }
  }

  return <ChecklistLayout onExport={handleExport} onClear={clearAll} />
}

function Content() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  if (!id) return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] text-center'>
      <p className='text-[var(--text-muted)] mb-6'>No checklist specified.</p>
      <Link href='/checklist/new'><Button variant='primary'>New Checklist</Button></Link>
    </div>
  )
  return <ChecklistEditorInner id={id} />
}

export default function ChecklistPage() {
  return (
    <Suspense fallback={<div className='flex items-center justify-center h-[calc(100vh-3.5rem)]'><p className='text-[var(--text-muted)]'>Loading...</p></div>}>
      <Content />
    </Suspense>
  )
}
