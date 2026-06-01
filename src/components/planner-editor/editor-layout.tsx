'use client'

import { useState, useRef, useCallback } from 'react'
import { PanelLeftClose, PanelLeftOpen, Layers, Settings2, X, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EditorLayoutProps {
  toolbar: React.ReactNode
  palette: React.ReactNode
  canvas: React.ReactNode
  settings: React.ReactNode
}

const SETTINGS_MIN = 200
const SETTINGS_MAX = 480
const SETTINGS_DEFAULT = 280

// ─── Mobile bottom drawer ─────────────────────────────────────────────────────

type MobilePanel = 'blocks' | 'settings' | null

function MobileDrawer({
  open,
  panel,
  onClose,
  palette,
  settings,
}: {
  open: boolean
  panel: MobilePanel
  onClose: () => void
  palette: React.ReactNode
  settings: React.ReactNode
}) {
  if (!open || !panel) return null
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:hidden',
        'bg-[var(--bg-surface)] border-t border-[var(--border)]',
        'rounded-t-2xl shadow-2xl',
        'flex flex-col',
        'transition-transform duration-300',
        open ? 'translate-y-0' : 'translate-y-full'
      )}
        style={{ maxHeight: '80vh' }}
      >
        {/* Drawer handle + header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] flex-shrink-0">
          <div className="flex items-center gap-2">
            {panel === 'blocks'
              ? <Layers className="h-4 w-4 text-[var(--color-accent)]" />
              : <Settings2 className="h-4 w-4 text-[var(--color-accent)]" />
            }
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {panel === 'blocks' ? 'Add Block' : 'Block Settings'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-faint)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer content — scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {panel === 'blocks' ? palette : settings}
        </div>
      </div>
    </>
  )
}

// ─── Mobile bottom tab bar ────────────────────────────────────────────────────

function MobileTabBar({
  activePanel,
  onToggle,
}: {
  activePanel: MobilePanel
  onToggle: (panel: MobilePanel) => void
}) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex border-t border-[var(--border)] bg-[var(--bg-surface)]">
      <button
        onClick={() => onToggle('blocks')}
        className={cn(
          'flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors',
          activePanel === 'blocks'
            ? 'text-[var(--color-accent)]'
            : 'text-[var(--text-faint)] hover:text-[var(--text-primary)]'
        )}
      >
        <Layers className="h-5 w-5" />
        <span>Add Block</span>
      </button>

      <button
        onClick={() => onToggle('settings')}
        className={cn(
          'flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors',
          activePanel === 'settings'
            ? 'text-[var(--color-accent)]'
            : 'text-[var(--text-faint)] hover:text-[var(--text-primary)]'
        )}
      >
        <Settings2 className="h-5 w-5" />
        <span>Settings</span>
      </button>

      <button
        className="flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium text-[var(--text-faint)]"
      >
        <LayoutGrid className="h-5 w-5" />
        <span>Canvas</span>
      </button>
    </div>
  )
}

// ─── Main layout ──────────────────────────────────────────────────────────────

export function EditorLayout({ toolbar, palette, canvas, settings }: EditorLayoutProps) {
  const [paletteCollapsed, setPaletteCollapsed] = useState(false)
  const [settingsWidth, setSettingsWidth] = useState(SETTINGS_DEFAULT)
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>(null)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startW = useRef(SETTINGS_DEFAULT)

  // ── Desktop settings resize drag ──────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    startX.current = e.clientX
    startW.current = settingsWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    function onMove(ev: MouseEvent) {
      if (!dragging.current) return
      const delta = startX.current - ev.clientX
      const next = Math.min(SETTINGS_MAX, Math.max(SETTINGS_MIN, startW.current + delta))
      setSettingsWidth(next)
    }
    function onUp() {
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [settingsWidth])

  function toggleMobilePanel(panel: MobilePanel) {
    setMobilePanel((prev) => prev === panel ? null : panel)
  }

  return (
    // On mobile: extra bottom padding for the tab bar
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden pb-[60px] md:pb-0">

      {/* Toolbar */}
      <div className="planner-toolbar flex-shrink-0 border-b border-[var(--border)] bg-[var(--bg-surface)] px-3 md:px-4 py-2">
        {toolbar}
      </div>

      {/* Three-panel body (desktop) / single canvas (mobile) */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Block palette — desktop only ── */}
        <aside
          className="block-palette flex-shrink-0 border-r border-[var(--border)] bg-[var(--bg-surface)] overflow-y-auto hidden md:flex flex-col transition-all duration-200"
          style={{ width: paletteCollapsed ? '48px' : '256px' }}
        >
          {/* Toggle button */}
          <div className="flex items-center justify-end px-2 py-2 border-b border-[var(--border)] flex-shrink-0">
            <button
              onClick={() => setPaletteCollapsed(!paletteCollapsed)}
              className="p-1.5 rounded-md text-[var(--text-faint)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
              title={paletteCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {paletteCollapsed
                ? <PanelLeftOpen className="h-4 w-4" strokeWidth={1.75} />
                : <PanelLeftClose className="h-4 w-4" strokeWidth={1.75} />
              }
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {paletteCollapsed
              ? <CollapsedPalette palette={palette} />
              : palette
            }
          </div>
        </aside>

        {/* ── Center: Canvas ── */}
        <main className="flex-1 overflow-auto bg-[var(--bg-page)]">
          <div className="min-w-fit p-3 md:p-6">
            {canvas}
          </div>
        </main>

        {/* ── Right: Settings — desktop only ── */}
        <div className="hidden md:flex flex-shrink-0 relative" style={{ width: settingsWidth }}>
          {/* Drag handle */}
          <div
            onMouseDown={onMouseDown}
            className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[var(--color-accent)]/40 active:bg-[var(--color-accent)]/60 transition-colors z-10 group"
            title="Drag to resize"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
              ))}
            </div>
          </div>
          <aside className="block-settings flex-1 border-l border-[var(--border)] bg-[var(--bg-surface)] overflow-y-auto">
            {settings}
          </aside>
        </div>

      </div>

      {/* ── Mobile: bottom tab bar ── */}
      <MobileTabBar
        activePanel={mobilePanel}
        onToggle={toggleMobilePanel}
      />

      {/* ── Mobile: bottom drawer ── */}
      <MobileDrawer
        open={mobilePanel !== null}
        panel={mobilePanel}
        onClose={() => setMobilePanel(null)}
        palette={palette}
        settings={settings}
      />

    </div>
  )
}

// ─── Collapsed palette — icon-only with tooltips (desktop) ───────────────────

function CollapsedPalette({ palette }: { palette: React.ReactNode }) {
  return (
    <div className="collapsed-palette py-2">
      <style>{`
        .collapsed-palette button span { display: none; }
        .collapsed-palette button {
          justify-content: center;
          padding-left: 0;
          padding-right: 0;
          position: relative;
        }
        .collapsed-palette button:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
          background: var(--color-ink);
          color: var(--color-paper);
          font-size: 11px;
          font-weight: 500;
          white-space: nowrap;
          padding: 4px 8px;
          border-radius: 6px;
          z-index: 100;
          pointer-events: none;
        }
        .collapsed-palette p { display: none; }
      `}</style>
      <TooltipPaletteWrapper palette={palette} />
    </div>
  )
}

function TooltipPaletteWrapper({ palette }: { palette: React.ReactNode }) {
  const injectTooltips = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const buttons = node.querySelectorAll('button')
    buttons.forEach((btn) => {
      const span = btn.querySelector('span')
      if (span) btn.setAttribute('data-tooltip', span.textContent ?? '')
    })
  }, [])

  return (
    <div ref={(node) => { injectTooltips(node) }}>
      {palette}
    </div>
  )
}
