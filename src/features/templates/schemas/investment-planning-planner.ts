import type { Template } from '@/features/templates/types'

export const investmentPlanningPlannerTemplate: Template = {
  id: 'tpl-018',
  slug: 'investment-planning-planner',
  title: 'Investment Planning Planner',
  description: 'Build long-term wealth with a structured investment planner covering portfolio allocation, monthly contribution tracking, milestone reviews, and the investor habits that compound over decades.',
  category: 'finance',
  type: 'planner',
  featured: false,
  tags: ['investing', 'portfolio', 'wealth', 'stocks', 'financial planning'],
  previewImage: '/templates/previews/investment-planning-planner.png',
  plannerDefaults: {
    theme: 'elegant-dark',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Investment Goal', order: 0, width: 'half',
        content: {
          goal: 'Grow investment portfolio to £100,000 in 7 years',
          milestones: [
            { label: 'Open ISA and pension accounts', done: true },
            { label: 'Reach £10,000 total invested', done: false },
            { label: 'Portfolio hits £25,000', done: false },
            { label: 'Reach £50,000 halfway milestone', done: false },
            { label: '£100,000 portfolio target achieved', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Portfolio Value', order: 1, width: 'half',
        content: { title: 'Current Portfolio Value', value: '£8,240', unit: '', note: 'Update quarterly' }
      },
      {
        id: 'b3', type: 'table', label: 'Portfolio Allocation', order: 2, width: 'full',
        content: {
          headers: ['Asset / Fund', 'Target %', 'Current Value (£)', 'Target Value (£)', 'Action'],
          rows: [
            ['Global Index Fund (VWRL)', '50%', '£4,120', '£50,000', 'Hold'],
            ['UK Gilts / Bonds', '15%', '£1,236', '£15,000', 'Buy more'],
            ['Emerging Markets ETF', '15%', '£1,236', '£15,000', 'Hold'],
            ['REITs (Property)', '10%', '£824', '£10,000', 'Hold'],
            ['Cash / High-yield savings', '10%', '£824', '£10,000', 'Rebalance'],
          ]
        }
      },
      {
        id: 'b4', type: 'timeline', label: 'Investment Milestones', order: 3, width: 'half',
        content: {
          events: [
            { label: 'Open Stocks & Shares ISA', date: 'Month 1' },
            { label: 'Set up monthly direct debits', date: 'Month 1' },
            { label: 'First annual review', date: 'Month 12' },
            { label: '£10,000 invested milestone', date: 'Year 1' },
            { label: 'Quarterly rebalancing', date: 'Ongoing' },
            { label: '£50,000 halfway milestone', date: 'Year 4' },
            { label: '£100,000 target reached', date: 'Year 7' },
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Investor Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Invest on payday (auto-transfer)' },
            { label: 'Read financial news 15 min' },
            { label: 'Don\'t check portfolio daily' },
            { label: 'Max ISA allowance this year' },
            { label: 'Review allocation quarterly' },
          ],
          days: 7
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Investment Strategy Notes', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
