import type { Template } from '@/features/templates/types'

export const homeMovingSystemTemplate: Template = {
  id: 'tpl-055',
  slug: 'home-moving-system',
  title: 'Home Moving System',
  description: 'Move home without the chaos. A complete moving system from packing to settling in — covering admin, removals, utilities, packing by room, and new home setup.',
  category: 'family-home',
  type: 'checklist',
  featured: false,
  tags: ['moving home', 'house move', 'packing', 'removals', 'family'],
  previewImage: '/templates/previews/home-moving-system.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-hms-1', text: '6–8 Weeks Before Moving Day', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hms-2', text: 'Confirm moving date with solicitor / landlord', checked: false, order: 0, parentId: 'ci-hms-1', collapsed: false, depth: 1 },
      { id: 'ci-hms-3', text: 'Get quotes from 3 removal companies', checked: false, order: 1, parentId: 'ci-hms-1', collapsed: false, depth: 1 },
      { id: 'ci-hms-4', text: 'Book removal company and confirm details', checked: false, order: 2, parentId: 'ci-hms-1', collapsed: false, depth: 1 },
      { id: 'ci-hms-5', text: 'Start collecting packing boxes and materials', checked: false, order: 3, parentId: 'ci-hms-1', collapsed: false, depth: 1 },
      { id: 'ci-hms-6', text: 'Declutter each room — donate, sell, or discard', checked: false, order: 4, parentId: 'ci-hms-1', collapsed: false, depth: 1 },

      { id: 'ci-hms-7', text: 'Admin & Address Changes', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hms-8', text: 'Redirect post with Royal Mail', checked: false, order: 0, parentId: 'ci-hms-7', collapsed: false, depth: 1 },
      { id: 'ci-hms-9', text: 'Update address with bank and credit cards', checked: false, order: 1, parentId: 'ci-hms-7', collapsed: false, depth: 1 },
      { id: 'ci-hms-10', text: 'Update DVLA — driving licence and vehicle registration', checked: false, order: 2, parentId: 'ci-hms-7', collapsed: false, depth: 1 },
      { id: 'ci-hms-11', text: 'Utilities', checked: false, order: 3, parentId: 'ci-hms-7', collapsed: false, depth: 1 },
      { id: 'ci-hms-12', text: 'Notify electricity provider — final reading and new address', checked: false, order: 0, parentId: 'ci-hms-11', collapsed: false, depth: 2 },
      { id: 'ci-hms-13', text: 'Notify gas provider — final reading and new address', checked: false, order: 1, parentId: 'ci-hms-11', collapsed: false, depth: 2 },
      { id: 'ci-hms-14', text: 'Set up broadband at new address — book engineer', checked: false, order: 2, parentId: 'ci-hms-11', collapsed: false, depth: 2 },
      { id: 'ci-hms-15', text: 'Notify employer, HMRC, GP, dentist of new address', checked: false, order: 4, parentId: 'ci-hms-7', collapsed: false, depth: 1 },

      { id: 'ci-hms-16', text: 'Packing by Room', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hms-17', text: 'Label every box: room + contents + fragile if needed', checked: false, order: 0, parentId: 'ci-hms-16', collapsed: false, depth: 1 },
      { id: 'ci-hms-18', text: 'Kitchen — pack all but essentials last', checked: false, order: 1, parentId: 'ci-hms-16', collapsed: false, depth: 1 },
      { id: 'ci-hms-19', text: 'Bedrooms — clothes, books, décor', checked: false, order: 2, parentId: 'ci-hms-16', collapsed: false, depth: 1 },
      { id: 'ci-hms-20', text: 'Living room — electronics (keep cables together), books', checked: false, order: 3, parentId: 'ci-hms-16', collapsed: false, depth: 1 },
      { id: 'ci-hms-21', text: 'Pack an "essentials box" to open first at new home', checked: false, order: 4, parentId: 'ci-hms-16', collapsed: false, depth: 1 },
      { id: 'ci-hms-22', text: 'Essentials box: kettle, mugs, tea, phone chargers, toilet roll, towel', checked: false, order: 0, parentId: 'ci-hms-21', collapsed: false, depth: 2 },

      { id: 'ci-hms-23', text: 'Moving Day', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hms-24', text: 'Take meter readings at old property (with photos)', checked: false, order: 0, parentId: 'ci-hms-23', collapsed: false, depth: 1 },
      { id: 'ci-hms-25', text: 'Final walkthrough — check every room, cupboard, loft', checked: false, order: 1, parentId: 'ci-hms-23', collapsed: false, depth: 1 },
      { id: 'ci-hms-26', text: 'Hand over keys and sign off old property', checked: false, order: 2, parentId: 'ci-hms-23', collapsed: false, depth: 1 },
      { id: 'ci-hms-27', text: 'At new home: take meter readings on arrival', checked: false, order: 3, parentId: 'ci-hms-23', collapsed: false, depth: 1 },
      { id: 'ci-hms-28', text: 'Change all locks', checked: false, order: 4, parentId: 'ci-hms-23', collapsed: false, depth: 1 },
      { id: 'ci-hms-29', text: 'Test smoke alarms and locate fuse box and water stopcock', checked: false, order: 5, parentId: 'ci-hms-23', collapsed: false, depth: 1 },

      { id: 'ci-hms-30', text: 'Settling In', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-hms-31', text: 'Set up beds — rest on night 1 is essential', checked: false, order: 0, parentId: 'ci-hms-30', collapsed: false, depth: 1 },
      { id: 'ci-hms-32', text: 'Unpack kitchen essentials within 48 hours', checked: false, order: 1, parentId: 'ci-hms-30', collapsed: false, depth: 1 },
      { id: 'ci-hms-33', text: 'Register with local GP and dentist', checked: false, order: 2, parentId: 'ci-hms-30', collapsed: false, depth: 1 },
      { id: 'ci-hms-34', text: 'Introduce yourself to neighbours', checked: false, order: 3, parentId: 'ci-hms-30', collapsed: false, depth: 1 },
    ]
  }
}
