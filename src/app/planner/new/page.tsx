'use client'
import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createPlanner } from '@/features/planner/planner-store'
import { getTemplate } from '@/features/templates/registry'

function Inner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  useEffect(() => {
    async function go() {
      const t = searchParams.get('template')
      const template = t ? getTemplate(t) : undefined
      const pl = await createPlanner(template ?? undefined)
      router.replace('/planner?id=' + pl.id)
    }
    go()
  }, [router, searchParams])
  return <div className='flex items-center justify-center h-[calc(100vh-3.5rem)]'><p className='text-[var(--text-muted)]'>Creating planner...</p></div>
}
export default function Page() {
  return <Suspense fallback={<div />}><Inner /></Suspense>
}
