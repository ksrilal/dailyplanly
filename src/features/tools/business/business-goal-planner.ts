import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from '../finance/_currency'

const businessGoalPlanner: Tool = {
  id: 'business-goal-planner',
  slug: 'business-goal-planner',
  title: 'Business Goal Planner',
  description: 'Set a business goal and get a structured quarterly plan, weekly actions, KPI tracker, and milestone roadmap to grow your business with intention.',
  category: 'business',
  icon: 'BarChart2',
  featured: true,
  tags: ['business', 'goals', 'growth', 'strategy', 'planning', 'entrepreneur'],
  relatedTemplateSlug: 'project-planning-planner',
  relatedTemplateCategory: 'work-office',
  inputs: [
    CURRENCY_INPUT,
    { id: 'goal', type: 'text', label: 'Business Goal', placeholder: 'e.g. Reach 10,000/month revenue', required: true, defaultValue: 'Grow my business' },
    { id: 'currentRevenue', type: 'number', label: 'Current Monthly Revenue', placeholder: '2000', min: 0, step: 100, required: false, defaultValue: 2000 },
    { id: 'targetRevenue', type: 'number', label: 'Target Monthly Revenue', placeholder: '10000', min: 0, step: 500, required: false, defaultValue: 10000 },
    { id: 'businessType', type: 'select', label: 'Business Type', required: true, defaultValue: 'service',
      options: [
        { label: 'Service business (freelance, agency, consulting)', value: 'service' },
        { label: 'Product / e-commerce', value: 'product' },
        { label: 'SaaS / software', value: 'saas' },
        { label: 'Content / creator', value: 'content' },
        { label: 'Local / brick-and-mortar', value: 'local' },
      ] },
    { id: 'quarters', type: 'number', label: 'Quarters to Achieve Goal', placeholder: '4', unit: 'quarters', min: 1, max: 8, step: 1, required: true, defaultValue: 4 },
    { id: 'teamSize', type: 'select', label: 'Team Size', required: false, defaultValue: 'solo',
      options: [
        { label: 'Solo founder / solopreneur', value: 'solo' },
        { label: '2–5 people', value: 'small' },
        { label: '6–20 people', value: 'medium' },
        { label: '20+ people', value: 'large' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const goal = String(inputs.goal || 'Grow my business')
    const currentRevenue = Number(inputs.currentRevenue) || 0
    const targetRevenue = Number(inputs.targetRevenue) || 0
    const businessType = String(inputs.businessType || 'service')
    const quarters = Number(inputs.quarters) || 4
    const teamSize = String(inputs.teamSize || 'solo')

    const revenueGap = targetRevenue - currentRevenue
    const requiredGrowthPct = currentRevenue > 0 ? Math.round((revenueGap / currentRevenue) * 100) : 0
    const quarterlyGrowth = revenueGap / quarters
    const quarterlyGrowthPct = currentRevenue > 0 ? Math.round((quarterlyGrowth / currentRevenue) * 100) : 0

    const growthStrategies: Record<string, string[]> = {
      service: ['Raise prices by 20% for new clients', 'Add 1 new client per month', 'Create a premium or retainer offering', 'Launch a referral programme', 'Target a higher-value niche'],
      product: ['Launch paid advertising (Meta or Google Ads)', 'Add an email sequence to convert browsers', 'Introduce a subscription/bundle option', 'Improve product page conversion rate', 'Launch on a new marketplace (Etsy, Amazon)'],
      saas: ['Improve onboarding to reduce churn', 'Add annual billing option (20% discount)', 'Launch a freemium tier to top of funnel', 'Build an affiliate programme', 'Target a vertical niche'],
      content: ['Launch a paid newsletter or community', 'Add sponsored content partnerships', 'Create a digital product or course', 'Grow email list by 1,000 this quarter', 'Launch a Patreon or membership'],
      local: ['Optimise Google My Business listing', 'Launch a loyalty programme', 'Add online booking / order system', 'Introduce a referral discount', 'Run monthly local event or workshop'],
    }

    const weeklySchedule = Array.from({ length: quarters }, (_, i) => ({
      week: `Q${i + 1}`,
      focus: i === 0 ? 'Foundation & Launch' : i === quarters - 1 ? 'Scale & Optimise' : i < quarters / 2 ? 'Growth & Testing' : 'Compound & Refine',
      tasks: i === 0
        ? `Set KPIs · implement top growth strategy · weekly review`
        : `Monthly revenue target: ${S}${Math.round(currentRevenue + quarterlyGrowth * (i + 1)).toLocaleString()} · review metrics · iterate`,
      notes: i === 0 ? 'Focus on one growth lever, not many' : i === quarters - 1 ? 'Double down on what\'s working' : '',
    }))

    const kpis: Record<string, string[]> = {
      service: ['Monthly Revenue', 'Number of Active Clients', 'Average Project Value', 'Client Retention Rate', 'Leads Generated per Month'],
      product: ['Monthly Revenue', 'Units Sold', 'Average Order Value', 'Customer Acquisition Cost', 'Return Rate'],
      saas: ['MRR (Monthly Recurring Revenue)', 'Churn Rate', 'Customer Acquisition Cost', 'LTV:CAC Ratio', 'Active Users'],
      content: ['Monthly Revenue', 'Email Subscribers', 'Monthly Pageviews', 'Sponsor Revenue', 'Product Sales'],
      local: ['Monthly Revenue', 'Customer Count', 'Average Spend per Visit', 'New vs Returning Customers', 'Google Review Rating'],
    }

    return {
      headline: targetRevenue > 0
        ? `From ${S}${currentRevenue.toLocaleString()}/mo to ${S}${targetRevenue.toLocaleString()}/mo in ${quarters} quarter${quarters > 1 ? 's' : ''}`
        : `${goal} — ${quarters}-quarter roadmap`,
      subheadline: targetRevenue > 0
        ? `${requiredGrowthPct}% total growth · ${S}${Math.round(quarterlyGrowth).toLocaleString()} quarterly increase · ${quarterlyGrowthPct}% per quarter`
        : `${businessType} business · ${teamSize} · ${quarters} quarters`,
      stats: [
        { label: 'Current Revenue', value: `${S}${currentRevenue.toLocaleString()}/mo` },
        { label: 'Target Revenue', value: `${S}${targetRevenue.toLocaleString()}/mo` },
        { label: 'Revenue Gap', value: `${S}${revenueGap.toLocaleString()}` },
        { label: 'Quarterly Increase', value: `${S}${Math.round(quarterlyGrowth).toLocaleString()}` },
        { label: 'Timeline', value: `${quarters} quarters` },
        { label: 'Growth Required', value: `${requiredGrowthPct}%` },
      ],
      milestones: Array.from({ length: quarters }, (_, i) => ({
        label: `Q${i + 1} target: ${S}${Math.round(currentRevenue + quarterlyGrowth * (i + 1)).toLocaleString()}/month`,
        date: `Month ${(i + 1) * 3}`,
      })),
      weeklySchedule,
      checklists: [
        {
          title: 'Business Growth Checklist',
          items: [
            'Define your #1 growth metric for this quarter',
            'Set up a simple revenue tracking system (spreadsheet or tool)',
            'Identify your top 3 growth levers from the list below',
            'Block 2 hours per week for strategic business review',
            'Review KPIs weekly — revenue, leads, and retention',
            'Schedule quarterly business review (last week of each quarter)',
            teamSize !== 'solo' ? 'Align team on quarterly goals and individual targets' : 'Find an accountability partner or business mentor',
            'Set up automated follow-ups for leads and clients',
          ],
        },
        {
          title: `Growth Strategies for ${businessType.charAt(0).toUpperCase() + businessType.slice(1)} Business`,
          items: growthStrategies[businessType] || growthStrategies.service,
        },
        {
          title: `KPIs to Track Weekly`,
          items: kpis[businessType] || kpis.service,
        },
      ],
      recommendations: [
        `Focus on ONE growth lever at a time — most businesses fail by trying to do everything at once.`,
        requiredGrowthPct > 100 ? `${requiredGrowthPct}% growth is ambitious. Break it into smaller quarterly targets and validate your growth model before scaling.` : `${requiredGrowthPct}% growth is achievable with focused execution over ${quarters} quarters.`,
        `The fastest path to ${S}${targetRevenue.toLocaleString()}/mo is usually raising prices and improving retention — not finding more clients.`,
        teamSize === 'solo' ? 'As a solopreneur, your biggest constraint is time. Prioritise ruthlessly — one win per week compounds.' : 'With a team, alignment on the quarterly goal is more valuable than any strategy.',
      ],
      nextActions: [
        'Define your Q1 revenue target and write it down today',
        'Pick ONE growth strategy from the list and commit to it for 90 days',
        `Set up weekly revenue tracking — check every Monday morning`,
        'Schedule your first quarterly business review',
      ],
    }
  },
}

export default businessGoalPlanner
