import type { Template } from '@/features/templates/types'

export const homeOrganizationPlannerTemplate: Template = {
  id: 'tpl-028',
  slug: 'home-organization-planner',
  title: 'Home Organization Planner',
  description: 'Transform your home from cluttered to calm. Work through every room systematically with prioritised tasks, a declutter milestone tracker, and the daily tidy habits that keep chaos at bay.',
  category: 'family-home',
  type: 'planner',
  featured: false,
  tags: ['home organization', 'declutter', 'tidying', 'minimalism', 'home'],
  previewImage: '/templates/previews/home-organization-planner.png',
  plannerDefaults: {
    theme: 'soft-paper',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Organization Goal', order: 0, width: 'half',
        content: {
          goal: 'Completely declutter and organise the entire home in 8 weeks',
          milestones: [
            { label: 'Kitchen — fully decluttered and organised', done: false },
            { label: 'Living room — furniture arranged, clutter gone', done: false },
            { label: 'Master bedroom — wardrobe sorted, surfaces clear', done: false },
            { label: 'Children\'s rooms — toy organisation done', done: false },
            { label: 'Garage and storage — fully sorted', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'focus', label: 'This Week\'s Areas', order: 1, width: 'half',
        content: {
          items: [
            { label: 'Kitchen — empty and reorganise every cupboard', priority: 'high' },
            { label: 'Pantry — discard expired items, reorganise', priority: 'high' },
            { label: 'Kitchen drawers — sort utensils, remove junk drawer', priority: 'medium' },
            { label: 'Recycling and waste systems — new bins', priority: 'medium' },
            { label: 'Order kitchen storage containers and labels', priority: 'low' },
          ]
        }
      },
      {
        id: 'b3', type: 'table', label: 'Room-by-Room Progress', order: 2, width: 'full',
        content: {
          headers: ['Room', 'Tasks', 'Priority', 'Week', 'Status', 'Notes'],
          rows: [
            ['Kitchen', 'Declutter cupboards, deep clean, organise', 'High', 'Week 1', 'In Progress', ''],
            ['Living Room', 'Clear surfaces, sort media, rearrange furniture', 'High', 'Week 2', 'Not Started', ''],
            ['Master Bedroom', 'Wardrobe sort, bedside tables, under bed', 'High', 'Week 3', 'Not Started', ''],
            ['Bathroom', 'Medicine cabinet, products edit, deep clean', 'Medium', 'Week 3', 'Not Started', ''],
            ['Ella\'s Room', 'Toy sort, bookshelf, wardrobe', 'Medium', 'Week 4', 'Not Started', ''],
            ['Tom\'s Room', 'Toy declutter, under bed, clothes', 'Medium', 'Week 4', 'Not Started', ''],
            ['Home Office', 'Paperwork sort, cables, desk setup', 'Medium', 'Week 5', 'Not Started', ''],
            ['Hallway / Entry', 'Shoes, coats, keys, mail system', 'Low', 'Week 6', 'Not Started', ''],
            ['Garage', 'Tool sort, sport gear, donation pile', 'Low', 'Weeks 7–8', 'Not Started', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'timeline', label: 'Organization Milestones', order: 3, width: 'half',
        content: {
          events: [
            { label: 'Kitchen completely sorted', date: 'Week 1' },
            { label: 'Living areas done', date: 'Week 2' },
            { label: 'All bedrooms sorted', date: 'Week 4' },
            { label: 'Office and utility sorted', date: 'Week 6' },
            { label: 'Whole home — done!', date: 'Week 8' },
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Daily Tidy Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Put everything back in its place' },
            { label: '10-min daily reset before bed' },
            { label: 'Nothing on kitchen counters overnight' },
            { label: 'One item in = one item out' },
            { label: 'Donate bag in the car always' },
          ],
          days: 7
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Organization Notes', order: 5, width: 'full',
        content: { lines: 5, text: '' }
      },
    ]
  }
}
