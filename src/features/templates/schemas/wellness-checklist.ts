import { generateId } from '@/lib/utils'
import type { Template } from '../types'

const s1 = generateId(), s2 = generateId(), s3 = generateId()

const wellnessChecklist: Template = {
  id: 'wellness-checklist',
  slug: 'wellness-checklist',
  title: 'Daily Wellness Checklist',
  description: 'A simple daily checklist covering morning routine, movement, nutrition, and evening wind-down.',
  category: 'health-wellness',
  type: 'checklist',
  previewImage: '/previews/templates/wellness-checklist.png',
  featured: true,
  tags: ['wellness', 'health', 'daily', 'routine', 'simple'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: generateId(), text: 'Drink a glass of water', checked: false, parentId: null, order: 0, collapsed: false },
      { id: generateId(), text: '10 min morning stretch', checked: false, parentId: null, order: 1, collapsed: false },
      { id: generateId(), text: 'Healthy breakfast', checked: false, parentId: null, order: 2, collapsed: false },
      { id: generateId(), text: '30 min movement or exercise', checked: false, parentId: null, order: 3, collapsed: false },
      { id: generateId(), text: '8 glasses of water today', checked: false, parentId: null, order: 4, collapsed: false },
      { id: generateId(), text: 'No phone 1hr before bed', checked: false, parentId: null, order: 5, collapsed: false },
      { id: generateId(), text: 'Gratitude journal (3 things)', checked: false, parentId: null, order: 6, collapsed: false },
      { id: generateId(), text: 'Sleep by 10:30pm', checked: false, parentId: null, order: 7, collapsed: false },
    ],
  },
}

export default wellnessChecklist
