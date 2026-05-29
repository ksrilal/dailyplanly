import { generateId } from '@/lib/utils'
import type { Template } from '../types'

// IDs for parent items (need stable refs for parentId)
const s1 = generateId(), s2 = generateId(), s3 = generateId()
const s1a = generateId(), s1b = generateId()
const s2a = generateId(), s2b = generateId()
const s3a = generateId()

const projectChecklist: Template = {
  id: 'project-checklist',
  slug: 'project-checklist',
  title: 'Project Checklist',
  description: 'A nested, hierarchical checklist for managing project tasks by phase.',
  category: 'work-office',
  type: 'checklist',
  previewImage: '/previews/templates/project-checklist.png',
  featured: true,
  tags: ['project', 'checklist', 'work', 'phases', 'nested', 'advanced'],
  schemaVersion: 1,
  createdAt: '2026-05-28T00:00:00.000Z',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      // Phase 1: Discovery
      { id: s1, text: 'Discovery & Planning', checked: false, status: 'invalid' as const, parentId: null, order: 0, collapsed: false },
      { id: s1a, text: 'Define project scope and objectives', checked: true, status: 'checked' as const, parentId: s1, order: 0, collapsed: false },
      { id: s1b, text: 'Identify key stakeholders', checked: true, status: 'checked' as const, parentId: s1, order: 1, collapsed: false },
      { id: generateId(), text: 'Set timeline and milestones', checked: true, status: 'checked' as const, parentId: s1, order: 2, collapsed: false },
      { id: generateId(), text: 'Allocate budget and resources', checked: false, status: 'invalid' as const, parentId: s1, order: 3, collapsed: false },

      // Phase 2: Design
      { id: s2, text: 'Design Phase', checked: false, status: 'unchecked' as const, parentId: null, order: 1, collapsed: false },
      { id: s2a, text: 'Create wireframes', checked: false, status: 'unchecked' as const, parentId: s2, order: 0, collapsed: false },
      { id: generateId(), text: 'Homepage wireframe', checked: true, status: 'checked' as const, parentId: s2a, order: 0, collapsed: false },
      { id: generateId(), text: 'Mobile responsive layout', checked: false, status: 'unchecked' as const, parentId: s2a, order: 1, collapsed: false },
      { id: s2b, text: 'Visual design', checked: false, status: 'unchecked' as const, parentId: s2, order: 1, collapsed: false },
      { id: generateId(), text: 'Define color system and typography', checked: false, status: 'unchecked' as const, parentId: s2b, order: 0, collapsed: false },
      { id: generateId(), text: 'Design component library', checked: false, status: 'unchecked' as const, parentId: s2b, order: 1, collapsed: false },
      { id: generateId(), text: 'Review with client', checked: false, status: 'unchecked' as const, parentId: s2, order: 2, collapsed: false },

      // Phase 3: Development
      { id: s3, text: 'Development', checked: false, status: 'unchecked' as const, parentId: null, order: 2, collapsed: false },
      { id: s3a, text: 'Frontend implementation', checked: false, status: 'unchecked' as const, parentId: s3, order: 0, collapsed: false },
      { id: generateId(), text: 'Set up project structure', checked: false, status: 'unchecked' as const, parentId: s3a, order: 0, collapsed: false },
      { id: generateId(), text: 'Build UI components', checked: false, status: 'unchecked' as const, parentId: s3a, order: 1, collapsed: false },
      { id: generateId(), text: 'Backend API integration', checked: false, status: 'unchecked' as const, parentId: s3, order: 1, collapsed: false },
      { id: generateId(), text: 'Testing and QA', checked: false, status: 'unchecked' as const, parentId: s3, order: 2, collapsed: false },
    ],
  },
}

export default projectChecklist
