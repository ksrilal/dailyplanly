import type { Template } from '@/features/templates/types'

export const eventPlanningSystemTemplate: Template = {
  id: 'tpl-054',
  slug: 'event-planning-system',
  title: 'Event Planning System',
  description: 'Plan any event flawlessly — birthday party, corporate event, conference, or celebration. Covers venue, catering, suppliers, guest management, timeline, and day-of logistics.',
  category: 'work-office',
  type: 'checklist',
  featured: false,
  tags: ['event planning', 'party', 'conference', 'organisation', 'logistics'],
  previewImage: '/templates/previews/event-planning-system.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-evp-1', text: 'Event Brief', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-evp-2', text: 'Define event objective and type', checked: false, order: 0, parentId: 'ci-evp-1', collapsed: false, depth: 1 },
      { id: 'ci-evp-3', text: 'Set expected guest count', checked: false, order: 1, parentId: 'ci-evp-1', collapsed: false, depth: 1 },
      { id: 'ci-evp-4', text: 'Set total event budget', checked: false, order: 2, parentId: 'ci-evp-1', collapsed: false, depth: 1 },
      { id: 'ci-evp-5', text: 'Choose and confirm event date', checked: false, order: 3, parentId: 'ci-evp-1', collapsed: false, depth: 1 },

      { id: 'ci-evp-6', text: 'Venue & Logistics', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-evp-7', text: 'Research and shortlist 3 venues', checked: false, order: 0, parentId: 'ci-evp-6', collapsed: false, depth: 1 },
      { id: 'ci-evp-8', text: 'Visit venues and check capacity, parking, accessibility', checked: false, order: 1, parentId: 'ci-evp-6', collapsed: false, depth: 1 },
      { id: 'ci-evp-9', text: 'Book venue and pay deposit', checked: false, order: 2, parentId: 'ci-evp-6', collapsed: false, depth: 1 },
      { id: 'ci-evp-10', text: 'AV & Tech', checked: false, order: 3, parentId: 'ci-evp-6', collapsed: false, depth: 1 },
      { id: 'ci-evp-11', text: 'Confirm microphone, projector, and screen availability', checked: false, order: 0, parentId: 'ci-evp-10', collapsed: false, depth: 2 },
      { id: 'ci-evp-12', text: 'Book AV technician if required', checked: false, order: 1, parentId: 'ci-evp-10', collapsed: false, depth: 2 },
      { id: 'ci-evp-13', text: 'Test all AV equipment day before event', checked: false, order: 2, parentId: 'ci-evp-10', collapsed: false, depth: 2 },

      { id: 'ci-evp-14', text: 'Catering & Suppliers', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-evp-15', text: 'Choose catering style and book caterer', checked: false, order: 0, parentId: 'ci-evp-14', collapsed: false, depth: 1 },
      { id: 'ci-evp-16', text: 'Confirm dietary requirements from all guests', checked: false, order: 1, parentId: 'ci-evp-14', collapsed: false, depth: 1 },
      { id: 'ci-evp-17', text: 'Book florist, photographer, entertainment if applicable', checked: false, order: 2, parentId: 'ci-evp-14', collapsed: false, depth: 1 },
      { id: 'ci-evp-18', text: 'Order printed materials (programmes, name cards, signage)', checked: false, order: 3, parentId: 'ci-evp-14', collapsed: false, depth: 1 },

      { id: 'ci-evp-19', text: 'Guest Management', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-evp-20', text: 'Send invitations 6–8 weeks before event', checked: false, order: 0, parentId: 'ci-evp-19', collapsed: false, depth: 1 },
      { id: 'ci-evp-21', text: 'Set RSVP deadline 2 weeks before event', checked: false, order: 1, parentId: 'ci-evp-19', collapsed: false, depth: 1 },
      { id: 'ci-evp-22', text: 'Chase non-responders 1 week after RSVP deadline', checked: false, order: 2, parentId: 'ci-evp-19', collapsed: false, depth: 1 },
      { id: 'ci-evp-23', text: 'Send final reminder and directions 48 hours before', checked: false, order: 3, parentId: 'ci-evp-19', collapsed: false, depth: 1 },

      { id: 'ci-evp-24', text: 'Day-Of Execution', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-evp-25', text: 'Arrive at venue 2 hours before guests', checked: false, order: 0, parentId: 'ci-evp-24', collapsed: false, depth: 1 },
      { id: 'ci-evp-26', text: 'Set up and check all stations: registration, catering, seating', checked: false, order: 1, parentId: 'ci-evp-24', collapsed: false, depth: 1 },
      { id: 'ci-evp-27', text: 'Brief all staff and volunteers on their roles', checked: false, order: 2, parentId: 'ci-evp-24', collapsed: false, depth: 1 },
      { id: 'ci-evp-28', text: 'Have printed run-of-show timeline on hand', checked: false, order: 3, parentId: 'ci-evp-24', collapsed: false, depth: 1 },
      { id: 'ci-evp-29', text: 'Post-Event: send thank-you messages within 48 hours', checked: false, order: 4, parentId: 'ci-evp-24', collapsed: false, depth: 1 },
    ]
  }
}
