import type { Tool } from '../types'

const homeMaintenancePlanner: Tool = {
  id: 'home-maintenance-planner',
  slug: 'home-maintenance-planner',
  title: 'Home Maintenance Planner',
  description: 'Stay on top of every home maintenance task with a seasonal schedule, annual checklist, and priority repair tracker. Never let a small issue become an expensive one.',
  category: 'family-home',
  icon: 'Wrench',
  tags: ['home', 'maintenance', 'repairs', 'house', 'property', 'DIY'],
  inputs: [
    { id: 'homeType', type: 'select', label: 'Property Type', required: true, defaultValue: 'house',
      options: [
        { label: 'Detached / semi-detached house', value: 'house' },
        { label: 'Flat / apartment', value: 'flat' },
        { label: 'Terraced house', value: 'terraced' },
        { label: 'Bungalow', value: 'bungalow' },
      ] },
    { id: 'homeAge', type: 'select', label: 'Property Age', required: false, defaultValue: 'modern',
      options: [
        { label: 'New build (under 10 years)', value: 'new' },
        { label: 'Modern (10–30 years)', value: 'modern' },
        { label: 'Older (30–70 years)', value: 'older' },
        { label: 'Period property (70+ years)', value: 'period' },
      ] },
    { id: 'ownership', type: 'select', label: 'Ownership Status', required: false, defaultValue: 'owner',
      options: [
        { label: 'Owner-occupier', value: 'owner' },
        { label: 'Landlord (renting out)', value: 'landlord' },
      ] },
    { id: 'hasGarden', type: 'select', label: 'Garden?', required: false, defaultValue: 'yes',
      options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
  ],
  generate(inputs) {
    const homeType = String(inputs.homeType || 'house')
    const homeAge = String(inputs.homeAge || 'modern')
    const ownership = String(inputs.ownership || 'owner')
    const hasGarden = String(inputs.hasGarden || 'yes')

    const ageMultiplier = { new: 'Minimal maintenance expected — focus on warranty claims', modern: 'Regular maintenance to prevent premature aging', older: 'Proactive maintenance critical — small issues compound', period: 'Specialist maintenance may be needed — budget generously' }

    const weeklySchedule = [
      { week: 'Spring (Mar–May)', focus: 'Post-winter inspection', tasks: 'Check roof and gutters · service boiler · test smoke alarms · repaint exterior if needed' + (hasGarden === 'yes' ? ' · lawn first cut · garden prep' : ''), notes: 'The busiest maintenance season' },
      { week: 'Summer (Jun–Aug)', focus: 'Outdoor and cosmetic', tasks: 'Window cleaning · fence/deck treatment · check damp in basement/roof · outdoor tap serviced' + (hasGarden === 'yes' ? ' · regular lawn care · pruning' : ''), notes: 'Best weather for exterior work' },
      { week: 'Autumn (Sep–Nov)', focus: 'Winter preparation', tasks: 'Clean gutters (falling leaves) · bleed radiators · insulate pipes · check draughts · service appliances', notes: 'Most critical season for prevention' },
      { week: 'Winter (Dec–Feb)', focus: 'Indoor checks', tasks: 'Check boiler performance · test carbon monoxide detector · insulation check · fix any water ingress found', notes: 'Coldest pipes are most vulnerable' },
    ]

    const annualChecks = [
      'Boiler service (annual — book in September)',
      'Test smoke alarms (monthly) and replace batteries annually',
      'Test carbon monoxide detectors',
      'Check fire extinguisher (if applicable)',
      'Gas appliance safety check',
      homeType !== 'flat' ? 'Roof inspection (visual from ground or professional)' : '',
      'Gutters cleaned (twice yearly: spring + autumn)',
      'Check for damp and mould in all rooms',
      'Test all emergency shut-offs (water, gas)',
      homeAge === 'older' || homeAge === 'period' ? 'Check pointing and mortar on brickwork' : '',
      ownership === 'landlord' ? 'Annual gas safety certificate (legal requirement)' : '',
      ownership === 'landlord' ? 'Annual electrical installation check (EICR every 5 years)' : '',
      hasGarden === 'yes' ? 'Inspect fences and gates — repair before winter' : '',
    ].filter(Boolean) as string[]

    return {
      headline: `Home maintenance plan — ${homeAge} ${homeType}${ownership === 'landlord' ? ' (rental property)' : ''}`,
      subheadline: ageMultiplier[homeAge as keyof typeof ageMultiplier],
      stats: [
        { label: 'Property Type', value: homeType.charAt(0).toUpperCase() + homeType.slice(1) },
        { label: 'Property Age', value: homeAge.charAt(0).toUpperCase() + homeAge.slice(1) },
        { label: 'Ownership', value: ownership === 'owner' ? 'Owner-occupier' : 'Landlord' },
        { label: 'Garden', value: hasGarden === 'yes' ? 'Yes' : 'No' },
        { label: 'Annual Tasks', value: `${annualChecks.length}` },
        { label: 'Seasonal Reviews', value: '4 per year' },
      ],
      milestones: [
        { label: 'Spring inspection complete', date: 'March–April' },
        { label: 'Boiler serviced', date: 'September' },
        { label: 'Winter prep complete', date: 'October–November' },
        { label: 'Annual checklist reviewed', date: 'January' },
      ],
      weeklySchedule,
      checklists: [
        { title: 'Annual Home Maintenance Checklist', items: annualChecks },
        {
          title: 'Emergency Contacts List',
          items: [
            'Boiler / heating engineer: ___________',
            'Electrician: ___________',
            'Plumber: ___________',
            'Roofer: ___________',
            'General handyman: ___________',
            'Emergency gas: 0800 111 999 (National Gas)',
            'Emergency electricity: check your meter',
            'Home insurance 24hr claim line: ___________',
          ],
        },
      ],
      recommendations: [
        ageMultiplier[homeAge as keyof typeof ageMultiplier],
        'The 1% rule: budget 1% of your property value per year for maintenance. e.g. a 300,000 home needs 3,000/year budget.',
        homeAge === 'older' || homeAge === 'period' ? 'Older properties: prioritise damp, roof, and electrics. These are the most expensive to fix when neglected.' : '',
        ownership === 'landlord' ? 'As a landlord, annual gas and electrical safety certificates are a legal requirement — diary these well in advance.' : '',
        'Small maintenance issues cost 5–10× less to fix than neglected ones. Monthly checks take 15 minutes and save thousands.',
      ].filter(Boolean) as string[],
      nextActions: [
        'Book your boiler service for September today',
        'Walk through your property this weekend and note anything that needs attention',
        'Save all contractor contacts in a "Home" phone folder',
        'Set recurring calendar reminders for each seasonal check',
      ],
    }
  },
}

export default homeMaintenancePlanner
