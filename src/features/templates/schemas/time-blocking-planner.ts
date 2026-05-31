import type { Template } from '@/features/templates/types'

export const timeBlockingPlannerTemplate: Template = {
  id: 'tpl-006',
  slug: 'time-blocking-planner',
  title: 'Time Blocking Planner',
  description: 'Every minute planned, nothing left to chance. Block your day in 30-minute increments, compare planned vs actual time use, and identify where your hours really go.',
  category: 'productivity',
  type: 'planner',
  featured: false,
  tags: ['time blocking', 'schedule', 'productivity', 'calendar', 'planning'],
  previewImage: '/templates/previews/time-blocking-planner.png',
  plannerDefaults: {
    theme: 'minimal',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'focus', label: 'Today\'s Priorities', order: 0, width: 'half',
        content: {
          items: [
            { label: 'Finish client proposal — 2 hours blocked', priority: 'high' },
            { label: 'Team standup and sync', priority: 'high' },
            { label: 'Code review for sprint tickets', priority: 'medium' },
            { label: 'Reply to pending emails', priority: 'medium' },
            { label: 'Update project board', priority: 'low' },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Productive Hours', order: 1, width: 'half',
        content: { title: 'Productive Hours', value: '0', unit: '/ 8 hrs', note: 'Track vs wasted time' }
      },
      {
        id: 'b3', type: 'routine', label: 'Time Blocks', order: 2, width: 'full',
        content: {
          slots: [
            { time: '06:00', label: 'Morning routine — exercise, breakfast, plan' },
            { time: '07:30', label: '[BLOCK] Deep work — client proposal' },
            { time: '08:00', label: '[BLOCK] Deep work — client proposal' },
            { time: '08:30', label: '[BLOCK] Deep work — client proposal' },
            { time: '09:00', label: '[BLOCK] Team standup' },
            { time: '09:30', label: '[BLOCK] Email & Slack triage' },
            { time: '10:00', label: '[BLOCK] Code review' },
            { time: '10:30', label: '[BLOCK] Code review' },
            { time: '11:00', label: '[BLOCK] Deep work — secondary task' },
            { time: '11:30', label: '[BLOCK] Deep work — secondary task' },
            { time: '12:00', label: 'Lunch — screen-free break' },
            { time: '13:00', label: '[BLOCK] Meetings / calls' },
            { time: '14:00', label: '[BLOCK] Admin & follow-ups' },
            { time: '14:30', label: '[BLOCK] Project board update' },
            { time: '15:00', label: '[BLOCK] Focused work block' },
            { time: '16:00', label: '[BLOCK] Wrap-up & tomorrow planning' },
            { time: '17:00', label: 'Shutdown — leave work at work' },
          ]
        }
      },
      {
        id: 'b4', type: 'table', label: 'Block Review', order: 3, width: 'full',
        content: {
          headers: ['Time', 'Planned', 'Actual', 'Match?', 'Notes'],
          rows: [
            ['07:30–09:00', 'Client proposal', '', '', ''],
            ['09:00–09:30', 'Standup', '', '', ''],
            ['09:30–10:00', 'Email triage', '', '', ''],
            ['10:00–12:00', 'Code review', '', '', ''],
            ['13:00–14:00', 'Meetings', '', '', ''],
            ['14:00–17:00', 'Deep work', '', '', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'notes', label: 'End-of-Day Review', order: 4, width: 'full',
        content: { lines: 5, text: '' }
      },
    ]
  }
}
