import { generateId } from '@/lib/utils'
import type { ChecklistItem, ChecklistItemStatus, ChecklistProgress } from '@/features/storage/types'

export const MAX_DEPTH = 3 // 0-indexed → 4 visual levels (0,1,2,3)

// ─── Basic tree queries ───────────────────────────────────────────────────────

export function getChildren(items: ChecklistItem[], parentId: string): ChecklistItem[] {
  return items.filter((i) => i.parentId === parentId).sort((a, b) => a.order - b.order)
}

export function getRoots(items: ChecklistItem[]): ChecklistItem[] {
  return items.filter((i) => i.parentId === null).sort((a, b) => a.order - b.order)
}

export function getDescendants(items: ChecklistItem[], id: string): ChecklistItem[] {
  const children = getChildren(items, id)
  return children.flatMap((child) => [child, ...getDescendants(items, child.id)])
}

export function getDepth(items: ChecklistItem[], id: string): number {
  let depth = 0
  let current = items.find((i) => i.id === id)
  while (current?.parentId) {
    depth++
    current = items.find((i) => i.id === current!.parentId)
  }
  return depth
}

export function getPrevSibling(items: ChecklistItem[], id: string): ChecklistItem | null {
  const item = items.find((i) => i.id === id)
  if (!item) return null
  const siblings = items.filter((i) => i.parentId === item.parentId).sort((a, b) => a.order - b.order)
  const idx = siblings.findIndex((s) => s.id === id)
  return idx > 0 ? siblings[idx - 1] : null
}

export function isFirstAmongSiblings(items: ChecklistItem[], id: string): boolean {
  const item = items.find((i) => i.id === id)
  if (!item) return false
  return !items.some((i) => i.parentId === item.parentId && i.order < item.order)
}

// ─── Status propagation ───────────────────────────────────────────────────────

/**
 * Derive what a parent's status SHOULD be based on its direct children.
 * Rules:
 *  - No children → keep own status
 *  - Any child invalid → parent = invalid
 *  - All children checked → parent = checked
 *  - Otherwise (mix, or any unchecked) → parent = unchecked
 */
function deriveParentStatus(items: ChecklistItem[], parentId: string): ChecklistItemStatus {
  const children = getChildren(items, parentId)
  if (children.length === 0) {
    const self = items.find((i) => i.id === parentId)
    return self?.status ?? 'unchecked'
  }
  if (children.some((c) => (c.status ?? (c.checked ? 'checked' : 'unchecked')) === 'invalid')) return 'invalid'
  if (children.every((c) => (c.status ?? (c.checked ? 'checked' : 'unchecked')) === 'checked')) return 'checked'
  return 'unchecked'
}

/**
 * After any structural or status change, propagate statuses bottom-up.
 * Walk from leaves to roots, re-deriving each parent's status from its children.
 */
export function propagateUp(items: ChecklistItem[]): ChecklistItem[] {
  // Build a set of all parent ids (items that have at least one child)
  const parentIds = new Set(items.filter((i) => i.parentId !== null).map((i) => i.parentId as string))

  // Process in reverse-depth order (deepest parents first)
  // Repeatedly propagate until stable (max depth is 4 so max 4 passes)
  let result = [...items]
  for (let pass = 0; pass < MAX_DEPTH + 1; pass++) {
    let changed = false
    result = result.map((item) => {
      if (!parentIds.has(item.id)) return item // leaf, skip
      const derivedStatus = deriveParentStatus(result, item.id)
      const derivedChecked = derivedStatus === 'checked'
      if (item.status === derivedStatus && item.checked === derivedChecked) return item
      changed = true
      return { ...item, status: derivedStatus, checked: derivedChecked }
    })
    if (!changed) break
  }
  return result
}

/**
 * Propagate a status DOWN from a parent to all descendants.
 */
function propagateDown(items: ChecklistItem[], id: string, status: ChecklistItemStatus): ChecklistItem[] {
  const descendantIds = new Set(getDescendants(items, id).map((d) => d.id))
  return items.map((i) => {
    if (i.id === id || descendantIds.has(i.id)) {
      return { ...i, status, checked: status === 'checked' }
    }
    return i
  })
}

