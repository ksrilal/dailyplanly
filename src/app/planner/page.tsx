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
    onError: () => setSaveStatus('error'),
  })
  useEffect(() => { setSaveStatus(status) }, [status, setSaveStatus])

  const clearAll = usePlannerEditor((s) => s.clearAll)

  function handleClear() {
    clearAll()
  }

  if (!planner) return <div className='flex items-center justify-center h-[calc(100vh-3.5rem)]'><p className='text-[var(--text-muted)]'>Loading...</p></div>

  return (
    <EditorLayout
      toolbar={<PlannerToolbar onExport={(f) => { if (f === 'print') window.print() }} onClear={handleClear} />}
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
