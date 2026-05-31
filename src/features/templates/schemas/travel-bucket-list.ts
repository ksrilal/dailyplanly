import type { Template } from '@/features/templates/types'

export const travelBucketListTemplate: Template = {
  id: 'tpl-062',
  slug: 'travel-bucket-list',
  title: 'Travel Bucket List',
  description: 'Capture every destination you dream of visiting. Organise by continent, track research notes, budget estimates, and the memorable experiences you want to have in each place.',
  category: 'travel-events',
  type: 'checklist',
  featured: false,
  tags: ['bucket list', 'travel', 'destinations', 'goals', 'wanderlust'],
  previewImage: '/templates/previews/travel-bucket-list.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-tbl-1', text: 'Europe', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-tbl-2', text: 'Explore the Amalfi Coast, Italy — drive the cliff roads', checked: false, order: 0, parentId: 'ci-tbl-1', collapsed: false, depth: 1 },
      { id: 'ci-tbl-3', text: 'Northern Lights in Tromsø, Norway — winter trip', checked: false, order: 1, parentId: 'ci-tbl-1', collapsed: false, depth: 1 },
      { id: 'ci-tbl-4', text: 'Santorini at sunset, Greece — stay in Oia', checked: false, order: 2, parentId: 'ci-tbl-1', collapsed: false, depth: 1 },
      { id: 'ci-tbl-5', text: 'Walk the Camino de Santiago, Spain — at least 100km', checked: false, order: 3, parentId: 'ci-tbl-1', collapsed: false, depth: 1 },
      { id: 'ci-tbl-6', text: 'Vienna Christmas markets, Austria — December', checked: false, order: 4, parentId: 'ci-tbl-1', collapsed: false, depth: 1 },
      { id: 'ci-tbl-7', text: 'Dubrovnik old town, Croatia — Game of Thrones walls', checked: false, order: 5, parentId: 'ci-tbl-1', collapsed: false, depth: 1 },

      { id: 'ci-tbl-8', text: 'Asia', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-tbl-9', text: 'Japan — cherry blossom season in Kyoto (April)', checked: false, order: 0, parentId: 'ci-tbl-8', collapsed: false, depth: 1 },
      { id: 'ci-tbl-10', text: 'Ha Long Bay, Vietnam — overnight boat cruise', checked: false, order: 1, parentId: 'ci-tbl-8', collapsed: false, depth: 1 },
      { id: 'ci-tbl-11', text: 'Temples of Angkor Wat, Cambodia', checked: false, order: 2, parentId: 'ci-tbl-8', collapsed: false, depth: 1 },
      { id: 'ci-tbl-12', text: 'Bali, Indonesia — Ubud rice terraces and temples', checked: false, order: 3, parentId: 'ci-tbl-8', collapsed: false, depth: 1 },
      { id: 'ci-tbl-13', text: 'Train journey through India — Rajasthan Golden Triangle', checked: false, order: 4, parentId: 'ci-tbl-8', collapsed: false, depth: 1 },
      { id: 'ci-tbl-14', text: 'Seoul, South Korea — food, K-culture, palaces', checked: false, order: 5, parentId: 'ci-tbl-8', collapsed: false, depth: 1 },

      { id: 'ci-tbl-15', text: 'Americas', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-tbl-16', text: 'New York City — Broadway show, Central Park in autumn', checked: false, order: 0, parentId: 'ci-tbl-15', collapsed: false, depth: 1 },
      { id: 'ci-tbl-17', text: 'Patagonia, Argentina/Chile — trekking Torres del Paine', checked: false, order: 1, parentId: 'ci-tbl-15', collapsed: false, depth: 1 },
      { id: 'ci-tbl-18', text: 'Machu Picchu, Peru — Inca Trail hike', checked: false, order: 2, parentId: 'ci-tbl-15', collapsed: false, depth: 1 },
      { id: 'ci-tbl-19', text: 'Canadian Rockies — Banff and Lake Louise in summer', checked: false, order: 3, parentId: 'ci-tbl-15', collapsed: false, depth: 1 },
      { id: 'ci-tbl-20', text: 'Costa Rica — wildlife, volcanoes, zip-lining', checked: false, order: 4, parentId: 'ci-tbl-15', collapsed: false, depth: 1 },

      { id: 'ci-tbl-21', text: 'Africa & Middle East', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-tbl-22', text: 'Safari in Kenya or Tanzania — Serengeti wildebeest migration', checked: false, order: 0, parentId: 'ci-tbl-21', collapsed: false, depth: 1 },
      { id: 'ci-tbl-23', text: 'Marrakech, Morocco — medina, souks and Atlas Mountains', checked: false, order: 1, parentId: 'ci-tbl-21', collapsed: false, depth: 1 },
      { id: 'ci-tbl-24', text: 'Petra, Jordan — the Treasury at dawn', checked: false, order: 2, parentId: 'ci-tbl-21', collapsed: false, depth: 1 },
      { id: 'ci-tbl-25', text: 'Cape Town, South Africa — Table Mountain, Winelands', checked: false, order: 3, parentId: 'ci-tbl-21', collapsed: false, depth: 1 },

      { id: 'ci-tbl-26', text: 'Oceania & Pacific', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-tbl-27', text: 'New Zealand South Island — Milford Sound, Queenstown', checked: false, order: 0, parentId: 'ci-tbl-26', collapsed: false, depth: 1 },
      { id: 'ci-tbl-28', text: 'Great Barrier Reef, Australia — scuba dive', checked: false, order: 1, parentId: 'ci-tbl-26', collapsed: false, depth: 1 },
      { id: 'ci-tbl-29', text: 'Fiji — overwater bungalow, coral reefs', checked: false, order: 2, parentId: 'ci-tbl-26', collapsed: false, depth: 1 },

      { id: 'ci-tbl-30', text: 'Experiences (not just places)', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-tbl-31', text: 'Watch a sunrise from a mountaintop', checked: false, order: 0, parentId: 'ci-tbl-30', collapsed: false, depth: 1 },
      { id: 'ci-tbl-32', text: 'Sleep under the stars in a desert (Sahara or Wadi Rum)', checked: false, order: 1, parentId: 'ci-tbl-30', collapsed: false, depth: 1 },
      { id: 'ci-tbl-33', text: 'Take a long-distance train journey (Trans-Siberian or Orient Express)', checked: false, order: 2, parentId: 'ci-tbl-30', collapsed: false, depth: 1 },
      { id: 'ci-tbl-34', text: 'Learn to surf on a beach break', checked: false, order: 3, parentId: 'ci-tbl-30', collapsed: false, depth: 1 },
      { id: 'ci-tbl-35', text: 'Volunteer abroad for at least 2 weeks', checked: false, order: 4, parentId: 'ci-tbl-30', collapsed: false, depth: 1 },
    ]
  }
}
