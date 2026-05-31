import type { Tool } from '../types'

const skillDevelopmentPlannerTool: Tool = {
  id: 'skill-development-planner',
  slug: 'skill-development-planner',
  title: 'Skill Development Planner',
  description: 'Choose a skill to master and get a structured learning roadmap with milestones, practice schedule, resources, and a 90-day progression plan.',
  category: 'education',
  icon: 'TrendingUp',
  tags: ['skill', 'learning', 'mastery', 'practice', 'development'],
  relatedTemplateSlug: 'skill-development-planner',
  relatedTemplateCategory: 'lifestyle',
  inputs: [
    { id: 'skill', type: 'text', label: 'Skill to Learn or Improve', placeholder: 'e.g. Spanish, Python, Public Speaking', required: true, defaultValue: 'My Skill' },
    { id: 'currentLevel', type: 'select', label: 'Current Level', required: true, defaultValue: 'beginner',
      options: [
        { label: 'Complete beginner (zero knowledge)', value: 'beginner' },
        { label: 'Novice (basic understanding)', value: 'novice' },
        { label: 'Intermediate (can use it but want to improve)', value: 'intermediate' },
        { label: 'Advanced (want to reach expert level)', value: 'advanced' },
      ] },
    { id: 'targetLevel', type: 'select', label: 'Target Level', required: true, defaultValue: 'conversational',
      options: [
        { label: 'Basic competence (can do simple tasks)', value: 'basic' },
        { label: 'Conversational/Functional (everyday use)', value: 'conversational' },
        { label: 'Professional (can use in work)', value: 'professional' },
        { label: 'Expert/Fluent (teaching-level mastery)', value: 'expert' },
      ] },
    { id: 'hoursPerWeek', type: 'number', label: 'Practice Hours per Week', placeholder: '5', unit: 'hrs', min: 0.5, max: 40, step: 0.5, required: true, defaultValue: 5 },
    { id: 'weeks', type: 'number', label: 'Timeline', placeholder: '12', unit: 'weeks', min: 4, max: 104, step: 1, required: true, defaultValue: 12 },
    { id: 'learningStyle', type: 'select', label: 'Preferred Learning Style', required: false, defaultValue: 'mixed',
      options: [
        { label: 'Structured (courses, books, tutorials)', value: 'structured' },
        { label: 'Project-based (learn by doing/building)', value: 'project' },
        { label: 'Social (classes, tutors, conversation)', value: 'social' },
        { label: 'Mixed approach', value: 'mixed' },
      ] },
  ],
  generate(inputs) {
    const skill = String(inputs.skill || 'My Skill')
    const currentLevel = String(inputs.currentLevel || 'beginner')
    const targetLevel = String(inputs.targetLevel || 'conversational')
    const hoursPerWeek = Number(inputs.hoursPerWeek) || 5
    const weeks = Number(inputs.weeks) || 12
    const learningStyle = String(inputs.learningStyle || 'mixed')

    const totalHours = Math.round(weeks * hoursPerWeek)
    const hoursPerDay = Math.round((hoursPerWeek / 7) * 10) / 10
    const completion = new Date()
    completion.setDate(completion.getDate() + weeks * 7)

    const levelLabels: Record<string, string> = { beginner: 'Beginner', novice: 'Novice', intermediate: 'Intermediate', advanced: 'Advanced' }
    const targetLabels: Record<string, string> = { basic: 'Basic Competence', conversational: 'Functional/Conversational', professional: 'Professional Level', expert: 'Expert/Mastery' }

    const phase1 = Math.ceil(weeks * 0.3)
    const phase2 = Math.ceil(weeks * 0.4)

    const weeklySchedule = [
      { week: `Weeks 1–${phase1}`, focus: 'Foundations', tasks: `Core concepts, guided learning, structured practice. ${hoursPerWeek}h/week.`, notes: learningStyle === 'structured' ? 'Find a course or book' : 'Build first small project' },
      { week: `Weeks ${phase1 + 1}–${phase1 + phase2}`, focus: 'Deliberate Practice', tasks: `Apply skill in real scenarios. Identify and target weak areas. Get feedback.`, notes: 'Stretch slightly beyond comfort each session' },
      { week: `Weeks ${phase1 + phase2 + 1}–${weeks}`, focus: 'Refinement & Integration', tasks: `Polish weak areas. Do showcase project or assessment. Teach what you know.`, notes: 'The best way to learn is to teach' },
    ]

    return {
      headline: `${totalHours} hours to go from ${levelLabels[currentLevel]} to ${targetLabels[targetLevel]} in ${skill}`,
      subheadline: `${hoursPerWeek} hrs/week · ${hoursPerDay} hrs/day · ${weeks} weeks · Complete: ${completion.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`,
      stats: [
        { label: 'Total Practice Hours', value: `${totalHours} hrs` },
        { label: 'Weekly Practice', value: `${hoursPerWeek} hrs/week` },
        { label: 'Daily Average', value: `${hoursPerDay} hrs/day` },
        { label: 'From → To', value: `${levelLabels[currentLevel]} → ${targetLabels[targetLevel]}` },
        { label: 'Timeline', value: `${weeks} weeks` },
        { label: 'Completion', value: completion.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) },
      ],
      milestones: [
        { label: `First milestone: basic ${skill} task completed independently`, date: `Week ${Math.ceil(weeks * 0.2)}` },
        { label: `Halfway: ${Math.floor(hoursPerWeek * weeks / 2)}h invested — noticeable improvement`, date: `Week ${Math.ceil(weeks / 2)}` },
        { label: `Showcase project or real-world use`, date: `Week ${Math.ceil(weeks * 0.8)}` },
        { label: `${targetLabels[targetLevel]} in ${skill} achieved`, date: completion.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      weeklySchedule,
      checklists: [
        {
          title: `${skill} Learning Checklist`,
          items: [
            `Define exactly what "${targetLabels[targetLevel]}" means for ${skill}`,
            'Find 2–3 core resources (course, book, mentor, YouTube channel)',
            `Schedule ${hoursPerWeek / 7 > 1 ? Math.round(hoursPerWeek / 7) + ' hours daily' : hoursPerWeek + ' hours spread across the week'} in your calendar`,
            'Set up a practice tracking system (journal or app)',
            'Find one accountability partner or community',
            learningStyle === 'social' ? 'Book your first session with a tutor or class' : 'Complete the first lesson or chapter today',
            'Define your first showcase: what will you build/do to prove your skill?',
            'Schedule a weekly 15-min review every Sunday',
          ],
        },
        {
          title: 'Daily Practice Habits',
          items: [
            `Practice ${skill} at the same time every day — habit stacking works`,
            'Focus on deliberate practice, not passive consumption',
            'Review what you practised yesterday before starting today',
            'Identify one specific weakness to improve this week',
            'Record or note your session: what you practised and what confused you',
          ],
        },
      ],
      recommendations: [
        `${totalHours} hours of deliberate practice is enough to reach ${targetLabels[targetLevel]} in most skills.`,
        'Deliberate practice (focused on weakness, with feedback) is 3–5× more effective than repetitive practice.',
        learningStyle === 'project' ? 'Project-based learning is the fastest route — build something real as early as possible.' : learningStyle === 'social' ? 'Social learning (tutors, classes) gives you feedback that self-study can\'t — book sessions regularly.' : '',
        'The biggest mistake: passive learning without active recall or application. Read → Do → Review.',
        `Consistency beats intensity. ${hoursPerDay} hrs every day beats a 7-hour weekend session.`,
      ].filter(Boolean) as string[],
      nextActions: [
        `Find one course, book, or tutor for ${skill} today`,
        `Block ${hoursPerWeek}h in your calendar this week for practice`,
        'Do the first session today — even 20 minutes to start the streak',
        'Write your "what success looks like" definition for this skill',
      ],
    }
  },
}

export default skillDevelopmentPlannerTool
