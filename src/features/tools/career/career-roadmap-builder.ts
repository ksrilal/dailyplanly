import type { Tool } from '../types'

const careerRoadmapBuilder: Tool = {
  id: 'career-roadmap-builder',
  slug: 'career-roadmap-builder',
  title: 'Career Roadmap Builder',
  description: 'Map your career from where you are to where you want to be. Set your target role, timeline, and skill gaps to get a year-by-year roadmap, skill development plan, and networking checklist.',
  category: 'career',
  icon: 'Map',
  tags: ['career', 'promotion', 'growth', 'skills', 'professional development'],
  inputs: [
    { id: 'currentRole', type: 'text', label: 'Current Role / Title', placeholder: 'e.g. Software Engineer', required: true, defaultValue: 'My Current Role' },
    { id: 'targetRole', type: 'text', label: 'Target Role / Title', placeholder: 'e.g. Engineering Manager', required: true, defaultValue: 'My Target Role' },
    { id: 'yearsTimeline', type: 'number', label: 'Timeline to Achieve', placeholder: '3', unit: 'years', min: 0.5, max: 15, step: 0.5, required: true, defaultValue: 3 },
    { id: 'industry', type: 'text', label: 'Industry', placeholder: 'e.g. Technology, Finance, Healthcare', required: false, defaultValue: 'My Industry' },
    { id: 'skillGap1', type: 'text', label: 'Skill Gap #1', placeholder: 'e.g. Leadership and people management', required: false, defaultValue: '' },
    { id: 'skillGap2', type: 'text', label: 'Skill Gap #2', placeholder: 'e.g. Strategic thinking', required: false, defaultValue: '' },
    { id: 'currentSituation', type: 'select', label: 'How Are You Growing Currently?', required: false, defaultValue: 'some',
      options: [
        { label: 'Actively growing — taking courses, networking', value: 'active' },
        { label: 'Some development — occasional learning', value: 'some' },
        { label: 'Stagnant — need a plan to start', value: 'stagnant' },
      ] },
  ],
  generate(inputs) {
    const currentRole = String(inputs.currentRole || 'Current Role')
    const targetRole = String(inputs.targetRole || 'Target Role')
    const years = Number(inputs.yearsTimeline) || 3
    const industry = String(inputs.industry || 'my industry')
    const skillGap1 = String(inputs.skillGap1 || '')
    const skillGap2 = String(inputs.skillGap2 || '')
    const currentSituation = String(inputs.currentSituation || 'some')

    const skillGaps = [skillGap1, skillGap2].filter(Boolean)
    const targetDate = new Date()
    targetDate.setFullYear(targetDate.getFullYear() + Math.floor(years))
    targetDate.setMonth(targetDate.getMonth() + Math.round((years % 1) * 12))

    const phases = years <= 1
      ? [{ period: 'Q1', focus: 'Skill building', action: `Close gap: ${skillGap1 || 'top skill gap'}` }, { period: 'Q2–3', focus: 'Visibility', action: 'Internal projects, networking' }, { period: 'Q4', focus: 'Position', action: 'Apply internally or externally' }]
      : years <= 2
        ? [{ period: 'Year 1', focus: 'Foundation', action: 'Build missing skills, deliver high-impact projects' }, { period: 'Year 2', focus: 'Visibility & positioning', action: 'Lead projects, grow network, make your ambition known' }]
        : Array.from({ length: Math.min(Math.ceil(years), 5) }, (_, i) => ({
          period: `Year ${i + 1}`,
          focus: i === 0 ? 'Skill foundation' : i === Math.ceil(years) - 1 ? 'Final positioning & application' : i < Math.ceil(years) / 2 ? 'Growth & delivery' : 'Visibility & leadership',
          action: i === 0 ? `Learn ${skillGap1 || 'core skills'} · exceed current role expectations` : i === Math.ceil(years) - 1 ? `Target ${targetRole} roles · negotiate well` : `Take on stretch projects · mentor others · build ${industry} network`,
        }))

    const weeklySchedule = phases.map((p) => ({
      week: p.period,
      focus: p.focus,
      tasks: p.action,
      notes: '',
    }))

    return {
      headline: `${currentRole} → ${targetRole} in ${years} year${years !== 1 ? 's' : ''}`,
      subheadline: `Target: ${targetDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })} · ${industry} · ${skillGaps.length} identified skill gaps`,
      stats: [
        { label: 'Current Role', value: currentRole },
        { label: 'Target Role', value: targetRole },
        { label: 'Timeline', value: `${years} years` },
        { label: 'Target Date', value: targetDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) },
        { label: 'Skill Gaps', value: skillGaps.length > 0 ? skillGaps.join(', ').slice(0, 30) : 'Not identified' },
        { label: 'Industry', value: industry },
      ],
      milestones: phases.map((p, i) => ({
        label: `${p.period}: ${p.focus} complete`,
        date: p.period,
        description: p.action,
      })),
      weeklySchedule,
      checklists: [
        {
          title: 'Career Development Checklist',
          items: [
            `Research 10 people who currently hold "${targetRole}" roles`,
            'Request an informational interview with 3 of them',
            skillGap1 ? `Start learning ${skillGap1} — find a course or mentor` : 'Map your skill gap vs job descriptions for your target role',
            skillGap2 ? `Plan to develop ${skillGap2} — find opportunities in current role` : 'Find one stretch project to lead in your current role',
            'Update LinkedIn profile to show career direction',
            'Tell your manager about your career ambition — ask for their support',
            'Find a mentor in your target role or senior to it',
            'Attend one industry event or conference per quarter',
            'Track your achievements monthly — build your "brag document"',
            currentSituation === 'stagnant' ? 'Set a learning goal for this month — one course, book, or skill' : 'Increase your learning pace — commit to one hour daily',
          ],
        },
        {
          title: 'Monthly Career Habits',
          items: [
            'Learn something new relevant to your target role (1hr daily)',
            'Connect with 5 new people in your target role or industry',
            'Document one key achievement this month',
            'Review job postings for your target role — understand requirements',
            'Deliver one piece of work that gets noticed above your current level',
            'Have one career conversation with a mentor or sponsor',
          ],
        },
      ],
      recommendations: [
        `The fastest path from ${currentRole} to ${targetRole} is visibility + skills + relationships — in that order.`,
        skillGap1 ? `Start with "${skillGap1}" — it\'s often the fastest way to qualify for the next role.` : 'Analyse 5 job descriptions for your target role and identify the 3 most common requirements you\'re missing.',
        currentSituation === 'stagnant' ? 'You need a catalyst: a stretch project, a mentor, or a clear commitment to your manager about your goals. Pick one today.' : 'You\'re already developing — now focus on making your progress visible to decision-makers.',
        `Network with people already in "${targetRole}" roles. They know what it actually takes, and they can refer you.`,
        'Tell your manager your career goal. 70% of people never do. Managers advocate for people whose ambitions they know.',
      ],
      nextActions: [
        `LinkedIn: search "${targetRole}" and read 5 profiles of people in that role`,
        skillGap1 ? `This week: find and enroll in a course for "${skillGap1}"` : 'This week: identify your #1 skill gap vs your target role',
        'Send one networking message to someone in your target role today',
        'Schedule a career conversation with your manager this month',
      ],
    }
  },
}

export default careerRoadmapBuilder
