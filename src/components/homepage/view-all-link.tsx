import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function ViewAllLink({ href, label = 'View all' }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--color-accent)] transition-colors duration-150"
    >
      {label}
      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
    </Link>
  )
}
