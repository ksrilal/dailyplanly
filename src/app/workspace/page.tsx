'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/layout/page-shell'
import { getAllPlanners, deletePlanner } from '@/features/planner/planner-store'
import { getAllChecklists, deleteChecklist } from '@/features/checklist/checklist-store'
import { removeFromRecents } from '@/features/storage/recents'
import { formatRelativeDate } from '@/lib/utils'
import { computeProgress } from '@/features/checklist/tree-ops'
import type { Planner, Checklist } from '@/features/storage/types'
import { Trash2, X, LayoutTemplate, CheckSquare, List, Pin, Search, Clock, Calendar, ArrowUpAZ, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQSection } from '@/components/shared/faq-section'
import { StorageWarningBanner, StorageIndicator } from '@/components/shared/storage-warning-banner'

const WORKSPACE_FAQ = [
  { q: 'What is My Workspace?', a: 'My Workspace is your personal hub where all your saved planners and checklists appear. You can open, rename, pin, sort, or delete any workspace item from here. Everything is stored locally in your browser — no cloud, no account.' },
  { q: 'How is my data stored?', a: 'All planners and checklists are saved in your browser\'s IndexedDB — a structured local database built into every modern browser. Data persists across sessions as long as you do not clear your browser\'s site data.' },
  { q: 'Can I pin important workspaces so they stay at the top?', a: 'Yes. Click the pin icon on any planner or checklist card to pin it. Pinned items always appear at the top of the list regardless of sorting, so your most-used workspaces are always one click away.' },
  { q: 'What happens if I clear my browser cache?', a: 'Clearing browser data or site storage will remove your saved planners and checklists. We recommend exporting important work as PDF before clearing your browser. Exported PDFs are yours permanently.' },
  { q: 'How do I delete a workspace item?', a: 'Open the workspace item and use the "Delete" button in the toolbar, or use the delete option on the workspace card. You will be asked to confirm before anything is permanently removed.' },
  { q: 'Is there a limit to how many planners or checklists I can create?', a: 'There is no artificial limit imposed by DailyPlanly. The practical limit is your browser\'s available IndexedDB storage, which is typically several hundred megabytes — enough for thousands of planners and checklists.' },
  { q: 'Can I access my workspace on a different device?', a: 'Currently, workspaces are local to the browser and device where they were created. There is no cloud sync. To transfer work, export your planner as a PDF and open it on the other device.' },
]

// ─── Types ────────────────────────────────────────────────────────────────────

type AnyWorkspace = (Planner | Checklist) & {
  workspaceType: 'planner' | 'checklist'
  pinned?: boolean
}

type SortKey = 'modified' | 'created' | 'alpha'

const PINS_KEY = 'dp:workspace-pins'

function loadPins(): Set<string> {
  try {
    const raw = localStorage.getItem(PINS_KEY)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch { return new Set() }
}

function savePins(ids: Set<string>) {
  try { localStorage.setItem(PINS_KEY, JSON.stringify([...ids])) } catch {}
}

const CONFIRM_DURATION = 5

// ─── Badges ───────────────────────────────────────────────────────────────────

function TypeBadge({ ws }: { ws: AnyWorkspace }) {
  const isPlanner = ws.workspaceType === 'planner'
  const mode = !isPlanner ? (ws as Checklist).mode : null
  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <span className={cn(
        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider',
        isPlanner ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
      )}>
        {isPlanner ? <LayoutTemplate className="h-2.5 w-2.5" strokeWidth={2.5} /> : <CheckSquare className="h-2.5 w-2.5" strokeWidth={2.5} />}
        {isPlanner ? 'Planner' : 'Checklist'}
      </span>
      {mode && (
        <span className={cn(
          'inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider',
          mode === 'simple' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
        )}>
          <List className="h-2.5 w-2.5" strokeWidth={2.5} />
          {mode}
        </span>
      )}
    </div>
  )
}

// ─── Progress bar (checklist only) ───────────────────────────────────────────

function ChecklistProgress({ checklist }: { checklist: Checklist }) {
  const progress = computeProgress(checklist.items)
  if (progress.total === 0) return null
  const pct = progress.percentage
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <span className="text-xs text-[var(--text-faint)] tabular-nums w-8 text-right">{pct}%</span>
      <div className="w-28 h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
        <div
          className="h-full rounded-full bg-sky-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[var(--text-faint)] tabular-nums whitespace-nowrap">
        {progress.completed}/{progress.total} done
      </span>
    </div>
  )
}

// ─── Row item ─────────────────────────────────────────────────────────────────

