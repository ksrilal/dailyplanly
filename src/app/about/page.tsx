import { PageShell } from '@/components/layout/page-shell'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about DailyPlanly — a calm, printable-first productivity platform built for everyday organisation.',
}

export default function AboutPage() {
  return (
    <PageShell className="max-w-3xl py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">About</p>
        <h1 className="text-4xl font-display font-semibold text-[var(--text-primary)] mb-4">
          Built for calm productivity.
        </h1>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
          DailyPlanly is a free, browser-based productivity platform focused on printable planners,
          structured checklists, and lightweight tools — all without requiring an account or storing
          your data on any server.
        </p>
      </div>

      <div className="flex flex-col gap-10 text-[var(--text-secondary)] leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Our Mission</h2>
          <p>
            We believe productivity tools should feel calm, not overwhelming. Most apps add complexity
            in the name of power. DailyPlanly takes the opposite approach — give people beautiful,
            printable templates they can open instantly, customize easily, and export cleanly.
          </p>
          <p className="mt-3">
            Simplicity is the product. Every decision we make is guided by one question: does this
            make the experience calmer and more useful, or does it add noise?
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What We Build</h2>
          <ul className="flex flex-col gap-2">
            {[
              'Visual planner systems with drag-and-drop block layouts',
              'Simple and advanced nested checklist editors',
              'A curated gallery of printable templates across 8 categories',
              'Lightweight productivity calculators and tools',
              'Beautiful PDF and print export for every template',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Privacy by Design</h2>
          <p>
            Everything you create on DailyPlanly stays on your device. Your planners and checklists
            are stored in your browser's local storage — never uploaded to any server. There are no
            accounts, no tracking, and no cloud sync.
          </p>
          <p className="mt-3">
            We built it this way intentionally. Your productivity data is personal. It should stay that way.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What We Are Not</h2>
          <p className="mb-3">We explicitly chose not to be:</p>
          <ul className="flex flex-col gap-2">
            {[
              'A Notion clone or enterprise wiki',
              'A collaboration platform with shared workspaces',
              'A subscription-gated productivity suite',
              'A freeform canvas or design tool',
              'A social productivity app',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[var(--text-muted)]">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--text-faint)] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="pt-4 border-t border-[var(--border)]">
          <p className="text-[var(--text-muted)]">
            Have a question or want to get in touch?{' '}
            <Link href="/contact" className="text-[var(--color-accent)] hover:underline">
              Contact us
            </Link>.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
