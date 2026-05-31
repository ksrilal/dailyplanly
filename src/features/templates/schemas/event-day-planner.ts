import type { Template } from '@/features/templates/types'

export const eventDayPlannerTemplate: Template = {
  id: 'tpl-063',
  slug: 'event-day-planner',
  title: 'Event Day Planner',
  description: 'A minute-by-minute event day planner for any occasion — birthday party, corporate event, wedding, or conference. Timeline, vendor contacts, task assignments, and contingency notes.',
  category: 'travel-events',
  type: 'planner',
  featured: false,
  tags: ['event', 'party', 'wedding', 'conference', 'day-of'],
  previewImage: '/templates/previews/event-day-planner.png',
  plannerDefaults: {
    theme: 'minimal',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Event Overview', order: 0, width: 'full',
        content: {
          goal: 'Sarah & James Wedding Reception — Saturday 14 June, Oakwood Manor',
          milestones: [
            { label: 'Venue setup complete by 2pm', done: false },
            { label: 'All vendors confirmed and briefed', done: false },
            { label: 'Guests seated for dinner by 7pm', done: false },
            { label: 'First dance and speeches by 8:30pm', done: false },
            { label: 'Evening band starts 9pm, party to midnight', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'routine', label: 'Run of Show', order: 1, width: 'full',
        content: {
          slots: [
            { time: '10:00', label: 'Venue access — florist and decorator arrive' },
            { time: '11:00', label: 'Tables set, centrepieces installed' },
            { time: '12:00', label: 'Caterer arrives — kitchen setup and prep' },
            { time: '13:00', label: 'AV technician — sound check and lighting rig' },
            { time: '14:00', label: 'Final venue walkthrough with coordinator' },
            { time: '15:00', label: 'Wedding party photos on venue grounds' },
            { time: '16:00', label: 'Guests begin arriving — welcome drinks' },
            { time: '17:00', label: 'Ceremony (outdoor garden)' },
            { time: '17:45', label: 'Drinks reception — canapés served' },
            { time: '19:00', label: 'Guests seated for 3-course dinner' },
            { time: '21:00', label: 'Speeches — Best man, Father of bride, Groom' },
            { time: '21:45', label: 'First dance · cake cutting' },
            { time: '22:00', label: 'Evening band begins, dance floor opens' },
            { time: '00:00', label: 'Music ends · late-night snacks served' },
            { time: '00:30', label: 'Event close · taxis arranged for guests' },
          ]
        }
      },
      {
        id: 'b3', type: 'table', label: 'Vendor Contacts', order: 2, width: 'full',
        content: {
          headers: ['Vendor', 'Name', 'Phone', 'Arrival Time', 'Confirmed?'],
          rows: [
            ['Caterer', 'The Gilded Fork', '07700 900142', '12:00', 'Yes'],
            ['Florist', 'Bloom & Co', '07700 900283', '10:00', 'Yes'],
            ['Photographer', 'Alex Rivers Photo', '07700 900394', '14:00', 'Yes'],
            ['Videographer', 'Motion Stories', '07700 900415', '14:00', 'Yes'],
            ['Band', 'The Velvet Tones', '07700 900526', '21:00', 'Pending'],
            ['DJ (backup)', 'Mix Master Phil', '07700 900637', '21:00', 'Yes'],
            ['Hair & Makeup', 'Glow Studio', '07700 900748', '08:00', 'Yes'],
          ]
        }
      },
      {
        id: 'b4', type: 'focus', label: 'Day-Of Priorities', order: 3, width: 'half',
        content: {
          items: [
            { label: 'Confirm band arrival time by 10am', priority: 'high' },
            { label: 'Check seating plan is at venue entrance', priority: 'high' },
            { label: 'Ensure dietary cards on all tables', priority: 'medium' },
            { label: 'Bridal party buttonholes delivered', priority: 'medium' },
            { label: 'Late-night snack order placed with caterer', priority: 'low' },
          ]
        }
      },
      {
        id: 'b5', type: 'notes', label: 'Contingency & Notes', order: 4, width: 'half',
        content: { lines: 8, text: '' }
      },
    ]
  }
}
