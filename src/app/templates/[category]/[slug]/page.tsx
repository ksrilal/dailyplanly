import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, LayoutTemplate, CheckSquare, List, Star } from 'lucide-react'
import { PageShell } from '@/components/layout/page-shell'
import { GalleryGrid } from '@/components/template-gallery/gallery-grid'
import { CategoryIcon } from '@/components/ui/category-icon'
import { TemplatePreviewLiveWrapper } from '@/components/template-gallery/template-preview-live-wrapper'
import { cn } from '@/lib/utils'
import { getAllTemplates, getTemplate, getCategory, getRelatedTemplates } from '@/features/templates/registry'

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return getAllTemplates().map((t) => ({ category: t.category, slug: t.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template) return {}
  return {
    title: template.title,
    description: template.description,
    openGraph: {
      title: template.title,
      description: template.description,
      images: [template.previewImage],
    },
  }
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { category, slug } = await params
  const template = getTemplate(slug)
  if (!template || template.category !== category) notFound()

  const cat = getCategory(category)
  const related = getRelatedTemplates(slug, 4)
  const checklistMode = template.checklistDefaults?.mode
  const isPlanner = template.type === 'planner'

  const editorPath = isPlanner
    ? `/planner/new?template=${template.slug}`
    : `/checklist/new?template=${template.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: template.title,
    description: template.description,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'All',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageShell>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-[var(--text-muted)] mb-8" aria-label="Breadcrumb">
          <Link href="/templates" className="hover:text-[var(--text-primary)] transition-colors">Templates</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          {cat && (
            <>
              <Link href={`/templates/${category}`} className="hover:text-[var(--text-primary)] transition-colors">{cat.label}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
            </>
          )}
          <span className="text-[var(--text-primary)] font-medium">{template.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">

          {/* ── Left: live preview of real planner/checklist content ── */}
          <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--border)]" style={{ minHeight: '520px', background: '#faf8f5' }}>
            <TemplatePreviewLiveWrapper template={template} />
            {/* Bottom fade — blends short content into paper bg */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none rounded-b-2xl"
              style={{ background: 'linear-gradient(to bottom, transparent, #faf8f5)' }}
            />
            {/* Subtle corner label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="text-[10px] text-gray-400/60 font-medium tracking-widest uppercase">Preview</span>
            </div>
          </div>

          {/* ── Right: details ── */}
          <div className="flex flex-col gap-6 lg:pt-2">

            {/* Badges row */}
            <div className="flex items-center gap-2 flex-wrap">
              {template.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950">
                  <Star className="h-2.5 w-2.5" strokeWidth={2.5} fill="currentColor" />
                  Featured
                </span>
              )}
              <span className={cn(
                'inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider',
                isPlanner ? 'bg-violet-600 text-white' : 'bg-sky-500 text-white'
              )}>
                {isPlanner
                  ? <LayoutTemplate className="h-2.5 w-2.5" strokeWidth={2.5} />
                  : <CheckSquare className="h-2.5 w-2.5" strokeWidth={2.5} />
                }
                {isPlanner ? 'Planner' : 'Checklist'}
              </span>
              {checklistMode && (
                <span className={cn(
                  'inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider',
                  checklistMode === 'simple' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
                )}>
                  <List className="h-2.5 w-2.5" strokeWidth={2.5} />
                  {checklistMode}
                </span>
              )}
              {cat && (
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
                  <CategoryIcon name={cat.icon} className="h-3 w-3" />
                  {cat.label}
                </span>
              )}
            </div>

            {/* Title + description */}
            <div>
              <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-3 leading-tight">
                {template.title}
              </h1>
              <p className="text-[var(--text-muted)] text-base leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2">
              <Link href={editorPath}>
                <button className={cn(
                  'group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 overflow-hidden shadow-lg active:scale-[0.98]',
                  isPlanner
                    ? 'bg-violet-600 text-white shadow-violet-500/30 hover:bg-violet-700 hover:shadow-violet-500/50'
                    : 'bg-sky-500 text-white shadow-sky-500/30 hover:bg-sky-600 hover:shadow-sky-500/50'
                )}>
                  {/* Shimmer */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)' }} />
                  {isPlanner
                    ? <LayoutTemplate className="h-4 w-4" strokeWidth={2} />
                    : <CheckSquare className="h-4 w-4" strokeWidth={2} />
                  }
                  Use This Template
                  <svg className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-150" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </Link>
              <p className="text-xs text-[var(--text-faint)]">No login required · Saves locally · Works offline</p>
            </div>

            {/* Tags */}
            {template.tags.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] bg-[var(--bg-subtle)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Related Templates</h2>
            <GalleryGrid templates={related} />
          </section>
        )}
      </PageShell>
    </>
  )
}
