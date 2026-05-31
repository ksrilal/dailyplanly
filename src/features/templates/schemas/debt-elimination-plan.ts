import type { Template } from '@/features/templates/types'

export const debtEliminationPlanTemplate: Template = {
  id: 'tpl-052',
  slug: 'debt-elimination-plan',
  title: 'Debt Elimination Plan',
  description: 'A systematic approach to eliminating all debt using the avalanche or snowball method, with weekly payment tracking, spending controls, and a celebration system for every win.',
  category: 'finance',
  type: 'checklist',
  featured: false,
  tags: ['debt', 'debt-free', 'finance', 'payoff', 'money'],
  previewImage: '/templates/previews/debt-elimination-plan.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-dep-1', text: 'Audit All Debts', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-dep-2', text: 'List every debt: creditor, balance, interest rate, minimum payment', checked: false, order: 0, parentId: 'ci-dep-1', collapsed: false, depth: 1 },
      { id: 'ci-dep-3', text: 'Calculate total debt amount', checked: false, order: 1, parentId: 'ci-dep-1', collapsed: false, depth: 1 },
      { id: 'ci-dep-4', text: 'Order debts by interest rate (avalanche) or balance (snowball)', checked: false, order: 2, parentId: 'ci-dep-1', collapsed: false, depth: 1 },
      { id: 'ci-dep-5', text: 'Calculate total minimum payment commitment each month', checked: false, order: 3, parentId: 'ci-dep-1', collapsed: false, depth: 1 },

      { id: 'ci-dep-6', text: 'Create Your Payoff Strategy', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-dep-7', text: 'Determine extra amount available each month for debt', checked: false, order: 0, parentId: 'ci-dep-6', collapsed: false, depth: 1 },
      { id: 'ci-dep-8', text: 'Find Ways to Increase Extra Payments', checked: false, order: 1, parentId: 'ci-dep-6', collapsed: false, depth: 1 },
      { id: 'ci-dep-9', text: 'Cut 3 non-essential subscriptions', checked: false, order: 0, parentId: 'ci-dep-8', collapsed: false, depth: 2 },
      { id: 'ci-dep-10', text: 'Reduce dining out to once per week maximum', checked: false, order: 1, parentId: 'ci-dep-8', collapsed: false, depth: 2 },
      { id: 'ci-dep-11', text: 'Sell unused items — target £200 this month', checked: false, order: 2, parentId: 'ci-dep-8', collapsed: false, depth: 2 },
      { id: 'ci-dep-12', text: 'Consider side income (freelance, overtime, etc.)', checked: false, order: 3, parentId: 'ci-dep-8', collapsed: false, depth: 2 },
      { id: 'ci-dep-13', text: 'Set a monthly extra payment target amount', checked: false, order: 2, parentId: 'ci-dep-6', collapsed: false, depth: 1 },
      { id: 'ci-dep-14', text: 'Call creditors to negotiate lower interest rates', checked: false, order: 3, parentId: 'ci-dep-6', collapsed: false, depth: 1 },

      { id: 'ci-dep-15', text: 'Execution Phase', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-dep-16', text: 'Pay minimum on all debts except target debt', checked: false, order: 0, parentId: 'ci-dep-15', collapsed: false, depth: 1 },
      { id: 'ci-dep-17', text: 'Send all extra money to target debt immediately', checked: false, order: 1, parentId: 'ci-dep-15', collapsed: false, depth: 1 },
      { id: 'ci-dep-18', text: 'Weekly Habits', checked: false, order: 2, parentId: 'ci-dep-15', collapsed: false, depth: 1 },
      { id: 'ci-dep-19', text: 'Check account balance every Monday', checked: false, order: 0, parentId: 'ci-dep-18', collapsed: false, depth: 2 },
      { id: 'ci-dep-20', text: 'No new credit card spending this week', checked: false, order: 1, parentId: 'ci-dep-18', collapsed: false, depth: 2 },
      { id: 'ci-dep-21', text: 'Log any extra income to add to payment', checked: false, order: 2, parentId: 'ci-dep-18', collapsed: false, depth: 2 },

      { id: 'ci-dep-22', text: 'Progress Milestones', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-dep-23', text: 'Celebrate every debt fully paid off (small reward)', checked: false, order: 0, parentId: 'ci-dep-22', collapsed: false, depth: 1 },
      { id: 'ci-dep-24', text: 'Roll freed minimum payment to next target debt', checked: false, order: 1, parentId: 'ci-dep-22', collapsed: false, depth: 1 },
      { id: 'ci-dep-25', text: 'Update total debt count and celebrate the drop', checked: false, order: 2, parentId: 'ci-dep-22', collapsed: false, depth: 1 },
      { id: 'ci-dep-26', text: 'Final: when debt-free, redirect payments to savings/investing', checked: false, order: 3, parentId: 'ci-dep-22', collapsed: false, depth: 1 },
    ]
  }
}
