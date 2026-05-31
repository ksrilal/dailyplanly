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
  tags: ['checklist', 'to-do', 'tasks', 'simple', 'quick'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: generateId(), text: 'Review project brief and requirements', checked: true, status: 'checked' as const, parentId: null, order: 0, collapsed: false },
      { id: generateId(), text: 'Schedule kickoff meeting with stakeholders', checked: true, status: 'checked' as const, parentId: null, order: 1, collapsed: false },
      { id: generateId(), text: 'Create initial wireframes', checked: false, status: 'unchecked' as const, parentId: null, order: 2, collapsed: false },
      { id: generateId(), text: 'Define color palette and typography', checked: false, status: 'unchecked' as const, parentId: null, order: 3, collapsed: false },
      { id: generateId(), text: 'Build responsive layout components', checked: false, status: 'unchecked' as const, parentId: null, order: 4, collapsed: false },
      { id: generateId(), text: 'Write unit tests for core logic', checked: false, status: 'invalid' as const, parentId: null, order: 5, collapsed: false },
      { id: generateId(), text: 'Conduct user acceptance testing', checked: false, status: 'unchecked' as const, parentId: null, order: 6, collapsed: false },
      { id: generateId(), text: 'Deploy to staging environment', checked: false, status: 'unchecked' as const, parentId: null, order: 7, collapsed: false },
      { id: generateId(), text: 'Write release notes and documentation', checked: false, status: 'unchecked' as const, parentId: null, order: 8, collapsed: false },
      { id: generateId(), text: 'Go live and monitor for issues', checked: false, status: 'unchecked' as const, parentId: null, order: 9, collapsed: false },
    ],
  },
}

export default simpleChecklist
