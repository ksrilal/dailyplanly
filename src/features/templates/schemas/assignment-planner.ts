import type { Template } from '@/features/templates/types'

export const assignmentPlannerTemplate: Template = {
  id: 'tpl-021',
  slug: 'assignment-planner',
  title: 'Assignment Planner',
  description: 'Never miss a deadline again. Track all assignments, manage submission dates, plan study blocks around workload, and monitor grades with this comprehensive academic planner.',
  category: 'education',
  type: 'planner',
  featured: false,
  tags: ['assignments', 'deadlines', 'student', 'university', 'college'],
  previewImage: '/templates/previews/assignment-planner.png',
  plannerDefaults: {
    theme: 'wellness-calm',
    orientation: 'landscape',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'focus', label: 'Assignment Priorities', order: 0, width: 'half',
        content: {
          items: [
            { label: 'Economics essay — due Friday, 3,000 words', priority: 'high' },
            { label: 'Chemistry lab report — due next Monday', priority: 'high' },
            { label: 'History presentation slides — due Wednesday', priority: 'medium' },
            { label: 'Maths problem set — due in 2 weeks', priority: 'medium' },
            { label: 'Psychology reading response — due end of month', priority: 'low' },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Assignments Status', order: 1, width: 'half',
        content: { title: 'Assignments Completed', value: '3', unit: '/ 8 due', note: 'This semester' }
      },
      {
        id: 'b3', type: 'table', label: 'Assignment Tracker', order: 2, width: 'full',
        content: {
          headers: ['Subject', 'Assignment', 'Due Date', 'Word Count', 'Status', 'Grade'],
          rows: [
            ['Economics', '2,000-word market analysis', '15 Nov', '2,000', 'In Progress', ''],
            ['Chemistry', 'Titration lab report', '18 Nov', '1,500', 'Not started', ''],
            ['History', 'Cold War presentation', '13 Nov', '15 slides', 'In Progress', ''],
            ['Mathematics', 'Problem set 4', '25 Nov', '20 Qs', 'Not started', ''],
            ['Psychology', 'Article response paper', '30 Nov', '800', 'Not started', ''],
            ['Business Law', 'Contract case analysis', '5 Dec', '2,500', 'Not started', ''],
            ['Economics', 'Essay on inflation causes', '10 Dec', '3,000', 'Not started', ''],
            ['Chemistry', 'Organic synthesis report', '15 Dec', '2,000', 'Not started', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'goal', label: 'Semester Goal', order: 3, width: 'half',
        content: {
          goal: 'Achieve 2:1 or higher grade in all modules this semester',
          milestones: [
            { label: 'Submit all November assignments on time', done: false },
            { label: 'Achieve 65%+ on Economics essay', done: false },
            { label: 'No late submissions this semester', done: false },
            { label: 'Complete all December assignments by Dec 14', done: false },
            { label: 'End of semester average: 65%+', done: false },
          ]
        }
      },
      {
        id: 'b5', type: 'routine', label: 'Study Blocks This Week', order: 4, width: 'half',
        content: {
          slots: [
            { time: 'Mon 9–11am', label: 'Economics essay — research phase' },
            { time: 'Mon 2–4pm', label: 'Economics essay — first draft' },
            { time: 'Tue 9–11am', label: 'History presentation — build slides' },
            { time: 'Wed 9–10am', label: 'History presentation — rehearse' },
            { time: 'Thu 9–12pm', label: 'Economics essay — second draft & edit' },
            { time: 'Fri 9–11am', label: 'Chemistry lab report — write up' },
          ]
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Assignment Notes', order: 5, width: 'full',
        content: { lines: 4, text: '' }
      },
    ]
  }
}
