'use client'

import { cn } from '@/lib/utils'
import { CategoryIcon } from '@/components/ui/category-icon'
import type { TemplateCategory } from '@/features/templates/types'

interface CategoryFilterProps {
  categories: TemplateCategory[]
  activeSlug: string | null
  onSelect: (slug: string | null) => void
}

export function CategoryFilter({ categories, activeSlug, onSelect }: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 flex-wrap"
      role="group"
      aria-label="Filter by category"
    >
      <button
        onClick={() => onSelect(null)}
        aria-pressed={activeSlug === null}
        className={cn(
          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
          activeSlug === null
            ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
            : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelect(cat.slug)}
          aria-pressed={activeSlug === cat.slug}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
            activeSlug === cat.slug
              ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
              : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
        >
          <CategoryIcon name={cat.icon} className="h-3.5 w-3.5" />
          {cat.label}
        </button>
      ))}
    </div>
  )
}
