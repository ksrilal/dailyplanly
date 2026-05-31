import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from '../finance/_currency'

const eventBudgetBuilder: Tool = {
  id: 'event-budget-builder',
  slug: 'event-budget-builder',
  title: 'Event Budget Builder',
  description: 'Build a complete event budget for any occasion — birthday, corporate, conference, or celebration. Get cost breakdowns, vendor allocation, and a saving checklist.',
  category: 'events',
  icon: 'Receipt',
  tags: ['event', 'budget', 'party', 'conference', 'celebration', 'planning'],
  relatedTemplateSlug: 'event-planning-system',
  relatedTemplateCategory: 'work-office',
  inputs: [
    CURRENCY_INPUT,
    { id: 'totalBudget', type: 'number', label: 'Total Budget', placeholder: '5000', min: 100, step: 100, required: true, defaultValue: 5000 },
    { id: 'guests', type: 'number', label: 'Number of Guests', placeholder: '50', min: 1, max: 2000, step: 5, required: true, defaultValue: 50 },
    { id: 'eventType', type: 'select', label: 'Event Type', required: true, defaultValue: 'party',
      options: [
        { label: 'Birthday / celebration party', value: 'party' },
        { label: 'Corporate event / conference', value: 'corporate' },
        { label: 'Baby or bridal shower', value: 'shower' },
        { label: 'Charity fundraiser', value: 'charity' },
        { label: 'Graduation or milestone event', value: 'graduation' },
      ] },
    { id: 'catering', type: 'select', label: 'Catering Style', required: false, defaultValue: 'buffet',
      options: [
        { label: 'Sit-down dinner', value: 'dinner' },
        { label: 'Buffet', value: 'buffet' },
        { label: 'Canapés and drinks only', value: 'canapes' },
        { label: 'Self-catering / DIY', value: 'diy' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const totalBudget = Number(inputs.totalBudget) || 5000
    const guests = Number(inputs.guests) || 50
    const eventType = String(inputs.eventType || 'party')
    const catering = String(inputs.catering || 'buffet')

    const perHead = Math.round(totalBudget / guests)

    const cateringPct = catering === 'dinner' ? 0.45 : catering === 'buffet' ? 0.35 : catering === 'canapes' ? 0.2 : 0.1
    const venuePct = 0.25
    const entertainmentPct = eventType === 'corporate' ? 0.05 : 0.1
    const decoPct = 0.08
    const photoPct = eventType === 'corporate' ? 0.05 : 0.08
    const miscPct = 1 - cateringPct - venuePct - entertainmentPct - decoPct - photoPct

    const budgets = {
      venue: Math.round(totalBudget * venuePct),
      catering: Math.round(totalBudget * cateringPct),
      entertainment: Math.round(totalBudget * entertainmentPct),
      decor: Math.round(totalBudget * decoPct),
      photography: Math.round(totalBudget * photoPct),
      misc: Math.round(totalBudget * Math.max(miscPct, 0.05)),
    }

    const weeklySchedule = [
      { week: '8+ weeks before', focus: 'Book key vendors', tasks: 'Venue · caterer · entertainment · photographer', notes: 'Confirm with deposits' },
      { week: '6 weeks before', focus: 'Invitations', tasks: 'Send invites · collect dietary requirements · set RSVP deadline', notes: 'RSVP deadline: 2 weeks before event' },
      { week: '3 weeks before', focus: 'Confirm details', tasks: 'Final guest count · confirm all vendors · order decorations', notes: 'Provide caterer with final numbers' },
      { week: '1 week before', focus: 'Final prep', tasks: 'Confirm timings with all vendors · create run sheet · delegate roles', notes: 'Brief all helpers on their roles' },
      { week: 'Event day', focus: 'Execute!', tasks: 'Arrive early · set up · greet guests · enjoy the event', notes: 'Delegate — you can\'t do everything' },
    ]

    return {
      headline: `${eventType.charAt(0).toUpperCase() + eventType.slice(1)} for ${guests} guests · ${S}${totalBudget.toLocaleString()} budget (${S}${perHead}/head)`,
      subheadline: `Catering: ${S}${budgets.catering.toLocaleString()} · Venue: ${S}${budgets.venue.toLocaleString()} · Entertainment: ${S}${budgets.entertainment.toLocaleString()}`,
      stats: [
        { label: 'Total Budget', value: `${S}${totalBudget.toLocaleString()}` },
        { label: 'Cost per Head', value: `${S}${perHead}` },
        { label: 'Venue Budget', value: `${S}${budgets.venue.toLocaleString()}` },
        { label: 'Catering Budget', value: `${S}${budgets.catering.toLocaleString()}` },
        { label: 'Entertainment', value: `${S}${budgets.entertainment.toLocaleString()}` },
        { label: 'Contingency', value: `${S}${budgets.misc.toLocaleString()}`, note: 'Always keep a buffer!' },
      ],
      milestones: [
        { label: 'Venue booked', date: '8 weeks before' },
        { label: 'Invitations sent', date: '6 weeks before' },
        { label: 'RSVPs received', date: '2 weeks before' },
        { label: 'Event day!', date: 'Your date' },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Event Planning Checklist',
          items: [
            `Book venue (budget: ${S}${budgets.venue.toLocaleString()})`,
            `Book caterer for ${catering} (budget: ${S}${budgets.catering.toLocaleString()})`,
            `Book entertainment (budget: ${S}${budgets.entertainment.toLocaleString()})`,
            'Send invitations',
            'Collect dietary requirements',
            'Create event run sheet',
            'Order decorations and supplies',
            'Confirm final numbers with caterer',
            'Brief all helpers and delegates on the day',
            'Have emergency fund accessible on the day',
          ],
        },
      ],
      recommendations: [
        `${S}${perHead}/head is ${perHead >= 80 ? 'a comfortable per-head budget.' : perHead >= 40 ? 'workable — prioritise food and venue.' : 'tight — consider a smaller guest list or self-catering.'}`,
        'Always keep 10% as a contingency — something always costs more than expected.',
        catering === 'diy' ? 'Self-catering saves significantly but adds significant stress. Consider hiring one professional caterer for the main dishes.' : '',
        'Book venue and caterer first — everything else can follow. These are the first to fill up.',
      ].filter(Boolean) as string[],
      nextActions: [
        `Contact 3 venues this week — budget: ${S}${budgets.venue.toLocaleString()}`,
        'Create a guest list spreadsheet with dietary requirements column',
        `Set up event budget tracker with ${S}${totalBudget.toLocaleString()} total`,
        'Send save-the-dates within 2 weeks',
      ],
    }
  },
}

export default eventBudgetBuilder
