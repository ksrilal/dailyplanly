import type { Tool } from '../types'

const focusTimer: Tool = {
  id: 'focus-session-planner',
  slug: 'focus-session-planner',
  title: 'Focus Session Planner',
  description: 'Plan your Pomodoro-style focus sessions for the day.',
  category: 'productivity',
  hasExport: true,
  relatedTemplateId: 'daily-planner-minimal',
  tags: ['pomodoro', 'focus', 'timer', 'productivity', 'work sessions'],
  inputs: [
    { id: 'hours', type: 'number', label: 'Available Hours', placeholder: '4', required: true, min: 0.5, max: 12, defaultValue: 4 },
    { id: 'focusMins', type: 'select', label: 'Focus Block Length', required: false, defaultValue: '25', options: [
      { value: '25', label: '25 min (Classic Pomodoro)' },
      { value: '45', label: '45 min (Deep Work)' },
      { value: '90', label: '90 min (Ultradian)' },
    ]},
    { id: 'breakMins', type: 'select', label: 'Short Break', required: false, defaultValue: '5', options: [
      { value: '5', label: '5 min' },
      { value: '10', label: '10 min' },
      { value: '15', label: '15 min' },
    ]},
  ],
  calculate(inputs) {
    const hours = Number(inputs.hours) || 4
    const focus = Number(inputs.focusMins) || 25
    const rest = Number(inputs.breakMins) || 5
    const cycleMin = focus + rest
    const totalMin = hours * 60
    const cycles = Math.floor(totalMin / cycleMin)
    const focusTime = cycles * focus

    return {
      primary: `${cycles} focus sessions`,
      secondary: `${focusTime} mins of focused work`,
      sections: [
        { label: 'Focus sessions', value: String(cycles) },
        { label: 'Focus time', value: `${focusTime} min (${(focusTime / 60).toFixed(1)}h)` },
        { label: 'Break time', value: `${cycles * rest} min` },
        { label: 'Cycle length', value: `${cycleMin} min` },
      ],
      exportText: `Focus Plan\nSessions: ${cycles}\nFocus time: ${focusTime} min\nBreak time: ${cycles * rest} min`,
    }
  },
}

export default focusTimer
