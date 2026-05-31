import { Suspense } from 'react'
import { PageShell } from '@/components/layout/page-shell'
import { Hero } from '@/components/homepage/hero'
import { FeaturedTemplates } from '@/components/homepage/featured-templates'
import { ProductSections } from '@/components/homepage/product-sections'
import { PhilosophySection } from '@/components/homepage/philosophy-section'
import { ToolsPreview } from '@/components/homepage/tools-preview'
import { RecentsGrid } from '@/components/workspace/recents-grid'
import { FAQSection } from '@/components/shared/faq-section'
import { SITE_NAME, SITE_DESCRIPTION, BASE_URL } from '@/lib/constants'
import type { Metadata } from 'next'

const HOME_FAQ = [
  { q: 'What is DailyPlanly?', a: 'DailyPlanly is a free, browser-based productivity platform for creating printable planners, checklists, and structured daily routines. Everything runs in your browser — no account, no cloud sync, no subscription required.' },
  { q: 'Do I need to create an account to use DailyPlanly?', a: 'No. DailyPlanly requires zero sign-up. Open it and start building immediately. Your planners and checklists are saved locally in your browser using IndexedDB.' },
  { q: 'Is DailyPlanly free?', a: 'Yes, completely free — forever. There are no premium tiers, no paywalls, and no ads. Export to PDF, print, and use all features at no cost.' },
  { q: 'Can I use DailyPlanly offline?', a: 'Yes. After the first load, DailyPlanly works fully offline. All your data is stored in your browser, so you can plan and print even without an internet connection.' },
  { q: 'How do I export or print my planner?', a: 'Click "Export PDF" in the planner toolbar to download a high-quality PDF, or click "Print" to send directly to your printer. Both options are always available with no login required.' },
  { q: 'Will my data be lost if I clear my browser?', a: 'Your planners and checklists are stored in your browser\'s local storage. Clearing browser data will remove them. We recommend exporting important planners as PDF before clearing your browser.' },
]

export const metadata: Metadata = {
  title: `${SITE_NAME} — Calm, Printable Productivity`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: BASE_URL },
  openGraph: {
    url: BASE_URL,
    title: `${SITE_NAME} — Calm, Printable Productivity`,
    description: SITE_DESCRIPTION,
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PageShell>
        {/* Recents — client island */}
        <Suspense>
          <RecentsGrid />
        </Suspense>

        <FeaturedTemplates />
        <ProductSections />
        <ToolsPreview />
        <PhilosophySection />
        <FAQSection
          items={HOME_FAQ}
          subtitle="Everything you need to know about DailyPlanly"
          schemaId="home-faq"
        />
      </PageShell>
    </>
  )
}
