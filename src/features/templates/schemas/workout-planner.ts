import type { Template } from '@/features/templates/types'

export const workoutPlannerTemplate: Template = {
  id: 'tpl-008',
  slug: 'workout-planner',
  title: 'Workout Planner',
  description: 'A complete weekly workout planner with exercise logging, progressive overload tracking, habit streaks, and a fitness goal system to keep you training consistently and safely.',
  category: 'health-wellness',
  type: 'planner',
  featured: false,
  tags: ['workout', 'fitness', 'gym', 'exercise', 'strength training'],
  previewImage: '/templates/previews/workout-planner.png',
  plannerDefaults: {
    theme: 'wellness-calm',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Fitness Goal', order: 0, width: 'half',
        content: {
          goal: 'Bench press 100kg and lose 5kg body fat in 12 weeks',
          milestones: [
            { label: 'Bench 80kg for 3 sets of 5', done: false },
            { label: 'Bench 90kg for 3 sets of 5', done: false },
            { label: 'Body fat below 15%', done: false },
            { label: 'Bench 100kg first attempt', done: false },
            { label: 'Complete full 12-week program', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'focus', label: 'This Week\'s Workout Focus', order: 1, width: 'half',
        content: {
          items: [
            { label: 'Push day — chest, shoulders, triceps', priority: 'high' },
            { label: 'Pull day — back, biceps', priority: 'high' },
            { label: 'Leg day — squats, deadlifts', priority: 'high' },
            { label: 'Active recovery — 20 min walk', priority: 'medium' },
            { label: 'Mobility and stretch session', priority: 'low' },
          ]
        }
      },
      {
        id: 'b3', type: 'routine', label: 'Weekly Training Schedule', order: 2, width: 'full',
        content: {
          slots: [
            { time: 'Monday', label: 'Push Day — Chest · Shoulders · Triceps · 60 min' },
            { time: 'Tuesday', label: 'Pull Day — Back · Biceps · Rear Delts · 60 min' },
            { time: 'Wednesday', label: 'Active Rest — 30 min walk · stretching' },
            { time: 'Thursday', label: 'Leg Day — Squats · Deadlifts · Calves · 70 min' },
            { time: 'Friday', label: 'Upper Body Hypertrophy — higher reps · 55 min' },
            { time: 'Saturday', label: 'Cardio + Core — 30 min HIIT + abs circuit' },
            { time: 'Sunday', label: 'Full Rest — foam roll · meal prep' },
          ]
        }
      },
      {
        id: 'b4', type: 'table', label: 'Exercise Log', order: 3, width: 'full',
        content: {
          headers: ['Exercise', 'Sets', 'Reps', 'Weight (kg)', 'RPE (1-10)'],
          rows: [
            ['Barbell Bench Press', '4', '5', '80', ''],
            ['Incline Dumbbell Press', '3', '10', '28', ''],
            ['Overhead Press', '3', '8', '50', ''],
            ['Lateral Raises', '3', '15', '10', ''],
            ['Tricep Pushdowns', '3', '12', '25', ''],
            ['Cable Flys', '3', '12', '15', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Training Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Follow planned workout' },
            { label: 'Hit protein target (150g+)' },
            { label: '7+ hours sleep' },
            { label: 'Post-workout stretch' },
            { label: 'Log all sets and reps' },
          ],
          days: 7
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Training Notes', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
