'use client'

// Shared toolbar actions: title edit (pencil) + delete (with 5s countdown confirm)
// Used by both PlannerToolbar and ChecklistToolbar

import { useState, useRef, useEffect } from 'react'
import { Pencil, Trash2, X, Eraser } from 'lucide-react'
import { cn } from '@/lib/utils'

const CONFIRM_DURATION = 5

interface WorkspaceTitleEditProps {
  title: string
  onSave: (title: string) => void
}

export function WorkspaceTitleEdit({ title, onSave }: WorkspaceTitleEditProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  function startEdit() { setDraft(title); setEditing(true) }
  function commit() { if (draft.trim()) onSave(draft.trim()); setEditing(false) }

  return (
    <div className="flex items-center gap-1">
      {editing ? (
        <input
          autoFocus
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur()
            if (e.key === 'Escape') setEditing(false)
          }}
          className="text-sm font-semibold bg-transparent border-b-2 border-[var(--color-accent)] focus:outline-none px-1 py-0.5 min-w-[120px] max-w-[240px] text-[var(--text-primary)]"
          aria-label="Edit title"
        />
      ) : (
        <>
          <span className="text-sm font-semibold text-[var(--text-primary)] max-w-[200px] truncate">
            {title}
          </span>
          <button
            onClick={startEdit}
            className="p-0.5 rounded text-[var(--text-faint)] hover:text-[var(--color-accent)] transition-colors ml-0.5"
            aria-label="Edit title"
          >
            <Pencil className="h-3 w-3" strokeWidth={2} />
          </button>
        </>
      )}
    </div>
  )
}

interface WorkspaceClearButtonProps {
  workspaceName: string
  onClear: () => void
  className?: string
}

export function WorkspaceClearButton({ workspaceName, onClear, className }: WorkspaceClearButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const [countdown, setCountdown] = useState(CONFIRM_DURATION)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startConfirm() {
    setConfirming(true)
    setCountdown(CONFIRM_DURATION)
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { cancel(); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  function cancel() {
    setConfirming(false)
    setCountdown(CONFIRM_DURATION)
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }

  function confirm() { cancel(); onClear() }

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  if (confirming) {
    return (
      <div className={cn('flex items-center gap-1.5', className)}>
        {/* Countdown ring */}
        <div className="relative w-6 h-6 flex-shrink-0">
          <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(239,68,68,0.15)" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(239,68,68,0.75)" strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 9}`}
              strokeDashoffset={`${2 * Math.PI * 9 * (1 - countdown / CONFIRM_DURATION)}`}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-red-400">{countdown}</span>
        </div>
        <span className="text-xs text-red-400 font-medium whitespace-nowrap">Clear?</span>
        <button onClick={confirm} className="px-2 py-0.5 rounded bg-red-500/90 hover:bg-red-500 text-white text-[10px] font-bold transition-colors">
          Yes
        </button>
        <button onClick={cancel} className="p-1 text-[var(--text-faint)] hover:text-[var(--text-primary)] transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={startConfirm}
      className={cn(
        'flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors',
        'text-[var(--text-faint)] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20',
        className
      )}
      aria-label={`Clear ${workspaceName}`}
    >
      <Eraser className="h-3.5 w-3.5" strokeWidth={2} />
      Clear
    </button>
  )
}
