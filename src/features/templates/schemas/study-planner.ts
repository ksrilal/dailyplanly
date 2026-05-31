import type { Template } from '@/features/templates/types'

export const studyPlannerTemplate: Template = {
  id: 'tpl-019',
  slug: 'study-planner',
  title: 'Study Planner',
  description: 'Study smarter, not harder. Plan focused study sessions, track subject progress, build consistent study habits, and stay on top of assignments with this comprehensive student planner.',
  category: 'education',
  type: 'planner',
  featured: true,
  tags: ['study', 'student', 'academics', 'revision', 'learning'],
  previewImage: '/templates/previews/study-planner.png',
  plannerDefaults: {
    theme: 'study-focus',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'focus', label: 'Study Priorities Today', order: 0, width: 'full',
        content: {
          items: [
            { label: 'Revise Chapter 7 — Organic Chemistry mechanisms', priority: 'high' },
            { label: 'Complete Economics essay introduction draft', priority: 'high' },
            { label: 'Review calculus differentiation exercises', priority: 'medium' },
            { label: 'Read case study for Business Law', priority: 'medium' },
            { label: 'Organise research notes for history essay', priority: 'low' },
          ]
        }
      },
      {
        id: 'b2', type: 'routine', label: 'Study Schedule', order: 1, width: 'full',
        content: {
          slots: [
            { time: '08:00', label: 'Morning review — 15 min flashcards, yesterday\'s notes' },
            { time: '08:30', label: '📚 STUDY BLOCK 1 — Chemistry (90 min Pomodoro)' },
            { time: '10:00', label: 'Break — walk, snack, no phone' },
            { time: '10:15', label: '📚 STUDY BLOCK 2 — Economics essay (60 min)' },
            { time: '11:15', label: 'Short break' },
            { time: '11:30', label: '📚 STUDY BLOCK 3 — Mathematics (60 min)' },
            { time: '12:30', label: 'Lunch — away from desk' },
            { time: '13:30', label: '📚 STUDY BLOCK 4 — Business Law reading (45 min)' },
            { time: '14:15', label: 'Break — short walk' },
            { time: '14:30', label: '📚 STUDY BLOCK 5 — History notes (60 min)' },
            { time: '15:30', label: 'Review session — re-read today\'s notes (20 min)' },
            { time: '16:00', label: 'Admin — email tutor, update assignment tracker' },
            { time: '19:00', label: 'Light evening revision — flashcards only' },
            { time: '22:00', label: 'Sleep' },
          ]
        }
      },
      {
        id: 'b3', type: 'table', label: 'Subject Tracker', order: 2, width: 'full',
        content: {
          headers: ['Subject', 'Current Topic', 'Pages/Chapters', 'Progress', 'Next Action'],
          rows: [
            ['Chemistry', 'Organic mechanisms', 'Ch 7 (pp. 180–220)', '60%', 'Finish mechanisms, do practice Qs'],
            ['Economics', 'Market structures', 'Essay + Ch 4', '30%', 'Complete introduction draft'],
            ['Mathematics', 'Differential calculus', 'Ex 6.1–6.4', '75%', 'Integration next'],
            ['Business Law', 'Contract law', 'Case studies', '45%', 'Read 3 case studies'],
            ['History', 'Cold War origins', 'Essay prep', '20%', 'Organise research, create outline'],
          ]
        }
      },
      {
        id: 'b4', type: 'goal', label: 'Study Goal', order: 3, width: 'half',
        content: {
          goal: 'Score 75%+ average across all A-Level exams in May',
          milestones: [
            { label: 'Complete full first pass of all subjects', done: false },
            { label: 'Do 2 past papers per subject', done: false },
            { label: 'All weak areas re-studied', done: false },
            { label: 'Final week timed practice exams', done: false },
            { label: 'Exam week — execute the plan', done: false },
          ]
        }
      },
      {
        id: 'b5', type: 'habit-tracker', label: 'Study Habits', order: 4, width: 'half',
        content: {
          habits: [
            { label: 'Study 6+ hours' },
            { label: 'No social media until 5pm' },
            { label: 'Flashcard review morning & evening' },
            { label: 'Away-from-desk lunch break' },
            { label: 'Sleep 8 hours' },
          ],
          days: 7
        }
      },
    ]
  }
}
