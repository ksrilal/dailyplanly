'use client'

// This component is ONLY visible during @media print.
// It renders a clean, styled version of the checklist — no UI chrome.

import { useChecklistEditor } from '@/features/checklist/editor-state'
import { computeProgress } from '@/features/checklist/tree-ops'
import type { ChecklistItem, ChecklistItemStatus } from '@/features/storage/types'

function PrintCheckbox({ status }: { status: ChecklistItemStatus }) {
  return (
    <span
      className="print-checkbox"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 14,
        height: 14,
        borderRadius: 3,
        border: status === 'unchecked' ? '1.5px solid #d1d5db' : 'none',
        backgroundColor:
          status === 'checked' ? '#16a34a' :
          status === 'invalid' ? '#fee2e2' : 'transparent',
        flexShrink: 0,
        marginRight: 8,
        marginTop: 2,
        position: 'relative',
      }}
    >
      {status === 'checked' && (
        <svg viewBox="0 0 10 10" style={{ width: 9, height: 9 }}>
          <polyline points="1.5,5 4,7.5 8.5,2" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {status === 'invalid' && (
        <svg viewBox="0 0 10 10" style={{ width: 9, height: 9 }}>
          <line x1="2" y1="2" x2="8" y2="8" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="8" y1="2" x2="2" y2="8" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </span>
  )
}

function PrintItem({ item, items, depth = 0 }: { item: ChecklistItem; items: ChecklistItem[]; depth?: number }) {
  const children = items.filter((i) => i.parentId === item.id).sort((a, b) => a.order - b.order)
  const status: ChecklistItemStatus = item.status ?? (item.checked ? 'checked' : 'unchecked')
  const isParent = children.length > 0

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: depth * 20,
        paddingTop: 6,
        paddingBottom: 6,
        borderBottom: '0.5px solid #f3f4f6',
        pageBreakInside: 'avoid',
      }}>
        <PrintCheckbox status={status} />
        <span style={{
          fontSize: isParent ? 11 : 10,
          fontWeight: isParent ? 600 : 400,
          color: status === 'checked' ? '#9ca3af' : status === 'invalid' ? '#ef4444' : '#111827',
          textDecoration: status !== 'unchecked' ? 'line-through' : 'none',
          flex: 1,
          lineHeight: 1.5,
        }}>
          {item.text || '—'}
        </span>
      </div>
      {children.map((child) => (
        <PrintItem key={child.id} item={child} items={items} depth={depth + 1} />
      ))}
    </>
  )
}

export function ChecklistPrintView() {
  const checklist = useChecklistEditor((s) => s.checklist)
  if (!checklist) return null

  const progress = computeProgress(checklist.items)
  const pct = progress.percentage
  const roots = checklist.items.filter((i) => i.parentId === null).sort((a, b) => a.order - b.order)
  const now = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="checklist-print-only" style={{
      display: 'none', // shown only via @media print CSS
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      color: '#111827',
      padding: '18mm 16mm',
      backgroundColor: '#ffffff',
      maxWidth: '210mm',
      margin: '0 auto',
    }}>
      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: -0.5, color: '#111827' }}>
          {checklist.title}
        </h1>
        <p style={{ fontSize: 9, color: '#6b7280', margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: 0.8 }}>
          {checklist.mode} checklist · {now}
        </p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '0 0 14px' }} />

      {/* Progress */}
      {progress.total > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ fontSize: 9, color: '#6b7280', width: 80 }}>
            {progress.completed}/{progress.total} done
          </span>
          <div style={{ flex: 1, height: 6, backgroundColor: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, backgroundColor: '#16a34a', borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#16a34a', width: 32, textAlign: 'right' }}>
            {pct}%
          </span>
        </div>
      )}

      {/* Items */}
      <div style={{ position: 'relative' }}>
        {roots.map((item) => (
          <PrintItem key={item.id} item={item} items={checklist.items} depth={0} />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 24,
        paddingTop: 8,
        borderTop: '0.5px solid #e5e7eb',
        textAlign: 'center',
        fontSize: 8,
        color: '#9ca3af',
      }}>
        DailyPlanly · Exported {now}
      </div>
    </div>
  )
}
