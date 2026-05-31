import type { Template } from '@/features/templates/types'

export const goalAchievementPlannerTemplate: Template = {
  id: 'tpl-004',
  slug: 'goal-achievement-planner',
  title: 'Goal Achievement Planner',
  description: 'A coach-designed goal planner with vision setting, milestone roadmap, daily habit tracking, and weekly review cadence to keep you on track until the finish line.',
  category: 'productivity',
  type: 'planner',
  featured: true,
  tags: ['goals', 'milestones', 'achievement', 'vision', 'habits'],
  previewImage: '/templates/previews/goal-achievement-planner.png',
  plannerDefaults: {
    theme: 'study-focus',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Primary Goal', order: 0, width: 'full',
        content: {
          goal: 'Run a full marathon in under 4 hours by December',
          milestones: [
            { label: 'Complete first 10K training run', done: false },
            { label: 'Finish first half-marathon distance', done: false },
            { label: 'Run 30K without stopping', done: false },
            { label: 'Complete a practice marathon', done: false },
            { label: 'Race day: finish under 4 hours', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'timeline', label: 'Goal Roadmap', order: 1, width: 'full',
        content: {
          events: [
            { label: 'Start 16-week training plan', date: 'Month 1' },
            { label: 'Complete first 10K run', date: 'Week 3' },
            { label: 'First half-marathon distance achieved', date: 'Week 6' },
            { label: 'Mid-point review & plan adjustment', date: 'Week 8' },
            { label: '30K long run completed', date: 'Week 11' },
            { label: 'Taper period begins', date: 'Week 13' },
            { label: 'Practice race — gauge pace', date: 'Week 14' },
            { label: 'Race day — full marathon', date: 'Week 16' },
          ]
        }
      },
      {
        id: 'b3', type: 'focus', label: 'This Week\'s Actions', order: 2, width: 'half',
        content: {
          items: [
            { label: 'Complete 3 scheduled training runs', priority: 'high' },
            { label: 'Track nutrition and hydration daily', priority: 'high' },
            { label: 'Do post-run stretching every session', priority: 'medium' },
            { label: 'Log mileage in running app', priority: 'medium' },
            { label: 'Buy proper running shoes', priority: 'low' },
          ]
        }
      },
      {
        id: 'b4', type: 'habit-tracker', label: 'Goal-Supporting Habits', order: 3, width: 'half',
        content: {
          habits: [
            { label: 'Follow training plan' },
            { label: 'Eat high-protein meals' },
            { label: 'Sleep 8 hours' },
            { label: 'Stretch & foam roll' },
            { label: 'Visualise race success' },
          ],
          days: 7
        }
      },
      {
        id: 'b5', type: 'dashboard-card', label: 'Progress', order: 4, width: 'half',
        content: { title: 'Goal Progress', value: '0', unit: '%', note: 'Update each Sunday' }
      },
      {
        id: 'b6', type: 'notes', label: 'Vision & Motivation', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
