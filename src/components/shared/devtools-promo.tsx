'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, ExternalLink, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const DISMISSED_KEY = 'dp:devtools-promo-hidden-until'
const HIDE_DURATION_MS = 24 * 60 * 60 * 1000 // 24 hours

export function DevToolsPromo() {
  const [expanded, setExpanded] = useState(false)
  const [dismissed, setDismissed] = useState(true) // start hidden until mount
  const panelRef = useRef<HTMLDivElement>(null)

  // Read dismissed state after mount (avoids SSR mismatch)
  useEffect(() => {
    const hiddenUntil = localStorage.getItem(DISMISSED_KEY)
    if (hiddenUntil && Date.now() < Number(hiddenUntil)) {
      setDismissed(true)  // still within the 24h window
    } else {
      setDismissed(false) // never dismissed or window expired
    }
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!expanded) return
    function handler(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setExpanded(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [expanded])

  function dismiss() {
    setDismissed(true)
    setExpanded(false)
    localStorage.setItem(DISMISSED_KEY, String(Date.now() + HIDE_DURATION_MS))
  }

  if (dismissed) return null

  return (
    <div
      ref={panelRef}
      className="no-print fixed right-0 top-28 z-50 flex flex-col items-end"
      style={{ pointerEvents: 'auto' }}
    >
      {/* ── Collapsed tab ── */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          aria-label="Learn about DevTools Suite"
          className={cn(
            'group flex items-center gap-0 rounded-l-xl border border-r-0 shadow-lg',
            'bg-[#0d1f1a] border-[#1a3d30] hover:bg-[#122b22]',
            'transition-all duration-200 overflow-hidden',
            'cursor-pointer'
          )}
          style={{ writingMode: 'vertical-rl' }}
        >
          {/* Logo strip */}
          <div className="flex items-center justify-center w-8 h-8 shrink-0 m-1.5 rounded-lg overflow-hidden"
            style={{ writingMode: 'horizontal-tb' }}>
            <Image src="/devtools-logo.png" alt="DevTools Suite" width={28} height={28} className="rounded-md" />
          </div>
          {/* Label */}
          <span className="text-[10px] font-bold tracking-widest uppercase py-3 px-0"
            style={{
              color: '#4ade80',
              letterSpacing: '0.12em',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
            }}>
            DevTools Suite
          </span>
          <ChevronRight className="w-3 h-3 mb-2 opacity-50 group-hover:opacity-100 transition-opacity"
            style={{ color: '#4ade80', writingMode: 'horizontal-tb', transform: 'rotate(180deg)' }} />
        </button>
      )}

      {/* ── Expanded panel ── */}
      {expanded && (
        <div className={cn(
          'w-72 rounded-l-2xl border border-r-0 shadow-2xl overflow-hidden',
          'bg-[#0d1f1a] border-[#1a3d30]',
          'animate-in slide-in-from-right-4 duration-200'
        )}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-[#1a3d30]">
            <Image src="/devtools-logo.png" alt="DevTools Suite" width={36} height={36} className="rounded-xl shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white leading-tight">DevTools Suite</p>
              <p className="text-[10px] mt-0.5" style={{ color: '#4ade80' }}>devtoolssuite.dev</p>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white/80"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4">
            <p className="text-xs leading-relaxed" style={{ color: '#a7f3d0' }}>
              A growing suite of developer tools built to make your software life easier — from JSON formatters and regex testers to diff viewers and encoder/decoders.
            </p>
            <p className="text-xs mt-2.5 leading-relaxed" style={{ color: '#6ee7b7', opacity: 0.75 }}>
              All tools run in your browser. No sign-up. No tracking. Free forever — just like DailyPlanly.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {['JSON Tools', 'Regex Tester', 'Diff Viewer', 'Base64', 'URL Encoder', 'Color Picker'].map((t) => (
                <span key={t} className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div className="px-4 pb-4 flex items-center gap-2">
            <a
              href="https://devtoolssuite.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                boxShadow: '0 2px 12px rgba(5,150,105,0.35)',
              }}
            >
              Visit DevTools Suite
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={dismiss}
              className="px-3 py-2 rounded-xl text-[10px] font-medium transition-colors"
              style={{ color: '#6b7280', background: 'rgba(255,255,255,0.05)' }}
            >
              Hide
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
