import { generateId } from '@/lib/utils'
import type { Template } from '../types'

const goalPlanner: Template = {
  id: 'goal-planner',
  slug: 'goal-planner',
  title: 'Goal Planner',
  description: 'Set goals, break them into milestones, and track weekly progress toward what matters most.',
  category: 'productivity',
  type: 'planner',
  previewImage: '/previews/templates/goal-planner.png',
  featured: true,
  tags: ['goals', 'planner', 'milestones', 'productivity', 'focus'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  plannerDefaults: {
    theme: 'study-focus',
    paperSize: 'A4',
    orientation: 'portrait',
    blocks: [
      {
        id: generateId(),
        type: 'goal',
        label: 'Primary Goal',
        width: 'full',
        order: 0,
        content: {
          goal: 'My main goal for this period',
          milestones: [
            { id: generateId(), label: 'Week 1 milestone', done: false },
            { id: generateId(), label: 'Week 2 milestone', done: false },
            { id: generateId(), label: 'Week 3 milestone', done: false },
            { id: generateId(), label: 'Final milestone', done: false },
          ],
          deadline: '',
        },
      },
      {
        id: generateId(),
        type: 'focus',
        label: "This Week's Actions",
        width: 'full',
        order: 1,
        content: {
          title: "This Week's Actions",
          items: [
            { id: generateId(), label: '', priority: 'high' as const },
            { id: generateId(), label: '', priority: 'medium' as const },
            { id: generateId(), label: '', priority: 'low' as const },
          ],
        },
      },
      {
        id: generateId(),
        type: 'notes',
        label: 'Reflections',
        width: 'full',
        order: 2,
        content: { lines: 8, text: '' },
      },
    ],
  },
}

export default goalPlanner
