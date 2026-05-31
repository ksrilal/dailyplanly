import type { Template } from '@/features/templates/types'

export const householdManagementPlannerTemplate: Template = {
  id: 'tpl-027',
  slug: 'household-management-planner',
  title: 'Household Management Planner',
  description: 'Run your home like a well-oiled machine. Track chores, assign responsibilities, manage shopping needs, build household habits, and never let home maintenance fall through the cracks.',
  category: 'family-home',
  type: 'planner',
  featured: false,
  tags: ['household', 'chores', 'home management', 'cleaning', 'family'],
  previewImage: '/templates/previews/household-management-planner.png',
  plannerDefaults: {
    theme: 'wellness-calm',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'focus', label: 'Household Priorities This Week', order: 0, width: 'full',
        content: {
          items: [
            { label: 'Deep clean kitchen and bathroom', priority: 'high' },
            { label: 'Book boiler service before winter', priority: 'high' },
            { label: 'Clear garage and donate unused items', priority: 'medium' },
            { label: 'Restock household cleaning supplies', priority: 'medium' },
            { label: 'Organise children\'s school paperwork', priority: 'low' },
          ]
        }
      },
      {
        id: 'b2', type: 'table', label: 'Chore Rota', order: 1, width: 'full',
        content: {
          headers: ['Task', 'Assigned To', 'Frequency', 'Last Done', 'Next Due', 'Done?'],
          rows: [
            ['Vacuum all floors', 'Sarah', 'Twice weekly', 'Monday', 'Thursday', ''],
            ['Mop kitchen & bathrooms', 'James', 'Weekly', 'Last Sunday', 'This Sunday', ''],
            ['Clean bathrooms (full)', 'Sarah', 'Weekly', 'Saturday', 'Next Saturday', ''],
            ['Kitchen deep clean', 'Both', 'Weekly', 'Sunday', 'Next Sunday', ''],
            ['Laundry — wash & fold', 'Ella (+ help)', 'As needed', 'Tuesday', 'Thursday', ''],
            ['Take bins out', 'James', 'Bin day (Tue)', 'Last Tuesday', 'This Tuesday', ''],
            ['Grocery shop', 'Sarah', 'Saturday AM', 'Last Saturday', 'This Saturday', ''],
            ['Garden maintenance', 'James', 'Fortnightly', '2 weeks ago', 'This weekend', ''],
          ]
        }
      },
      {
        id: 'b3', type: 'table', label: 'Household Needs & Shopping', order: 2, width: 'half',
        content: {
          headers: ['Item', 'Quantity', 'Priority', 'Bought?'],
          rows: [
            ['Washing-up liquid', '2 bottles', 'High', ''],
            ['Bleach', '1 bottle', 'High', ''],
            ['Toilet roll (24 pack)', '1', 'High', ''],
            ['Light bulbs (E27, 60W)', '4', 'Medium', ''],
            ['Kitchen sponges', '6-pack', 'Medium', ''],
            ['Bin bags (large)', '1 pack', 'Medium', ''],
            ['Fabric conditioner', '1 bottle', 'Low', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'habit-tracker', label: 'Household Habits', order: 3, width: 'half',
        content: {
          habits: [
            { label: 'Wipe kitchen surfaces after use' },
            { label: 'No dishes left overnight' },
            { label: 'Tidy living room before bed' },
            { label: 'Put things back in place' },
            { label: 'Check shopping needs daily' },
          ],
          days: 7
        }
      },
      {
        id: 'b5', type: 'dashboard-card', label: 'Tasks Done', order: 4, width: 'half',
        content: { title: 'Weekly Tasks Completed', value: '0', unit: '/ 12', note: 'Update as you go' }
      },
      {
        id: 'b6', type: 'notes', label: 'Home Notes', order: 5, width: 'half',
        content: { lines: 5, text: '' }
      },
    ]
  }
}
