import { generateId } from '@/lib/utils'
import type { Template } from '../types'

const habitTracker: Template = {
  id: 'habit-tracker-monthly',
  slug: 'habit-tracker-monthly',
  title: 'Monthly Habit Tracker',
  description: 'Track up to 6 habits daily across a full month with this printable tracker.',
  category: 'health-wellness',
  type: 'planner',
  previewImage: '/previews/templates/habit-tracker-monthly.png',
  featured: true,
  tags: ['habits', 'tracker', 'monthly', 'wellness', 'routine'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  plannerDefaults: {
    theme: 'wellness-calm',
    paperSize: 'A4',
    orientation: 'landscape',
    blocks: [
      {
        id: generateId(),
        type: 'habit-tracker',
        label: 'Monthly Habit Tracker',
        width: 'full',
        order: 0,
        content: {
          habits: [
            { id: generateId(), label: 'Exercise' },
            { id: generateId(), label: 'Read 30 mins' },
            { id: generateId(), label: 'Drink 2L water' },
            { id: generateId(), label: 'Meditate' },
            { id: generateId(), label: 'Journal' },
            { id: generateId(), label: 'Sleep by 10pm' },
          ],
          period: 'daily',
          days: 30,
        },
      },
      {
        id: generateId(),
        type: 'notes',
        label: 'Monthly Reflection',
        width: 'full',
        order: 1,
        content: { lines: 6, text: '' },
      },
    ],
  },
}

export default habitTracker
