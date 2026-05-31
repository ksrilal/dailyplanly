import type { Tool } from '../types'

const habitStreak: Tool = {
  id: 'habit-streak-calculator',
  slug: 'habit-streak-calculator',
  title: 'Habit Streak Calculator',
  description: 'Find out how many days you need to build a habit and track your milestone dates.',
  category: 'productivity',
  hasExport: false,
  relatedTemplateId: 'habit-tracker-monthly',
  tags: ['habit', 'streak', 'routine', 'consistency', 'tracker'],
  inputs: [
    { id: 'startDay', type: 'select', label: 'Start Day', required: false, defaultValue: 'today', options: [
      { value: 'today', label: 'Today' },
    ]},
    { id: 'target', type: 'number', label: 'Target Days', placeholder: '66', required: false, min: 1, max: 365, defaultValue: 66 },
    { id: 'currentStreak', type: 'number', label: 'Current Streak (days)', placeholder: '0', required: false, min: 0, defaultValue: 0 },
  ],
  calculate(inputs) {
    const target = Number(inputs.target) || 66
    const current = Number(inputs.currentStreak) || 0
    const remaining = Math.max(0, target - current)
    const pct = Math.min(100, Math.round((current / target) * 100))

    const finishDate = new Date()
    finishDate.setDate(finishDate.getDate() + remaining)
    const dateStr = finishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    return {
      primary: remaining === 0 ? 'Habit formed! 🎉' : `${remaining} days remaining`,
      secondary: remaining > 0 ? `Finish by ${dateStr}` : `Completed on day ${current}`,
      sections: [
        { label: 'Progress', value: `${pct}%` },
        { label: 'Current streak', value: `${current} days` },
        { label: 'Remaining', value: `${remaining} days` },
        { label: 'Target', value: `${target} days` },
      ],
    }
  },
}

export default habitStreak
