import type { Tool } from '../types'

const conferencePlanner: Tool = {
  id: 'conference-planner',
  slug: 'conference-planner',
  title: 'Conference & Workshop Planner',
  description: 'Plan a professional conference, workshop, or seminar from scratch. Get an agenda builder, speaker checklist, logistics plan, and promotion timeline.',
  category: 'events',
  icon: 'Presentation',
  tags: ['conference', 'workshop', 'event', 'seminar', 'speakers', 'professional'],
  inputs: [
    { id: 'eventName', type: 'text', label: 'Event Name', placeholder: 'e.g. Tech Leaders Summit 2025', required: true, defaultValue: 'My Conference' },
    { id: 'attendees', type: 'number', label: 'Expected Attendees', placeholder: '100', min: 10, max: 5000, step: 10, required: true, defaultValue: 100 },
    { id: 'weeksAway', type: 'number', label: 'Weeks Until Event', placeholder: '12', unit: 'weeks', min: 4, max: 52, step: 1, required: true, defaultValue: 12 },
    { id: 'sessions', type: 'number', label: 'Number of Sessions/Talks', placeholder: '8', min: 1, max: 50, step: 1, required: false, defaultValue: 8 },
    { id: 'format', type: 'select', label: 'Event Format', required: false, defaultValue: 'in-person',
      options: [
        { label: 'In-person', value: 'in-person' },
        { label: 'Virtual / online', value: 'virtual' },
        { label: 'Hybrid (in-person + livestream)', value: 'hybrid' },
      ] },
  ],
  generate(inputs) {
    const eventName = String(inputs.eventName || 'My Conference')
    const attendees = Number(inputs.attendees) || 100
    const weeks = Number(inputs.weeksAway) || 12
    const sessions = Number(inputs.sessions) || 8
    const format = String(inputs.format || 'in-person')

    const eventDate = new Date()
    eventDate.setDate(eventDate.getDate() + weeks * 7)

    const weeklySchedule = [
      { week: `${weeks} weeks before`, focus: 'Foundation', tasks: 'Book venue/platform · confirm date · set goals · build team', notes: 'Budget: add 15% contingency' },
      { week: `${Math.round(weeks * 0.7)} weeks before`, focus: 'Content & speakers', tasks: 'Confirm speakers · set agenda · open ticket sales · launch marketing', notes: 'Speaker confirmation first — everything follows' },
      { week: `${Math.round(weeks * 0.4)} weeks before`, focus: 'Marketing push', tasks: 'Email campaigns · social media · partner outreach · PR', notes: 'Most registrations come 4–6 weeks before' },
      { week: '2 weeks before', focus: 'Logistics finalisation', tasks: 'Confirm all speakers · finalise AV · catering numbers · volunteer briefs', notes: 'Run full tech check if virtual/hybrid' },
      { week: 'Event day', focus: 'Execute!', tasks: 'Arrive 2 hours early · brief all staff · enjoy the event', notes: 'Trust your preparation' },
    ]

    return {
      headline: `${eventName} — ${attendees} attendees · ${sessions} sessions · ${format}`,
      subheadline: `${weeks} weeks away · ${eventDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
      stats: [
        { label: 'Event', value: eventName.slice(0, 20) },
        { label: 'Attendees', value: `${attendees}` },
        { label: 'Sessions', value: `${sessions}` },
        { label: 'Format', value: format.charAt(0).toUpperCase() + format.slice(1) },
        { label: 'Weeks Away', value: `${weeks}` },
        { label: 'Event Date', value: eventDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      milestones: [
        { label: 'Venue / platform booked', date: `${weeks} weeks before` },
        { label: 'All speakers confirmed', date: `${Math.round(weeks * 0.65)} weeks before` },
        { label: 'Tickets on sale — marketing live', date: `${Math.round(weeks * 0.6)} weeks before` },
        { label: `${eventName} — doors open!`, date: eventDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Conference Planning Checklist',
          items: [
            format !== 'virtual' ? 'Book venue with AV, WiFi, and catering capacity' : 'Set up Zoom/StreamYard/Hopin platform',
            'Confirm event date and add to all promotional channels',
            `Confirm ${Math.ceil(sessions / 2)} keynote and ${Math.floor(sessions / 2)} breakout speakers`,
            'Create and publish event website or Eventbrite page',
            'Open ticket sales — early bird pricing drives urgency',
            'Set up speaker portal with brief, slide template, and deadline',
            'Plan AV requirements: projector, mic, live streaming',
            format !== 'virtual' ? 'Arrange catering for breaks and lunch' : 'Test platform with all speakers 1 week before',
            'Create event hashtag and social media plan',
            'Brief all volunteers or staff on day-of roles',
            'Prepare run-of-show timeline (minute-by-minute)',
            'Post-event: send recording links and feedback survey within 48 hours',
          ],
        },
        {
          title: 'Speaker Management Checklist',
          items: [
            'Send speaker invitation with clear brief and expectations',
            'Confirm talk title, duration, and description from each speaker',
            'Set slide submission deadline: 1 week before event',
            'Provide slide template with branding',
            'Share AV setup and room layout details',
            'Conduct tech check 1 week before (especially for virtual)',
            'Prepare speaker introduction for each session',
            'Collect speaker bio and headshot for promotional materials',
          ],
        },
      ],
      recommendations: [
        `${attendees} attendees is ${attendees >= 200 ? 'a large event — hire a professional AV company' : 'a manageable size — focus on quality over quantity'}.`,
        format === 'virtual' ? 'Virtual events: production quality matters enormously. Invest in good lighting, audio, and a reliable streaming platform.' : 'In-person: the networking breaks are often more valuable than the sessions — design for conversation.',
        'Open ticket sales as early as possible — urgency drives registrations. Early bird pricing is the #1 tactic.',
        'Post-event content (recordings, slides, photos) extends your reach 10× beyond attendees.',
      ],
      nextActions: [
        format !== 'virtual' ? 'Visit and book your venue this week' : 'Set up your virtual event platform today',
        'Create your speaker shortlist and send 5 invitations this week',
        'Launch your event website or Eventbrite page',
        'Start promoting on LinkedIn and email today',
      ],
    }
  },
}

export default conferencePlanner
