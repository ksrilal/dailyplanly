import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from '../finance/_currency'

const jobSearchTracker: Tool = {
  id: 'job-search-tracker',
  slug: 'job-search-tracker',
  title: 'Job Search Action Planner',
  description: 'Set your job search target, timeline, and current situation. Get a structured weekly action plan, application tracker setup, interview preparation checklist, and networking roadmap.',
  category: 'career',
  icon: 'Search',
  tags: ['job search', 'career', 'interview', 'cv', 'networking', 'employment'],
  relatedTemplateSlug: 'job-search-system',
  relatedTemplateCategory: 'work-office',
  inputs: [
    CURRENCY_INPUT,
    { id: 'targetRole', type: 'text', label: 'Target Role / Job Title', placeholder: 'e.g. Senior Product Manager', required: true, defaultValue: 'My Target Role' },
    { id: 'currentSituation', type: 'select', label: 'Current Situation', required: true, defaultValue: 'employed',
      options: [
        { label: 'Employed — looking to move', value: 'employed' },
        { label: 'Unemployed — actively searching', value: 'unemployed' },
        { label: 'Graduate — first role', value: 'graduate' },
        { label: 'Career change', value: 'change' },
      ] },
    { id: 'targetSalary', type: 'number', label: 'Target Salary', placeholder: '55000', min: 0, step: 1000, required: false, defaultValue: 50000 },
    { id: 'weeksTimeline', type: 'number', label: 'Target to Start New Role Within', placeholder: '12', unit: 'weeks', min: 2, max: 52, step: 1, required: true, defaultValue: 12 },
    { id: 'applicationsPerWeek', type: 'number', label: 'Applications You Can Send Per Week', placeholder: '5', unit: 'apps', min: 1, max: 30, step: 1, required: true, defaultValue: 5 },
    { id: 'biggestChallenge', type: 'select', label: 'Biggest Challenge Right Now', required: false, defaultValue: 'interviews',
      options: [
        { label: 'Getting interview callbacks', value: 'callbacks' },
        { label: 'Performing well in interviews', value: 'interviews' },
        { label: 'Knowing where to look', value: 'finding' },
        { label: 'Salary negotiation', value: 'salary' },
        { label: 'Standing out in a competitive market', value: 'standout' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const role = String(inputs.targetRole || 'Target Role')
    const situation = String(inputs.currentSituation || 'employed')
    const salary = Number(inputs.targetSalary) || 50000
    const weeks = Number(inputs.weeksTimeline) || 12
    const appsPerWeek = Number(inputs.applicationsPerWeek) || 5
    const challenge = String(inputs.biggestChallenge || 'interviews')

    const totalApps = appsPerWeek * weeks
    const estimatedCallbacks = Math.ceil(totalApps * 0.15)
    const estimatedInterviews = Math.ceil(estimatedCallbacks * 0.6)
    const estimatedOffers = Math.ceil(estimatedInterviews * 0.25)

    const situationContext: Record<string, string> = {
      employed: 'Apply discreetly. Use LinkedIn\'s "Open to Work" (visible to recruiters only). Keep job search confidential at current workplace.',
      unemployed: 'Treat job search as a full-time job. 4–6 hours daily on applications, networking, and skill building.',
      graduate: 'Prioritise internships and graduate schemes. Graduate recruiters look for potential over experience.',
      change: 'Highlight transferable skills. Network with people in the target industry before applying.',
    }

    const challengeFixes: Record<string, string[]> = {
      callbacks: [
        'Customise CV for each application — include keywords from the job description',
        'Apply within 24 hours of a job posting — early applicants get 4× more callbacks',
        'Get CV reviewed by someone in the industry',
        'Use LinkedIn Easy Apply for speed, but always customise the opening message',
        'Network into roles — 70% of jobs are filled before they\'re advertised',
      ],
      interviews: [
        'Prepare 10 STAR stories (Situation, Task, Action, Result) from your experience',
        'Research the company: products, recent news, culture, competitors',
        'Practice out loud — record yourself answering common questions',
        'Prepare 5 strong questions to ask at the end of every interview',
        'Do a mock interview with a friend or career coach',
      ],
      finding: [
        'Set up LinkedIn job alerts for your target role + location',
        'Follow 20 companies you want to work for on LinkedIn',
        'Join 3 professional communities or Slack groups in your field',
        'Work with 2–3 specialist recruiters in your industry',
        'Attend 1 industry event per month — in-person or virtual',
      ],
      salary: [
        `Research salary benchmarks: Glassdoor, LinkedIn Salary, Totaljobs`,
        'Never give the first number — ask what the budget is',
        `For ${role} at your level, target ${S}${salary.toFixed(0)} — prepare data to back this up`,
        'Negotiate non-salary benefits: remote days, holiday, pension, development budget',
        'Practice the negotiation conversation aloud before it happens',
      ],
      standout: [
        'Write a compelling LinkedIn summary that shows your unique value',
        'Get 3 strong LinkedIn recommendations from managers or clients',
        'Create a portfolio, case study, or visible work samples',
        'Comment thoughtfully on industry posts to build visibility',
        'Apply to roles where you meet 70%+ of requirements (not 100%)',
      ],
    }

    const weeklySchedule = [
      { week: 'Week 1–2', focus: 'Setup & brand', tasks: 'Update CV, LinkedIn, cover letter template. Create target company list.', notes: situationContext[situation] },
      { week: 'Week 3–4', focus: 'Active applications', tasks: `Send ${appsPerWeek * 2} tailored applications. Connect with ${appsPerWeek} people in target companies.`, notes: 'Track every application in a spreadsheet' },
      { week: 'Week 5–6', focus: 'Networking & follow-up', tasks: 'Follow up on week 3–4 apps. Request 2 informational interviews.', notes: 'Most callbacks come 2–3 weeks after applying' },
      { week: 'Week 7–8', focus: 'Interviews', tasks: 'Interview prep: STAR stories, company research, mock interviews.', notes: 'Treat every interview as practice' },
      { week: `Week 9–${weeks}`, focus: 'Final push + negotiation', tasks: 'Evaluate offers. Negotiate salary. Target start date.', notes: 'Always negotiate — 85% of employers expect it' },
    ]

    const milestones = [
      { label: 'CV and LinkedIn profile updated', date: 'Week 1' },
      { label: `First ${appsPerWeek * 2} applications sent`, date: 'Week 2' },
      { label: 'First recruiter or hiring manager conversation', date: 'Week 3' },
      { label: 'First interview secured', date: 'Week 4–5' },
      { label: 'Offer received', date: `Week ${Math.ceil(weeks * 0.75)}` },
      { label: `Start new role as ${role}`, date: `Week ${weeks}` },
    ]

    return {
      headline: `${totalApps} applications → ~${estimatedOffers} offer${estimatedOffers !== 1 ? 's' : ''} projected over ${weeks} weeks`,
      subheadline: `Estimated: ${estimatedCallbacks} callbacks → ${estimatedInterviews} interviews → ${estimatedOffers} offers · Target: ${role} at ${S}${salary.toLocaleString()}`,
      stats: [
        { label: 'Applications per Week', value: `${appsPerWeek}` },
        { label: 'Total Applications', value: `${totalApps}` },
        { label: 'Expected Callbacks (15%)', value: `~${estimatedCallbacks}` },
        { label: 'Expected Interviews (60%)', value: `~${estimatedInterviews}` },
        { label: 'Expected Offers (25%)', value: `~${estimatedOffers}` },
        { label: 'Target Salary', value: `${S}${salary.toLocaleString()}` },
      ],
      milestones,
      weeklySchedule,
      checklists: [
        {
          title: 'Job Search Launch Checklist',
          items: [
            `Update CV for ${role} — tailor to the industry`,
            'Update LinkedIn: headline, summary, experience, skills',
            'Set up LinkedIn "Open to Work" (recruiters only mode)',
            'Set up job alerts on LinkedIn, Indeed, Glassdoor, and niche job boards',
            'Create a target company list of 20 companies you want to work for',
            'Build application tracking spreadsheet (company, role, date, status)',
            `Research salary benchmarks for ${role}`,
            'Prepare 10 STAR stories from your career history',
            'Write a flexible cover letter template',
            'Reach out to 5 people in your network this week',
          ],
        },
        {
          title: `Beat Your Challenge: ${challenge}`,
          items: challengeFixes[challenge] || challengeFixes.callbacks,
        },
      ],
      recommendations: [
        situationContext[situation],
        `At ${appsPerWeek} applications/week, you'll send ${totalApps} total. Quality beats quantity — a tailored application gets 3× more callbacks.`,
        `The #1 job search hack: networking. 70% of roles are filled through connections. Spend 40% of your time reaching out, not just applying.`,
        `Follow up every application after 1 week if no response. Most candidates don't — it makes you stand out.`,
        `Always negotiate. For a ${S}${salary.toLocaleString()} role, even 5% negotiation = ${S}${Math.round(salary * 0.05).toLocaleString()} extra per year.`,
      ],
      nextActions: [
        'Update your CV and LinkedIn today — even 30 minutes makes a difference',
        `Set up job alerts for "${role}" right now on LinkedIn and Indeed`,
        `Message 3 people in your network this week about your search`,
        'Create your application tracking spreadsheet',
        `Apply to ${appsPerWeek} roles this week — start today`,
      ],
    }
  },
}

export default jobSearchTracker
