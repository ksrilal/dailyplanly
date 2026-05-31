'use client'

// Pure CSS animated template previews — no images required.
// Each template slug maps to a unique illustrated layout.

import { cn } from '@/lib/utils'

// ─── Shared primitives ────────────────────────────────────────────────────────

function Line({ w = 'full', className }: { w?: 'full' | '3/4' | '1/2' | '1/3' | '2/3'; className?: string }) {
  const widths = { full: 'w-full', '3/4': 'w-3/4', '1/2': 'w-1/2', '1/3': 'w-1/3', '2/3': 'w-2/3' }
  return <div className={cn('h-[6px] rounded-full bg-current opacity-20', widths[w], className)} />
}

function Block({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn('rounded-sm border border-current/10 bg-current/5 p-1.5', className)}>
      {children}
    </div>
  )
}

function Checkbox({ checked, className }: { checked?: boolean; className?: string }) {
  return (
    <div className={cn('w-3 h-3 rounded-sm border border-current/30 flex-shrink-0 flex items-center justify-center', checked && 'bg-current/20', className)}>
      {checked && (
        <svg viewBox="0 0 10 10" className="w-2 h-2 text-current opacity-60">
          <polyline points="1.5,5 4,7.5 8.5,2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  )
}

function Dot({ className }: { className?: string }) {
  return <div className={cn('w-2 h-2 rounded-full bg-current opacity-30 flex-shrink-0', className)} />
}

// ─── Daily Planner Preview ────────────────────────────────────────────────────

function DailyPlannerPreview() {
  return (
    <div className="flex flex-col gap-2 p-3 h-full text-[var(--preview-ink)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <Line w="1/3" />
        <div className="flex gap-1">
          {['M','T','W','T','F'].map((d, i) => (
            <div key={i} className="w-4 h-4 rounded-sm bg-current/10 flex items-center justify-center">
              <span className="text-[5px] opacity-40 font-medium">{d}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Focus section */}
      <Block>
        <div className="flex flex-col gap-1">
          <Line w="1/2" />
          {[true, false, false].map((v, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Dot />
              <Line w={i === 0 ? '2/3' : i === 1 ? '1/2' : '1/3'} />
            </div>
          ))}
        </div>
      </Block>
      {/* Time slots */}
      <Block className="flex-1">
        <div className="flex flex-col gap-[5px]">
          {['8:00','9:00','10:00','11:00','12:00','1:00','2:00'].map((t, i) => (
            <div key={t} className="flex items-center gap-1.5 border-b border-current/8 pb-[3px]">
              <span className="text-[5px] opacity-25 w-6 tabular-nums">{t}</span>
              {i === 1 && <Line w="2/3" />}
              {i === 3 && <Line w="1/2" />}
            </div>
          ))}
        </div>
      </Block>
      {/* Notes */}
      <Block>
        <div className="flex flex-col gap-[5px]">
          {[null, null, null].map((_, i) => (
            <div key={i} className="border-b border-current/10 pb-[4px]" />
          ))}
        </div>
      </Block>
    </div>
  )
}

// ─── Weekly Planner Preview ───────────────────────────────────────────────────

function WeeklyPlannerPreview() {
  return (
    <div className="flex flex-col gap-2 p-3 h-full text-[var(--preview-ink)]">
      {/* Goal */}
      <Block>
        <div className="flex flex-col gap-1">
          <Line w="2/3" />
          {[true, false, false].map((done, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Checkbox checked={done} />
              <Line w={done ? '2/3' : i === 1 ? '1/2' : '1/3'} />
            </div>
          ))}
        </div>
      </Block>
      {/* Habit tracker */}
      <Block>
        <div className="flex flex-col gap-1">
          <Line w="1/2" />
          {['Exercise','Read','Meditate'].map((h, ri) => (
            <div key={h} className="flex items-center gap-1">
              <span className="text-[5px] opacity-30 w-10">{h}</span>
              {Array.from({ length: 7 }, (_, ci) => (
                <div key={ci} className={cn('w-3 h-3 rounded-sm border border-current/15', ri === 0 && ci < 4 ? 'bg-current/20' : '')} />
              ))}
            </div>
          ))}
        </div>
      </Block>
      {/* Weekly table */}
      <Block className="flex-1">
        <div className="grid grid-cols-7 gap-px">
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-px">
              <span className="text-[5px] opacity-25">{d}</span>
              <div className="w-full h-10 rounded-sm border border-current/10" />
            </div>
          ))}
        </div>
      </Block>
    </div>
  )
}

// ─── Habit Tracker Preview ────────────────────────────────────────────────────

function HabitTrackerPreview() {
  const habits = ['Exercise', 'Water', 'Read', 'Sleep', 'Meditate', 'Journal']
  const days = 14
  const checked = [
    [1,1,1,1,0,1,1,1,1,1,0,1,1,0],
    [1,1,0,1,1,1,0,0,1,1,1,1,0,1],
    [0,1,1,1,1,0,1,1,0,1,1,0,1,1],
    [1,0,1,0,1,1,1,0,1,0,1,1,0,1],
    [1,1,1,0,0,1,1,1,1,0,1,0,1,0],
    [0,0,1,1,1,1,0,1,0,1,1,1,0,1],
  ]
  return (
    <div className="flex flex-col gap-2 p-3 h-full text-[var(--preview-ink)]">
      <Line w="1/2" />
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-px mb-1 ml-10">
          {Array.from({ length: days }, (_, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[4px] opacity-20">{i+1}</span>
            </div>
          ))}
        </div>
        {habits.map((h, ri) => (
          <div key={h} className="flex items-center gap-px mb-[3px]">
            <span className="text-[5px] opacity-30 w-10 flex-shrink-0 truncate">{h}</span>
            {checked[ri].map((c, ci) => (
              <div key={ci} className={cn(
                'flex-1 h-3 rounded-[1px] border border-current/10',
                c ? 'bg-current/25' : 'bg-current/5'
              )} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        <Block className="flex-1"><Line w="full" /><Line w="3/4" /></Block>
      </div>
    </div>
  )
}

// ─── Simple Checklist Preview ─────────────────────────────────────────────────

function SimpleChecklistPreview() {
  const items = [
    { done: true, w: '3/4' as const },
    { done: true, w: '1/2' as const },
    { done: false, w: '2/3' as const },
    { done: false, w: '3/4' as const },
    { done: false, w: '1/2' as const },
    { done: true, w: '1/3' as const },
    { done: false, w: '2/3' as const },
    { done: false, w: '1/2' as const },
  ]
  return (
    <div className="flex flex-col gap-2 p-3 h-full text-[var(--preview-ink)]">
      <div className="flex items-center justify-between mb-1">
        <Line w="1/2" />
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-14 rounded-full bg-current/10 overflow-hidden">
            <div className="h-full w-[37.5%] rounded-full bg-current/30" />
          </div>
          <span className="text-[5px] opacity-30">3/8</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 border-b border-current/8 pb-2">
            <Checkbox checked={item.done} />
            <Line w={item.w} className={item.done ? 'opacity-10 line-through' : undefined} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Project Checklist Preview ────────────────────────────────────────────────

function ProjectChecklistPreview() {
  const sections = [
    { label: 'Planning', done: 2, total: 3, items: [true, true, false] },
    { label: 'Execution', done: 1, total: 3, items: [true, false, false] },
    { label: 'Review', done: 0, total: 2, items: [false, false] },
  ]
  return (
    <div className="flex flex-col gap-2 p-3 h-full text-[var(--preview-ink)]">
      <div className="flex items-center justify-between mb-1">
        <Line w="1/2" />
        <div className="h-1.5 w-16 rounded-full bg-current/10 overflow-hidden">
          <div className="h-full w-[37.5%] rounded-full bg-current/30" />
        </div>
      </div>
      {sections.map((section) => (
        <Block key={section.label}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[6px] opacity-40 font-medium">{section.label}</span>
            <span className="text-[5px] opacity-25">{section.done}/{section.total}</span>
          </div>
          {section.items.map((done, i) => (
            <div key={i} className="flex items-center gap-1.5 ml-2 mb-1">
              <Checkbox checked={done} />
              <Line w={done ? '2/3' : i % 2 === 0 ? '1/2' : '3/4'} className={done ? 'opacity-10' : undefined} />
            </div>
          ))}
        </Block>
      ))}
    </div>
  )
}

// ─── Goal Planner Preview ─────────────────────────────────────────────────────

function GoalPlannerPreview() {
  const milestones = [false, false, false, false]
  return (
    <div className="flex flex-col gap-2 p-3 h-full text-[var(--preview-ink)]">
      <Line w="1/2" />
      {/* Goal block */}
      <Block>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full border-2 border-current/40 flex-shrink-0" />
            <Line w="3/4" />
          </div>
          <div className="text-[6px] opacity-30 font-medium ml-1">MILESTONES</div>
          {[false, false, false, false].map((done, i) => (
            <div key={i} className="flex items-center gap-1.5 ml-2">
              <Checkbox checked={done} />
              <Line w={i === 0 ? '2/3' : i === 1 ? '1/2' : i === 2 ? '3/4' : '1/2'} />
            </div>
          ))}
        </div>
      </Block>
      {/* Focus block */}
      <Block>
        <div className="flex flex-col gap-1.5">
          <div className="text-[6px] opacity-30 font-medium">THIS WEEK</div>
          {[{ p: 'bg-red-400/40', w: '2/3' as const }, { p: 'bg-amber-400/40', w: '1/2' as const }, { p: 'bg-current/20', w: '1/3' as const }].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.p}`} />
              <Line w={item.w} />
            </div>
          ))}
        </div>
      </Block>
      {/* Notes */}
      <Block className="flex-1">
        <div className="flex flex-col gap-[5px]">
          {[null, null, null, null].map((_, i) => (
            <div key={i} className="border-b border-current/10 pb-[4px]" />
          ))}
        </div>
      </Block>
    </div>
  )
}

// ─── Wellness Checklist Preview ───────────────────────────────────────────────

function WellnessChecklistPreview() {
  const items = [
    { done: false, w: '3/4' as const, label: 'Drink water' },
    { done: false, w: '2/3' as const, label: 'Morning stretch' },
    { done: false, w: '1/2' as const, label: 'Healthy breakfast' },
    { done: false, w: '3/4' as const, label: '30 min movement' },
    { done: false, w: '2/3' as const, label: '8 glasses water' },
    { done: false, w: '1/2' as const, label: 'No phone 1hr bed' },
    { done: false, w: '2/3' as const, label: 'Gratitude journal' },
    { done: false, w: '1/2' as const, label: 'Sleep by 10:30' },
  ]
  return (
    <div className="flex flex-col gap-2 p-3 h-full text-[var(--preview-ink)]">
      <div className="flex items-center justify-between mb-1">
        <Line w="1/2" />
        <div className="h-1.5 w-14 rounded-full bg-current/10 overflow-hidden">
          <div className="h-full w-0 rounded-full bg-current/30" />
        </div>
      </div>
      <div className="flex flex-col gap-[7px] flex-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 border-b border-current/8 pb-[5px]">
            <div className="w-3 h-3 rounded-full border border-current/25 flex-shrink-0" />
            <Line w={item.w} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Study Planner Preview ────────────────────────────────────────────────────

function StudyPlannerPreview() {
  return (
    <div className="flex flex-col gap-2 p-3 h-full text-[var(--preview-ink)]">
      <Line w="1/3" />
      {/* Subject schedule table */}
      <Block>
        <div className="flex flex-col gap-px">
          <div className="grid grid-cols-6 gap-px mb-1">
            {['Subject','M','T','W','T','F'].map((h, i) => (
              <div key={i} className="text-[4px] font-semibold opacity-30 text-center">{h}</div>
            ))}
          </div>
          {['Math','Science','History'].map((sub, ri) => (
            <div key={sub} className="grid grid-cols-6 gap-px">
              <div className="text-[5px] opacity-25">{sub}</div>
              {Array.from({ length: 5 }, (_, ci) => (
                <div key={ci} className={`h-3 rounded-[1px] ${ri === 0 && (ci === 0 || ci === 2 || ci === 4) ? 'bg-current/20' : ri === 1 && (ci === 1 || ci === 3) ? 'bg-current/15' : ri === 2 && ci === 2 ? 'bg-current/20' : 'bg-current/5'} border border-current/8`} />
              ))}
            </div>
          ))}
        </div>
      </Block>
      {/* Focus block */}
      <Block>
        <div className="flex flex-col gap-1">
          <div className="text-[6px] opacity-30 font-medium">TODAY'S GOALS</div>
          {[{ p: 'bg-red-400/40', w: '2/3' as const }, { p: 'bg-amber-400/35', w: '1/2' as const }, { p: 'bg-current/20', w: '1/3' as const }].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.p}`} />
              <Line w={item.w} />
            </div>
          ))}
        </div>
      </Block>
      {/* Sessions */}
      <Block className="flex-1">
        <div className="flex flex-col gap-[5px]">
          {['9:00','11:00','2:00','4:00'].map((t) => (
            <div key={t} className="flex items-center gap-1.5 border-b border-current/8 pb-[3px]">
              <span className="text-[5px] opacity-20 w-7 tabular-nums flex-shrink-0">{t}</span>
              <Line w="1/2" />
            </div>
          ))}
        </div>
      </Block>
    </div>
  )
}

// ─── Generic fallback preview ─────────────────────────────────────────────────

function GenericPlannerPreview({ type }: { type: 'planner' | 'checklist' }) {
  if (type === 'checklist') return <SimpleChecklistPreview />
  return <DailyPlannerPreview />
}

// ─── Preview map ──────────────────────────────────────────────────────────────

const PREVIEW_MAP: Record<string, React.ComponentType> = {
  'daily-planner-minimal': DailyPlannerPreview,
  'weekly-planner-soft-paper': WeeklyPlannerPreview,
  'habit-tracker-monthly': HabitTrackerPreview,
  'simple-checklist': SimpleChecklistPreview,
  'project-checklist': ProjectChecklistPreview,
  'goal-planner': GoalPlannerPreview,
  'wellness-checklist': WellnessChecklistPreview,
  'study-planner': StudyPlannerPreview,
}

// ─── Theme palettes per category ──────────────────────────────────────────────

const CATEGORY_PALETTES: Record<string, { bg: string; ink: string; accent: string }> = {
  'productivity': { bg: '#f5f4ff', ink: '#1e1b4b', accent: '#6366f1' },
  'health-wellness': { bg: '#f0fdf4', ink: '#14532d', accent: '#22c55e' },
  'finance': { bg: '#fefce8', ink: '#422006', accent: '#f59e0b' },
  'education': { bg: '#f0f9ff', ink: '#0c4a6e', accent: '#0ea5e9' },
  'lifestyle': { bg: '#fff7ed', ink: '#431407', accent: '#f97316' },
  'family-home': { bg: '#fdf4ff', ink: '#3b0764', accent: '#a855f7' },
  'work-office': { bg: '#f8fafc', ink: '#0f172a', accent: '#475569' },
  'travel-events': { bg: '#ecfdf5', ink: '#022c22', accent: '#10b981' },
}

// ─── Public component ─────────────────────────────────────────────────────────

interface TemplatePreviewProps {
  templateId: string
  templateType: 'planner' | 'checklist'
  category: string
  className?: string
}

export function TemplatePreview({ templateId, templateType, category, className }: TemplatePreviewProps) {
  const PreviewComponent = PREVIEW_MAP[templateId]
  const palette = CATEGORY_PALETTES[category] ?? { bg: '#f9fafb', ink: '#111827', accent: '#6366f1' }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        backgroundColor: palette.bg,
        '--preview-ink': palette.ink,
        '--preview-accent': palette.accent,
      } as React.CSSProperties}
    >
      {/* Paper texture lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, currentColor 19px, currentColor 20px)',
          color: palette.ink,
        }}
      />
      {/* Content */}
      <div className="relative h-full">
        {PreviewComponent
          ? <PreviewComponent />
          : <GenericPlannerPreview type={templateType} />
        }
      </div>
      {/* Subtle vignette at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${palette.bg}80)` }}
      />
    </div>
  )
}
