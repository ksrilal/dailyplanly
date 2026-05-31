import type { Template } from '@/features/templates/types'

export const roadTripPlannerTemplate: Template = {
  id: 'tpl-064',
  slug: 'road-trip-planner',
  title: 'Road Trip Planner',
  description: 'Plan the ultimate road trip. Map your route, budget fuel and accommodation, track daily miles, plan pit stops, and keep a travel journal of every memorable moment.',
  category: 'travel-events',
  type: 'planner',
  featured: false,
  tags: ['road trip', 'driving', 'travel', 'route', 'adventure'],
  previewImage: '/templates/previews/road-trip-planner.png',
  plannerDefaults: {
    theme: 'minimal',
    orientation: 'landscape',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'timeline', label: 'Route Milestones', order: 0, width: 'half',
        content: {
          events: [
            { label: 'Day 1: London → Bath (120 miles) · Roman Baths', date: 'Day 1' },
            { label: 'Day 2: Bath → Bristol → Cardiff (90 miles)', date: 'Day 2' },
            { label: 'Day 3: Cardiff → Brecon Beacons hike (50 miles)', date: 'Day 3' },
            { label: 'Day 4: Brecon → Pembrokeshire Coast (80 miles)', date: 'Day 4' },
            { label: 'Day 5: Pembrokeshire → Aberystwyth (70 miles)', date: 'Day 5' },
            { label: 'Day 6: Aberystwyth → Snowdonia (60 miles)', date: 'Day 6' },
            { label: 'Day 7: Snowdonia → Chester → Home (200 miles)', date: 'Day 7' },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Total Distance', order: 1, width: 'half',
        content: { title: 'Total Miles', value: '670', unit: 'miles', note: '~7 days · full loop' }
      },
      {
        id: 'b3', type: 'table', label: 'Daily Log', order: 2, width: 'full',
        content: {
          headers: ['Day', 'Start → End', 'Miles', 'Fuel Cost (£)', 'Accommodation', 'Highlights'],
          rows: [
            ['1', 'London → Bath', '120', '', 'Bath YMCA Hostel', ''],
            ['2', 'Bath → Cardiff', '90', '', 'Cardiff Premier Inn', ''],
            ['3', 'Cardiff → Brecon', '50', '', 'Camping: Brecon Beacons', ''],
            ['4', 'Brecon → Pembrokeshire', '80', '', 'AirBnb — St Davids', ''],
            ['5', 'Pembrokeshire → Aberystwyth', '70', '', 'Guesthouse B&B', ''],
            ['6', 'Aberystwyth → Snowdonia', '60', '', 'YHA Snowdon Ranger', ''],
            ['7', 'Snowdonia → Home', '200', '', '—', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'table', label: 'Budget', order: 3, width: 'half',
        content: {
          headers: ['Category', 'Budget (£)', 'Actual (£)'],
          rows: [
            ['Fuel (670mi @ 35mpg)', '130', ''],
            ['Accommodation (7 nights)', '350', ''],
            ['Food & drink', '200', ''],
            ['Activities & entry fees', '80', ''],
            ['Parking & tolls', '30', ''],
            ['Emergency fund', '50', ''],
            ['TOTAL', '840', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'notes', label: 'Road Trip Journal', order: 4, width: 'half',
        content: { lines: 8, text: '' }
      },
    ]
  }
}
