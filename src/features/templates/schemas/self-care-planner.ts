import type { Template } from '@/features/templates/types'

export const selfCarePlannerTemplate: Template = {
  id: 'tpl-012',
  slug: 'self-care-planner',
  title: 'Self-Care Planner',
  description: 'Prioritise your wellbeing with a structured self-care schedule covering physical, mental, emotional, and social health. Track mood, rest, and self-care streaks weekly.',
  category: 'health-wellness',
  type: 'planner',
  featured: false,
  tags: ['self-care', 'wellness', 'mental health', 'mindfulness', 'wellbeing'],
  previewImage: '/templates/previews/self-care-planner.png',
  plannerDefaults: {
    theme: 'soft-paper',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'focus', label: 'Self-Care Priorities This Week', order: 0, width: 'full',
        content: {
          items: [
            { label: 'Book and attend therapy session', priority: 'high' },
            { label: 'Take a full digital detox Sunday afternoon', priority: 'high' },
            { label: 'Cook one nourishing meal per day', priority: 'medium' },
            { label: 'Call a close friend', priority: 'medium' },
            { label: 'Try a new relaxing activity — bath, sauna, massage', priority: 'low' },
          ]
        }
      },
      {
        id: 'b2', type: 'routine', label: 'Daily Self-Care Ritual', order: 1, width: 'full',
        content: {
          slots: [
            { time: '06:30', label: 'Gentle wake — no alarm jarring, gradual light' },
            { time: '07:00', label: 'Mindful morning — stretch, breathwork, no phone' },
            { time: '07:30', label: 'Nourishing breakfast — eat without screens' },
            { time: '12:30', label: 'Midday reset — 10 min walk in natural light' },
            { time: '15:00', label: 'Afternoon break — herbal tea · journaling' },
            { time: '18:00', label: 'Movement you enjoy — yoga, dance, swim' },
            { time: '20:00', label: 'Wind-down — candles · book · calming music' },
            { time: '21:30', label: 'Skincare routine · gratitude reflection' },
            { time: '22:00', label: 'Sleep hygiene — cool room, dark, quiet' },
          ]
        }
      },
      {
        id: 'b3', type: 'habit-tracker', label: 'Self-Care Habits', order: 2, width: 'full',
        content: {
          habits: [
            { label: 'Morning mindfulness' },
            { label: 'Outdoor time / sunlight' },
            { label: 'Move body intentionally' },
            { label: 'Connect with someone I love' },
            { label: 'No social media after 8 PM' },
            { label: 'Journaling / reflection' },
            { label: '8 hours sleep' },
          ],
          days: 7
        }
      },
      {
        id: 'b4', type: 'table', label: 'Weekly Self-Care Activities', order: 3, width: 'half',
        content: {
          headers: ['Area', 'Activity', 'Day/Time', 'Done'],
          rows: [
            ['Physical', 'Yoga or Pilates class', 'Tuesday 7pm', ''],
            ['Mental', 'Therapy session', 'Thursday 10am', ''],
            ['Emotional', 'Journaling & reflection', 'Daily evening', ''],
            ['Social', 'Coffee with a friend', 'Saturday', ''],
            ['Spiritual', 'Nature walk, meditation', 'Sunday morning', ''],
            ['Creative', 'Drawing / crafting', 'Wednesday', ''],
          ]
        }
      },
      {
        id: 'b5', type: 'dashboard-card', label: 'Mood Score', order: 4, width: 'half',
        content: { title: 'Average Mood This Week', value: '—', unit: '/ 10', note: 'Rate daily 1–10 on waking' }
      },
      {
        id: 'b6', type: 'notes', label: 'Reflections & Feelings', order: 5, width: 'full',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
