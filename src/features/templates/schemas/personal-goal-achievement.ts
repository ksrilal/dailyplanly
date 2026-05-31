import type { Template } from '@/features/templates/types'

export const personalGoalAchievementTemplate: Template = {
  id: 'tpl-048',
  slug: 'personal-goal-achievement',
  title: 'Personal Goal Achievement System',
  description: 'A coach-designed goal achievement system with vision clarity, milestone mapping, habit programming, weekly reviews, and accountability structures to hit any goal.',
  category: 'lifestyle',
  type: 'checklist',
  featured: true,
  tags: ['goals', 'achievement', 'personal development', 'system', 'productivity'],
  previewImage: '/templates/previews/personal-goal-achievement.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-pga-1', text: 'Goal Clarity', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-pga-2', text: 'Write your goal in specific, measurable terms', checked: false, order: 0, parentId: 'ci-pga-1', collapsed: false, depth: 1 },
      { id: 'ci-pga-3', text: 'Set a clear deadline', checked: false, order: 1, parentId: 'ci-pga-1', collapsed: false, depth: 1 },
      { id: 'ci-pga-4', text: 'Define why this goal matters deeply to you', checked: false, order: 2, parentId: 'ci-pga-1', collapsed: false, depth: 1 },
      { id: 'ci-pga-5', text: 'Visualisation', checked: false, order: 3, parentId: 'ci-pga-1', collapsed: false, depth: 1 },
      { id: 'ci-pga-6', text: 'Write what success looks like in vivid detail', checked: false, order: 0, parentId: 'ci-pga-5', collapsed: false, depth: 2 },
      { id: 'ci-pga-7', text: 'Create a vision board or written vision document', checked: false, order: 1, parentId: 'ci-pga-5', collapsed: false, depth: 2 },
      { id: 'ci-pga-8', text: 'Read your vision statement every morning', checked: false, order: 2, parentId: 'ci-pga-5', collapsed: false, depth: 2 },
      { id: 'ci-pga-9', text: 'Identify the 3 biggest obstacles in advance', checked: false, order: 4, parentId: 'ci-pga-1', collapsed: false, depth: 1 },
      { id: 'ci-pga-10', text: 'Write a plan to overcome each obstacle', checked: false, order: 5, parentId: 'ci-pga-1', collapsed: false, depth: 1 },

      { id: 'ci-pga-11', text: 'Milestone Planning', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-pga-12', text: 'Break goal into 5 key milestones', checked: false, order: 0, parentId: 'ci-pga-11', collapsed: false, depth: 1 },
      { id: 'ci-pga-13', text: 'Assign a date to each milestone', checked: false, order: 1, parentId: 'ci-pga-11', collapsed: false, depth: 1 },
      { id: 'ci-pga-14', text: 'Monthly Actions', checked: false, order: 2, parentId: 'ci-pga-11', collapsed: false, depth: 1 },
      { id: 'ci-pga-15', text: 'List the 3 most important actions for this month', checked: false, order: 0, parentId: 'ci-pga-14', collapsed: false, depth: 2 },
      { id: 'ci-pga-16', text: 'Block time in calendar for each action', checked: false, order: 1, parentId: 'ci-pga-14', collapsed: false, depth: 2 },
      { id: 'ci-pga-17', text: 'Weekly Actions', checked: false, order: 3, parentId: 'ci-pga-11', collapsed: false, depth: 1 },
      { id: 'ci-pga-18', text: 'Set 3 goal-aligned tasks each Sunday for the week', checked: false, order: 0, parentId: 'ci-pga-17', collapsed: false, depth: 2 },
      { id: 'ci-pga-19', text: 'Review and tick off tasks every Friday', checked: false, order: 1, parentId: 'ci-pga-17', collapsed: false, depth: 2 },

      { id: 'ci-pga-20', text: 'Habit System', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-pga-21', text: 'Identify 3 daily habits that directly support the goal', checked: false, order: 0, parentId: 'ci-pga-20', collapsed: false, depth: 1 },
      { id: 'ci-pga-22', text: 'Stack habits onto existing routines', checked: false, order: 1, parentId: 'ci-pga-20', collapsed: false, depth: 1 },
      { id: 'ci-pga-23', text: 'Track habits in a habit tracker for 30 days', checked: false, order: 2, parentId: 'ci-pga-20', collapsed: false, depth: 1 },
      { id: 'ci-pga-24', text: 'Build a reward system for milestone completion', checked: false, order: 3, parentId: 'ci-pga-20', collapsed: false, depth: 1 },

      { id: 'ci-pga-25', text: 'Accountability', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-pga-26', text: 'Tell 1–2 supportive people about your goal', checked: false, order: 0, parentId: 'ci-pga-25', collapsed: false, depth: 1 },
      { id: 'ci-pga-27', text: 'Schedule weekly check-in with accountability partner', checked: false, order: 1, parentId: 'ci-pga-25', collapsed: false, depth: 1 },
      { id: 'ci-pga-28', text: 'Weekly Review Ritual', checked: false, order: 2, parentId: 'ci-pga-25', collapsed: false, depth: 1 },
      { id: 'ci-pga-29', text: 'Every Sunday: what progress did I make?', checked: false, order: 0, parentId: 'ci-pga-28', collapsed: false, depth: 2 },
      { id: 'ci-pga-30', text: 'Every Sunday: what did I learn this week?', checked: false, order: 1, parentId: 'ci-pga-28', collapsed: false, depth: 2 },
      { id: 'ci-pga-31', text: 'Every Sunday: what will I do differently next week?', checked: false, order: 2, parentId: 'ci-pga-28', collapsed: false, depth: 2 },
      { id: 'ci-pga-32', text: 'Monthly review and course-correct if needed', checked: false, order: 3, parentId: 'ci-pga-25', collapsed: false, depth: 1 },
    ]
  }
}
