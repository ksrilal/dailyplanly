import type { Template } from '@/features/templates/types'

export const weeklyPlannerTemplate: Template = {
  id: 'tpl-002',
  slug: 'weekly-planner',
  title: 'Weekly Planner',
  description: 'Plan your entire week at a glance. Set weekly goals, track daily focus areas, review habit streaks, and measure your week\'s performance with a built-in review system.',
  category: 'productivity',
  type: 'planner',
  featured: true,
  tags: ['weekly', 'goals', 'habits', 'review', 'productivity'],
  previewImage: '/templates/previews/weekly-planner.png',
  plannerDefaults: {
    theme: 'wellness-calm',
    orientation: 'landscape',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Weekly Goal', order: 0, width: 'half',
        content: {
          goal: 'Launch the new product landing page',
          milestones: [
            { label: 'Finalise copy and headlines', done: false },
            { label: 'Complete mobile responsive design', done: false },
            { label: 'Integrate analytics and tracking', done: false },
            { label: 'QA test across browsers', done: false },
            { label: 'Get sign-off from stakeholders', done: false },
            { label: 'Deploy to production', done: false },
            { label: 'Send launch announcement email', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Week Score', order: 1, width: 'half',
        content: { title: 'Week Productivity Score', value: '—', unit: '/ 10', note: 'Rate your week on Sunday evening' }
      },
      {
        id: 'b3', type: 'table', label: 'Weekly Overview', order: 2, width: 'full',
        content: {
          headers: ['Day', 'Main Focus', 'Key Tasks', 'Completed'],
          rows: [
            ['Monday', 'Deep work — copywriting', 'Write all page sections, review brand voice', ''],
            ['Tuesday', 'Design & development', 'Build layout, hero section, mobile breakpoints', ''],
            ['Wednesday', 'Integration day', 'Analytics setup, form testing, CMS content', ''],
            ['Thursday', 'QA & review', 'Cross-browser testing, stakeholder walkthrough', ''],
            ['Friday', 'Launch prep', 'Final fixes, deployment, announcement email', ''],
            ['Saturday', 'Catch-up & rest', 'Handle overflow, personal errands', ''],
            ['Sunday', 'Weekly review', 'Reflect, plan next week, reset workspace', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'habit-tracker', label: 'Weekly Habits', order: 3, width: 'full',
        content: {
          habits: [
            { label: 'Exercise 30+ minutes' },
            { label: 'Read before bed' },
            { label: 'No screens after 10 PM' },
            { label: 'Drink 8 glasses of water' },
            { label: 'Meditate / breathwork' },
            { label: 'Eat home-cooked meals' },
            { label: 'Connect with a friend or family member' },
          ],
          days: 7
        }
      },
      {
        id: 'b5', type: 'notes', label: 'Weekly Notes & Reflections', order: 4, width: 'full',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
