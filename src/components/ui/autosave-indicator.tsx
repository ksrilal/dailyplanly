'use client'

import * as React from 'react'
import { Check, Loader2, AlertCircle, HardDrive } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'storage-full'

interface AutosaveIndicatorProps {
  status: SaveStatus
  className?: string
}

function AutosaveIndicator({ status, className }: AutosaveIndicatorProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (status === 'idle') {
      const t = setTimeout(() => setVisible(false), 1500)
      return () => clearTimeout(t)
    }
    setVisible(true)
  }, [status])

  // Storage full — always visible, no fade
  if (status === 'storage-full') {
    return (
      <div className={cn(
        'autosave-indicator flex items-center gap-1.5 text-xs font-medium text-red-500',
        className
      )} aria-live="assertive">
        <HardDrive className="h-3.5 w-3.5 shrink-0" />
        <span>Storage full —</span>
        <Link href="/workspace" className="underline underline-offset-2 hover:opacity-80">
          free up space
        </Link>
      </div>
    )
  }

  if (!visible && status === 'idle') return null

  return (
    <div
      className={cn(
        'autosave-indicator flex items-center gap-1.5 text-xs transition-opacity duration-300',
        status === 'idle' && 'opacity-0',
        status === 'saving' && 'text-[var(--text-muted)]',
        status === 'saved' && 'text-[var(--color-success,#16a34a)]',
        status === 'error' && 'text-[var(--color-error,#dc2626)]',
        className
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      {status === 'saving' && <Loader2 className="h-3 w-3 animate-spin" />}
      {status === 'saved' && <Check className="h-3 w-3" />}
      {status === 'error' && <AlertCircle className="h-3 w-3" />}
      <span>
        {status === 'saving' && 'Saving…'}
        {status === 'saved' && 'Saved'}
        {status === 'error' && 'Save failed'}
      </span>
    </div>
  )
}

export { AutosaveIndicator, type SaveStatus }
