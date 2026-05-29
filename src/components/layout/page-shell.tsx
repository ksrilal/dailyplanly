import * as React from 'react'
import { cn } from '@/lib/utils'

interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  wide?: boolean
  padded?: boolean
}

function PageShell({ children, className, wide, padded = true, ...props }: PageShellProps) {
  return (
    <main
      className={cn(
        'mx-auto w-full',
        wide ? 'max-w-7xl' : 'max-w-6xl',
        padded && 'px-4 sm:px-6 lg:px-8 py-8',
        className
      )}
      {...props}
    >
      {children}
    </main>
  )
}

export { PageShell }
