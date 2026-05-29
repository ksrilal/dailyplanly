'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/templates', label: 'Templates' },
  { href: '/tools', label: 'Tools' },
  { href: '/workspace', label: 'My Workspaces' },
]

function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => setMounted(true), [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg-page)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center font-display text-xl font-semibold text-[var(--text-primary)] hover:opacity-80 transition-opacity"
        >
          <span className="text-[var(--color-accent)]">Daily</span>Planly
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative px-3 py-1.5 text-sm font-medium rounded-[var(--radius-md)] transition-all duration-150',
                  active
                    ? 'text-[var(--text-primary)] bg-[var(--bg-subtle)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                )}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/planner/new">
            <Button variant="outline" size="sm" className="gap-1.5 border-[var(--border)] hover:border-violet-400/50 hover:text-violet-400 transition-colors">
              <Plus className="h-3.5 w-3.5" />
              New Planner
            </Button>
          </Link>
          <Link href="/checklist/new">
            <Button variant="primary" size="sm" className="gap-1.5 shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 transition-shadow">
              <Plus className="h-3.5 w-3.5" />
              New Checklist
            </Button>
          </Link>
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="text-[var(--text-faint)] hover:text-[var(--text-primary)]"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-page)] px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    active
                      ? 'text-[var(--text-primary)] bg-[var(--bg-subtle)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                  )}
                >
                  {label}
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />}
                </Link>
              )
            })}
            <div className="flex flex-col gap-2 pt-3 border-t border-[var(--border)] mt-2">
              <Link href="/planner/new" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="w-full gap-1.5">
                  <Plus className="h-3.5 w-3.5" /> New Planner
                </Button>
              </Link>
              <Link href="/checklist/new" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="sm" className="w-full gap-1.5">
                  <Plus className="h-3.5 w-3.5" /> New Checklist
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export { Header }
