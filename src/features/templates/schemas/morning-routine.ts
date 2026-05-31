import type { Template } from '@/features/templates/types'

export const morningRoutineTemplate: Template = {
  id: 'tpl-031',
  slug: 'morning-routine',
  title: 'Morning Routine Checklist',
  description: 'Start every morning with intention. This 25-step morning routine covers hydration, movement, mindset, nutrition, and planning so you show up as your best self every single day.',
  category: 'health-wellness',
  type: 'checklist',
  featured: false,
  tags: ['morning routine', 'habits', 'health', 'productivity', 'daily'],
  previewImage: '/templates/previews/morning-routine.png',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: 'ci-mr-1', text: 'Wake up at your set time — no snoozing', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-2', text: 'Drink a full glass of water (250 ml) immediately', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-3', text: 'Open curtains or go outside — get natural light exposure', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-4', text: 'Do not check phone for the first 30 minutes', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-5', text: 'Splash cold water on face or take a cold shower', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-6', text: 'Brush teeth and complete dental hygiene', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-7', text: 'Stretch or foam roll for 5–10 minutes', checked: false, order: 6, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-8', text: 'Complete morning workout or walk (20–45 min)', checked: false, order: 7, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-9', text: 'Do 5–10 minutes of breathwork or meditation', checked: false, order: 8, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-10', text: 'Write 3 things you are grateful for', checked: false, order: 9, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-11', text: 'Write your single most important intention for today', checked: false, order: 10, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-12', text: 'Review your goals and top priorities', checked: false, order: 11, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-13', text: 'Read or listen to something educational for 15–20 minutes', checked: false, order: 12, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-14', text: 'Prepare and eat a nutritious breakfast', checked: false, order: 13, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-15', text: 'Take any morning vitamins or supplements', checked: false, order: 14, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-16', text: 'Shower, moisturise and complete skincare routine', checked: false, order: 15, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-17', text: 'Get dressed — lay out clothes the night before if possible', checked: false, order: 16, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-18', text: 'Review your calendar for today\'s appointments', checked: false, order: 17, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-19', text: 'Write out your top 3 tasks for today', checked: false, order: 18, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-20', text: 'Check and respond to any urgent messages (10 min cap)', checked: false, order: 19, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-21', text: 'Pack your bag — laptop, charger, notebook, water bottle', checked: false, order: 20, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-22', text: 'Tidy the kitchen after breakfast', checked: false, order: 21, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-23', text: 'Make your bed', checked: false, order: 22, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-24', text: 'Set your phone to focus mode for the first work block', checked: false, order: 23, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mr-25', text: 'Leave for work / begin work on time', checked: false, order: 24, parentId: null, collapsed: false, depth: 0 },
    ]
  }
}
