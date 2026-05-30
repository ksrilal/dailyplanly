'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FAQItem {
  q: string
  a: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  items: FAQItem[]
  /** JSON-LD structured data for SEO */
  schemaId?: string
}

export function FAQSection({
  title = 'Frequently Asked Questions',
  subtitle,
  items,
  schemaId,
}: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <section className="py-16 border-t border-[var(--border)]" id={schemaId}>
      {/* JSON-LD for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-col divide-y divide-[var(--border)]">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                >
                  <span className={cn(
                    'text-sm font-medium transition-colors',
                    isOpen ? 'text-[var(--color-accent)]' : 'text-[var(--text-primary)] group-hover:text-[var(--color-accent)]'
                  )}>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 flex-shrink-0 transition-transform duration-200 text-[var(--text-faint)]',
                      isOpen && 'rotate-180 text-[var(--color-accent)]'
                    )}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <p className="pb-5 text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
