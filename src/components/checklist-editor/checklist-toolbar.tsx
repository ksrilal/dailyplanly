'use client'

import { useChecklistEditor } from '@/features/checklist/editor-state'
import { AutosaveIndicator } from '@/components/ui/autosave-indicator'
import { Printer, Download, List, CheckSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WorkspaceTitleEdit, WorkspaceClearButton } from '@/components/shared/workspace-toolbar-actions'

interface ChecklistToolbarProps {
  onExport?: (format: 'pdf' | 'png' | 'jpg' | 'text' | 'print') => void
  onClear?: () => void
}

export function ChecklistToolbar({ onExport, onClear }: ChecklistToolbarProps) {
  const checklist = useChecklistEditor((s) => s.checklist)
  const saveStatus = useChecklistEditor((s) => s.saveStatus)
  const setMode = useChecklistEditor((s) => s.setMode)
  const renameTitle = useChecklistEditor((s) => s.renameTitle)

  if (!checklist) return (
    <div className="flex items-center gap-2 text-sm text-[var(--text-faint)]">
      <span className="font-semibold text-[var(--text-primary)]">New Checklist</span>
      <span className="text-xs">· Add your first item to begin</span>
    </div>
  )

  const hasItems = checklist.items.length > 0

  return (
    <div className="flex items-center justify-between gap-2 w-full min-w-0">

      {/* Left group: title + mode */}
      <div className="flex items-center gap-2 min-w-0">
      <WorkspaceTitleEdit title={checklist.title} onSave={renameTitle} />

      <div className="w-px h-4 bg-[var(--border)] flex-shrink-0" />

      {/* Mode badge or toggle */}
      {hasItems ? (
        <span className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-default flex-shrink-0',
          checklist.mode === 'simple'
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
            : 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
        )}>
          {checklist.mode === 'simple'
            ? <List className="h-2.5 w-2.5" strokeWidth={2.5} />
            : <CheckSquare className="h-2.5 w-2.5" strokeWidth={2.5} />
          }
          {checklist.mode}
        </span>
      ) : (
        <div className="flex gap-1 flex-shrink-0" role="group">
          {(['simple', 'advanced'] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} aria-pressed={checklist.mode === m}
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border transition-all',
                checklist.mode === m
                  ? m === 'simple' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-orange-500 text-white border-orange-500'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
              )}>
              {m}
            </button>
          ))}
        </div>
      )}
      </div>{/* end left group */}

      {/* Right: autosave + actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <AutosaveIndicator status={saveStatus} />

        <div className="w-px h-4 bg-[var(--border)]" />

        <button
          onClick={() => onExport?.('print')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
        >
          <Printer className="h-3.5 w-3.5" /> Print
        </button>

        <button
          onClick={() => onExport?.('pdf')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-violet-700 transition-colors shadow-sm shadow-violet-500/20"
        >
          <Download className="h-3.5 w-3.5" /> Export PDF
        </button>

        {hasItems && onClear && (
          <>
            <div className="w-px h-4 bg-[var(--border)]" />
            <WorkspaceClearButton workspaceName={checklist.title} onClear={onClear} />
          </>
        )}
      </div>
    </div>
  )
}
