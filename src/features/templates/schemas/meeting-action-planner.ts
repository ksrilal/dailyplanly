import type { Template } from '@/features/templates/types'

export const meetingActionPlannerTemplate: Template = {
  id: 'tpl-030',
  slug: 'meeting-action-planner',
  title: 'Meeting & Action Planner',
  description: 'Run better meetings and follow through on every action item. Structure your agenda, capture decisions and action points, assign owners, and track progress in one clean planner.',
  category: 'work-office',
  type: 'planner',
  featured: false,
  tags: ['meetings', 'actions', 'agenda', 'work', 'team management'],
  previewImage: '/templates/previews/meeting-action-planner.png',
  plannerDefaults: {
    theme: 'minimal',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'focus', label: 'Meeting Agenda', order: 0, width: 'full',
        content: {
          items: [
            { label: 'Q3 website project status update (15 min)', priority: 'high' },
            { label: 'Marketing campaign budget approval (20 min)', priority: 'high' },
            { label: 'Team capacity review for Q4 planning (15 min)', priority: 'medium' },
            { label: 'Any other business — open floor (10 min)', priority: 'low' },
          ]
        }
      },
      {
        id: 'b2', type: 'routine', label: 'Today\'s Meeting Schedule', order: 1, width: 'half',
        content: {
          slots: [
            { time: '09:00', label: 'Daily standup — 15 min (all team)' },
            { time: '10:00', label: 'Website project check-in — Design + Dev (30 min)' },
            { time: '11:00', label: 'Marketing strategy meeting (60 min)' },
            { time: '14:00', label: 'Client call — ABC Corp (45 min)' },
            { time: '15:30', label: 'One-to-one with manager (30 min)' },
            { time: '16:30', label: 'Team retrospective (45 min)' },
          ]
        }
      },
      {
        id: 'b3', type: 'table', label: 'Action Items', order: 2, width: 'full',
        content: {
          headers: ['Action Item', 'Owner', 'Deadline', 'Priority', 'Status', 'Notes'],
          rows: [
            ['Send revised project timeline to client', 'Alex (PM)', 'Today EOD', 'High', 'Pending', ''],
            ['Approve design mockups and send feedback', 'Director', 'Tomorrow', 'High', 'Pending', ''],
            ['Update marketing budget spreadsheet', 'Finance', 'Friday', 'High', 'In Progress', ''],
            ['Book team offsite venue', 'HR', 'Next Wednesday', 'Medium', 'Not Started', ''],
            ['Draft Q4 capacity plan', 'Head of Eng', 'End of month', 'Medium', 'Not Started', ''],
            ['Create onboarding checklist for new hire', 'HR', 'Next Friday', 'Low', 'Not Started', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'goal', label: 'Meeting Outcome Goal', order: 3, width: 'half',
        content: {
          goal: 'Close all open action items from last 3 meetings this week',
          milestones: [
            { label: 'Review and list all overdue actions', done: false },
            { label: 'Chase owners of overdue items', done: false },
            { label: 'Get project timeline to client by EOD', done: false },
            { label: 'All actions from today logged', done: false },
            { label: 'Friday check-in — confirm all items closed', done: false },
          ]
        }
      },
      {
        id: 'b5', type: 'dashboard-card', label: 'Actions Completed', order: 4, width: 'half',
        content: { title: 'Actions Completed', value: '2', unit: '/ 8 open', note: 'This week' }
      },
      {
        id: 'b6', type: 'notes', label: 'Meeting Notes', order: 5, width: 'full',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
