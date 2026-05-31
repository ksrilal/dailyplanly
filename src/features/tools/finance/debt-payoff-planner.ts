import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from './_currency'

const debtPayoffPlanner: Tool = {
  id: 'debt-payoff-planner',
  slug: 'debt-payoff-planner',
  title: 'Debt Payoff Planner',
  description: 'Enter your debts and get a complete payoff roadmap using the avalanche or snowball method, with monthly payment schedule, milestones, and freedom date.',
  category: 'finance',
  icon: 'CreditCard',
  tags: ['debt', 'payoff', 'finance', 'loan', 'credit card', 'snowball', 'avalanche'],
  relatedTemplateSlug: 'debt-payoff-planner',
  relatedTemplateCategory: 'finance',
  inputs: [
    CURRENCY_INPUT,
    { id: 'debt1', type: 'number', label: 'Debt 1 Balance', placeholder: '5000', min: 0, step: 100, required: true, defaultValue: 5000 },
    { id: 'rate1', type: 'number', label: 'Debt 1 Interest Rate', placeholder: '24.9', unit: '% APR', min: 0, max: 100, step: 0.1, required: true, defaultValue: 24.9 },
    { id: 'min1', type: 'number', label: 'Debt 1 Min Payment', placeholder: '100', min: 0, step: 10, required: true, defaultValue: 100 },
    { id: 'debt2', type: 'number', label: 'Debt 2 Balance (optional)', placeholder: '2000', min: 0, step: 100, required: false, defaultValue: 2000 },
    { id: 'rate2', type: 'number', label: 'Debt 2 Interest Rate', placeholder: '8.9', unit: '% APR', min: 0, max: 100, step: 0.1, required: false, defaultValue: 8.9 },
    { id: 'min2', type: 'number', label: 'Debt 2 Min Payment', placeholder: '50', min: 0, step: 10, required: false, defaultValue: 50 },
    { id: 'extra', type: 'number', label: 'Extra Monthly Payment', placeholder: '200', min: 0, step: 10, required: false, defaultValue: 200, hint: 'Amount above minimums you can add each month' },
    { id: 'method', type: 'select', label: 'Payoff Method', required: true, defaultValue: 'avalanche',
      options: [
        { label: 'Avalanche (highest interest first — saves most money)', value: 'avalanche' },
        { label: 'Snowball (smallest balance first — fastest wins)', value: 'snowball' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const debt1 = Number(inputs.debt1) || 5000
    const rate1 = Number(inputs.rate1) || 24.9
    const min1 = Number(inputs.min1) || 100
    const debt2 = Number(inputs.debt2) || 0
    const rate2 = Number(inputs.rate2) || 0
    const min2 = Number(inputs.min2) || 0
    const extra = Number(inputs.extra) || 0
    const method = String(inputs.method || 'avalanche')

    const totalDebt = debt1 + debt2
    const totalMin = min1 + min2
    const totalPayment = totalMin + extra

    // Simple approximation for months to payoff
    function monthsToPayoff(balance: number, annualRate: number, payment: number): number {
      if (payment <= 0 || balance <= 0) return 0
      const monthlyRate = annualRate / 100 / 12
      if (monthlyRate === 0) return Math.ceil(balance / payment)
      if (payment <= balance * monthlyRate) return 999
      return Math.ceil(-Math.log(1 - (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate))
    }

    const months1 = monthsToPayoff(debt1, rate1, min1 + extra)
    const months2 = debt2 > 0 ? monthsToPayoff(debt2, rate2, min2) : 0
    const maxMonths = Math.max(months1, months2)

    const completionDate = new Date()
    completionDate.setMonth(completionDate.getMonth() + maxMonths)
    const completionStr = completionDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

    const interest1 = Math.max(min1 * months1 - debt1, 0)
    const interest2 = debt2 > 0 ? Math.max(min2 * months2 - debt2, 0) : 0
    const totalInterest = interest1 + interest2

    const weeklySchedule = [
      { week: 'Month 1', focus: 'Setup', tasks: `Total payment: ${S}${totalPayment} · ${method} method targeting debt 1`, notes: 'Automate all payments' },
      { week: `Month ${Math.ceil(maxMonths * 0.3)}`, focus: '30% milestone', tasks: `${S}${(totalDebt * 0.7).toFixed(0)} remaining`, notes: 'Review for refinancing opportunities' },
      { week: `Month ${Math.ceil(maxMonths * 0.6)}`, focus: '60% milestone', tasks: `${S}${(totalDebt * 0.4).toFixed(0)} remaining`, notes: 'Snowball: roll freed payment to next debt' },
      { week: `Month ${maxMonths}`, focus: 'DEBT FREE', tasks: 'Final payment made — redirect to savings!', notes: 'Celebrate and invest what you were paying' },
    ]

    return {
      headline: `Debt-free in ${maxMonths} months — ${completionStr}`,
      subheadline: `Total debt: ${S}${totalDebt.toFixed(0)} · Monthly payment: ${S}${totalPayment} · Interest cost: ${S}${totalInterest.toFixed(0)}`,
      stats: [
        { label: 'Total Debt', value: `${S}${totalDebt.toFixed(0)}` },
        { label: 'Monthly Payment', value: `${S}${totalPayment}` },
        { label: 'Extra Payment', value: `${S}${extra}`, note: 'Above minimums' },
        { label: 'Debt-Free Date', value: completionStr },
        { label: 'Total Interest Paid', value: `${S}${totalInterest.toFixed(0)}` },
        { label: 'Method', value: method === 'avalanche' ? 'Avalanche' : 'Snowball' },
      ],
      milestones: [
        { label: `25% paid — ${S}${(totalDebt * 0.75).toFixed(0)} remaining`, date: `Month ${Math.ceil(maxMonths * 0.25)}` },
        { label: `50% paid — ${S}${(totalDebt * 0.5).toFixed(0)} remaining`, date: `Month ${Math.ceil(maxMonths * 0.5)}` },
        { label: `75% paid — ${S}${(totalDebt * 0.25).toFixed(0)} remaining`, date: `Month ${Math.ceil(maxMonths * 0.75)}` },
        { label: `DEBT FREE — ${S}${totalDebt.toFixed(0)} eliminated!`, date: completionStr },
      ],
      weeklySchedule,
      checklists: [{
        title: 'Debt Freedom Checklist',
        items: [
          'List all debts: balance, rate, minimum payment',
          'Set up automatic minimum payments on all debts',
          `Send ${S}${extra} extra to ${method === 'avalanche' ? 'highest-rate' : 'smallest-balance'} debt this month`,
          'Cancel any credit cards you\'re not using',
          `Keep ${S}${Math.min(totalMin, 500)} emergency fund before accelerating`,
          'Call lenders to negotiate lower interest rates',
          'Track net worth monthly — debt going down = net worth going up',
          'When a debt is cleared, roll its full payment to the next debt',
          `Celebrate each debt cleared — they matter`,
        ],
      }],
      recommendations: [
        method === 'avalanche' ? `Avalanche saves the most money — attack the ${rate1}% APR debt first.` : 'Snowball gives faster psychological wins — clear the smallest balance first for momentum.',
        extra > 0 ? `Your ${S}${extra} extra monthly payment will save you approximately ${Math.round(totalInterest * 0.3).toLocaleString()} in interest vs minimum payments only.` : `Even ${S}50 extra per month makes a significant difference — look for one expense to cut.`,
        `Total interest of ${S}${totalInterest.toFixed(0)} is the real cost of this debt — every extra payment reduces that number.`,
        'Once debt-free, redirect all payments into a savings/investment account for the same amount.',
      ],
      nextActions: [
        'Automate all minimum payments today',
        `Set up extra payment of ${S}${extra} to priority debt this month`,
        'Call your highest-rate lender and ask for a rate reduction',
        'Look for ${S}100 to cut from monthly budget to accelerate payoff',
      ],
    }
  },
}

export default debtPayoffPlanner
