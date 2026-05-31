import type { Template } from '@/features/templates/types'

export const emergencyFundPlannerTemplate: Template = {
  id: 'tpl-017',
  slug: 'emergency-fund-planner',
  title: 'Emergency Fund Planner',
  description: 'Build your financial safety net in 12 months. Track monthly contributions, visualise progress toward 3–6 months of expenses, and build the saving habits that last a lifetime.',
  category: 'finance',
  type: 'planner',
  featured: false,
  tags: ['emergency fund', 'savings', 'financial security', 'finance', 'safety net'],
  previewImage: '/templates/previews/emergency-fund-planner.png',
  plannerDefaults: {
    theme: 'study-focus',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Emergency Fund Goal', order: 0, width: 'half',
        content: {
          goal: 'Build a £9,000 emergency fund (3 months expenses) in 12 months',
          milestones: [
            { label: 'First £1,000 saved', done: false },
            { label: 'Reach £3,000 (1 month expenses)', done: false },
            { label: 'Hit £6,000 (2 months expenses)', done: false },
            { label: '£9,000 full emergency fund complete', done: false },
            { label: 'Open high-yield account, set up auto-deposit', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Fund Progress', order: 1, width: 'half',
        content: { title: 'Emergency Fund Balance', value: '£0', unit: '/ £9,000', note: 'Update monthly' }
      },
      {
        id: 'b3', type: 'table', label: 'Monthly Contribution Tracker', order: 2, width: 'full',
        content: {
          headers: ['Month', 'Monthly Income', 'Expenses Total', 'Amount Saved', 'Running Total', 'Notes'],
          rows: [
            ['January', '£3,200', '£2,450', '£750', '£750', ''],
            ['February', '£3,200', '', '', '', ''],
            ['March', '£3,200', '', '', '', ''],
            ['April', '£3,200', '', '', '', ''],
            ['May', '£3,200', '', '', '', ''],
            ['June', '£3,200', '', '', '', ''],
            ['July', '£3,200', '', '', '', ''],
            ['August', '£3,200', '', '', '', ''],
            ['September', '£3,200', '', '', '', ''],
            ['October', '£3,200', '', '', '', ''],
            ['November', '£3,200', '', '', '', ''],
            ['December', '£3,200', '', '', '', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'timeline', label: 'Fund Milestones', order: 3, width: 'half',
        content: {
          events: [
            { label: 'Set up dedicated savings account', date: 'Week 1' },
            { label: 'First £1,000 saved', date: 'Month 2' },
            { label: '£3,000 — 1 month of expenses covered', date: 'Month 4' },
            { label: '£6,000 — 2 months of expenses covered', date: 'Month 8' },
            { label: '£9,000 — full fund complete!', date: 'Month 12' },
          ]
        }
      },
      {
        id: 'b5', type: 'notes', label: 'Fund Strategy Notes', order: 4, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
