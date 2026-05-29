'use client'

import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import type { NotesContent } from '@/features/storage/types'

function NotesEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as NotesContent
  return (
    <div className="flex flex-col gap-3">
      <Input
        label="Number of lines"
        type="number"
        value={content.lines}
        min={3}
        max={30}
        onChange={(e) => onChange({ ...content, lines: Number(e.target.value) })}
      />
      <Textarea
        label="Content"
        value={content.text ?? ''}
        placeholder="Write your notes here…"
        onChange={(e) => onChange({ ...content, text: e.target.value })}
      />
    </div>
  )
}

function NotesPreview({ block }: BlockPreviewProps) {
  const content = block.content as NotesContent
  const lines = Array.from({ length: content.lines }, (_, i) => i)
  return (
    <div className="p-3">
      {content.text ? (
        <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--planner-text)' }}>{content.text}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {lines.map((i) => (
            <div key={i} className="h-px w-full" style={{ backgroundColor: 'var(--planner-border)' }} />
          ))}
        </div>
      )}
    </div>
  )
}

function NotesPrint({ block }: { block: import('@/features/storage/types').PlannerBlock }) {
  const content = block.content as NotesContent
  const lines = Array.from({ length: content.lines }, (_, i) => i)
  return (
    <div style={{ padding: '8pt' }}>
      {content.text ? (
        <p style={{ fontSize: '10pt', whiteSpace: 'pre-wrap' }}>{content.text}</p>
      ) : (
        lines.map((i) => (
          <div key={i} style={{ borderBottom: '1px solid #ddd', marginBottom: '14pt', height: '14pt' }} />
        ))
      )}
    </div>
  )
}

BlockRegistry.register({
  type: 'notes',
  label: 'Notes',
  icon: 'StickyNote',
  defaultContent: { lines: 8, text: '' } satisfies NotesContent,
  EditorComponent: NotesEditor,
  PreviewComponent: NotesPreview,
  PrintComponent: NotesPrint,
})

export {}
