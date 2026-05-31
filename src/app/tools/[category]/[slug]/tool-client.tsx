'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  CheckCircle2, ChevronDown, ChevronUp, Download, ExternalLink,
  LayoutTemplate, CheckSquare, MapPin, Calendar, Clock, Star,
  ArrowRight, Lightbulb, ListChecks, Milestone,
} from 'lucide-react'
import { getTool } from '@/features/tools/registry'
import { createPlanner } from '@/features/planner/planner-store'
import { createChecklist } from '@/features/checklist/checklist-store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ToolPlan } from '@/features/tools/types'

// ─── Input renderer ───────────────────────────────────────────────────────────

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: import('@/features/tools/types').ToolInputField
  value: string | number
  onChange: (val: string | number) => void
}) {
  const base = 'w-full rounded-lg border border-[var(--border)] bg-[var(--bg-page)] text-[var(--text-primary)] text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 transition-all'

  if (field.type === 'select' && field.options) {
    return (
      <div>
        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">{field.label}</label>
        <select
          className={base}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {field.hint && <p className="text-[10px] text-[var(--text-faint)] mt-1">{field.hint}</p>}
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">{field.label}</label>
        <textarea
          className={cn(base, 'resize-none h-20')}
          value={String(value)}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {field.hint && <p className="text-[10px] text-[var(--text-faint)] mt-1">{field.hint}</p>}
      </div>
    )
  }

  return (
    <div>
      <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
        {field.label}
        {field.unit && <span className="text-[var(--text-faint)] ml-1">({field.unit})</span>}
      </label>
      <input
        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
        className={base}
        value={String(value)}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        step={field.step}
        onChange={(e) => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
      />
      {field.hint && <p className="text-[10px] text-[var(--text-faint)] mt-1">{field.hint}</p>}
    </div>
  )
}

// ─── Section components ───────────────────────────────────────────────────────

function SectionCard({ icon: Icon, title, color, children }: {
  icon: React.ElementType; title: string; color: string; children: React.ReactNode
}) {
  const [open, setOpen] = useState(true)
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-[var(--bg-subtle)] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2.5">
          <Icon className={cn('h-4 w-4', color)} />
          <span className="text-sm font-semibold text-[var(--text-primary)]">{title}</span>
        </div>
        {open ? <ChevronUp className="h-3.5 w-3.5 text-[var(--text-faint)]" /> : <ChevronDown className="h-3.5 w-3.5 text-[var(--text-faint)]" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  )
}

// ─── Plan output ─────────────────────────────────────────────────────────────

function PlanOutput({ plan, toolTitle, relatedTemplateSlug, relatedTemplateCategory }: {
  plan: ToolPlan
  toolTitle: string
  relatedTemplateSlug?: string
  relatedTemplateCategory?: string
}) {
  const router = useRouter()
  const [creating, setCreating] = useState<'planner' | 'checklist' | null>(null)

  async function handleCreatePlanner() {
    setCreating('planner')
    try {
      const planner = await createPlanner()
      router.push(`/planner?id=${planner.id}`)
    } finally {
      setCreating(null)
    }
  }

  async function handleCreateChecklist() {
    setCreating('checklist')
    try {
      const checklist = await createChecklist()
      router.push(`/checklist?id=${checklist.id}`)
    } finally {
      setCreating(null)
    }
  }

  function handleExport() {
    if (!plan.exportText) return
    const text = plan.exportText
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${toolTitle}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-4">

      {/* ── Headline card ── */}
      <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-5 py-4">
        <p className="text-xl font-display font-semibold text-[var(--text-primary)] leading-snug">{plan.headline}</p>
        {plan.subheadline && <p className="text-sm text-[var(--text-muted)] mt-1">{plan.subheadline}</p>}
      </div>

      {/* ── Stats grid ── */}
      {plan.stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {plan.stats.map((s, i) => (
            <div key={i} className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-3">
              <p className="text-[10px] text-[var(--text-faint)] uppercase tracking-wider mb-0.5">{s.label}</p>
              <p className="text-lg font-semibold text-[var(--text-primary)] leading-tight">{s.value}</p>
              {s.note && <p className="text-[10px] text-[var(--text-faint)] mt-0.5">{s.note}</p>}
            </div>
          ))}
        </div>
      )}

      {/* ── Milestones ── */}
      {plan.milestones && plan.milestones.length > 0 && (
        <SectionCard icon={Milestone} title="Milestone Roadmap" color="text-violet-400">
          <div className="relative pl-4">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--border)]" />
            {plan.milestones.map((m, i) => (
              <div key={i} className="relative mb-4 last:mb-0">
                <div className="absolute -left-[17px] w-3 h-3 rounded-full bg-[var(--color-accent)] border-2 border-[var(--bg-surface)] top-0.5" />
                <p className="text-sm font-medium text-[var(--text-primary)]">{m.label}</p>
                {m.date && <p className="text-xs text-[var(--text-faint)] mt-0.5">{m.date}</p>}
                {m.description && <p className="text-xs text-[var(--text-muted)] mt-0.5">{m.description}</p>}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Weekly schedule ── */}
      {plan.weeklySchedule && plan.weeklySchedule.length > 0 && (
        <SectionCard icon={Calendar} title="Weekly Schedule" color="text-sky-400">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Period', 'Focus', 'Tasks', 'Notes'].map((h) => (
                    <th key={h} className="text-left py-2 pr-3 text-[var(--text-faint)] font-semibold uppercase tracking-wider text-[10px]"
                      style={{ borderBottom: '1px solid var(--border)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plan.weeklySchedule.map((row, i) => (
                  <tr key={i}>
                    <td className="py-2.5 pr-3 font-medium text-[var(--text-primary)] whitespace-nowrap align-top" style={{ borderBottom: '1px solid var(--border)' }}>{row.week}</td>
                    <td className="py-2.5 pr-3 text-[var(--color-accent)] font-medium align-top" style={{ borderBottom: '1px solid var(--border)' }}>{row.focus}</td>
                    <td className="py-2.5 pr-3 text-[var(--text-muted)] align-top" style={{ borderBottom: '1px solid var(--border)' }}>{row.tasks}</td>
                    <td className="py-2.5 text-[var(--text-faint)] italic align-top" style={{ borderBottom: '1px solid var(--border)' }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* ── Daily schedule ── */}
      {plan.dailySchedule && plan.dailySchedule.length > 0 && (
        <SectionCard icon={Clock} title="Daily Schedule" color="text-amber-400">
          <div className="flex flex-col">
            {plan.dailySchedule.map((block, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5" style={{ borderBottom: i < plan.dailySchedule!.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span className="text-xs font-mono text-[var(--text-faint)] w-28 shrink-0 pt-0.5">{block.time}</span>
                <div className={cn(
                  'w-2 h-2 rounded-full shrink-0 mt-1.5',
                  block.type === 'work' ? 'bg-violet-500' :
                    block.type === 'break' ? 'bg-emerald-500' :
                      block.type === 'review' ? 'bg-sky-500' : 'bg-[var(--border)]'
                )} />
                <span className="text-sm text-[var(--text-primary)]">{block.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[var(--border)]">
            {[['Work', 'bg-violet-500'], ['Break', 'bg-emerald-500'], ['Review', 'bg-sky-500']].map(([label, bg]) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={cn('w-2 h-2 rounded-full', bg)} />
                <span className="text-[10px] text-[var(--text-faint)]">{label}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Checklists ── */}
      {plan.checklists && plan.checklists.length > 0 && plan.checklists.map((cl, ci) => (
        <SectionCard key={ci} icon={ListChecks} title={cl.title} color="text-emerald-400">
          <div className="flex flex-col gap-2">
            {cl.items.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--text-faint)] shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--text-muted)]">{item}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      ))}

      {/* ── Recommendations ── */}
      {plan.recommendations && plan.recommendations.length > 0 && (
        <SectionCard icon={Lightbulb} title="Recommendations" color="text-amber-400">
          <div className="flex flex-col gap-3">
            {plan.recommendations.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Star className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--text-muted)]">{r}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── Next actions ── */}
      {plan.nextActions && plan.nextActions.length > 0 && (
        <div className="rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/5 p-5">
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-[var(--color-accent)]" />
            Your Next Actions
          </p>
          <ol className="flex flex-col gap-2">
            {plan.nextActions.map((a, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[10px] font-bold text-[var(--color-accent)] w-4 shrink-0 mt-0.5">{i + 1}.</span>
                <span className="text-sm text-[var(--text-primary)]">{a}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ── Actions bar ── */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <Button
          variant="primary"
          size="sm"
          className="gap-1.5"
          onClick={handleCreatePlanner}
          disabled={creating !== null}
        >
          <LayoutTemplate className="h-3.5 w-3.5" />
          {creating === 'planner' ? 'Creating…' : 'Create Planner'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={handleCreateChecklist}
          disabled={creating !== null}
        >
          <CheckSquare className="h-3.5 w-3.5" />
          {creating === 'checklist' ? 'Creating…' : 'Create Checklist'}
        </Button>
        {plan.exportText && (
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={handleExport}>
            <Download className="h-3.5 w-3.5" />
            Export Plan
          </Button>
        )}
        {relatedTemplateSlug && relatedTemplateCategory && (
          <a href={`/templates/${relatedTemplateCategory}/${relatedTemplateSlug}`}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-faint)] hover:text-[var(--color-accent)] transition-colors ml-auto">
            <ExternalLink className="h-3 w-3" />
            View related template
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Main client component ────────────────────────────────────────────────────

export function ToolClient({ toolSlug }: { toolSlug: string }) {
  const tool = getTool(toolSlug)

  const initialValues: Record<string, string | number> = {}
  tool?.inputs.forEach((input) => {
    if (input.defaultValue !== undefined) initialValues[input.id] = input.defaultValue
  })

  const [values, setValues] = useState<Record<string, string | number>>(initialValues)
  const [plan, setPlan] = useState<ToolPlan | null>(() => {
    if (!tool) return null
    try { return tool.generate(initialValues) } catch { return null }
  })

  const handleChange = useCallback((id: string, value: string | number) => {
    setValues((prev) => {
      const newValues = { ...prev, [id]: value }
      try { setPlan(tool!.generate(newValues)) } catch { setPlan(null) }
      return newValues
    })
  }, [tool])

  if (!tool) return null

  return (
    <div className="flex flex-col gap-6">

      {/* ── Input panel ── */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] mb-4">Your Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tool.inputs.map((field) => (
            <div key={field.id} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <FieldInput
                field={field}
                value={values[field.id] ?? field.defaultValue ?? ''}
                onChange={(val) => handleChange(field.id, val)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Generated plan ── */}
      {plan && (
        <PlanOutput
          plan={plan}
          toolTitle={tool.title}
          relatedTemplateSlug={tool.relatedTemplateSlug}
          relatedTemplateCategory={tool.relatedTemplateCategory}
        />
      )}
    </div>
  )
}