// ─── Mutating operations (all call propagateUp after) ────────────────────────

export function addItemAfter(items: ChecklistItem[], siblingId: string | null, parentId: string | null = null): ChecklistItem[] {
  const newItem: ChecklistItem = {
    id: generateId(),
    text: '',
    checked: false,
    status: 'unchecked',
    parentId,
    order: 0,
    collapsed: false,
  }

  let result: ChecklistItem[]
  if (siblingId === null) {
    const siblings = items.filter((i) => i.parentId === parentId)
    newItem.order = siblings.length
    result = [...items, newItem]
  } else {
    const sibling = items.find((i) => i.id === siblingId)
    if (!sibling) {
      const siblings = items.filter((i) => i.parentId === parentId)
      newItem.order = siblings.length
      result = [...items, newItem]
    } else {
      newItem.parentId = sibling.parentId
      newItem.order = sibling.order + 1
      result = items.map((i) => {
        if (i.parentId === sibling.parentId && i.id !== siblingId && i.order > sibling.order) {
          return { ...i, order: i.order + 1 }
        }
        return i
      }).concat(newItem)
    }
  }

  // Adding unchecked child may un-check a previously all-checked parent
  return propagateUp(result)
}

export function addChildItem(items: ChecklistItem[], parentId: string): ChecklistItem[] {
  // Enforce max depth
  if (getDepth(items, parentId) >= MAX_DEPTH) return items
  const existingChildren = getChildren(items, parentId)
  const newItem: ChecklistItem = {
    id: generateId(),
    text: '',
    checked: false,
    status: 'unchecked',
    parentId,
    order: existingChildren.length,
    collapsed: false,
  }
  return propagateUp([...items, newItem])
}

export function removeItem(items: ChecklistItem[], id: string): ChecklistItem[] {
  const descendants = getDescendants(items, id).map((d) => d.id)
  const filtered = items.filter((i) => i.id !== id && !descendants.includes(i.id))
  return propagateUp(filtered)
}

/**
 * Cycle status on a leaf, or propagate down+up when toggling a parent.
 */
export function cycleItemStatus(items: ChecklistItem[], id: string): ChecklistItem[] {
  const item = items.find((i) => i.id === id)
  if (!item) return items

  const current: ChecklistItemStatus = item.status ?? (item.checked ? 'checked' : 'unchecked')
  const cycle: Record<ChecklistItemStatus, ChecklistItemStatus> = {
    unchecked: 'checked',
    checked: 'invalid',
    invalid: 'unchecked',
  }
  const nextStatus = cycle[current]

  // Propagate down to all descendants, then re-derive up
  const withDown = propagateDown(items, id, nextStatus)
  return propagateUp(withDown)
}

/** Legacy: used for DnD checked toggle */
export function toggleItem(items: ChecklistItem[], id: string): ChecklistItem[] {
  return cycleItemStatus(items, id)
}

export function indentItem(items: ChecklistItem[], id: string): ChecklistItem[] {
  const item = items.find((i) => i.id === id)
  if (!item) return items

  const siblings = items.filter((i) => i.parentId === item.parentId && i.id !== id).sort((a, b) => a.order - b.order)
  const prevSibling = siblings.filter((s) => s.order < item.order).pop()
  if (!prevSibling) return items

  const result = items.map((i) => {
    if (i.id === id) return { ...i, parentId: prevSibling.id, order: getChildren(items, prevSibling.id).length }
    return i
  })
  return propagateUp(result)
}

export function outdentItem(items: ChecklistItem[], id: string): ChecklistItem[] {
  const item = items.find((i) => i.id === id)
  if (!item || item.parentId === null) return items

  const parent = items.find((i) => i.id === item.parentId)
  if (!parent) return items

  // Siblings in the new parent group — shift those after parent down by 1
  const newOrder = parent.order + 1
  const result = items.map((i) => {
    if (i.id === id) return { ...i, parentId: parent.parentId, order: newOrder }
    // Shift existing siblings at same level that come after parent
    if (i.id !== item.id && i.parentId === parent.parentId && i.order >= newOrder) {
      return { ...i, order: i.order + 1 }
    }
    return i
  })
  return propagateUp(result)
}

