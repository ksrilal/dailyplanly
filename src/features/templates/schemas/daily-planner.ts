import type { Template } from '@/features/templates/types'

export const dailyPlannerTemplate: Template = {
  id: 'tpl-001',
  slug: 'daily-planner',
  title: 'Daily Planner',
  description: 'A structured daily planner with priority blocks, hourly schedule, habit tracker, and reflection sections. Start every day with clarity and end it with a sense of accomplishment.',
  category: 'productivity',
  type: 'planner',
  featured: true,
  tags: ['daily', 'schedule', 'productivity', 'priorities', 'habits'],
  previewImage: '/templates/previews/daily-planner.png',
  plannerDefaults: {
    theme: 'minimal',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'focus', label: 'Top Priorities', order: 0, width: 'full',
        content: {
          items: [
            { label: 'Complete quarterly report draft', priority: 'high' },
            { label: 'Follow up with three client emails', priority: 'high' },
            { label: 'Review and approve team pull requests', priority: 'medium' },
            { label: 'Prepare slides for Friday presentation', priority: 'medium' },
            { label: 'Schedule dentist appointment', priority: 'low' },
          ]
        }
      },
      {
        id: 'b2', type: 'routine', label: 'Daily Schedule', order: 1, width: 'full',
        content: {
          slots: [
            { time: '06:00', label: 'Wake up · hydrate · 10-min stretch' },
            { time: '06:30', label: 'Morning walk or light workout' },
            { time: '07:15', label: 'Shower · breakfast · review today\'s plan' },
            { time: '08:00', label: 'Deep work block — highest priority task' },
            { time: '09:30', label: 'Email & Slack triage (25 min cap)' },
            { time: '10:00', label: 'Deep work block — second priority' },
            { time: '12:00', label: 'Lunch break · short walk' },
            { time: '13:00', label: 'Meetings & collaborative work' },
            { time: '15:00', label: 'Admin tasks · follow-ups · planning' },
            { time: '16:30', label: 'Review progress · update task list' },
            { time: '17:30', label: 'Shutdown ritual · close loops' },
            { time: '18:30', label: 'Personal time · family · exercise' },
            { time: '21:00', label: 'Wind-down · reading · no screens' },
            { time: '22:30', label: 'Sleep' },
          ]
        }
      },
      {
        id: 'b3', type: 'goal', label: 'Today\'s Main Goal', order: 2, width: 'half',
        content: {
          goal: 'Finish and submit the Q3 quarterly report',
          milestones: [
            { label: 'Pull all data from analytics dashboard', done: false },
            { label: 'Write executive summary section', done: false },
            { label: 'Complete financial breakdown table', done: false },
            { label: 'Add charts and visuals', done: false },
            { label: 'Proofread and send to manager', done: false },
          ]
        }
      },
      {
        id: 'b4', type: 'habit-tracker', label: 'Daily Habits', order: 3, width: 'half',
        content: {
          habits: [
            { label: '8 glasses of water' },
            { label: '30 min exercise' },
            { label: 'Read 20 pages' },
            { label: 'No social media before 10am' },
            { label: 'Gratitude journal entry' },
          ],
          days: 1
        }
      },
      {
        id: 'b5', type: 'notes', label: 'Notes & Ideas', order: 4, width: 'half',
        content: { lines: 8, text: '' }
      },
      {
        id: 'b6', type: 'dashboard-card', label: 'Today\'s Score', order: 5, width: 'half',
        content: { title: 'Tasks Completed', value: '0', unit: '/ 8', note: 'Update at end of day' }
      },
    ]
  }
}
