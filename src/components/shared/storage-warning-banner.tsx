'use client'

import { useState } from 'react'
import { AlertTriangle, AlertCircle, HardDrive, X, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStorageEstimate, formatBytes } from '@/features/storage/use-storage-estimate'

export function StorageWarningBanner() {
  const estimate = useStorageEstimate()
  const [dismissed, setDismissed] = useState(false)

  // Only show at warning level or above
  if (!estimate || estimate.level === 'ok' || !estimate.supported) return null
  if (dismissed && estimate.level === 'warning') return null

  const isCritical = estimate.level === 'critical' || estimate.level === 'full'

  const config = {
    warning: {
      icon: AlertTriangle,
      bg: 'bg-amber-500/10 border-amber-500/25',
      icon_color: 'text-amber-500',
      text_color: 'text-amber-700 dark:text-amber-400',
      bar_color: 'bg-amber-500',
      title: 'Storage getting full',
      message: `You've used ${estimate.percent}% of your browser storage (${formatBytes(estimate.usage)} of ${formatBytes(estimate.quota)}). Export important work as PDF to keep it safe.`,
    },
    critical: {
      icon: AlertCircle,
      bg: 'bg-red-500/10 border-red-500/25',
      icon_color: 'text-red-500',
      text_color: 'text-red-700 dark:text-red-400',
      bar_color: 'bg-red-500',
      title: 'Storage almost full',
      message: `${estimate.percent}% used (${formatBytes(estimate.usage)} of ${formatBytes(estimate.quota)}). New saves may fail. Export your work as PDF now and delete workspaces you no longer need.`,
    },
    full: {
      icon: AlertCircle,
      bg: 'bg-red-500/15 border-red-500/40',
      icon_color: 'text-red-500',
      text_color: 'text-red-700 dark:text-red-400',
      bar_color: 'bg-red-500',
      title: 'Storage full — saves will fail',
      message: `Your browser storage is full (${formatBytes(estimate.usage)} used). New changes cannot be saved until you free up space. Export your work as PDF and delete old workspaces immediately.`,
    },
  }[estimate.level]

  const Icon = config.icon

  return (
    <div className={cn(
      'relative flex items-start gap-3 rounded-xl border px-4 py-3 mb-5 text-sm',
      config.bg
    )}>
      <Icon className={cn('h-4 w-4 mt-0.5 shrink-0', config.icon_color)} strokeWidth={2.5} />

      <div className="flex-1 min-w-0">
        <p className={cn('font-semibold text-sm', config.text_color)}>{config.title}</p>
        <p className={cn('text-xs mt-0.5 leading-relaxed', config.text_color, 'opacity-80')}>
          {config.message}
        </p>

        {/* Progress bar */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-black/10 overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all', config.bar_color)}
              style={{ width: `${Math.min(estimate.percent, 100)}%` }}
            />
          </div>
          <span className={cn('text-[10px] font-semibold tabular-nums shrink-0', config.text_color)}>
            {estimate.percent}%
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2.5">
          <a
            href="/workspace"
            className={cn(
              'inline-flex items-center gap-1.5 text-xs font-medium underline underline-offset-2',
              config.text_color
            )}
          >
            <HardDrive className="h-3 w-3" />
            Manage workspaces
          </a>
          {isCritical && (
            <span className={cn('text-xs opacity-60', config.text_color)}>
              · Export as PDF to free space
            </span>
          )}
        </div>
      </div>

      {/* Dismiss — only on warning level, critical/full stays until resolved */}
      {estimate.level === 'warning' && (
        <button
          onClick={() => setDismissed(true)}
          className={cn('shrink-0 opacity-50 hover:opacity-100 transition-opacity', config.text_color)}
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

// ─── Compact indicator for toolbars / headers ─────────────────────────────────

export function StorageIndicator({ className }: { className?: string }) {
  const estimate = useStorageEstimate()

  if (!estimate || !estimate.supported || estimate.level === 'ok') return null

  const colors = {
    warning: 'text-amber-500 border-amber-500/30 bg-amber-500/10',
    critical: 'text-red-500 border-red-500/30 bg-red-500/10',
    full: 'text-red-600 border-red-600/40 bg-red-600/15',
    ok: '',
  }

  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-semibold',
      colors[estimate.level],
      className
    )}>
      <HardDrive className="h-3 w-3" />
      {estimate.percent}% storage used
    </div>
  )
}
