import Link from 'next/link'
import { Zap, TrendingUp, BookOpen, ArrowRight } from 'lucide-react'
import { getAllTools } from '@/features/tools/registry'
import { ViewAllLink } from './view-all-link'
import { cn } from '@/lib/utils'

const CAT_STYLES: Record<string, { icon: typeof Zap; bg: string; text: string; border: string }> = {
  productivity: { icon: Zap,        bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
  finance:      { icon: TrendingUp, bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20' },
  education:    { icon: BookOpen,   bg: 'bg-sky-500/10',    text: 'text-sky-400',    border: 'border-sky-500/20' },
}

export function ToolsPreview() {
  const tools = getAllTools().slice(0, 3)

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-semibold text-[var(--text-primary)]">Productivity Tools</h2>
          <p className="text-[var(--text-muted)] mt-1 text-sm">Lightweight calculators and planners, right in your browser.</p>
        </div>
        <ViewAllLink href="/tools" label="View all" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const style = CAT_STYLES[tool.category] ?? CAT_STYLES.productivity
          const Icon = style.icon
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group relative flex flex-col gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--text-faint)]/30 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl', style.bg)} />

              {/* Arrow */}
              <div className={cn('absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200', style.text)}>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>

              {/* Icon */}
              <div className={cn('relative w-9 h-9 rounded-lg flex items-center justify-center border', style.bg, style.border)}>
                <Icon className={cn('h-4 w-4', style.text)} strokeWidth={1.75} />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className={cn('text-sm font-semibold text-[var(--text-primary)] mb-1.5 group-hover:transition-colors', `group-hover:${style.text}`)}>
                  {tool.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">{tool.description}</p>
              </div>

              {/* Category label */}
              <div className="relative mt-auto">
                <span className={cn('text-[10px] font-semibold uppercase tracking-wider', style.text)}>
                  {tool.category}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
