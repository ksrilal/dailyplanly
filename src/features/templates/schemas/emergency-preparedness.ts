import type { Template } from '@/features/templates/types'

export const emergencyPreparednessTemplate: Template = {
  id: 'tpl-045',
  slug: 'emergency-preparedness',
  title: 'Emergency Preparedness Checklist',
  description: 'Be ready for any emergency. This home preparedness checklist covers 72-hour kits, important documents, communication plans, utility knowledge, and home safety basics for every household.',
  category: 'family-home',
  type: 'checklist',
  featured: false,
  tags: ['emergency', 'safety', 'preparedness', 'family', 'disaster kit'],
  previewImage: '/templates/previews/emergency-preparedness.png',
  checklistDefaults: {
    mode: 'simple',
    items: [
      { id: 'ci-ep-1', text: 'Water: store 3 litres per person per day for 3 days minimum', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-2', text: 'Food: non-perishable tinned and dried food for 3 days', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-3', text: 'Manual tin opener in emergency kit', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-4', text: 'First aid kit — plasters, bandages, antiseptic, scissors', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-5', text: 'Torch with fresh batteries (or wind-up / solar)', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-6', text: 'Portable phone charger / power bank (kept fully charged)', checked: false, order: 5, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-7', text: 'Battery-powered or wind-up radio', checked: false, order: 6, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-8', text: 'Cash in small notes (ATMs may be down)', checked: false, order: 7, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-9', text: 'Prescription medication supply (30-day buffer)', checked: false, order: 8, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-10', text: 'Copies of important documents in waterproof bag: passport, ID, insurance', checked: false, order: 9, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-11', text: 'Digital copies of documents stored in cloud', checked: false, order: 10, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-12', text: 'Know location of gas shut-off valve and how to use it', checked: false, order: 11, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-13', text: 'Know location of water stopcock', checked: false, order: 12, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-14', text: 'Know location of electrical fuse box / circuit breaker', checked: false, order: 13, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-15', text: 'Smoke alarm tested and battery replaced in last 12 months', checked: false, order: 14, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-16', text: 'Carbon monoxide detector fitted and tested', checked: false, order: 15, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-17', text: 'Fire extinguisher in kitchen — in-date and accessible', checked: false, order: 16, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-18', text: 'Fire escape plan discussed with all household members', checked: false, order: 17, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-19', text: 'Family emergency meeting point agreed (outside the home)', checked: false, order: 18, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-20', text: 'All family members know emergency numbers (999 / 112)', checked: false, order: 19, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-21', text: 'Emergency contacts list printed and on fridge', checked: false, order: 20, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-22', text: 'Warm blankets stored in emergency kit', checked: false, order: 21, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-23', text: 'Spare set of house and car keys stored with trusted person', checked: false, order: 22, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-24', text: 'Car fuel kept above half-tank in emergency periods', checked: false, order: 23, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-ep-25', text: 'Review and update emergency kit every 12 months', checked: false, order: 24, parentId: null, collapsed: false, depth: 0 },
    ]
  }
}
