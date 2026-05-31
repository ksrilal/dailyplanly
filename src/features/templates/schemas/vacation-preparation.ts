import type { Template } from '@/features/templates/types'

export const vacationPreparationTemplate: Template = {
  id: 'tpl-037',
  slug: 'vacation-preparation',
  title: 'Vacation Preparation Checklist',
  description: 'Everything you need to do before you leave for holiday. Cover your home, pets, finances, work handover, packing, and travel logistics so you can leave with complete peace of mind.',
  category: 'lifestyle',
  type: 'checklist',
  featured: false,
  tags: ['vacation', 'holiday', 'travel prep', 'preparation', 'trip planning'],
  previewImage: '/templates/previews/vacation-preparation.png',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: 'ci-vp-1', text: 'Book flights and confirm seat assignments', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-2', text: 'Book hotel, Airbnb, or accommodation', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-3', text: 'Purchase travel insurance', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-4', text: 'Apply for travel visa (if required)', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-5', text: 'Check passport expiry date — valid 6+ months', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-6', text: 'Order foreign currency or load onto travel card', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-7', text: 'Notify bank and credit cards of travel dates and destination', checked: false, order: 6, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-8', text: 'Set up out-of-office email and voicemail', checked: false, order: 7, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-9', text: 'Brief colleague on any handover responsibilities', checked: false, order: 8, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-10', text: 'Arrange pet care or pet sitter', checked: false, order: 9, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-11', text: 'Ask trusted neighbour to check mail and house', checked: false, order: 10, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-12', text: 'Pre-pay or schedule any bills due during holiday', checked: false, order: 11, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-13', text: 'Cancel recurring deliveries (milk, newspapers, meal kits)', checked: false, order: 12, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-14', text: 'Set home alarm and check all window locks', checked: false, order: 13, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-15', text: 'Empty fridge of perishables before departure', checked: false, order: 14, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-16', text: 'Take out bins before leaving', checked: false, order: 15, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-17', text: 'Switch off non-essential appliances at the plug', checked: false, order: 16, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-18', text: 'Download offline maps, entertainment and books', checked: false, order: 17, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-19', text: 'Book transfers or plan airport transport', checked: false, order: 18, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-20', text: 'Check-in online and download boarding pass', checked: false, order: 19, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-21', text: 'Pack main luggage', checked: false, order: 20, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-22', text: 'Pack carry-on bag', checked: false, order: 21, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-23', text: 'Charge all electronics the night before', checked: false, order: 22, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-24', text: 'Confirm wake-up alarm for early morning departure', checked: false, order: 23, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-25', text: 'Share itinerary with a trusted family member or friend', checked: false, order: 24, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-vp-26', text: 'Research local emergency numbers at destination', checked: false, order: 25, parentId: null, collapsed: false, depth: 0 },
    ]
  }
}
