import type { Template } from '@/features/templates/types'

export const examPreparationSystemTemplate: Template = {
  id: 'tpl-049',
  slug: 'exam-preparation-system',
  title: 'Exam Preparation System',
  description: 'A complete exam prep system covering subject mapping, spaced repetition scheduling, past paper practice, weak area targeting, and exam day execution for any qualification.',
  category: 'education',
  type: 'checklist',
  featured: false,
  tags: ['exams', 'revision', 'student', 'study system', 'preparation'],
  previewImage: '/templates/previews/exam-preparation-system.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-eps-1', text: 'Exam Planning', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-eps-2', text: 'List all exams with dates, times, and locations', checked: false, order: 0, parentId: 'ci-eps-1', collapsed: false, depth: 1 },
      { id: 'ci-eps-3', text: 'Download full syllabus for each subject', checked: false, order: 1, parentId: 'ci-eps-1', collapsed: false, depth: 1 },
      { id: 'ci-eps-4', text: 'Create a reverse study calendar from exam date', checked: false, order: 2, parentId: 'ci-eps-1', collapsed: false, depth: 1 },
      { id: 'ci-eps-5', text: 'Allocate study time by subject weight and difficulty', checked: false, order: 3, parentId: 'ci-eps-1', collapsed: false, depth: 1 },

      { id: 'ci-eps-6', text: 'Content Mastery', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-eps-7', text: 'Subject 1: First full pass of all topics', checked: false, order: 0, parentId: 'ci-eps-6', collapsed: false, depth: 1 },
      { id: 'ci-eps-8', text: 'Create summary notes for each chapter', checked: false, order: 0, parentId: 'ci-eps-7', collapsed: false, depth: 2 },
      { id: 'ci-eps-9', text: 'Make flashcards for key definitions and formulas', checked: false, order: 1, parentId: 'ci-eps-7', collapsed: false, depth: 2 },
      { id: 'ci-eps-10', text: 'Complete all textbook practice questions', checked: false, order: 2, parentId: 'ci-eps-7', collapsed: false, depth: 2 },
      { id: 'ci-eps-11', text: 'Subject 2: First full pass of all topics', checked: false, order: 1, parentId: 'ci-eps-6', collapsed: false, depth: 1 },
      { id: 'ci-eps-12', text: 'Create summary notes for each chapter', checked: false, order: 0, parentId: 'ci-eps-11', collapsed: false, depth: 2 },
      { id: 'ci-eps-13', text: 'Make flashcards for key definitions and formulas', checked: false, order: 1, parentId: 'ci-eps-11', collapsed: false, depth: 2 },
      { id: 'ci-eps-14', text: 'Complete all textbook practice questions', checked: false, order: 2, parentId: 'ci-eps-11', collapsed: false, depth: 2 },

      { id: 'ci-eps-15', text: 'Active Recall & Spaced Repetition', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-eps-16', text: 'Set up Anki or flashcard system', checked: false, order: 0, parentId: 'ci-eps-15', collapsed: false, depth: 1 },
      { id: 'ci-eps-17', text: 'Review flashcards daily — 20 minutes minimum', checked: false, order: 1, parentId: 'ci-eps-15', collapsed: false, depth: 1 },
      { id: 'ci-eps-18', text: 'Use the Feynman technique on hard concepts', checked: false, order: 2, parentId: 'ci-eps-15', collapsed: false, depth: 1 },
      { id: 'ci-eps-19', text: 'Weekly: test yourself without notes on each topic', checked: false, order: 3, parentId: 'ci-eps-15', collapsed: false, depth: 1 },

      { id: 'ci-eps-20', text: 'Past Paper Practice', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-eps-21', text: 'Download 5 years of past papers for each subject', checked: false, order: 0, parentId: 'ci-eps-20', collapsed: false, depth: 1 },
      { id: 'ci-eps-22', text: 'First round: open-book, understand mark schemes', checked: false, order: 1, parentId: 'ci-eps-20', collapsed: false, depth: 1 },
      { id: 'ci-eps-23', text: 'Second round: timed, closed-book conditions', checked: false, order: 2, parentId: 'ci-eps-20', collapsed: false, depth: 1 },
      { id: 'ci-eps-24', text: 'Review every wrong answer — find the gap in understanding', checked: false, order: 3, parentId: 'ci-eps-20', collapsed: false, depth: 1 },
      { id: 'ci-eps-25', text: 'Sit 2 full mock exams under real conditions', checked: false, order: 4, parentId: 'ci-eps-20', collapsed: false, depth: 1 },

      { id: 'ci-eps-26', text: 'Exam Day Preparation', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-eps-27', text: 'Night before: light review only, early bedtime', checked: false, order: 0, parentId: 'ci-eps-26', collapsed: false, depth: 1 },
      { id: 'ci-eps-28', text: 'Pack exam supplies the night before', checked: false, order: 1, parentId: 'ci-eps-26', collapsed: false, depth: 1 },
      { id: 'ci-eps-29', text: 'Morning: good breakfast, hydrate, arrive early', checked: false, order: 2, parentId: 'ci-eps-26', collapsed: false, depth: 1 },
      { id: 'ci-eps-30', text: 'In exam: read all questions first, plan time allocation', checked: false, order: 3, parentId: 'ci-eps-26', collapsed: false, depth: 1 },
    ]
  }
}
