import { notFound } from 'next/navigation'
import { PageShell } from '@/components/layout/page-shell'
import { GalleryGrid } from '@/components/template-gallery/gallery-grid'
import { getAllCategories, getCategory, getTemplatesByCategory } from '@/features/templates/registry'
import Link from 'next/link'
import { CategoryIcon } from '@/components/ui/category-icon'
import { ChevronRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) return {}
  return {
    title: `${cat.label} Templates`,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) notFound()

  const templates = getTemplatesByCategory(category)

  return (
    <PageShell>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-[var(--text-muted)] mb-6" aria-label="Breadcrumb">
        <Link href="/templates" className="hover:text-[var(--text-primary)] transition-colors">Templates</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[var(--text-primary)]">{cat.label}</span>
      </nav>

      {/* Category header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-center">
            <CategoryIcon name={cat.icon} className="h-6 w-6 text-[var(--text-secondary)]" />
          </div>
          <h1 className="text-3xl font-display font-semibold text-[var(--text-primary)]">{cat.label}</h1>
        </div>
        <p className="text-[var(--text-muted)] max-w-xl">{cat.description}</p>
        <p className="text-sm text-[var(--text-faint)] mt-2">{templates.length} template{templates.length !== 1 ? 's' : ''}</p>
      </div>

      <GalleryGrid templates={templates} emptyMessage={`No ${cat.label} templates yet — check back soon.`} />
    </PageShell>
  )
}
