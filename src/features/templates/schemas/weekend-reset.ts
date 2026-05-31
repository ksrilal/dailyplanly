import type { Template } from '@/features/templates/types'

export const weekendResetTemplate: Template = {
  id: 'tpl-042',
  slug: 'weekend-reset',
  title: 'Weekend Reset Checklist',
  description: 'Reset your home, mind, and week ahead. This Sunday reset covers home tidying, meal prep, admin catch-up, self-care, planning, and the small acts that make Monday mornings effortless.',
  category: 'productivity',
  type: 'checklist',
  featured: false,
  tags: ['weekend reset', 'Sunday routine', 'productivity', 'planning', 'home'],
  previewImage: '/templates/previews/weekend-reset.png',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: 'ci-wr-1', text: 'Do all laundry — wash, dry, fold and put away', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-2', text: 'Change bed sheets', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-3', text: 'Vacuum all floors', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-4', text: 'Clean bathrooms', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-5', text: 'Tidy and wipe down kitchen', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-6', text: 'Clear and reset all main surfaces', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-7', text: 'Grocery shop for the week', checked: false, order: 6, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-8', text: 'Meal prep for the week — batch cook lunches, chop veg', checked: false, order: 7, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-9', text: 'Plan the week — review calendar, block focus time', checked: false, order: 8, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-10', text: 'Write your top 3 goals for the coming week', checked: false, order: 9, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-11', text: 'Review last week — wins, lessons and unfinished tasks', checked: false, order: 10, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-12', text: 'Clear email inbox — process and file everything', checked: false, order: 11, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-13', text: 'Handle any personal admin — bills, appointments, forms', checked: false, order: 12, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-14', text: 'Tidy your workspace or desk', checked: false, order: 13, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-15', text: 'Lay out clothes for Monday', checked: false, order: 14, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-16', text: 'Pack your bag for Monday', checked: false, order: 15, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-17', text: 'Self-care: bath, skincare, haircare', checked: false, order: 16, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-18', text: 'Get outside for a walk or exercise', checked: false, order: 17, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-19', text: 'Connect with someone — call a friend or family member', checked: false, order: 18, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-20', text: 'Read for pleasure or watch something uplifting', checked: false, order: 19, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-21', text: 'Journal — reflect on the past week and look ahead', checked: false, order: 20, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-22', text: 'Charge all devices fully for the week', checked: false, order: 21, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wr-23', text: 'Set your alarm and sleep at a sensible time Sunday night', checked: false, order: 22, parentId: null, collapsed: false, depth: 0 },
    ]
  }
}
