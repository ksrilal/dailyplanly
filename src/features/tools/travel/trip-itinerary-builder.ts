import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from '../finance/_currency'

const tripItineraryBuilder: Tool = {
  id: 'trip-itinerary-builder',
  slug: 'trip-itinerary-builder',
  title: 'Trip Itinerary Builder',
  description: 'Enter your destination, trip length, and travel style to get a complete day-by-day itinerary, travel budget breakdown, packing checklist, and pre-trip action plan.',
  category: 'travel',
  icon: 'Map',
  featured: true,
  tags: ['travel', 'trip', 'itinerary', 'holiday', 'vacation', 'packing'],
  relatedTemplateSlug: 'trip-planner',
  relatedTemplateCategory: 'travel-events',
  inputs: [
    CURRENCY_INPUT,
    { id: 'destination', type: 'text', label: 'Destination', placeholder: 'e.g. Tokyo, Japan', required: true, defaultValue: 'My Destination' },
    { id: 'days', type: 'number', label: 'Trip Length', placeholder: '7', unit: 'days', min: 1, max: 90, step: 1, required: true, defaultValue: 7 },
    { id: 'budget', type: 'number', label: 'Total Budget', placeholder: '2000', min: 0, step: 100, required: true, defaultValue: 2000 },
    { id: 'travelers', type: 'number', label: 'Number of Travellers', placeholder: '2', min: 1, max: 20, step: 1, required: true, defaultValue: 2 },
    { id: 'tripType', type: 'select', label: 'Trip Style', required: true, defaultValue: 'balanced',
      options: [
        { label: 'Cultural (museums, history, local experiences)', value: 'cultural' },
        { label: 'Adventure (hiking, sport, outdoor)', value: 'adventure' },
        { label: 'Relaxation (beach, spa, slow travel)', value: 'relax' },
        { label: 'City break (food, art, nightlife)', value: 'city' },
        { label: 'Balanced (mix of everything)', value: 'balanced' },
      ] },
    { id: 'accommodation', type: 'select', label: 'Accommodation Style', required: false, defaultValue: 'mid',
      options: [
        { label: 'Budget (hostel / Airbnb shared)', value: 'budget' },
        { label: 'Mid-range (3-star hotel / Airbnb private)', value: 'mid' },
        { label: 'Comfort (4-star hotel)', value: 'comfort' },
        { label: 'Luxury (5-star / boutique)', value: 'luxury' },
      ] },
  ],
  generate(inputs) {
    const destination = String(inputs.destination || 'My Destination')
    const days = Number(inputs.days) || 7
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const totalBudget = Number(inputs.budget) || 2000
    const travelers = Number(inputs.travelers) || 2
    const tripType = String(inputs.tripType || 'balanced')
    const accommodation = String(inputs.accommodation || 'mid')

    const perPersonBudget = totalBudget / travelers
    const perDayBudget = perPersonBudget / days

    // Budget splits by accommodation type
    const accomPct: Record<string, number> = { budget: 0.2, mid: 0.35, comfort: 0.45, luxury: 0.55 }
    const accomBudget = Math.round(totalBudget * (accomPct[accommodation] || 0.35))
    const foodBudget = Math.round(totalBudget * 0.2)
    const activitiesBudget = Math.round(totalBudget * 0.15)
    const transportBudget = Math.round(totalBudget * 0.2)
    const shoppingBudget = Math.round(totalBudget * 0.07)
    const emergencyBudget = Math.round(totalBudget * 0.03)

    const accomLabels: Record<string, string> = { budget: 'Hostel / shared Airbnb', mid: '3-star hotel / private Airbnb', comfort: '4-star hotel', luxury: '5-star / boutique hotel' }

    const typeActivities: Record<string, string[]> = {
      cultural: ['Visit main historical sites and museums', 'Join a local guided tour', 'Attend a cultural event or performance', 'Explore local markets and artisan shops', 'Sample traditional cuisine at local restaurants'],
      adventure: ['Hike or trek the most scenic trail', 'Book an outdoor activity (kayaking, climbing, cycling)', 'Explore natural parks and reserves', 'Try a local sport or adventure activity', 'Sunrise/sunset viewpoint visit'],
      relax: ['Beach or spa day', 'Sleep in and slow morning at café', 'Sunset cruise or boat trip', 'Spa treatment or massage session', 'Poolside leisure afternoon'],
      city: ['Explore famous neighbourhoods on foot', 'Visit top-rated restaurants and food spots', 'Gallery or art museum visit', 'Evening out — bars, music, or show', 'Street food and local market exploration'],
      balanced: ['Morning: historical or cultural site', 'Afternoon: active exploration or nature', 'Evening: local food and nightlife', 'One full rest/beach day mid-trip', 'One day trip outside the city'],
    }

    const activities = typeActivities[tripType] || typeActivities.balanced

    // Day-by-day schedule
    const weeklySchedule = Array.from({ length: Math.min(days, 7) }, (_, i) => {
      const dayNum = i + 1
      let focus = ''
      let tasks = ''
      if (dayNum === 1) {
        focus = 'Arrival & Orientation'
        tasks = 'Check in, freshen up, explore neighbourhood, light dinner nearby'
      } else if (dayNum === days) {
        focus = 'Departure Day'
        tasks = 'Last breakfast, light morning activity, check out, head to airport/station'
      } else {
        focus = activities[(i - 1) % activities.length]
        tasks = `Breakfast at accommodation or local café · ${focus} · Evening: explore local dining`
      }
      return {
        week: `Day ${dayNum}`,
        focus,
        tasks,
        notes: dayNum === 1 ? 'Don\'t overpack day 1 — let yourself arrive' : dayNum === Math.ceil(days / 2) ? 'Mid-trip rest day — recharge' : '',
      }
    })

    const milestones = [
      { label: 'Book flights', date: '8–12 weeks before' },
      { label: `Book ${accomLabels[accommodation]}`, date: '6–8 weeks before' },
      { label: 'Apply for visa (if required)', date: '6 weeks before' },
      { label: 'Purchase travel insurance', date: '4 weeks before' },
      { label: 'Pre-book key activities and restaurants', date: '2–3 weeks before' },
      { label: 'Notify bank of travel dates', date: '1 week before' },
      { label: 'Pack and do final checklist', date: '2 days before' },
      { label: 'Depart for ${destination}', date: 'Departure day' },
    ]

    const packingItems = [
      'Passport (valid 6+ months)',
      'Travel insurance documents',
      'Flight/accommodation confirmations',
      'Foreign currency or travel card',
      'Phone + charger + travel adapter',
      'Portable power bank',
      'Clothing for weather + 1 smart outfit',
      'Comfortable walking shoes',
      'Sunscreen and toiletries (travel-size)',
      'Any prescription medication',
      'Reusable water bottle',
      'Day bag / backpack for excursions',
      'Downloaded offline maps',
      'Headphones for travel days',
    ]

    return {
      headline: `${days}-day trip to ${destination} for ${travelers} · ${S}${perPersonBudget.toFixed(0)}/person (${S}${perDayBudget.toFixed(0)}/day)`,
      subheadline: `${accomLabels[accommodation]} · ${tripType.charAt(0).toUpperCase() + tripType.slice(1)} style · Budget: ${S}${totalBudget.toLocaleString()} total`,
      stats: [
        { label: 'Total Budget', value: `${S}${totalBudget.toLocaleString()}` },
        { label: 'Per Person', value: `${S}${perPersonBudget.toFixed(0)}` },
        { label: 'Per Day (per person)', value: `${S}${perDayBudget.toFixed(0)}` },
        { label: 'Accommodation Budget', value: `${S}${accomBudget.toFixed(0)}`, note: accomLabels[accommodation] },
        { label: 'Food & Dining', value: `${S}${foodBudget.toFixed(0)}` },
        { label: 'Activities', value: `${S}${activitiesBudget.toFixed(0)}` },
      ],
      milestones,
      weeklySchedule,
      checklists: [
        { title: 'Pre-Trip Checklist', items: ['Book flights', `Book ${accomLabels[accommodation]}`, 'Check visa requirements', 'Buy travel insurance', 'Notify bank of travel', 'Pre-book key activities', 'Download offline maps for ' + destination, 'Check-in online (24h before departure)', 'Pack and do final checks', 'Arrange pet care / house sitter if needed'] },
        { title: 'Packing Checklist', items: packingItems },
      ],
      recommendations: [
        `${S}${perDayBudget.toFixed(0)}/day per person is ${perDayBudget > 150 ? 'comfortable' : perDayBudget > 80 ? 'workable — prioritise food and activities' : 'tight — look for free attractions and self-catering'} for ${destination}.`,
        `Book the first and last nights in advance. Middle nights can be more flexible if you like spontaneity.`,
        `Pre-book any must-do attractions — popular sites sell out weeks ahead in peak season.`,
        `Keep ${S}${emergencyBudget.toFixed(0)} unallocated as an emergency buffer — unexpected costs always appear.`,
        `Tell someone your full itinerary and check in regularly for safety on solo trips.`,
      ],
      nextActions: [
        `Search flights to ${destination} right now — prices change daily`,
        `Book accommodation for at least the first 2 nights`,
        'Check passport expiry date and visa requirements today',
        `Set a trip savings target: ${S}${totalBudget.toLocaleString()} by departure`,
        'Create a shared notes document with your travel companions',
      ],
    }
  },
}

export default tripItineraryBuilder
