import type { Template } from '@/features/templates/types'

export const businessStartupSystemTemplate: Template = {
  id: 'tpl-059',
  slug: 'business-startup-system',
  title: 'Business Startup System',
  description: 'Launch your business the right way. From idea validation to first paying customer — covering legal setup, branding, product, marketing, finance, and operations in a structured system.',
  category: 'work-office',
  type: 'checklist',
  featured: true,
  tags: ['business', 'startup', 'entrepreneurship', 'launch', 'self-employed'],
  previewImage: '/templates/previews/business-startup-system.png',
  checklistDefaults: {
    mode: 'advanced',
    items: [
      { id: 'ci-bss-1', text: 'Idea Validation', checked: false, order: 0, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-bss-2', text: 'Define the problem your business solves', checked: false, order: 0, parentId: 'ci-bss-1', collapsed: false, depth: 1 },
      { id: 'ci-bss-3', text: 'Identify target customer profile (age, job, pain points)', checked: false, order: 1, parentId: 'ci-bss-1', collapsed: false, depth: 1 },
      { id: 'ci-bss-4', text: 'Customer Research', checked: false, order: 2, parentId: 'ci-bss-1', collapsed: false, depth: 1 },
      { id: 'ci-bss-5', text: 'Interview 10 potential customers about the problem', checked: false, order: 0, parentId: 'ci-bss-4', collapsed: false, depth: 2 },
      { id: 'ci-bss-6', text: 'Validate willingness to pay before building', checked: false, order: 1, parentId: 'ci-bss-4', collapsed: false, depth: 2 },
      { id: 'ci-bss-7', text: 'Analyse 3 direct competitors', checked: false, order: 2, parentId: 'ci-bss-4', collapsed: false, depth: 2 },
      { id: 'ci-bss-8', text: 'Write your unique value proposition (one sentence)', checked: false, order: 3, parentId: 'ci-bss-1', collapsed: false, depth: 1 },

      { id: 'ci-bss-9', text: 'Legal & Admin Setup', checked: false, order: 1, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-bss-10', text: 'Choose business structure (sole trader, Ltd, LLP)', checked: false, order: 0, parentId: 'ci-bss-9', collapsed: false, depth: 1 },
      { id: 'ci-bss-11', text: 'Register business with Companies House (if Ltd)', checked: false, order: 1, parentId: 'ci-bss-9', collapsed: false, depth: 1 },
      { id: 'ci-bss-12', text: 'Register for Self Assessment / VAT with HMRC', checked: false, order: 2, parentId: 'ci-bss-9', collapsed: false, depth: 1 },
      { id: 'ci-bss-13', text: 'Open a dedicated business bank account', checked: false, order: 3, parentId: 'ci-bss-9', collapsed: false, depth: 1 },
      { id: 'ci-bss-14', text: 'Get relevant business insurance', checked: false, order: 4, parentId: 'ci-bss-9', collapsed: false, depth: 1 },
      { id: 'ci-bss-15', text: 'Register trademark if name is critical to business', checked: false, order: 5, parentId: 'ci-bss-9', collapsed: false, depth: 1 },

      { id: 'ci-bss-16', text: 'Branding & Online Presence', checked: false, order: 2, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-bss-17', text: 'Choose and register business name and domain', checked: false, order: 0, parentId: 'ci-bss-16', collapsed: false, depth: 1 },
      { id: 'ci-bss-18', text: 'Design logo and brand colours (use Canva or hire designer)', checked: false, order: 1, parentId: 'ci-bss-16', collapsed: false, depth: 1 },
      { id: 'ci-bss-19', text: 'Website', checked: false, order: 2, parentId: 'ci-bss-16', collapsed: false, depth: 1 },
      { id: 'ci-bss-20', text: 'Build or commission website with clear value proposition', checked: false, order: 0, parentId: 'ci-bss-19', collapsed: false, depth: 2 },
      { id: 'ci-bss-21', text: 'Add contact form, pricing page, and about page', checked: false, order: 1, parentId: 'ci-bss-19', collapsed: false, depth: 2 },
      { id: 'ci-bss-22', text: 'Set up Google Analytics and Search Console', checked: false, order: 2, parentId: 'ci-bss-19', collapsed: false, depth: 2 },
      { id: 'ci-bss-23', text: 'Set up LinkedIn, Instagram, or relevant social accounts', checked: false, order: 3, parentId: 'ci-bss-16', collapsed: false, depth: 1 },

      { id: 'ci-bss-24', text: 'Product or Service Build', checked: false, order: 3, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-bss-25', text: 'Define MVP — minimum features to sell to first customer', checked: false, order: 0, parentId: 'ci-bss-24', collapsed: false, depth: 1 },
      { id: 'ci-bss-26', text: 'Build or develop MVP', checked: false, order: 1, parentId: 'ci-bss-24', collapsed: false, depth: 1 },
      { id: 'ci-bss-27', text: 'Test MVP with 5 beta customers', checked: false, order: 2, parentId: 'ci-bss-24', collapsed: false, depth: 1 },
      { id: 'ci-bss-28', text: 'Collect feedback and iterate before wider launch', checked: false, order: 3, parentId: 'ci-bss-24', collapsed: false, depth: 1 },
      { id: 'ci-bss-29', text: 'Set pricing — cost-plus or value-based', checked: false, order: 4, parentId: 'ci-bss-24', collapsed: false, depth: 1 },

      { id: 'ci-bss-30', text: 'First Customers', checked: false, order: 4, parentId: null, collapsed: false, depth: 0 },
      { id: 'ci-bss-31', text: 'Create outreach list of 50 potential customers', checked: false, order: 0, parentId: 'ci-bss-30', collapsed: false, depth: 1 },
      { id: 'ci-bss-32', text: 'Send personalised outreach messages (email or LinkedIn)', checked: false, order: 1, parentId: 'ci-bss-30', collapsed: false, depth: 1 },
      { id: 'ci-bss-33', text: 'Book 5 sales calls or demos', checked: false, order: 2, parentId: 'ci-bss-30', collapsed: false, depth: 1 },
      { id: 'ci-bss-34', text: 'Close first paying customer — celebrate!', checked: false, order: 3, parentId: 'ci-bss-30', collapsed: false, depth: 1 },
      { id: 'ci-bss-35', text: 'Request case study or testimonial from first customer', checked: false, order: 4, parentId: 'ci-bss-30', collapsed: false, depth: 1 },
    ]
  }
}
