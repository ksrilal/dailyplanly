import type { Tool } from '../types'

const partyPlanningAssistant: Tool = {
  id: 'party-planning-assistant',
  slug: 'party-planning-assistant',
  title: 'Party Planning Assistant',
  description: 'Plan any party stress-free. Get a timeline, task checklist, day-of schedule, and host tips based on your party size, date, and style.',
  category: 'events',
  icon: 'PartyPopper',
  tags: ['party', 'birthday', 'celebration', 'hosting', 'event'],
  inputs: [
    { id: 'partyType', type: 'select', label: 'Party Type', required: true, defaultValue: 'birthday',
      options: [
        { label: 'Birthday party (adult)', value: 'birthday' },
        { label: 'Children\'s birthday party', value: 'kids' },
        { label: 'Dinner party', value: 'dinner' },
        { label: 'House party / gathering', value: 'house' },
        { label: 'Garden party / BBQ', value: 'garden' },
      ] },
    { id: 'guests', type: 'number', label: 'Number of Guests', placeholder: '20', min: 2, max: 500, step: 1, required: true, defaultValue: 20 },
    { id: 'weeksAway', type: 'number', label: 'Weeks Until Party', placeholder: '4', unit: 'weeks', min: 1, max: 52, step: 1, required: true, defaultValue: 4 },
    { id: 'venue', type: 'select', label: 'Venue', required: false, defaultValue: 'home',
      options: [
        { label: 'At home', value: 'home' },
        { label: 'Hired venue', value: 'venue' },
        { label: 'Restaurant or bar', value: 'restaurant' },
        { label: 'Outdoor / park', value: 'outdoor' },
      ] },
  ],
  generate(inputs) {
    const partyType = String(inputs.partyType || 'birthday')
    const guests = Number(inputs.guests) || 20
    const weeks = Number(inputs.weeksAway) || 4
    const venue = String(inputs.venue || 'home')

    const partyLabels: Record<string, string> = { birthday: 'Birthday Party', kids: 'Children\'s Party', dinner: 'Dinner Party', house: 'House Party', garden: 'Garden Party/BBQ' }

    const partyDate = new Date()
    partyDate.setDate(partyDate.getDate() + weeks * 7)

    const daySchedule = partyType === 'dinner'
      ? [
        { time: '14:00', label: 'Final shopping · set table · prep starters', type: 'work' as const },
        { time: '16:00', label: 'Cook main courses · tidy home', type: 'work' as const },
        { time: '18:00', label: 'Get ready · final touches', type: 'rest' as const },
        { time: '19:00', label: 'Guests arrive · welcome drinks', type: 'work' as const },
        { time: '19:30', label: 'Starters served', type: 'work' as const },
        { time: '20:30', label: 'Main course', type: 'work' as const },
        { time: '22:00', label: 'Dessert · speeches if applicable', type: 'work' as const },
        { time: '23:30', label: 'Wind down · guests depart', type: 'rest' as const },
      ]
      : [
        { time: '09:00', label: 'Party setup: decorations, tables, food prep', type: 'work' as const },
        { time: '11:00', label: 'Final food preparation · chill drinks', type: 'work' as const },
        { time: '12:00', label: 'Get ready · brief any helpers', type: 'rest' as const },
        { time: '13:00', label: 'Guests start arriving · welcome', type: 'work' as const },
        { time: '14:00', label: partyType === 'kids' ? 'Activities and games begin' : 'Party in full swing · music · food out', type: 'work' as const },
        { time: '15:30', label: partyType === 'birthday' || partyType === 'kids' ? 'Cake and singing!' : 'Main food service', type: 'work' as const },
        { time: '17:00', label: 'Wind down · guests begin departing', type: 'rest' as const },
        { time: '18:00', label: 'Cleanup begins', type: 'review' as const },
      ]

    const weeklySchedule = [
      { week: `${weeks} weeks before`, focus: 'Planning', tasks: 'Set date · create guest list · decide theme · send invites', notes: 'Digital invites: WhatsApp, Evite, or email' },
      { week: `${Math.ceil(weeks * 0.6)} weeks before`, focus: 'Confirm & prepare', tasks: 'Chase RSVPs · order decorations · plan menu · book entertainment if needed', notes: 'Confirm final numbers' },
      { week: '1 week before', focus: 'Final prep', tasks: 'Buy non-perishable food · confirm helpers · make playlist · prep activities', notes: 'Make a detailed day-of timeline' },
      { week: '1–2 days before', focus: 'Final details', tasks: 'Buy perishables · make food that keeps · set up venue if possible', notes: 'Do as much as possible in advance' },
      { week: 'Party day', focus: 'CELEBRATE!', tasks: 'Morning setup · greet guests · enjoy every moment', notes: 'Delegate tasks — you\'re the host, not the cleaner' },
    ]

    return {
      headline: `${partyLabels[partyType]} for ${guests} guests — ${partyDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}`,
      subheadline: `${weeks} weeks away · ${venue === 'home' ? 'At home' : venue.charAt(0).toUpperCase() + venue.slice(1)} · ${guests <= 10 ? 'Intimate gathering' : guests <= 30 ? 'Medium party' : 'Large celebration'}`,
      stats: [
        { label: 'Party Type', value: partyLabels[partyType] },
        { label: 'Guest Count', value: `${guests}` },
        { label: 'Weeks to Party', value: `${weeks}` },
        { label: 'Venue', value: venue.charAt(0).toUpperCase() + venue.slice(1) },
        { label: 'Party Date', value: partyDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
        { label: 'Scale', value: guests <= 10 ? 'Intimate' : guests <= 30 ? 'Medium' : 'Large' },
      ],
      milestones: [
        { label: 'Invitations sent', date: `${weeks} weeks before` },
        { label: 'RSVPs confirmed', date: `${Math.ceil(weeks * 0.4)} weeks before` },
        { label: 'Food and decorations ready', date: '1 week before' },
        { label: 'PARTY DAY!', date: partyDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      weeklySchedule,
      dailySchedule: daySchedule,
      checklists: [
        {
          title: 'Complete Party Planning Checklist',
          items: [
            'Create and send invitations',
            'Confirm RSVPs (set deadline)',
            'Plan menu and drinks',
            'Order or buy decorations',
            partyType === 'kids' ? 'Plan 3–4 games or activities for children' : 'Create playlist',
            'Arrange tables, chairs, and serving ware',
            venue === 'home' ? 'Deep clean home 2 days before' : 'Confirm venue booking',
            'Assign helpers to specific tasks',
            'Buy all food and drinks',
            'Prepare food that can be made in advance',
            'Set up the space morning of party',
            'Have a plan B for outdoor parties (weather)',
          ],
        },
        {
          title: `Host Tips for ${partyLabels[partyType]}`,
          items: [
            'Greet every guest personally when they arrive',
            'Prepare more food than you think you need — guests always eat more',
            'Have a non-alcoholic option that\'s as appealing as the alcoholic one',
            partyType === 'kids' ? 'Have a first aid kit accessible' : 'Introduce guests who don\'t know each other',
            'Take at least 10 minutes to enjoy your own party',
            'Have a designated area for coats and bags',
            'Keep music at a level that allows conversation',
          ],
        },
      ],
      recommendations: [
        `For ${guests} guests, aim for more food than you think you need — people always eat more at parties.`,
        venue === 'home' ? 'Prepare as much as possible the day before — your future self will thank you.' : '',
        partyType === 'kids' ? 'Children\'s parties: 2 hours is the sweet spot. Longer and children get tired and emotional.' : '',
        'Delegate! Assign helpers specific tasks so you can actually enjoy the party.',
      ].filter(Boolean) as string[],
      nextActions: [
        'Send invitations today — even a WhatsApp message counts',
        'Create a shopping list for food and decorations',
        'Assign at least one helper to arrive early',
        'Set an RSVP deadline for 2 weeks before the party',
      ],
    }
  },
}

export default partyPlanningAssistant
