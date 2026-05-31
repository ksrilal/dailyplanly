import type { Tool } from '../types'

const workoutRoutineBuilder: Tool = {
  id: 'workout-routine-builder',
  slug: 'workout-routine-builder',
  title: 'Workout Routine Builder',
  description: 'Build a personalised weekly workout routine based on your goal, available days, equipment, and fitness level. Get a full training schedule, exercise list, and progression plan.',
  category: 'health-wellness',
  icon: 'Dumbbell',
  tags: ['workout', 'exercise', 'fitness', 'gym', 'training', 'strength'],
  relatedTemplateSlug: 'workout-planner',
  relatedTemplateCategory: 'health-wellness',
  inputs: [
    { id: 'goal', type: 'select', label: 'Primary Goal', required: true, defaultValue: 'strength',
      options: [
        { label: 'Build strength & muscle', value: 'strength' },
        { label: 'Lose fat & tone up', value: 'fat-loss' },
        { label: 'Improve general fitness', value: 'fitness' },
        { label: 'Run or endurance', value: 'endurance' },
      ] },
    { id: 'days', type: 'number', label: 'Days Available per Week', placeholder: '4', unit: 'days', min: 2, max: 7, step: 1, required: true, defaultValue: 4 },
    { id: 'sessionLength', type: 'select', label: 'Session Length', required: true, defaultValue: '60',
      options: [
        { label: '30 minutes', value: '30' },
        { label: '45 minutes', value: '45' },
        { label: '60 minutes', value: '60' },
        { label: '75–90 minutes', value: '90' },
      ] },
    { id: 'equipment', type: 'select', label: 'Equipment Available', required: true, defaultValue: 'gym',
      options: [
        { label: 'Full gym (barbells, machines, dumbbells)', value: 'gym' },
        { label: 'Dumbbells only', value: 'dumbbells' },
        { label: 'Bodyweight only (no equipment)', value: 'bodyweight' },
        { label: 'Resistance bands + bodyweight', value: 'bands' },
      ] },
    { id: 'level', type: 'select', label: 'Fitness Level', required: true, defaultValue: 'intermediate',
      options: [
        { label: 'Beginner (under 6 months training)', value: 'beginner' },
        { label: 'Intermediate (6 months – 2 years)', value: 'intermediate' },
        { label: 'Advanced (2+ years consistent)', value: 'advanced' },
      ] },
  ],
  generate(inputs) {
    const goal = String(inputs.goal || 'strength')
    const days = Number(inputs.days) || 4
    const sessionLength = Number(inputs.sessionLength) || 60
    const equipment = String(inputs.equipment || 'gym')
    const level = String(inputs.level || 'intermediate')

    const goalLabels: Record<string, string> = { strength: 'Strength & Muscle', 'fat-loss': 'Fat Loss & Toning', fitness: 'General Fitness', endurance: 'Endurance' }

    const splitsByDays: Record<number, string> = {
      2: 'Full Body × 2',
      3: level === 'beginner' ? 'Full Body × 3' : 'Push / Pull / Legs (abbreviated)',
      4: 'Upper / Lower × 2',
      5: 'Push / Pull / Legs + Upper + Lower',
      6: 'Push / Pull / Legs × 2',
      7: 'Push / Pull / Legs × 2 + Active Recovery',
    }
    const split = splitsByDays[days] || 'Full Body'

    const gymExercises: Record<string, string[]> = {
      strength: ['Barbell Squat 4×5', 'Barbell Bench Press 4×5', 'Deadlift 3×5', 'Overhead Press 3×8', 'Barbell Row 4×6', 'Pull-ups 3×max', 'Romanian Deadlift 3×10', 'Dips 3×max'],
      'fat-loss': ['Squat 3×12', 'Incline DB Press 3×12', 'Romanian Deadlift 3×12', 'Cable Row 3×12', 'Leg Press 3×15', 'DB Shoulder Press 3×12', '15-min HIIT finisher', 'Plank 3×60s'],
      fitness: ['Squat 3×10', 'Push-ups 3×max', 'Dumbbell Row 3×10', 'Walking Lunges 3×12', 'Shoulder Press 3×10', 'Face Pulls 3×15', '20-min cardio', 'Core circuit 3 rounds'],
      endurance: ['30-min zone 2 run', 'Tempo intervals 6×400m', 'Long slow run 60–90 min', 'Cycling or rowing 45 min', 'Strides 8×100m', 'Easy recovery jog 30 min'],
    }

    const bodyweightExercises: Record<string, string[]> = {
      strength: ['Pike Push-ups 4×10', 'Pull-ups 4×max', 'Dips 4×max', 'Bulgarian Split Squat 3×10', 'Pistol Squat progression 3×5', 'Plank Row 3×10', 'Handstand Hold 3×30s', 'Inverted Row 3×max'],
      'fat-loss': ['Burpees 4×10', 'Jump Squats 3×15', 'Push-ups 3×max', 'Mountain Climbers 3×30s', 'Jumping Lunges 3×12', 'High Knees 3×30s', 'Plank 3×45s', 'Bicycle Crunches 3×20'],
      fitness: ['Squat 3×15', 'Push-ups 3×15', 'Reverse Lunges 3×12', 'Superman 3×12', 'Glute Bridge 3×15', 'Side Plank 3×30s', 'Step-ups 3×12', 'Tricep Dips 3×12'],
      endurance: ['Running intervals', 'Jump rope 5×1min', 'Squat jumps 3×15', 'High knees 3×45s', 'Burpees 3×10', 'Step-ups fast 3×20', 'Mountain climbers 3×30s'],
    }

    const exercises = equipment === 'bodyweight' || equipment === 'bands'
      ? bodyweightExercises[goal] || bodyweightExercises.fitness
      : gymExercises[goal] || gymExercises.fitness

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const trainingDays = weekDays.slice(0, days)

    const weeklySchedule = weekDays.map((day, i) => {
      const isTraining = i < days
      const sessionNum = i + 1
      return {
        week: day,
        focus: isTraining ? (days <= 3 ? `Full Body Session ${sessionNum}` : i % 2 === 0 ? 'Upper Body' : 'Lower Body') : 'Rest / Active Recovery',
        tasks: isTraining
          ? `${sessionLength} min · ${exercises[i % exercises.length]} + warm-up & cool-down`
          : 'Walk 20–30 min, stretch, foam roll',
        notes: isTraining ? (i === 0 ? 'Heaviest compound lifts first' : '') : 'Recovery is part of the programme',
      }
    })

    return {
      headline: `${days}-day ${goalLabels[goal]} programme · ${split}`,
      subheadline: `${sessionLength} min sessions · ${equipment} · ${level} level · ~${days * sessionLength} min/week total`,
      stats: [
        { label: 'Training Split', value: split },
        { label: 'Sessions per Week', value: `${days}` },
        { label: 'Session Length', value: `${sessionLength} min` },
        { label: 'Weekly Volume', value: `${days * sessionLength} min` },
        { label: 'Equipment', value: equipment === 'gym' ? 'Full Gym' : equipment === 'bodyweight' ? 'Bodyweight' : equipment.charAt(0).toUpperCase() + equipment.slice(1) },
        { label: 'Level', value: level.charAt(0).toUpperCase() + level.slice(1) },
      ],
      milestones: [
        { label: 'Complete first week without skipping', date: 'Week 1' },
        { label: '1 month consistent — habit formed', date: 'Month 1' },
        { label: 'First measurable strength improvement', date: 'Week 3–4' },
        { label: '12-week programme complete — reassess', date: 'Week 12' },
      ],
      weeklySchedule,
      checklists: [
        { title: 'Your Key Exercises', items: exercises },
        {
          title: 'Training Habits',
          items: [
            'Warm up 5–10 min before every session',
            'Track weights and reps in a notebook or app',
            'Progressive overload: add weight or reps every 1–2 weeks',
            'Stretch and cool down for 5 min after each session',
            'Sleep 7–9 hours — muscle is built during sleep',
            `Eat ${Math.round(Number(inputs.weight || 75) * 2)}g protein/day`,
            'Drink water before, during, and after training',
            'Rest 48–72h between sessions targeting the same muscle group',
          ],
        },
      ],
      recommendations: [
        level === 'beginner' ? 'Focus on learning form before adding weight. Watch technique videos for all compound lifts.' : 'Track progressive overload every session — it\'s the engine of all gains.',
        goal === 'strength' ? 'Compound lifts (squat, deadlift, bench, row) should dominate your programme.' : goal === 'fat-loss' ? 'Strength training burns more long-term calories than cardio alone. Don\'t skip the weights.' : '',
        `${sessionLength} minutes is ${sessionLength >= 60 ? 'plenty of time' : 'tight — prioritise compound movements'} for your goal.`,
        'Consistency over 12 weeks beats any "perfect" programme you only follow for 2 weeks.',
      ].filter(Boolean) as string[],
      nextActions: [
        'Schedule all training sessions in your calendar this week',
        `Prepare your equipment / gym bag tonight`,
        'Do session 1 tomorrow — momentum starts with the first rep',
        'Download a workout tracking app (Strong, FitNotes)',
      ],
    }
  },
}

export default workoutRoutineBuilder
