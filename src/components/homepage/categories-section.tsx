import Link from 'next/link'
import { getAllCategories } from '@/features/templates/registry'
import { CategoryIcon } from '@/components/ui/category-icon'

export function CategoriesSection() {
  const categories = getAllCategories()

  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-display font-semibold text-[var(--text-primary)]">Browse by Category</h2>
        <p className="text-[var(--text-muted)] mt-2">Find templates for every part of your life.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/templates/${cat.slug}`}
            className="flex flex-col items-center gap-3 p-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200 text-center group"
          >
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--bg-subtle)] flex items-center justify-center group-hover:bg-[var(--color-accent-soft)] transition-colors">
              <CategoryIcon name={cat.icon} className="h-5 w-5 text-[var(--text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{cat.label}</p>
            <p className="text-xs text-[var(--text-faint)] line-clamp-2">{cat.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
