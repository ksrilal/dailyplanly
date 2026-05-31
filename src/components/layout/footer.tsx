import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { SITE_NAME } from '@/lib/constants'

const templateLinksCol1 = [
  { href: '/templates/productivity', label: 'Productivity' },
  { href: '/templates/health-wellness', label: 'Health & Wellness' },
  { href: '/templates/finance', label: 'Finance' },
  { href: '/templates/education', label: 'Education' },
]

const templateLinksCol2 = [
  { href: '/templates/lifestyle', label: 'Lifestyle' },
  { href: '/templates/family-home', label: 'Family & Home' },
  { href: '/templates/work-office', label: 'Work & Office' },
  { href: '/templates/travel-events', label: 'Travel & Events' },
]

const productLinks = [
  { href: '/templates', label: 'Template Gallery' },
  { href: '/tools', label: 'Productivity Tools' },
  { href: '/planner/new', label: 'New Planner' },
  { href: '/checklist/new', label: 'New Checklist' },
  { href: '/workspace', label: 'My Workspaces' },
]

const resourceLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact' },
]

function NavCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] mb-3">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer className="no-print border-t border-[var(--border)] bg-[var(--bg-page)] mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Main grid: brand | templates×2 | product | resources */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-6 gap-y-10">

          {/* ── Brand col (spans 2) ── */}
          <div className="col-span-2">
            <Link
              href="/"
              className="inline-flex items-center font-display text-lg font-semibold text-[var(--text-primary)] mb-3 hover:opacity-80 transition-opacity"
            >
              <span className="text-[var(--color-accent)]">Daily</span>Planly
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Calm, printable-first productivity. No login. No cloud. Beautiful planners and checklists.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['No Login', 'Privacy First', 'Works Offline', 'Free'].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-faint)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* DevTools Suite card */}
            <a
              href="https://devtoolssuite.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/5"
              style={{ borderColor: 'rgba(74,222,128,0.18)', background: 'rgba(13,31,26,0.55)' }}
            >
              <Image
                src="/devtools-logo.png"
                alt="DevTools Suite"
                width={30}
                height={30}
                className="rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-semibold flex items-center gap-1 leading-tight"
                  style={{ color: '#4ade80' }}
                >
                  DevTools Suite
                  <ExternalLink className="h-2.5 w-2.5 opacity-60 shrink-0" />
                </p>
                <p className="text-[10px] mt-0.5 text-[var(--text-faint)] leading-snug">
                  Browser tools for developers. Free forever.
                </p>
              </div>
            </a>
          </div>

          {/* ── Templates split into 2 slim cols ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)] mb-3">
              Templates
            </p>
            <ul className="flex flex-col gap-2">
              {templateLinksCol1.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* Empty title to align with col1 header */}
            <p className="text-xs font-semibold uppercase tracking-wider text-transparent mb-3 select-none">
              &nbsp;
            </p>
            <ul className="flex flex-col gap-2">
              {templateLinksCol2.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Product ── */}
          <NavCol title="Product" links={productLinks} />

          {/* ── Resources ── */}
          <NavCol title="Resources" links={resourceLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-faint)]">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE_NAME}. Built for calm productivity.
          </p>
          <div className="flex items-center gap-5">
            {[
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
              { href: '/contact', label: 'Contact' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                {l.label}
              </Link>
            ))}
            <a
              href="https://devtoolssuite.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium inline-flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: 'rgba(74,222,128,0.65)' }}
            >
              DevTools Suite
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
