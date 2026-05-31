import type { Template } from '@/features/templates/types'

export const weightLossPlannerTemplate: Template = {
  id: 'tpl-007',
  slug: 'weight-loss-planner',
  title: 'Weight Loss Planner',
  description: 'A science-backed weight loss planner tracking measurements, nutrition windows, exercise consistency, and weekly progress — designed to build lasting healthy habits, not crash diets.',
  category: 'health-wellness',
  type: 'planner',
  featured: true,
  tags: ['weight loss', 'health', 'nutrition', 'fitness', 'measurements'],
  previewImage: '/templates/previews/weight-loss-planner.png',
  plannerDefaults: {
    theme: 'soft-paper',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'dashboard-card', label: 'Current Weight', order: 0, width: 'half',
        content: { title: 'This Week', value: '82.4', unit: 'kg', note: 'Weigh same day, same time' }
      },
      {
        id: 'b2', type: 'goal', label: 'Weight Loss Goal', order: 1, width: 'half',
        content: {
          goal: 'Reach 72kg — lose 10kg in 20 weeks',
          milestones: [
            { label: 'Lose first 2kg (80.4 kg)', done: false },
            { label: 'Reach 78kg halfway milestone', done: false },
            { label: 'Complete 8 consecutive workout weeks', done: false },
            { label: 'Lose 7kg total (75.4 kg)', done: false },
            { label: 'Hit goal weight of 72kg', done: false },
          ]
        }
      },
      {
        id: 'b3', type: 'table', label: 'Body Measurements', order: 2, width: 'full',
        content: {
          headers: ['Date', 'Weight (kg)', 'Waist (cm)', 'Hips (cm)', 'Chest (cm)', 'BMI'],
          rows: [
            ['Week 1', '82.4', '91', '102', '98', '27.2'],
            ['Week 2', '', '', '', '', ''],
            ['Week 3', '', '', '', '', ''],
            ['Week 4', '', '', '', '', ''],
            ['Week 6', '', '', '', '', ''],
            ['Week 8', '', '', '', '', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'routine', label: 'Daily Nutrition Schedule', order: 3, width: 'half',
        content: {
          slots: [
            { time: '07:00', label: 'Breakfast — 400 kcal · high protein' },
            { time: '10:00', label: 'Morning snack — fruit or nuts · 150 kcal' },
            { time: '13:00', label: 'Lunch — 500 kcal · lean protein + veg' },
            { time: '16:00', label: 'Afternoon snack — 150 kcal · no sugar' },
            { time: '19:00', label: 'Dinner — 450 kcal · light carbs after 6pm' },
            { time: '21:00', label: 'No eating after this time' },
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Health Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Stay within calorie target' },
            { label: 'Drink 2.5L of water' },
            { label: 'Exercise 45+ minutes' },
            { label: 'No processed sugar' },
            { label: 'Weigh and log food' },
            { label: '7+ hours sleep' },
          ],
          days: 7
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Weekly Review & Notes', order: 5, width: 'full',
        content: { lines: 5, text: '' }
      },
    ]
  }
}
