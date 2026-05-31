'use client'

import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import type { SpacerContent, PlannerBlock } from '@/features/storage/types'

const HEIGHTS = [24, 48, 80, 120, 160, 200]

function SpacerEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as SpacerContent

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">Height</p>
        <div className="flex flex-wrap gap-2">
          {HEIGHTS.map((h) => (
            <button
              key={h}
              onClick={() => onChange({ ...content, height: h })}
              className={[
                'px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                content.height === h
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              {h}px
            </button>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-[var(--text-faint)]">
        Use a spacer to add breathing room between blocks on your printable layout.
      </p>
    </div>
  )
}

function SpacerPreview({ block }: BlockPreviewProps) {
  const content = block.content as SpacerContent
  const h = Math.min(content.height, 80) // cap preview height so canvas doesn't get huge

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: `${h}px` }}
    >
      <div className="w-full border-t border-dashed" style={{ borderColor: 'var(--planner-border)' }} />
    </div>
  )
}

function SpacerPrint({ block }: { block: PlannerBlock }) {
  const content = block.content as SpacerContent
  return <div style={{ height: `${content.height}px`, width: '100%' }} />
}

BlockRegistry.register({
  type: 'spacer',
  label: 'Spacer',
  icon: 'SeparatorHorizontal',
  defaultContent: { height: 48 } satisfies SpacerContent,
  EditorComponent: SpacerEditor,
  PreviewComponent: SpacerPreview,
  PrintComponent: SpacerPrint,
})

export {}
