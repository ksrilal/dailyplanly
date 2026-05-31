'use client'

import { useState, useEffect } from 'react'
import { Quote } from 'lucide-react'
import type { ToolQuote } from '@/features/tools/quotes'
import { cn } from '@/lib/utils'

interface QuotesPanelProps {
  quotes: ToolQuote[]
  categoryColor: string
  categoryBg: string
}

export function QuotesPanel({ quotes, categoryColor, categoryBg }: QuotesPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fading, setFading] = useState(false)

  // Auto-cycle every 8 seconds
  useEffect(() => {
    if (quotes.length <= 1) return
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % quotes.length)
        setFading(false)
      }, 300)
    }, 8000)
    return () => clearInterval(timer)
  }, [quotes.length])

  function goTo(i: number) {
    if (i === activeIndex) return
    setFading(true)
    setTimeout(() => {
      setActiveIndex(i)
      setFading(false)
    }, 250)
  }

  const q = quotes[activeIndex]

  return (
    <div className="flex flex-col gap-4">
      {/* Main quote card */}
      <div className={cn(
        'relative rounded-2xl p-6 overflow-hidden',
        'border border-[var(--border)]',
        'bg-[var(--bg-surface)]'
      )}>
        {/* Decorative accent blob */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-[0.07] blur-2xl pointer-events-none"
          style={{ background: `currentColor` }}
        />

        {/* Quote icon */}
        <div className={cn(
          'inline-flex items-center justify-center w-8 h-8 rounded-lg mb-4',
          categoryBg
        )}>
          <Quote className={cn('h-4 w-4', categoryColor)} strokeWidth={2} />
        </div>

        {/* Quote text */}
        <blockquote
          className={cn(
            'text-base font-medium leading-relaxed text-[var(--text-primary)] mb-4 transition-opacity duration-300',
            fading ? 'opacity-0' : 'opacity-100'
          )}
          style={{ fontStyle: 'italic' }}
        >
          &ldquo;{q.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className={cn(
          'flex flex-col gap-0.5 transition-opacity duration-300',
          fading ? 'opacity-0' : 'opacity-100'
        )}>
          <p className={cn('text-sm font-semibold', categoryColor)}>
            — {q.author}
          </p>
          {q.context && (
            <p className="text-xs text-[var(--text-faint)]">{q.context}</p>
          )}
        </div>

        {/* Subtle decorative line */}
        <div className={cn(
          'absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-30',
          categoryBg.replace('bg-', 'bg-').replace('/10', '')
        )} />
      </div>

      {/* Dot navigation */}
      {quotes.length > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Quote ${i + 1}`}
              className={cn(
                'rounded-full transition-all duration-300',
                i === activeIndex
                  ? cn('w-5 h-1.5', categoryColor.replace('text-', 'bg-'))
                  : 'w-1.5 h-1.5 bg-[var(--border)] hover:bg-[var(--text-faint)]'
              )}
            />
          ))}
        </div>
      )}

      {/* Inspiration label */}
      <p className="text-center text-[10px] text-[var(--text-faint)] uppercase tracking-widest">
        Wisdom & Inspiration
      </p>
    </div>
  )
}
