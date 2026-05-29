'use client'

import * as React from 'react'
import { Check, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

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

  if (!visible && status === 'idle') return null

  return (
    <div
      className={cn(
        'autosave-indicator flex items-center gap-1.5 text-xs transition-opacity duration-300',
        status === 'idle' && 'opacity-0',
        status === 'saving' && 'text-[var(--text-muted)]',
        status === 'saved' && 'text-[var(--color-success)]',
        status === 'error' && 'text-[var(--color-error)]',
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
