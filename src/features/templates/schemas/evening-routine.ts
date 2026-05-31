import type { Template } from '@/features/templates/types'

export const eveningRoutineTemplate: Template = {
  id: 'tpl-032',
  slug: 'evening-routine',
  title: 'Evening Routine Checklist',
  description: 'End your day with intention and prepare for tomorrow. This evening routine covers shutdown, wind-down, preparation, reflection, and sleep hygiene to ensure you wake up refreshed.',
  category: 'health-wellness',
  type: 'checklist',
  featured: false,
  tags: ['evening routine', 'sleep', 'wind-down', 'habits', 'night routine'],
  previewImage: '/templates/previews/evening-routine.png',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: 'ci-er-1', text: 'Finish work at your set shutdown time — no overruns', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-2', text: 'Review what you accomplished today', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-3', text: 'Write down 3 wins from today (no matter how small)', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-4', text: 'Note any unfinished tasks and carry them forward', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-5', text: 'Preview tomorrow\'s calendar and to-do list', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-6', text: 'Lay out tomorrow\'s clothes', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-7', text: 'Pack bag and prepare anything needed for tomorrow', checked: false, order: 6, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-8', text: 'Tidy and reset your workspace or desk', checked: false, order: 7, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-9', text: 'Tidy the main living areas', checked: false, order: 8, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-10', text: 'Do the dishes or load the dishwasher', checked: false, order: 9, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-11', text: 'Wipe down kitchen surfaces', checked: false, order: 10, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-12', text: 'Eat a light, nutritious dinner — nothing heavy after 7pm', checked: false, order: 11, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-13', text: 'Stop eating at least 2–3 hours before bed', checked: false, order: 12, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-14', text: 'Turn off all screens 1 hour before bed', checked: false, order: 13, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-15', text: 'Dim lights in the home as the evening progresses', checked: false, order: 14, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-16', text: 'Take a warm shower or bath', checked: false, order: 15, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-17', text: 'Complete evening skincare routine', checked: false, order: 16, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-18', text: 'Brush and floss teeth', checked: false, order: 17, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-19', text: 'Read a physical book for 20–30 minutes', checked: false, order: 18, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-20', text: 'Do 5 minutes of light stretching or yoga', checked: false, order: 19, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-21', text: 'Journal — one reflection, one learning, one gratitude', checked: false, order: 20, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-22', text: 'Put phone on charge outside the bedroom', checked: false, order: 21, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-23', text: 'Set bedroom to cool temperature (16–18°C recommended)', checked: false, order: 22, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-24', text: 'Darken room — blackout curtains or sleep mask', checked: false, order: 23, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-25', text: 'Set alarm for tomorrow', checked: false, order: 24, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-er-26', text: 'Be in bed by your target sleep time', checked: false, order: 25, parentId: null, collapsed: false, depth: 0 },
    ]
  }
}
