'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check, Minus } from 'lucide-react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, label, id, ...props }, ref) => {
    const checkboxId = id ?? React.useId()
    const innerRef = React.useRef<HTMLInputElement>(null)
    const combinedRef = (node: HTMLInputElement | null) => {
      (innerRef as React.MutableRefObject<HTMLInputElement | null>).current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate ?? false
      }
    }, [indeterminate])

    return (
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={checkboxId}
            ref={combinedRef}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'h-4 w-4 rounded-[4px] border-2 border-[var(--border)] bg-[var(--bg-surface)] transition-all cursor-pointer',
              'peer-checked:bg-[var(--color-accent)] peer-checked:border-[var(--color-accent)]',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)] peer-focus-visible:ring-offset-1',
              'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
              className
            )}
          >
            {props.checked && !indeterminate && (
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            )}
            {indeterminate && (
              <Minus className="h-3 w-3 text-white" strokeWidth={3} />
            )}
          </div>
        </div>
        {label && (
          <label htmlFor={checkboxId} className="text-sm text-[var(--text-primary)] cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
