'use client'
import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useChecklistEditor } from '@/features/checklist/editor-state'
import { saveChecklist } from '@/features/checklist/checklist-store'
import { recordOpen } from '@/features/storage/recents'
import { useAutoSave } from '@/features/storage/auto-save'
import { ChecklistLayout } from '@/components/checklist-editor/checklist-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function ChecklistEditorInner({ id }: { id: string }) {
  const router = useRouter()
  const loadChecklist = useChecklistEditor((s) => s.loadChecklist)
  const checklist = useChecklistEditor((s) => s.checklist)
  const setSaveStatus = useChecklistEditor((s) => s.setSaveStatus)

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

  const clearAll = useChecklistEditor((s) => s.clearAll)

  function handleClear() {
    clearAll()
  }

  return <ChecklistLayout onExport={(f) => { if (f === 'print') window.print() }} onClear={handleClear} />
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
