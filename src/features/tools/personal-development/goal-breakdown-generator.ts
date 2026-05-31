import type { Tool } from '../types'

const goalBreakdownGenerator: Tool = {
  id: 'goal-breakdown-generator',
  slug: 'goal-breakdown-generator',
  title: 'Goal Breakdown Generator',
  description: 'Turn any big goal into a clear action plan. Enter your goal, deadline, and available time — get a milestone roadmap, weekly action schedule, habit system, and accountability checklist.',
  category: 'personal-development',
  icon: 'Target',
  featured: true,
  tags: ['goals', 'planning', 'roadmap', 'milestones', 'action plan', 'personal development'],
  relatedTemplateSlug: 'goal-achievement-planner',
  relatedTemplateCategory: 'productivity',
  inputs: [
    { id: 'goal', type: 'text', label: 'Your Goal', placeholder: 'e.g. Write and publish my first book', required: true, defaultValue: 'My Big Goal' },
    { id: 'why', type: 'text', label: 'Why Does This Matter?', placeholder: 'e.g. To share my story and build a writing career', required: false, defaultValue: '' },
    { id: 'deadline', type: 'number', label: 'Timeline to Achieve', placeholder: '12', unit: 'weeks', min: 1, max: 104, step: 1, required: true, defaultValue: 12 },
    { id: 'hoursPerWeek', type: 'number', label: 'Hours You Can Invest Per Week', placeholder: '5', unit: 'hrs/week', min: 0.5, max: 80, step: 0.5, required: true, defaultValue: 5 },
    { id: 'biggestObstacle', type: 'text', label: 'Biggest Obstacle You Foresee', placeholder: 'e.g. Finding time around work and family', required: false, defaultValue: '' },
    { id: 'category', type: 'select', label: 'Goal Category', required: false, defaultValue: 'personal',
      options: [
        { label: 'Career & Professional', value: 'career' },
        { label: 'Health & Fitness', value: 'health' },
        { label: 'Financial', value: 'finance' },
        { label: 'Creative & Personal', value: 'personal' },
        { label: 'Education & Learning', value: 'education' },
        { label: 'Business & Entrepreneurship', value: 'business' },
        { label: 'Relationships & Family', value: 'relationships' },
      ] },
  ],
  generate(inputs) {
    const goal = String(inputs.goal || 'My Goal')
    const why = String(inputs.why || '')
    const weeks = Number(inputs.deadline) || 12
    const hoursPerWeek = Number(inputs.hoursPerWeek) || 5
    const obstacle = String(inputs.biggestObstacle || '')
    const category = String(inputs.category || 'personal')

    const totalHours = Math.round(weeks * hoursPerWeek)
    const hoursPerDay = Math.round((hoursPerWeek / 5) * 10) / 10

    const completionDate = new Date()
    completionDate.setDate(completionDate.getDate() + weeks * 7)
    const completionStr = completionDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

    // Milestones at 20%, 40%, 60%, 80%, 100%
    const milestones = [
      { pct: 20, verb: 'Foundation built' },
      { pct: 40, verb: 'Halfway momentum' },
      { pct: 60, verb: 'Past the tipping point' },
      { pct: 80, verb: 'Final stretch' },
      { pct: 100, verb: 'GOAL ACHIEVED' },
    ].map(({ pct, verb }) => {
      const d = new Date()
      d.setDate(d.getDate() + Math.round(weeks * (pct / 100)) * 7)
      return {
        label: `${verb} — ${pct}% complete`,
        date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        description: `Week ${Math.round(weeks * (pct / 100))} checkpoint`,
      }
    })

    // Weekly phases
    const phase1End = Math.ceil(weeks * 0.25)
    const phase2End = Math.ceil(weeks * 0.6)
    const phase3End = Math.ceil(weeks * 0.85)

    const weeklySchedule = [
      {
        week: `Weeks 1–${phase1End}`,
        focus: 'Foundation Phase — Research, Planning, Setup',
        tasks: `Define exactly what success looks like · Break goal into sub-tasks · Set up systems and tools · Do first meaningful action`,
        notes: 'Don\'t wait for perfect conditions — start now',
      },
      {
        week: `Weeks ${phase1End + 1}–${phase2End}`,
        focus: 'Execution Phase — Deep Work on Core Tasks',
        tasks: `${hoursPerWeek} hours/week dedicated to ${goal} · Weekly review every Sunday · Track progress vs plan`,
        notes: 'This is where most people quit. Keep showing up.',
      },
      {
        week: `Weeks ${phase2End + 1}–${phase3End}`,
        focus: 'Refinement Phase — Quality & Polish',
        tasks: 'Review work done · Fix gaps · Get feedback · Adjust timeline if needed',
        notes: 'Progress over perfection',
      },
      {
        week: `Weeks ${phase3End + 1}–${weeks}`,
        focus: 'Completion Phase — Final Push & Launch',
        tasks: `Complete final tasks · Celebrate milestones · Share with the world`,
        notes: 'The last 20% takes as long as the first 80% — plan for it',
      },
    ]

    const categoryHabits: Record<string, string[]> = {
      career: [`Spend ${hoursPerDay} hours daily on career goal work`, 'Network with 2 new people weekly', 'Learn one new relevant skill per month'],
      health: [`Exercise or train ${hoursPerDay} hours daily`, 'Log nutrition and progress daily', 'Sleep 8 hours — recovery is part of the plan'],
      finance: [`Review finances and progress weekly`, 'Track all spending daily', 'Read one finance article weekly'],
      personal: [`Create for ${hoursPerDay} hours daily`, 'Share work publicly for accountability', 'Read in your field 30 min daily'],
      education: [`Study ${hoursPerDay} hours daily`, 'Practice problems or application daily', 'Review notes within 24 hours of learning'],
      business: [`Work on business ${hoursPerDay} hours daily`, 'Talk to 1 potential customer weekly', 'Track key metrics weekly'],
      relationships: ['Schedule dedicated time weekly', 'Be present — no phones during quality time', 'Express appreciation daily'],
    }

    return {
      headline: `${totalHours} hours to achieve: ${goal}`,
      subheadline: `${hoursPerWeek} hrs/week · ${weeks} weeks · Target: ${completionStr}`,
      stats: [
        { label: 'Total Time Investment', value: `${totalHours} hours` },
        { label: 'Weekly Commitment', value: `${hoursPerWeek} hrs/week` },
        { label: 'Daily Sessions', value: `~${hoursPerDay} hrs/day` },
        { label: 'Timeline', value: `${weeks} weeks` },
        { label: 'Target Date', value: completionStr },
        { label: 'Category', value: category.charAt(0).toUpperCase() + category.slice(1) },
      ],
      milestones,
      weeklySchedule,
      checklists: [
        {
          title: 'Goal Launch Checklist',
          items: [
            `Write your goal in one clear sentence: "${goal}"`,
            why ? `Write your why: "${why}"` : 'Write down WHY this goal matters deeply to you',
            `Block ${hoursPerWeek} hours in your calendar this week`,
            'Break the goal into 5 concrete sub-milestones',
            'Define what "done" looks like — what is your success criteria?',
            'Tell one person about your commitment for accountability',
            obstacle ? `Plan how to overcome: "${obstacle}"` : 'Identify your biggest obstacle and plan for it',
            'Set up a progress tracking system (notebook or app)',
            'Schedule a weekly 30-min review every Sunday',
            'Commit: no matter what, show up for at least 1 hour this week',
          ],
        },
        {
          title: 'Weekly Review Ritual',
          items: [
            'Every Sunday: what did I accomplish this week?',
            'Rate progress 1–10 — why that number?',
            'What one thing made the biggest impact?',
            'What will I do differently next week?',
            'Plan the 3 most important tasks for next week',
            'Update milestone progress tracker',
            why ? `Re-read your why: "${why.slice(0, 80)}..."` : 'Re-connect with your reason for pursuing this goal',
          ],
        },
        {
          title: 'Daily Habits to Build',
          items: categoryHabits[category] || categoryHabits.personal,
        },
      ],
      recommendations: [
        `${totalHours} hours is a serious investment. Protect it like a business appointment.`,
        obstacle ? `Your obstacle: "${obstacle}". Plan for it now — don't let it surprise you mid-journey.` : 'Identify your #1 obstacle before you start — planning for failure is planning to succeed.',
        'The secret to big goals: consistent small actions. Show up for ${hoursPerWeek} hours every week without exception.',
        'Share your goal publicly or with a trusted person. Accountability doubles completion rates.',
        `Celebrate every milestone. The brain needs dopamine hits along the journey, not just at the destination.`,
      ],
      nextActions: [
        `Today: do the first meaningful action toward "${goal}" — even 15 minutes`,
        `Block ${hoursPerWeek} hours in this week's calendar right now`,
        'Tell one person your goal and deadline',
        'Write your 5 milestones on paper and put it where you\'ll see it',
        obstacle ? `Solve for: "${obstacle}" — what would remove this obstacle?` : 'Identify your first concrete step and do it today',
      ],
    }
  },
}

export default goalBreakdownGenerator
