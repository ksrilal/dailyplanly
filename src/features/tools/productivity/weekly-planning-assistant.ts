import type { Tool } from '../types'

const weeklyPlanningAssistant: Tool = {
  id: 'weekly-planning-assistant',
  slug: 'weekly-planning-assistant',
  title: 'Weekly Planning Assistant',
  description: 'Plan your entire week in minutes. Set your top goals, allocate time across life areas, and get a structured Mon–Sun schedule with daily focus themes and a weekly review checklist.',
  category: 'productivity',
  icon: 'CalendarDays',
  tags: ['weekly planner', 'planning', 'goals', 'schedule', 'time management'],
  relatedTemplateSlug: 'weekly-planner',
  relatedTemplateCategory: 'productivity',
  inputs: [
    { id: 'goal1', type: 'text', label: 'Most Important Goal This Week', placeholder: 'e.g. Complete product mockups', required: true, defaultValue: 'Top priority this week' },
    { id: 'goal2', type: 'text', label: 'Second Goal', placeholder: 'e.g. Run 3× this week', required: false, defaultValue: '' },
    { id: 'goal3', type: 'text', label: 'Third Goal', placeholder: 'e.g. Call 5 prospects', required: false, defaultValue: '' },
    { id: 'workHours', type: 'number', label: 'Available Work Hours This Week', placeholder: '40', unit: 'hrs', min: 5, max: 80, step: 1, required: true, defaultValue: 40 },
    { id: 'meetings', type: 'number', label: 'Scheduled Meetings/Appointments', placeholder: '5', unit: 'hrs', min: 0, max: 40, step: 0.5, required: false, defaultValue: 5 },
    { id: 'theme', type: 'select', label: 'This Week\'s Focus Theme', required: false, defaultValue: 'execution',
      options: [
        { label: 'Execution — getting things done', value: 'execution' },
        { label: 'Creation — building or writing', value: 'creation' },
        { label: 'Strategy — planning and thinking', value: 'strategy' },
        { label: 'Recovery — rest and recharge', value: 'recovery' },
        { label: 'Connection — people and relationships', value: 'connection' },
      ] },
  ],
  generate(inputs) {
    const goal1 = String(inputs.goal1 || 'Top priority')
    const goal2 = String(inputs.goal2 || '')
    const goal3 = String(inputs.goal3 || '')
    const workHours = Number(inputs.workHours) || 40
    const meetings = Number(inputs.meetings) || 5
    const theme = String(inputs.theme || 'execution')

    const goals = [goal1, goal2, goal3].filter(Boolean)
    const focusHours = workHours - meetings
    const hoursPerGoal = Math.floor(focusHours / goals.length)
    const dailyFocusHours = Math.round((focusHours / 5) * 10) / 10

    const themeLabels: Record<string, string> = { execution: 'Execution', creation: 'Creation', strategy: 'Strategic Thinking', recovery: 'Recovery', connection: 'Connection' }

    const weeklySchedule = [
      { week: 'Monday', focus: `Launch week — ${goal1}`, tasks: `${hoursPerGoal}h on goal 1 · Set week intention · Review plan`, notes: 'Start strong — momentum compounds' },
      { week: 'Tuesday', focus: goals.length > 1 ? goal2 || goal1 : goal1, tasks: `Deep work blocks · ${meetings > 0 ? 'Scheduled meetings' : 'No meetings today — protect focus'}`, notes: 'Second highest energy day of week' },
      { week: 'Wednesday', focus: 'Mid-week review + collaboration', tasks: 'Team sync · review week progress · adjust if needed', notes: 'Mid-week reset — are you on track?' },
      { week: 'Thursday', focus: goals.length > 2 ? goal3 || goal1 : goal1, tasks: `${hoursPerGoal}h focused work · complete weekly commitments`, notes: 'Most underrated day — high output' },
      { week: 'Friday', focus: 'Complete + plan ahead', tasks: 'Finish open tasks · write next week\'s plan · celebrate wins', notes: 'Close loops before weekend' },
      { week: 'Saturday', focus: 'Rest or personal projects', tasks: 'Family · hobbies · low-cognitive activities', notes: 'Recharge for next week' },
      { week: 'Sunday', focus: 'Weekly review + week ahead', tasks: '30-min review · set next week\'s goals · prepare workspace', notes: 'Sunday planning = Monday clarity' },
    ]

    return {
      headline: `${focusHours} hours of focused work this week across ${goals.length} goal${goals.length > 1 ? 's' : ''}`,
      subheadline: `Theme: ${themeLabels[theme]} · ${dailyFocusHours} hrs/day · ${meetings} hrs meetings · ${hoursPerGoal} hrs per goal`,
      stats: [
        { label: 'Total Work Hours', value: `${workHours} hrs` },
        { label: 'Focus Hours', value: `${focusHours} hrs`, note: 'After meetings' },
        { label: 'Hours per Goal', value: `${hoursPerGoal} hrs` },
        { label: 'Daily Focus', value: `${dailyFocusHours} hrs/day` },
        { label: 'Weekly Theme', value: themeLabels[theme] },
        { label: 'Active Goals', value: `${goals.length}` },
      ],
      milestones: goals.map((g, i) => ({
        label: `Goal ${i + 1} complete: ${g}`,
        date: `By Friday`,
        description: `${hoursPerGoal} hours allocated`,
      })),
      weeklySchedule,
      checklists: [
        {
          title: 'Weekly Planning (Sunday — 30 min)',
          items: [
            'Review last week — what did and didn\'t happen?',
            'Write this week\'s top 3 goals',
            'Block focus time for each goal in calendar',
            'Review upcoming meetings — any to decline?',
            'Set a clear theme for the week',
            'Prepare workspace / desk for Monday',
            'Set Monday alarm and lay out clothes',
          ],
        },
        {
          title: 'Weekly Review (Friday — 20 min)',
          items: [
            'Did I achieve each of the 3 goals? Rate 1–10',
            'What was the biggest win this week?',
            'What distracted me most?',
            'What would I do differently?',
            'What needs to carry over to next week?',
            'Celebrate at least one win out loud',
          ],
        },
      ],
      recommendations: [
        `With ${focusHours} hours available (after ${meetings}h in meetings), you can realistically accomplish ${goals.length} meaningful goals.`,
        `Monday and Thursday are your highest-output days — schedule ${goal1} for these.`,
        meetings > 15 ? `You have ${meetings} hours in meetings this week. Consider batch-scheduling meetings on Tuesday/Thursday to protect Mon/Wed/Fri for deep work.` : 'Your meeting load looks manageable — protect morning hours for deep work.',
        'Don\'t start next week without a Sunday planning session — it\'s the highest-ROI 30 minutes of the week.',
      ],
      nextActions: [
        'Open your calendar and block focus time for ' + goal1 + ' right now',
        `Write all 3 goals on paper and put it where you\'ll see it every morning`,
        'Send this week\'s plan to one accountability partner',
        'Schedule your Friday review session (20 min at 4:30 PM)',
      ],
    }
  },
}

export default weeklyPlanningAssistant
