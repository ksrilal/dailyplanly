import type { Tool } from '../types'

const interviewPreparationPlanner: Tool = {
  id: 'interview-preparation-planner',
  slug: 'interview-preparation-planner',
  title: 'Interview Preparation Planner',
  description: 'Walk into any interview fully prepared. Enter the role and interview date to get a structured preparation plan, STAR story framework, company research checklist, and day-of execution guide.',
  category: 'career',
  icon: 'MessageSquare',
  tags: ['interview', 'career', 'job', 'preparation', 'STAR', 'questions'],
  inputs: [
    { id: 'role', type: 'text', label: 'Role You\'re Interviewing For', placeholder: 'e.g. Senior Product Manager at Google', required: true, defaultValue: 'Target Role' },
    { id: 'daysUntil', type: 'number', label: 'Days Until Interview', placeholder: '7', unit: 'days', min: 1, max: 90, step: 1, required: true, defaultValue: 7 },
    { id: 'interviewType', type: 'select', label: 'Interview Type', required: true, defaultValue: 'competency',
      options: [
        { label: 'Competency / Behavioural (STAR format)', value: 'competency' },
        { label: 'Technical (coding, case studies)', value: 'technical' },
        { label: 'Senior / Leadership (strategic questions)', value: 'leadership' },
        { label: 'Panel interview (multiple interviewers)', value: 'panel' },
      ] },
    { id: 'rounds', type: 'number', label: 'Number of Interview Rounds', placeholder: '3', min: 1, max: 10, step: 1, required: false, defaultValue: 3 },
    { id: 'biggestFear', type: 'select', label: 'Biggest Interview Fear', required: false, defaultValue: 'blanking',
      options: [
        { label: 'Going blank on questions', value: 'blanking' },
        { label: 'Salary negotiation', value: 'salary' },
        { label: 'Not knowing enough about the company', value: 'company' },
        { label: 'Technical questions', value: 'technical' },
        { label: 'Nerves and confidence', value: 'nerves' },
      ] },
  ],
  generate(inputs) {
    const role = String(inputs.role || 'Target Role')
    const days = Number(inputs.daysUntil) || 7
    const interviewType = String(inputs.interviewType || 'competency')
    const rounds = Number(inputs.rounds) || 3
    const biggestFear = String(inputs.biggestFear || 'blanking')

    const fearFixes: Record<string, string[]> = {
      blanking: ['Prepare 10 STAR stories — you can adapt any of them to almost any question', 'Pause and breathe before answering — 5 seconds of silence is fine', 'Ask for a moment: "That\'s a great question, let me think for a second"', 'Practice out loud until answers feel automatic'],
      salary: ['Research the market: Glassdoor, LinkedIn Salary, industry reports', 'Never give the first number — "What\'s the budget for this role?"', 'State a range, anchor high: "Based on market research, I\'m looking at the market rate for this role"', 'Negotiate non-salary: remote days, equity, development budget'],
      company: ['Spend 60 minutes reading the company\'s website, LinkedIn, and recent news', 'Find 3 things you genuinely find interesting about them', 'Prepare 5 intelligent questions that show you\'ve done research', 'Follow the company on LinkedIn before the interview'],
      technical: ['Practice on the same platform you\'ll use (HackerRank, LeetCode)', 'Think out loud — they want to see your process, not just the answer', 'If stuck: ask clarifying questions and explain your approach first', 'Do 2 mock interviews with a friend or using Pramp/Interviewing.io'],
      nerves: ['Prepare so thoroughly that confidence comes naturally', 'Power pose for 2 minutes before the interview (Amy Cuddy research)', 'Reframe: they\'re hoping you\'re the right person — it\'s a two-way conversation', 'Breathe: 4 counts in, hold 4, out 4 — activates calm nervous system'],
    }

    const dayPlan = days >= 7
      ? [
        { week: `Days 1–${Math.ceil(days * 0.3)}`, focus: 'Company research', tasks: 'Website, LinkedIn, news, Glassdoor, products, competitors', notes: 'Find 3 things that genuinely excite you about them' },
        { week: `Days ${Math.ceil(days * 0.3) + 1}–${Math.ceil(days * 0.6)}`, focus: 'Story preparation', tasks: 'Write 10 STAR stories · practice answering common questions out loud', notes: 'Record yourself — you\'ll spot habits you didn\'t know you had' },
        { week: `Days ${Math.ceil(days * 0.6) + 1}–${days - 1}`, focus: 'Mock interviews', tasks: 'Practice with a friend or alone in mirror · refine answers', notes: 'Focus on delivery, not just content' },
        { week: `Day ${days} — Interview Day`, focus: 'Execute the plan', tasks: 'Light review · power pose · arrive early · be present', notes: 'Trust your preparation — you\'re ready' },
      ]
      : [
        { week: 'Today (Day 1)', focus: 'Company deep-dive', tasks: 'Read everything: website, news, Glassdoor reviews, LinkedIn', notes: 'Dedicate 2 full hours minimum' },
        { week: `Days 2–${Math.ceil(days * 0.6)}`, focus: 'Story prep + practice', tasks: 'Write STAR stories · practice out loud · mock interview', notes: 'Quality over quantity — 10 solid stories' },
        { week: `Days ${Math.ceil(days * 0.6) + 1}–${days}`, focus: 'Refinement + day-of', tasks: 'Final practice · prepare questions to ask · logistics confirmed', notes: 'Prepare outfit, route, and arrival time' },
      ]

    const starQuestions = [
      'Tell me about yourself',
      'Why do you want this role / why this company?',
      'What\'s your greatest achievement?',
      'Describe a time you dealt with a difficult stakeholder',
      'Tell me about a time you failed — what did you learn?',
      'How do you prioritise when everything is urgent?',
      'Describe a time you led without authority',
      'What\'s your biggest weakness?',
      'Where do you see yourself in 3–5 years?',
      'Do you have any questions for us?',
    ]

    return {
      headline: `Interview prep for: ${role} — ${days} days to go`,
      subheadline: `${rounds} round${rounds > 1 ? 's' : ''} · ${interviewType} style · ${interviewType === 'competency' ? 'STAR format focus' : interviewType === 'technical' ? 'Technical practice focus' : 'Leadership and strategy focus'}`,
      stats: [
        { label: 'Role', value: role.slice(0, 25) + (role.length > 25 ? '…' : '') },
        { label: 'Days to Prepare', value: `${days}` },
        { label: 'Interview Rounds', value: `${rounds}` },
        { label: 'Interview Type', value: interviewType.charAt(0).toUpperCase() + interviewType.slice(1) },
        { label: 'STAR Stories Needed', value: '10' },
        { label: 'Key Fear', value: biggestFear.charAt(0).toUpperCase() + biggestFear.slice(1) },
      ],
      milestones: [
        { label: 'Company research complete', date: `Day ${Math.ceil(days * 0.3)}` },
        { label: '10 STAR stories prepared', date: `Day ${Math.ceil(days * 0.6)}` },
        { label: '2 mock interviews completed', date: `Day ${days - 1}` },
        { label: 'INTERVIEW DAY — execute!', date: `Day ${days}` },
      ],
      weeklySchedule: dayPlan,
      dailySchedule: [
        { time: '−2 days', label: 'Final mock interview with a friend', type: 'work' as const },
        { time: 'Night before', label: 'Light review of 3 best STAR stories · prepare outfit · set alarm', type: 'review' as const },
        { time: 'Morning of', label: 'Good breakfast · no cramming · arrive 15 min early', type: 'rest' as const },
        { time: '5 min before', label: 'Power pose · breathe · remind yourself you\'re prepared', type: 'rest' as const },
        { time: 'During interview', label: 'Pause before answering · use STAR structure · ask good questions', type: 'work' as const },
        { time: 'After interview', label: 'Send thank-you email within 24 hours · note key learnings', type: 'review' as const },
      ],
      checklists: [
        {
          title: 'Interview Preparation Checklist',
          items: [
            `Research ${role.split(' at ')[1] || 'the company'}: website, recent news, products, values`,
            'Read the job description 3 times — highlight key requirements',
            'Prepare 10 STAR stories (one per question below)',
            ...starQuestions.slice(0, 5).map(q => `Prepare answer: "${q}"`),
            'Prepare 5 intelligent questions to ask them',
            'Do at least 1 mock interview out loud',
            'Confirm interview format, duration, and interviewers',
            'Prepare route and arrival time — aim for 10 min early',
            'Send thank-you email within 24 hours of interview',
          ],
        },
        {
          title: `Beat Your Fear: ${biggestFear}`,
          items: fearFixes[biggestFear] || fearFixes.blanking,
        },
        {
          title: '10 Questions to Prepare STAR Stories For',
          items: starQuestions,
        },
      ],
      recommendations: [
        fearFixes[biggestFear][0],
        'STAR format is the gold standard: Situation → Task → Action → Result. Practice until it\'s automatic.',
        `With ${days} days to prepare, you have ${days >= 7 ? 'more than enough time for thorough preparation' : 'limited time — focus on STAR stories and company research, in that order'}.`,
        'The questions you ask at the end matter as much as your answers. "What does success look like in this role in 90 days?" is excellent.',
        'Send a thank-you email within 24 hours. It\'s rare and memorable. Reference something specific from the conversation.',
      ],
      nextActions: [
        `Spend 60 minutes researching ${role.split(' at ')[1] || 'the company'} today`,
        'Write your first 3 STAR stories tonight',
        'Schedule a mock interview with a friend this week',
        'Prepare 5 questions to ask the interviewer',
      ],
    }
  },
}

export default interviewPreparationPlanner
