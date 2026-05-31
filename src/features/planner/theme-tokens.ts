import type { PlannerTheme } from '@/features/storage/types'

export interface PlannerThemeTokens {
  '--planner-bg': string
  '--planner-surface': string
  '--planner-text': string
  '--planner-text-muted': string
  '--planner-accent': string
  '--planner-border': string
  '--planner-font-heading': string
  '--planner-font-body': string
  '--planner-radius': string
}

export const THEME_MAP: Record<PlannerTheme, PlannerThemeTokens> = {
  minimal: {
    '--planner-bg': '#ffffff',
    '--planner-surface': '#fafafa',
    '--planner-text': '#111111',
    '--planner-text-muted': '#666666',
    '--planner-accent': '#111111',
    '--planner-border': '#e8e8e8',
    '--planner-font-heading': 'var(--font-inter), Inter, system-ui, sans-serif',
    '--planner-font-body': 'var(--font-inter), Inter, system-ui, sans-serif',
    '--planner-radius': '4px',
  },
  'soft-paper': {
    '--planner-bg': '#faf7f2',
    '--planner-surface': '#f5f0e8',
    '--planner-text': '#2d2520',
    '--planner-text-muted': '#7a6e65',
    '--planner-accent': '#8b5e3c',
    '--planner-border': '#e0d8cc',
    '--planner-font-heading': 'var(--font-lora), Lora, Georgia, serif',
    '--planner-font-body': 'var(--font-inter), Inter, system-ui, sans-serif',
    '--planner-radius': '6px',
  },
  'elegant-dark': {
    '--planner-bg': '#1a1a1a',
    '--planner-surface': '#242424',
    '--planner-text': '#f0ede8',
    '--planner-text-muted': '#888888',
    '--planner-accent': '#c4a882',
    '--planner-border': '#333333',
    '--planner-font-heading': 'var(--font-lora), Lora, Georgia, serif',
    '--planner-font-body': 'var(--font-inter), Inter, system-ui, sans-serif',
    '--planner-radius': '4px',
  },
  'study-focus': {
    '--planner-bg': '#f8f6ff',
    '--planner-surface': '#f0ecff',
    '--planner-text': '#1e1b4b',
    '--planner-text-muted': '#6366f1',
    '--planner-accent': '#6366f1',
    '--planner-border': '#e0dcff',
    '--planner-font-heading': 'var(--font-inter), Inter, system-ui, sans-serif',
    '--planner-font-body': 'var(--font-inter), Inter, system-ui, sans-serif',
    '--planner-radius': '8px',
  },
  'wellness-calm': {
    '--planner-bg': '#f5fbf5',
    '--planner-surface': '#eef8ee',
    '--planner-text': '#1a2e1a',
    '--planner-text-muted': '#4a7a4a',
    '--planner-accent': '#4caf50',
    '--planner-border': '#d4ebd4',
    '--planner-font-heading': 'var(--font-lora), Lora, Georgia, serif',
    '--planner-font-body': 'var(--font-inter), Inter, system-ui, sans-serif',
    '--planner-radius': '8px',
  },
}

export function getThemeStyle(theme: PlannerTheme): React.CSSProperties {
  return THEME_MAP[theme] as unknown as React.CSSProperties
}
