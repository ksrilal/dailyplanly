import * as React from 'react'
import { cn } from '@/lib/utils'

interface PrintShellProps extends React.HTMLAttributes<HTMLDivElement> {
  paperSize?: 'A4' | 'Letter'
  orientation?: 'portrait' | 'landscape'
}

function PrintShell({ children, className, paperSize = 'A4', orientation = 'portrait', ...props }: PrintShellProps) {
  return (
    <div
      className={cn(
        'planner-print-root bg-white text-black',
        'print:shadow-none print:border-none',
        className
      )}
      data-paper-size={paperSize}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  )
}

export { PrintShell }
