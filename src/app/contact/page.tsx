import { PageShell } from '@/components/layout/page-shell'
import { Mail, Github, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the DailyPlanly team.',
}

export default function ContactPage() {
  return (
    <PageShell className="max-w-2xl py-16">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Contact</p>
        <h1 className="text-4xl font-display font-semibold text-[var(--text-primary)] mb-4">
          Get in touch
        </h1>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
          Have a question, bug report, or feature idea? Reach out — we read everything and reply promptly.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Email */}
        <a
          href="mailto:devtoolssuite.dev@gmail.com"
          className="group flex items-center gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
            <Mail className="h-5 w-5 text-violet-400" strokeWidth={1.75} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[var(--text-primary)] mb-0.5">Email</p>
            <p className="text-sm text-[var(--text-muted)]">General queries, bug reports, feature ideas</p>
            <p className="text-sm font-medium text-violet-400 mt-1 group-hover:underline truncate">
              devtoolssuite.dev@gmail.com
            </p>
          </div>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/ksrilal/dailyplanly"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-center shrink-0">
            <Github className="h-5 w-5 text-[var(--text-primary)]" strokeWidth={1.75} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[var(--text-primary)] mb-0.5">GitHub</p>
            <p className="text-sm text-[var(--text-muted)]">Open issues, browse the source code, contribute</p>
            <p className="text-sm font-medium text-[var(--text-muted)] mt-1 group-hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1">
              github.com/ksrilal/dailyplanly
              <ExternalLink className="h-3 w-3 opacity-50" />
            </p>
          </div>
        </a>
      </div>

      <div className="mt-10 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          <strong className="text-[var(--text-primary)]">Response time:</strong> We typically reply within 1–2 business days.
          DailyPlanly is an independent project — we appreciate your patience and every piece of feedback.
        </p>
      </div>
    </PageShell>
  )
}
