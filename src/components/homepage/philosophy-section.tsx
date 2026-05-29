import { Lock, UserX, Printer } from 'lucide-react'

const pillars = [
  { icon: Lock, label: 'Privacy First', desc: 'Your data never leaves your device' },
  { icon: UserX, label: 'No Login', desc: 'Open and start in seconds' },
  { icon: Printer, label: 'Print Ready', desc: 'Beautiful output every time' },
]

export function PhilosophySection() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-faint)] mb-6">Our Philosophy</p>
        <blockquote className="text-3xl md:text-4xl font-display font-semibold text-[var(--text-primary)] leading-tight mb-8">
          "Simplicity is the product."
        </blockquote>
        <p className="text-[var(--text-muted)] leading-relaxed">
          DailyPlanly exists to help you organize, plan, and create — calmly.
          No enterprise complexity. No freeform canvas. No social feeds.
          Just beautiful, printable planners and checklists that work offline, save locally,
          and respect your privacy.
        </p>
        <div className="grid grid-cols-3 gap-6 mt-12">
          {pillars.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-center">
                <item.icon className="h-5 w-5 text-[var(--text-secondary)]" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
              <p className="text-xs text-[var(--text-faint)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
