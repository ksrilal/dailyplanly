import { generateId } from '@/lib/utils'
import type { Template } from '../types'

const studyPlanner: Template = {
  id: 'study-planner',
  slug: 'study-planner',
  title: 'Study Planner',
  description: 'Plan your study sessions with a subject schedule, focus blocks, and daily review checklist.',
  category: 'education',
  type: 'planner',
  previewImage: '/previews/templates/study-planner.png',
  featured: true,
  tags: ['study', 'education', 'schedule', 'focus', 'student'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  plannerDefaults: {
    theme: 'study-focus',
    paperSize: 'A4',
    orientation: 'portrait',
    blocks: [
      {
        id: generateId(),
        type: 'table',
        label: 'Subject Schedule',
        width: 'full',
        order: 0,
        content: {
          headers: ['Subject', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          rows: [
            ['Math', '', '', '', '', ''],
            ['Science', '', '', '', '', ''],
            ['History', '', '', '', '', ''],
          ],
        },
      },
      {
        id: generateId(),
        type: 'focus',
        label: "Today's Study Goals",
        width: 'full',
        order: 1,
        content: {
          title: "Today's Study Goals",
          items: [
            { id: generateId(), label: '', priority: 'high' as const },
            { id: generateId(), label: '', priority: 'medium' as const },
            { id: generateId(), label: '', priority: 'low' as const },
          ],
        },
      },
      {
        id: generateId(),
        type: 'routine',
        label: 'Study Sessions',
        width: 'full',
        order: 2,
        content: {
          slots: [
            { id: generateId(), time: '9:00 AM', label: 'Session 1', done: false },
            { id: generateId(), time: '11:00 AM', label: 'Session 2', done: false },
            { id: generateId(), time: '2:00 PM', label: 'Session 3', done: false },
            { id: generateId(), time: '4:00 PM', label: 'Review', done: false },
          ],
        },
      },
      {
        id: generateId(),
        type: 'notes',
        label: 'Notes',
        width: 'full',
        order: 3,
        content: { lines: 6, text: '' },
      },
    ],
  },
}

export default studyPlanner
