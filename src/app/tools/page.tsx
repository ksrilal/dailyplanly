'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/layout/page-shell'
import { CategoryIcon } from '@/components/ui/category-icon'
import { getAllTools, getAllToolCategories } from '@/features/tools/registry'
import { cn } from '@/lib/utils'
import { Search, ArrowRight, Zap, TrendingUp, BookOpen, LayoutTemplate, CheckSquare } from 'lucide-react'
import type { Tool } from '@/features/tools/types'
import { FAQSection } from '@/components/shared/faq-section'

const TOOLS_FAQ = [
  { q: 'What are the DailyPlanly tools?', a: 'DailyPlanly tools are lightweight, browser-based productivity utilities — things like a Pomodoro timer, habit streak counter, word counter, and more. They are designed to complement your planners and checklists without needing a separate app.' },
  { q: 'Are the tools free to use?', a: 'Yes, every tool is completely free. There are no premium tiers, no usage limits, and no ads. Open, use, and close — no account required.' },
  { q: 'Do the tools store any of my data?', a: 'All tools run entirely in your browser. Nothing is sent to a server. Any state that needs to persist between sessions is stored locally in your browser using localStorage or IndexedDB.' },
  { q: 'Can I use the tools offline?', a: 'Yes. After the first page load, all tools continue to work without an internet connection. This makes them reliable for travel, low-connectivity environments, or any situation where you prefer local-only software.' },
  { q: 'How do the tools integrate with my planners and checklists?', a: 'Tools are independent utilities you can use alongside your planner or checklist session. For example, run the Pomodoro timer while working through a checklist, or use the word counter while drafting notes in a planner block.' },
  { q: 'Will more tools be added in the future?', a: 'Yes. The tools library grows over time. If there is a small productivity utility you would find valuable alongside your daily planning workflow, it is a candidate for a future DailyPlanly tool.' },
]

// ─── Fixed promo blocks ───────────────────────────────────────────────────────

function PromoBlocks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {/* Planner */}
      <Link
        href="/planner/new"
        className="group relative flex flex-col justify-between p-5 rounded-2xl border border-violet-500/25 bg-violet-500/5 hover:bg-violet-500/10 hover:border-violet-500/40 hover:shadow-[0_0_24px_rgba(124,58,237,0.1)] transition-all duration-300 overflow-hidden min-h-[140px]"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 10% 50%, rgba(124,58,237,0.08), transparent)' }} />
        <div className="absolute top-4 right-4 text-violet-500/40 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
          <ArrowRight className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <LayoutTemplate className="h-5 w-5 text-violet-400" strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400/70 block">Create</span>
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-violet-300 transition-colors">New Planner</h3>
          </div>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Block-based visual planner with drag-and-drop sections, 5 themes, and PDF export.
        </p>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {['calendar','habits','goals','routine'].map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md border border-violet-500/20 text-[10px] text-violet-400/70">{t}</span>
          ))}
        </div>
      </Link>

      {/* Checklist */}
      <Link
        href="/checklist/new"
        className="group relative flex flex-col justify-between p-5 rounded-2xl border border-sky-500/25 bg-sky-500/5 hover:bg-sky-500/10 hover:border-sky-500/40 hover:shadow-[0_0_24px_rgba(14,165,233,0.1)] transition-all duration-300 overflow-hidden min-h-[140px]"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 10% 50%, rgba(14,165,233,0.07), transparent)' }} />
        <div className="absolute top-4 right-4 text-sky-500/40 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
          <ArrowRight className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
            <CheckSquare className="h-5 w-5 text-sky-400" strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400/70 block">Create</span>
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-sky-300 transition-colors">New Checklist</h3>
          </div>
        </div>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Simple flat lists or nested hierarchies with progress tracking and PDF/text export.
        </p>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {['simple','advanced','progress','nested'].map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md border border-sky-500/20 text-[10px] text-sky-400/70">{t}</span>
          ))}
        </div>
      </Link>
    </div>
  )
}

