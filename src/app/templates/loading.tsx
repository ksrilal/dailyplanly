import { PageShell } from '@/components/layout/page-shell'
import { Skeleton } from '@/components/ui/skeleton'

export default function TemplatesLoading() {
  return (
    <PageShell>
      <Skeleton className="h-10 w-48 mb-2" />
      <Skeleton className="h-4 w-64 mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-[3/4] rounded-[var(--radius-lg)]" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </PageShell>
  )
}
