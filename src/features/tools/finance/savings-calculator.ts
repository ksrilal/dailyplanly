import type { Tool } from '../types'

const savingsCalculator: Tool = {
  id: 'savings-calculator',
  slug: 'savings-calculator',
  title: 'Savings Calculator',
  description: 'Calculate how long it will take to reach your savings goal.',
  category: 'finance',
  hasExport: true,
  relatedTemplateId: 'daily-planner-minimal',
  tags: ['savings', 'finance', 'goal', 'calculator', 'money'],
  inputs: [
    { id: 'goal', type: 'number', label: 'Savings Goal', unit: '$', placeholder: '10000', required: true, min: 1 },
    { id: 'current', type: 'number', label: 'Current Savings', unit: '$', placeholder: '0', required: true, min: 0, defaultValue: 0 },
    { id: 'monthly', type: 'number', label: 'Monthly Contribution', unit: '$', placeholder: '500', required: true, min: 1 },
    { id: 'rate', type: 'number', label: 'Annual Interest Rate', unit: '%', placeholder: '4', required: false, min: 0, max: 100, defaultValue: 0 },
  ],
  calculate(inputs) {
    const goal = Number(inputs.goal) || 0
    const current = Number(inputs.current) || 0
    const monthly = Number(inputs.monthly) || 1
    const rate = (Number(inputs.rate) || 0) / 100 / 12

    if (current >= goal) {
      return { primary: 'Already reached!', secondary: `You have $${current.toLocaleString()} saved` }
    }

    let months = 0
    let balance = current
    while (balance < goal && months < 1200) {
      balance = balance * (1 + rate) + monthly
      months++
    }

    const years = Math.floor(months / 12)
    const rem = months % 12
    const timeStr = years > 0
      ? `${years} year${years > 1 ? 's' : ''}${rem > 0 ? ` ${rem} month${rem > 1 ? 's' : ''}` : ''}`
      : `${months} month${months > 1 ? 's' : ''}`

    return {
      primary: timeStr,
      secondary: `Final balance: $${Math.round(balance).toLocaleString()}`,
      sections: [
        { label: 'Time to reach goal', value: timeStr },
        { label: 'Total contributions', value: `$${(monthly * months).toLocaleString()}` },
        { label: 'Interest earned', value: `$${Math.round(balance - current - monthly * months).toLocaleString()}` },
      ],
      exportText: `Savings Goal: $${goal}\nTime to reach: ${timeStr}\nTotal contributions: $${(monthly * months).toLocaleString()}`,
    }
  },
}

export default savingsCalculator
