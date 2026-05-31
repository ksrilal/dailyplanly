import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { PageShell } from '@/components/layout/page-shell'
import { Badge } from '@/components/ui/badge'
import { CategoryIcon } from '@/components/ui/category-icon'
import { getAllTools, getTool, getToolCategory } from '@/features/tools/registry'
import { getToolQuotes } from '@/features/tools/quotes'
import { ToolClient } from './tool-client'
import { QuotesPanel } from '@/components/tools/quotes-panel'

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return getAllTools().map((t) => ({ category: t.category, slug: t.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return {}
  return {
    title: tool.title,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { category, slug } = await params
  const tool = getTool(slug)
  if (!tool || tool.category !== category) notFound()

  const cat = getToolCategory(category)
  const quotes = getToolQuotes(slug, category)
  const catColor = cat?.color ?? 'text-violet-400'
  const catBg = cat?.bg ?? 'bg-violet-500/10'

  return (
    <PageShell>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-[var(--text-muted)] mb-6" aria-label="Breadcrumb">
        <Link href="/tools" className="hover:text-[var(--text-primary)] transition-colors">Tools</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {cat && (
          <>
            <Link href="/tools" className="hover:text-[var(--text-primary)] transition-colors">{cat.label}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
        <span className="text-[var(--text-primary)]">{tool.title}</span>
      </nav>

      {/* Two-column: tool left · quotes right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-10 items-start">

        {/* Tool */}
        <div className="min-w-0">
          <div className="flex items-start gap-3 mb-2 flex-wrap">
            <h1 className="text-3xl font-display font-semibold text-[var(--text-primary)]">{tool.title}</h1>
            {cat && (
              <Badge variant="secondary" className="flex items-center gap-1.5 mt-1">
                <CategoryIcon name={cat.icon} className="h-3 w-3" />
                {cat.label}
              </Badge>
            )}
          </div>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">{tool.description}</p>
          <ToolClient toolSlug={slug} />
        </div>

        {/* Quotes panel — desktop only, sticky */}
        <div className="hidden lg:block sticky top-20 self-start">
          <QuotesPanel
            quotes={quotes}
            categoryColor={catColor}
            categoryBg={catBg}
          />
        </div>
      </div>
    </PageShell>
  )
}
