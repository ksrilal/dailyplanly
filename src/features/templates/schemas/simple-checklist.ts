import { generateId } from '@/lib/utils'
import type { Template } from '../types'

const simpleChecklist: Template = {
  id: 'simple-checklist',
  slug: 'simple-checklist',
  title: 'Simple Checklist',
  description: 'A clean, flat checklist for quick task management and to-do lists.',
  category: 'productivity',
  type: 'checklist',
  previewImage: '/previews/templates/simple-checklist.png',
  featured: true,
  tags: ['checklist', 'to-do', 'tasks', 'simple'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: generateId(), text: 'First task', checked: false, parentId: null, order: 0, collapsed: false },
      { id: generateId(), text: 'Second task', checked: false, parentId: null, order: 1, collapsed: false },
      { id: generateId(), text: 'Third task', checked: false, parentId: null, order: 2, collapsed: false },
    ],
  },
}

export default simpleChecklist
