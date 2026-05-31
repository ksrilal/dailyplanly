import type { Template } from '@/features/templates/types'

export const tripPlannerTemplate: Template = {
  id: 'tpl-061',
  slug: 'trip-planner',
  title: 'Trip Planner',
  description: 'Plan any trip from weekend getaway to international adventure. Covers itinerary, budget, accommodation, transport, activities, and daily schedules in one printable planner.',
  category: 'travel-events',
  type: 'planner',
  featured: true,
  tags: ['travel', 'trip', 'holiday', 'itinerary', 'planner'],
  previewImage: '/templates/previews/trip-planner.png',
  plannerDefaults: {
    theme: 'minimal',
    orientation: 'portrait',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'goal', label: 'Trip Overview', order: 0, width: 'full',
        content: {
          goal: 'Barcelona city break — 5 days, cultural exploration and food',
          milestones: [
            { label: 'Day 1: Arrival, Eixample neighbourhood walk', done: false },
            { label: 'Day 2: Sagrada Família, Park Güell, Gràcia', done: false },
            { label: 'Day 3: Gothic Quarter, Barceloneta beach', done: false },
            { label: 'Day 4: Montjuïc, Picasso Museum, La Boqueria', done: false },
            { label: 'Day 5: Camp Nou, last tapas, evening flight home', done: false },
          ]
        }
      },
      {
        id: 'b2', type: 'dashboard-card', label: 'Trip Budget', order: 1, width: 'half',
        content: { title: 'Total Trip Budget', value: '£1,200', unit: '', note: 'Flights + hotel + food + activities' }
      },
      {
        id: 'b3', type: 'dashboard-card', label: 'Days Away', order: 2, width: 'half',
        content: { title: 'Duration', value: '5', unit: 'nights', note: 'Outbound: Fri 8am · Return: Wed 9pm' }
      },
      {
        id: 'b4', type: 'table', label: 'Daily Itinerary', order: 3, width: 'full',
        content: {
          headers: ['Day', 'Morning', 'Afternoon', 'Evening', 'Notes'],
          rows: [
            ['Fri', 'Fly London → Barcelona, check in hotel', 'Stroll Eixample, aperitivo at rooftop bar', 'Dinner: El Nacional', 'Airport: T5, departs 08:10'],
            ['Sat', 'Sagrada Família (pre-booked 9am)', 'Park Güell, Gràcia lunch & wander', 'Flamenco show, Barceloneta cocktails', 'Book Sagrada tickets online!'],
            ['Sun', 'Gothic Quarter, Cathedral, El Born', 'Barceloneta beach & swim', 'Seafood dinner at Barceloneta', 'Wear comfortable shoes'],
            ['Mon', 'Montjuïc cable car, castle views', 'Picasso Museum, La Boqueria market', 'Tapas tour: El Xampanyet, Bar del Pla', 'Museum closed Mondays — check!'],
            ['Tue', 'Camp Nou stadium tour', 'Passeig de Gràcia, Casa Batlló', 'Farewell dinner: Tickets restaurant', 'Pack tonight, fly Wed morning'],
          ]
        }
      },
      {
        id: 'b5', type: 'table', label: 'Budget Tracker', order: 4, width: 'half',
        content: {
          headers: ['Category', 'Budget (£)', 'Spent (£)', 'Notes'],
          rows: [
            ['Flights', '280', '', 'Return with EasyJet'],
            ['Hotel (5 nights)', '450', '', 'Hotel Praktik Bakery'],
            ['Food & drink', '250', '', '~£50/day'],
            ['Activities & tours', '120', '', 'Sagrada, Camp Nou, Flamenco'],
            ['Transport (metro/taxi)', '60', '', 'T10 metro card'],
            ['Shopping & misc', '40', '', 'Gifts, souvenirs'],
          ]
        }
      },
      {
        id: 'b6', type: 'notes', label: 'Travel Notes & Tips', order: 5, width: 'half',
        content: { lines: 8, text: '' }
      },
    ]
  }
}
