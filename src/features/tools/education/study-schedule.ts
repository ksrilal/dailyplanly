import type { Tool } from '../types'

const studySchedule: Tool = {
  id: 'study-schedule-builder',
  slug: 'study-schedule-builder',
  title: 'Study Schedule Builder',
  description: 'Calculate how many hours per day you need to study to cover your material.',
  category: 'education',
  hasExport: true,
  relatedTemplateId: 'weekly-planner-soft-paper',
  tags: ['study', 'schedule', 'education', 'exam', 'planning'],
  inputs: [
    { id: 'days', type: 'number', label: 'Days Until Exam', placeholder: '14', required: true, min: 1, max: 365 },
    { id: 'chapters', type: 'number', label: 'Chapters to Cover', placeholder: '10', required: true, min: 1 },
    { id: 'hoursPerChapter', type: 'number', label: 'Hours Per Chapter', placeholder: '2', required: true, min: 0.5, defaultValue: 2 },
    { id: 'studyDaysPerWeek', type: 'number', label: 'Study Days Per Week', placeholder: '5', required: false, min: 1, max: 7, defaultValue: 5 },
  ],
  calculate(inputs) {
    const days = Number(inputs.days) || 14
    const chapters = Number(inputs.chapters) || 10
    const hoursPerChapter = Number(inputs.hoursPerChapter) || 2
    const studyDaysPerWeek = Number(inputs.studyDaysPerWeek) || 5

    const totalHours = chapters * hoursPerChapter
    const studyDays = Math.floor(days * (studyDaysPerWeek / 7))
    const hoursPerDay = studyDays > 0 ? (totalHours / studyDays).toFixed(1) : '0'

    return {
      primary: `${hoursPerDay} hours/day`,
      secondary: `${totalHours} total hours across ${studyDays} study days`,
      sections: [
        { label: 'Hours per day', value: `${hoursPerDay}h` },
        { label: 'Total study hours', value: `${totalHours}h` },
        { label: 'Available study days', value: String(studyDays) },
        { label: 'Chapters per day', value: (chapters / studyDays).toFixed(1) },
      ],
      exportText: `Study Plan\nDays until exam: ${days}\nHours per day: ${hoursPerDay}\nTotal hours: ${totalHours}`,
    }
  },
}

export default studySchedule
