import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from './_currency'

const emergencyFundPlannerTool: Tool = {
  id: 'emergency-fund-planner',
  slug: 'emergency-fund-planner',
  title: 'Emergency Fund Planner',
  description: 'Calculate exactly how much emergency fund you need and get a step-by-step savings plan to build your financial safety net in 6–12 months.',
  category: 'finance',
  icon: 'Shield',
  tags: ['emergency fund', 'savings', 'financial security', 'safety net', 'money'],
  relatedTemplateSlug: 'emergency-fund-planner',
  relatedTemplateCategory: 'finance',
  inputs: [
    CURRENCY_INPUT,
    { id: 'monthlyExpenses', type: 'number', label: 'Monthly Essential Expenses', placeholder: '2500', min: 0, step: 100, required: true, defaultValue: 2500, hint: 'Rent/mortgage + food + utilities + transport' },
    { id: 'months', type: 'select', label: 'Target Coverage (months)', required: true, defaultValue: '3',
      options: [
        { label: '1 month (starter fund)', value: '1' },
        { label: '3 months (standard)', value: '3' },
        { label: '6 months (recommended)', value: '6' },
        { label: '12 months (high security)', value: '12' },
      ] },
    { id: 'currentFund', type: 'number', label: 'Current Emergency Fund', placeholder: '0', min: 0, step: 100, required: false, defaultValue: 0 },
    { id: 'monthlyContribution', type: 'number', label: 'Monthly Contribution', placeholder: '300', min: 0, step: 50, required: true, defaultValue: 300 },
    { id: 'jobStability', type: 'select', label: 'Job / Income Stability', required: false, defaultValue: 'stable',
      options: [
        { label: 'Very stable (government, permanent contract)', value: 'stable' },
        { label: 'Moderate (private sector employment)', value: 'moderate' },
        { label: 'Variable (freelance, self-employed)', value: 'variable' },
        { label: 'High risk (startup, commission-based)', value: 'high-risk' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const monthlyExpenses = Number(inputs.monthlyExpenses) || 2500
    const targetMonths = Number(inputs.months) || 3
    const currentFund = Number(inputs.currentFund) || 0
    const monthlyContribution = Number(inputs.monthlyContribution) || 300
    const jobStability = String(inputs.jobStability || 'moderate')

    const targetAmount = monthlyExpenses * targetMonths
    const remaining = Math.max(targetAmount - currentFund, 0)
    const monthsToGoal = monthlyContribution > 0 ? Math.ceil(remaining / monthlyContribution) : 999

    const completionDate = new Date()
    completionDate.setMonth(completionDate.getMonth() + monthsToGoal)
    const completionStr = completionDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

    const stabilityRecommendation: Record<string, string> = {
      stable: 'With stable employment, 3 months is your minimum. 6 months gives comfortable security.',
      moderate: '6 months is the right target for most employed people in the private sector.',
      variable: 'As a freelancer/self-employed, aim for 6–12 months. Income gaps are unpredictable.',
      'high-risk': '12 months is strongly recommended. High-risk income needs a proportionally larger buffer.',
    }

    const weeklySchedule = [
      { week: 'Month 1', focus: 'Account setup', tasks: `Open dedicated high-yield savings account · transfer ${S}${monthlyContribution}`, notes: 'Name it "Emergency Fund — Do Not Touch"' },
      { week: `Month ${Math.ceil(monthsToGoal * 0.25)}`, focus: '25% milestone', tasks: `${S}${Math.round(targetAmount * 0.25).toLocaleString()} saved`, notes: 'Review and increase contribution if possible' },
      { week: `Month ${Math.ceil(monthsToGoal * 0.5)}`, focus: 'Halfway!', tasks: `${S}${Math.round(targetAmount * 0.5).toLocaleString()} saved`, notes: 'Celebrate — you\'re building real security' },
      { week: `Month ${monthsToGoal}`, focus: 'Goal achieved!', tasks: `${S}${targetAmount.toLocaleString()} fully funded`, notes: 'Redirect contributions to investments or other goals' },
    ]

    return {
      headline: `${S}${targetAmount.toLocaleString()} emergency fund in ${monthsToGoal} month${monthsToGoal !== 1 ? 's' : ''} — ${targetMonths} months coverage`,
      subheadline: `${S}${monthlyContribution}/month · Complete: ${monthsToGoal < 999 ? completionStr : 'Increase contribution to set timeline'}`,
      stats: [
        { label: 'Target Amount', value: `${S}${targetAmount.toLocaleString()}`, note: `${targetMonths} months of expenses` },
        { label: 'Already Saved', value: `${S}${currentFund.toLocaleString()}` },
        { label: 'Still Needed', value: `${S}${remaining.toLocaleString()}` },
        { label: 'Monthly Contribution', value: `${S}${monthlyContribution}` },
        { label: 'Months to Goal', value: monthsToGoal < 999 ? `${monthsToGoal} months` : 'Increase contribution' },
        { label: 'Target Date', value: monthsToGoal < 999 ? completionStr : '—' },
      ],
      milestones: [
        { label: `First ${S}${Math.round(targetAmount * 0.25).toLocaleString()} saved (25%)`, date: `Month ${Math.ceil(monthsToGoal * 0.25)}` },
        { label: `${S}${Math.round(targetAmount * 0.5).toLocaleString()} saved (50%)`, date: `Month ${Math.ceil(monthsToGoal * 0.5)}` },
        { label: `${S}${Math.round(targetAmount * 0.75).toLocaleString()} saved (75%)`, date: `Month ${Math.ceil(monthsToGoal * 0.75)}` },
        { label: `FULLY FUNDED — ${S}${targetAmount.toLocaleString()}!`, date: monthsToGoal < 999 ? completionStr : 'Increase contribution to set date' },
      ],
      weeklySchedule,
      checklists: [{
        title: 'Emergency Fund Checklist',
        items: [
          'Open a dedicated savings account — separate from everyday spending',
          'Name it clearly: "Emergency Fund" or "Safety Net"',
          `Set up automatic transfer of ${S}${monthlyContribution} on payday`,
          'Choose a high-yield savings account — get the best available rate',
          'Define what counts as an emergency (job loss, medical, major repair — not holidays)',
          'Tell no one the exact amount — it removes social pressure to spend it',
          'Review the fund annually — expenses change, so should the target',
          'Once funded, direct monthly contributions to investments or other goals',
        ],
      }],
      recommendations: [
        stabilityRecommendation[jobStability],
        `Your ${S}${monthlyContribution}/month contribution is ${monthlyContribution >= remaining / 6 ? 'on a solid timeline.' : 'good — consider increasing by 10–15% to reach your goal faster.'}`,
        'The emergency fund is not an investment — keep it liquid in a savings account, not stocks.',
        'Once your fund is complete, do NOT stop transferring the money. Redirect it to investments — the habit is worth keeping.',
        `Define your "emergency" criteria in advance. Most financial setbacks are not emergencies — the fund is for genuine crises only.`,
      ],
      nextActions: [
        `Open a high-yield savings account today — aim for the best available rate`,
        `Set up automatic transfer of ${S}${monthlyContribution} on your next payday`,
        'Name the account "Emergency Fund" to create psychological distance from the money',
        'Calculate your exact monthly essential expenses to verify the target amount',
      ],
    }
  },
}

export default emergencyFundPlannerTool
