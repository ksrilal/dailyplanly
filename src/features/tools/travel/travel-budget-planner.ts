import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from '../finance/_currency'

const travelBudgetPlanner: Tool = {
  id: 'travel-budget-planner',
  slug: 'travel-budget-planner',
  title: 'Travel Budget Planner',
  description: 'Plan your travel budget intelligently. Enter your destination, group size, and trip length to get a full cost breakdown, daily spending plan, and money-saving checklist.',
  category: 'travel',
  icon: 'Wallet',
  tags: ['travel budget', 'holiday', 'trip', 'money', 'vacation', 'planning'],
  relatedTemplateSlug: 'trip-planner',
  relatedTemplateCategory: 'travel-events',
  inputs: [
    CURRENCY_INPUT,
    { id: 'destination', type: 'text', label: 'Destination', placeholder: 'e.g. Bali, Indonesia', required: true, defaultValue: 'My Destination' },
    { id: 'travelers', type: 'number', label: 'Number of Travellers', placeholder: '2', min: 1, max: 20, step: 1, required: true, defaultValue: 2 },
    { id: 'days', type: 'number', label: 'Trip Length', placeholder: '10', unit: 'days', min: 1, max: 365, step: 1, required: true, defaultValue: 10 },
    { id: 'totalBudget', type: 'number', label: 'Total Budget (all in)', placeholder: '3000', min: 0, step: 100, required: true, defaultValue: 3000 },
    { id: 'travelStyle', type: 'select', label: 'Travel Style', required: false, defaultValue: 'mid',
      options: [
        { label: 'Budget backpacker', value: 'budget' },
        { label: 'Mid-range comfort', value: 'mid' },
        { label: 'Comfort plus (4-star+)', value: 'comfort' },
        { label: 'Luxury', value: 'luxury' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const destination = String(inputs.destination || 'My Destination')
    const travelers = Number(inputs.travelers) || 2
    const days = Number(inputs.days) || 10
    const totalBudget = Number(inputs.totalBudget) || 3000
    const style = String(inputs.travelStyle || 'mid')

    const perPerson = totalBudget / travelers
    const perDay = totalBudget / days
    const perPersonPerDay = perPerson / days

    const splits: Record<string, { flights: number; accommodation: number; food: number; activities: number; transport: number; misc: number }> = {
      budget: { flights: 0.35, accommodation: 0.2, food: 0.15, activities: 0.1, transport: 0.1, misc: 0.1 },
      mid: { flights: 0.3, accommodation: 0.3, food: 0.18, activities: 0.12, transport: 0.05, misc: 0.05 },
      comfort: { flights: 0.28, accommodation: 0.38, food: 0.18, activities: 0.1, transport: 0.04, misc: 0.02 },
      luxury: { flights: 0.25, accommodation: 0.45, food: 0.15, activities: 0.1, transport: 0.03, misc: 0.02 },
    }

    const split = splits[style] || splits.mid
    const budgets = {
      flights: Math.round(totalBudget * split.flights),
      accommodation: Math.round(totalBudget * split.accommodation),
      food: Math.round(totalBudget * split.food),
      activities: Math.round(totalBudget * split.activities),
      transport: Math.round(totalBudget * split.transport),
      misc: Math.round(totalBudget * split.misc),
    }

    const nightlyRate = Math.round(budgets.accommodation / days)
    const dailyFood = Math.round(budgets.food / days)

    const weeklySchedule = [
      { week: 'Pre-trip', focus: 'Book and save', tasks: `Flights: ${S}${budgets.flights} · Accommodation: ${S}${budgets.accommodation} · Travel insurance`, notes: 'Book flights first — biggest variable' },
      { week: 'Day 1–3', focus: `${S}${Math.round(perDay * 3)} total budget`, tasks: `${S}${perPersonPerDay.toFixed(0)}/person/day · settle in · explore neighbourhood`, notes: 'Don\'t overspend early — you\'ll regret it' },
      { week: `Day 4–${Math.floor(days / 2)}`, focus: 'Peak activities', tasks: `Book activities within ${S}${budgets.activities} total budget`, notes: 'Pre-book popular attractions' },
      { week: `Day ${Math.floor(days / 2) + 1}–${days}`, focus: 'Wind down + shopping', tasks: `Reserve ${S}${budgets.misc} for souvenirs and final meals`, notes: 'Leave contingency for last day extras' },
    ]

    return {
      headline: `${destination} · ${days} days · ${travelers} traveller${travelers > 1 ? 's' : ''} · ${S}${totalBudget.toLocaleString()} total`,
      subheadline: `${S}${perPerson.toFixed(0)}/person · ${S}${perPersonPerDay.toFixed(0)}/person/day · ${style} travel style`,
      stats: [
        { label: 'Total Budget', value: `${S}${totalBudget.toLocaleString()}` },
        { label: 'Per Person', value: `${S}${perPerson.toFixed(0)}` },
        { label: 'Daily Budget', value: `${S}${perPersonPerDay.toFixed(0)}/person` },
        { label: 'Flights Budget', value: `${S}${budgets.flights.toLocaleString()}` },
        { label: 'Accommodation', value: `${S}${budgets.accommodation.toLocaleString()}`, note: `${S}${nightlyRate}/night` },
        { label: 'Food & Dining', value: `${S}${budgets.food.toLocaleString()}`, note: `${S}${dailyFood}/day` },
      ],
      milestones: [
        { label: 'Flights booked', date: '6–8 weeks before' },
        { label: 'Accommodation booked', date: '4–6 weeks before' },
        { label: 'Travel insurance purchased', date: '4 weeks before' },
        { label: 'Depart for ' + destination, date: 'Departure day' },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Complete Budget Breakdown',
          items: [
            `✈️ Flights: ${S}${budgets.flights.toLocaleString()} (${Math.round(split.flights * 100)}%)`,
            `🏨 Accommodation: ${S}${budgets.accommodation.toLocaleString()} (${Math.round(split.accommodation * 100)}%, ${S}${nightlyRate}/night)`,
            `🍽️ Food & dining: ${S}${budgets.food.toLocaleString()} (${Math.round(split.food * 100)}%, ${S}${dailyFood}/day)`,
            `🎭 Activities: ${S}${budgets.activities.toLocaleString()} (${Math.round(split.activities * 100)}%)`,
            `🚌 Local transport: ${S}${budgets.transport.toLocaleString()} (${Math.round(split.transport * 100)}%)`,
            `🎁 Shopping & misc: ${S}${budgets.misc.toLocaleString()} (${Math.round(split.misc * 100)}%)`,
            `💰 TOTAL: ${S}${totalBudget.toLocaleString()}`,
          ],
        },
        {
          title: 'Money-Saving Travel Checklist',
          items: [
            'Use a travel card (Wise, Revolut, Starling) — no foreign transaction fees',
            'Book flights on Tuesdays or Wednesdays for cheapest fares',
            'Travel in shoulder season (avoid peak — prices drop 30–40%)',
            'Eat where locals eat — away from tourist areas',
            'Pre-book major attractions online — cheaper and skip queues',
            'Notify your bank of travel dates to avoid card blocks',
            'Download offline maps (Maps.me) — saves roaming data costs',
            'Always compare transport: bus vs taxi vs metro',
          ],
        },
      ],
      recommendations: [
        `${S}${perPersonPerDay.toFixed(0)}/person/day is ${perPersonPerDay >= 100 ? 'a comfortable daily budget' : perPersonPerDay >= 50 ? 'workable — eat local and choose free attractions' : 'tight — prioritise accommodation and let food/activities be flexible'}.`,
        'The biggest variable is flights — set up fare alerts (Google Flights, Skyscanner) and book early.',
        `At ${S}${nightlyRate}/night for accommodation, focus on ${nightlyRate >= 100 ? 'quality and location' : 'central location and cleanliness'}.`,
        'Always keep 10% of your budget unallocated — unexpected costs always occur when travelling.',
      ],
      nextActions: [
        `Set a flight fare alert for ${destination} right now`,
        `Book accommodation for at least the first 2 nights`,
        'Open a travel-friendly bank account (Wise or Revolut)',
        `Create a daily spending tracker in your notes app: ${S}${perPersonPerDay.toFixed(0)}/person target`,
      ],
    }
  },
}

export default travelBudgetPlanner
