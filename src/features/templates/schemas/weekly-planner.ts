import { generateId } from '@/lib/utils'
import type { Template } from '../types'

const weekly: Template = {
  id: 'weekly-planner-soft-paper',
  slug: 'weekly-planner-soft-paper',
  title: 'Weekly Planner — Soft Paper',
  description: 'A warm, paper-inspired weekly overview with goals, habits, and daily task sections.',
  category: 'productivity',
  type: 'planner',
  previewImage: '/previews/templates/weekly-planner-soft-paper.png',
  featured: true,
  tags: ['weekly', 'planner', 'paper', 'habits', 'goals'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  plannerDefaults: {
    theme: 'soft-paper',
    paperSize: 'A4',
    orientation: 'portrait',
    blocks: [
      {
        id: generateId(),
        type: 'goal',
        label: 'Week Goals',
        width: 'full',
        order: 0,
        content: {
          goal: "This week's main goal",
          milestones: [
            { id: generateId(), label: 'Monday priority', done: false },
            { id: generateId(), label: 'Mid-week checkpoint', done: false },
            { id: generateId(), label: 'Week-end goal', done: false },
          ],
        },
      },
      {
        id: generateId(),
        type: 'habit-tracker',
        label: 'Habit Tracker',
        width: 'full',
        order: 1,
        content: {
          habits: [
            { id: generateId(), label: 'Exercise' },
            { id: generateId(), label: 'Read' },
            { id: generateId(), label: 'Meditate' },
          ],
          period: 'weekly',
          days: 7,
        },
      },
      {
        id: generateId(),
        type: 'table',
        label: 'Weekly Overview',
        width: 'full',
        order: 2,
        content: {
          headers: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          rows: [
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
          ],
        },
      },
      {
        id: generateId(),
        type: 'notes',
        label: 'Week Notes',
        width: 'full',
        order: 3,
        content: { lines: 8, text: '' },
      },
    ],
  },
}

export default weekly
