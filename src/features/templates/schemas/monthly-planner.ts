import type { Template } from '@/features/templates/types'

export const monthlyPlannerTemplate: Template = {
  id: 'tpl-003',
  slug: 'monthly-planner',
  title: 'Monthly Planner',
  description: 'Take control of your month with goal-setting, a calendar overview, key event timeline, weekly summary table, and end-of-month reflection to measure real progress.',
  category: 'productivity',
  type: 'planner',
  featured: false,
  tags: ['monthly', 'goals', 'calendar', 'review', 'planning'],
  previewImage: '/templates/previews/monthly-planner.png',
  plannerDefaults: {
    theme: 'study-focus',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Monthly Goal', order: 0, width: 'full',
        content: {
          goal: 'Grow newsletter subscriber base to 2,000',
          milestones: [
            { label: 'Publish 4 high-value newsletter editions', done: false },
            { label: 'Run paid acquisition campaign', done: false },
            { label: 'Create lead magnet landing page', done: false },
            { label: 'Launch referral program', done: false },
            { label: 'Reach 1,500 subscribers milestone', done: false },
            { label: 'Reach 2,000 subscribers goal', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'calendar', label: 'Month Overview', order: 1, width: 'full',
        content: { year: 2025, month: 6, notes: [] }
      },
      {
        id: 'b3', type: 'timeline', label: 'Key Events This Month', order: 2, width: 'half',
        content: {
          events: [
            { label: 'Q2 results presentation', date: 'June 3' },
            { label: 'Lead magnet landing page goes live', date: 'June 7' },
            { label: 'Newsletter edition #1 sends', date: 'June 10' },
            { label: 'Paid campaign launch', date: 'June 12' },
            { label: 'Mid-month subscriber review', date: 'June 15' },
            { label: 'Newsletter edition #2 sends', date: 'June 17' },
            { label: 'Referral program launch', date: 'June 20' },
            { label: 'Newsletter edition #3 sends', date: 'June 24' },
            { label: 'Month-end review & reporting', date: 'June 30' },
          ]
        }
      },
      {
        id: 'b4', type: 'dashboard-card', label: 'Month Progress', order: 3, width: 'half',
        content: { title: 'Subscriber Count', value: '1,247', unit: '/ 2,000', note: 'Update weekly' }
      },
      {
        id: 'b5', type: 'table', label: 'Weekly Summary', order: 4, width: 'full',
        content: {
          headers: ['Week', 'Focus', 'Key Wins', 'Blockers', 'New Subscribers'],
          rows: [
            ['Week 1', 'Launch prep', '', '', ''],
            ['Week 2', 'Campaign launch', '', '', ''],
            ['Week 3', 'Referral push', '', '', ''],
            ['Week 4', 'Final sprint', '', '', ''],
          ]
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Monthly Reflections', order: 5, width: 'full',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
