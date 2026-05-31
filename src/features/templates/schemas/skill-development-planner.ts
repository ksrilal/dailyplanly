import type { Template } from '@/features/templates/types'

export const skillDevelopmentPlannerTemplate: Template = {
  id: 'tpl-024',
  slug: 'skill-development-planner',
  title: 'Skill Development Planner',
  description: 'Master any skill faster with a structured practice schedule, progress milestones, deliberate practice logging, and the feedback habits that accelerate skill acquisition.',
  category: 'lifestyle',
  type: 'planner',
  featured: false,
  tags: ['skill learning', 'deliberate practice', 'mastery', 'learning', 'development'],
  previewImage: '/templates/previews/skill-development-planner.png',
  plannerDefaults: {
    theme: 'elegant-dark',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Skill Goal', order: 0, width: 'half',
        content: {
          goal: 'Learn conversational Spanish to B2 level in 12 months',
          milestones: [
            { label: 'Complete A1 Duolingo track (basics)', done: true },
            { label: 'Hold first 5-minute conversation with native speaker', done: false },
            { label: 'Pass A2 proficiency assessment', done: false },
            { label: 'Watch Spanish TV series without subtitles', done: false },
            { label: 'Pass B2 level certification exam', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'routine', label: 'Daily Practice Schedule', order: 1, width: 'half',
        content: {
          slots: [
            { time: '07:00', label: 'Duolingo — 15 min daily streak' },
            { time: '07:15', label: 'Vocabulary flashcards — 20 new words (Anki)' },
            { time: '12:30', label: 'Spanish podcast during lunch — 20 min' },
            { time: '19:00', label: 'Grammar lesson — 30 min structured study' },
            { time: '20:00', label: 'Conversation practice — iTalki tutor (3x/week)' },
            { time: '21:30', label: 'Spanish YouTube video — passive listening' },
          ]
        }
      },
      {
        id: 'b3', type: 'table', label: 'Practice Log', order: 2, width: 'full',
        content: {
          headers: ['Date', 'Activity', 'Duration', 'Level / Material', 'Notes / Struggles'],
          rows: [
            ['', 'Duolingo', '15 min', 'A2 — past tense', ''],
            ['', 'Conversation tutor', '30 min', 'Present tense topic', ''],
            ['', 'Podcast', '20 min', 'Coffee Break Spanish Ep.12', ''],
            ['', 'Grammar workbook', '45 min', 'Subjunctive mood', ''],
            ['', 'Spanish Netflix', '40 min', '"La Casa de Papel"', ''],
          ]
        }
      },
      {
        id: 'b4', type: 'habit-tracker', label: 'Skill Practice Habits', order: 3, width: 'half',
        content: {
          habits: [
            { label: 'Duolingo daily streak' },
            { label: '20 new vocabulary words' },
            { label: 'Listen to Spanish content' },
            { label: 'Grammar structured study' },
            { label: 'Speak with a native speaker' },
          ],
          days: 7
        }
      },
      {
        id: 'b5', type: 'timeline', label: 'Skill Milestones', order: 4, width: 'half',
        content: {
          events: [
            { label: 'A1 complete — basic survival phrases', date: 'Month 2' },
            { label: 'First conversation with native speaker', date: 'Month 3' },
            { label: 'A2 proficiency test passed', date: 'Month 5' },
            { label: 'Watch TV without English subtitles', date: 'Month 8' },
            { label: 'B1 assessment passed', date: 'Month 10' },
            { label: 'B2 certification — GOAL ACHIEVED', date: 'Month 12' },
          ]
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Learning Notes', order: 5, width: 'full',
        content: { lines: 5, text: '' }
      },
    ]
  }
}
