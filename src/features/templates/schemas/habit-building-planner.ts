import type { Template } from '@/features/templates/types'

export const habitBuildingPlannerTemplate: Template = {
  id: 'tpl-011',
  slug: 'habit-building-planner',
  title: 'Habit Building Planner',
  description: 'Build lasting habits using a science-backed 30-day tracker, weekly review cadence, streak visualisation, and milestone system to keep motivation high through the habit formation curve.',
  category: 'health-wellness',
  type: 'planner',
  featured: false,
  tags: ['habits', 'routine', 'consistency', '30 day', 'behaviour change'],
  previewImage: '/templates/previews/habit-building-planner.png',
  plannerDefaults: {
    theme: 'wellness-calm',
    orientation: 'landscape',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Habit Goal', order: 0, width: 'half',
        content: {
          goal: 'Build a consistent morning routine — 30 days in a row',
          milestones: [
            { label: '7-day streak achieved', done: false },
            { label: '14-day streak — habit forming', done: false },
            { label: '21-day streak — solidifying', done: false },
            { label: '30-day streak — habit locked in', done: false },
            { label: 'Extend to 60-day maintenance phase', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Current Streak', order: 1, width: 'half',
        content: { title: 'Longest Streak', value: '0', unit: 'days', note: 'Update every morning' }
      },
      {
        id: 'b3', type: 'habit-tracker', label: '30-Day Habit Tracker', order: 2, width: 'full',
        content: {
          habits: [
            { label: 'Wake up at 6:00 AM' },
            { label: '10-minute meditation' },
            { label: 'Exercise or walk' },
            { label: 'Cold shower' },
            { label: 'Read 20 pages' },
            { label: 'No phone first 1 hour' },
            { label: 'Write 3 gratitudes' },
            { label: 'Healthy breakfast' },
            { label: 'Review daily goals' },
            { label: 'Sleep by 10:30 PM' },
          ],
          days: 30
        }
      },
      {
        id: 'b4', type: 'table', label: 'Weekly Habit Review', order: 3, width: 'full',
        content: {
          headers: ['Habit', 'Week 1 (days hit)', 'Week 2', 'Week 3', 'Week 4', 'Total / 28'],
          rows: [
            ['Wake at 6 AM', '', '', '', '', ''],
            ['Meditation', '', '', '', '', ''],
            ['Exercise', '', '', '', '', ''],
            ['Cold shower', '', '', '', '', ''],
            ['Reading', '', '', '', '', ''],
            ['Gratitude journal', '', '', '', '', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'timeline', label: 'Habit Milestones', order: 4, width: 'half',
        content: {
          events: [
            { label: 'Start date — commit to 30 days', date: 'Day 1' },
            { label: 'First week complete', date: 'Day 7' },
            { label: 'Halfway milestone — reward yourself', date: 'Day 15' },
            { label: '21 days — neurological habit forming', date: 'Day 21' },
            { label: '30-day challenge complete', date: 'Day 30' },
          ]
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Habit Notes & Reflections', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
