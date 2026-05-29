import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'

const templateLinks = [
  { href: '/templates/productivity', label: 'Productivity' },
  { href: '/templates/health-wellness', label: 'Health & Wellness' },
  { href: '/templates/finance', label: 'Finance' },
  { href: '/templates/education', label: 'Education' },
  { href: '/templates/lifestyle', label: 'Lifestyle' },
  { href: '/templates/work-office', label: 'Work & Office' },
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

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          {/* Brand — spans 2 cols on md */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center font-display text-lg font-semibold text-[var(--text-primary)] mb-3 hover:opacity-80 transition-opacity">
              <span className="text-[var(--color-accent)]">Daily</span>Planly
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              Calm, printable-first productivity. No login. No cloud. Just beautiful planners and checklists.
            </p>
            {/* Status badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['No Login', 'Privacy First', 'Works Offline', 'Free'].map((tag) => (
                <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-faint)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <FooterCol title="Templates" links={templateLinks} />
          <FooterCol title="Product" links={productLinks} />
          <FooterCol title="Resources" links={resourceLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-faint)]">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {SITE_NAME}. Built for calm productivity.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">Terms</Link>
            <Link href="/contact" className="text-xs text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
