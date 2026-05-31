'use client'

/**
 * ChecklistPreview — stateless, read-only checklist rendering.
 * Uses explicit hardcoded "paper" colors so it looks correct in both
 * light and dark app themes. Mirrors the editor's visual hierarchy.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

type RawItem = {
  id: string
  text: string
  checked: boolean
  parentId: string | null
  order: number
  collapsed?: boolean
  depth?: number
}

interface ChecklistPreviewProps {
  items: RawItem[]
  mode?: 'simple' | 'advanced'
  title?: string
  className?: string
}

// ─── Design tokens (paper-light, always) ────────────────────────────────────

const C = {
  bg: '#faf8f5',
  surface: '#ffffff',
  border: 'rgba(0,0,0,0.08)',
  rule: 'rgba(0,0,0,0.055)',
  text: '#1a1a1a',
  textMuted: '#666666',
  textFaint: '#999999',
  checked: '#9ca3af',
  accent: '#22c55e',       // emerald-500
  parentText: '#111111',
  indentLine: 'rgba(0,0,0,0.10)',
  headerBg: 'rgba(255,255,255,0.90)',
  simpleBadgeBg: '#d1fae5',
  simpleBadgeText: '#065f46',
  advancedBadgeBg: '#ffedd5',
  advancedBadgeText: '#7c2d12',
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({ checked, square }: { checked: boolean; square: boolean }) {
  const base: React.CSSProperties = {
    width: 14,
    height: 14,
    borderRadius: square ? 3 : 7,
    border: `2px solid ${checked ? C.accent : 'rgba(0,0,0,0.25)'}`,
    background: checked ? C.accent : 'transparent',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <div style={base}>
      {checked && (
        <svg viewBox="0 0 10 10" style={{ width: 8, height: 8 }}>
          <polyline
            points="1.5,5 4,7.5 8.5,2"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}

// ─── Recursive item row ───────────────────────────────────────────────────────

function ItemRow({
  item,
  allItems,
  depth,
  mode,
}: {
  item: RawItem
  allItems: RawItem[]
  depth: number
  mode: 'simple' | 'advanced'
}) {
  const children = allItems
    .filter((c) => c.parentId === item.id)
    .sort((a, b) => a.order - b.order)
  const hasChildren = children.length > 0
  const isParent = hasChildren && mode === 'advanced'
  const isSquare = mode === 'simple'

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10 + depth * 16,
          paddingRight: 10,
          borderBottom: `1px solid ${C.rule}`,
          position: 'relative',
        }}
      >
        {/* Vertical indent guide line for nested items */}
        {depth > 0 && (
          <div style={{
            position: 'absolute',
            left: 10 + (depth - 1) * 16 + 7,
            top: 0,
            bottom: 0,
            width: 1,
            background: C.indentLine,
          }} />
        )}

        <Checkbox checked={item.checked} square={isSquare} />

        <span style={{
          fontSize: isParent ? 11 : 10.5,
          fontWeight: isParent ? 600 : 400,
          color: item.checked ? C.checked : (isParent ? C.parentText : C.text),
          textDecoration: item.checked ? 'line-through' : 'none',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          lineHeight: 1.4,
        }}>
          {item.text || 'Task item'}
        </span>

        {/* Child count badge */}
        {isParent && !item.collapsed && (
          <span style={{
            fontSize: 8,
            color: C.textFaint,
            background: 'rgba(0,0,0,0.06)',
            borderRadius: 3,
            padding: '1px 4px',
            flexShrink: 0,
          }}>
            {children.length}
          </span>
        )}
      </div>

      {/* Render children recursively */}
      {!item.collapsed && children.map((child) => (
        <ItemRow
          key={child.id}
          item={child}
          allItems={allItems}
          depth={depth + 1}
          mode={mode}
        />
      ))}
    </>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ items }: { items: RawItem[] }) {
  const leaves = items.filter((i) => !items.some((c) => c.parentId === i.id))
  const done = leaves.filter((i) => i.checked).length
  const total = leaves.length
  if (total === 0) return null
  const pct = Math.round((done / total) * 100)

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px',
      borderBottom: `1px solid ${C.border}`,
      background: C.headerBg,
    }}>
      <div style={{
        flex: 1,
        height: 4,
        borderRadius: 2,
        background: 'rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: C.accent,
          borderRadius: 2,
        }} />
      </div>
      <span style={{ fontSize: 8.5, color: C.textFaint, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        {done}/{total}
      </span>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ChecklistPreview({ items, mode = 'simple', title, className }: ChecklistPreviewProps) {
  const roots = items
    .filter((i) => i.parentId === null)
    .sort((a, b) => a.order - b.order)

  const badgeBg = mode === 'simple' ? C.simpleBadgeBg : C.advancedBadgeBg
  const badgeText = mode === 'simple' ? C.simpleBadgeText : C.advancedBadgeText

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: C.bg,
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 27px,
          rgba(0,0,0,0.032) 27px,
          rgba(0,0,0,0.032) 28px
        )`,
        fontFamily: 'Inter, system-ui, sans-serif',
        width: '100%',
        height: '100%',
        color: C.text,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: C.headerBg,
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 8.5,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: badgeBg,
            color: badgeText,
            borderRadius: 4,
            padding: '2px 6px',
          }}>
            {mode}
          </span>
          {title && (
            <span style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: C.text,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 160,
            }}>
              {title}
            </span>
          )}
        </div>
        <span style={{ fontSize: 8.5, color: C.textFaint }}>
          {items.length} items
        </span>
      </div>

      {/* Progress bar */}
      <ProgressBar items={items} />

      {/* Items */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {roots.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            opacity: 0.25,
            fontSize: 12,
            color: C.textMuted,
          }}>
            No items yet
          </div>
        ) : (
          roots.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              allItems={items}
              depth={0}
              mode={mode}
            />
          ))
        )}
      </div>
    </div>
  )
}
