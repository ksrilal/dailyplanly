'use client'
import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePlannerEditor } from '@/features/planner/editor-state'
import { savePlanner } from '@/features/planner/planner-store'
import { recordOpen } from '@/features/storage/recents'
import { useAutoSave } from '@/features/storage/auto-save'
import { EditorLayout } from '@/components/planner-editor/editor-layout'
import { BlockPalette } from '@/components/planner-editor/block-palette'
import { PlannerCanvas } from '@/components/planner-editor/planner-canvas'
import { BlockSettings } from '@/components/planner-editor/block-settings'
import { PlannerToolbar } from '@/components/planner-editor/planner-toolbar'
import { WorkspaceNotFoundError } from '@/features/storage/types'
import { StorageFullError } from '@/features/storage/workspace-db'
import { exportPlannerToPdf } from '@/features/export/service'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import '@/features/planner/init-blocks'

function PlannerEditorInner({ id }: { id: string }) {
  const router = useRouter()
  const loadPlanner = usePlannerEditor((s) => s.loadPlanner)
  const planner = usePlannerEditor((s) => s.planner)
  const setSaveStatus = usePlannerEditor((s) => s.setSaveStatus)

  useEffect(() => {
    loadPlanner(id).catch((err) => {
      if (err instanceof WorkspaceNotFoundError) router.replace('/workspace')
    })
  }, [id, loadPlanner, router])

  useEffect(() => {
    if (planner) recordOpen(planner, 'planner')
  }, [planner?.id])

  const { status } = useAutoSave(planner, async (p) => { await savePlanner(p) }, {
    onSave: () => setSaveStatus('saved'),
    onError: (err) => setSaveStatus(err instanceof StorageFullError ? 'storage-full' : 'error'),
  })
  useEffect(() => { setSaveStatus(status) }, [status, setSaveStatus])

  const clearAll = usePlannerEditor((s) => s.clearAll)

  function handleClear() {
    clearAll()
  }

  if (!planner) return <div className='flex items-center justify-center h-[calc(100vh-3.5rem)]'><p className='text-[var(--text-muted)]'>Loading...</p></div>

  function printPlanner() {
    if (!planner) return
    const pl = planner // narrowed local ref
    const { THEME_MAP } = require('@/features/planner/theme-tokens') as typeof import('@/features/planner/theme-tokens')
    const T = THEME_MAP[pl.theme]

    function renderBlock(block: typeof pl.blocks[0]): string {
      const label = block.label
        ? `<div style="font-size:7.5pt;color:${T['--planner-text-muted']};text-transform:uppercase;letter-spacing:0.8px;margin-bottom:6pt;padding-bottom:4pt;border-bottom:0.5pt solid ${T['--planner-border']}">${block.label}</div>`
        : ''
      const content = block.content as unknown as Record<string, unknown>

      switch (block.type) {
        case 'notes': {
          const lines = content.text
            ? `<div style="font-size:10pt;white-space:pre-wrap">${content.text}</div>`
            : Array.from({ length: Number(content.lines) || 8 }, () =>
                `<div style="border-bottom:0.75pt solid ${T['--planner-border']};margin-bottom:12pt;padding-bottom:2pt"></div>`
              ).join('')
          return `${label}${lines}`
        }
        case 'focus': {
          const colors: Record<string, string> = { high: '#ef4444', medium: '#f59e0b', low: '#6366f1' }
          const items = (content.items as { label: string; priority: string }[] || [])
            .map(i => `<div style="display:flex;align-items:center;gap:6pt;margin-bottom:4pt">
              <div style="width:6pt;height:6pt;border-radius:3pt;background:${colors[i.priority] || '#888'};flex-shrink:0"></div>
              <span style="font-size:10pt">${i.label}</span></div>`).join('')
          return `${label}${items}`
        }
        case 'routine': {
          const slots = (content.slots as { time: string; label: string }[] || [])
            .map(s => `<div style="display:flex;gap:10pt;border-bottom:0.5pt solid ${T['--planner-border']};padding:3pt 0">
              <span style="font-size:8pt;color:${T['--planner-text-muted']};width:38pt;flex-shrink:0">${s.time}</span>
              <span style="font-size:10pt">${s.label}</span></div>`).join('')
          return `${label}${slots}`
        }
        case 'goal': {
          const milestones = (content.milestones as { label: string; done: boolean }[] || [])
            .map(m => `<div style="display:flex;align-items:center;gap:6pt;margin-bottom:3pt">
              <div style="width:10pt;height:10pt;border:1.5pt solid ${m.done ? '#16a34a' : T['--planner-border']};border-radius:2pt;background:${m.done ? '#16a34a' : 'transparent'};flex-shrink:0"></div>
              <span style="font-size:10pt;${m.done ? 'color:#9ca3af' : ''}">${m.label}</span></div>`).join('')
          return `${label}<div style="font-weight:700;margin-bottom:6pt">${content.goal || ''}</div>${milestones}`
        }
        case 'habit-tracker': {
          const habits = (content.habits as { label: string }[] || [])
          const days = Math.min(Number(content.days) || 7, 31)
          const header = `<div style="display:flex;gap:2pt;margin-bottom:4pt;padding-left:70pt">${Array.from({length:days},(_,i)=>`<div style="flex:1;text-align:center;font-size:5.5pt;color:${T['--planner-text-muted']}">${i+1}</div>`).join('')}</div>`
          const rows = habits.map(h => `<div style="display:flex;gap:2pt;margin-bottom:4pt;align-items:center">
            <span style="font-size:8.5pt;color:${T['--planner-text-muted']};width:68pt;flex-shrink:0">${h.label}</span>
            ${Array.from({length:days},()=>`<div style="flex:1;height:10pt;border:1pt solid ${T['--planner-border']};border-radius:1.5pt"></div>`).join('')}
          </div>`).join('')
          return `${label}${header}${rows}`
        }
        case 'table': {
          const headers = (content.headers as string[] || [])
          const rows = (content.rows as string[][] || [])
          const thead = `<tr>${headers.map(h=>`<th style="text-align:center;padding:4pt;font-size:8pt;color:${T['--planner-text-muted']};font-weight:600;border-bottom:1.5pt solid ${T['--planner-border']}">${h}</th>`).join('')}</tr>`
          const tbody = rows.map(r=>`<tr>${r.map(c=>`<td style="text-align:center;padding:5pt;font-size:9pt;border-bottom:0.5pt solid ${T['--planner-border']}">${c}</td>`).join('')}</tr>`).join('')
          return `${label}<table style="width:100%;border-collapse:collapse">${thead}${tbody}</table>`
        }
        case 'timeline': {
          const events = (content.events as { label: string; date?: string }[] || [])
            .map(e => `<div style="display:flex;gap:8pt;margin-bottom:6pt;align-items:flex-start">
              <div style="width:7pt;height:7pt;border-radius:4pt;background:${T['--planner-accent']};flex-shrink:0;margin-top:2pt"></div>
              <div><div style="font-size:10pt">${e.label}</div>${e.date?`<div style="font-size:8.5pt;color:${T['--planner-text-muted']}">${e.date}</div>`:''}</div></div>`).join('')
          return `${label}${events}`
        }
        case 'calendar': {
          const now = new Date(); const year = Number(content.year)||now.getFullYear(); const month = (Number(content.month)||now.getMonth()+1)-1
          const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
          const DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su']
          const fd=(new Date(year,month,1).getDay()+6)%7, dim=new Date(year,month+1,0).getDate()
          const cells=[...Array(fd).fill(null),...Array.from({length:dim},(_,i)=>i+1)]
          while(cells.length%7!==0)cells.push(null)
          const dhead=`<tr>${DAYS.map(d=>`<th style="text-align:center;font-size:7pt;color:${T['--planner-text-muted']};padding:2pt">${d}</th>`).join('')}</tr>`
          const wrows=Array.from({length:cells.length/7},(_,w)=>`<tr>${cells.slice(w*7,w*7+7).map(d=>`<td style="text-align:center;padding:4pt;border:0.5pt solid ${T['--planner-border']};font-size:7.5pt">${d??''}</td>`).join('')}</tr>`).join('')
          return `${label}<div style="text-align:center;font-weight:600;margin-bottom:6pt">${MONTHS[month]} ${year}</div><table style="width:100%;border-collapse:collapse">${dhead}${wrows}</table>`
        }
        case 'dashboard-card': {
          return `${label}<div style="text-align:center;padding:8pt 0"><div style="font-size:9pt;color:${T['--planner-text-muted']};margin-bottom:4pt">${content.title||''}</div><div style="font-size:22pt;font-weight:700;color:${T['--planner-accent']}">${content.value||''}${content.unit?` <span style="font-size:12pt">${content.unit}</span>`:''}</div>${content.note?`<div style="font-size:9pt;color:${T['--planner-text-muted']};margin-top:4pt">${content.note}</div>`:''}</div>`
        }
        case 'spacer': return ''
        case 'image': return content.src ? `${label}<div style="text-align:center"><img src="${content.src}" style="max-width:100%;border-radius:4pt">${content.caption?`<div style="font-size:8pt;color:${T['--planner-text-muted']};margin-top:4pt">${content.caption}</div>`:''}</div>` : ''
        default: return label
      }
    }

    // Group blocks: consecutive half-width pairs go side by side
    const sorted = [...pl.blocks].sort((a,b)=>a.order-b.order)
    const rows: typeof sorted[] = []
    let idx = 0
    while (idx < sorted.length) {
      const cur = sorted[idx], next = sorted[idx+1]
      if (cur.width === 'half' && next?.width === 'half') { rows.push([cur,next]); idx+=2 }
      else { rows.push([cur]); idx++ }
    }

    const blocksHtml = rows.map(row =>
      row.length === 2
        ? `<div style="display:flex;gap:12pt;margin-bottom:10pt">
            <div style="flex:1;padding:8pt 10pt;border:0.75pt solid ${T['--planner-border']};border-radius:4pt;background:${T['--planner-surface']};break-inside:avoid">${renderBlock(row[0])}</div>
            <div style="flex:1;padding:8pt 10pt;border:0.75pt solid ${T['--planner-border']};border-radius:4pt;background:${T['--planner-surface']};break-inside:avoid">${renderBlock(row[1])}</div>
          </div>`
        : `<div style="margin-bottom:10pt;padding:8pt 10pt;border:0.75pt solid ${T['--planner-border']};border-radius:4pt;background:${T['--planner-surface']};break-inside:avoid">${renderBlock(row[0])}</div>`
    ).join('')

    const isLandscape = pl.orientation === 'landscape'
    const size = pl.paperSize === 'A4' ? 'A4' : 'Letter'
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${pl.title}</title>
      <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:"Helvetica Neue",Arial,sans-serif;color:${T['--planner-text']};background:${T['--planner-bg']};padding:15mm 16mm}
        @page{margin:0;size:${size} ${isLandscape?'landscape':'portrait'}}
        @media print{html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact;padding:15mm 16mm}}
      </style></head><body>
      <h1 style="font-size:20pt;font-weight:700;letter-spacing:-0.5px;margin-bottom:10pt;color:${T['--planner-text']}">${planner.title}</h1>
      <hr style="border:none;border-top:1pt solid ${T['--planner-border']};margin-bottom:12pt">
      ${blocksHtml}
    </body></html>`

    const win = window.open('', '_blank', 'width=900,height=1100')
    if (!win) return
    win.document.open(); win.document.write(html); win.document.close()
    setTimeout(() => { win.focus(); win.print(); setTimeout(() => win.close(), 500) }, 600)
  }

  async function handleExport(format: 'pdf' | 'png' | 'jpg' | 'print') {
    if (format === 'print') { printPlanner(); return }
    if (format === 'pdf' && planner) {
      try {
        await exportPlannerToPdf(planner)
      } catch (err) {
        console.error('PDF export failed:', err)
      }
    }
  }

  return (
    <EditorLayout
      toolbar={<PlannerToolbar onExport={handleExport} onClear={handleClear} />}
      palette={<BlockPalette />}
      canvas={<PlannerCanvas />}
      settings={<BlockSettings />}
    />
  )
}

function Content() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  if (!id) return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] text-center'>
      <p className='text-[var(--text-muted)] mb-6'>No planner specified.</p>
      <Link href='/planner/new'><Button variant='primary'>New Planner</Button></Link>
    </div>
  )
  return <PlannerEditorInner id={id} />
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div className='flex items-center justify-center h-[calc(100vh-3.5rem)]'><p className='text-[var(--text-muted)]'>Loading...</p></div>}>
      <Content />
    </Suspense>
  )
}

