import { PageShell } from '@/components/layout/page-shell'
import { Skeleton } from '@/components/ui/skeleton'

export default function ToolsLoading() {
  return (
    <PageShell>
      <Skeleton className="h-10 w-48 mb-2" />
      <Skeleton className="h-4 w-64 mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-24 rounded-[var(--radius-lg)]" />
        ))}
      </div>
    </PageShell>
  )
}
