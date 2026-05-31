import type { Template } from '@/features/templates/types'

export const expenseTrackerPlannerTemplate: Template = {
  id: 'tpl-014',
  slug: 'expense-tracker-planner',
  title: 'Expense Tracker Planner',
  description: 'Track every pound and dollar with daily expense logging, category breakdowns, visual spending patterns, and money habit tracking to eliminate financial blind spots.',
  category: 'finance',
  type: 'planner',
  featured: false,
  tags: ['expenses', 'spending', 'tracking', 'finance', 'money management'],
  previewImage: '/templates/previews/expense-tracker-planner.png',
  plannerDefaults: {
    theme: 'minimal',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'dashboard-card', label: 'Month Total', order: 0, width: 'half',
        content: { title: 'Total Spent This Month', value: '£0', unit: '', note: 'Update daily' }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Budget vs Actual', order: 1, width: 'half',
        content: { title: 'Budget Remaining', value: '£0', unit: '', note: 'Budget: £2,500/month' }
      },
      {
        id: 'b3', type: 'table', label: 'Daily Expense Log', order: 2, width: 'full',
        content: {
          headers: ['Date', 'Description', 'Category', 'Amount (£)', 'Payment Method'],
          rows: [
            ['', 'Grocery shop — Tesco', 'Food', '68.40', 'Debit card'],
            ['', 'Monthly gym membership', 'Health', '35.00', 'Direct debit'],
            ['', 'Lunch — Pret a Manger', 'Dining out', '8.50', 'Contactless'],
            ['', 'Spotify Premium', 'Subscriptions', '9.99', 'Card'],
            ['', 'Petrol fill-up', 'Transport', '55.00', 'Credit card'],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'table', label: 'Category Totals', order: 3, width: 'full',
        content: {
          headers: ['Category', 'Monthly Budget (£)', 'Spent to Date (£)', '% Used', 'Status'],
          rows: [
            ['Food & groceries', '350', '', '', ''],
            ['Dining out & coffee', '120', '', '', ''],
            ['Transport & fuel', '130', '', '', ''],
            ['Health & fitness', '80', '', '', ''],
            ['Subscriptions', '65', '', '', ''],
            ['Clothing', '80', '', '', ''],
            ['Entertainment', '100', '', '', ''],
            ['Miscellaneous', '75', '', '', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Money Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Log every expense same day' },
            { label: 'No impulse purchases over £20' },
            { label: 'Pack lunch instead of buying' },
            { label: 'Check bank balance daily' },
            { label: 'Use cash for discretionary spend' },
          ],
          days: 7
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Spending Notes', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
