import { generateId } from '@/lib/utils'
import type { Template } from '../types'

const daily: Template = {
  id: 'daily-planner-minimal',
  slug: 'daily-planner-minimal',
  title: 'Daily Planner — Minimal',
  description: 'A clean, minimal daily planner with time blocks, priorities, and a notes section.',
  category: 'productivity',
  type: 'planner',
  previewImage: '/previews/templates/daily-planner-minimal.png',
  featured: true,
  tags: ['daily', 'planner', 'minimal', 'time blocking', 'productivity'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  plannerDefaults: {
    theme: 'minimal',
    paperSize: 'A4',
    orientation: 'portrait',
    blocks: [
      {
        id: generateId(),
        type: 'focus',
        label: "Today's Focus",
        width: 'full',
        order: 0,
        content: {
          title: "Today's Focus",
          items: [
            { id: generateId(), label: 'Top priority for today', priority: 'high' },
            { id: generateId(), label: 'Secondary task', priority: 'medium' },
            { id: generateId(), label: 'Nice to have', priority: 'low' },
          ],
        },
      },
      {
        id: generateId(),
        type: 'routine',
        label: 'Daily Schedule',
        width: 'full',
        order: 1,
        content: {
          slots: [
            { id: generateId(), time: '8:00 AM', label: '', done: false },
            { id: generateId(), time: '9:00 AM', label: '', done: false },
            { id: generateId(), time: '10:00 AM', label: '', done: false },
            { id: generateId(), time: '11:00 AM', label: '', done: false },
            { id: generateId(), time: '12:00 PM', label: 'Lunch', done: false },
            { id: generateId(), time: '1:00 PM', label: '', done: false },
            { id: generateId(), time: '2:00 PM', label: '', done: false },
            { id: generateId(), time: '3:00 PM', label: '', done: false },
            { id: generateId(), time: '4:00 PM', label: '', done: false },
            { id: generateId(), time: '5:00 PM', label: '', done: false },
          ],
        },
      },
      {
        id: generateId(),
        type: 'notes',
        label: 'Notes',
        width: 'full',
        order: 2,
        content: { lines: 10, text: '' },
      },
    ],
  },
}

export default daily
