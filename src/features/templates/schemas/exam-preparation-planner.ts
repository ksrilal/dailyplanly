import type { Template } from '@/features/templates/types'

export const examPreparationPlannerTemplate: Template = {
  id: 'tpl-020',
  slug: 'exam-preparation-planner',
  title: 'Exam Preparation Planner',
  description: 'Ace your exams with a structured preparation planner. Map every topic, track revision confidence levels, schedule timed practice papers, and build the focus habits that deliver results.',
  category: 'education',
  type: 'planner',
  featured: false,
  tags: ['exams', 'revision', 'student', 'preparation', 'study'],
  previewImage: '/templates/previews/exam-preparation-planner.png',
  plannerDefaults: {
    theme: 'soft-paper',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Exam Goal', order: 0, width: 'half',
        content: {
          goal: 'Pass the Chartered Accountancy exam with 70%+ in all three papers',
          milestones: [
            { label: 'Complete Paper 1 syllabus revision', done: false },
            { label: 'Complete Paper 2 syllabus revision', done: false },
            { label: 'Complete Paper 3 syllabus revision', done: false },
            { label: 'Sit 3 full timed mock exams', done: false },
            { label: 'Final review of all weak areas', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'timeline', label: 'Exam Prep Roadmap', order: 1, width: 'half',
        content: {
          events: [
            { label: 'Paper 1 — full content revision', date: 'Weeks 1–3' },
            { label: 'Paper 2 — full content revision', date: 'Weeks 4–6' },
            { label: 'Paper 3 — full content revision', date: 'Weeks 7–8' },
            { label: 'Past papers & mock exams begin', date: 'Week 9' },
            { label: 'Weak area intensive review', date: 'Week 11' },
            { label: 'Final revision sprint', date: 'Week 12' },
            { label: 'EXAM WEEK', date: 'Week 13' },
          ]
        }
      },
      {
        id: 'b3', type: 'table', label: 'Topic Revision Tracker', order: 2, width: 'full',
        content: {
          headers: ['Paper', 'Topic', 'Understood?', 'Practice Qs', 'Revised?', 'Confidence (1–5)'],
          rows: [
            ['Paper 1', 'Financial statements', 'Yes', '15/20', 'Yes', '4'],
            ['Paper 1', 'Tax computations', 'Partial', '8/15', 'No', '2'],
            ['Paper 1', 'Audit procedures', 'No', '0/10', 'No', '1'],
            ['Paper 2', 'Management accounting', 'Yes', '12/15', 'Yes', '4'],
            ['Paper 2', 'Strategic analysis', 'Partial', '5/10', 'No', '3'],
            ['Paper 3', 'Ethics and governance', 'No', '0/8', 'No', '1'],
            ['Paper 3', 'Business strategy', 'Partial', '6/12', 'No', '2'],
          ]
        }
      },
      {
        id: 'b4', type: 'focus', label: 'Priority Topics (Weak Areas)', order: 3, width: 'half',
        content: {
          items: [
            { label: 'Audit procedures — read and practice 10 Qs', priority: 'high' },
            { label: 'Tax computations — work through examples', priority: 'high' },
            { label: 'Ethics and governance — full chapter read', priority: 'high' },
            { label: 'Business strategy frameworks — mind map', priority: 'medium' },
            { label: 'Strategic analysis case studies', priority: 'medium' },
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Exam Prep Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Study 6+ focused hours' },
            { label: 'Do at least 10 practice questions' },
            { label: 'Review yesterday\'s notes first' },
            { label: 'Sleep 8 hours minimum' },
            { label: 'No exam anxiety spiralling' },
          ],
          days: 7
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Exam Notes', order: 5, width: 'full',
        content: { lines: 5, text: '' }
      },
    ]
  }
}
