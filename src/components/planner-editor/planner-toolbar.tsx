'use client'

import { usePlannerEditor } from '@/features/planner/editor-state'
import { PLANNER_THEMES, PAPER_SIZES } from '@/lib/constants'
import { THEME_MAP } from '@/features/planner/theme-tokens'
import { AutosaveIndicator } from '@/components/ui/autosave-indicator'
import { Button } from '@/components/ui/button'
import { Printer, Download } from 'lucide-react'
import type { PlannerTheme, PaperSize } from '@/features/storage/types'
import { WorkspaceTitleEdit, WorkspaceClearButton } from '@/components/shared/workspace-toolbar-actions'
import { cn } from '@/lib/utils'

const themeLabels = {
  minimal: 'Minimal',
  'soft-paper': 'Soft Paper',
  'elegant-dark': 'Elegant Dark',
  'study-focus': 'Study Focus',
  'wellness-calm': 'Wellness Calm',
}

interface PlannerToolbarProps {
  onExport?: (format: 'pdf' | 'png' | 'jpg' | 'print') => void
  onClear?: () => void
}

export function PlannerToolbar({ onExport, onClear }: PlannerToolbarProps) {
  const planner = usePlannerEditor((s) => s.planner)
  const saveStatus = usePlannerEditor((s) => s.saveStatus)
  const setTheme = usePlannerEditor((s) => s.setTheme)
  const setPaperSize = usePlannerEditor((s) => s.setPaperSize)
  const renameTitle = usePlannerEditor((s) => s.renameTitle)

  if (!planner) return (
    <div className="flex items-center gap-2 text-sm text-[var(--text-faint)]">
      <span className="font-semibold text-[var(--text-primary)]">New Planner</span>
      <span className="text-xs">· Add a block from the sidebar to begin</span>
    </div>
  )

  const hasBlocks = planner.blocks.length > 0

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <WorkspaceTitleEdit title={planner.title} onSave={renameTitle} />
      <div className="w-px h-4 bg-[var(--border)]" />
      <div className="flex items-center gap-1" role="group" aria-label="Select theme">
        {PLANNER_THEMES.map((theme) => (
          <button
            key={theme}
            onClick={() => setTheme(theme as PlannerTheme)}
            title={themeLabels[theme as PlannerTheme]}
            aria-pressed={planner.theme === theme}
            className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: THEME_MAP[theme as PlannerTheme]['--planner-accent'],
              borderColor: planner.theme === theme ? 'var(--color-ink)' : 'transparent',
            }}
          />
        ))}
      </div>
      <div className="w-px h-4 bg-[var(--border)]" />
      <div className="flex items-center gap-1">
        {PAPER_SIZES.map((size) => (
          <button
            key={size}
            onClick={() => setPaperSize(size as PaperSize)}
            aria-pressed={planner.paperSize === size}
            className={cn('px-2 py-0.5 rounded text-xs transition-colors', planner.paperSize === size ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-medium' : 'text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]')}
          >
            {size}
          </button>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <AutosaveIndicator status={saveStatus} />
        <Button variant="outline" size="sm" onClick={() => onExport?.('print')}>
          <Printer className="h-3.5 w-3.5" /> Print
        </Button>
        <Button variant="primary" size="sm" onClick={() => onExport?.('pdf')}>
          <Download className="h-3.5 w-3.5" /> Export PDF
        </Button>
        {hasBlocks && onClear && (
          <>
            <div className="w-px h-4 bg-[var(--border)]" />
            <WorkspaceClearButton workspaceName={planner.title} onClear={onClear} />
          </>
        )}
      </div>
    </div>
  )
}
