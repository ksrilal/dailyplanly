import type { Tool } from '../types'

const readingPlanBuilder: Tool = {
  id: 'reading-plan-builder',
  slug: 'reading-plan-builder',
  title: 'Reading Plan Builder',
  description: 'Set your reading goal and daily time available to get a personalised annual reading plan, book schedule, daily habit design, and note-taking system.',
  category: 'education',
  icon: 'BookOpen',
  tags: ['reading', 'books', 'learning', 'habit', 'knowledge'],
  relatedTemplateSlug: 'reading-planner',
  relatedTemplateCategory: 'education',
  inputs: [
    { id: 'booksPerYear', type: 'number', label: 'Books to Read This Year', placeholder: '24', unit: 'books', min: 1, max: 200, step: 1, required: true, defaultValue: 24 },
    { id: 'minutesPerDay', type: 'number', label: 'Minutes Available to Read Daily', placeholder: '30', unit: 'min', min: 5, max: 240, step: 5, required: true, defaultValue: 30 },
    { id: 'avgPages', type: 'number', label: 'Average Book Length', placeholder: '300', unit: 'pages', min: 50, max: 1500, step: 10, required: false, defaultValue: 300 },
    { id: 'genre', type: 'select', label: 'Primary Genre', required: false, defaultValue: 'mixed',
      options: [
        { label: 'Non-fiction (self-help, business, science)', value: 'nonfiction' },
        { label: 'Fiction (novels, stories)', value: 'fiction' },
        { label: 'Technical (programming, academic)', value: 'technical' },
        { label: 'Mixed (variety of genres)', value: 'mixed' },
      ] },
    { id: 'readingTime', type: 'select', label: 'When Do You Read?', required: false, defaultValue: 'evening',
      options: [
        { label: 'Morning (before work)', value: 'morning' },
        { label: 'Lunchtime', value: 'lunch' },
        { label: 'Evening (before bed)', value: 'evening' },
        { label: 'Multiple times daily', value: 'multiple' },
      ] },
  ],
  generate(inputs) {
    const booksPerYear = Number(inputs.booksPerYear) || 24
    const minutesPerDay = Number(inputs.minutesPerDay) || 30
    const avgPages = Number(inputs.avgPages) || 300
    const genre = String(inputs.genre || 'mixed')
    const readingTime = String(inputs.readingTime || 'evening')

    const readingSpeedWPM = genre === 'technical' ? 150 : genre === 'fiction' ? 300 : 250
    const avgWordsPerPage = 250
    const pagesPerHour = (readingSpeedWPM / avgWordsPerPage) * 60
    const pagesPerDay = (minutesPerDay / 60) * pagesPerHour
    const daysPerBook = Math.ceil(avgPages / pagesPerDay)
    const booksAchievable = Math.floor(365 / daysPerBook)
    const isGoalAchievable = booksAchievable >= booksPerYear

    const booksPerMonth = Math.round((booksPerYear / 12) * 10) / 10
    const minutesNeeded = isGoalAchievable ? minutesPerDay : Math.ceil((booksPerYear * daysPerBook * avgPages / avgPages) / 365 * 60)

    const timeSlots: Record<string, string> = { morning: '6:30–7:00 AM — before the day starts', lunch: '12:30–1:00 PM — lunchtime reading', evening: '9:00–9:30 PM — before bed (no screens)', multiple: 'Morning + commute + evening sessions' }

    const weeklySchedule = [
      { week: 'Month 1', focus: `${Math.ceil(booksPerMonth)} book${Math.ceil(booksPerMonth) > 1 ? 's' : ''}`, tasks: `${minutesPerDay} min daily · Start reading list · Set up notes system`, notes: 'Start with a page-turner to build momentum' },
      { week: 'Month 2–3', focus: `${Math.round(booksPerMonth * 2)} books total`, tasks: 'Daily reading habit locked · Write one insight per book', notes: 'The habit should feel automatic by now' },
      { week: 'Month 6', focus: `${Math.round(booksPerYear / 2)} books`, tasks: 'Halfway milestone — review reading list · add new titles', notes: 'Celebrate and adjust if behind' },
      { week: 'Month 12', focus: `${booksPerYear} books`, tasks: 'Year complete! Write reading year review', notes: 'Build your reading list for next year' },
    ]

    return {
      headline: isGoalAchievable
        ? `${booksPerYear} books achievable in ${minutesPerDay} min/day`
        : `${booksAchievable} books achievable at ${minutesPerDay} min/day — need ${minutesNeeded} min for ${booksPerYear}`,
      subheadline: `${daysPerBook} days per book · ${booksPerMonth} books/month · Reading time: ${timeSlots[readingTime]}`,
      stats: [
        { label: 'Annual Goal', value: `${booksPerYear} books` },
        { label: 'Achievable at This Pace', value: `${booksAchievable} books`, note: isGoalAchievable ? 'Goal is achievable!' : 'Increase daily time' },
        { label: 'Days per Book', value: `${daysPerBook} days` },
        { label: 'Books per Month', value: `${booksPerMonth}` },
        { label: 'Reading Speed', value: `~${readingSpeedWPM} WPM` },
        { label: 'Pages per Day', value: `~${Math.round(pagesPerDay)} pages` },
      ],
      milestones: [
        { label: `First 3 books complete`, date: 'Month 1–2' },
        { label: `Halfway: ${Math.round(booksPerYear / 2)} books`, date: 'Month 6' },
        { label: `75% milestone: ${Math.round(booksPerYear * 0.75)} books`, date: 'Month 9' },
        { label: `${booksPerYear} books — reading goal complete!`, date: 'December 31' },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Reading System Setup',
          items: [
            `Schedule ${minutesPerDay} min reading at ${readingTime === 'evening' ? '9pm' : readingTime === 'morning' ? '6:30am' : 'lunchtime'} every day`,
            'Build your reading list — add 10 books to start',
            'Choose a note-taking method (highlights app, notebook, or Notion)',
            'Set a "currently reading" place — always have a book ready',
            'Join Goodreads to track progress',
            'Tell someone about your reading goal for accountability',
            genre === 'nonfiction' ? 'Write one actionable insight per non-fiction book' : 'Write a 3-sentence review after each book',
          ],
        },
        {
          title: 'Daily Reading Habit',
          items: [
            `Read ${minutesPerDay} min at the same time every day`,
            'Have your current book physically accessible — no friction',
            'Read during waiting times (commute, queues, lunch)',
            'Audiobooks count — use commute and exercise time',
            'No phone in bed — replace it with your book',
          ],
        },
      ],
      recommendations: [
        isGoalAchievable ? `At ${minutesPerDay} min/day, you can comfortably read ${booksAchievable} books. Your ${booksPerYear}-book goal is achievable.` : `To hit ${booksPerYear} books, you need ${minutesNeeded} min/day. Try adding audiobooks for commuting to bridge the gap.`,
        'The secret to reading more: always have a book you\'re genuinely excited about. Never force a boring book.',
        genre === 'nonfiction' ? 'Take one actionable note per chapter. One idea you implement is worth 10 books you just read.' : 'Fiction readers sleep better and have higher empathy — this habit pays dividends beyond the books.',
        'Audiobooks count. Use your commute, exercise, and cooking time — many people "read" 30+ books per year this way.',
      ],
      nextActions: [
        'Write your reading list right now — minimum 10 books',
        `Schedule ${minutesPerDay} min daily in your calendar as "Reading"`,
        'Order or download your first book today',
        'Set up Goodreads to track your challenge',
      ],
    }
  },
}

export default readingPlanBuilder
