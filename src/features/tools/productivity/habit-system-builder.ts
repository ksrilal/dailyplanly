import type { Tool } from '../types'

const habitSystemBuilder: Tool = {
  id: 'habit-system-builder',
  slug: 'habit-system-builder',
  title: 'Habit System Builder',
  description: 'Design a science-backed habit system with trigger, routine, and reward. Get a 30-day implementation plan, weekly tracker, and milestone roadmap.',
  category: 'productivity',
  icon: 'CheckCircle',
  featured: true,
  tags: ['habit', 'streak', 'routine', 'behaviour', 'consistency', 'tracker'],
  relatedTemplateSlug: 'habit-building-planner',
  relatedTemplateCategory: 'health-wellness',
  inputs: [
    { id: 'habit', type: 'text', label: 'Habit You Want to Build', placeholder: 'e.g. Exercise 30 minutes every morning', required: true, defaultValue: 'Exercise 30 minutes every morning' },
    { id: 'frequency', type: 'select', label: 'Frequency', required: true, defaultValue: 'daily',
      options: [
        { label: 'Every day', value: 'daily' },
        { label: '5 days a week (weekdays)', value: '5x' },
        { label: '3 days a week', value: '3x' },
        { label: 'Twice a week', value: '2x' },
      ] },
    { id: 'trigger', type: 'text', label: 'Existing Habit to Stack After', placeholder: 'e.g. After I pour my morning coffee', required: false, defaultValue: 'After I wake up' },
    { id: 'duration', type: 'number', label: 'Time Required per Session', placeholder: '30', unit: 'min', min: 1, max: 240, step: 5, required: true, defaultValue: 30 },
    { id: 'goal', type: 'text', label: 'Why This Habit Matters to You', placeholder: 'e.g. To lose weight and have more energy', required: false, defaultValue: '' },
    { id: 'challenge', type: 'select', label: 'Biggest Challenge', required: false, defaultValue: 'motivation',
      options: [
        { label: 'Staying motivated', value: 'motivation' },
        { label: 'Finding the time', value: 'time' },
        { label: 'Forgetting to do it', value: 'forget' },
        { label: 'Losing streak and giving up', value: 'streak' },
      ] },
  ],
  generate(inputs) {
    const habit = String(inputs.habit || 'My Habit')
    const frequency = String(inputs.frequency || 'daily')
    const trigger = String(inputs.trigger || 'After I wake up')
    const duration = Number(inputs.duration) || 30
    const goal = String(inputs.goal || '')
    const challenge = String(inputs.challenge || 'motivation')

    const freqLabel: Record<string, string> = {
      daily: '7 days/week', '5x': '5 days/week (weekdays)', '3x': '3 days/week', '2x': '2 days/week',
    }
    const freqDays: Record<string, number> = { daily: 7, '5x': 5, '3x': 3, '2x': 2 }
    const daysPerWeek = freqDays[frequency] || 7
    const monthlyOccurrences = Math.round(daysPerWeek * 4.33)
    const monthlyMinutes = monthlyOccurrences * duration

    const challengeTips: Record<string, string[]> = {
      motivation: [
        'Write your "why" on a sticky note where you\'ll see it daily',
        'Track your streak visually — crossing off days creates momentum',
        'Commit to a minimum version (2-minute rule) on low-motivation days',
      ],
      time: [
        `Schedule the ${duration} minutes as a non-negotiable calendar block`,
        'Prepare everything the night before to reduce friction',
        'Start with a shorter version (10 min) and build up',
      ],
      forget: [
        `Stack it immediately after: "${trigger}"`,
        'Set a daily phone alarm as a backup trigger',
        'Put a visible cue (equipment, note) in your line of sight',
      ],
      streak: [
        'Never miss twice — one miss is allowed, two is a new (bad) habit',
        'Use a "get back on track" rule: miss once, double up tomorrow',
        'Celebrate 7-day and 21-day streaks as major wins',
      ],
    }

    const milestones = [
      { label: '3-day streak — first proof it\'s possible', date: 'Day 3' },
      { label: '7-day streak — first weekly win', date: 'Day 7' },
      { label: '14-day streak — habit forming', date: 'Day 14' },
      { label: '21-day streak — neurological groove forming', date: 'Day 21' },
      { label: '30-day streak — habit locked in', date: 'Day 30' },
      { label: '66 days — fully automatic (average for habits)', date: 'Day 66' },
    ]

    const weeklySchedule = [
      { week: 'Week 1', focus: 'Launch phase — build the cue', tasks: `Do ${habit} for ${duration} min, ${freqLabel[frequency]}. Stack after: "${trigger}"`, notes: 'Focus on showing up, not perfection' },
      { week: 'Week 2', focus: 'Consistency phase', tasks: 'Track every session. Rate effort 1–5. No skipping twice.', notes: 'The habit is still fragile — protect it' },
      { week: 'Week 3', focus: 'Deepening phase', tasks: 'Add a small reward after each session. Review what works.', notes: '21-day milestone this week — celebrate!' },
      { week: 'Week 4', focus: 'Autopilot phase', tasks: 'Start noticing it feels wrong to skip. That\'s the habit forming.', notes: '30-day milestone — share your win' },
      { week: 'Weeks 5–9', focus: 'Reinforcement — 66-day goal', tasks: 'Continue tracking. Add a stretch version if it feels easy.', notes: 'You\'re in the compounding zone' },
    ]

    const dailySchedule = [
      { time: 'Cue', label: trigger, type: 'work' as const },
      { time: `${duration} min`, label: `HABIT: ${habit}`, type: 'work' as const },
      { time: 'Immediately after', label: 'Small reward — acknowledge the win', type: 'rest' as const },
      { time: 'Evening', label: 'Tick off habit tracker — build the visual streak', type: 'review' as const },
    ]

    return {
      headline: `Your ${habit} system — ${freqLabel[frequency]}`,
      subheadline: `${duration} min per session · ${monthlyOccurrences} sessions per month · ${Math.round(monthlyMinutes / 60)} hours invested monthly`,
      stats: [
        { label: 'Frequency', value: freqLabel[frequency] },
        { label: 'Time per Session', value: `${duration} min` },
        { label: 'Monthly Sessions', value: `${monthlyOccurrences}` },
        { label: 'Monthly Investment', value: `${Math.round(monthlyMinutes / 60)} hrs ${monthlyMinutes % 60} min` },
        { label: 'Cue (trigger)', value: trigger },
        { label: 'Habit Loop', value: `Cue → ${habit} → Reward` },
      ],
      milestones,
      weeklySchedule,
      dailySchedule,
      checklists: [
        {
          title: 'Habit Launch Checklist',
          items: [
            `Write down your habit: "${habit}"`,
            `Identify and commit to your trigger: "${trigger}"`,
            `Schedule ${duration} min in your calendar for the first 7 days`,
            'Set up a habit tracking system (paper or app)',
            'Tell one person about your commitment for accountability',
            'Prepare everything needed the night before (clothes, equipment, etc.)',
            'Define your minimum version for hard days (10-min rule)',
            'Choose a small daily reward to celebrate each session',
            'Set a phone alarm as backup cue',
            ...(goal ? [`Keep visible: "${goal}" — your reason why`] : []),
          ],
        },
        {
          title: `Beat Your Challenge: ${challenge}`,
          items: challengeTips[challenge] || challengeTips.motivation,
        },
      ],
      recommendations: [
        `The secret: attach "${habit}" to something you already do automatically. "${trigger}" is a strong anchor.`,
        `${duration} minutes is the right scope — specific enough to do, long enough to matter.`,
        'Never miss twice. A single skip doesn\'t break a habit. Two consecutive misses starts a new (bad) one.',
        goal ? `Your "why" (${goal}) is your fuel when motivation drops. Keep it visible.` : 'Write down why this habit matters to you — motivation fades, purpose persists.',
        `At ${daysPerWeek} days/week, you\'ll build ${monthlyOccurrences * 12} habit sessions in a year. Compounding works.`,
      ],
      nextActions: [
        `Today: do a 2-minute version of "${habit}" to start the streak`,
        `Set up your habit tracker right now`,
        `Schedule the first 7 sessions in your calendar`,
        `Tell one person your commitment today`,
        `Prepare your trigger environment tonight`,
      ],
    }
  },
}

export default habitSystemBuilder
