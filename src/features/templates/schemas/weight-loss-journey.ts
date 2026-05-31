import type { Template } from '@/features/templates/types'

export const weightLossJourneyTemplate: Template = {
  id: 'tpl-046',
  slug: 'weight-loss-journey',
  title: 'Weight Loss Journey System',
  description: 'A complete weight loss system covering goal setting, nutrition planning, exercise programming, habit tracking, and weekly reviews — structured across four levels for total accountability.',
  category: 'health-wellness',
  type: 'checklist',
  featured: true,
  tags: ['weight loss', 'health', 'nutrition', 'fitness', 'system'],
  previewImage: '/templates/previews/weight-loss-journey.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-wlj-1', text: 'Goal Setting', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wlj-2', text: 'Set current weight and target weight', checked: false, order: 0, parentId: 'ci-wlj-1', collapsed: false, depth: 1 },
      { id: 'ci-wlj-3', text: 'Calculate weekly deficit target (0.5–1 kg/week)', checked: false, order: 1, parentId: 'ci-wlj-1', collapsed: false, depth: 1 },
      { id: 'ci-wlj-4', text: 'Set a 12-week milestone goal', checked: false, order: 2, parentId: 'ci-wlj-1', collapsed: false, depth: 1 },
      { id: 'ci-wlj-5', text: 'Define your "why" — write it where you see it daily', checked: false, order: 3, parentId: 'ci-wlj-1', collapsed: false, depth: 1 },
      { id: 'ci-wlj-6', text: 'Take starting photos and measurements', checked: false, order: 4, parentId: 'ci-wlj-1', collapsed: false, depth: 1 },

      { id: 'ci-wlj-7', text: 'Nutrition', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wlj-8', text: 'Calculate daily calorie target', checked: false, order: 0, parentId: 'ci-wlj-7', collapsed: false, depth: 1 },
      { id: 'ci-wlj-9', text: 'Set protein target (1.8–2.2 g per kg bodyweight)', checked: false, order: 1, parentId: 'ci-wlj-7', collapsed: false, depth: 1 },
      { id: 'ci-wlj-10', text: 'Meal Planning', checked: false, order: 2, parentId: 'ci-wlj-7', collapsed: false, depth: 1 },
      { id: 'ci-wlj-11', text: 'Plan 7 breakfasts under 400 kcal each', checked: false, order: 0, parentId: 'ci-wlj-10', collapsed: false, depth: 2 },
      { id: 'ci-wlj-12', text: 'Plan 7 lunches — high protein, lots of veg', checked: false, order: 1, parentId: 'ci-wlj-10', collapsed: false, depth: 2 },
      { id: 'ci-wlj-13', text: 'Plan 7 dinners — lean protein, no refined carbs after 7pm', checked: false, order: 2, parentId: 'ci-wlj-10', collapsed: false, depth: 2 },
      { id: 'ci-wlj-14', text: 'Plan healthy snacks (nuts, fruit, yoghurt)', checked: false, order: 3, parentId: 'ci-wlj-10', collapsed: false, depth: 2 },
      { id: 'ci-wlj-15', text: 'Food Logging', checked: false, order: 3, parentId: 'ci-wlj-7', collapsed: false, depth: 1 },
      { id: 'ci-wlj-16', text: 'Download calorie tracking app (MyFitnessPal / Cronometer)', checked: false, order: 0, parentId: 'ci-wlj-15', collapsed: false, depth: 2 },
      { id: 'ci-wlj-17', text: 'Log every meal consistently for first 4 weeks', checked: false, order: 1, parentId: 'ci-wlj-15', collapsed: false, depth: 2 },
      { id: 'ci-wlj-18', text: 'Weigh food for accuracy (first 2 weeks)', checked: false, order: 2, parentId: 'ci-wlj-15', collapsed: false, depth: 2 },

      { id: 'ci-wlj-19', text: 'Exercise', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wlj-20', text: 'Cardio Programme', checked: false, order: 0, parentId: 'ci-wlj-19', collapsed: false, depth: 1 },
      { id: 'ci-wlj-21', text: 'Week 1–2: 3 × 30-min brisk walks', checked: false, order: 0, parentId: 'ci-wlj-20', collapsed: false, depth: 2 },
      { id: 'ci-wlj-22', text: 'Week 3–4: Add 2 × 20-min cycling sessions', checked: false, order: 1, parentId: 'ci-wlj-20', collapsed: false, depth: 2 },
      { id: 'ci-wlj-23', text: 'Week 5+: Introduce 2 × 25-min HIIT sessions', checked: false, order: 2, parentId: 'ci-wlj-20', collapsed: false, depth: 2 },
      { id: 'ci-wlj-24', text: 'Strength Training', checked: false, order: 1, parentId: 'ci-wlj-19', collapsed: false, depth: 1 },
      { id: 'ci-wlj-25', text: 'Full-body resistance workout 2–3× per week', checked: false, order: 0, parentId: 'ci-wlj-24', collapsed: false, depth: 2 },
      { id: 'ci-wlj-26', text: 'Include compound movements (squats, deadlifts, rows)', checked: false, order: 1, parentId: 'ci-wlj-24', collapsed: false, depth: 2 },
      { id: 'ci-wlj-27', text: 'Progressive overload — increase weight weekly', checked: false, order: 2, parentId: 'ci-wlj-24', collapsed: false, depth: 2 },
      { id: 'ci-wlj-28', text: 'Daily Activity', checked: false, order: 2, parentId: 'ci-wlj-19', collapsed: false, depth: 1 },
      { id: 'ci-wlj-29', text: 'Hit 8,000–10,000 steps daily', checked: false, order: 0, parentId: 'ci-wlj-28', collapsed: false, depth: 2 },
      { id: 'ci-wlj-30', text: 'Take stairs instead of lifts', checked: false, order: 1, parentId: 'ci-wlj-28', collapsed: false, depth: 2 },
      { id: 'ci-wlj-31', text: 'Stand or walk during phone calls', checked: false, order: 2, parentId: 'ci-wlj-28', collapsed: false, depth: 2 },

      { id: 'ci-wlj-32', text: 'Weekly Habits', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wlj-33', text: 'Weigh in same day, same time each week', checked: false, order: 0, parentId: 'ci-wlj-32', collapsed: false, depth: 1 },
      { id: 'ci-wlj-34', text: 'Take weekly progress photos', checked: false, order: 1, parentId: 'ci-wlj-32', collapsed: false, depth: 1 },
      { id: 'ci-wlj-35', text: 'Drink 2.5 litres of water daily', checked: false, order: 2, parentId: 'ci-wlj-32', collapsed: false, depth: 1 },
      { id: 'ci-wlj-36', text: 'Sleep 7–8 hours every night', checked: false, order: 3, parentId: 'ci-wlj-32', collapsed: false, depth: 1 },
      { id: 'ci-wlj-37', text: 'Meal prep on Sunday for the week ahead', checked: false, order: 4, parentId: 'ci-wlj-32', collapsed: false, depth: 1 },

      { id: 'ci-wlj-38', text: 'Progress Review', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-wlj-39', text: 'Month 1 review: weight lost, habits formed', checked: false, order: 0, parentId: 'ci-wlj-38', collapsed: false, depth: 1 },
      { id: 'ci-wlj-40', text: 'Adjust calorie target if plateau hits', checked: false, order: 1, parentId: 'ci-wlj-38', collapsed: false, depth: 1 },
      { id: 'ci-wlj-41', text: 'Celebrate non-scale victories (energy, clothes fit, mood)', checked: false, order: 2, parentId: 'ci-wlj-38', collapsed: false, depth: 1 },
      { id: 'ci-wlj-42', text: 'Reassess and set next 12-week target', checked: false, order: 3, parentId: 'ci-wlj-38', collapsed: false, depth: 1 },
    ]
  }
}
