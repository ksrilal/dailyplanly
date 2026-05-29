'use client'

import { getThemeStyle } from '@/features/planner/theme-tokens'
import { BlockRegistry } from '@/features/planner/block-registry'
import type { Template } from '@/features/templates/types'
import type { PlannerBlock, ChecklistItem } from '@/features/storage/types'

// Register all blocks at module load time (safe — this is client-only)
import '@/features/planner/init-blocks'

// ─── Planner block preview renderer ──────────────────────────────────────────

function PlannerBlockPreview({ block }: { block: PlannerBlock }) {
  if (!BlockRegistry.has(block.type)) return null
  const entry = BlockRegistry.get(block.type)
  const Preview = entry.PreviewComponent

  return (
    <div
      className="rounded-sm border mb-2"
      style={{
        borderColor: 'var(--planner-border)',
        background: 'var(--planner-surface)',
      }}
    >
      {block.label && (
        <div className="px-2 pt-2 pb-0.5 text-[9px] font-semibold uppercase tracking-wider opacity-50"
          style={{ color: 'var(--planner-text-muted)' }}>
          {block.label}
        </div>
      )}
      <Preview block={block} />
    </div>
  )
}

function PlannerPreview({ template }: { template: Template }) {
  const blocks = template.plannerDefaults?.blocks ?? []
  const theme = template.plannerDefaults?.theme ?? 'minimal'
  const themeStyle = getThemeStyle(theme)

  return (
    <div
      className="w-full h-full p-4"
      style={{
        ...(themeStyle as React.CSSProperties),
        background: 'var(--planner-bg)',
        fontFamily: 'var(--planner-font-body)',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(0,0,0,0.03) 27px, rgba(0,0,0,0.03) 28px)',
      }}
    >
      {blocks.length === 0 ? (
        <div className="flex items-center justify-center h-full opacity-30 text-sm">
          No blocks yet
        </div>
      ) : (
        [...blocks]
          .sort((a, b) => a.order - b.order)
          .map((block) => (
            <PlannerBlockPreview key={block.id} block={block} />
          ))
      )}
    </div>
  )
}

// ─── Checklist preview renderer ───────────────────────────────────────────────

function ChecklistItemRow({ item, items, depth = 0 }: { item: ChecklistItem; items: ChecklistItem[]; depth?: number }) {
  const children = items.filter((i) => i.parentId === item.id).sort((a, b) => a.order - b.order)

  return (
    <>
      <div
        className="flex items-center gap-2 py-1.5 border-b"
        style={{
          paddingLeft: `${12 + depth * 16}px`,
          borderColor: 'rgba(0,0,0,0.06)',
        }}
      >
        {/* Checkbox */}
        <div className={`w-3.5 h-3.5 rounded-sm border-2 flex-shrink-0 flex items-center justify-center ${item.checked ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}>
          {item.checked && (
            <svg viewBox="0 0 10 10" className="w-2 h-2">
              <polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <span className={`text-xs leading-relaxed ${item.checked ? 'line-through opacity-40' : 'opacity-75'}`}>
          {item.text || 'Task item'}
        </span>
      </div>
      {!item.collapsed && children.map((child) => (
        <ChecklistItemRow key={child.id} item={child} items={items} depth={depth + 1} />
      ))}
    </>
  )
}

function ChecklistPreview({ template }: { template: Template }) {
  const items: ChecklistItem[] = template.checklistDefaults?.items ?? []
  const mode = template.checklistDefaults?.mode ?? 'simple'
  const roots = items.filter((i) => i.parentId === null).sort((a, b) => a.order - b.order)

  // Progress
  const leaves = items.filter((i) => !items.some((c) => c.parentId === i.id))
  const done = leaves.filter((i) => i.checked).length
  const total = leaves.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  // Warm paper background with ruled lines to fill empty space
  const paperStyle: React.CSSProperties = {
    backgroundImage: [
      'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(0,0,0,0.04) 27px, rgba(0,0,0,0.04) 28px)',
    ].join(','),
    backgroundColor: '#faf8f5',
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={paperStyle}>
      {/* Header bar */}
      <div className="px-4 py-3 border-b border-gray-200/60 flex items-center justify-between bg-white/70 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${mode === 'simple' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
            {mode}
          </span>
          <span className="text-xs font-medium text-gray-400">Checklist</span>
        </div>
        {total > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[9px] text-gray-400">{pct}%</span>
          </div>
        )}
      </div>

      {/* Items — don't overflow, let the paper bg show below */}
      <div className="px-2 py-1 flex-shrink-0">
        {roots.length === 0 ? (
          <div className="flex items-center justify-center py-8 opacity-30 text-sm">No items yet</div>
        ) : (
          roots.map((item) => (
            <ChecklistItemRow key={item.id} item={item} items={items} depth={0} />
          ))
        )}
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function TemplatePreviewLive({ template }: { template: Template }) {
  const isPlanner = template.type === 'planner'

  return (
    <div className="w-full h-full">
      {isPlanner
        ? <PlannerPreview template={template} />
        : <ChecklistPreview template={template} />
      }
    </div>
  )
}