/**
 * Reorder an item within its sibling group.
 * `overId` is the ID of the sibling it's being dropped onto.
 * Normalises all sibling orders to 0,1,2,… then re-applies after swap.
 */
export function reorderItem(items: ChecklistItem[], activeId: string, overId: string): ChecklistItem[] {
  const active = items.find((i) => i.id === activeId)
  const over = items.find((i) => i.id === overId)
  if (!active || !over || active.parentId !== over.parentId) return items

  // Get sorted siblings
  const parentId = active.parentId
  const siblings = items
    .filter((i) => i.parentId === parentId)
    .sort((a, b) => a.order - b.order)

  const fromIdx = siblings.findIndex((s) => s.id === activeId)
  const toIdx = siblings.findIndex((s) => s.id === overId)
  if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return items

  // Move in the array
  const reordered = [...siblings]
  const [moved] = reordered.splice(fromIdx, 1)
  reordered.splice(toIdx, 0, moved)

  // Write back normalised order values
  const orderMap = new Map(reordered.map((s, idx) => [s.id, idx]))
  const result = items.map((i) =>
    orderMap.has(i.id) ? { ...i, order: orderMap.get(i.id)! } : i
  )

  return propagateUp(result)
}

/** Legacy – kept for outdent/indent internal use */
export function moveItem(items: ChecklistItem[], id: string, newIndex: number, newParentId: string | null): ChecklistItem[] {
  const item = items.find((i) => i.id === id)
  if (!item) return items

  const siblings = items
    .filter((i) => i.parentId === newParentId && i.id !== id)
    .sort((a, b) => a.order - b.order)

  // Insert at newIndex and normalise
  siblings.splice(newIndex, 0, { ...item, parentId: newParentId })
  const result = items.map((i) => {
    const idx = siblings.findIndex((s) => s.id === i.id)
    if (idx !== -1) return { ...i, parentId: newParentId, order: idx }
    // Remove from old group — shift is implicit since we rebuild
    return i
  })
  return propagateUp(result)
}

export function toggleCollapse(items: ChecklistItem[], id: string): ChecklistItem[] {
  return items.map((i) => i.id === id ? { ...i, collapsed: !i.collapsed } : i)
}

// ─── Progress ─────────────────────────────────────────────────────────────────

/** Count only LEAF items (no children) for progress — avoids double-counting parents. */
export function computeProgress(items: ChecklistItem[]): ChecklistProgress {
  const leaves = items.filter((i) => !items.some((c) => c.parentId === i.id))
  const total = leaves.length
  const completed = leaves.filter((i) => (i.status ?? (i.checked ? 'checked' : 'unchecked')) === 'checked').length
  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}

// ─── Filter ───────────────────────────────────────────────────────────────────

export function filterItems(items: ChecklistItem[], query: string): string[] {
  if (!query.trim()) return items.map((i) => i.id)
  const q = query.toLowerCase()

  // Direct matches
  const directMatches = new Set(
    items.filter((i) => i.text.toLowerCase().includes(q)).map((i) => i.id)
  )

  const visible = new Set<string>()

  for (const id of directMatches) {
    visible.add(id)

    // Include all ancestors so the tree path is visible
    let current = items.find((i) => i.id === id)
    while (current?.parentId) {
      visible.add(current.parentId)
      current = items.find((i) => i.id === current!.parentId)
    }

    // Include all descendants so context is shown
    const addDescendants = (parentId: string) => {
      for (const child of getChildren(items, parentId)) {
        visible.add(child.id)
        addDescendants(child.id)
      }
    }
    addDescendants(id)
  }

  return items.filter((i) => visible.has(i.id)).map((i) => i.id)
}
