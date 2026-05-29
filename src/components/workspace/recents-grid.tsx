'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getRecents } from '@/features/storage/recents'
import { getAllChecklists } from '@/features/checklist/checklist-store'
import { formatRelativeDate, cn } from '@/lib/utils'
import { LayoutTemplate, CheckSquare, List, ArrowRight, Clock } from 'lucide-react'
import type { RecentsEntry } from '@/features/storage/types'

// Enrich entries with checklist mode from IndexedDB for legacy entries
interface EnrichedEntry extends RecentsEntry {
  resolvedMode?: 'simple' | 'advanced'
}

function TypeBadge({ entry }: { entry: EnrichedEntry }) {
  const isPlanner = entry.workspaceType === 'planner'
  const mode = entry.checklistMode ?? entry.resolvedMode

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Type badge */}
      <span className={cn(
        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider',
        isPlanner
          ? 'bg-violet-600 text-white'
          : 'bg-sky-500 text-white'
      )}>
        {isPlanner
          ? <LayoutTemplate className="h-2.5 w-2.5" strokeWidth={2.5} />
          : <CheckSquare className="h-2.5 w-2.5" strokeWidth={2.5} />
        }
        {isPlanner ? 'Planner' : 'Checklist'}
      </span>

      {/* Mode badge (checklist only) */}
      {!isPlanner && mode && (
        <span className={cn(
          'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider',
          mode === 'simple'
            ? 'bg-emerald-500 text-white'
            : 'bg-orange-500 text-white'
        )}>
          <List className="h-2.5 w-2.5" strokeWidth={2.5} />
          {mode}
        </span>
      )}
    </div>
  )
}

export function RecentsGrid() {
  const [entries, setEntries] = useState<EnrichedEntry[]>([])

  useEffect(() => {
    async function init() {
      const recents = getRecents().slice(0, 4)

      // Enrich checklist entries that are missing mode (legacy localStorage entries)
      const checklistIds = recents
        .filter((e) => e.workspaceType === 'checklist' && !e.checklistMode)
        .map((e) => e.workspaceId)

      let modeMap: Record<string, 'simple' | 'advanced'> = {}
      if (checklistIds.length > 0) {
        try {
          const allChecklists = await getAllChecklists()
          for (const cl of allChecklists) {
            if (checklistIds.includes(cl.id)) {
              modeMap[cl.id] = cl.mode
            }
          }
        } catch {
          // IndexedDB unavailable — skip enrichment
        }
      }

      const enriched: EnrichedEntry[] = recents.map((e) => ({
        ...e,
        resolvedMode: e.workspaceType === 'checklist' ? modeMap[e.workspaceId] : undefined,
      }))

      setEntries(enriched)
    }
    init()
  }, [])

  if (entries.length === 0) return null

  return (
    <section className="py-8 border-t border-[var(--border)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Continue where you left off</h2>
        <Link
          href="/workspace"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--color-accent)] transition-colors group"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {entries.map((entry) => {
          const href = entry.workspaceType === 'planner'
            ? `/planner?id=${entry.workspaceId}`
            : `/checklist?id=${entry.workspaceId}`

          return (
            <Link
              key={entry.workspaceId}
              href={href}
              className="group flex flex-col justify-between gap-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--text-faint)]/30 hover:shadow-[var(--shadow-sm)] hover:-translate-y-0.5 transition-all duration-150 min-h-[90px]"
            >
              <TypeBadge entry={entry} />

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                  {entry.title}
                </p>
                <p className="text-[11px] text-[var(--text-faint)] mt-0.5 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {formatRelativeDate(entry.lastOpenedAt)}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
