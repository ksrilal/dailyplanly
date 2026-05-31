import type { Template } from '@/features/templates/types'

export const lifeVisionPlannerTemplate: Template = {
  id: 'tpl-025',
  slug: 'life-vision-planner',
  title: 'Life Vision Planner',
  description: 'Design the life you want to live. Clarify your vision across all key life areas, map a 5-year roadmap, build daily alignment habits, and review your journey quarterly.',
  category: 'lifestyle',
  type: 'planner',
  featured: false,
  tags: ['life vision', 'life goals', 'purpose', 'values', 'personal development'],
  previewImage: '/templates/previews/life-vision-planner.png',
  plannerDefaults: {
    theme: 'soft-paper',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Life Vision Statement', order: 0, width: 'full',
        content: {
          goal: 'Build a purposeful life where I am financially free, deeply healthy, doing meaningful work, and surrounded by people I love',
          milestones: [
            { label: 'Achieve financial independence (expenses covered by investments)', done: false },
            { label: 'Build a business around my expertise and passion', done: false },
            { label: 'Be at peak physical and mental health', done: false },
            { label: 'Have deep, nourishing relationships', done: false },
            { label: 'Contribute meaningfully to my community', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'table', label: 'Life Areas Vision Map', order: 1, width: 'full',
        content: {
          headers: ['Life Area', 'Current Reality', '5-Year Vision', 'This Year\'s Priority Action'],
          rows: [
            ['Career / Work', 'Software engineer at mid-size firm', 'Founder of a profitable product business', 'Launch first SaaS product with 50 paying users'],
            ['Finance', '£12,000 savings, no investments', '£100,000 invested, 6-month emergency fund', 'Max ISA, invest £500/month consistently'],
            ['Health', 'Sedentary, poor diet, overweight', 'Fit, strong, energy-rich, healthy weight', 'Gym 4x/week, clean diet 80%, sleep 8 hours'],
            ['Relationships', 'Disconnected from close friends', 'Rich social life, strong romantic partnership', 'Call a friend weekly, date nights monthly'],
            ['Personal Growth', 'No learning routine', 'Continuous learner, read 24 books/year', 'Read 30 min daily, learn one new skill'],
            ['Contribution', 'No giving back', 'Mentor 2 people, donate 5% of income', 'Volunteer monthly, start mentoring scheme'],
          ]
        }
      },
      {
        id: 'b3', type: 'focus', label: 'This Quarter\'s Life Priorities', order: 2, width: 'half',
        content: {
          items: [
            { label: 'Launch SaaS MVP — 10 beta users by end of quarter', priority: 'high' },
            { label: 'Invest £1,500 in index funds this quarter', priority: 'high' },
            { label: 'Establish gym + nutrition habit (30 days)', priority: 'medium' },
            { label: 'Schedule monthly friend dinners', priority: 'medium' },
            { label: 'Find and contact a mentor', priority: 'low' },
          ]
        }
      },
      {
        id: 'b4', type: 'habit-tracker', label: 'Daily Alignment Habits', order: 3, width: 'half',
        content: {
          habits: [
            { label: 'Morning intention setting' },
            { label: 'Work on life vision project' },
            { label: 'Exercise for health' },
            { label: 'Read or learn' },
            { label: 'Express gratitude' },
            { label: 'Connect meaningfully with someone' },
          ],
          days: 7
        }
      },
      {
        id: 'b5', type: 'timeline', label: '5-Year Life Roadmap', order: 4, width: 'full',
        content: {
          events: [
            { label: 'Year 1: Foundations — habits, savings, product built', date: '2025' },
            { label: 'Year 2: Momentum — product launched, fitness peak', date: '2026' },
            { label: 'Year 3: Growth — income diversified, investments compounding', date: '2027' },
            { label: 'Year 4: Scale — business profitable, travel freedom', date: '2028' },
            { label: 'Year 5: Freedom — financially independent, fully aligned life', date: '2029' },
          ]
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Vision Notes & Reflections', order: 5, width: 'full',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
