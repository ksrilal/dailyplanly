import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from './_currency'

const budgetBuilder: Tool = {
  id: 'budget-builder',
  slug: 'budget-builder',
  title: 'Monthly Budget Builder',
  description: 'Enter your income and expenses to get a complete personalised monthly budget plan with the 50/30/20 breakdown, savings targets, and a spending optimisation checklist.',
  category: 'finance',
  icon: 'Wallet',
  featured: true,
  tags: ['budget', 'finance', 'spending', 'income', 'savings', 'money'],
  relatedTemplateSlug: 'monthly-budget-planner',
  relatedTemplateCategory: 'finance',
  inputs: [
    CURRENCY_INPUT,
    { id: 'income', type: 'number', label: 'Monthly Take-Home Income', placeholder: '3000', min: 0, step: 50, required: true, defaultValue: 3000 },
    { id: 'rent', type: 'number', label: 'Housing (rent/mortgage)', placeholder: '900', min: 0, step: 10, required: true, defaultValue: 900 },
    { id: 'utilities', type: 'number', label: 'Utilities & Bills', placeholder: '200', min: 0, step: 10, required: true, defaultValue: 200 },
    { id: 'food', type: 'number', label: 'Groceries & Food', placeholder: '300', min: 0, step: 10, required: true, defaultValue: 300 },
    { id: 'transport', type: 'number', label: 'Transport & Fuel', placeholder: '150', min: 0, step: 10, required: true, defaultValue: 150 },
    { id: 'subscriptions', type: 'number', label: 'Subscriptions & Entertainment', placeholder: '100', min: 0, step: 5, required: false, defaultValue: 100 },
    { id: 'other', type: 'number', label: 'Other Expenses', placeholder: '200', min: 0, step: 10, required: false, defaultValue: 200 },
    { id: 'savingsGoal', type: 'number', label: 'Monthly Savings Target', placeholder: '500', min: 0, step: 50, required: false, defaultValue: 500, hint: 'What you want to save each month' },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const income = Number(inputs.income) || 3000
    const rent = Number(inputs.rent) || 0
    const utilities = Number(inputs.utilities) || 0
    const food = Number(inputs.food) || 0
    const transport = Number(inputs.transport) || 0
    const subscriptions = Number(inputs.subscriptions) || 0
    const other = Number(inputs.other) || 0
    const savingsGoal = Number(inputs.savingsGoal) || 0

    const totalExpenses = rent + utilities + food + transport + subscriptions + other
    const remaining = income - totalExpenses
    const actualSavings = remaining - savingsGoal
    const savingsRate = income > 0 ? Math.round((remaining / income) * 100) : 0

    // 50/30/20 targets
    const target50 = income * 0.5
    const target30 = income * 0.3
    const target20 = income * 0.2

    const needsTotal = rent + utilities + food + transport
    const wantsTotal = subscriptions + other
    const needsPct = Math.round((needsTotal / income) * 100)
    const wantsPct = Math.round((wantsTotal / income) * 100)
    const savingsPct = Math.round((remaining / income) * 100)

    const status = remaining < 0 ? 'overspending' : savingsRate >= 20 ? 'healthy' : savingsRate >= 10 ? 'moderate' : 'tight'

    const weeklySchedule = [
      { week: 'Week 1', focus: 'Bills & fixed costs', tasks: `Pay rent (${S}${rent}), utilities (${S}${utilities})`, notes: 'Set up direct debits' },
      { week: 'Week 2', focus: 'Food & transport', tasks: `Grocery budget: ${S}${Math.round(food / 4)}/week · Transport: ${S}${Math.round(transport / 4)}/week`, notes: 'Track every spend' },
      { week: 'Week 3', focus: 'Discretionary', tasks: `Entertainment budget: ${S}${Math.round(subscriptions / 4)}/week · Other: ${S}${Math.round(other / 4)}/week`, notes: 'Review vs budget' },
      { week: 'Week 4', focus: 'Savings + review', tasks: `Transfer savings: ${S}${savingsGoal} · Review month total`, notes: 'Adjust next month' },
    ]

    return {
      headline: status === 'overspending'
        ? `Overspending by ${S}${Math.abs(remaining).toFixed(0)}/month — action needed`
        : `${S}${remaining.toFixed(0)} remaining after expenses · ${savingsRate}% savings rate`,
      subheadline: status === 'healthy'
        ? 'Great budget health! You\'re saving above the 20% target.'
        : status === 'moderate'
          ? 'Good foundation — small optimisations will get you to 20% savings.'
          : 'Immediate review recommended — expenses exceed income.',
      stats: [
        { label: 'Monthly Income', value: `${S}${income.toFixed(0)}` },
        { label: 'Total Expenses', value: `${S}${totalExpenses.toFixed(0)}` },
        { label: 'Remaining', value: `${S}${remaining.toFixed(0)}`, note: remaining < 0 ? 'Deficit!' : 'After all expenses' },
        { label: 'Savings Rate', value: `${savingsRate}%`, note: 'Target: 20%' },
        { label: `Needs (50% target: ${S}${target50.toFixed(0)})`, value: `${S}${needsTotal.toFixed(0)} (${needsPct}%)` },
        { label: `Wants (30% target: ${S}${target30.toFixed(0)})`, value: `${S}${wantsTotal.toFixed(0)} (${wantsPct}%)` },
      ],
      milestones: [
        { label: 'First month on budget — track every penny', date: 'Month 1' },
        { label: 'Reach 10% savings rate', date: status === 'healthy' ? 'Already achieved!' : 'Month 2–3' },
        { label: `Reach 20% savings rate (${S}${target20.toFixed(0)}/month)`, date: status === 'healthy' ? 'Already achieved!' : 'Month 3–6' },
        { label: '3-month emergency fund saved', date: `Month ${Math.ceil(income * 3 / Math.max(remaining, 1))}` },
        { label: 'Debt-free (if applicable)', date: 'Ongoing' },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Budget Launch Checklist',
          items: [
            'Set up dedicated savings account',
            `Automate savings transfer of ${S}${savingsGoal} on payday`,
            'Review and cancel unused subscriptions',
            'Set up spending alerts on your bank app',
            'Create spending categories in your bank',
            'Log every expense for the first 30 days',
            'Schedule monthly budget review (last Sunday of month)',
            ...(remaining < 0 ? [
              'URGENT: Identify and cut one major expense category',
              'Look for one additional income source this week',
            ] : []),
          ],
        },
        {
          title: 'Monthly Finance Habits',
          items: [
            'Check account balance every Monday',
            'Log all spending weekly (15 min Sunday review)',
            'No impulse purchases over a set amount without 24h wait',
            'Cook at home 5+ days per week',
            `Transfer ${S}${Math.round(food / 4)}/week to groceries envelope`,
            'Review subscriptions quarterly — cancel what you don\'t use',
            'Compare utility bills annually',
          ],
        },
      ],
      recommendations: [
        needsPct > 50 ? `Your needs (${needsPct}%) exceed the 50% guideline by ${S}${(needsTotal - target50).toFixed(0)}. Review housing and utilities — switching energy provider could save significantly per month.` : `Your needs spending (${needsPct}%) is within the 50% guideline.`,
        wantsPct > 30 ? `Wants (${wantsPct}%) are above the 30% target. Cutting ${S}${(wantsTotal - target30).toFixed(0)}/month would put you on track.` : `Discretionary spending looks controlled at ${wantsPct}%.`,
        savingsRate < 20 ? `To reach 20% savings (${S}${target20.toFixed(0)}/month), you need to save ${S}${(target20 - remaining).toFixed(0)} more monthly — review entertainment and subscriptions first.` : `Excellent! You\'re saving ${savingsRate}% — consider investing the surplus.`,
        `Review your ${subscriptions > 50 ? `${S}${subscriptions} in subscriptions — many people find 20–30% of subscription costs go unused.` : 'recurring costs annually.'}`,
      ],
      nextActions: [
        `Set up ${S}${savingsGoal} automatic transfer today`,
        'Review subscriptions — cancel anything unused this week',
        'Download your bank app and enable weekly spending summaries',
        'Set a calendar reminder: Monthly budget review on the last Sunday',
        remaining < 0 ? 'Book 30 minutes this weekend to identify your biggest discretionary spend' : 'Consider putting the surplus ${S}' + actualSavings.toFixed(0) + ' into investments',
      ],
    }
  },
}

export default budgetBuilder
