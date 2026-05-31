import type { Tool } from '../types'

const morningRoutineDesigner: Tool = {
  id: 'morning-routine-designer',
  slug: 'morning-routine-designer',
  title: 'Morning Routine Designer',
  description: 'Design your ideal morning routine based on your wake time, available minutes, and goals. Get a personalised minute-by-minute plan, habit stacking guide, and 30-day launch checklist.',
  category: 'personal-development',
  icon: 'Sunrise',
  tags: ['morning routine', 'habits', 'self-improvement', 'productivity', 'wellness'],
  relatedTemplateSlug: 'morning-routine',
  relatedTemplateCategory: 'health-wellness',
  inputs: [
    { id: 'wakeTime', type: 'select', label: 'Current Wake Time', required: true, defaultValue: '07:00',
      options: [
        { label: '5:00 AM', value: '05:00' }, { label: '5:30 AM', value: '05:30' },
        { label: '6:00 AM', value: '06:00' }, { label: '6:30 AM', value: '06:30' },
        { label: '7:00 AM', value: '07:00' }, { label: '7:30 AM', value: '07:30' },
        { label: '8:00 AM', value: '08:00' },
      ] },
    { id: 'availableMinutes', type: 'number', label: 'Minutes Before Work/Commitments', placeholder: '60', unit: 'min', min: 15, max: 240, step: 5, required: true, defaultValue: 60 },
    { id: 'goals', type: 'select', label: 'Primary Morning Goal', required: true, defaultValue: 'energy',
      options: [
        { label: 'Maximum energy and focus', value: 'energy' },
        { label: 'Calm and mindfulness', value: 'calm' },
        { label: 'Fitness and health', value: 'fitness' },
        { label: 'Learning and growth', value: 'growth' },
        { label: 'Balanced (a bit of everything)', value: 'balanced' },
      ] },
    { id: 'includeExercise', type: 'select', label: 'Include Exercise?', required: false, defaultValue: 'yes',
      options: [
        { label: 'Yes — full workout', value: 'full' },
        { label: 'Yes — short (walk/stretch)', value: 'short' },
        { label: 'No exercise in morning', value: 'no' },
      ] },
    { id: 'biggestChallenge', type: 'select', label: 'Biggest Morning Challenge', required: false, defaultValue: 'motivation',
      options: [
        { label: 'Hitting snooze repeatedly', value: 'snooze' },
        { label: 'Not enough time', value: 'time' },
        { label: 'No energy or motivation', value: 'motivation' },
        { label: 'Phone addiction in the morning', value: 'phone' },
      ] },
  ],
  generate(inputs) {
    const wakeTime = String(inputs.wakeTime || '07:00')
    const available = Number(inputs.availableMinutes) || 60
    const goals = String(inputs.goals || 'energy')
    const exercise = String(inputs.includeExercise || 'short')
    const challenge = String(inputs.biggestChallenge || 'motivation')

    const [wakeH, wakeM] = wakeTime.split(':').map(Number)
    const addMin = (baseH: number, baseM: number, mins: number) => {
      const total = baseH * 60 + baseM + mins
      return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
    }

    let currentMin = wakeH * 60 + wakeM
    const schedule: { time: string; label: string; type: 'work' | 'break' | 'rest' | 'review' }[] = []
    const pushSlot = (mins: number, label: string, type: 'work' | 'break' | 'rest' | 'review') => {
      const time = `${String(Math.floor(currentMin / 60)).padStart(2, '0')}:${String(currentMin % 60).padStart(2, '0')}`
      schedule.push({ time, label, type })
      currentMin += mins
    }

    pushSlot(0, 'Wake up — natural light immediately, no phone', 'work')

    if (goals === 'calm') {
      pushSlot(10, 'Meditate or breathwork (10 min)', 'rest')
      pushSlot(10, 'Journal — 3 gratitudes + intention', 'review')
    } else if (goals === 'energy') {
      pushSlot(5, 'Drink 500ml water immediately', 'work')
      pushSlot(10, 'Cold shower or face splash — activates the nervous system', 'work')
    } else if (goals === 'fitness') {
      pushSlot(5, 'Light stretch — 5 min mobility work', 'rest')
    } else if (goals === 'growth') {
      pushSlot(5, 'Review goals and today\'s intention', 'review')
    } else {
      pushSlot(5, 'Drink water · no phone for first 30 minutes', 'work')
    }

    if (exercise === 'full') {
      pushSlot(Math.min(45, available - 20), 'Full workout / exercise session', 'work')
    } else if (exercise === 'short') {
      pushSlot(20, 'Morning walk or stretch routine (20 min)', 'work')
    }

    pushSlot(10, 'Shower and personal hygiene', 'rest')
    pushSlot(15, 'Nutritious breakfast — no screens while eating', 'rest')

    if (goals === 'growth' || goals === 'balanced') {
      pushSlot(15, 'Read or listen to educational content (15 min)', 'work')
    }
    if (goals !== 'calm') {
      pushSlot(10, 'Review day\'s priorities — write top 3 tasks', 'review')
    }
    if (goals === 'calm' || goals === 'balanced') {
      pushSlot(10, 'Meditate or breathwork (10 min)', 'rest')
    }

    const challengeFixes: Record<string, string[]> = {
      snooze: ['Put your phone/alarm across the room — you must stand up to turn it off', 'Set only ONE alarm — multiple alarms train your brain to ignore them', 'Commit to a "5-second rule" — count 5-4-3-2-1 and physically get up', 'Plan something exciting for the morning — anticipation beats the alarm'],
      time: [`Your routine is ${available} minutes — that\'s enough if you eliminate decision fatigue`, 'Prep everything the night before: clothes, breakfast, bag', 'Eat breakfast during another activity (reading, planning)', 'Cut any non-essential step — 15 min of good habits beats 60 min of mediocre ones'],
      motivation: ['Anchor your routine to a clear "why" — what does a great morning enable you to do?', 'Start smaller: commit to just waking up and drinking water for 7 days', 'Create a small reward: a favourite coffee or podcast only allowed during morning routine', 'Track your streak visually — the chain creates its own motivation'],
      phone: ['Keep your phone charging outside the bedroom', 'Use a physical alarm clock', 'Create a "no phone for first 60 minutes" rule', 'Replace the phone habit with a book or journal'],
    }

    return {
      headline: `${available}-minute morning routine — wake at ${wakeTime} · optimised for ${goals}`,
      subheadline: `${exercise !== 'no' ? 'Includes exercise · ' : ''}${schedule.length} blocks · starts at ${wakeTime}`,
      stats: [
        { label: 'Wake Time', value: wakeTime },
        { label: 'Routine Length', value: `${available} min` },
        { label: 'Primary Goal', value: goals.charAt(0).toUpperCase() + goals.slice(1) },
        { label: 'Exercise', value: exercise === 'full' ? 'Full workout' : exercise === 'short' ? 'Short movement' : 'None' },
        { label: 'Routine Blocks', value: `${schedule.length}` },
        { label: 'Phone-free time', value: '60+ min (recommended)' },
      ],
      milestones: [
        { label: '7-day streak — first proof it\'s possible', date: 'Week 1' },
        { label: '14-day streak — habit forming', date: 'Week 2' },
        { label: '21-day streak — neurological groove', date: 'Day 21' },
        { label: '30-day streak — morning routine locked in', date: 'Day 30' },
      ],
      weeklySchedule: [
        { week: 'Week 1', focus: 'Just show up', tasks: 'Run the routine daily — done is better than perfect', notes: 'Don\'t try to be perfect, try to be consistent' },
        { week: 'Week 2', focus: 'Refine', tasks: 'Adjust timing, swap what doesn\'t work', notes: 'What energises vs drains you in the morning?' },
        { week: 'Week 3', focus: 'Deepen', tasks: 'Add one element you\'ve been skipping', notes: '21-day milestone — celebrate!' },
        { week: 'Week 4', focus: 'Autopilot', tasks: 'The routine should feel wrong to skip by now', notes: '30-day completion — share your win' },
      ],
      dailySchedule: schedule,
      checklists: [
        {
          title: '30-Day Morning Routine Launch',
          items: [
            `Set your alarm for ${wakeTime} — no exceptions for 30 days`,
            'Prepare tomorrow\'s routine setup tonight (clothes, breakfast, water)',
            challenge === 'phone' ? 'Move phone charger outside the bedroom tonight' : challenge === 'snooze' ? 'Move alarm across the room — physically stand up to turn it off' : 'Write down your morning "why" and put it where you\'ll see it',
            'Tell someone about your 30-day commitment',
            'Track your streak visually (X on a calendar)',
            'Set up coffee/tea maker night before',
            'Lay out workout clothes if exercising',
            'Have a book or journal accessible for the routine',
          ],
        },
        { title: `Beat Your Challenge: ${challenge}`, items: challengeFixes[challenge] || challengeFixes.motivation },
      ],
      recommendations: [
        challengeFixes[challenge][0],
        `${available} minutes is ${available >= 60 ? 'ample time for a transformative morning routine' : 'enough for the essentials — prioritise the highest-impact habits'}.`,
        'The morning routine isn\'t about being productive — it\'s about starting the day from a position of calm and intention.',
        'Your evening routine sets up your morning. Getting to bed 30 minutes earlier is the single biggest upgrade to your morning.',
      ],
      nextActions: [
        `Set your alarm for ${wakeTime} tomorrow — don't adjust it`,
        'Prepare tomorrow morning tonight: clothes, breakfast, water bottle',
        challenge === 'phone' ? 'Move your phone charger out of the bedroom right now' : 'Write your morning intention for tomorrow',
        'Track Day 1 on a habit calendar tomorrow',
      ],
    }
  },
}

export default morningRoutineDesigner
