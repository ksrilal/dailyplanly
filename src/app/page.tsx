import { Suspense } from 'react'
import { PageShell } from '@/components/layout/page-shell'
import { Hero } from '@/components/homepage/hero'
import { FeaturedTemplates } from '@/components/homepage/featured-templates'
import { ProductSections } from '@/components/homepage/product-sections'
import { PhilosophySection } from '@/components/homepage/philosophy-section'
import { ToolsPreview } from '@/components/homepage/tools-preview'
import { RecentsGrid } from '@/components/workspace/recents-grid'
import { SITE_NAME, SITE_DESCRIPTION, BASE_URL } from '@/lib/constants'
import type { Metadata } from 'next'

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
      </PageShell>
    </>
  )
}
