import type { Template } from '@/features/templates/types'

export const monthlyBudgetWorkflowTemplate: Template = {
  id: 'tpl-051',
  slug: 'monthly-budget-workflow',
  title: 'Monthly Budget Workflow',
  description: 'A complete month-start to month-end financial workflow covering income review, expense categorisation, savings allocation, debt payments, and financial habit review.',
  category: 'finance',
  type: 'checklist',
  featured: false,
  tags: ['budget', 'finance', 'money management', 'monthly', 'spending'],
  previewImage: '/templates/previews/monthly-budget-workflow.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-mbw-1', text: 'Month Start: Setup', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mbw-2', text: 'Review last month\'s budget performance', checked: false, order: 0, parentId: 'ci-mbw-1', collapsed: false, depth: 1 },
      { id: 'ci-mbw-3', text: 'List all confirmed income sources this month', checked: false, order: 1, parentId: 'ci-mbw-1', collapsed: false, depth: 1 },
      { id: 'ci-mbw-4', text: 'Set budget for each spending category', checked: false, order: 2, parentId: 'ci-mbw-1', collapsed: false, depth: 1 },
      { id: 'ci-mbw-5', text: 'Fixed Expenses', checked: false, order: 3, parentId: 'ci-mbw-1', collapsed: false, depth: 1 },
      { id: 'ci-mbw-6', text: 'Confirm rent/mortgage is scheduled', checked: false, order: 0, parentId: 'ci-mbw-5', collapsed: false, depth: 2 },
      { id: 'ci-mbw-7', text: 'List all direct debits and standing orders', checked: false, order: 1, parentId: 'ci-mbw-5', collapsed: false, depth: 2 },
      { id: 'ci-mbw-8', text: 'Check no subscriptions have auto-renewed unexpectedly', checked: false, order: 2, parentId: 'ci-mbw-5', collapsed: false, depth: 2 },

      { id: 'ci-mbw-9', text: 'Savings & Investments', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mbw-10', text: 'Transfer savings to dedicated savings account on payday', checked: false, order: 0, parentId: 'ci-mbw-9', collapsed: false, depth: 1 },
      { id: 'ci-mbw-11', text: 'Make pension / retirement contribution', checked: false, order: 1, parentId: 'ci-mbw-9', collapsed: false, depth: 1 },
      { id: 'ci-mbw-12', text: 'Invest planned amount in ISA or investment account', checked: false, order: 2, parentId: 'ci-mbw-9', collapsed: false, depth: 1 },
      { id: 'ci-mbw-13', text: 'Top up emergency fund if below target', checked: false, order: 3, parentId: 'ci-mbw-9', collapsed: false, depth: 1 },

      { id: 'ci-mbw-14', text: 'Variable Expense Tracking', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mbw-15', text: 'Log all spending weekly (not monthly at the end)', checked: false, order: 0, parentId: 'ci-mbw-14', collapsed: false, depth: 1 },
      { id: 'ci-mbw-16', text: 'Week 1 check-in — on track for all categories?', checked: false, order: 1, parentId: 'ci-mbw-14', collapsed: false, depth: 1 },
      { id: 'ci-mbw-17', text: 'Week 2 check-in — adjust any overspending categories', checked: false, order: 2, parentId: 'ci-mbw-14', collapsed: false, depth: 1 },
      { id: 'ci-mbw-18', text: 'Week 3 check-in — final third of month, stay disciplined', checked: false, order: 3, parentId: 'ci-mbw-14', collapsed: false, depth: 1 },
      { id: 'ci-mbw-19', text: 'Spending Categories Review', checked: false, order: 4, parentId: 'ci-mbw-14', collapsed: false, depth: 1 },
      { id: 'ci-mbw-20', text: 'Food & Groceries — within budget?', checked: false, order: 0, parentId: 'ci-mbw-19', collapsed: false, depth: 2 },
      { id: 'ci-mbw-21', text: 'Dining out & entertainment — within budget?', checked: false, order: 1, parentId: 'ci-mbw-19', collapsed: false, depth: 2 },
      { id: 'ci-mbw-22', text: 'Transport & fuel — within budget?', checked: false, order: 2, parentId: 'ci-mbw-19', collapsed: false, depth: 2 },
      { id: 'ci-mbw-23', text: 'Clothing & personal — within budget?', checked: false, order: 3, parentId: 'ci-mbw-19', collapsed: false, depth: 2 },

      { id: 'ci-mbw-24', text: 'Month End Review', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mbw-25', text: 'Total all spending vs total budgeted', checked: false, order: 0, parentId: 'ci-mbw-24', collapsed: false, depth: 1 },
      { id: 'ci-mbw-26', text: 'Calculate actual savings rate this month', checked: false, order: 1, parentId: 'ci-mbw-24', collapsed: false, depth: 1 },
      { id: 'ci-mbw-27', text: 'Note 1 thing that worked well in the budget', checked: false, order: 2, parentId: 'ci-mbw-24', collapsed: false, depth: 1 },
      { id: 'ci-mbw-28', text: 'Note 1 area to improve next month', checked: false, order: 3, parentId: 'ci-mbw-24', collapsed: false, depth: 1 },
      { id: 'ci-mbw-29', text: 'Set next month\'s budget based on learnings', checked: false, order: 4, parentId: 'ci-mbw-24', collapsed: false, depth: 1 },
    ]
  }
}
