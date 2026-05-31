import type { Template } from '@/features/templates/types'

export const savingsGoalPlannerTemplate: Template = {
  id: 'tpl-015',
  slug: 'savings-goal-planner',
  title: 'Savings Goal Planner',
  description: 'Save for what matters — house deposit, holiday, emergency fund, or dream purchase. Set a target, track monthly contributions, and celebrate milestones on the way to your goal.',
  category: 'finance',
  type: 'planner',
  featured: false,
  tags: ['savings', 'goals', 'finance', 'money', 'wealth building'],
  previewImage: '/templates/previews/savings-goal-planner.png',
  plannerDefaults: {
    theme: 'wellness-calm',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Savings Goal', order: 0, width: 'half',
        content: {
          goal: 'Save £15,000 for house deposit in 18 months',
          milestones: [
            { label: 'Save first £1,000', done: false },
            { label: 'Reach £5,000 milestone', done: false },
            { label: 'Hit £10,000 halfway point', done: false },
            { label: 'Reach £13,000 — final stretch', done: false },
            { label: '£15,000 GOAL ACHIEVED!', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Saved So Far', order: 1, width: 'half',
        content: { title: 'Total Saved', value: '£0', unit: '/ £15,000', note: '0% — keep going!' }
      },
      {
        id: 'b3', type: 'table', label: 'Monthly Savings Log', order: 2, width: 'full',
        content: {
          headers: ['Month', 'Target (£)', 'Actual Saved (£)', 'Running Total (£)', 'Notes'],
          rows: [
            ['January', '834', '', '', ''],
            ['February', '834', '', '', ''],
            ['March', '834', '', '', ''],
            ['April', '834', '', '', ''],
            ['May', '834', '', '', ''],
            ['June', '834', '', '', ''],
            ['July', '834', '', '', ''],
            ['August', '834', '', '', ''],
            ['September', '834', '', '', ''],
            ['October', '834', '', '', ''],
            ['November', '834', '', '', ''],
            ['December', '838', '', '', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'timeline', label: 'Savings Milestones', order: 3, width: 'half',
        content: {
          events: [
            { label: 'Open high-yield savings account', date: 'Month 1' },
            { label: 'First £1,000 saved', date: 'Month 2' },
            { label: '£5,000 milestone — celebrate!', date: 'Month 6' },
            { label: '£10,000 halfway point', date: 'Month 12' },
            { label: '£15,000 goal reached', date: 'Month 18' },
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Saving Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Transfer savings on payday' },
            { label: 'No unnecessary subscriptions' },
            { label: 'Cook at home 5+ days' },
            { label: 'Review spending vs budget' },
            { label: 'Sell unused items monthly' },
          ],
          days: 7
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Savings Notes', order: 5, width: 'full',
        content: { lines: 5, text: '' }
      },
    ]
  }
}
