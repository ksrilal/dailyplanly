import { GalleryGrid } from '@/components/template-gallery/gallery-grid'
import { getFeaturedTemplates } from '@/features/templates/registry'
import { ViewAllLink } from './view-all-link'

export function FeaturedTemplates() {
  const featured = getFeaturedTemplates(8)

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-[var(--text-primary)]">Featured Templates</h2>
          <p className="text-[var(--text-muted)] mt-1 text-sm">Ready-to-use, beautifully designed, and printable.</p>
        </div>
        <ViewAllLink href="/templates" />
      </div>
      <GalleryGrid templates={featured} />
    </section>
  )
}
