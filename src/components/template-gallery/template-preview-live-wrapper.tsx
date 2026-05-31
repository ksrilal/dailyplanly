'use client'

import dynamic from 'next/dynamic'
import type { Template } from '@/features/templates/types'

const TemplatePreviewLive = dynamic(
  () => import('./template-preview-live').then(m => m.TemplatePreviewLive),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[var(--bg-subtle)] animate-pulse" />
    ),
  }
)

export function TemplatePreviewLiveWrapper({ template }: { template: Template }) {
  return <TemplatePreviewLive template={template} />
}
