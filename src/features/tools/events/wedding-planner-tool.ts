import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from '../finance/_currency'

const weddingPlannerTool: Tool = {
  id: 'wedding-planner-tool',
  slug: 'wedding-planner-tool',
  title: 'Wedding Planner',
  description: 'Plan your perfect wedding with a timeline, budget breakdown, vendor checklist, and month-by-month action plan from engagement to big day.',
  category: 'events',
  icon: 'Heart',
  featured: true,
  tags: ['wedding', 'event', 'planning', 'budget', 'timeline'],
  relatedTemplateSlug: 'wedding-planning-system',
  relatedTemplateCategory: 'lifestyle',
  inputs: [
    CURRENCY_INPUT,
    { id: 'budget', type: 'number', label: 'Total Wedding Budget', placeholder: '20000', min: 1000, step: 500, required: true, defaultValue: 20000 },
    { id: 'guests', type: 'number', label: 'Expected Guest Count', placeholder: '100', min: 10, max: 1000, step: 5, required: true, defaultValue: 100 },
    { id: 'monthsAway', type: 'number', label: 'Months Until Wedding', placeholder: '12', unit: 'months', min: 1, max: 36, step: 1, required: true, defaultValue: 12 },
    { id: 'style', type: 'select', label: 'Wedding Style', required: false, defaultValue: 'classic',
      options: [
        { label: 'Classic / Traditional', value: 'classic' },
        { label: 'Rustic / Countryside', value: 'rustic' },
        { label: 'Modern / Minimalist', value: 'modern' },
        { label: 'Destination Wedding', value: 'destination' },
        { label: 'Intimate / Micro-wedding (<30 guests)', value: 'intimate' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const budget = Number(inputs.budget) || 20000
    const guests = Number(inputs.guests) || 100
    const months = Number(inputs.monthsAway) || 12
    const style = String(inputs.style || 'classic')

    const perHead = Math.round(budget / guests)

    const venuePct = style === 'destination' ? 0.35 : style === 'intimate' ? 0.2 : 0.3
    const cateringPct = style === 'intimate' ? 0.25 : 0.3
    const photographyPct = 0.1
    const attirePct = 0.1
    const flowersPct = 0.05
    const entertainmentPct = 0.07
    const miscPct = 0.08

    const venueBudget = Math.round(budget * venuePct)
    const cateringBudget = Math.round(budget * cateringPct)
    const photographyBudget = Math.round(budget * photographyPct)
    const attireBudget = Math.round(budget * attirePct)
    const flowersBudget = Math.round(budget * flowersPct)
    const entertainmentBudget = Math.round(budget * entertainmentPct)
    const miscBudget = Math.round(budget * miscPct)

    const weddingDate = new Date()
    weddingDate.setMonth(weddingDate.getMonth() + months)

    const weeklySchedule = [
      { week: `${months}+ months before`, focus: 'Foundations', tasks: 'Set budget · Draft guest list · Agree style · Start venue search', notes: 'The earlier you book, the better choices you have' },
      { week: `${Math.round(months * 0.75)} months before`, focus: 'Major bookings', tasks: 'Book venue · Book photographer · Book caterer · Set date officially', notes: 'Top vendors book up to 18 months ahead' },
      { week: `${Math.round(months * 0.5)} months before`, focus: 'Details', tasks: 'Wedding attire · Invitations sent · Florist booked · Band/DJ booked', notes: 'Invitations: 6 months for formal, 3 for casual' },
      { week: `${Math.round(months * 0.25)} months before`, focus: 'Final planning', tasks: 'RSVPs confirmed · Seating plan · Rehearsal dinner · Final fittings', notes: 'Set RSVP deadline 6–8 weeks before date' },
      { week: '2 weeks before', focus: 'Final checks', tasks: 'Confirm all vendors · Final guest count to caterer · Pack for honeymoon', notes: 'Brief all wedding party on roles' },
      { week: 'Wedding day', focus: 'CELEBRATE!', tasks: 'Enjoy every moment — this is what all the planning was for', notes: 'Trust your vendors — let go and be present' },
    ]

    return {
      headline: `${style.charAt(0).toUpperCase() + style.slice(1)} wedding · ${guests} guests · ${S}${budget.toLocaleString()} budget`,
      subheadline: `${S}${perHead}/head · ${months} months away · ${weddingDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`,
      stats: [
        { label: 'Total Budget', value: `${S}${budget.toLocaleString()}` },
        { label: 'Guest Count', value: `${guests}` },
        { label: 'Cost per Head', value: `${S}${perHead}` },
        { label: 'Venue Budget', value: `${S}${venueBudget.toLocaleString()}`, note: `${Math.round(venuePct * 100)}%` },
        { label: 'Catering Budget', value: `${S}${cateringBudget.toLocaleString()}`, note: `${Math.round(cateringPct * 100)}%` },
        { label: 'Photography', value: `${S}${photographyBudget.toLocaleString()}`, note: `${Math.round(photographyPct * 100)}%` },
      ],
      milestones: [
        { label: 'Venue booked', date: `Month ${Math.max(months - 10, 1)}` },
        { label: 'Photographer booked', date: `Month ${Math.max(months - 9, 1)}` },
        { label: 'Invitations sent', date: `Month ${Math.max(months - 5, 1)}` },
        { label: 'RSVPs received', date: `Month ${Math.max(months - 2, 1)}` },
        { label: 'WEDDING DAY!', date: weddingDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Vendor Checklist',
          items: [
            `Venue (budget: ${S}${venueBudget.toLocaleString()}) — booked`,
            `Caterer (budget: ${S}${cateringBudget.toLocaleString()}) — booked`,
            `Photographer (budget: ${S}${photographyBudget.toLocaleString()}) — booked`,
            'Videographer (optional) — booked',
            `Wedding attire (budget: ${S}${attireBudget.toLocaleString()}) — ordered`,
            `Florist (budget: ${S}${flowersBudget.toLocaleString()}) — booked`,
            `Band or DJ (budget: ${S}${entertainmentBudget.toLocaleString()}) — booked`,
            'Officiant / registrar — booked',
            'Hair & makeup — booked and trial done',
            'Transport — booked',
            'Wedding cake — ordered',
            'Invitations — designed and sent',
          ],
        },
        {
          title: 'Budget Tracker',
          items: [
            `Venue: budget ${S}${venueBudget.toLocaleString()} | spent: _____`,
            `Catering: budget ${S}${cateringBudget.toLocaleString()} | spent: _____`,
            `Photography: budget ${S}${photographyBudget.toLocaleString()} | spent: _____`,
            `Attire: budget ${S}${attireBudget.toLocaleString()} | spent: _____`,
            `Flowers: budget ${S}${flowersBudget.toLocaleString()} | spent: _____`,
            `Entertainment: budget ${S}${entertainmentBudget.toLocaleString()} | spent: _____`,
            `Misc / contingency: ${S}${miscBudget.toLocaleString()}`,
          ],
        },
      ],
      recommendations: [
        `Book venue and photographer first — these are the first to sell out, often 12–18 months ahead.`,
        `${S}${perHead}/head is ${perHead >= 100 ? 'a solid budget for a quality event.' : 'tight — consider reducing guest count or choosing a venue-only package.'}`,
        'Always add 10–15% contingency to your budget — weddings consistently run over.',
        months < 6 ? 'With under 6 months, act fast — contact vendors immediately and be flexible on dates.' : 'You have great lead time — take your time choosing vendors and compare at least 3 quotes for each.',
      ],
      nextActions: [
        'Create a shared wedding planning document or folder',
        `Visit 3 venues this month — budget: ${S}${venueBudget.toLocaleString()}`,
        'Research and contact 3 photographers',
        'Send save-the-dates within the next 4 weeks',
      ],
    }
  },
}

export default weddingPlannerTool
