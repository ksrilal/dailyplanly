import type { Template } from '@/features/templates/types'

export const studyProjectSystemTemplate: Template = {
  id: 'tpl-050',
  slug: 'study-project-system',
  title: 'Study Project System',
  description: 'Manage a major academic project from initial brief to final submission. Covers research, outlining, writing phases, feedback integration, referencing, and submission workflow.',
  category: 'education',
  type: 'checklist',
  featured: false,
  tags: ['study', 'research', 'project', 'dissertation', 'academic'],
  previewImage: '/templates/previews/study-project-system.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-sps-1', text: 'Project Initiation', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sps-2', text: 'Read the brief carefully — note all requirements', checked: false, order: 0, parentId: 'ci-sps-1', collapsed: false, depth: 1 },
      { id: 'ci-sps-3', text: 'Clarify assessment criteria with tutor', checked: false, order: 1, parentId: 'ci-sps-1', collapsed: false, depth: 1 },
      { id: 'ci-sps-4', text: 'Set submission deadline and build reverse timeline', checked: false, order: 2, parentId: 'ci-sps-1', collapsed: false, depth: 1 },
      { id: 'ci-sps-5', text: 'Choose topic and confirm with supervisor', checked: false, order: 3, parentId: 'ci-sps-1', collapsed: false, depth: 1 },

      { id: 'ci-sps-6', text: 'Research Phase', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sps-7', text: 'Literature Search', checked: false, order: 0, parentId: 'ci-sps-6', collapsed: false, depth: 1 },
      { id: 'ci-sps-8', text: 'Search academic databases (JSTOR, Google Scholar, Scopus)', checked: false, order: 0, parentId: 'ci-sps-7', collapsed: false, depth: 2 },
      { id: 'ci-sps-9', text: 'Find minimum 15 credible academic sources', checked: false, order: 1, parentId: 'ci-sps-7', collapsed: false, depth: 2 },
      { id: 'ci-sps-10', text: 'Prioritise peer-reviewed journals over websites', checked: false, order: 2, parentId: 'ci-sps-7', collapsed: false, depth: 2 },
      { id: 'ci-sps-11', text: 'Source Organisation', checked: false, order: 1, parentId: 'ci-sps-6', collapsed: false, depth: 1 },
      { id: 'ci-sps-12', text: 'Save all sources in reference manager (Zotero/Mendeley)', checked: false, order: 0, parentId: 'ci-sps-11', collapsed: false, depth: 2 },
      { id: 'ci-sps-13', text: 'Read and annotate each source', checked: false, order: 1, parentId: 'ci-sps-11', collapsed: false, depth: 2 },
      { id: 'ci-sps-14', text: 'Note key quotes and page numbers', checked: false, order: 2, parentId: 'ci-sps-11', collapsed: false, depth: 2 },

      { id: 'ci-sps-15', text: 'Planning & Structure', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sps-16', text: 'Create a detailed outline with section headings', checked: false, order: 0, parentId: 'ci-sps-15', collapsed: false, depth: 1 },
      { id: 'ci-sps-17', text: 'Map sources to sections', checked: false, order: 1, parentId: 'ci-sps-15', collapsed: false, depth: 1 },
      { id: 'ci-sps-18', text: 'Write thesis statement or central argument', checked: false, order: 2, parentId: 'ci-sps-15', collapsed: false, depth: 1 },

      { id: 'ci-sps-19', text: 'Writing Phase', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sps-20', text: 'First Draft', checked: false, order: 0, parentId: 'ci-sps-19', collapsed: false, depth: 1 },
      { id: 'ci-sps-21', text: 'Write introduction — context, gap, thesis', checked: false, order: 0, parentId: 'ci-sps-20', collapsed: false, depth: 2 },
      { id: 'ci-sps-22', text: 'Write each body section with evidence and analysis', checked: false, order: 1, parentId: 'ci-sps-20', collapsed: false, depth: 2 },
      { id: 'ci-sps-23', text: 'Write conclusion — summarise, so-what, future research', checked: false, order: 2, parentId: 'ci-sps-20', collapsed: false, depth: 2 },
      { id: 'ci-sps-24', text: 'Revision Phase', checked: false, order: 1, parentId: 'ci-sps-19', collapsed: false, depth: 1 },
      { id: 'ci-sps-25', text: 'Print and read draft aloud for flow and clarity', checked: false, order: 0, parentId: 'ci-sps-24', collapsed: false, depth: 2 },
      { id: 'ci-sps-26', text: 'Check argument logic and transitions between sections', checked: false, order: 1, parentId: 'ci-sps-24', collapsed: false, depth: 2 },
      { id: 'ci-sps-27', text: 'Verify all citations are correctly formatted', checked: false, order: 2, parentId: 'ci-sps-24', collapsed: false, depth: 2 },
      { id: 'ci-sps-28', text: 'Submit draft to supervisor for feedback', checked: false, order: 2, parentId: 'ci-sps-19', collapsed: false, depth: 1 },

      { id: 'ci-sps-29', text: 'Final Submission', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-sps-30', text: 'Incorporate supervisor feedback', checked: false, order: 0, parentId: 'ci-sps-29', collapsed: false, depth: 1 },
      { id: 'ci-sps-31', text: 'Final proofread — grammar, spelling, formatting', checked: false, order: 1, parentId: 'ci-sps-29', collapsed: false, depth: 1 },
      { id: 'ci-sps-32', text: 'Run plagiarism checker', checked: false, order: 2, parentId: 'ci-sps-29', collapsed: false, depth: 1 },
      { id: 'ci-sps-33', text: 'Submit and save confirmation receipt', checked: false, order: 3, parentId: 'ci-sps-29', collapsed: false, depth: 1 },
    ]
  }
}
