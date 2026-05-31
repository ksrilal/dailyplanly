import type { Template } from '@/features/templates/types'

export const meetingPreparationTemplate: Template = {
  id: 'tpl-044',
  slug: 'meeting-preparation',
  title: 'Meeting Preparation Checklist',
  description: 'Walk into every meeting fully prepared. Cover agenda, pre-reads, stakeholder context, technology checks, and follow-up systems so every meeting drives real outcomes.',
  category: 'work-office',
  type: 'checklist',
  featured: false,
  tags: ['meetings', 'work', 'preparation', 'agenda', 'productivity'],
  previewImage: '/templates/previews/meeting-preparation.png',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: 'ci-mp-1', text: 'Confirm meeting date, time, and location (or video link)', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-2', text: 'Confirm all attendees have accepted the invite', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-3', text: 'Define the meeting objective — what must be decided or resolved?', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-4', text: 'Create and share the agenda at least 24 hours before', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-5', text: 'Allocate time for each agenda item', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-6', text: 'Read all pre-read materials and reports', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-7', text: 'Review notes and action items from the previous meeting', checked: false, order: 6, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-8', text: 'Prepare any slides, data or documents you will present', checked: false, order: 7, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-9', text: 'Know each attendee\'s role and perspective on the topic', checked: false, order: 8, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-10', text: 'Anticipate any disagreements and prepare your response', checked: false, order: 9, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-11', text: 'Prepare your key questions to ask', checked: false, order: 10, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-12', text: 'Have your desired outcomes and decisions clearly in mind', checked: false, order: 11, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-13', text: 'Test video conferencing tech and screen share 10 min before', checked: false, order: 12, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-14', text: 'Charge laptop or phone if needed', checked: false, order: 13, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-15', text: 'Have notebook or task manager ready for action items', checked: false, order: 14, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-16', text: 'Join meeting or arrive 2–3 minutes early', checked: false, order: 15, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-17', text: 'Assign someone to take notes or take them yourself', checked: false, order: 16, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-18', text: 'After: send meeting notes and action items within 24 hours', checked: false, order: 17, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-19', text: 'After: log all action items in your task management system', checked: false, order: 18, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-mp-20', text: 'After: schedule follow-up meeting if needed', checked: false, order: 19, parentId: null, collapsed: false, depth: 0 },
    ]
  }
}
