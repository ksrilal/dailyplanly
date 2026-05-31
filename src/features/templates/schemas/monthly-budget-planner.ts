import type { Template } from '@/features/templates/types'

export const monthlyBudgetPlannerTemplate: Template = {
  id: 'tpl-013',
  slug: 'monthly-budget-planner',
  title: 'Monthly Budget Planner',
  description: 'Take full control of your monthly finances with income tracking, category-based expense budgeting, savings goal monitoring, and a financial habits system that builds wealth over time.',
  category: 'finance',
  type: 'planner',
  featured: true,
  tags: ['budget', 'finance', 'money', 'expenses', 'savings'],
  previewImage: '/templates/previews/monthly-budget-planner.png',
  plannerDefaults: {
    theme: 'study-focus',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'dashboard-card', label: 'Budget Status', order: 0, width: 'half',
        content: { title: 'Budget Remaining', value: '£0', unit: '', note: 'Income minus all expenses' }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Savings Rate', order: 1, width: 'half',
        content: { title: 'Savings Rate', value: '0', unit: '%', note: 'Target: 20% of income' }
      },
      {
        id: 'b3', type: 'table', label: 'Income', order: 2, width: 'full',
        content: {
          headers: ['Source', 'Expected (£)', 'Actual (£)', 'Difference (£)'],
          rows: [
            ['Primary salary', '3,200', '', ''],
            ['Freelance income', '400', '', ''],
            ['Side project / royalties', '150', '', ''],
            ['Investment dividends', '80', '', ''],
            ['TOTAL INCOME', '3,830', '', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'table', label: 'Expenses by Category', order: 3, width: 'full',
        content: {
          headers: ['Category', 'Budgeted (£)', 'Spent (£)', 'Remaining (£)'],
          rows: [
            ['Housing (rent/mortgage)', '950', '', ''],
            ['Utilities & bills', '180', '', ''],
            ['Groceries & food', '350', '', ''],
            ['Transport', '120', '', ''],
            ['Health & fitness', '80', '', ''],
            ['Entertainment & dining', '150', '', ''],
            ['Clothing & personal', '100', '', ''],
            ['Subscriptions', '65', '', ''],
            ['Savings & investments', '750', '', ''],
            ['Emergency fund top-up', '100', '', ''],
            ['Miscellaneous', '85', '', ''],
            ['TOTAL EXPENSES', '2,930', '', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'goal', label: 'Monthly Savings Goal', order: 4, width: 'half',
        content: {
          goal: 'Save £750 this month for holiday fund',
          milestones: [
            { label: 'First £200 saved by week 1', done: false },
            { label: 'Reach £500 by mid-month', done: false },
            { label: 'Hit £750 target by month-end', done: false },
            { label: 'No credit card spending this month', done: false },
            { label: 'Review and adjust next month\'s budget', done: false },
          ]
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Financial Notes', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
