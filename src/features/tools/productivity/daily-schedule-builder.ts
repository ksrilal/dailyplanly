import type { Tool } from '../types'

const dailyScheduleBuilder: Tool = {
  id: 'daily-schedule-builder',
  slug: 'daily-schedule-builder',
  title: 'Daily Schedule Builder',
  description: 'Design your ideal daily schedule around your energy levels, commitments, and priorities. Get a personalised hour-by-hour plan, morning/evening routines, and daily habit stack.',
  category: 'productivity',
  icon: 'Clock',
  tags: ['schedule', 'daily planner', 'routine', 'time management', 'productivity'],
  relatedTemplateSlug: 'daily-planner',
  relatedTemplateCategory: 'productivity',
  inputs: [
    { id: 'wakeTime', type: 'select', label: 'Wake Up Time', required: true, defaultValue: '06:30',
      options: [
        { label: '5:00 AM', value: '05:00' }, { label: '5:30 AM', value: '05:30' },
        { label: '6:00 AM', value: '06:00' }, { label: '6:30 AM', value: '06:30' },
        { label: '7:00 AM', value: '07:00' }, { label: '7:30 AM', value: '07:30' },
        { label: '8:00 AM', value: '08:00' }, { label: '9:00 AM', value: '09:00' },
      ] },
    { id: 'sleepTime', type: 'select', label: 'Target Bedtime', required: true, defaultValue: '22:30',
      options: [
        { label: '9:00 PM', value: '21:00' }, { label: '9:30 PM', value: '21:30' },
        { label: '10:00 PM', value: '22:00' }, { label: '10:30 PM', value: '22:30' },
        { label: '11:00 PM', value: '23:00' }, { label: '11:30 PM', value: '23:30' },
        { label: '12:00 AM', value: '00:00' },
      ] },
    { id: 'workType', type: 'select', label: 'Work Type', required: true, defaultValue: 'office',
      options: [
        { label: 'Office / in-person job', value: 'office' },
        { label: 'Work from home', value: 'wfh' },
        { label: 'Student', value: 'student' },
        { label: 'Entrepreneur / freelancer', value: 'entrepreneur' },
      ] },
    { id: 'peakTime', type: 'select', label: 'When Are You Most Alert?', required: true, defaultValue: 'morning',
      options: [
        { label: 'Early morning (5–9 AM)', value: 'early' },
        { label: 'Late morning (9 AM–12 PM)', value: 'morning' },
        { label: 'Afternoon (12–5 PM)', value: 'afternoon' },
        { label: 'Evening (5–10 PM)', value: 'evening' },
      ] },
    { id: 'exercise', type: 'select', label: 'Exercise Preference', required: false, defaultValue: 'morning',
      options: [
        { label: 'Morning workout', value: 'morning' },
        { label: 'Lunchtime workout', value: 'lunch' },
        { label: 'Evening workout', value: 'evening' },
        { label: 'No structured exercise', value: 'none' },
      ] },
    { id: 'topPriority', type: 'text', label: 'Today\'s #1 Priority', placeholder: 'e.g. Finish project proposal', required: false, defaultValue: 'Most important task' },
  ],
  generate(inputs) {
    const wakeTime = String(inputs.wakeTime || '06:30')
    const workType = String(inputs.workType || 'office')
    const peakTime = String(inputs.peakTime || 'morning')
    const exercise = String(inputs.exercise || 'morning')
    const topPriority = String(inputs.topPriority || 'Most important task')

    const [wakeH] = wakeTime.split(':').map(Number)
    const addHour = (base: number, add: number) => {
      const h = (base + add) % 24
      return `${String(h).padStart(2, '0')}:00`
    }

    const morningRoutineDuration = 1.5

    const deepWorkStart = peakTime === 'early' ? addHour(wakeH, Math.ceil(morningRoutineDuration))
      : peakTime === 'morning' ? addHour(wakeH, Math.ceil(morningRoutineDuration))
        : '14:00'

    const schedule = [
      { time: wakeTime, label: 'Wake up — hydrate, no phone for 30 minutes', type: 'work' as const },
      { time: addHour(wakeH, 0), label: exercise === 'morning' ? 'Morning workout / exercise (30–45 min)' : 'Morning movement — stretch or short walk (15 min)', type: 'work' as const },
      { time: addHour(wakeH, 1), label: 'Shower · breakfast · review today\'s priorities', type: 'break' as const },
      { time: peakTime === 'early' || peakTime === 'morning' ? deepWorkStart : '09:00', label: `DEEP WORK: ${topPriority}`, type: 'work' as const },
      { time: peakTime === 'early' || peakTime === 'morning' ? addHour(parseInt(deepWorkStart), 2) : '11:00', label: 'Email & Slack triage (25 min max)', type: 'review' as const },
      { time: '12:30', label: exercise === 'lunch' ? 'Lunch + workout (45 min)' : 'Lunch break — away from desk, no screens', type: 'break' as const },
      { time: '13:30', label: peakTime === 'afternoon' ? `DEEP WORK: Continue ${topPriority}` : 'Meetings, calls, collaborative work', type: 'work' as const },
      { time: '15:30', label: 'Admin, emails, planning tasks', type: 'work' as const },
      { time: '17:00', label: workType === 'wfh' || workType === 'entrepreneur' ? 'Shutdown ritual — close all work tabs, plan tomorrow' : 'Leave work / commute home', type: 'review' as const },
      { time: '18:00', label: exercise === 'evening' ? 'Evening workout (45 min)' : 'Personal time — family, hobbies, errands', type: 'rest' as const },
      { time: '20:00', label: 'Wind down — read, light activity, no work', type: 'rest' as const },
      { time: '21:30', label: 'Screen-off, prepare for tomorrow, journal', type: 'review' as const },
      { time: '22:30', label: 'Sleep — protect 7–8 hours', type: 'rest' as const },
    ]

    const sleepHours = 8
    const awakeHours = 24 - sleepHours
    const workHours = workType === 'student' ? 8 : 8
    const deepWorkHours = peakTime === 'morning' || peakTime === 'early' ? 3 : 2

    return {
      headline: `Your personalised ${workType === 'wfh' ? 'work-from-home' : workType} daily schedule`,
      subheadline: `Wake: ${wakeTime} · Peak focus: ${peakTime} · ${deepWorkHours} hours deep work · Exercise: ${exercise}`,
      stats: [
        { label: 'Wake Time', value: wakeTime },
        { label: 'Deep Work Hours', value: `${deepWorkHours} hrs`, note: 'During your peak energy window' },
        { label: 'Sleep Target', value: `${sleepHours} hrs` },
        { label: 'Exercise', value: exercise === 'none' ? 'Not scheduled' : exercise + ' session' },
        { label: 'Priority Task', value: topPriority.slice(0, 25) + (topPriority.length > 25 ? '…' : '') },
        { label: 'Work Style', value: workType === 'wfh' ? 'Work from Home' : workType.charAt(0).toUpperCase() + workType.slice(1) },
      ],
      milestones: [
        { label: 'Run this schedule for 7 consecutive days', date: 'Week 1' },
        { label: 'Identify what needs adjustment', date: 'Week 2' },
        { label: 'Schedule locked in — automatic routine', date: 'Day 21' },
        { label: 'First significant project milestone hit', date: 'Month 1' },
      ],
      weeklySchedule: [
        { week: 'Mon–Tue', focus: 'Hardest work first', tasks: topPriority + ' — no meetings before 10am if possible', notes: 'Highest willpower at week start' },
        { week: 'Wednesday', focus: 'Collaboration day', tasks: 'Meetings, reviews, team sync', notes: 'Save deep work for AM only' },
        { week: 'Thu', focus: 'Execution', tasks: 'Second most important project or task', notes: 'Second energy peak of the week' },
        { week: 'Fri', focus: 'Completion + planning', tasks: 'Wrap up, plan next week, send summaries', notes: 'Don\'t start big new things on Fridays' },
      ],
      dailySchedule: schedule,
      checklists: [
        { title: 'Morning Routine (30 min)', items: ['No phone for first 30 minutes', 'Drink a full glass of water', exercise === 'morning' ? 'Complete workout before breakfast' : 'Light stretch or walk', 'Eat a protein-rich breakfast', 'Review the day\'s top 3 priorities', 'Start your #1 priority task within 90 minutes of waking'] },
        { title: 'Evening Shutdown Ritual', items: ['Write tomorrow\'s top 3 tasks', 'Review what you accomplished today', 'Clear your workspace', 'Close all work apps and tabs', 'Log one win from today', 'Set wake alarm and be in bed on time'] },
      ],
      recommendations: [
        `Your peak energy is ${peakTime} — protect this window ruthlessly for deep work. No meetings, no email.`,
        'The first 90 minutes of your day sets the trajectory. Start with your #1 priority, not your inbox.',
        exercise === 'none' ? 'Consider adding even a 20-min walk — it improves focus and mood for the rest of the day.' : `${exercise.charAt(0).toUpperCase() + exercise.slice(1)} exercise is a great anchor for your routine.`,
        'A shutdown ritual at the same time daily signals your brain that work is done — it dramatically improves rest quality.',
      ],
      nextActions: [
        'Set your alarm for ' + wakeTime + ' tomorrow and don\'t snooze',
        'Write tomorrow\'s #1 priority on paper tonight',
        'Block out your deep work time in your calendar',
        'Implement the shutdown ritual tonight — close everything at your target end time',
      ],
    }
  },
}

export default dailyScheduleBuilder
