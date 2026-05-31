import type { Template } from '@/features/templates/types'

export const personalGrowthPlannerTemplate: Template = {
  id: 'tpl-023',
  slug: 'personal-growth-planner',
  title: 'Personal Growth Planner',
  description: 'Invest in yourself with intention. Map your growth goals across all life areas, track skill development, build powerful daily habits, and measure the person you\'re becoming each week.',
  category: 'lifestyle',
  type: 'planner',
  featured: true,
  tags: ['personal development', 'growth', 'self-improvement', 'goals', 'mindset'],
  previewImage: '/templates/previews/personal-growth-planner.png',
  plannerDefaults: {
    theme: 'study-focus',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Growth Goal This Quarter', order: 0, width: 'half',
        content: {
          goal: 'Become a confident public speaker — deliver 5 talks by year-end',
          milestones: [
            { label: 'Join Toastmasters or similar group', done: true },
            { label: 'Deliver first 2-minute icebreaker speech', done: false },
            { label: 'Complete first 5-minute structured speech', done: false },
            { label: 'Speak at a work meeting voluntarily', done: false },
            { label: 'Deliver 15-minute keynote presentation', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'focus', label: 'Growth Focus This Week', order: 1, width: 'half',
        content: {
          items: [
            { label: 'Practise speech delivery in mirror 15 min', priority: 'high' },
            { label: 'Read chapter on storytelling frameworks', priority: 'high' },
            { label: 'Attend Toastmasters meeting', priority: 'medium' },
            { label: 'Record and review 5-min practice video', priority: 'medium' },
            { label: 'Journal on fear of judgement', priority: 'low' },
          ]
        }
      },
      {
        id: 'b3', type: 'habit-tracker', label: 'Growth Habits', order: 2, width: 'full',
        content: {
          habits: [
            { label: 'Practice speech / communication skill' },
            { label: 'Read personal development content' },
            { label: 'Do something uncomfortable' },
            { label: 'Reflect in journal' },
            { label: 'Connect with a mentor or role model' },
            { label: 'Learn something new (podcast / video)' },
            { label: 'Act with courage in one moment' },
          ],
          days: 7
        }
      },
      {
        id: 'b4', type: 'table', label: 'Skills & Growth Areas', order: 3, width: 'full',
        content: {
          headers: ['Growth Area', 'Current Level', 'Target Level', 'Actions This Month', 'Progress'],
          rows: [
            ['Public speaking', 'Beginner (1/10)', 'Competent (6/10)', 'Toastmasters + daily practice', ''],
            ['Leadership', 'Intermediate (5/10)', 'Strong (8/10)', 'Lead 2 projects, read book', ''],
            ['Writing / communication', 'Good (6/10)', 'Expert (9/10)', 'Write 500 words daily', ''],
            ['Financial literacy', 'Basic (3/10)', 'Solid (7/10)', 'Read 2 finance books', ''],
            ['Health & energy', 'Moderate (5/10)', 'Peak (8/10)', 'Sleep 8h, exercise daily', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'dashboard-card', label: 'Growth Score', order: 4, width: 'half',
        content: { title: 'Personal Growth Score', value: '—', unit: '/ 10', note: 'Rate yourself honestly each Sunday' }
      },
      {
        id: 'b6', type: 'notes', label: 'Reflections & Insights', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
