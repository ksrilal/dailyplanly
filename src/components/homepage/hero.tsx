import Link from 'next/link'
import { ArrowRight, LayoutTemplate, Plus } from 'lucide-react'
import { HeroAnimation } from './hero-animation'

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated canvas background */}
      <HeroAnimation />

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Bottom fade — ensures content readable over the animation band */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg-page), transparent)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-display font-semibold leading-[1.05] tracking-tight text-[var(--text-primary)] mb-6">
          Organize Your Life{' '}
          <span className="text-[var(--color-accent)]">Beautifully.</span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto mb-12">
          DailyPlanly is a calm, printable-first productivity platform.
          Beautiful planners, structured checklists, and focused tools —
          all in your browser, no account needed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/templates">
            <button className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-base shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:bg-violet-700 active:scale-[0.98] transition-all duration-200 overflow-hidden">
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)' }}
              />
              <LayoutTemplate className="h-4 w-4" strokeWidth={2} />
              Browse Templates
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2} />
            </button>
          </Link>

          <Link href="/planner/new">
            <button className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]/80 backdrop-blur-sm text-[var(--text-primary)] font-semibold text-base hover:border-violet-400/40 hover:bg-[var(--bg-subtle)] active:scale-[0.98] transition-all duration-200 shadow-sm">
              <Plus className="h-4 w-4 text-[var(--color-accent)]" strokeWidth={2.5} />
              Start a Planner
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12 text-xs text-[var(--text-faint)]">
          {['Works offline', 'No account', 'Export to PDF', 'Free forever'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[var(--text-faint)]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
