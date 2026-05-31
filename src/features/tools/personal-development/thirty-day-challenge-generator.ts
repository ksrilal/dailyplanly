import type { Tool } from '../types'

const thirtyDayChallengeGenerator: Tool = {
  id: 'thirty-day-challenge-generator',
  slug: 'thirty-day-challenge-generator',
  title: '30-Day Challenge Generator',
  description: 'Design a personalised 30-day challenge for any goal. Get a day-by-day progression plan, weekly milestones, accountability system, and completion checklist.',
  category: 'personal-development',
  icon: 'Flame',
  tags: ['30 day challenge', 'habit', 'goals', 'self-improvement', 'challenge'],
  inputs: [
    { id: 'challenge', type: 'text', label: 'Your 30-Day Challenge', placeholder: 'e.g. No social media, Daily exercise, Cold showers', required: true, defaultValue: 'My 30-Day Challenge' },
    { id: 'difficulty', type: 'select', label: 'Starting Difficulty', required: true, defaultValue: 'moderate',
      options: [
        { label: 'Easy (current ability + 10%)', value: 'easy' },
        { label: 'Moderate (stretch but achievable)', value: 'moderate' },
        { label: 'Hard (significantly outside comfort zone)', value: 'hard' },
      ] },
    { id: 'why', type: 'text', label: 'Why Are You Doing This?', placeholder: 'e.g. To build confidence and improve fitness', required: false, defaultValue: '' },
    { id: 'accountability', type: 'select', label: 'Accountability Method', required: false, defaultValue: 'partner',
      options: [
        { label: 'Accountability partner', value: 'partner' },
        { label: 'Public commitment (social media)', value: 'public' },
        { label: 'Private journal tracking', value: 'private' },
        { label: 'Join a community or group', value: 'community' },
      ] },
  ],
  generate(inputs) {
    const challenge = String(inputs.challenge || 'My 30-Day Challenge')
    const difficulty = String(inputs.difficulty || 'moderate')
    const why = String(inputs.why || '')
    const accountability = String(inputs.accountability || 'partner')

    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 30)

    const weeklySchedule = [
      { week: 'Week 1 (Days 1–7)', focus: 'Launch phase — build momentum', tasks: `Do ${challenge} daily. Focus on showing up, not perfection. Log every day.`, notes: 'The first 3 days are the hardest — push through' },
      { week: 'Week 2 (Days 8–14)', focus: 'Consistency phase — the real test', tasks: 'Streak building. If you miss a day: never miss twice. Review what\'s working.', notes: 'Day 11 is statistically the most common quit day — plan for it' },
      { week: 'Week 3 (Days 15–21)', focus: 'Momentum phase — habit forming', tasks: 'It gets easier. Add a small challenge upgrade if feeling comfortable.', notes: 'Day 21 is the neurological habit formation milestone — celebrate!' },
      { week: 'Week 4 (Days 22–30)', focus: 'Completion phase — cross the finish line', tasks: 'You\'re in the home stretch. Reflect on what\'s changed. Plan what comes next.', notes: 'Day 30 — share your completion story' },
    ]

    const difficultyProgression: Record<string, string[]> = {
      easy: ['Days 1–7: Establish the base habit daily', 'Days 8–14: Add 10% more difficulty or duration', 'Days 15–21: Add another 10% — 20% harder than day 1', 'Days 22–30: Maintain the new level — this is your new baseline'],
      moderate: ['Days 1–7: Core challenge at current ability', 'Days 8–14: Push slightly harder — 15% increase', 'Days 15–21: Reach the challenging zone — 25% harder', 'Days 22–30: Maintain peak level — prove you can sustain it'],
      hard: ['Days 1–5: Survive mode — just complete the challenge', 'Days 6–14: Start finding your rhythm', 'Days 15–21: You\'ve broken through the initial resistance', 'Days 22–30: What was hard is now your new normal'],
    }

    const accountabilitySystem: Record<string, string[]> = {
      partner: ['Text your accountability partner every day with a check-in', 'Schedule a weekly 10-min call to review progress', 'If you miss a day, notify your partner immediately — they help you restart', 'Celebrate each week together'],
      public: ['Post day 1 publicly with your challenge commitment', 'Share weekly progress updates', 'Document your journey — photos, videos, or writing', 'Day 30: share your transformation story'],
      private: ['Keep a daily journal — just 2 sentences: did it + how you felt', 'Weekly review: what worked, what was hard, what changed', 'Create a visual streak tracker — mark off every day', 'Write a letter to yourself on day 1 to open on day 30'],
      community: ['Find a group doing the same challenge (Reddit, Facebook, app)', 'Post daily check-ins in the community', 'Engage with others — support others when you feel like quitting', 'Complete the challenge alongside virtual teammates'],
    }

    return {
      headline: `30-Day Challenge: ${challenge}`,
      subheadline: `Starts today · Ends ${endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} · ${difficulty} difficulty${why ? ` · Why: ${why}` : ''}`,
      stats: [
        { label: 'Challenge', value: challenge.slice(0, 20) + (challenge.length > 20 ? '…' : '') },
        { label: 'Duration', value: '30 days' },
        { label: 'Start Date', value: startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
        { label: 'End Date', value: endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
        { label: 'Difficulty', value: difficulty.charAt(0).toUpperCase() + difficulty.slice(1) },
        { label: 'Accountability', value: accountability.charAt(0).toUpperCase() + accountability.slice(1) },
      ],
      milestones: [
        { label: 'Day 3 — pushed through the hardest days', date: 'Day 3' },
        { label: 'Day 7 — first week complete!', date: 'Day 7' },
        { label: 'Day 11 — past the most common quit point', date: 'Day 11' },
        { label: 'Day 21 — neurological habit forming', date: 'Day 21' },
        { label: 'Day 30 — CHALLENGE COMPLETE! 🎉', date: endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Challenge Launch Checklist',
          items: [
            `Write your challenge clearly: "${challenge}"`,
            why ? `Write your why: "${why}"` : 'Write down WHY this challenge matters to you',
            `Set up accountability: ${accountability}`,
            'Create a visual tracker (calendar or app) to mark each day',
            'Tell at least one person about your commitment',
            'Set a daily reminder alarm at your challenge time',
            'Prepare anything needed for tomorrow\'s first day',
            'Schedule your day 30 celebration right now',
          ],
        },
        {
          title: 'Progression Plan',
          items: difficultyProgression[difficulty] || difficultyProgression.moderate,
        },
        {
          title: `Accountability: ${accountability.charAt(0).toUpperCase() + accountability.slice(1)}`,
          items: accountabilitySystem[accountability] || accountabilitySystem.private,
        },
        {
          title: 'Daily Completion Tracker',
          items: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}: ___`),
        },
      ],
      recommendations: [
        'The challenge isn\'t the point — who you become by completing it is. Show up even when you don\'t feel like it.',
        'Never miss twice. One miss is allowed. Two consecutive misses is a new (bad) pattern.',
        difficulty === 'hard' ? 'Hard challenges create the most growth. The discomfort you feel is the signal that you\'re changing.' : '',
        why ? `Your "why" (${why}) is your fuel. Re-read it on day 11 — that\'s when most people quit.` : 'Write your why on paper and keep it visible — motivation comes and goes, purpose stays.',
        'On day 30, do not simply stop — either continue the habit, or upgrade to the next level.',
      ].filter(Boolean) as string[],
      nextActions: [
        `Start TODAY — do ${challenge} right now or schedule it for tomorrow morning`,
        'Set up your tracking system immediately',
        `Tell your accountability ${accountability === 'partner' ? 'partner' : 'community'} today`,
        'Mark day 30 in your calendar with a celebration plan',
      ],
    }
  },
}

export default thirtyDayChallengeGenerator
