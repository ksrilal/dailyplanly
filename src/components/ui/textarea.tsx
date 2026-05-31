import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, autoResize = true, id, onChange, ...props }, ref) => {
    const textareaId = id ?? React.useId()
    const innerRef = React.useRef<HTMLTextAreaElement>(null)
    const combinedRef = (node: HTMLTextAreaElement | null) => {
      (innerRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && innerRef.current) {
        innerRef.current.style.height = 'auto'
        innerRef.current.style.height = `${innerRef.current.scrollHeight}px`
      }
      onChange?.(e)
    }

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-medium text-[var(--text-secondary)]">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={combinedRef}
          onChange={handleChange}
          className={cn(
            'w-full min-h-[80px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] resize-none transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-[var(--color-error)]',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--color-error)]" role="alert">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
