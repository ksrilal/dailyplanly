import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:  'bg-[var(--color-accent-soft)] text-[var(--color-accent)]',
        secondary:'bg-[var(--bg-subtle)] text-[var(--text-secondary)]',
        success:  'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400',
        warning:  'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
        error:    'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400',
        outline:  'border border-[var(--border)] text-[var(--text-secondary)]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
