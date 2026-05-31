import type { Template } from '@/features/templates/types'

export const deepWorkPlannerTemplate: Template = {
  id: 'tpl-005',
  slug: 'deep-work-planner',
  title: 'Deep Work Planner',
  description: 'Maximise your cognitive output with structured deep work sessions, distraction-free time blocks, session quality logging, and daily deep work habit reinforcement.',
  category: 'productivity',
  type: 'planner',
  featured: false,
  tags: ['deep work', 'focus', 'productivity', 'time blocking', 'cal newport'],
  previewImage: '/templates/previews/deep-work-planner.png',
  plannerDefaults: {
    theme: 'elegant-dark',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'focus', label: 'Deep Work Priorities', order: 0, width: 'full',
        content: {
          items: [
            { label: 'Write Chapter 4 of manuscript — 2,000 words', priority: 'high' },
            { label: 'Refactor authentication module — zero interruptions', priority: 'high' },
            { label: 'Design system architecture for new feature', priority: 'medium' },
            { label: 'Prepare keynote presentation narrative', priority: 'medium' },
            { label: 'Review and annotate research papers', priority: 'low' },
          ]
        }
      },
      {
        id: 'b2', type: 'routine', label: 'Deep Work Schedule', order: 1, width: 'full',
        content: {
          slots: [
            { time: '07:00', label: 'Pre-session ritual: review goal, silence notifications' },
            { time: '07:15', label: '🔴 DEEP WORK SESSION 1 (90 min) — Primary task' },
            { time: '08:45', label: 'Break: walk, hydrate, no phone' },
            { time: '09:00', label: '🔴 DEEP WORK SESSION 2 (90 min) — Primary task cont.' },
            { time: '10:30', label: 'Shallow work: email, Slack, admin (30 min)' },
            { time: '11:00', label: '🔴 DEEP WORK SESSION 3 (60 min) — Secondary task' },
            { time: '12:00', label: 'Lunch — screen-free' },
            { time: '13:00', label: '🔴 DEEP WORK SESSION 4 (90 min) — if needed' },
            { time: '14:30', label: 'Meetings / calls / collaboration' },
            { time: '16:00', label: 'Admin wrap-up · plan tomorrow' },
            { time: '17:00', label: 'Shutdown complete — no work thoughts after this' },
          ]
        }
      },
      {
        id: 'b3', type: 'dashboard-card', label: 'Deep Hours Today', order: 2, width: 'half',
        content: { title: 'Deep Work Hours', value: '0', unit: 'hrs', note: 'Target: 4 hours minimum' }
      },
      {
        id: 'b4', type: 'table', label: 'Session Log', order: 3, width: 'full',
        content: {
          headers: ['Session', 'Task', 'Duration', 'Quality (1-10)', 'Notes'],
          rows: [
            ['Session 1', '', '', '', ''],
            ['Session 2', '', '', '', ''],
            ['Session 3', '', '', '', ''],
            ['Session 4', '', '', '', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Deep Work Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Phone on DND during sessions' },
            { label: 'No email before 10am' },
            { label: 'Start with hardest task' },
            { label: 'Log session quality' },
            { label: 'Complete shutdown ritual' },
          ],
          days: 1
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Insights & Blockers', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
