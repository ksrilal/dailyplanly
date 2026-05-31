import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from '../finance/_currency'

const projectScopeBuilder: Tool = {
  id: 'project-scope-builder',
  slug: 'project-scope-builder',
  title: 'Project Scope Builder',
  description: 'Define any project\'s scope, timeline, and deliverables. Get a structured project plan with phases, task breakdown, risk register, and team checklist.',
  category: 'business',
  icon: 'Layers',
  tags: ['project management', 'scope', 'planning', 'deliverables', 'timeline'],
  relatedTemplateSlug: 'project-planning-planner',
  relatedTemplateCategory: 'work-office',
  inputs: [
    CURRENCY_INPUT,
    { id: 'projectName', type: 'text', label: 'Project Name', placeholder: 'e.g. Website Redesign', required: true, defaultValue: 'My Project' },
    { id: 'budget', type: 'number', label: 'Project Budget', placeholder: '50000', min: 0, step: 1000, required: false, defaultValue: 50000 },
    { id: 'weeks', type: 'number', label: 'Project Duration', placeholder: '12', unit: 'weeks', min: 1, max: 104, step: 1, required: true, defaultValue: 12 },
    { id: 'teamSize', type: 'number', label: 'Team Size', placeholder: '5', unit: 'people', min: 1, max: 100, step: 1, required: false, defaultValue: 5 },
    { id: 'complexity', type: 'select', label: 'Project Complexity', required: true, defaultValue: 'medium',
      options: [
        { label: 'Simple — clear requirements, small team', value: 'simple' },
        { label: 'Medium — some unknowns, moderate team', value: 'medium' },
        { label: 'Complex — many stakeholders, high uncertainty', value: 'complex' },
      ] },
    { id: 'methodology', type: 'select', label: 'Project Methodology', required: false, defaultValue: 'agile',
      options: [
        { label: 'Agile / Scrum (2-week sprints)', value: 'agile' },
        { label: 'Waterfall (sequential phases)', value: 'waterfall' },
        { label: 'Hybrid (structured but flexible)', value: 'hybrid' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const projectName = String(inputs.projectName || 'My Project')
    const budget = Number(inputs.budget) || 0
    const weeks = Number(inputs.weeks) || 12
    const teamSize = Number(inputs.teamSize) || 5
    const complexity = String(inputs.complexity || 'medium')
    const methodology = String(inputs.methodology || 'agile')

    const contingency = complexity === 'simple' ? 0.1 : complexity === 'medium' ? 0.15 : 0.25
    const contingencyBudget = Math.round(budget * contingency)
    const coreBudget = budget - contingencyBudget

    const phase1End = Math.ceil(weeks * 0.15)
    const phase2End = Math.ceil(weeks * 0.55)
    const phase3End = Math.ceil(weeks * 0.8)

    const endDate = new Date()
    endDate.setDate(endDate.getDate() + weeks * 7)

    const weeklySchedule = methodology === 'agile'
      ? [
        { week: `Sprint 0 (Week 1)`, focus: 'Discovery & setup', tasks: 'Requirements, team setup, backlog creation, architecture decisions', notes: 'Don\'t skip this — it prevents rework' },
        { week: `Sprint 1–${Math.ceil(weeks / 2)} (Weeks 2–${Math.ceil(weeks / 2)})`, focus: 'Core build', tasks: '2-week sprints · daily standups · sprint reviews · backlog grooming', notes: 'Velocity improves by sprint 3' },
        { week: `Sprint ${Math.ceil(weeks / 2) + 1}+ (Weeks ${Math.ceil(weeks / 2) + 1}–${weeks - 1})`, focus: 'Polish & testing', tasks: 'Bug fixes · UAT · performance · documentation', notes: 'No new features — stabilise only' },
        { week: `Week ${weeks}`, focus: 'Launch & handover', tasks: 'Go-live · monitoring · stakeholder sign-off · retrospective', notes: 'Prepare rollback plan' },
      ]
      : [
        { week: `Weeks 1–${phase1End}`, focus: 'Initiation & Planning', tasks: 'Requirements sign-off · detailed plan · team roles · risk register', notes: 'Don\'t start build without signed requirements' },
        { week: `Weeks ${phase1End + 1}–${phase2End}`, focus: 'Design & Build', tasks: 'Core deliverables · weekly status reports · stakeholder reviews', notes: 'Flag scope changes immediately' },
        { week: `Weeks ${phase2End + 1}–${phase3End}`, focus: 'Testing & QA', tasks: 'UAT · bug fixes · documentation · training', notes: 'Testing takes longer than expected — buffer here' },
        { week: `Weeks ${phase3End + 1}–${weeks}`, focus: 'Launch & Handover', tasks: 'Deployment · monitoring · handover docs · project close', notes: 'Run parallel for 2 weeks if possible' },
      ]

    const riskRegister = {
      simple: ['Scope creep — changes after sign-off', 'Key person unavailability', 'Technology delays'],
      medium: ['Scope creep', 'Integration challenges', 'Stakeholder alignment delays', 'Resource constraints', 'Third-party dependency delays'],
      complex: ['Requirement changes mid-project', 'Integration failures', 'Stakeholder conflict', 'Budget overrun', 'Technical debt accumulation', 'Key personnel loss', 'Regulatory or compliance issues'],
    }

    return {
      headline: `${projectName} — ${weeks}-week project · ${teamSize} people${budget > 0 ? ` · ${S}${budget.toLocaleString()} budget` : ''}`,
      subheadline: `${methodology.charAt(0).toUpperCase() + methodology.slice(1)} methodology · ${complexity} complexity · Deadline: ${endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      stats: [
        { label: 'Project Duration', value: `${weeks} weeks` },
        { label: 'Team Size', value: `${teamSize} people` },
        { label: 'Core Budget', value: budget > 0 ? `${S}${coreBudget.toLocaleString()}` : 'Not set' },
        { label: 'Contingency', value: budget > 0 ? `${S}${contingencyBudget.toLocaleString()} (${Math.round(contingency * 100)}%)` : `${Math.round(contingency * 100)}% recommended` },
        { label: 'Methodology', value: methodology.charAt(0).toUpperCase() + methodology.slice(1) },
        { label: 'Deadline', value: endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      milestones: [
        { label: 'Requirements signed off', date: `Week ${phase1End}` },
        { label: 'First working prototype / MVP', date: `Week ${phase2End}` },
        { label: 'UAT complete — ready to launch', date: `Week ${phase3End}` },
        { label: `${projectName} launched!`, date: endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Project Kickoff Checklist',
          items: [
            'Define project scope in writing — what is IN and OUT',
            'Get stakeholder sign-off on requirements',
            'Assign roles and responsibilities to each team member',
            'Set up project management tool (Jira, Notion, Asana)',
            'Create communication plan — who needs what, when',
            'Establish weekly status report cadence',
            'Define "done" — what does project success look like?',
            'Set up change control process — all scope changes go through this',
            `Reserve ${Math.round(contingency * 100)}% budget contingency`,
            'Schedule project retrospective at close',
          ],
        },
        {
          title: 'Risk Register',
          items: (riskRegister[complexity as keyof typeof riskRegister] || riskRegister.medium).map(r => `⚠️ ${r} — identify mitigation strategy`),
        },
      ],
      recommendations: [
        `${complexity} complexity means your contingency should be ${Math.round(contingency * 100)}% — ${budget > 0 ? `${S}${contingencyBudget.toLocaleString()}` : 'plan accordingly'}.`,
        'Scope creep is the #1 project killer. Every change request must go through a formal change control process.',
        methodology === 'agile' ? 'With Agile, stakeholder involvement every sprint prevents the "that\'s not what I wanted" problem at launch.' : 'With Waterfall, never start the next phase without written sign-off on the previous one.',
        `Weekly status reports keep stakeholders informed and prevent surprises. Surprises kill projects.`,
      ],
      nextActions: [
        'Write the project scope document — what\'s in, what\'s out',
        'Get stakeholder sign-off before any work starts',
        'Set up your project management tool and create the first sprint or phase',
        'Schedule all key milestone dates in the team calendar',
      ],
    }
  },
}

export default projectScopeBuilder
