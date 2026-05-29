'use client'

import { BlockRegistry, type BlockEditorProps, type BlockPreviewProps } from '../block-registry'
import { Button } from '@/components/ui/button'
import { generateId } from '@/lib/utils'
import type { TableContent } from '@/features/storage/types'

function TableEditor({ block, onChange }: BlockEditorProps) {
  const content = block.content as TableContent
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {content.headers.map((h, ci) => (
                <th key={ci} className="p-1">
                  <input
                    type="text"
                    value={h}
                    placeholder={`Col ${ci + 1}`}
                    onChange={(e) => {
                      const headers = [...content.headers]
                      headers[ci] = e.target.value
                      onChange({ ...content, headers })
                    }}
                    className="w-full text-xs font-semibold border-b border-[var(--border)] bg-transparent focus:outline-none text-center"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className="p-1">
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => {
                        const rows = content.rows.map((r, rIdx) =>
                          rIdx === ri ? r.map((c, cIdx) => (cIdx === ci ? e.target.value : c)) : r
                        )
                        onChange({ ...content, rows })
                      }}
                      className="w-full text-xs border-b border-[var(--border)] bg-transparent focus:outline-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="ghost" size="sm" onClick={() =>
        onChange({ ...content, rows: [...content.rows, content.headers.map(() => '')] })
      }>
        + Add row
      </Button>
    </div>
  )
}

function TablePreview({ block }: BlockPreviewProps) {
  const content = block.content as TableContent
  return (
    <div className="p-3 overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr style={{ borderBottom: '2px solid var(--planner-border)' }}>
            {content.headers.map((h, i) => (
              <th key={i} className="text-center py-1 px-2 font-medium" style={{ color: 'var(--planner-text)' }}>{h || `Col ${i + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: '1px solid var(--planner-border)' }}>
              {row.map((cell, ci) => (
                <td key={ci} className="text-center py-1.5 px-2" style={{ color: 'var(--planner-text)' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TablePrint({ block }: { block: import('@/features/storage/types').PlannerBlock }) {
  const content = block.content as TableContent
  return (
    <div style={{ padding: '8pt' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
        <thead>
          <tr style={{ borderBottom: '2pt solid #ddd' }}>
            {content.headers.map((h, i) => (
              <th key={i} style={{ textAlign: 'center', padding: '4pt', fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: '1pt solid #eee' }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ textAlign: 'center', padding: '5pt' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

BlockRegistry.register({
  type: 'table',
  label: 'Table',
  icon: 'Table2',
  defaultContent: {
    headers: ['Column 1', 'Column 2', 'Column 3'],
    rows: [['', '', ''], ['', '', ''], ['', '', '']],
  } satisfies TableContent,
  EditorComponent: TableEditor,
  PreviewComponent: TablePreview,
  PrintComponent: TablePrint,
})

export {}
