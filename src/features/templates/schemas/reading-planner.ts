import type { Template } from '@/features/templates/types'

export const readingPlannerTemplate: Template = {
  id: 'tpl-022',
  slug: 'reading-planner',
  title: 'Reading Planner',
  description: 'Read more, retain more. Set annual reading goals, track every book from start to finish, build a daily reading habit, and capture your best insights for each title.',
  category: 'education',
  type: 'planner',
  featured: false,
  tags: ['reading', 'books', 'learning', 'habit', 'reading list'],
  previewImage: '/templates/previews/reading-planner.png',
  plannerDefaults: {
    theme: 'soft-paper',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Reading Goal', order: 0, width: 'half',
        content: {
          goal: 'Read 24 books this year — 2 per month across mixed genres',
          milestones: [
            { label: 'Finish first 6 books (Q1)', done: false },
            { label: 'Complete 12 books by June', done: false },
            { label: 'Read one non-fiction per month', done: false },
            { label: 'Finish all 24 books by December', done: false },
            { label: 'Write short review for each book', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Books This Year', order: 1, width: 'half',
        content: { title: 'Books Read This Year', value: '7', unit: '/ 24', note: '17 to go — you\'re on track!' }
      },
      {
        id: 'b3', type: 'table', label: 'Reading List', order: 2, width: 'full',
        content: {
          headers: ['Title', 'Author', 'Genre', 'Pages', 'Started', 'Finished', 'Rating (⭐)'],
          rows: [
            ['Atomic Habits', 'James Clear', 'Self-Help', '320', '1 Jan', '7 Jan', '⭐⭐⭐⭐⭐'],
            ['The Psychology of Money', 'Morgan Housel', 'Finance', '256', '8 Jan', '14 Jan', '⭐⭐⭐⭐⭐'],
            ['Sapiens', 'Yuval Noah Harari', 'History', '512', '15 Jan', '2 Feb', '⭐⭐⭐⭐⭐'],
            ['Deep Work', 'Cal Newport', 'Productivity', '296', '3 Feb', '10 Feb', '⭐⭐⭐⭐'],
            ['The Alchemist', 'Paulo Coelho', 'Fiction', '208', '12 Feb', '15 Feb', '⭐⭐⭐⭐'],
            ['Thinking, Fast and Slow', 'Daniel Kahneman', 'Psychology', '499', '16 Feb', '8 Mar', '⭐⭐⭐⭐⭐'],
            ['Range', 'David Epstein', 'Non-Fiction', '352', '10 Mar', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'habit-tracker', label: 'Reading Habits', order: 3, width: 'half',
        content: {
          habits: [
            { label: 'Read 30+ minutes before bed' },
            { label: 'No phone in bed — only books' },
            { label: 'Note one key insight per session' },
            { label: 'Read at lunch away from desk' },
          ],
          days: 7
        }
      },
      {
        id: 'b5', type: 'timeline', label: 'Reading Milestones', order: 4, width: 'half',
        content: {
          events: [
            { label: 'Q1 Goal: 6 books finished', date: 'March 31' },
            { label: 'Q2 Goal: 12 books total', date: 'June 30' },
            { label: 'Q3 Goal: 18 books total', date: 'September 30' },
            { label: 'Year Goal: 24 books completed', date: 'December 31' },
          ]
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Book Notes & Insights', order: 5, width: 'full',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
