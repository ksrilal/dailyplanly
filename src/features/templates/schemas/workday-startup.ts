import type { Template } from '@/features/templates/types'

export const workdayStartupTemplate: Template = {
  id: 'tpl-043',
  slug: 'workday-startup',
  title: 'Workday Startup Checklist',
  description: 'Begin every workday with intention and structure. This startup ritual clears mental fog, sets your direction, and puts you in peak performance mode within the first 30 minutes.',
  category: 'work-office',
  type: 'checklist',
  featured: false,
  tags: ['workday', 'productivity', 'morning routine', 'work habits', 'startup ritual'],
  previewImage: '/templates/previews/workday-startup.png',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: 'ci-ws-1', text: 'Make coffee or tea — set the physical scene for focus', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-2', text: 'Clear your physical desk — only what you need today stays', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-3', text: 'Phone on silent / Do Not Disturb mode', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-4', text: 'Review yesterday\'s unfinished tasks', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-5', text: 'Check calendar — know every meeting and deadline today', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-6', text: 'Check email — triage only, respond to anything urgent', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-7', text: 'Check Slack/Teams — read any overnight messages', checked: false, order: 6, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-8', text: 'Update your task list for the day', checked: false, order: 7, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-9', text: 'Identify your single Most Important Task (MIT) today', checked: false, order: 8, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-10', text: 'Block time for your MIT — put it in the calendar', checked: false, order: 9, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-11', text: 'Identify any blockers — do you need anything from others?', checked: false, order: 10, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-12', text: 'Send any "I need this by X time" messages now', checked: false, order: 11, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-13', text: 'Close all browser tabs not relevant to today\'s work', checked: false, order: 12, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-14', text: 'Start your MIT — no further admin until first block is done', checked: false, order: 13, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-15', text: 'Update project board / task tracker if needed', checked: false, order: 14, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-16', text: 'Check in with your team lead or manager if needed', checked: false, order: 15, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-17', text: 'Plan a screen-free break at midday', checked: false, order: 16, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ws-18', text: 'Confirm your end-of-day shutdown time — stick to it', checked: false, order: 17, parentId: null, collapsed: false, depth: 0 },
    ]
  }
}
