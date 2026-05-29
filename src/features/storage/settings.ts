import { STORAGE_KEYS, DEFAULT_PAPER_SIZE } from '@/lib/constants'
import type { AppSettings, PaperSize } from './types'

function readSettings(): AppSettings {
  if (typeof window === 'undefined') {
    return { theme: 'light', defaultPaperSize: DEFAULT_PAPER_SIZE }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return raw ? (JSON.parse(raw) as AppSettings) : { theme: 'light', defaultPaperSize: DEFAULT_PAPER_SIZE }
  } catch {
    return { theme: 'light', defaultPaperSize: DEFAULT_PAPER_SIZE }
  }
}

function writeSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
}

export function getTheme(): 'light' | 'dark' | 'system' {
  return readSettings().theme
}

export function setTheme(theme: 'light' | 'dark' | 'system'): void {
  writeSettings({ ...readSettings(), theme })
}

export function getDefaultPaperSize(): PaperSize {
  return readSettings().defaultPaperSize
}

export function setDefaultPaperSize(size: PaperSize): void {
  writeSettings({ ...readSettings(), defaultPaperSize: size })
}
