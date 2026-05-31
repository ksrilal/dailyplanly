import type { Template } from '@/features/templates/types'

export const projectPlanningPlannerTemplate: Template = {
  id: 'tpl-029',
  slug: 'project-planning-planner',
  title: 'Project Planning Planner',
  description: 'Deliver projects on time, every time. Map your full project roadmap, track tasks with owners and deadlines, manage blockers, and maintain team momentum with weekly check-ins.',
  category: 'work-office',
  type: 'planner',
  featured: true,
  tags: ['project management', 'work', 'tasks', 'deadlines', 'team'],
  previewImage: '/templates/previews/project-planning-planner.png',
  plannerDefaults: {
    theme: 'elegant-dark',
    orientation: 'landscape',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Project Goal', order: 0, width: 'half',
        content: {
          goal: 'Launch the redesigned company website by Q3 deadline',
          milestones: [
            { label: 'Discovery & requirements sign-off', done: true },
            { label: 'Design mockups approved by stakeholders', done: false },
            { label: 'Development sprint 1 complete (homepage)', done: false },
            { label: 'Development sprint 2 complete (all pages)', done: false },
            { label: 'UAT testing passed', done: false },
            { label: 'Go-live and post-launch monitoring', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Completion', order: 1, width: 'half',
        content: { title: 'Project Completion', value: '18', unit: '%', note: 'Based on milestones hit' }
      },
      {
        id: 'b3', type: 'timeline', label: 'Project Roadmap', order: 2, width: 'full',
        content: {
          events: [
            { label: 'Kickoff meeting & requirements gathering', date: 'Week 1' },
            { label: 'Design concept presentations', date: 'Week 2' },
            { label: 'Design mockups — stakeholder review', date: 'Week 3' },
            { label: 'Development Sprint 1 starts', date: 'Week 4' },
            { label: 'Sprint 1 review — homepage live on staging', date: 'Week 6' },
            { label: 'Development Sprint 2 — all pages', date: 'Week 7' },
            { label: 'Content migration and SEO setup', date: 'Week 9' },
            { label: 'UAT testing period', date: 'Week 10' },
            { label: 'Bug fixes and performance optimisation', date: 'Week 11' },
            { label: 'Go-live!', date: 'Week 12' },
          ]
        }
      },
      {
        id: 'b4', type: 'table', label: 'Task List', order: 3, width: 'full',
        content: {
          headers: ['Task', 'Owner', 'Due Date', 'Status', 'Priority', 'Notes'],
          rows: [
            ['Finalise brand guidelines doc', 'Sarah (Design)', 'Week 2', 'In Progress', 'High', ''],
            ['Wireframes for all 8 pages', 'Sarah (Design)', 'Week 2', 'In Progress', 'High', ''],
            ['Homepage development', 'Dev team', 'Week 6', 'Not Started', 'High', ''],
            ['About + Team page', 'Dev team', 'Week 7', 'Not Started', 'Medium', ''],
            ['Blog & news section', 'Dev team', 'Week 8', 'Not Started', 'Medium', ''],
            ['Contact form & integrations', 'Dev team', 'Week 8', 'Not Started', 'Medium', ''],
            ['SEO meta tags all pages', 'Marketing', 'Week 9', 'Not Started', 'High', ''],
            ['Content migration', 'Content team', 'Week 9', 'Not Started', 'High', ''],
            ['Performance testing & speed', 'Dev team', 'Week 11', 'Not Started', 'Medium', ''],
            ['Stakeholder sign-off', 'PM', 'Week 11', 'Not Started', 'High', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'focus', label: 'Current Blockers & Risks', order: 4, width: 'half',
        content: {
          items: [
            { label: 'Brand guidelines doc overdue — chase Sarah', priority: 'high' },
            { label: 'Dev resource shortage — escalate to management', priority: 'high' },
            { label: 'Content not ready — brief content team today', priority: 'medium' },
            { label: 'Client unavailable Week 3 — reschedule review', priority: 'medium' },
            { label: 'Hosting migration plan not confirmed', priority: 'low' },
          ]
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Project Notes', order: 5, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
