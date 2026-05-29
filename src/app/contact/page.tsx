import { PageShell } from '@/components/layout/page-shell'
import { Mail, MessageSquare, Bug, Lightbulb } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the DailyPlanly team.',
}

const contacts = [
  {
    icon: MessageSquare,
    title: 'General Enquiries',
    description: 'Questions about DailyPlanly, how it works, or anything else.',
    email: 'hello@dailyplanly.com',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Bug,
    title: 'Bug Reports',
    description: 'Found something broken? Let us know and we\'ll fix it.',
    email: 'bugs@dailyplanly.com',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    icon: Lightbulb,
    title: 'Feature Requests',
    description: 'Have an idea for a new template or feature? We\'d love to hear it.',
    email: 'ideas@dailyplanly.com',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Mail,
    title: 'Privacy & Legal',
    description: 'Privacy policy questions, data requests, or legal matters.',
    email: 'privacy@dailyplanly.com',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
]

export default function ContactPage() {
  return (
    <PageShell className="max-w-3xl py-16">
      <div className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Contact</p>
        <h1 className="text-4xl font-display font-semibold text-[var(--text-primary)] mb-4">
          Get in touch
        </h1>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
          We're a small team. We read every message and aim to respond within 2 business days.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((c) => (
          <a
            key={c.email}
            href={`mailto:${c.email}`}
            className="group flex flex-col gap-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
              <c.icon className={`h-5 w-5 ${c.color}`} strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)] mb-1">{c.title}</p>
              <p className="text-sm text-[var(--text-muted)] mb-3 leading-relaxed">{c.description}</p>
              <p className={`text-sm font-medium ${c.color} group-hover:underline`}>{c.email}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          <strong className="text-[var(--text-primary)]">Response times:</strong> We typically respond within 1–2 business days.
          For urgent bug reports affecting data loss or accessibility, we prioritise same-day response.
          DailyPlanly is a small independent project — we appreciate your patience and every piece of feedback.
        </p>
      </div>
    </PageShell>
  )
}
