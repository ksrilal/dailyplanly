import type { Template } from '@/features/templates/types'

export const familySchedulePlannerTemplate: Template = {
  id: 'tpl-026',
  slug: 'family-schedule-planner',
  title: 'Family Schedule Planner',
  description: 'Keep your whole family organised with a week-at-a-glance schedule, shared daily routines, family habit tracking, and monthly goal setting to strengthen your household together.',
  category: 'family-home',
  type: 'planner',
  featured: false,
  tags: ['family', 'schedule', 'children', 'home', 'household'],
  previewImage: '/templates/previews/family-schedule-planner.png',
  plannerDefaults: {
    theme: 'soft-paper',
    orientation: 'landscape',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'table', label: 'Family Weekly Schedule', order: 0, width: 'full',
        content: {
          headers: ['', 'Mum (Sarah)', 'Dad (James)', 'Ella (age 11)', 'Tom (age 8)'],
          rows: [
            ['Monday', 'Office 9–5 · gym 6pm', 'WFH · school run 3:30', 'School · piano 4pm', 'School · football 5pm'],
            ['Tuesday', 'WFH · dentist 2pm', 'Office 9–5', 'School · art club', 'School · reading'],
            ['Wednesday', 'Office 9–5', 'WFH · gym 7am', 'School · swimming 4pm', 'School · Scouts 6pm'],
            ['Thursday', 'WFH · yoga 6pm', 'Office 9–5', 'School · homework', 'School · football match 4pm'],
            ['Friday', 'Office 9–3 · early finish', 'WFH · early finish', 'School · playdate', 'School · screen time'],
            ['Saturday', 'Grocery shop AM', 'Garden / DIY', 'Gymnastics 10am', 'Football game 11am'],
            ['Sunday', 'Family roast lunch · meal prep', 'Kids\' homework help', 'Family walk', 'Family walk'],
          ]
        }
      },
      {
        id: 'b2', type: 'routine', label: 'Family Daily Rhythm', order: 1, width: 'half',
        content: {
          slots: [
            { time: '06:30', label: 'Parents wake up — coffee, quiet time' },
            { time: '07:00', label: 'Kids wake up — breakfast, get ready' },
            { time: '08:00', label: 'School run — depart by 8:05' },
            { time: '15:30', label: 'School pickup — snack ready at home' },
            { time: '16:00', label: 'After-school activities or homework' },
            { time: '18:00', label: 'Family dinner — everyone at the table' },
            { time: '19:00', label: 'Kids\' bedtime routine — bath, reading' },
            { time: '20:00', label: 'Kids in bed — parents\' evening time' },
            { time: '22:30', label: 'Parents\' bedtime' },
          ]
        }
      },
      {
        id: 'b3', type: 'habit-tracker', label: 'Family Habits', order: 2, width: 'half',
        content: {
          habits: [
            { label: 'Family dinner together' },
            { label: 'Kids read 20 min' },
            { label: 'No screens at dinner' },
            { label: 'Bedtime on schedule' },
            { label: 'One family activity' },
          ],
          days: 7
        }
      },
      {
        id: 'b4', type: 'goal', label: 'Family Goal This Month', order: 3, width: 'half',
        content: {
          goal: 'Build stronger family connections through shared activities',
          milestones: [
            { label: 'Plan and book family day out', done: false },
            { label: 'Start Friday movie night tradition', done: false },
            { label: 'Cook a meal together as a family', done: false },
            { label: 'Take a technology-free afternoon', done: false },
          ]
        }
      },
      {
        id: 'b5', type: 'notes', label: 'Family Notes', order: 4, width: 'half',
        content: { lines: 5, text: '' }
      },
    ]
  }
}
