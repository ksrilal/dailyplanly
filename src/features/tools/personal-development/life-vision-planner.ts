import type { Tool } from '../types'

const lifeVisionPlannerTool: Tool = {
  id: 'life-vision-planner',
  slug: 'life-vision-planner',
  title: 'Life Vision Planner',
  description: 'Clarify what you want from your life across all key areas. Get a 5-year vision map, quarterly goals, daily alignment habits, and a life audit checklist.',
  category: 'personal-development',
  icon: 'Star',
  tags: ['life vision', 'goals', 'purpose', 'values', 'self-improvement', 'fulfilment'],
  relatedTemplateSlug: 'life-vision-planner',
  relatedTemplateCategory: 'lifestyle',
  inputs: [
    { id: 'ageNow', type: 'number', label: 'Your Current Age', placeholder: '30', unit: 'years', min: 16, max: 80, step: 1, required: false, defaultValue: 30 },
    { id: 'careerVision', type: 'text', label: 'Career / Work Vision (5 years)', placeholder: 'e.g. Running my own profitable consultancy', required: false, defaultValue: '' },
    { id: 'financialVision', type: 'text', label: 'Financial Vision (5 years)', placeholder: 'e.g. Financially free, no debt, investing monthly', required: false, defaultValue: '' },
    { id: 'healthVision', type: 'text', label: 'Health & Fitness Vision', placeholder: 'e.g. Run a marathon, feel energetic every day', required: false, defaultValue: '' },
    { id: 'relationshipsVision', type: 'text', label: 'Relationships Vision', placeholder: 'e.g. Deep friendships, fulfilling partnership', required: false, defaultValue: '' },
    { id: 'biggestBarrier', type: 'select', label: 'Biggest Barrier Right Now', required: false, defaultValue: 'clarity',
      options: [
        { label: 'Lack of clarity — don\'t know what I want', value: 'clarity' },
        { label: 'Lack of time — too busy with day-to-day', value: 'time' },
        { label: 'Fear of failure or judgment', value: 'fear' },
        { label: 'Lack of discipline or follow-through', value: 'discipline' },
      ] },
  ],
  generate(inputs) {
    const ageNow = Number(inputs.ageNow) || 30
    const careerVision = String(inputs.careerVision || '')
    const financialVision = String(inputs.financialVision || '')
    const healthVision = String(inputs.healthVision || '')
    const relationshipsVision = String(inputs.relationshipsVision || '')
    const barrier = String(inputs.biggestBarrier || 'clarity')

    const age5 = ageNow + 5
    const age1 = ageNow + 1

    const visions = [
      { area: 'Career', vision: careerVision, icon: '💼' },
      { area: 'Finance', vision: financialVision, icon: '💰' },
      { area: 'Health', vision: healthVision, icon: '❤️' },
      { area: 'Relationships', vision: relationshipsVision, icon: '👥' },
    ].filter(v => v.vision)

    const barrierFixes: Record<string, string[]> = {
      clarity: ['Spend 1 hour journaling: "What would my ideal day look like in 5 years?"', 'Write your eulogy — what do you want people to say?', 'Interview 3 people whose lives you admire about how they got there', 'Take the "Wheel of Life" assessment to score each life area'],
      time: ['Your vision requires 30 min/week — not hours', 'Schedule vision review as a non-negotiable appointment', 'The busiest people I know are the most intentional — lack of time is lack of priority', 'Identify 1 hour/week from social media to invest in your vision'],
      fear: ['Fear of failure is fear of growth — they\'re the same thing', 'The regret of not trying is always worse than the fear of trying', 'Start so small that failure is impossible — build confidence first', 'Share your vision with one trusted person — named fears shrink'],
      discipline: ['Discipline is built with tiny consistent actions, not heroic effort', 'Design your environment: make the right choice the easy choice', 'Attach your vision work to an existing habit', 'Track progress visually — what gets measured gets managed'],
    }

    const weeklySchedule = [
      { week: `Age ${ageNow} (Year 1)`, focus: 'Foundation year', tasks: visions.length > 0 ? `Focus: ${visions[0].area} vision — take first concrete action` : 'Define and commit to your vision across all life areas', notes: 'Year 1 is about starting and building systems' },
      { week: `Age ${ageNow + 2} (Year 2–3)`, focus: 'Growth phase', tasks: 'Multiple life areas improving simultaneously — momentum building', notes: 'The compound effect kicks in here' },
      { week: `Age ${ageNow + 4} (Year 4)`, focus: 'Acceleration', tasks: 'Doubling down on what\'s working, cutting what isn\'t', notes: 'Most people underestimate year 4 because they quit in year 2' },
      { week: `Age ${age5} (Year 5)`, focus: 'Arrival', tasks: 'Living the vision you set today — reflect and set the next 5-year vision', notes: 'The destination is never the end — it\'s the new beginning' },
    ]

    return {
      headline: `Life vision: ages ${ageNow} → ${age5}`,
      subheadline: `${visions.length} life area${visions.length !== 1 ? 's' : ''} mapped · ${barrier} identified as key barrier`,
      stats: [
        { label: 'Current Age', value: `${ageNow}` },
        { label: '5-Year Target Age', value: `${age5}` },
        { label: 'Life Areas Mapped', value: `${visions.length} / 4` },
        { label: 'Key Barrier', value: barrier.charAt(0).toUpperCase() + barrier.slice(1) },
        { label: 'Vision Horizon', value: '5 years' },
        { label: 'Quarterly Reviews', value: '4 per year' },
      ],
      milestones: [
        { label: `Age ${age1}: Year 1 vision set and 3 habits built`, date: `Year 1` },
        { label: `Age ${ageNow + 2}: First major life area transformed`, date: 'Year 2' },
        { label: `Age ${ageNow + 3}: Financial and health goals on track`, date: 'Year 3' },
        { label: `Age ${age5}: Living the vision you set today`, date: 'Year 5' },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Life Vision Launch Checklist',
          items: [
            'Write your 5-year vision for each life area (career, finance, health, relationships, purpose)',
            'Rate your current satisfaction in each area 1–10',
            'Identify the one area that would most transform your life if improved',
            'Set ONE goal in that area for the next 90 days',
            'Build ONE daily habit that aligns with your vision',
            'Schedule a quarterly vision review (4× per year)',
            'Find a mentor, coach, or accountability partner',
            'Read your vision statement every morning for 30 days',
          ],
        },
        {
          title: `Overcome Your Barrier: ${barrier}`,
          items: barrierFixes[barrier] || barrierFixes.clarity,
        },
        {
          title: 'Life Areas Vision Map',
          items: [
            `💼 Career: ${careerVision || 'Define your 5-year career vision'}`,
            `💰 Finance: ${financialVision || 'Define your 5-year financial vision'}`,
            `❤️ Health: ${healthVision || 'Define your 5-year health vision'}`,
            `👥 Relationships: ${relationshipsVision || 'Define your 5-year relationships vision'}`,
            '🌱 Personal Growth: Define your 5-year growth vision',
            '🎯 Purpose / Contribution: What legacy do you want to leave?',
          ],
        },
      ],
      recommendations: [
        'A life vision without a 90-day action plan is a dream. A 90-day plan without a vision is busy work. You need both.',
        barrierFixes[barrier][0],
        visions.length < 3 ? 'Complete the vision for all life areas — imbalance in one area creates drag in all others.' : 'Your vision is well-rounded. Focus on the area with the lowest current satisfaction score.',
        'Review your vision quarterly. Life evolves — your vision should evolve with it.',
        `Most people overestimate what they can do in 1 year and underestimate what they can do in ${Math.min(5, 10)} years. Commit to the longer game.`,
      ],
      nextActions: [
        'Spend 30 minutes today writing your vision for every life area',
        'Identify the ONE area to focus on in the next 90 days',
        'Build one daily habit that aligns with that area starting tomorrow',
        'Schedule your first quarterly vision review right now',
      ],
    }
  },
}

export default lifeVisionPlannerTool
