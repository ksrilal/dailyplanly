'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AUTOSAVE_DEBOUNCE_MS } from '@/lib/constants'
import type { SaveStatus } from '@/components/ui/autosave-indicator'

interface UseAutoSaveOptions<T> {
  debounceMs?: number
  onSave?: () => void
  onError?: (error: Error) => void
  enabled?: boolean
}

export function useAutoSave<T>(
  data: T | null,
  saveFn: (data: T) => Promise<void>,
  options: UseAutoSaveOptions<T> = {}
): { status: SaveStatus } {
  const { debounceMs = AUTOSAVE_DEBOUNCE_MS, onSave, onError, enabled = true } = options
  const [status, setStatus] = useState<SaveStatus>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevDataRef = useRef<T | null>(null)

  const save = useCallback(
    async (d: T) => {
      setStatus('saving')
      try {
        await saveFn(d)
        setStatus('saved')
        onSave?.()
        setTimeout(() => setStatus('idle'), 2000)
      } catch (err) {
        setStatus('error')
        onError?.(err instanceof Error ? err : new Error(String(err)))
      }
    },
    [saveFn, onSave, onError]
  )

  useEffect(() => {
    if (!enabled || !data) return
    if (JSON.stringify(data) === JSON.stringify(prevDataRef.current)) return

    prevDataRef.current = data

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      save(data)
    }, debounceMs)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [data, debounceMs, save, enabled])

  return { status }
}
