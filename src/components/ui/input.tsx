import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  maxLength?: number
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, maxLength, id, value, ...props }, ref) => {
    const inputId = id ?? React.useId()
    const charCount = typeof value === 'string' ? value.length : undefined

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-[var(--text-secondary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            maxLength={maxLength}
            value={value}
            className={cn(
              'w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-[var(--color-error)] focus:ring-[var(--color-error)]',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {maxLength && charCount !== undefined && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-faint)]">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-[var(--text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
