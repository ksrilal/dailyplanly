import type { Template } from '@/features/templates/types'

export const examDayTemplate: Template = {
  id: 'tpl-038',
  slug: 'exam-day',
  title: 'Exam Day Checklist',
  description: 'Walk into your exam feeling prepared, calm, and confident. This exam day checklist covers everything from the night before to returning home after the paper.',
  category: 'education',
  type: 'checklist',
  featured: false,
  tags: ['exam', 'exams', 'student', 'preparation', 'test day'],
  previewImage: '/templates/previews/exam-day.png',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: 'ci-ed-1', text: 'Night before: review summary notes lightly — no cramming', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-2', text: 'Night before: pack your exam bag', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-3', text: 'Night before: set two alarms and be in bed by 10pm', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-4', text: 'Morning: wake up on time with enough buffer', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-5', text: 'Eat a proper breakfast — slow-release carbs, no heavy food', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-6', text: 'Drink water — stay hydrated before and during', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-7', text: 'Student ID card or exam admission slip', checked: false, order: 6, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-8', text: 'Two black or blue pens (plus a spare)', checked: false, order: 7, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-9', text: 'Pencil and eraser for diagrams and calculations', checked: false, order: 8, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-10', text: 'Approved calculator (battery checked)', checked: false, order: 9, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-11', text: 'Ruler, protractor or other required equipment', checked: false, order: 10, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-12', text: 'Clear pencil case (check exam board rules)', checked: false, order: 11, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-13', text: 'Water bottle (transparent, label removed)', checked: false, order: 12, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-14', text: 'Small snack for after the exam', checked: false, order: 13, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-15', text: 'Confirm exam location and arrival time', checked: false, order: 14, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-16', text: 'Arrive at exam venue 15–20 minutes early', checked: false, order: 15, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-17', text: 'No phone inside exam hall — turn off and leave outside', checked: false, order: 16, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-18', text: 'In exam: read all questions before starting', checked: false, order: 17, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-19', text: 'In exam: plan your time — allocate minutes per question', checked: false, order: 18, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-20', text: 'In exam: don\'t get stuck — move on and come back', checked: false, order: 19, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-21', text: 'In exam: check your name and candidate number on every page', checked: false, order: 20, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-22', text: 'In exam: 10 minutes before end — review all answers', checked: false, order: 21, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ed-23', text: 'After exam: reward yourself — you earned it', checked: false, order: 22, parentId: null, collapsed: false, depth: 0 },
    ]
  }
}
