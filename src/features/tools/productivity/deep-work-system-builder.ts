import type { Tool } from '../types'

const deepWorkSystemBuilder: Tool = {
  id: 'deep-work-system-builder',
  slug: 'deep-work-system-builder',
  title: 'Deep Work System Builder',
  description: 'Design your personal deep work system. Enter your available hours, focus goals, and priority tasks — get a complete daily schedule, focus blocks, and recovery plan.',
  category: 'productivity',
  icon: 'BrainCircuit',
  featured: true,
  tags: ['deep work', 'focus', 'productivity', 'schedule', 'pomodoro', 'time blocking'],
  relatedTemplateSlug: 'deep-work-planner',
  relatedTemplateCategory: 'productivity',
  inputs: [
    { id: 'startTime', type: 'select', label: 'Work Start Time', required: true, defaultValue: '08:00',
      options: [
        { label: '6:00 AM', value: '06:00' },
        { label: '7:00 AM', value: '07:00' },
        { label: '8:00 AM', value: '08:00' },
        { label: '9:00 AM', value: '09:00' },
        { label: '10:00 AM', value: '10:00' },
      ] },
    { id: 'deepHours', type: 'number', label: 'Target Deep Work Hours per Day', placeholder: '4', unit: 'hrs', min: 1, max: 8, step: 0.5, required: true, defaultValue: 4 },
    { id: 'blockLength', type: 'select', label: 'Preferred Focus Block Length', required: true, defaultValue: '90',
      options: [
        { label: '25 min (Pomodoro)', value: '25' },
        { label: '45 min (moderate)', value: '45' },
        { label: '90 min (deep work)', value: '90' },
        { label: '120 min (ultra-focus)', value: '120' },
      ] },
    { id: 'task1', type: 'text', label: 'Priority Task #1', placeholder: 'e.g. Write chapter 3 of my book', required: true, defaultValue: 'Most important project task' },
    { id: 'task2', type: 'text', label: 'Priority Task #2', placeholder: 'e.g. Code the authentication module', required: false, defaultValue: '' },
    { id: 'task3', type: 'text', label: 'Priority Task #3', placeholder: 'e.g. Prepare client presentation', required: false, defaultValue: '' },
    { id: 'interruptions', type: 'select', label: 'Biggest Focus Killer', required: false, defaultValue: 'notifications',
      options: [
        { label: 'Phone notifications', value: 'notifications' },
        { label: 'Email & Slack', value: 'email' },
        { label: 'Colleagues / family', value: 'people' },
        { label: 'Context switching between tasks', value: 'switching' },
      ] },
  ],
  generate(inputs) {
    const startTime = String(inputs.startTime || '08:00')
    const deepHours = Number(inputs.deepHours) || 4
    const blockLength = Number(inputs.blockLength) || 90
    const task1 = String(inputs.task1 || 'Priority Task 1')
    const task2 = String(inputs.task2 || '')
    const task3 = String(inputs.task3 || '')
    const interruptions = String(inputs.interruptions || 'notifications')

    const [startH, startM] = startTime.split(':').map(Number)
    const breakLength = blockLength >= 90 ? 20 : blockLength >= 45 ? 15 : 5
    const sessionsPerDay = Math.floor((deepHours * 60) / (blockLength + breakLength))
    const actualDeepMinutes = sessionsPerDay * blockLength
    const tasks = [task1, task2, task3].filter(Boolean)

    // Build schedule
    let currentMinutes = startH * 60 + startM
    const addTime = (mins: number) => {
      currentMinutes += mins
      const h = Math.floor(currentMinutes / 60) % 24
      const m = currentMinutes % 60
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    }

    const schedule = []
    // Pre-session ritual
    schedule.push({ time: startTime, label: 'Pre-session ritual: review tasks, set intention, close all tabs', type: 'work' as const })
    addTime(15)

    for (let i = 0; i < sessionsPerDay; i++) {
      const blockStart = `${String(Math.floor(currentMinutes / 60)).padStart(2, '0')}:${String(currentMinutes % 60).padStart(2, '0')}`
      const taskLabel = tasks[i % tasks.length] || `Focus block ${i + 1}`
      addTime(blockLength)
      const blockEnd = `${String(Math.floor(currentMinutes / 60)).padStart(2, '0')}:${String(currentMinutes % 60).padStart(2, '0')}`
      schedule.push({ time: `${blockStart}–${blockEnd}`, label: `DEEP WORK: ${taskLabel}`, type: 'work' as const })

      if (i < sessionsPerDay - 1) {
        const breakStart = blockEnd
        addTime(breakLength)
        const breakEnd = `${String(Math.floor(currentMinutes / 60)).padStart(2, '0')}:${String(currentMinutes % 60).padStart(2, '0')}`
        schedule.push({ time: `${breakStart}–${breakEnd}`, label: i % 2 === 0 ? 'Short break — walk, stretch, no screens' : 'Recovery break — hydrate, breathe', type: 'break' as const })
      }
    }

    // Shallow work + shutdown
    addTime(breakLength)
    const shallowStart = `${String(Math.floor(currentMinutes / 60)).padStart(2, '0')}:${String(currentMinutes % 60).padStart(2, '0')}`
    addTime(60)
    const shallowEnd = `${String(Math.floor(currentMinutes / 60)).padStart(2, '0')}:${String(currentMinutes % 60).padStart(2, '0')}`
    schedule.push({ time: `${shallowStart}–${shallowEnd}`, label: 'Shallow work: email, Slack, admin (time-boxed)', type: 'work' as const })
    schedule.push({ time: addTime(0), label: 'Shutdown ritual: log progress, plan tomorrow, close everything', type: 'review' as const })

    const interruptionFixes: Record<string, string[]> = {
      notifications: ['Phone on Do Not Disturb during all focus blocks', 'Use airplane mode or a second device for music only', 'Batch check notifications at the end of each focus block'],
      email: ['Check email only twice daily: 10am and 4pm', 'Turn off all email notifications', 'Set an auto-responder explaining your focus hours'],
      people: ['Put headphones on as a "do not disturb" signal', 'Communicate your focus hours to your household/team', 'Work from a different location if possible'],
      switching: ['Write down intrusive tasks on paper — process them later', 'Use a single browser tab per focus block', 'Close all apps except the one tool needed for the current task'],
    }

    const weeklySchedule = [
      { week: 'Mon–Tue', focus: 'Hardest tasks first', tasks: task1, notes: 'Highest cognitive energy at week start' },
      { week: 'Wed', focus: 'Collaborative work', tasks: 'Meetings, feedback, reviews', notes: 'Mid-week is fine for lower-focus work' },
      { week: 'Thu', focus: 'Deep work + creation', tasks: task2 || task1, notes: 'Second peak of the week' },
      { week: 'Fri', focus: 'Completion + planning', tasks: `${task3 || 'Finishing tasks'} + next week plan`, notes: 'Close loops, plan ahead' },
    ]

    const weeksData = deepHours * 5 * 52 // annual deep hours (weekdays)

    return {
      headline: `${sessionsPerDay} deep work sessions · ${Math.round(actualDeepMinutes / 60)} hrs ${actualDeepMinutes % 60} min of focus daily`,
      subheadline: `${blockLength}-min blocks · ${breakLength}-min breaks · ${Math.round(weeksData)} deep work hours per year`,
      stats: [
        { label: 'Daily Deep Work', value: `${Math.round(actualDeepMinutes / 60)}h ${actualDeepMinutes % 60}m` },
        { label: 'Focus Sessions', value: `${sessionsPerDay} per day` },
        { label: 'Block Length', value: `${blockLength} min` },
        { label: 'Break Length', value: `${breakLength} min` },
        { label: 'Annual Deep Hours', value: `${Math.round(weeksData)} hrs` },
        { label: 'Priority Tasks', value: `${tasks.length}` },
      ],
      milestones: [
        { label: 'First full deep work day completed', date: 'Day 1' },
        { label: '5-day streak — system is working', date: 'Week 1' },
        { label: 'First major task completed in deep work', date: 'Week 2' },
        { label: '21-day streak — deep work is a habit', date: 'Day 21' },
        { label: '100 hours of deep work logged', date: `~Week ${Math.ceil(100 / (deepHours * 5))}` },
      ],
      weeklySchedule,
      dailySchedule: schedule,
      checklists: [
        {
          title: 'Daily Deep Work Setup',
          items: [
            'Review today\'s priorities — choose 1–3 tasks for focus blocks',
            'Prepare workspace: clear desk, water, headphones ready',
            'Phone on Do Not Disturb',
            'Close all browser tabs except what\'s needed',
            'Open task — set a clear intention for the block',
            'Start timer and begin without checking anything else',
            'After each block: log what was completed',
            'End-of-day shutdown: write tomorrow\'s first task',
          ],
        },
        {
          title: `Fix Your Focus Killer: ${interruptions}`,
          items: interruptionFixes[interruptions] || interruptionFixes.notifications,
        },
      ],
      recommendations: [
        `${blockLength}-min blocks suit your working style. ${blockLength >= 90 ? 'Guard against distraction in the first 20 minutes — that\'s when the urge to switch is strongest.' : 'Short blocks work well for high-output sessions with natural momentum.'}`,
        `You have ${deepHours} hours of deep work daily. That\'s ${Math.round(weeksData)} hours/year — more than enough to produce world-class work.`,
        'Do your hardest task first. Willpower and focus are highest in the first 2 hours.',
        'The shutdown ritual is as important as the start. It signals your brain that work is done.',
        `Batching email to 2× daily will recover ~1 hour of focus time per day.`,
      ],
      nextActions: [
        `Block ${sessionsPerDay} focus sessions in tomorrow\'s calendar right now`,
        `Write task 1 on paper and put it on your desk: "${task1}"`,
        'Set your phone to Do Not Disturb mode right now',
        'Identify one thing to remove from tomorrow\'s schedule to protect focus time',
        'Run your first deep work session tomorrow morning',
      ],
    }
  },
}

export default deepWorkSystemBuilder
