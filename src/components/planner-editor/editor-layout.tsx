'use client'

import { cn } from '@/lib/utils'

interface EditorLayoutProps {
  toolbar: React.ReactNode
  palette: React.ReactNode
  canvas: React.ReactNode
  settings: React.ReactNode
}

export function EditorLayout({ toolbar, palette, canvas, settings }: EditorLayoutProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Toolbar */}
      <div className="planner-toolbar flex-shrink-0 border-b border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2">
        {toolbar}
      </div>
      {/* Three panel body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Block palette */}
        <aside className="block-palette w-64 flex-shrink-0 border-r border-[var(--border)] bg-[var(--bg-surface)] overflow-y-auto hidden md:block">
          {palette}
        </aside>
        {/* Center: Canvas */}
        <main className="flex-1 overflow-y-auto bg-[var(--bg-page)] p-6">
          {canvas}
        </main>
        {/* Right: Settings */}
        <aside className="block-settings w-64 flex-shrink-0 border-l border-[var(--border)] bg-[var(--bg-surface)] overflow-y-auto hidden md:block">
          {settings}
        </aside>
      </div>
    </div>
  )
}
