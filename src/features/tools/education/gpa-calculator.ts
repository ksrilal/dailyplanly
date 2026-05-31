import type { Tool } from '../types'

const gpaCalculator: Tool = {
  id: 'gpa-calculator',
  slug: 'gpa-calculator',
  title: 'GPA Calculator',
  description: 'Calculate your cumulative GPA from your course grades and credit hours.',
  category: 'education',
  hasExport: false,
  relatedTemplateId: 'simple-checklist',
  tags: ['gpa', 'grades', 'education', 'university', 'calculator'],
  inputs: [
    { id: 'credits1', type: 'number', label: 'Course 1 Credits', placeholder: '3', required: true, min: 0, max: 10, defaultValue: 3 },
    { id: 'grade1', type: 'select', label: 'Course 1 Grade', required: true, defaultValue: 'A', options: [
      { value: '4.0', label: 'A / A+' }, { value: '3.7', label: 'A-' },
      { value: '3.3', label: 'B+' }, { value: '3.0', label: 'B' }, { value: '2.7', label: 'B-' },
      { value: '2.3', label: 'C+' }, { value: '2.0', label: 'C' }, { value: '1.7', label: 'C-' },
      { value: '1.0', label: 'D' }, { value: '0.0', label: 'F' },
    ]},
    { id: 'credits2', type: 'number', label: 'Course 2 Credits', placeholder: '3', required: false, min: 0, max: 10, defaultValue: 3 },
    { id: 'grade2', type: 'select', label: 'Course 2 Grade', required: false, defaultValue: 'A', options: [
      { value: '4.0', label: 'A / A+' }, { value: '3.7', label: 'A-' },
      { value: '3.3', label: 'B+' }, { value: '3.0', label: 'B' }, { value: '2.7', label: 'B-' },
      { value: '2.3', label: 'C+' }, { value: '2.0', label: 'C' }, { value: '1.7', label: 'C-' },
      { value: '1.0', label: 'D' }, { value: '0.0', label: 'F' },
    ]},
    { id: 'credits3', type: 'number', label: 'Course 3 Credits', placeholder: '3', required: false, min: 0, max: 10, defaultValue: 3 },
    { id: 'grade3', type: 'select', label: 'Course 3 Grade', required: false, defaultValue: 'A', options: [
      { value: '4.0', label: 'A / A+' }, { value: '3.7', label: 'A-' },
      { value: '3.3', label: 'B+' }, { value: '3.0', label: 'B' }, { value: '2.7', label: 'B-' },
      { value: '2.3', label: 'C+' }, { value: '2.0', label: 'C' }, { value: '1.7', label: 'C-' },
      { value: '1.0', label: 'D' }, { value: '0.0', label: 'F' },
    ]},
  ],
  calculate(inputs) {
    const courses = [
      { credits: Number(inputs.credits1) || 0, grade: Number(inputs.grade1) || 0 },
      { credits: Number(inputs.credits2) || 0, grade: Number(inputs.grade2) || 0 },
      { credits: Number(inputs.credits3) || 0, grade: Number(inputs.grade3) || 0 },
    ].filter((c) => c.credits > 0)

    if (courses.length === 0) return { primary: '—', secondary: 'Add at least one course' }

    const totalPoints = courses.reduce((sum, c) => sum + c.credits * c.grade, 0)
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'

    return {
      primary: `GPA: ${gpa}`,
      secondary: `${totalCredits} total credit hours`,
      sections: [
        { label: 'GPA', value: gpa },
        { label: 'Total Credits', value: String(totalCredits) },
        { label: 'Grade Points', value: totalPoints.toFixed(1) },
      ],
    }
  },
}

export default gpaCalculator
