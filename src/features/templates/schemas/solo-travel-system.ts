import type { Template } from '@/features/templates/types'

export const soloTravelSystemTemplate: Template = {
  id: 'tpl-065',
  slug: 'solo-travel-system',
  title: 'Solo Travel System',
  description: 'Everything a solo traveller needs before, during and after a trip. Covers safety planning, budget, accommodation research, cultural prep, packing, and arrival-day logistics.',
  category: 'travel-events',
  type: 'checklist',
  featured: false,
  tags: ['solo travel', 'backpacking', 'safety', 'travel prep', 'budget travel'],
  previewImage: '/templates/previews/solo-travel-system.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-sts-1', text: 'Pre-Trip Research', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sts-2', text: 'Research destination visa requirements', checked: false, order: 0, parentId: 'ci-sts-1', collapsed: false, depth: 1 },
      { id: 'ci-sts-3', text: 'Read FCO / government travel advisories', checked: false, order: 1, parentId: 'ci-sts-1', collapsed: false, depth: 1 },
      { id: 'ci-sts-4', text: 'Research local laws, customs and cultural norms', checked: false, order: 2, parentId: 'ci-sts-1', collapsed: false, depth: 1 },
      { id: 'ci-sts-5', text: 'Join solo travel forums and read recent trip reports', checked: false, order: 3, parentId: 'ci-sts-1', collapsed: false, depth: 1 },
      { id: 'ci-sts-6', text: 'Research neighbourhoods — identify safe areas to stay', checked: false, order: 4, parentId: 'ci-sts-1', collapsed: false, depth: 1 },

      { id: 'ci-sts-7', text: 'Bookings', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sts-8', text: 'Book flights with flexible change/cancel option', checked: false, order: 0, parentId: 'ci-sts-7', collapsed: false, depth: 1 },
      { id: 'ci-sts-9', text: 'Accommodation Research', checked: false, order: 1, parentId: 'ci-sts-7', collapsed: false, depth: 1 },
      { id: 'ci-sts-10', text: 'Book first 2 nights in advance — never arrive without a bed', checked: false, order: 0, parentId: 'ci-sts-9', collapsed: false, depth: 2 },
      { id: 'ci-sts-11', text: 'Read recent solo traveller reviews for each hostel/hotel', checked: false, order: 1, parentId: 'ci-sts-9', collapsed: false, depth: 2 },
      { id: 'ci-sts-12', text: 'Choose accommodation in walkable, well-lit areas', checked: false, order: 2, parentId: 'ci-sts-9', collapsed: false, depth: 2 },
      { id: 'ci-sts-13', text: 'Buy comprehensive solo travel insurance', checked: false, order: 2, parentId: 'ci-sts-7', collapsed: false, depth: 1 },

      { id: 'ci-sts-14', text: 'Safety Preparation', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sts-15', text: 'Share full itinerary with 2 trusted people at home', checked: false, order: 0, parentId: 'ci-sts-14', collapsed: false, depth: 1 },
      { id: 'ci-sts-16', text: 'Agree check-in schedule with someone back home (every 2 days)', checked: false, order: 1, parentId: 'ci-sts-14', collapsed: false, depth: 1 },
      { id: 'ci-sts-17', text: 'Download offline maps (Maps.me or Google Maps offline)', checked: false, order: 2, parentId: 'ci-sts-14', collapsed: false, depth: 1 },
      { id: 'ci-sts-18', text: 'Save local embassy number and emergency contacts', checked: false, order: 3, parentId: 'ci-sts-14', collapsed: false, depth: 1 },
      { id: 'ci-sts-19', text: 'Carry colour copies of passport (separate from original)', checked: false, order: 4, parentId: 'ci-sts-14', collapsed: false, depth: 1 },
      { id: 'ci-sts-20', text: 'Have emergency cash in a separate hidden location', checked: false, order: 5, parentId: 'ci-sts-14', collapsed: false, depth: 1 },

      { id: 'ci-sts-21', text: 'Packing Essentials', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sts-22', text: 'Pack light — aim for a bag you can run with', checked: false, order: 0, parentId: 'ci-sts-21', collapsed: false, depth: 1 },
      { id: 'ci-sts-23', text: 'Padlock for hostel lockers', checked: false, order: 1, parentId: 'ci-sts-21', collapsed: false, depth: 1 },
      { id: 'ci-sts-24', text: 'Anti-theft bag or money belt', checked: false, order: 2, parentId: 'ci-sts-21', collapsed: false, depth: 1 },
      { id: 'ci-sts-25', text: 'First aid kit with blister plasters, rehydration sachets', checked: false, order: 3, parentId: 'ci-sts-21', collapsed: false, depth: 1 },
      { id: 'ci-sts-26', text: 'Power bank (fully charged before departure)', checked: false, order: 4, parentId: 'ci-sts-21', collapsed: false, depth: 1 },
      { id: 'ci-sts-27', text: 'Local SIM card arranged or international roaming enabled', checked: false, order: 5, parentId: 'ci-sts-21', collapsed: false, depth: 1 },

      { id: 'ci-sts-28', text: 'Arrival Day', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sts-29', text: 'Research airport to accommodation transfer before you land', checked: false, order: 0, parentId: 'ci-sts-28', collapsed: false, depth: 1 },
      { id: 'ci-sts-30', text: 'Only use official licensed taxis or pre-booked transfers', checked: false, order: 1, parentId: 'ci-sts-28', collapsed: false, depth: 1 },
      { id: 'ci-sts-31', text: 'Text check-in contact when you arrive safely', checked: false, order: 2, parentId: 'ci-sts-28', collapsed: false, depth: 1 },
      { id: 'ci-sts-32', text: 'Walk the immediate neighbourhood in daylight on arrival day', checked: false, order: 3, parentId: 'ci-sts-28', collapsed: false, depth: 1 },
      { id: 'ci-sts-33', text: 'Locate nearest hospital, pharmacy and police station', checked: false, order: 4, parentId: 'ci-sts-28', collapsed: false, depth: 1 },
    ]
  }
}
