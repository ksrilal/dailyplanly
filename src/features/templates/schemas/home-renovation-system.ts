import type { Template } from '@/features/templates/types'

export const homeRenovationSystemTemplate: Template = {
  id: 'tpl-056',
  slug: 'home-renovation-system',
  title: 'Home Renovation System',
  description: 'Manage a home renovation from planning to final inspection. Covers contractor hiring, permits, budget control, room-by-room scheduling, materials procurement, and snagging.',
  category: 'family-home',
  type: 'checklist',
  featured: false,
  tags: ['renovation', 'home improvement', 'contractors', 'building', 'DIY'],
  previewImage: '/templates/previews/home-renovation-system.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-hrs-1', text: 'Planning & Design', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hrs-2', text: 'Define scope of renovation clearly', checked: false, order: 0, parentId: 'ci-hrs-1', collapsed: false, depth: 1 },
      { id: 'ci-hrs-3', text: 'Set total renovation budget (add 15% contingency)', checked: false, order: 1, parentId: 'ci-hrs-1', collapsed: false, depth: 1 },
      { id: 'ci-hrs-4', text: 'Check if planning permission is required', checked: false, order: 2, parentId: 'ci-hrs-1', collapsed: false, depth: 1 },
      { id: 'ci-hrs-5', text: 'Create detailed room-by-room project list', checked: false, order: 3, parentId: 'ci-hrs-1', collapsed: false, depth: 1 },
      { id: 'ci-hrs-6', text: 'Hire architect or interior designer if needed', checked: false, order: 4, parentId: 'ci-hrs-1', collapsed: false, depth: 1 },

      { id: 'ci-hrs-7', text: 'Contractor Hiring', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hrs-8', text: 'Get 3 quotes for each trade (builder, plumber, electrician)', checked: false, order: 0, parentId: 'ci-hrs-7', collapsed: false, depth: 1 },
      { id: 'ci-hrs-9', text: 'Check contractor references and online reviews', checked: false, order: 1, parentId: 'ci-hrs-7', collapsed: false, depth: 1 },
      { id: 'ci-hrs-10', text: 'Confirm all contractors are licensed and insured', checked: false, order: 2, parentId: 'ci-hrs-7', collapsed: false, depth: 1 },
      { id: 'ci-hrs-11', text: 'Contracts & Payment', checked: false, order: 3, parentId: 'ci-hrs-7', collapsed: false, depth: 1 },
      { id: 'ci-hrs-12', text: 'Get written contract for every trade: scope, timeline, payment', checked: false, order: 0, parentId: 'ci-hrs-11', collapsed: false, depth: 2 },
      { id: 'ci-hrs-13', text: 'Never pay full amount upfront — agree payment milestones', checked: false, order: 1, parentId: 'ci-hrs-11', collapsed: false, depth: 2 },
      { id: 'ci-hrs-14', text: 'Retain 10% until snagging is complete', checked: false, order: 2, parentId: 'ci-hrs-11', collapsed: false, depth: 2 },

      { id: 'ci-hrs-15', text: 'Materials & Procurement', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hrs-16', text: 'Create materials list for each room', checked: false, order: 0, parentId: 'ci-hrs-15', collapsed: false, depth: 1 },
      { id: 'ci-hrs-17', text: 'Order tiles, flooring, fittings with 10% extra for waste', checked: false, order: 1, parentId: 'ci-hrs-15', collapsed: false, depth: 1 },
      { id: 'ci-hrs-18', text: 'Confirm delivery dates align with installation schedule', checked: false, order: 2, parentId: 'ci-hrs-15', collapsed: false, depth: 1 },
      { id: 'ci-hrs-19', text: 'Keep all receipts for materials and labour', checked: false, order: 3, parentId: 'ci-hrs-15', collapsed: false, depth: 1 },

      { id: 'ci-hrs-20', text: 'Renovation Execution', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hrs-21', text: 'Kitchen Renovation', checked: false, order: 0, parentId: 'ci-hrs-20', collapsed: false, depth: 1 },
      { id: 'ci-hrs-22', text: 'Strip old units and fittings', checked: false, order: 0, parentId: 'ci-hrs-21', collapsed: false, depth: 2 },
      { id: 'ci-hrs-23', text: 'Plumbing and electrical first fix', checked: false, order: 1, parentId: 'ci-hrs-21', collapsed: false, depth: 2 },
      { id: 'ci-hrs-24', text: 'Install new units, worktops, appliances', checked: false, order: 2, parentId: 'ci-hrs-21', collapsed: false, depth: 2 },
      { id: 'ci-hrs-25', text: 'Tiling and final decoration', checked: false, order: 3, parentId: 'ci-hrs-21', collapsed: false, depth: 2 },
      { id: 'ci-hrs-26', text: 'Weekly site meeting with lead contractor', checked: false, order: 1, parentId: 'ci-hrs-20', collapsed: false, depth: 1 },
      { id: 'ci-hrs-27', text: 'Document progress with photos each week', checked: false, order: 2, parentId: 'ci-hrs-20', collapsed: false, depth: 1 },

      { id: 'ci-hrs-28', text: 'Completion & Snagging', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hrs-29', text: 'Conduct snagging walkthrough — list all defects', checked: false, order: 0, parentId: 'ci-hrs-28', collapsed: false, depth: 1 },
      { id: 'ci-hrs-30', text: 'Contractors fix all snagging items before final payment', checked: false, order: 1, parentId: 'ci-hrs-28', collapsed: false, depth: 1 },
      { id: 'ci-hrs-31', text: 'Get all warranties and certificates (Gas Safe, NICEIC)', checked: false, order: 2, parentId: 'ci-hrs-28', collapsed: false, depth: 1 },
      { id: 'ci-hrs-32', text: 'Update home insurance to reflect renovation value', checked: false, order: 3, parentId: 'ci-hrs-28', collapsed: false, depth: 1 },
    ]
  }
}
