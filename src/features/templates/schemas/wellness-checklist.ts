import { generateId } from '@/lib/utils'
import type { Template } from '../types'

const wellnessChecklist: Template = {
  id: 'wellness-checklist',
  slug: 'wellness-checklist',
  title: 'Daily Wellness Checklist',
  description: 'A simple daily checklist covering morning routine, movement, nutrition, and evening wind-down.',
  category: 'health-wellness',
  type: 'checklist',
  previewImage: '/previews/templates/wellness-checklist.png',
  featured: true,
  tags: ['wellness', 'health', 'daily', 'routine', 'simple', 'habits'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: generateId(), text: 'Wake up at consistent time', checked: true, status: 'checked' as const, parentId: null, order: 0, collapsed: false },
      { id: generateId(), text: 'Drink a full glass of water', checked: true, status: 'checked' as const, parentId: null, order: 1, collapsed: false },
      { id: generateId(), text: '10 min morning stretch or yoga', checked: true, status: 'checked' as const, parentId: null, order: 2, collapsed: false },
      { id: generateId(), text: 'Eat a nutritious breakfast', checked: false, status: 'unchecked' as const, parentId: null, order: 3, collapsed: false },
      { id: generateId(), text: '30 min of exercise or movement', checked: false, status: 'unchecked' as const, parentId: null, order: 4, collapsed: false },
      { id: generateId(), text: 'Take vitamins and supplements', checked: false, status: 'invalid' as const, parentId: null, order: 5, collapsed: false },
      { id: generateId(), text: 'Drink at least 2L of water today', checked: false, status: 'unchecked' as const, parentId: null, order: 6, collapsed: false },
      { id: generateId(), text: 'Eat vegetables with lunch or dinner', checked: false, status: 'unchecked' as const, parentId: null, order: 7, collapsed: false },
      { id: generateId(), text: '10 min mindfulness or meditation', checked: false, status: 'unchecked' as const, parentId: null, order: 8, collapsed: false },
      { id: generateId(), text: 'No screens 1 hour before bed', checked: false, status: 'unchecked' as const, parentId: null, order: 9, collapsed: false },
      { id: generateId(), text: 'Write 3 things you are grateful for', checked: false, status: 'unchecked' as const, parentId: null, order: 10, collapsed: false },
      { id: generateId(), text: 'Sleep by 10:30 pm', checked: false, status: 'unchecked' as const, parentId: null, order: 11, collapsed: false },
    ],
  },
}

export default wellnessChecklist
