import { PageShell } from '@/components/layout/page-shell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DailyPlanly privacy policy — your data never leaves your device.',
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

export default function PrivacyPage() {
  return (
    <PageShell className="max-w-3xl py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Legal</p>
        <h1 className="text-4xl font-display font-semibold text-[var(--text-primary)] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-faint)]">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="flex flex-col gap-10">
        <Section title="The Short Version">
          <p>
            DailyPlanly does not collect, store, or transmit any personal data. Everything you create —
            planners, checklists, workspaces — is stored locally in your browser using IndexedDB and
            localStorage. No data ever leaves your device.
          </p>
        </Section>

        <Section title="Data We Do Not Collect">
          <p>We do not collect:</p>
          <ul className="flex flex-col gap-1.5 ml-4">
            {[
              'Your name, email address, or any personal identifiers',
              'Your planner or checklist content',
              'Usage analytics or behavioural tracking',
              'IP addresses or device fingerprints',
              'Cookies for tracking purposes',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--text-faint)] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Local Storage">
          <p>
            DailyPlanly uses your browser's IndexedDB and localStorage to save your workspaces, recent
            templates, and UI preferences. This data is stored entirely on your device and is never
            sent to our servers — because we have no servers that receive user data.
          </p>
          <p>
            You can clear this data at any time by clearing your browser's site data for dailyplanly.com,
            or by deleting individual workspaces from the My Workspaces page.
          </p>
        </Section>

        <Section title="No Accounts Required">
          <p>
            DailyPlanly does not offer user accounts and does not require registration of any kind.
            There is no login, no sign-up, and no authentication system.
          </p>
        </Section>

        <Section title="Third-Party Services">
          <p>
            DailyPlanly loads Google Fonts (Inter and Lora) for typography. Google may log the font
            request as a standard CDN access log. No personally identifiable information is shared
            in this request beyond your IP address as part of normal HTTP traffic.
          </p>
          <p>
            No third-party analytics, advertising, or tracking scripts are loaded on DailyPlanly.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            If we make material changes to this privacy policy, we will update the "Last updated" date
            at the top of this page. Continued use of DailyPlanly after any changes constitutes
            acceptance of the updated policy.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this privacy policy? Reach us at{' '}
            <a href="mailto:privacy@dailyplanly.com" className="text-[var(--color-accent)] hover:underline">
              privacy@dailyplanly.com
            </a>.
          </p>
        </Section>
      </div>
    </PageShell>
  )
}
