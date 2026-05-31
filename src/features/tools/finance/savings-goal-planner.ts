import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from './_currency'

const savingsGoalPlanner: Tool = {
  id: 'savings-goal-planner',
  slug: 'savings-goal-planner',
  title: 'Savings Goal Planner',
  description: 'Set a savings target, enter your monthly contribution, and get a complete roadmap with milestones, monthly schedule, and a printable savings plan.',
  category: 'finance',
  icon: 'PiggyBank',
  featured: true,
  tags: ['savings', 'goal', 'finance', 'money', 'budget', 'roadmap'],
  relatedTemplateSlug: 'savings-goal-planner',
  relatedTemplateCategory: 'finance',
  inputs: [
    CURRENCY_INPUT,
    { id: 'goal', type: 'number', label: 'Savings Goal', placeholder: '10000', min: 100, step: 100, required: true, defaultValue: 10000 },
    { id: 'current', type: 'number', label: 'Already Saved', placeholder: '0', min: 0, step: 100, required: true, defaultValue: 0 },
    { id: 'monthly', type: 'number', label: 'Monthly Contribution', placeholder: '500', min: 1, step: 10, required: true, defaultValue: 500 },
    { id: 'rate', type: 'number', label: 'Annual Interest Rate', placeholder: '4.5', unit: '%', min: 0, max: 20, step: 0.1, required: false, defaultValue: 4.5, hint: 'Use 0 for no interest (basic savings account)' },
    { id: 'purpose', type: 'text', label: 'What are you saving for?', placeholder: 'House deposit, holiday, emergency fund…', required: false, defaultValue: 'My savings goal' },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const goal = Number(inputs.goal) || 10000
    const current = Number(inputs.current) || 0
    const monthly = Number(inputs.monthly) || 500
    const annualRate = Number(inputs.rate) || 0
    const purpose = String(inputs.purpose || 'My Savings Goal')
    const remaining = Math.max(goal - current, 0)
    const monthlyRate = annualRate / 100 / 12

    // Calculate months with compound interest
    let months = 0
    let balance = current
    if (monthlyRate > 0) {
      while (balance < goal && months < 600) {
        balance = balance * (1 + monthlyRate) + monthly
        months++
      }
    } else {
      months = monthly > 0 ? Math.ceil(remaining / monthly) : 999
      balance = current + monthly * months
    }

    const years = Math.floor(months / 12)
    const remMonths = months % 12
    const interestEarned = Math.max(balance - current - monthly * months, 0)
    const completionDate = new Date()
    completionDate.setMonth(completionDate.getMonth() + months)
    const completionStr = completionDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

    const durationLabel = years > 0
      ? `${years} year${years > 1 ? 's' : ''}${remMonths > 0 ? ` ${remMonths} month${remMonths > 1 ? 's' : ''}` : ''}`
      : `${months} month${months !== 1 ? 's' : ''}`

    // Milestone at 25%, 50%, 75%, 100%
    const milestones = [
      { pct: 25, label: `First 25% — ${S}${(goal * 0.25).toFixed(0)}` },
      { pct: 50, label: `Halfway — ${S}${(goal * 0.5).toFixed(0)}` },
      { pct: 75, label: `75% reached — ${S}${(goal * 0.75).toFixed(0)}` },
      { pct: 100, label: `Goal achieved — ${S}${goal.toFixed(0)}!` },
    ].map(({ pct, label }) => {
      const amountNeeded = goal * (pct / 100) - current
      const mMonths = monthlyRate > 0
        ? Math.ceil(Math.log(1 + (amountNeeded * monthlyRate) / monthly) / Math.log(1 + monthlyRate))
        : Math.ceil(amountNeeded / monthly)
      const d = new Date()
      d.setMonth(d.getMonth() + Math.max(mMonths, 0))
      return { label, date: d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) }
    })

    // Monthly schedule (first 12 months)
    const weeklySchedule = Array.from({ length: Math.min(months, 12) }, (_, i) => {
      let bal = current
      if (monthlyRate > 0) {
        for (let m = 0; m <= i; m++) bal = bal * (1 + monthlyRate) + monthly
      } else {
        bal = current + monthly * (i + 1)
      }
      const d = new Date()
      d.setMonth(d.getMonth() + i + 1)
      const pct = Math.min(Math.round((bal / goal) * 100), 100)
      return {
        week: d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
        focus: `${S}${monthly.toFixed(0)} deposit`,
        tasks: `Balance: ${S}${bal.toFixed(0)} (${pct}%)`,
        notes: i === 0 ? 'Set up standing order' : i === Math.min(months, 12) - 1 ? 'Review & adjust' : '',
      }
    })

    const exportText = `${purpose} — Savings Plan
${'═'.repeat(40)}
Goal: ${S}${goal.toFixed(0)}
Already saved: ${S}${current.toFixed(0)}
Monthly saving: ${S}${monthly.toFixed(0)}
Interest rate: ${annualRate}% p.a.
Time to goal: ${durationLabel}
Completion: ${completionStr}
Interest earned: ${S}${interestEarned.toFixed(0)}

MILESTONES
${milestones.map((m) => `• ${m.label} — ${m.date}`).join('\n')}

MONTHLY SCHEDULE
${weeklySchedule.map((r) => `${r.week}: ${r.tasks}`).join('\n')}

TIPS
• Set up an automatic standing order on payday
• Use a high-yield savings account
• Review progress every 3 months`

    return {
      headline: months < 999 ? `You'll reach ${S}${goal.toFixed(0)} in ${durationLabel}` : 'Increase your monthly contribution to reach this goal',
      subheadline: `Target date: ${completionStr} · Interest earned: ${S}${interestEarned.toFixed(0)}`,
      stats: [
        { label: 'Time to Goal', value: durationLabel },
        { label: 'Target Date', value: completionStr },
        { label: 'Total Saved', value: `${S}${Math.min(balance, goal + interestEarned).toFixed(0)}` },
        { label: 'Interest Earned', value: `${S}${interestEarned.toFixed(0)}`, note: annualRate > 0 ? `at ${annualRate}% p.a.` : 'No interest applied' },
        { label: 'Monthly Needed', value: `${S}${monthly.toFixed(0)}` },
        { label: 'Remaining', value: `${S}${remaining.toFixed(0)}` },
      ],
      milestones,
      weeklySchedule,
      checklists: [{
        title: 'Savings Launch Checklist',
        items: [
          'Open a dedicated high-yield savings account',
          `Set up standing order for ${S}${monthly.toFixed(0)} on payday`,
          'Name the account after your goal for motivation',
          'Set a calendar reminder to review progress monthly',
          'Tell someone about your goal for accountability',
          'Calculate if you can increase monthly contribution by 10%',
          'Set up round-up savings if your bank supports it',
        ],
      }],
      recommendations: [
        `Automating your ${S}${monthly.toFixed(0)}/month on payday removes willpower from the equation.`,
        annualRate < 4 ? 'Consider moving to a higher-yield account — even 1% extra saves time.' : `Your ${annualRate}% rate is solid. Shop around annually for better rates.`,
        `Increasing your contribution by just a small amount/month would save you approximately ${Math.round(months * 0.1)} months.`,
        'Treat your savings as a non-negotiable bill, not optional.',
      ],
      nextActions: [
        `Open or designate a savings account specifically for: ${purpose}`,
        `Set standing order: ${S}${monthly.toFixed(0)} on the 1st of each month`,
        `Mark target date in your calendar: ${completionStr}`,
        'Schedule first monthly review for next month',
      ],
      exportText,
    }
  },
}

export default savingsGoalPlanner
