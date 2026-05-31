'use client'

import { useRef } from 'react'
import { ImageIcon, Upload, X } from 'lucide-react'
import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import type { ImageContent, PlannerBlock } from '@/features/storage/types'

// ─── Size estimate helper ─────────────────────────────────────────────────────

function estimateKB(src: string): number {
  // base64 string length × 0.75 = approximate byte count
  return Math.round((src.length * 0.75) / 1024)
}

// ─── Editor ───────────────────────────────────────────────────────────────────

function ImageEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as ImageContent
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Warn if > 500KB original
    if (file.size > 500 * 1024) {
      // Still allow but warn
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      const src = ev.target?.result as string
      onChange({ ...content, src })
    }
    reader.readAsDataURL(file)
    // Reset so same file can be re-selected
    e.target.value = ''
  }

  const sizeKB = content.src ? estimateKB(content.src) : 0

  return (
    <div className="flex flex-col gap-3">
      {/* Upload area */}
      <div
        className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--color-accent)]/50 bg-[var(--bg-subtle)] transition-colors cursor-pointer"
        style={{ minHeight: content.src ? '0' : '100px' }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFile}
        />

        {content.src ? (
          <div className="w-full relative group/img">
            <img
              src={content.src}
              alt={content.alt || 'Block image'}
              className="w-full rounded-lg object-contain max-h-48"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-[#111] text-xs font-semibold hover:bg-white transition-colors"
              >
                <Upload className="h-3.5 w-3.5" /> Replace
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onChange({ ...content, src: '' }) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/90 text-white text-xs font-semibold hover:bg-red-500 transition-colors"
              >
                <X className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 py-6 px-4 text-center">
            <ImageIcon className="h-8 w-8 text-[var(--text-faint)]" strokeWidth={1.5} />
            <p className="text-xs font-medium text-[var(--text-secondary)]">Click to upload image</p>
            <p className="text-[10px] text-[var(--text-faint)]">PNG, JPG, GIF, WebP · Recommended &lt;500KB</p>
          </div>
        )}
      </div>

      {/* Storage info */}
      {content.src && (
        <div className={[
          'flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px]',
          sizeKB > 300
            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
            : 'bg-[var(--bg-subtle)] text-[var(--text-faint)]',
        ].join(' ')}>
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sizeKB > 300 ? '#f59e0b' : '#22c55e' }} />
          {sizeKB > 300
            ? `Large image (~${sizeKB}KB) — may slow down saves`
            : `~${sizeKB}KB stored in browser`}
        </div>
      )}

      {/* Alt text */}
      <div>
        <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1">Alt text</label>
        <input
          type="text"
          value={content.alt}
          placeholder="Describe the image…"
          onChange={(e) => onChange({ ...content, alt: e.target.value })}
          className="w-full text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--text-primary)] placeholder:text-[var(--text-faint)]"
        />
      </div>

      {/* Fit mode */}
      {content.src && (
        <div>
          <p className="text-xs font-medium text-[var(--text-secondary)] mb-1.5">Fit mode</p>
          <div className="flex gap-2">
            {(['contain', 'cover', 'fill'] as const).map((f) => (
              <button
                key={f}
                onClick={() => onChange({ ...content, fit: f })}
                className={[
                  'flex-1 py-1 rounded-md text-xs font-medium border capitalize transition-all',
                  content.fit === f
                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--color-accent)]/50',
                ].join(' ')}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Caption */}
      {content.src && (
        <div>
          <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1">Caption <span className="text-[var(--text-faint)] font-normal">(optional)</span></label>
          <input
            type="text"
            value={content.caption ?? ''}
            placeholder="Caption shown below image…"
            onChange={(e) => onChange({ ...content, caption: e.target.value })}
            className="w-full text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-[var(--text-primary)] placeholder:text-[var(--text-faint)]"
          />
        </div>
      )}
    </div>
  )
}

// ─── Preview ──────────────────────────────────────────────────────────────────

function ImagePreview({ block }: BlockPreviewProps) {
  const content = block.content as ImageContent

  if (!content.src) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-1 rounded-lg m-2"
        style={{ height: '80px', border: '1.5px dashed var(--planner-border)', background: 'var(--planner-surface)' }}
      >
        <ImageIcon className="h-5 w-5 opacity-25" style={{ color: 'var(--planner-text-muted)' }} />
        <span className="text-[9px] opacity-30" style={{ color: 'var(--planner-text-muted)' }}>No image yet</span>
      </div>
    )
  }

  return (
    <div className="p-2">
      <img
        src={content.src}
        alt={content.alt || ''}
        className="w-full rounded"
        style={{ objectFit: content.fit, maxHeight: '200px' }}
      />
      {content.caption && (
        <p className="text-[9px] text-center mt-1 opacity-50" style={{ color: 'var(--planner-text-muted)' }}>
          {content.caption}
        </p>
      )}
    </div>
  )
}

// ─── Print ────────────────────────────────────────────────────────────────────

function ImagePrint({ block }: { block: PlannerBlock }) {
  const content = block.content as ImageContent
  if (!content.src) return null

  return (
    <div style={{ padding: '8pt', textAlign: 'center' }}>
      <img
        src={content.src}
        alt={content.alt || ''}
        style={{
          maxWidth: '100%',
          objectFit: content.fit,
          borderRadius: '4pt',
        }}
      />
      {content.caption && (
        <p style={{ fontSize: '8pt', color: '#888', marginTop: '4pt' }}>{content.caption}</p>
      )}
    </div>
  )
}

// ─── Register ─────────────────────────────────────────────────────────────────

BlockRegistry.register({
  type: 'image',
  label: 'Image',
  icon: 'ImageIcon',
  defaultContent: { src: '', alt: '', fit: 'contain' } satisfies ImageContent,
  EditorComponent: ImageEditor,
  PreviewComponent: ImagePreview,
  PrintComponent: ImagePrint,
})

export {}
