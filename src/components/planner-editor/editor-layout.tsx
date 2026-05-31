'use client'

import { useState, useRef, useCallback } from 'react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

interface EditorLayoutProps {
  toolbar: React.ReactNode
  palette: React.ReactNode
  canvas: React.ReactNode
  settings: React.ReactNode
}

const SETTINGS_MIN = 200
const SETTINGS_MAX = 480
const SETTINGS_DEFAULT = 280

export function EditorLayout({ toolbar, palette, canvas, settings }: EditorLayoutProps) {
  const [paletteCollapsed, setPaletteCollapsed] = useState(false)
  const [settingsWidth, setSettingsWidth] = useState(SETTINGS_DEFAULT)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startW = useRef(SETTINGS_DEFAULT)

  // ── Settings resize drag ──────────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    startX.current = e.clientX
    startW.current = settingsWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    function onMove(ev: MouseEvent) {
      if (!dragging.current) return
      const delta = startX.current - ev.clientX   // dragging left = wider
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

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Toolbar */}
      <div className="planner-toolbar flex-shrink-0 border-b border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2">
        {toolbar}
      </div>

      {/* Three-panel body */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Block palette (collapsible) ── */}
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

          {/* Palette content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {paletteCollapsed
              ? <CollapsedPalette palette={palette} />
              : palette
            }
          </div>
        </aside>

        {/* ── Center: Canvas ── */}
        <main className="flex-1 overflow-auto bg-[var(--bg-page)]">
          <div className="min-w-fit p-6">
            {canvas}
          </div>
        </main>

        {/* ── Right: Settings (resizable) ── */}
        <div className="hidden md:flex flex-shrink-0 relative" style={{ width: settingsWidth }}>
          {/* Drag handle */}
          <div
            onMouseDown={onMouseDown}
            className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[var(--color-accent)]/40 active:bg-[var(--color-accent)]/60 transition-colors z-10 group"
            title="Drag to resize"
          >
            {/* Visual grip dots */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {[0,1,2].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
              ))}
            </div>
          </div>

          <aside
            className="block-settings flex-1 border-l border-[var(--border)] bg-[var(--bg-surface)] overflow-y-auto"
          >
            {settings}
          </aside>
        </div>

      </div>
    </div>
  )
}

// ── Collapsed palette — icon-only with tooltips ───────────────────────────────

function CollapsedPalette({ palette }: { palette: React.ReactNode }) {
  // Extract block buttons from palette by re-rendering a slim version.
  // We use a CSS trick: render palette but hide text, showing only icons centered.
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

// Wrap the palette so each button gets a data-tooltip from its text label
function TooltipPaletteWrapper({ palette }: { palette: React.ReactNode }) {
  // We can't introspect React children easily — instead we inject the tooltip
  // via a ref and DOM mutation after mount.
  const ref = useRef<HTMLDivElement>(null)

  // After first render, add data-tooltip from button text to each button
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
