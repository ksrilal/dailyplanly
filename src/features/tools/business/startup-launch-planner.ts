import type { Tool } from '../types'

const startupLaunchPlanner: Tool = {
  id: 'startup-launch-planner',
  slug: 'startup-launch-planner',
  title: 'Startup Launch Planner',
  description: 'Plan your startup launch from idea to first customer. Get a structured 90-day launch roadmap, validation checklist, MVP scope, and go-to-market action plan.',
  category: 'business',
  icon: 'Rocket',
  featured: false,
  tags: ['startup', 'launch', 'entrepreneur', 'MVP', 'product', 'go-to-market'],
  relatedTemplateSlug: 'business-startup-system',
  relatedTemplateCategory: 'work-office',
  inputs: [
    { id: 'idea', type: 'text', label: 'Your Startup Idea (one sentence)', placeholder: 'e.g. A SaaS tool for freelancers to track invoices', required: true, defaultValue: 'My Startup Idea' },
    { id: 'stage', type: 'select', label: 'Current Stage', required: true, defaultValue: 'idea',
      options: [
        { label: 'Idea stage (not yet validated)', value: 'idea' },
        { label: 'Validated (have talked to customers)', value: 'validated' },
        { label: 'Building (MVP in progress)', value: 'building' },
        { label: 'Pre-launch (MVP ready, no customers)', value: 'pre-launch' },
      ] },
    { id: 'type', type: 'select', label: 'Product Type', required: true, defaultValue: 'saas',
      options: [
        { label: 'SaaS / software', value: 'saas' },
        { label: 'Physical product / e-commerce', value: 'product' },
        { label: 'Service / consulting', value: 'service' },
        { label: 'Marketplace / platform', value: 'marketplace' },
      ] },
    { id: 'timeline', type: 'number', label: 'Launch Timeline', placeholder: '90', unit: 'days', min: 14, max: 365, step: 7, required: true, defaultValue: 90 },
    { id: 'teamSize', type: 'select', label: 'Team Size', required: false, defaultValue: 'solo',
      options: [
        { label: 'Solo founder', value: 'solo' },
        { label: '2 co-founders', value: 'cofounders' },
        { label: '3–5 person team', value: 'small' },
      ] },
  ],
  generate(inputs) {
    const idea = String(inputs.idea || 'My Startup Idea')
    const stage = String(inputs.stage || 'idea')
    const type = String(inputs.type || 'saas')
    const timeline = Number(inputs.timeline) || 90
    const teamSize = String(inputs.teamSize || 'solo')

    const phase1End = Math.ceil(timeline * 0.25)
    const phase2End = Math.ceil(timeline * 0.6)
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + timeline)

    const stageStartPoint: Record<string, string> = {
      idea: 'Start with customer validation — talk to 20 potential users before building anything',
      validated: 'You\'ve validated demand. Now scope the smallest possible MVP.',
      building: 'Focus on shipping, not perfection. Get to first user as fast as possible.',
      'pre-launch': 'Your focus is distribution: build an audience and waitlist before going live.',
    }

    const weeklySchedule = [
      { week: `Days 1–${phase1End}`, focus: stage === 'idea' ? 'Validation' : 'Foundation', tasks: stage === 'idea' ? 'Talk to 20 target customers · define problem clearly · scope MVP' : 'Finalise MVP scope · set up infrastructure · build landing page', notes: stageStartPoint[stage] },
      { week: `Days ${phase1End + 1}–${phase2End}`, focus: 'Build', tasks: `Build and test MVP · create pricing page · build email waitlist · content marketing`, notes: 'Ship to first 5 users as soon as basic function works' },
      { week: `Days ${phase2End + 1}–${timeline - 7}`, focus: 'Soft launch', tasks: `Launch to waitlist · collect feedback · iterate daily · get first paying customer`, notes: 'Revenue validates better than any user survey' },
      { week: `Days ${timeline - 6}–${timeline}`, focus: 'Public launch', tasks: `Product Hunt / social launch · PR push · referral programme · review and plan next 90 days`, notes: 'Launch is a process, not an event' },
    ]

    const typeChecklist: Record<string, string[]> = {
      saas: ['Build MVP with core feature only — no bells and whistles', 'Set up Stripe for payment processing', 'Create onboarding flow', 'Add basic analytics (Mixpanel or Amplitude)', 'Set up customer support (Intercom or Crisp)', 'Create documentation / help centre'],
      product: ['Manufacture or source minimum viable inventory', 'Set up Shopify or WooCommerce store', 'Create product photography', 'Set up payment processing', 'Define shipping and returns policy', 'Apply for any required certifications'],
      service: ['Define your offer and pricing clearly', 'Create case studies or testimonials from early work', 'Build a simple website with clear CTA', 'Set up a booking or contact system', 'Write proposal template', 'Define your client onboarding process'],
      marketplace: ['Define both sides of the marketplace (supply + demand)', 'Solve the chicken-and-egg problem: launch supply first', 'Build trust mechanisms (reviews, verification)', 'Set clear pricing and commission structure', 'Define dispute resolution process'],
    }

    return {
      headline: `${idea} — launch in ${timeline} days`,
      subheadline: `${stage.charAt(0).toUpperCase() + stage.slice(1)} stage · ${type} · ${teamSize} · Target: ${launchDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      stats: [
        { label: 'Idea', value: idea.slice(0, 20) + (idea.length > 20 ? '…' : '') },
        { label: 'Current Stage', value: stage.charAt(0).toUpperCase() + stage.slice(1) },
        { label: 'Launch Timeline', value: `${timeline} days` },
        { label: 'Launch Date', value: launchDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
        { label: 'Product Type', value: type.charAt(0).toUpperCase() + type.slice(1) },
        { label: 'Team', value: teamSize === 'solo' ? 'Solo founder' : teamSize === 'cofounders' ? '2 co-founders' : 'Small team' },
      ],
      milestones: [
        stage === 'idea' ? { label: '20 customer interviews completed', date: `Day ${Math.ceil(timeline * 0.15)}` } : { label: 'MVP scoped and started', date: 'Day 1' },
        { label: 'MVP built — first internal test', date: `Day ${phase1End}` },
        { label: 'First 10 users onboarded', date: `Day ${phase2End}` },
        { label: 'First paying customer', date: `Day ${Math.ceil(timeline * 0.7)}` },
        { label: 'Public launch', date: launchDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Pre-Launch Checklist',
          items: [
            stage === 'idea' ? 'Talk to 20 potential customers before writing a line of code' : 'Confirm you have at least 3 paying-intent commitments before launch',
            'Define your MVP: the minimum set of features to solve ONE problem',
            'Build a landing page with email signup to build waitlist',
            'Set up all business basics: domain, email, company registration',
            'Define your pricing model and test it with early users',
            'Create a simple onboarding flow',
            'Set up basic analytics to track conversions',
            'Write 3–5 pieces of content before launch (blog, LinkedIn posts)',
            ...(typeChecklist[type] || typeChecklist.saas),
          ],
        },
        {
          title: 'Launch Day Checklist',
          items: [
            'Email your waitlist first — they\'re your most loyal early adopters',
            'Post on Product Hunt (if SaaS/product)',
            'Share on LinkedIn with your personal story',
            'Post in relevant communities (Reddit, Slack groups, Discord)',
            'Message 20 people in your network personally',
            'Monitor for bugs and errors in real-time',
            'Reply to every comment and message within 1 hour',
            'Document everything — this becomes your launch case study',
          ],
        },
      ],
      recommendations: [
        stageStartPoint[stage],
        teamSize === 'solo' ? 'As a solo founder, ruthless prioritisation is your superpower. Do less, ship faster.' : 'With co-founders, weekly sync and clear ownership prevents duplicated effort and conflict.',
        type === 'saas' ? 'For SaaS: charge from day one — free users give vague feedback, paying users give focused feedback.' : '',
        'Launch earlier than you\'re comfortable with. The market will teach you more in a week than 6 months of planning.',
        'Focus on getting to your first 10 customers, not 1000. The first 10 teach you everything.',
      ].filter(Boolean) as string[],
      nextActions: [
        stage === 'idea' ? 'Talk to 5 potential customers this week before anything else' : 'Write down your MVP scope — maximum 3 core features',
        'Create a landing page with an email signup today',
        'Set your public launch date in your calendar',
        'Share your idea with 3 trusted people for honest feedback',
      ],
    }
  },
}

export default startupLaunchPlanner
