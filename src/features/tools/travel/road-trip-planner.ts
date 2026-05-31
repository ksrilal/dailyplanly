import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from '../finance/_currency'

const roadTripPlannerTool: Tool = {
  id: 'road-trip-planner',
  slug: 'road-trip-planner',
  title: 'Road Trip Planner',
  description: 'Plan the perfect road trip with a route overview, daily mileage, budget breakdown, stop-by-stop itinerary, and car preparation checklist.',
  category: 'travel',
  icon: 'Car',
  tags: ['road trip', 'driving', 'travel', 'route', 'car', 'adventure'],
  relatedTemplateSlug: 'road-trip-planner',
  relatedTemplateCategory: 'travel-events',
  inputs: [
    CURRENCY_INPUT,
    { id: 'totalMiles', type: 'number', label: 'Estimated Total Distance', placeholder: '500', unit: 'miles', min: 10, max: 10000, step: 10, required: true, defaultValue: 500 },
    { id: 'days', type: 'number', label: 'Trip Duration', placeholder: '5', unit: 'days', min: 1, max: 60, step: 1, required: true, defaultValue: 5 },
    { id: 'travelers', type: 'number', label: 'Number of Travellers', placeholder: '2', min: 1, max: 8, step: 1, required: true, defaultValue: 2 },
    { id: 'mpg', type: 'number', label: 'Car Fuel Efficiency', placeholder: '35', unit: 'mpg', min: 10, max: 80, step: 1, required: false, defaultValue: 35 },
    { id: 'fuelPrice', type: 'number', label: 'Fuel Price per Litre', placeholder: '1.55', unit: 'per litre', min: 0, max: 10, step: 0.01, required: false, defaultValue: 1.55 },
    { id: 'accommodation', type: 'select', label: 'Accommodation Style', required: false, defaultValue: 'bnb',
      options: [
        { label: 'Camping / glamping', value: 'camping' },
        { label: 'B&B / guesthouse', value: 'bnb' },
        { label: '3-star hotel', value: 'hotel' },
        { label: 'Airbnb', value: 'airbnb' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const totalMiles = Number(inputs.totalMiles) || 500
    const days = Number(inputs.days) || 5
    const travelers = Number(inputs.travelers) || 2
    const mpg = Number(inputs.mpg) || 35
    const fuelPrice = Number(inputs.fuelPrice) || 1.55
    const accommodation = String(inputs.accommodation || 'bnb')

    const milesPerDay = Math.round(totalMiles / days)
    const litresNeeded = (totalMiles / mpg) * 4.546 // miles to litres
    const fuelCost = Math.round(litresNeeded * fuelPrice)

    const accomNightly: Record<string, number> = { camping: 25, bnb: 80, hotel: 120, airbnb: 90 }
    const accomCost = (accomNightly[accommodation] || 80) * (days - 1)
    const foodCost = Math.round(travelers * 30 * days)
    const activitiesCost = Math.round(days * 20)
    const totalCost = fuelCost + accomCost + foodCost + activitiesCost
    const perPerson = Math.round(totalCost / travelers)

    const weeklySchedule = Array.from({ length: Math.min(days, 7) }, (_, i) => ({
      week: `Day ${i + 1}`,
      focus: i === 0 ? 'Depart & first stop' : i === days - 1 ? 'Return journey' : `Drive & explore — ${milesPerDay} miles`,
      tasks: `Drive ${milesPerDay} miles · explore stops · ${i === 0 ? 'check in to ' + accommodation : i === days - 1 ? 'head home' : 'find hidden gems'}`,
      notes: i === 0 ? 'Leave early — traffic is lighter in the morning' : i === Math.floor(days / 2) ? 'Rest day — stay longer at a favourite stop' : '',
    }))

    return {
      headline: `${totalMiles}-mile road trip · ${days} days · ${travelers} traveller${travelers > 1 ? 's' : ''}`,
      subheadline: `${milesPerDay} miles/day · ${S}${fuelCost} fuel · ${S}${totalCost.toLocaleString()} total · ${S}${perPerson}/person`,
      stats: [
        { label: 'Total Distance', value: `${totalMiles} miles` },
        { label: 'Miles per Day', value: `${milesPerDay} miles` },
        { label: 'Fuel Cost', value: `${S}${fuelCost}` },
        { label: 'Accommodation', value: `${S}${accomCost}` },
        { label: 'Total Estimated Cost', value: `${S}${totalCost.toLocaleString()}` },
        { label: 'Per Person', value: `${S}${perPerson}` },
      ],
      milestones: [
        { label: 'Car checked and ready', date: '2 days before departure' },
        { label: 'Route planned, accommodations booked', date: '1 week before' },
        { label: 'Day 1 departure', date: 'Trip start' },
        { label: 'Return home safely', date: `Day ${days}` },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Car Pre-Trip Check',
          items: ['Tyre pressure checked (including spare)', 'Oil and coolant levels topped up', 'Windscreen washer fluid filled', 'All lights working (headlights, brake lights)', 'AA/RAC breakdown membership active', 'Car insurance covers the trip dates', 'Screen wash and ice scraper (winter)', 'First aid kit in the car'],
        },
        {
          title: 'Road Trip Essentials',
          items: ['Downloaded offline maps (no signal risk)', 'Car phone mount for navigation', 'Charging cable in the car', 'Cash for tolls, car parks, and emergencies', 'Snacks and a cooler bag', 'Reusable water bottles', 'Sunglasses and sun visor', 'Blanket for cold evenings', 'Wet wipes and hand sanitiser', 'Road atlas as backup'],
        },
      ],
      recommendations: [
        `${milesPerDay} miles per day is ${milesPerDay <= 150 ? 'relaxed — plenty of time for stops and exploration' : milesPerDay <= 300 ? 'moderate — plan 2–3 stops' : 'ambitious — limit sightseeing stops or add a day'}.`,
        `Fuel cost of ${S}${fuelCost} based on ${mpg} MPG. Motorway driving reduces MPG — add 10% buffer.`,
        'The best road trip moments happen when you leave room for spontaneity — don\'t over-schedule every stop.',
        'Book accommodation in advance for the first and last nights — middle nights can be flexible.',
      ],
      nextActions: [
        'Book all accommodation at least 2 weeks before departure',
        'Download offline maps for your route today',
        'Book car for a service if due — don\'t risk a breakdown',
        'Plan your route with 3–5 must-see stops and leave the rest open',
      ],
    }
  },
}

export default roadTripPlannerTool
