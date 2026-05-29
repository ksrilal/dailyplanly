'use client'

import { useState, useMemo } from 'react'
import { Star, LayoutTemplate, CheckSquare, List, Search } from 'lucide-react'
import { PageShell } from '@/components/layout/page-shell'
import { GalleryGrid } from '@/components/template-gallery/gallery-grid'
import { CategoryIcon } from '@/components/ui/category-icon'
import { cn } from '@/lib/utils'
import { getAllTemplates, getAllCategories } from '@/features/templates/registry'

type PrimaryFilter = 'all' | 'featured' | 'planner' | 'checklist'

export default function TemplatesPage() {
  const [primary, setPrimary] = useState<PrimaryFilter>('all')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const categories = getAllCategories()
  const allTemplates = getAllTemplates()

  const sorted = useMemo(
    () => [...allTemplates].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)),
    [allTemplates]
  )

  const filtered = useMemo(() => {
    let result = sorted
    if (primary === 'featured') result = result.filter((t) => t.featured)
    else if (primary === 'planner') result = result.filter((t) => t.type === 'planner')
    else if (primary === 'checklist') result = result.filter((t) => t.type === 'checklist')

    if (activeCategory) {
      if (primary === 'checklist') {
        result = result.filter((t) => t.checklistDefaults?.mode === activeCategory)
      } else {
        result = result.filter((t) => t.category === activeCategory)
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }
    return result
  }, [sorted, primary, activeCategory, search])

  function handlePrimaryChange(id: PrimaryFilter) {
    setPrimary(id)
    setActiveCategory(null)
  }

  const countFor = (p: PrimaryFilter) => {
    if (p === 'all') return allTemplates.length
    if (p === 'featured') return allTemplates.filter((t) => t.featured).length
    if (p === 'planner') return allTemplates.filter((t) => t.type === 'planner').length
    return allTemplates.filter((t) => t.type === 'checklist').length
  }

  const emptyMsg = search
    ? `No templates match "${search}"`
    : primary === 'featured' ? 'No featured templates yet.'
    : primary === 'planner' ? 'No planner templates yet.'
    : primary === 'checklist' ? 'No checklist templates yet.'
    : 'No templates in this category yet.'

  const btnBase = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150'
  const btnInactive = 'bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
  const subBtnBase = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all'
  const subBtnInactive = 'bg-[var(--bg-subtle)] border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'

  return (
    <PageShell>
      {/* Header row: title + search */}
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-display font-semibold text-[var(--text-primary)] mb-1">Template Gallery</h1>
          <p className="text-[var(--text-muted)] text-sm">Printable planner and checklist templates for every part of your life.</p>
        </div>
        <div className="relative w-64 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-faint)] pointer-events-none" />
          <input
            type="text"
            placeholder="Search templates…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search templates"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Primary type filters */}
      <div className="flex items-center gap-2 flex-wrap mb-5" role="group" aria-label="Filter by type">

        <button onClick={() => handlePrimaryChange('all')} aria-pressed={primary === 'all'}
          className={cn(btnBase, primary === 'all' ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-transparent' : btnInactive)}>
          All
          <span className={cn('px-1.5 rounded-full text-[10px] font-bold', primary === 'all' ? 'bg-white/20' : 'bg-[var(--bg-page)] text-[var(--text-faint)]')}>{countFor('all')}</span>
        </button>

        <button onClick={() => handlePrimaryChange('featured')} aria-pressed={primary === 'featured'}
          className={cn(btnBase, primary === 'featured' ? 'bg-amber-500/25 text-amber-300 border-amber-500/40' : btnInactive)}>
          <Star className={cn('h-3.5 w-3.5', primary === 'featured' ? 'text-amber-300' : 'text-amber-400/60')} strokeWidth={2} />
          Featured
          <span className={cn('px-1.5 rounded-full text-[10px] font-bold', primary === 'featured' ? 'bg-amber-500/30' : 'bg-[var(--bg-page)] text-[var(--text-faint)]')}>{countFor('featured')}</span>
        </button>

        <button onClick={() => handlePrimaryChange('planner')} aria-pressed={primary === 'planner'}
          className={cn(btnBase, primary === 'planner' ? 'bg-violet-500/25 text-violet-300 border-violet-500/40' : btnInactive)}>
          <LayoutTemplate className={cn('h-3.5 w-3.5', primary === 'planner' ? 'text-violet-300' : 'text-violet-400/60')} strokeWidth={2} />
          Planners
          <span className={cn('px-1.5 rounded-full text-[10px] font-bold', primary === 'planner' ? 'bg-violet-500/30' : 'bg-[var(--bg-page)] text-[var(--text-faint)]')}>{countFor('planner')}</span>
        </button>

        <button onClick={() => handlePrimaryChange('checklist')} aria-pressed={primary === 'checklist'}
          className={cn(btnBase, primary === 'checklist' ? 'bg-sky-500/25 text-sky-300 border-sky-500/40' : btnInactive)}>
          <CheckSquare className={cn('h-3.5 w-3.5', primary === 'checklist' ? 'text-sky-300' : 'text-sky-400/60')} strokeWidth={2} />
          Checklists
          <span className={cn('px-1.5 rounded-full text-[10px] font-bold', primary === 'checklist' ? 'bg-sky-500/30' : 'bg-[var(--bg-page)] text-[var(--text-faint)]')}>{countFor('checklist')}</span>
        </button>

        {/* Checklist mode sub-filters — inline after checklist pill */}
        {primary === 'checklist' && (
          <>
            <div className="h-5 w-px bg-[var(--border)] mx-1" />
            {[{id: null, label: 'All modes', cls: 'bg-sky-500/15 text-sky-400 border-sky-500/25'},
              {id: 'simple', label: 'Simple', cls: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'},
              {id: 'advanced', label: 'Advanced', cls: 'bg-amber-500/20 text-amber-400 border-amber-500/30'}
            ].map((m) => (
              <button key={String(m.id)} onClick={() => setActiveCategory(m.id as string | null)}
                aria-pressed={activeCategory === m.id}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
                  activeCategory === m.id ? m.cls : 'bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                )}>
                {m.id && <List className="h-3 w-3" strokeWidth={2} />}
                {m.label}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Category sub-filter row */}
      {primary !== 'checklist' && (
        <div className="flex gap-2 flex-wrap mb-6" role="group" aria-label="Filter by category">
          <button onClick={() => setActiveCategory(null)} aria-pressed={activeCategory === null}
            className={cn(subBtnBase, activeCategory === null ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-transparent' : subBtnInactive)}>
            All
          </button>
          {categories.map((cat) => (
            <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)} aria-pressed={activeCategory === cat.slug}
              className={cn(subBtnBase, activeCategory === cat.slug ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-transparent' : subBtnInactive)}>
              <CategoryIcon name={cat.icon} className="h-3 w-3" />
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <GalleryGrid templates={filtered} emptyMessage={emptyMsg} />
    </PageShell>
  )
}