function WorkspaceRow({
  ws,
  onDelete,
  onTogglePin,
}: {
  ws: AnyWorkspace
  onDelete: (ws: AnyWorkspace) => void
  onTogglePin: (id: string) => void
}) {
  const [confirming, setConfirming] = useState(false)
  const [countdown, setCountdown] = useState(CONFIRM_DURATION)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const href = ws.workspaceType === 'planner' ? `/planner?id=${ws.id}` : `/checklist?id=${ws.id}`

  function startConfirm() {
    setConfirming(true)
    setCountdown(CONFIRM_DURATION)
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { cancelConfirm(); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  function cancelConfirm() {
    setConfirming(false)
    setCountdown(CONFIRM_DURATION)
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }

  function confirmDelete() { cancelConfirm(); onDelete(ws) }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  return (
    <div className="relative group flex items-center gap-4 px-4 py-3.5 border-b border-[var(--border)] hover:bg-[var(--bg-subtle)] transition-colors">

      {/* Left: title + meta */}
      <Link href={href} className="flex-1 min-w-0">
        <p className="font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--color-accent)] transition-colors" title={ws.title}>
          {ws.title}
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs text-[var(--text-faint)] flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeDate(ws.lastModifiedAt)}
          </span>
          {ws.workspaceType === 'checklist' && (
            <span className="text-xs text-[var(--text-faint)]">
              {(ws as Checklist).items.length} items
            </span>
          )}
          {ws.workspaceType === 'planner' && (
            <span className="text-xs text-[var(--text-faint)]">
              {(ws as Planner).blocks.length} block{(ws as Planner).blocks.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </Link>

      {/* Right: badges + progress + actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <TypeBadge ws={ws} />

        {ws.workspaceType === 'checklist' && (
          <ChecklistProgress checklist={ws as Checklist} />
        )}

        {/* Pin */}
        <button
          onClick={() => onTogglePin(ws.id)}
          className={cn(
            'p-1.5 rounded-md transition-colors',
            ws.pinned
              ? 'text-amber-400 hover:text-amber-300'
              : 'text-[var(--text-faint)] hover:text-[var(--text-secondary)] opacity-0 group-hover:opacity-100'
          )}
          aria-label={ws.pinned ? 'Unpin' : 'Pin'}
          title={ws.pinned ? 'Unpin' : 'Pin to top'}
        >
          <Pin className="h-3.5 w-3.5" fill={ws.pinned ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>

        {/* Delete */}
        {!confirming ? (
          <button
            onClick={startConfirm}
            className="p-1.5 rounded-md text-[var(--text-faint)] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            aria-label={`Delete ${ws.title}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            {/* Countdown ring */}
            <div className="relative w-7 h-7 flex-shrink-0">
              <svg className="w-7 h-7 -rotate-90" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(239,68,68,0.15)" strokeWidth="2.5" />
                <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(239,68,68,0.75)" strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 11}`}
                  strokeDashoffset={`${2 * Math.PI * 11 * (1 - countdown / CONFIRM_DURATION)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-red-400">{countdown}</span>
            </div>
            <span className="text-xs text-red-400 font-medium whitespace-nowrap">Delete?</span>
            <button
              onClick={confirmDelete}
              className="px-2 py-0.5 rounded bg-red-500/90 hover:bg-red-500 text-white text-[10px] font-bold transition-colors"
            >
              Yes
            </button>
            <button
              onClick={cancelConfirm}
              className="p-1 text-[var(--text-faint)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SORT_OPTIONS: { key: SortKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'modified', label: 'Last modified', icon: Clock },
  { key: 'created',  label: 'Date created',  icon: Calendar },
  { key: 'alpha',    label: 'Alphabetical',   icon: ArrowUpAZ },
]

export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState<AnyWorkspace[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('modified')
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set())

  // Load pins from localStorage on mount
  useEffect(() => {
    setPinnedIds(loadPins())
  }, [])

  async function load() {
    const [planners, checklists] = await Promise.all([getAllPlanners(), getAllChecklists()])

    // Silently purge empty records before showing the list
    const emptyPlanners = planners.filter((p) => p.blocks.length === 0)
    const emptyChecklists = checklists.filter((c) => c.items.length === 0)
    await Promise.all([
      ...emptyPlanners.map((p) => deletePlanner(p.id).then(() => removeFromRecents(p.id))),
      ...emptyChecklists.map((c) => deleteChecklist(c.id).then(() => removeFromRecents(c.id))),
    ])

    const validPlanners = planners.filter((p) => p.blocks.length > 0)
    const validChecklists = checklists.filter((c) => c.items.length > 0)
    const all: AnyWorkspace[] = [
      ...validPlanners.map((p) => ({ ...p, workspaceType: 'planner' as const })),
      ...validChecklists.map((c) => ({ ...c, workspaceType: 'checklist' as const })),
    ]
    setWorkspaces(all)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function togglePin(id: string) {
    setPinnedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      savePins(next)
      return next
    })
  }

  async function handleDelete(ws: AnyWorkspace) {
    if (ws.workspaceType === 'planner') await deletePlanner(ws.id)
    else await deleteChecklist(ws.id)
    removeFromRecents(ws.id)
    setWorkspaces((prev) => prev.filter((w) => w.id !== ws.id))
  }

  const displayed = useMemo(() => {
    let result = workspaces.map((w) => ({ ...w, pinned: pinnedIds.has(w.id) }))

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((w) => w.title.toLowerCase().includes(q))
    }

    function applySort(items: typeof result) {
      return [...items].sort((a, b) => {
        if (sort === 'alpha') return a.title.localeCompare(b.title)
        if (sort === 'created') return b.createdAt.localeCompare(a.createdAt)
        // default: modified
        return b.lastModifiedAt.localeCompare(a.lastModifiedAt)
      })
    }

    // Pinned always at top (sorted among themselves), unpinned sorted below
    const pinned = applySort(result.filter((w) => w.pinned))
    const unpinned = applySort(result.filter((w) => !w.pinned))
    return [...pinned, ...unpinned]
  }, [workspaces, search, sort, pinnedIds])

  const plannerCount = workspaces.filter((w) => w.workspaceType === 'planner').length
  const checklistCount = workspaces.filter((w) => w.workspaceType === 'checklist').length

  return (
    <PageShell>
      {/* Storage warning — shows only when usage ≥ 70% */}
      <StorageWarningBanner />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display font-semibold text-[var(--text-primary)]">My Workspaces</h1>
          {!loading && (
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {workspaces.length} saved workspace{workspaces.length !== 1 ? 's' : ''}
              {plannerCount > 0 && checklistCount > 0 && (
                <span className="ml-2 text-[var(--text-faint)]">
                  · {plannerCount} planner{plannerCount !== 1 ? 's' : ''} · {checklistCount} checklist{checklistCount !== 1 ? 's' : ''}
                </span>
              )}
            </p>
          )}
        </div>
        <StorageIndicator />
      </div>

      {/* Search + sort toolbar */}
      {!loading && workspaces.length > 0 && (
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-48 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-faint)]" />
            <input
              type="text"
              placeholder="Search workspaces…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
            />
          </div>

          {/* Sort pills */}
          <div className="flex items-center gap-1 flex-wrap">
            {SORT_OPTIONS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border',
                  sort === key
                    ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-transparent'
                    : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]'
                )}
              >
                <Icon className="h-3 w-3" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-lg bg-[var(--bg-subtle)] animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && workspaces.length === 0 && (
        <div className="text-center py-24">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--bg-subtle)] flex items-center justify-center mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-faint)]">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <p className="text-[var(--text-muted)] mb-6">No workspaces yet. Start from a template or create a blank one.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap mt-2">
            <Link href="/planner/new">
              <button className="group flex flex-col items-center gap-2 px-6 py-4 rounded-xl border border-violet-500/30 bg-violet-500/8 hover:bg-violet-500/15 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/15 hover:-translate-y-0.5 transition-all duration-200 min-w-[140px]">
                <div className="w-9 h-9 rounded-lg bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                  <LayoutTemplate className="h-5 w-5 text-violet-400" strokeWidth={1.75} />
                </div>
                <span className="text-sm font-semibold text-violet-300">New Planner</span>
                <span className="text-[10px] text-violet-400/60">Blocks · Themes · PDF</span>
              </button>
            </Link>

            <Link href="/templates">
              <button className="group flex flex-col items-center gap-2 px-6 py-4 rounded-xl border border-amber-500/30 bg-amber-500/8 hover:bg-amber-500/15 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/15 hover:-translate-y-0.5 transition-all duration-200 min-w-[140px]">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                  <Star className="h-5 w-5 text-amber-400" strokeWidth={1.75} />
                </div>
                <span className="text-sm font-semibold text-amber-300">Browse Templates</span>
                <span className="text-[10px] text-amber-400/60">8 categories · Ready to use</span>
              </button>
            </Link>

            <Link href="/checklist/new">
              <button className="group flex flex-col items-center gap-2 px-6 py-4 rounded-xl border border-sky-500/30 bg-sky-500/8 hover:bg-sky-500/15 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/15 hover:-translate-y-0.5 transition-all duration-200 min-w-[140px]">
                <div className="w-9 h-9 rounded-lg bg-sky-500/20 flex items-center justify-center group-hover:bg-sky-500/30 transition-colors">
                  <CheckSquare className="h-5 w-5 text-sky-400" strokeWidth={1.75} />
                </div>
                <span className="text-sm font-semibold text-sky-300">New Checklist</span>
                <span className="text-[10px] text-sky-400/60">Simple · Advanced · Progress</span>
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* No search results */}
      {!loading && workspaces.length > 0 && displayed.length === 0 && (
        <div className="text-center py-16 text-[var(--text-faint)]">
          <p>No workspaces match "<span className="text-[var(--text-muted)]">{search}</span>"</p>
        </div>
      )}

      {/* List */}
      {displayed.length > 0 && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--bg-surface)]">
          {displayed.map((ws) => (
            <WorkspaceRow
              key={ws.id}
              ws={ws}
              onDelete={handleDelete}
              onTogglePin={togglePin}
            />
          ))}
        </div>
      )}

      {/* Footer note */}
      {!loading && workspaces.length > 0 && (
        <p className="text-center text-xs text-[var(--text-faint)] mt-8 leading-relaxed">
          Saved locally in your browser. Clearing browser storage or cache may remove saved workspaces.
        </p>
      )}

      <FAQSection
        items={WORKSPACE_FAQ}
        subtitle="Common questions about your DailyPlanly workspace"
        schemaId="workspace-faq"
      />
    </PageShell>
  )
}
