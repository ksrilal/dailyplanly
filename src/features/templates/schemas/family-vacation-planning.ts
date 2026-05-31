import type { Template } from '@/features/templates/types'

export const familyVacationPlanningTemplate: Template = {
  id: 'tpl-053',
  slug: 'family-vacation-planning',
  title: 'Family Vacation Planning System',
  description: 'Plan the perfect family holiday from destination research to return home. Covers booking, packing, home preparation, kid-specific needs, itinerary, and budget management.',
  category: 'family-home',
  type: 'checklist',
  featured: true,
  tags: ['family holiday', 'vacation', 'travel', 'kids', 'planning'],
  previewImage: '/templates/previews/family-vacation-planning.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-fvp-1', text: 'Planning & Booking', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-fvp-2', text: 'Agree on destination as a family', checked: false, order: 0, parentId: 'ci-fvp-1', collapsed: false, depth: 1 },
      { id: 'ci-fvp-3', text: 'Set total holiday budget', checked: false, order: 1, parentId: 'ci-fvp-1', collapsed: false, depth: 1 },
      { id: 'ci-fvp-4', text: 'Flights & Accommodation', checked: false, order: 2, parentId: 'ci-fvp-1', collapsed: false, depth: 1 },
      { id: 'ci-fvp-5', text: 'Book flights — choose child-friendly seats together', checked: false, order: 0, parentId: 'ci-fvp-4', collapsed: false, depth: 2 },
      { id: 'ci-fvp-6', text: 'Book family accommodation (separate room or family suite)', checked: false, order: 1, parentId: 'ci-fvp-4', collapsed: false, depth: 2 },
      { id: 'ci-fvp-7', text: 'Check accommodation has cots/kids beds if needed', checked: false, order: 2, parentId: 'ci-fvp-4', collapsed: false, depth: 2 },
      { id: 'ci-fvp-8', text: 'Buy travel insurance covering all family members', checked: false, order: 3, parentId: 'ci-fvp-1', collapsed: false, depth: 1 },
      { id: 'ci-fvp-9', text: 'Check passports valid for all family members', checked: false, order: 4, parentId: 'ci-fvp-1', collapsed: false, depth: 1 },
      { id: 'ci-fvp-10', text: 'Research destination — child-friendly activities', checked: false, order: 5, parentId: 'ci-fvp-1', collapsed: false, depth: 1 },

      { id: 'ci-fvp-11', text: 'Home Preparation', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-fvp-12', text: 'Arrange pet care or boarding', checked: false, order: 0, parentId: 'ci-fvp-11', collapsed: false, depth: 1 },
      { id: 'ci-fvp-13', text: 'Ask neighbour to collect post and check house', checked: false, order: 1, parentId: 'ci-fvp-11', collapsed: false, depth: 1 },
      { id: 'ci-fvp-14', text: 'Cancel milk, newspaper, and delivery subscriptions', checked: false, order: 2, parentId: 'ci-fvp-11', collapsed: false, depth: 1 },
      { id: 'ci-fvp-15', text: 'Pay bills due during holiday in advance', checked: false, order: 3, parentId: 'ci-fvp-11', collapsed: false, depth: 1 },
      { id: 'ci-fvp-16', text: 'Set alarm and lock all windows and doors', checked: false, order: 4, parentId: 'ci-fvp-11', collapsed: false, depth: 1 },

      { id: 'ci-fvp-17', text: 'Children\'s Packing', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-fvp-18', text: 'Pack enough clothing for each child + 2 spare outfits', checked: false, order: 0, parentId: 'ci-fvp-17', collapsed: false, depth: 1 },
      { id: 'ci-fvp-19', text: 'Children\'s medication and first aid kit', checked: false, order: 1, parentId: 'ci-fvp-17', collapsed: false, depth: 1 },
      { id: 'ci-fvp-20', text: 'Travel Entertainment', checked: false, order: 2, parentId: 'ci-fvp-17', collapsed: false, depth: 1 },
      { id: 'ci-fvp-21', text: 'Download kids\' shows and games on tablet', checked: false, order: 0, parentId: 'ci-fvp-20', collapsed: false, depth: 2 },
      { id: 'ci-fvp-22', text: 'Pack headphones for each child', checked: false, order: 1, parentId: 'ci-fvp-20', collapsed: false, depth: 2 },
      { id: 'ci-fvp-23', text: 'Pack travel snacks and drinks', checked: false, order: 2, parentId: 'ci-fvp-20', collapsed: false, depth: 2 },
      { id: 'ci-fvp-24', text: 'Pack comfort items (teddy, favourite toy)', checked: false, order: 3, parentId: 'ci-fvp-17', collapsed: false, depth: 1 },
      { id: 'ci-fvp-25', text: 'Child-safe sunscreen (SPF 50+)', checked: false, order: 4, parentId: 'ci-fvp-17', collapsed: false, depth: 1 },

      { id: 'ci-fvp-26', text: 'Holiday Itinerary', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-fvp-27', text: 'Plan 2–3 family activities per day (not too rushed)', checked: false, order: 0, parentId: 'ci-fvp-26', collapsed: false, depth: 1 },
      { id: 'ci-fvp-28', text: 'Book any activities requiring advance tickets', checked: false, order: 1, parentId: 'ci-fvp-26', collapsed: false, depth: 1 },
      { id: 'ci-fvp-29', text: 'Research family-friendly restaurants at destination', checked: false, order: 2, parentId: 'ci-fvp-26', collapsed: false, depth: 1 },
      { id: 'ci-fvp-30', text: 'Build in rest and pool/beach time between activities', checked: false, order: 3, parentId: 'ci-fvp-26', collapsed: false, depth: 1 },

      { id: 'ci-fvp-31', text: 'Return Home', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-fvp-32', text: 'Do final check of accommodation before leaving', checked: false, order: 0, parentId: 'ci-fvp-31', collapsed: false, depth: 1 },
      { id: 'ci-fvp-33', text: 'Keep receipts for any insurance claims', checked: false, order: 1, parentId: 'ci-fvp-31', collapsed: false, depth: 1 },
      { id: 'ci-fvp-34', text: 'Get grocery essentials delivered for return day', checked: false, order: 2, parentId: 'ci-fvp-31', collapsed: false, depth: 1 },
    ]
  }
}
