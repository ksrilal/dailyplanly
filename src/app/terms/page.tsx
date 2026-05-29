import { PageShell } from '@/components/layout/page-shell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'DailyPlanly terms of service — fair, simple, and human-readable.',
}

const LAST_UPDATED = '28 May 2026'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h2>
      <div className="text-[var(--text-secondary)] leading-relaxed flex flex-col gap-3">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <PageShell className="max-w-3xl py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Legal</p>
        <h1 className="text-4xl font-display font-semibold text-[var(--text-primary)] mb-2">Terms of Service</h1>
        <p className="text-sm text-[var(--text-faint)]">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="flex flex-col gap-10">
        <Section title="Acceptance of Terms">
          <p>
            By using DailyPlanly, you agree to these terms. If you do not agree, please do not use
            the service. These terms apply to all visitors and users of DailyPlanly.
          </p>
        </Section>

        <Section title="What DailyPlanly Is">
          <p>
            DailyPlanly is a free, browser-based productivity platform that provides printable planner
            and checklist templates. The service is provided as-is, free of charge, with no account
            required.
          </p>
        </Section>

        <Section title="Your Content">
          <p>
            All content you create on DailyPlanly — planners, checklists, and workspace data — belongs
            entirely to you. It is stored locally on your device and never transmitted to our servers.
          </p>
          <p>
            Because your content is stored locally, DailyPlanly cannot recover lost data if you clear
            your browser storage. We recommend exporting important documents as PDF regularly.
          </p>
        </Section>

        <Section title="Acceptable Use">
          <p>You agree not to:</p>
          <ul className="flex flex-col gap-1.5 ml-4">
            {[
              'Use DailyPlanly for any unlawful purpose',
              'Attempt to reverse-engineer, copy, or redistribute the platform',
              'Use automated tools to scrape or abuse the service',
              'Misrepresent your affiliation with DailyPlanly',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--text-faint)] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Intellectual Property">
          <p>
            The DailyPlanly name, logo, design system, template designs, and source code are the
            intellectual property of DailyPlanly. Templates provided by DailyPlanly may be used freely
            for personal and commercial purposes. Redistribution of the platform itself is not permitted.
          </p>
        </Section>

        <Section title="Disclaimer of Warranties">
          <p>
            DailyPlanly is provided "as is" without warranties of any kind, express or implied. We do
            not guarantee uninterrupted access, data preservation, or fitness for a particular purpose.
            Use the service at your own risk.
          </p>
        </Section>

        <Section title="Limitation of Liability">
          <p>
            To the maximum extent permitted by law, DailyPlanly shall not be liable for any indirect,
            incidental, special, or consequential damages arising from your use of the service,
            including but not limited to loss of data.
          </p>
        </Section>

        <Section title="Changes to These Terms">
          <p>
            We may update these terms from time to time. The "Last updated" date at the top of this
            page reflects the most recent revision. Continued use after changes constitutes acceptance.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms? Contact us at{' '}
            <a href="mailto:legal@dailyplanly.com" className="text-[var(--color-accent)] hover:underline">
              legal@dailyplanly.com
            </a>.
          </p>
        </Section>
      </div>
    </PageShell>
  )
}
