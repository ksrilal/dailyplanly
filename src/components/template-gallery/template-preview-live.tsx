'use client'

import type { Template } from '@/features/templates/types'
import { PlannerPreview } from '@/components/shared/planner-preview'
import { ChecklistPreview } from '@/components/shared/checklist-preview'

export function TemplatePreviewLive({ template }: { template: Template }) {
  if (template.type === 'planner') {
    const blocks = (template.plannerDefaults?.blocks ?? []) as Parameters<typeof PlannerPreview>[0]['blocks']
    const theme = template.plannerDefaults?.theme ?? 'minimal'
    return <PlannerPreview blocks={blocks} theme={theme} className="w-full h-full" />
  }

  const items = (template.checklistDefaults?.items ?? []) as Parameters<typeof ChecklistPreview>[0]['items']
  const mode = template.checklistDefaults?.mode ?? 'simple'
  return <ChecklistPreview items={items} mode={mode} title={template.title} className="w-full h-full" />
}
