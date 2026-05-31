import type { Template } from '@/features/templates/types'

export const assignmentSubmissionTemplate: Template = {
  id: 'tpl-039',
  slug: 'assignment-submission',
  title: 'Assignment Submission Checklist',
  description: 'Never lose marks to administrative errors. This submission checklist covers writing quality, formatting, referencing, proofreading, and the technical steps to submit with confidence.',
  category: 'education',
  type: 'checklist',
  featured: false,
  tags: ['assignment', 'essay', 'student', 'submission', 'academic writing'],
  previewImage: '/templates/previews/assignment-submission.png',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: 'ci-as-1', text: 'Re-read the assignment brief — confirm you answered the question', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-2', text: 'Check word count is within the allowed range (±10%)', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-3', text: 'Introduction: clear thesis statement and signposting', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-4', text: 'Each paragraph: topic sentence, evidence, analysis, link', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-5', text: 'Conclusion: summary of key arguments, no new points', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-6', text: 'All claims are supported by cited evidence', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-7', text: 'All citations are in the correct referencing style (Harvard/APA/Chicago)', checked: false, order: 6, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-8', text: 'Reference list is complete and alphabetically ordered', checked: false, order: 7, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-9', text: 'No plagiarism — all sources properly attributed', checked: false, order: 8, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-10', text: 'Run through Turnitin or plagiarism checker if required', checked: false, order: 9, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-11', text: 'Grammar and spelling checked (proofread + spell-check tool)', checked: false, order: 10, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-12', text: 'Read entire assignment aloud to catch awkward sentences', checked: false, order: 11, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-13', text: 'Font is correct — usually Times New Roman 12pt or Arial 11pt', checked: false, order: 12, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-14', text: 'Line spacing is correct — usually 1.5 or double spaced', checked: false, order: 13, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-15', text: 'Page margins are standard (2.5 cm all sides)', checked: false, order: 14, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-16', text: 'Cover page includes name, student ID, module, date', checked: false, order: 15, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-17', text: 'Page numbers added in header or footer', checked: false, order: 16, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-18', text: 'Save final version as PDF (unless instructed otherwise)', checked: false, order: 17, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-19', text: 'File name is correct — check submission portal requirements', checked: false, order: 18, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-20', text: 'Submit via correct portal or platform', checked: false, order: 19, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-21', text: 'Download submission confirmation receipt or screenshot', checked: false, order: 20, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-22', text: 'Check submission went through before the deadline', checked: false, order: 21, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-as-23', text: 'Email yourself a backup copy', checked: false, order: 22, parentId: null, collapsed: false, depth: 0 },
    ]
  }
}
