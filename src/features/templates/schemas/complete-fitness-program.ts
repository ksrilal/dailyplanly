import type { Template } from '@/features/templates/types'

export const completeFitnessProgramTemplate: Template = {
  id: 'tpl-047',
  slug: 'complete-fitness-program',
  title: 'Complete Fitness Program',
  description: 'A 12-week fitness transformation system covering strength training phases, cardio programming, nutrition, recovery, and progress tracking for sustainable results.',
  category: 'health-wellness',
  type: 'checklist',
  featured: false,
  tags: ['fitness', 'workout', 'gym', 'strength', 'transformation'],
  previewImage: '/templates/previews/complete-fitness-program.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-cfp-1', text: 'Foundation Setup', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-cfp-2', text: 'Get baseline fitness assessment (weight, measurements, benchmarks)', checked: false, order: 0, parentId: 'ci-cfp-1', collapsed: false, depth: 1 },
      { id: 'ci-cfp-3', text: 'Set primary goal (fat loss, muscle gain, performance)', checked: false, order: 1, parentId: 'ci-cfp-1', collapsed: false, depth: 1 },
      { id: 'ci-cfp-4', text: 'Calculate daily calorie and protein targets', checked: false, order: 2, parentId: 'ci-cfp-1', collapsed: false, depth: 1 },
      { id: 'ci-cfp-5', text: 'Buy essential equipment (shoes, belt, straps if needed)', checked: false, order: 3, parentId: 'ci-cfp-1', collapsed: false, depth: 1 },

      { id: 'ci-cfp-6', text: 'Phase 1: Foundation (Weeks 1–4)', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-cfp-7', text: 'Train 3× per week — full body resistance sessions', checked: false, order: 0, parentId: 'ci-cfp-6', collapsed: false, depth: 1 },
      { id: 'ci-cfp-8', text: 'Focus on form and movement patterns', checked: false, order: 1, parentId: 'ci-cfp-6', collapsed: false, depth: 1 },
      { id: 'ci-cfp-9', text: 'Work at 3×12 reps — moderate weight', checked: false, order: 2, parentId: 'ci-cfp-6', collapsed: false, depth: 1 },
      { id: 'ci-cfp-10', text: 'Add 2 × 30-min steady-state cardio sessions', checked: false, order: 3, parentId: 'ci-cfp-6', collapsed: false, depth: 1 },
      { id: 'ci-cfp-11', text: 'Log every session — exercise, sets, reps, weight', checked: false, order: 4, parentId: 'ci-cfp-6', collapsed: false, depth: 1 },
      { id: 'ci-cfp-12', text: 'Week 4 assessment: retest benchmarks', checked: false, order: 5, parentId: 'ci-cfp-6', collapsed: false, depth: 1 },

      { id: 'ci-cfp-13', text: 'Phase 2: Build (Weeks 5–8)', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-cfp-14', text: 'Switch to 4-day push/pull/legs split', checked: false, order: 0, parentId: 'ci-cfp-13', collapsed: false, depth: 1 },
      { id: 'ci-cfp-15', text: 'Progress to 4×8 reps — increase weight', checked: false, order: 1, parentId: 'ci-cfp-13', collapsed: false, depth: 1 },
      { id: 'ci-cfp-16', text: 'Introduce HIIT cardio 2× per week', checked: false, order: 2, parentId: 'ci-cfp-13', collapsed: false, depth: 1 },
      { id: 'ci-cfp-17', text: 'Track progressive overload weekly', checked: false, order: 3, parentId: 'ci-cfp-13', collapsed: false, depth: 1 },

      { id: 'ci-cfp-18', text: 'Phase 3: Peak (Weeks 9–12)', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-cfp-19', text: 'Train heavy at 4×5 — compound focus', checked: false, order: 0, parentId: 'ci-cfp-18', collapsed: false, depth: 1 },
      { id: 'ci-cfp-20', text: 'Add supersets for intensity and time efficiency', checked: false, order: 1, parentId: 'ci-cfp-18', collapsed: false, depth: 1 },
      { id: 'ci-cfp-21', text: 'Test new personal records in week 11', checked: false, order: 2, parentId: 'ci-cfp-18', collapsed: false, depth: 1 },
      { id: 'ci-cfp-22', text: 'Week 12: deload — 50% volume, recovery focus', checked: false, order: 3, parentId: 'ci-cfp-18', collapsed: false, depth: 1 },

      { id: 'ci-cfp-23', text: 'Recovery & Nutrition', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-cfp-24', text: 'Hit daily protein target (150g+ for muscle building)', checked: false, order: 0, parentId: 'ci-cfp-23', collapsed: false, depth: 1 },
      { id: 'ci-cfp-25', text: 'Sleep 7–9 hours nightly', checked: false, order: 1, parentId: 'ci-cfp-23', collapsed: false, depth: 1 },
      { id: 'ci-cfp-26', text: 'Foam roll and stretch after every session', checked: false, order: 2, parentId: 'ci-cfp-23', collapsed: false, depth: 1 },
      { id: 'ci-cfp-27', text: 'Take one full rest day per week minimum', checked: false, order: 3, parentId: 'ci-cfp-23', collapsed: false, depth: 1 },
      { id: 'ci-cfp-28', text: 'Drink 3 litres of water daily', checked: false, order: 4, parentId: 'ci-cfp-23', collapsed: false, depth: 1 },

      { id: 'ci-cfp-29', text: 'Final Review & Next Phase', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-cfp-30', text: 'Retake measurements and photos', checked: false, order: 0, parentId: 'ci-cfp-29', collapsed: false, depth: 1 },
      { id: 'ci-cfp-31', text: 'Compare benchmarks to starting point', checked: false, order: 1, parentId: 'ci-cfp-29', collapsed: false, depth: 1 },
      { id: 'ci-cfp-32', text: 'Set next 12-week programme goal', checked: false, order: 2, parentId: 'ci-cfp-29', collapsed: false, depth: 1 },
    ]
  }
}
