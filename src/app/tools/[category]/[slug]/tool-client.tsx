'use client'

import { useState } from 'react'
import { getTool } from '@/features/tools/registry'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ToolResult } from '@/features/tools/types'

interface ToolClientProps {
  toolSlug: string
}

export function ToolClient({ toolSlug }: ToolClientProps) {
  const tool = getTool(toolSlug)

  const initialValues: Record<string, string | number> = {}
  tool?.inputs.forEach((input) => {
    if (input.defaultValue !== undefined) initialValues[input.id] = input.defaultValue
  })

  const [values, setValues] = useState<Record<string, string | number>>(initialValues)
  const [result, setResult] = useState<ToolResult | null>(() => {
    if (!tool) return null
    try { return tool.calculate(initialValues) } catch { return null }
  })

  if (!tool) return null

  function handleChange(id: string, value: string | number) {
    const newValues = { ...values, [id]: value }
    setValues(newValues)
    try { setResult(tool!.calculate(newValues)) } catch { setResult(null) }
  }

  function handleExportText() {
    if (!result?.exportText) return
    const blob = new Blob([result.exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${tool!.title}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Inputs */}
      <div className="flex flex-col gap-4 p-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)]">
        {tool.inputs.map((input) => {
          const val = values[input.id] ?? ''
          if (input.type === 'select' && input.options) {
            return (
              <Select
                key={input.id}
                label={input.label}
                value={String(val)}
                options={input.options}
                onChange={(e) => handleChange(input.id, e.target.value)}
              />
            )
          }
          return (
            <Input
              key={input.id}
              label={`${input.label}${input.unit ? ` (${input.unit})` : ''}`}
              type={input.type === 'number' ? 'number' : 'text'}
              value={val}
              placeholder={input.placeholder}
              min={input.min}
              max={input.max}
              step={input.step}
              required={input.required}
              onChange={(e) => handleChange(input.id, input.type === 'number' ? Number(e.target.value) : e.target.value)}
            />
          )
        })}
      </div>

      {/* Result */}
      {result && (
        <div className="p-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--color-accent-soft)]">
          <p className="text-2xl font-display font-semibold text-[var(--color-accent)] mb-1">{result.primary}</p>
          {result.secondary && <p className="text-sm text-[var(--text-muted)]">{result.secondary}</p>}

          {result.sections && result.sections.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              {result.sections.map((section) => (
                <div key={section.label} className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">{section.label}</span>
                  <span className="font-medium text-[var(--text-primary)]">{section.value}</span>
                </div>
              ))}
            </div>
          )}

          {tool.hasExport && result.exportText && (
            <Button variant="outline" size="sm" className="mt-4" onClick={handleExportText}>
              Export as Text
            </Button>
          )}
        </div>
      )}

      {tool.relatedTemplateId && (
        <p className="text-sm text-[var(--text-muted)]">
          💡 This tool pairs well with the{' '}
          <a href={`/templates/productivity/${tool.relatedTemplateId}`} className="text-[var(--color-accent)] hover:underline">
            related template
          </a>
          .
        </p>
      )}
    </div>
  )
}