const CAT_ICON_CLASS: Record<string, string> = {
  productivity: 'text-violet-400',
  finance:      'text-amber-400',
  education:    'text-sky-400',
}

const CAT_PILL_ACTIVE: Record<string, string> = {
  productivity: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
  finance:      'bg-amber-500/20 text-amber-300 border-amber-500/40',
  education:    'bg-sky-500/20 text-sky-300 border-sky-500/40',
}

const CAT_ICON_COMPONENT: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  productivity: Zap,
  finance: TrendingUp,
  education: BookOpen,
}


function ToolCard({ tool }: { tool: Tool }) {
  const Icon = CAT_ICON_COMPONENT[tool.category] ?? Zap
  const iconColor = CAT_ICON_CLASS[tool.category] ?? 'text-violet-400'

  return (
    <Link
      href={`/tools/${tool.category}/${tool.slug}`}
      className="group relative flex flex-col gap-3 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--text-faint)]/30 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
    >
      <div className="absolute top-4 right-4 text-[var(--text-faint)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
        <ArrowRight className="h-3.5 w-3.5" />
      </div>

      <div className="w-9 h-9 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center">
        <Icon className={cn('h-4 w-4', iconColor)} strokeWidth={1.75} />
      </div>

      <div>
        <h3 className="font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--color-accent)] transition-colors leading-snug">
          {tool.title}
        </h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">{tool.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {tool.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-md border border-[var(--border)] text-[10px] text-[var(--text-faint)]">
            {tag}
          </span>
        ))}
        {tool.featured && (
          <span className="px-2 py-0.5 rounded-md border border-amber-500/25 text-[10px] text-amber-400">
            featured
          </span>
        )}
      </div>
    </Link>
  )
}

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = getAllToolCategories()
  const allTools = getAllTools()

  const filtered = useMemo(() => {
    let result = allTools
    if (activeCategory) result = result.filter((t) => t.category === activeCategory)
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
  }, [allTools, activeCategory, search])

  return (

    <PageShell wide>
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-1">All Tools</h1>
          <p className="text-sm text-[var(--text-muted)]">Click any tool to open it instantly. No loading screens.</p>
        </div>
        <div className="relative w-64 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-faint)]" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Fixed promo blocks — always visible */}
      <PromoBlocks />

      <div className="flex items-center gap-2 flex-wrap mb-6" role="group" aria-label="Filter by category">
        <button
          onClick={() => setActiveCategory(null)}
          aria-pressed={activeCategory === null}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150',
            activeCategory === null
              ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-transparent'
              : 'bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
        >
          All
          <span className={cn('px-1.5 rounded-full text-[10px] font-bold', activeCategory === null ? 'bg-white/20' : 'bg-[var(--bg-page)] text-[var(--text-faint)]')}>
            {allTools.length}
          </span>
        </button>

        {categories.map((cat) => {
          const count = allTools.filter((t) => t.category === cat.id).length
          const active = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(active ? null : cat.id)}
              aria-pressed={active}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150',
                active
                  ? cn(CAT_PILL_ACTIVE[cat.id] ?? 'bg-violet-500/20 text-violet-300 border-violet-500/40')
                  : 'bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >
              <CategoryIcon name={cat.icon} className={cn('h-3.5 w-3.5', active ? (CAT_ICON_CLASS[cat.id] ?? '') : '')} />
              {cat.label}
              <span className={cn('px-1.5 rounded-full text-[10px] font-bold', active ? 'bg-white/20' : 'bg-[var(--bg-page)] text-[var(--text-faint)]')}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[var(--text-faint)]">
          No tools match <span className="text-[var(--text-muted)] ml-1">"{search}"</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-[var(--text-faint)] mt-12">
        All tools run entirely in your browser · No login · No data sent anywhere
      </p>

      <FAQSection
        items={TOOLS_FAQ}
        subtitle="Common questions about DailyPlanly tools"
        schemaId="tools-faq"
      />
    </PageShell>
  )
}
