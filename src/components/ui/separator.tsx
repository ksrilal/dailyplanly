import * as React from 'react'
import { cn } from '@/lib/utils'

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
}

function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'border-[var(--border)]',
        orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
        className
      )}
      {...props}
    />
  )
}

export { Separator }
