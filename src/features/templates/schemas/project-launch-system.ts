import type { Template } from '@/features/templates/types'

export const projectLaunchSystemTemplate: Template = {
  id: 'tpl-058',
  slug: 'project-launch-system',
  title: 'Project Launch System',
  description: 'Launch any project successfully — product, campaign, service, or initiative. Covers discovery, planning, build, testing, go-to-market, and post-launch review in one system.',
  category: 'work-office',
  type: 'checklist',
  featured: false,
  tags: ['project launch', 'go-to-market', 'product', 'work', 'management'],
  previewImage: '/templates/previews/project-launch-system.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-pls-1', text: 'Discovery & Scoping', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-pls-2', text: 'Define the project goal and success metrics', checked: false, order: 0, parentId: 'ci-pls-1', collapsed: false, depth: 1 },
      { id: 'ci-pls-3', text: 'Identify target audience and stakeholders', checked: false, order: 1, parentId: 'ci-pls-1', collapsed: false, depth: 1 },
      { id: 'ci-pls-4', text: 'Research competitors and existing solutions', checked: false, order: 2, parentId: 'ci-pls-1', collapsed: false, depth: 1 },
      { id: 'ci-pls-5', text: 'Define project scope — what is in and out', checked: false, order: 3, parentId: 'ci-pls-1', collapsed: false, depth: 1 },
      { id: 'ci-pls-6', text: 'Get stakeholder sign-off on scope', checked: false, order: 4, parentId: 'ci-pls-1', collapsed: false, depth: 1 },

      { id: 'ci-pls-7', text: 'Planning', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-pls-8', text: 'Create project timeline with milestones', checked: false, order: 0, parentId: 'ci-pls-7', collapsed: false, depth: 1 },
      { id: 'ci-pls-9', text: 'Assign roles and responsibilities to team members', checked: false, order: 1, parentId: 'ci-pls-7', collapsed: false, depth: 1 },
      { id: 'ci-pls-10', text: 'Set weekly team check-in cadence', checked: false, order: 2, parentId: 'ci-pls-7', collapsed: false, depth: 1 },
      { id: 'ci-pls-11', text: 'Identify risks and mitigation plans', checked: false, order: 3, parentId: 'ci-pls-7', collapsed: false, depth: 1 },

      { id: 'ci-pls-12', text: 'Build Phase', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-pls-13', text: 'Sprint 1: Core features / MVP deliverables', checked: false, order: 0, parentId: 'ci-pls-12', collapsed: false, depth: 1 },
      { id: 'ci-pls-14', text: 'Define Sprint 1 deliverables', checked: false, order: 0, parentId: 'ci-pls-13', collapsed: false, depth: 2 },
      { id: 'ci-pls-15', text: 'Daily standup during build phase', checked: false, order: 1, parentId: 'ci-pls-13', collapsed: false, depth: 2 },
      { id: 'ci-pls-16', text: 'Sprint 1 review and stakeholder demo', checked: false, order: 2, parentId: 'ci-pls-13', collapsed: false, depth: 2 },
      { id: 'ci-pls-17', text: 'Sprint 2: Iteration and polish', checked: false, order: 1, parentId: 'ci-pls-12', collapsed: false, depth: 1 },
      { id: 'ci-pls-18', text: 'Incorporate feedback from Sprint 1 review', checked: false, order: 0, parentId: 'ci-pls-17', collapsed: false, depth: 2 },
      { id: 'ci-pls-19', text: 'Complete remaining features', checked: false, order: 1, parentId: 'ci-pls-17', collapsed: false, depth: 2 },

      { id: 'ci-pls-20', text: 'Testing & QA', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-pls-21', text: 'Internal QA testing — log all bugs', checked: false, order: 0, parentId: 'ci-pls-20', collapsed: false, depth: 1 },
      { id: 'ci-pls-22', text: 'Fix all critical and high-priority bugs', checked: false, order: 1, parentId: 'ci-pls-20', collapsed: false, depth: 1 },
      { id: 'ci-pls-23', text: 'User acceptance testing (UAT) with real users', checked: false, order: 2, parentId: 'ci-pls-20', collapsed: false, depth: 1 },
      { id: 'ci-pls-24', text: 'Get final stakeholder sign-off for launch', checked: false, order: 3, parentId: 'ci-pls-20', collapsed: false, depth: 1 },

      { id: 'ci-pls-25', text: 'Launch', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-pls-26', text: 'Pre-Launch', checked: false, order: 0, parentId: 'ci-pls-25', collapsed: false, depth: 1 },
      { id: 'ci-pls-27', text: 'Prepare launch announcement and marketing materials', checked: false, order: 0, parentId: 'ci-pls-26', collapsed: false, depth: 2 },
      { id: 'ci-pls-28', text: 'Brief support team on FAQs and escalation path', checked: false, order: 1, parentId: 'ci-pls-26', collapsed: false, depth: 2 },
      { id: 'ci-pls-29', text: 'Execute launch — go live!', checked: false, order: 1, parentId: 'ci-pls-25', collapsed: false, depth: 1 },
      { id: 'ci-pls-30', text: 'Monitor for 48 hours post-launch — fix any critical issues', checked: false, order: 2, parentId: 'ci-pls-25', collapsed: false, depth: 1 },
      { id: 'ci-pls-31', text: 'Post-launch retrospective with full team', checked: false, order: 3, parentId: 'ci-pls-25', collapsed: false, depth: 1 },
    ]
  }
}
