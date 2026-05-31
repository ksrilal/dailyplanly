'use client'

import { useEffect, useState } from 'react'

export interface StorageEstimate {
  usage: number        // bytes used
  quota: number        // bytes available
  percent: number      // 0–100
  level: 'ok' | 'warning' | 'critical' | 'full'
  supported: boolean
}

const WARN_THRESHOLD = 0.70   // 70% — show yellow warning
const CRIT_THRESHOLD = 0.90   // 90% — show red critical
const FULL_THRESHOLD = 0.99   // 99% — storage full

function classify(percent: number): StorageEstimate['level'] {
  if (percent >= FULL_THRESHOLD * 100) return 'full'
  if (percent >= CRIT_THRESHOLD * 100) return 'critical'
  if (percent >= WARN_THRESHOLD * 100) return 'warning'
  return 'ok'
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

export function useStorageEstimate(): StorageEstimate | null {
  const [estimate, setEstimate] = useState<StorageEstimate | null>(null)

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.storage?.estimate) {
      setEstimate({ usage: 0, quota: 0, percent: 0, level: 'ok', supported: false })
      return
    }

    async function check() {
      try {
        const { usage = 0, quota = 0 } = await navigator.storage.estimate()
        const percent = quota > 0 ? Math.round((usage / quota) * 100) : 0
        setEstimate({ usage, quota, percent, level: classify(percent), supported: true })
      } catch {
        setEstimate({ usage: 0, quota: 0, percent: 0, level: 'ok', supported: false })
      }
    }

    check()
    // Re-check every 60 seconds while the page is open
    const id = setInterval(check, 60_000)
    return () => clearInterval(id)
  }, [])

  return estimate
}
