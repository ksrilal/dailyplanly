import Link from 'next/link'
import { FileX } from 'lucide-react'
import { PageShell } from '@/components/layout/page-shell'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <PageShell className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-subtle)] flex items-center justify-center mb-6">
        <FileX className="h-8 w-8 text-[var(--text-faint)]" strokeWidth={1.5} />
      </div>
      <h1 className="text-3xl font-display font-semibold text-[var(--text-primary)] mb-3">Page not found</h1>
      <p className="text-[var(--text-muted)] mb-8 max-w-md">
        We couldn't find that page. It may have moved or never existed.
      </p>
      <div className="flex gap-3">
        <Link href="/"><Button variant="primary">Go Home</Button></Link>
        <Link href="/templates"><Button variant="outline">Browse Templates</Button></Link>
      </div>
    </PageShell>
  )
}
