'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

// ─── Shared animation keyframes injected once ─────────────────────────────────
// We use inline style + Tailwind animate classes where possible,
// and CSS custom animations via a style tag for the shimmer effect.

const features = {
  planner: [
    'Block-based visual layout',
    'Drag-and-drop section ordering',
    '10 block types: calendar, habits, goals, and more',
    '5 beautiful themes',
    'Export to PDF or print',
  ],
  checklist: [
    'Simple flat lists and nested hierarchies',
    'Progress tracking with visual bar',
    'Collapsible sections in Advanced mode',
    'Drag-to-reorder items',
    'Export to PDF or print',
  ],
}

// ─── Planner animated mockup ──────────────────────────────────────────────────

function PlannerMockup() {
  return (
    <div className="relative w-full h-full flex flex-col gap-0 overflow-hidden rounded-2xl select-none">
      {/* Top toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 mx-3 h-5 rounded-md bg-white/8 flex items-center px-2 gap-2">
          <div className="h-1.5 w-16 rounded-full bg-white/20" />
          <div className="ml-auto flex gap-1.5">
            {['Minimal','Soft Paper','Dark'].map((t, i) => (
              <div key={t} className={`h-4 w-4 rounded-full border-2 ${i === 1 ? 'border-violet-400 scale-110' : 'border-white/20'}`}
                style={{ background: i === 0 ? '#f9fafb' : i === 1 ? '#faf7f2' : '#1a1a1a' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Three-panel editor */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left — block palette */}
        <div className="w-28 flex-shrink-0 border-r border-white/8 bg-white/3 p-2 flex flex-col gap-1">
          <div className="text-[8px] text-white/30 font-semibold uppercase tracking-widest px-1 mb-1">Blocks</div>
          {[
            { label: 'Calendar', delay: '0ms', w: '60%' },
            { label: 'Habits', delay: '120ms', w: '50%' },
            { label: 'Notes', delay: '240ms', w: '55%' },
            { label: 'Goals', delay: '360ms', w: '45%' },
            { label: 'Routine', delay: '480ms', w: '58%' },
            { label: 'Timeline', delay: '600ms', w: '52%' },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-1.5 px-1.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="w-2.5 h-2.5 rounded-sm bg-white/20 flex-shrink-0" />
              <div className="h-1.5 rounded-full bg-white/20" style={{ width: b.w }} />
            </div>
          ))}
        </div>

        {/* Center — canvas */}
        <div className="flex-1 bg-white/4 p-3 flex flex-col gap-2 overflow-hidden">
          {/* Focus block — animates in */}
          <div className="rounded-lg border border-white/10 bg-white/6 p-2.5 animate-fade-up" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
            <div className="text-[7px] text-white/35 uppercase tracking-wider mb-1.5">Today's Focus</div>
            <div className="flex flex-col gap-1">
              {[{ w: '75%', dot: 'bg-red-400/60' }, { w: '55%', dot: 'bg-amber-400/60' }, { w: '40%', dot: 'bg-violet-400/60' }].map((r, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.dot}`} />
                  <div className="h-1.5 rounded-full bg-white/20" style={{ width: r.w }} />
                </div>
              ))}
            </div>
          </div>

          {/* Schedule block — slides in slightly later */}
          <div className="rounded-lg border border-white/10 bg-white/6 p-2.5 animate-fade-up" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
            <div className="text-[7px] text-white/35 uppercase tracking-wider mb-1.5">Daily Schedule</div>
            <div className="flex flex-col gap-[5px]">
              {['8:00','9:00','10:00','11:00','1:00','2:00'].map((t, i) => (
                <div key={t} className="flex items-center gap-1.5 border-b border-white/6 pb-[4px]">
                  <span className="text-[6px] text-white/20 w-6 tabular-nums flex-shrink-0">{t}</span>
                  {i === 1 && <div className="h-1.5 rounded-full bg-violet-400/40 flex-1 max-w-[60%]" />}
                  {i === 3 && <div className="h-1.5 rounded-full bg-sky-400/35 flex-1 max-w-[45%]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Habit tracker block */}
          <div className="rounded-lg border border-white/10 bg-white/6 p-2.5 animate-fade-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <div className="text-[7px] text-white/35 uppercase tracking-wider mb-1.5">Habits</div>
            <div className="flex flex-col gap-1">
              {[
                { label: 'Exercise', cells: [1,1,1,0,1,1,1] },
                { label: 'Read', cells: [1,1,0,1,1,0,1] },
                { label: 'Meditate', cells: [0,1,1,1,0,1,1] },
              ].map((h) => (
                <div key={h.label} className="flex items-center gap-1">
                  <span className="text-[6px] text-white/25 w-10 flex-shrink-0">{h.label}</span>
                  {h.cells.map((c, ci) => (
                    <div key={ci} className={`flex-1 h-2.5 rounded-[2px] border border-white/10 ${c ? 'bg-violet-400/30' : 'bg-white/5'}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — settings panel */}
        <div className="w-24 flex-shrink-0 border-l border-white/8 bg-white/3 p-2 flex flex-col gap-3">
          <div className="text-[7px] text-white/30 uppercase tracking-widest font-semibold">Settings</div>
          <div className="flex flex-col gap-1.5">
            <div className="text-[6px] text-white/25">Label</div>
            <div className="h-5 rounded-md border border-white/15 bg-white/5" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="text-[6px] text-white/25">Width</div>
            <div className="flex gap-1">
              <div className="flex-1 h-5 rounded-md border border-violet-400/50 bg-violet-400/10" />
              <div className="flex-1 h-5 rounded-md border border-white/10 bg-white/5" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {[80, 60, 70].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-white/10" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Animated cursor dot */}
      <div
        className="absolute pointer-events-none w-3 h-3 rounded-full bg-violet-400/70 shadow-lg shadow-violet-500/50"
        style={{
          animation: 'cursorMove 4s ease-in-out infinite',
          top: '45%',
          left: '40%',
        }}
      />
    </div>
  )
}

// ─── Checklist animated mockup ────────────────────────────────────────────────

function ChecklistMockup() {
  const items = [
    { text: 'Review project brief', done: true, depth: 0 },
    { text: 'Gather requirements', done: true, depth: 0 },
    { text: 'Design wireframes', done: false, depth: 0, active: true },
    { text: 'Homepage layout', done: false, depth: 1 },
    { text: 'Template cards', done: false, depth: 1 },
    { text: 'Mobile responsive', done: false, depth: 1 },
    { text: 'Build components', done: false, depth: 0 },
    { text: 'Write tests', done: false, depth: 0 },
  ]

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden rounded-2xl select-none">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/10 bg-white/5 flex-shrink-0">
        <div className="h-1.5 w-24 rounded-full bg-white/20" />
        <div className="ml-auto flex gap-2">
          {['Simple','Advanced'].map((m, i) => (
            <div key={m} className={`px-2 py-0.5 rounded text-[7px] font-medium ${i === 1 ? 'bg-violet-500/30 text-violet-300' : 'text-white/30'}`}>
              {m}
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[7px] text-white/30">2 / 8 complete</span>
          <span className="text-[7px] text-white/40 font-medium">25%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400"
            style={{ width: '25%', animation: 'progressGrow 2s ease-out forwards' }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-2 flex-shrink-0">
        <div className="h-6 rounded-lg border border-white/10 bg-white/5 flex items-center px-2 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full border border-white/20 flex-shrink-0" />
          <div className="h-1.5 w-20 rounded-full bg-white/15" />
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 px-3 pb-3 flex flex-col gap-[3px] overflow-hidden">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors ${item.active ? 'bg-violet-500/10 border border-violet-500/20' : 'hover:bg-white/4'}`}
            style={{
              paddingLeft: `${8 + item.depth * 20}px`,
              animation: `fadeSlideIn 0.4s ease both`,
              animationDelay: `${i * 60}ms`,
            }}
          >
            {/* Checkbox */}
            <div className={`w-3.5 h-3.5 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all ${item.done ? 'bg-violet-500/60 border-violet-400/60' : item.active ? 'border-violet-400/40' : 'border-white/20'}`}>
              {item.done && (
                <svg viewBox="0 0 10 10" className="w-2 h-2">
                  <polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            {/* Text line */}
            <div
              className={`h-1.5 rounded-full flex-1 max-w-[80%] transition-opacity ${item.done ? 'bg-white/10 opacity-40' : item.active ? 'bg-violet-300/50' : 'bg-white/20'}`}
              style={{ width: `${55 + ((i * 13) % 30)}%` }}
            />
            {/* Active indicator */}
            {item.active && (
              <div className="w-1 h-1 rounded-full bg-violet-400 flex-shrink-0 animate-pulse" />
            )}
          </div>
        ))}

        {/* Quick add row */}
        <div className="flex items-center gap-2 px-2 py-1.5 mt-1 border border-dashed border-white/10 rounded-lg">
          <div className="w-3.5 h-3.5 rounded-sm border border-white/15 flex-shrink-0 flex items-center justify-center">
            <div className="w-1.5 h-px bg-white/20" />
          </div>
          <div className="h-1 w-16 rounded-full bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

// ─── Wrapper with glow background ─────────────────────────────────────────────

function MockupWrapper({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
      {/* Background */}
      <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, #1a1625 0%, #0f0d1a 100%)' }} />
      {/* Accent glow */}
      <div className="absolute inset-0 rounded-2xl opacity-20" style={{ background: `radial-gradient(ellipse at 60% 30%, ${accent} 0%, transparent 65%)` }} />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {/* Content */}
      <div className="relative h-full p-3">
        {children}
      </div>
    </div>
  )
}

// ─── Global keyframes (injected once) ─────────────────────────────────────────

const KEYFRAMES = `
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cursorMove {
  0%   { transform: translate(0px, 0px); }
  25%  { transform: translate(40px, -20px); }
  50%  { transform: translate(20px, 30px); }
  75%  { transform: translate(-20px, 10px); }
  100% { transform: translate(0px, 0px); }
}
@keyframes progressGrow {
  from { width: 0%; }
  to   { width: 25%; }
}
@keyframes animate-fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: animate-fade-up 0.5s ease both;
}
`

// ─── Main export ──────────────────────────────────────────────────────────────

export function ProductSections() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div className="py-16 flex flex-col gap-24">

        {/* Planner */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 block">
              Planner Systems
            </span>
            <h2 className="text-3xl font-display font-semibold text-[var(--text-primary)] mb-4">
              Build Your Perfect Planner
            </h2>
            <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
              Combine blocks to create exactly the planner you need. Add calendars, habit trackers,
              goal sections, and more. Choose a theme, then export or print.
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {features.planner.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--color-accent)]">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/planner/new">
              <Button variant="primary">Create a Planner</Button>
            </Link>
          </div>

          <MockupWrapper accent="#6366f1">
            <PlannerMockup />
          </MockupWrapper>
        </section>

        {/* Checklist */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-last">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3 block">
              Checklist Systems
            </span>
            <h2 className="text-3xl font-display font-semibold text-[var(--text-primary)] mb-4">
              Organize Tasks, Track Progress
            </h2>
            <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
              From a quick grocery list to a complex project plan. Simple and Advanced modes
              let you work at the right level of structure.
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {features.checklist.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--color-accent)]">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/checklist/new">
              <Button variant="primary">Create a Checklist</Button>
            </Link>
          </div>

          <MockupWrapper accent="#8b5cf6">
            <ChecklistMockup />
          </MockupWrapper>
        </section>

      </div>
    </>
  )
}
