'use client'

import Link from 'next/link'
import { LayoutTemplate, CheckSquare, List, Star } from 'lucide-react'
import { CategoryIcon } from '@/components/ui/category-icon'
import { TemplatePreview } from './template-preview'
import { cn } from '@/lib/utils'
import type { Template } from '@/features/templates/types'
import { getAllCategories } from '@/features/templates/registry'

const categoryMap = new Map(getAllCategories().map((c) => [c.id, c]))

// ─── Featured badge ───────────────────────────────────────────────────────────
function FeaturedBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950 shadow-sm">
      <Star className="h-2.5 w-2.5" strokeWidth={2.5} fill="currentColor" />
      Featured
    </span>
  )
}

// ─── Type badge: Planner / Checklist ─────────────────────────────────────────
function TypeBadge({ type }: { type: 'planner' | 'checklist' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm',
        type === 'planner'
          ? 'bg-violet-600 text-white'
          : 'bg-sky-500 text-white'
      )}
    >
      {type === 'planner'
        ? <LayoutTemplate className="h-2.5 w-2.5" strokeWidth={2.5} />
        : <CheckSquare className="h-2.5 w-2.5" strokeWidth={2.5} />
      }
      {type === 'planner' ? 'Planner' : 'Checklist'}
    </span>
  )
}

// ─── Mode badge: Simple / Advanced ───────────────────────────────────────────
function ModeBadge({ mode }: { mode: 'simple' | 'advanced' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm',
        mode === 'simple'
          ? 'bg-emerald-500 text-white'
          : 'bg-orange-500 text-white'
      )}
    >
      <List className="h-2.5 w-2.5" strokeWidth={2.5} />
      {mode === 'simple' ? 'Simple' : 'Advanced'}
    </span>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function TemplateCard({ template, className }: { template: Template; className?: string }) {
  const category = categoryMap.get(template.category)
  const editorPath = template.type === 'planner'
    ? `/planner/new?template=${template.slug}`
    : `/checklist/new?template=${template.slug}`
  const checklistMode = template.checklistDefaults?.mode

  return (
    <div className={cn(
      'group flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden',
      'hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200',
      className
    )}>
      {/* Preview area */}
      <Link
        href={`/templates/${template.category}/${template.slug}`}
        className="block relative overflow-hidden"
        style={{ height: '180px' }}
      >
        <TemplatePreview
          templateId={template.id}
          templateType={template.type}
          category={template.category}
          className="absolute inset-0 w-full h-full"
        />
        {/* Subtle hover tint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-200" />

        {/* Top-left: Featured */}
        {template.featured && (
          <div className="absolute top-2 left-2">
            <FeaturedBadge />
          </div>
        )}

        {/* Top-right: Type + Mode stacked */}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          <TypeBadge type={template.type} />
          {checklistMode && <ModeBadge mode={checklistMode} />}
        </div>
      </Link>

      {/* Card body — flex-1 so button always sits at bottom */}
      <div className="flex flex-col flex-1 gap-1.5 p-3">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/templates/${template.category}/${template.slug}`}>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--color-accent)] transition-colors leading-snug">
              {template.title}
            </h3>
          </Link>
          {category && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] text-[var(--text-faint)]">
              <CategoryIcon name={category.icon} className="h-3 w-3" />
              <span className="hidden sm:inline">{category.label}</span>
            </span>
          )}
        </div>

        <p className="text-xs text-[var(--text-muted)] line-clamp-2 flex-1">{template.description}</p>

        <Link href={editorPath} className="block mt-auto pt-2">
          <span className={cn(
            'group/btn flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold transition-all duration-150',
            template.type === 'planner'
              ? 'bg-violet-600/12 text-violet-400 border border-violet-500/25 hover:bg-violet-600 hover:text-white hover:border-violet-600 hover:shadow-md hover:shadow-violet-500/25'
              : 'bg-sky-500/12 text-sky-400 border border-sky-500/25 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-md hover:shadow-sky-500/25'
          )}>
            Use Template
            <svg className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform duration-150" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  )
}
