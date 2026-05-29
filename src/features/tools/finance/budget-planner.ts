import type { Tool } from '../types'

const budgetPlanner: Tool = {
  id: 'budget-planner',
  slug: 'budget-planner',
  title: 'Monthly Budget Planner',
  description: 'Plan your monthly budget using the 50/30/20 rule.',
  category: 'finance',
  hasExport: true,
  tags: ['budget', 'finance', 'monthly', '50-30-20', 'planning'],
  inputs: [
    { id: 'income', type: 'number', label: 'Monthly Net Income', unit: '$', placeholder: '4000', required: true, min: 1 },
    { id: 'needs', type: 'number', label: 'Needs %', unit: '%', placeholder: '50', required: false, min: 0, max: 100, defaultValue: 50 },
    { id: 'wants', type: 'number', label: 'Wants %', unit: '%', placeholder: '30', required: false, min: 0, max: 100, defaultValue: 30 },
  ],
  calculate(inputs) {
    const income = Number(inputs.income) || 0
    const needsPct = Number(inputs.needs) || 50
    const wantsPct = Number(inputs.wants) || 30
    const savingsPct = Math.max(0, 100 - needsPct - wantsPct)

    const needs = Math.round(income * needsPct / 100)
    const wants = Math.round(income * wantsPct / 100)
    const savings = Math.round(income * savingsPct / 100)

    return {
      primary: `$${savings.toLocaleString()} / month to save`,
      secondary: `Based on $${income.toLocaleString()} income`,
      sections: [
        { label: `Needs (${needsPct}%)`, value: `$${needs.toLocaleString()}`, note: 'Rent, groceries, utilities' },
        { label: `Wants (${wantsPct}%)`, value: `$${wants.toLocaleString()}`, note: 'Dining, entertainment, hobbies' },
        { label: `Savings (${savingsPct}%)`, value: `$${savings.toLocaleString()}`, note: 'Emergency fund, investments' },
      ],
      exportText: `Monthly Budget\nIncome: $${income}\nNeeds: $${needs}\nWants: $${wants}\nSavings: $${savings}`,
    }
  },
}

export default budgetPlanner
