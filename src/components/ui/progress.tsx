import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  label?: string
  showFraction?: boolean
  completed?: number
}

function Progress({ value, max = 100, label, showFraction, completed, className, ...props }: ProgressProps) {
  const pct = Math.round(Math.min(100, Math.max(0, (value / max) * 100)))

  return (
    <div className={cn('flex flex-col gap-1', className)} {...props}>
      {(label || showFraction) && (
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          {label && <span>{label}</span>}
          {showFraction && completed !== undefined && (
            <span>{completed}/{max} — {pct}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]"
      >
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export { Progress }
