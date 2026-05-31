import type { Template } from '@/features/templates/types'

export const runningPlannerTemplate: Template = {
  id: 'tpl-009',
  slug: 'running-planner',
  title: 'Running Planner',
  description: 'From 5K to marathon — this running planner covers training milestones, weekly run logging, pace tracking, and the daily habits that make the difference on race day.',
  category: 'health-wellness',
  type: 'planner',
  featured: false,
  tags: ['running', 'marathon', '5K', 'training', 'fitness'],
  previewImage: '/templates/previews/running-planner.png',
  plannerDefaults: {
    theme: 'soft-paper',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Running Goal', order: 0, width: 'full',
        content: {
          goal: 'Complete first half-marathon in under 2:10 in 16 weeks',
          milestones: [
            { label: 'Run 5K without stopping', done: true },
            { label: 'Complete 10K training run', done: false },
            { label: 'Run 15K long run', done: false },
            { label: 'Complete 18K practice run', done: false },
            { label: 'Race day — finish half-marathon', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'timeline', label: 'Training Milestones', order: 1, width: 'half',
        content: {
          events: [
            { label: 'Week 1–2: Base building (3–4 runs/week)', date: 'Weeks 1–2' },
            { label: 'First 10K training run', date: 'Week 3' },
            { label: 'Introduce tempo runs', date: 'Week 4' },
            { label: 'First 15K long run', date: 'Week 6' },
            { label: 'Peak training week', date: 'Week 12' },
            { label: 'Taper begins — reduce volume', date: 'Week 14' },
            { label: 'Race week preparation', date: 'Week 15' },
            { label: 'RACE DAY', date: 'Week 16' },
          ]
        }
      },
      {
        id: 'b3', type: 'routine', label: 'Weekly Run Schedule', order: 2, width: 'half',
        content: {
          slots: [
            { time: 'Monday', label: 'Rest or light yoga — recovery' },
            { time: 'Tuesday', label: 'Easy run — 5K at conversational pace' },
            { time: 'Wednesday', label: 'Tempo run — 4K at race pace effort' },
            { time: 'Thursday', label: 'Cross-training — cycling or swimming' },
            { time: 'Friday', label: 'Easy run — 6K comfortable pace' },
            { time: 'Saturday', label: 'Long run — 10–18K slow and steady' },
            { time: 'Sunday', label: 'Rest — foam roll and stretch' },
          ]
        }
      },
      {
        id: 'b4', type: 'table', label: 'Run Log', order: 3, width: 'full',
        content: {
          headers: ['Date', 'Type', 'Distance (km)', 'Time', 'Avg Pace (min/km)', 'How I Felt'],
          rows: [
            ['', 'Long run', '', '', '', ''],
            ['', 'Tempo', '', '', '', ''],
            ['', 'Easy run', '', '', '', ''],
            ['', 'Easy run', '', '', '', ''],
            ['', 'Long run', '', '', '', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Runner\'s Daily Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Follow training schedule' },
            { label: 'Stretch before & after runs' },
            { label: 'Drink 3L water' },
            { label: 'Sleep 8 hours' },
            { label: 'Eat carbs on long run days' },
          ],
          days: 7
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Training Notes', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
