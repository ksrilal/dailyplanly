import type { Tool } from '../types'

const skillGapAnalyzer: Tool = {
  id: 'skill-gap-analyzer',
  slug: 'skill-gap-analyzer',
  title: 'Skill Gap Analyzer',
  description: 'Identify the gap between your current skills and your target role. Get a prioritised learning plan, resource list, and 90-day skill development roadmap.',
  category: 'career',
  icon: 'Gauge',
  tags: ['skills', 'career', 'learning', 'gap analysis', 'professional development'],
  inputs: [
    { id: 'targetRole', type: 'text', label: 'Target Role', placeholder: 'e.g. Data Scientist at a tech company', required: true, defaultValue: 'My Target Role' },
    { id: 'skill1', type: 'text', label: 'Key Skill Required #1', placeholder: 'e.g. Python programming', required: true, defaultValue: '' },
    { id: 'skill1Level', type: 'select', label: 'Your Current Level in Skill #1', required: true, defaultValue: '3',
      options: [
        { label: '1 — Complete beginner', value: '1' },
        { label: '2 — Basic awareness', value: '2' },
        { label: '3 — Intermediate', value: '3' },
        { label: '4 — Advanced', value: '4' },
        { label: '5 — Expert', value: '5' },
      ] },
    { id: 'skill2', type: 'text', label: 'Key Skill Required #2', placeholder: 'e.g. Data visualisation', required: false, defaultValue: '' },
    { id: 'skill2Level', type: 'select', label: 'Your Current Level in Skill #2', required: false, defaultValue: '2',
      options: [
        { label: '1 — Complete beginner', value: '1' },
        { label: '2 — Basic awareness', value: '2' },
        { label: '3 — Intermediate', value: '3' },
        { label: '4 — Advanced', value: '4' },
        { label: '5 — Expert', value: '5' },
      ] },
    { id: 'skill3', type: 'text', label: 'Key Skill Required #3', placeholder: 'e.g. Statistical analysis', required: false, defaultValue: '' },
    { id: 'skill3Level', type: 'select', label: 'Your Current Level in Skill #3', required: false, defaultValue: '1',
      options: [
        { label: '1 — Complete beginner', value: '1' },
        { label: '2 — Basic awareness', value: '2' },
        { label: '3 — Intermediate', value: '3' },
        { label: '4 — Advanced', value: '4' },
        { label: '5 — Expert', value: '5' },
      ] },
    { id: 'hoursPerWeek', type: 'number', label: 'Weekly Learning Hours Available', placeholder: '5', unit: 'hrs', min: 1, max: 40, step: 1, required: true, defaultValue: 5 },
  ],
  generate(inputs) {
    const targetRole = String(inputs.targetRole || 'Target Role')
    const hoursPerWeek = Number(inputs.hoursPerWeek) || 5
    const skills = [
      { name: String(inputs.skill1 || ''), level: Number(inputs.skill1Level) || 3 },
      { name: String(inputs.skill2 || ''), level: Number(inputs.skill2Level) || 2 },
      { name: String(inputs.skill3 || ''), level: Number(inputs.skill3Level) || 1 },
    ].filter(s => s.name)

    const targetLevel = 4 // expected for most professional roles
    const gaps = skills.map(s => ({ ...s, gap: Math.max(targetLevel - s.level, 0), priority: Math.max(targetLevel - s.level, 0) }))
    const totalGap = gaps.reduce((sum, g) => sum + g.gap, 0)
    const totalHoursNeeded = totalGap * 40 // ~40 hours per skill level
    const weeksToGoal = Math.ceil(totalHoursNeeded / hoursPerWeek)

    const completionDate = new Date()
    completionDate.setDate(completionDate.getDate() + weeksToGoal * 7)

    const levelLabels = ['', 'Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert']

    const weeklySchedule = [
      { week: 'Month 1', focus: `Priority gap: ${gaps.sort((a, b) => b.gap - a.gap)[0]?.name || 'Top skill'}`, tasks: `${hoursPerWeek}h/week · find course/resource · complete first module`, notes: 'Focus on ONE skill at a time for faster progress' },
      { week: 'Month 2', focus: 'Application phase', tasks: 'Build a project or do exercises to apply what you\'ve learned', notes: 'Application cements knowledge better than more studying' },
      { week: 'Month 3', focus: 'Second skill + portfolio', tasks: `Start ${gaps[1]?.name || 'second skill'} · document your progress publicly`, notes: 'Portfolio evidence beats certifications alone' },
      { week: `Month 4–${Math.ceil(weeksToGoal / 4)}`, focus: 'All gaps closed', tasks: 'Complete all skills to required level · apply to target roles', notes: 'Track hours diligently' },
    ]

    return {
      headline: `${totalGap} skill level gap${totalGap !== 1 ? 's' : ''} to close for ${targetRole}`,
      subheadline: `~${totalHoursNeeded} hours of learning needed · ${weeksToGoal} weeks at ${hoursPerWeek}h/week · Ready by ${completionDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`,
      stats: [
        { label: 'Target Role', value: targetRole.slice(0, 25) },
        { label: 'Skills Analysed', value: `${skills.length}` },
        { label: 'Total Gap', value: `${totalGap} levels` },
        { label: 'Learning Hours Needed', value: `~${totalHoursNeeded} hrs` },
        { label: 'Timeline', value: `${weeksToGoal} weeks` },
        { label: 'Weekly Investment', value: `${hoursPerWeek} hrs/week` },
      ],
      milestones: [
        ...gaps.sort((a, b) => b.gap - a.gap).map(g => ({
          label: `${g.name}: ${levelLabels[g.level]} → ${levelLabels[targetLevel]}`,
          date: `${Math.ceil(g.gap * 40 / hoursPerWeek)} weeks`,
          description: `Gap: ${g.gap} level${g.gap !== 1 ? 's' : ''} · ~${g.gap * 40} hours`,
        })),
        { label: `Ready to apply for ${targetRole}`, date: completionDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Skill Development Plan',
          items: [
            ...gaps.sort((a, b) => b.gap - a.gap).map(g => `${g.name}: Level ${g.level} → Level ${targetLevel} (~${g.gap * 40} hours)`),
            'Find top-rated course or book for highest-priority skill',
            'Set up dedicated learning time in your calendar',
            'Build a project to demonstrate each skill (portfolio evidence)',
            'Track learning hours in a spreadsheet or app',
            'Share progress on LinkedIn for accountability and visibility',
            'Connect with people already in your target role for mentorship',
            'Apply for roles when you reach Level 3+ in priority skills',
          ],
        },
      ],
      recommendations: [
        `Prioritise closing the ${gaps.sort((a, b) => b.gap - a.gap)[0]?.name || 'biggest'} gap first — it has the highest impact on your candidacy.`,
        'The most effective learning path: course (20%) → project (50%) → teaching/writing (30%).',
        'Don\'t wait until you\'re "ready" to apply — apply when you reach 70% of the requirements and learn the rest on the job.',
        `${hoursPerWeek} hours/week is ${hoursPerWeek >= 10 ? 'excellent — you\'ll see rapid progress' : 'a solid commitment — consider adding 30-min daily sessions'}.`,
        'Portfolio evidence (GitHub projects, case studies, work samples) is worth more than any certificate for most roles.',
      ],
      nextActions: [
        `Find and enrol in a course for "${gaps.sort((a, b) => b.gap - a.gap)[0]?.name || 'your top skill gap'}" today`,
        `Block ${hoursPerWeek}h of learning time in your calendar this week`,
        'Build one small project using your target skill this month',
        'Connect with 3 people in your target role on LinkedIn this week',
      ],
    }
  },
}

export default skillGapAnalyzer
