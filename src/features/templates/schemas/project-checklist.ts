import { generateId } from '@/lib/utils'
import type { Template } from '../types'

const s1 = generateId(), s2 = generateId(), s3 = generateId()

const projectChecklist: Template = {
  id: 'project-checklist',
  slug: 'project-checklist',
  title: 'Project Checklist',
  description: 'A nested, hierarchical checklist for managing project tasks by phase.',
  category: 'work-office',
  type: 'checklist',
  previewImage: '/previews/templates/project-checklist.png',
  featured: true,
  tags: ['project', 'checklist', 'work', 'phases', 'nested'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: s1, text: 'Planning Phase', checked: false, parentId: null, order: 0, collapsed: false },
      { id: generateId(), text: 'Define project scope', checked: false, parentId: s1, order: 0, collapsed: false },
      { id: generateId(), text: 'Identify stakeholders', checked: false, parentId: s1, order: 1, collapsed: false },
      { id: generateId(), text: 'Set timeline', checked: false, parentId: s1, order: 2, collapsed: false },
      { id: s2, text: 'Execution Phase', checked: false, parentId: null, order: 1, collapsed: false },
      { id: generateId(), text: 'Complete deliverable 1', checked: false, parentId: s2, order: 0, collapsed: false },
      { id: generateId(), text: 'Complete deliverable 2', checked: false, parentId: s2, order: 1, collapsed: false },
      { id: generateId(), text: 'Review progress', checked: false, parentId: s2, order: 2, collapsed: false },
      { id: s3, text: 'Review & Close', checked: false, parentId: null, order: 2, collapsed: false },
      { id: generateId(), text: 'Final review', checked: false, parentId: s3, order: 0, collapsed: false },
      { id: generateId(), text: 'Document learnings', checked: false, parentId: s3, order: 1, collapsed: false },
    ],
  },
}

export default projectChecklist
