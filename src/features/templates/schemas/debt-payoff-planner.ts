import type { Template } from '@/features/templates/types'

export const debtPayoffPlannerTemplate: Template = {
  id: 'tpl-016',
  slug: 'debt-payoff-planner',
  title: 'Debt Payoff Planner',
  description: 'Eliminate debt systematically using the avalanche or snowball method. Track every debt, monitor interest costs, plan extra payments, and stay motivated with milestone celebrations.',
  category: 'finance',
  type: 'planner',
  featured: false,
  tags: ['debt', 'debt-free', 'finance', 'snowball', 'avalanche'],
  previewImage: '/templates/previews/debt-payoff-planner.png',
  plannerDefaults: {
    theme: 'study-focus',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Debt-Free Goal', order: 0, width: 'half',
        content: {
          goal: 'Become completely debt-free in 30 months',
          milestones: [
            { label: 'Pay off credit card 1 (£1,200)', done: false },
            { label: 'Pay off credit card 2 (£2,800)', done: false },
            { label: 'Pay off personal loan (£5,500)', done: false },
            { label: 'Pay off car finance (£4,200)', done: false },
            { label: 'DEBT FREE — celebrate!', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Total Debt', order: 1, width: 'half',
        content: { title: 'Total Debt Remaining', value: '£13,700', unit: '', note: 'Update after each payment' }
      },
      {
        id: 'b3', type: 'table', label: 'Debt Overview', order: 2, width: 'full',
        content: {
          headers: ['Creditor', 'Balance (£)', 'Interest Rate', 'Min Payment (£)', 'Target Date', 'Status'],
          rows: [
            ['Barclaycard', '1,200', '29.9% APR', '25', 'Month 3', 'Active'],
            ['HSBC Credit Card', '2,800', '24.9% APR', '50', 'Month 8', 'Active'],
            ['Nationwide Personal Loan', '5,500', '8.4% APR', '180', 'Month 18', 'Active'],
            ['Car Finance (Ford)', '4,200', '6.9% APR', '195', 'Month 24', 'Active'],
          ]
        }
      },
      {
        id: 'b4', type: 'timeline', label: 'Payoff Milestones', order: 3, width: 'half',
        content: {
          events: [
            { label: 'Start debt payoff plan', date: 'Month 1' },
            { label: 'Barclaycard fully paid off', date: 'Month 3' },
            { label: 'HSBC card balance below £1,000', date: 'Month 5' },
            { label: 'HSBC card fully paid off', date: 'Month 8' },
            { label: 'Personal loan below £3,000', date: 'Month 12' },
            { label: 'Personal loan fully paid off', date: 'Month 18' },
            { label: 'Car finance fully paid off', date: 'Month 24' },
            { label: 'DEBT FREE!', date: 'Month 24' },
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Debt Payoff Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Make minimum payments on time' },
            { label: 'Put extra £150 to target debt' },
            { label: 'No new debt this week' },
            { label: 'Track spending vs budget' },
            { label: 'Review debt progress Sunday' },
          ],
          days: 7
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Debt Notes & Strategy', order: 5, width: 'full',
        content: { lines: 5, text: '' }
      },
    ]
  }
}
