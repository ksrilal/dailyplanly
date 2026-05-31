// Famous quotes mapped to tool categories and specific slugs
// Each entry has author, quote, and optional attribution context

export interface ToolQuote {
  quote: string
  author: string
  context?: string
}

const QUOTES_BY_CATEGORY: Record<string, ToolQuote[]> = {
  productivity: [
    { quote: 'The key is not to prioritize what\'s on your schedule, but to schedule your priorities.', author: 'Stephen Covey' },
    { quote: 'You don\'t rise to the level of your goals. You fall to the level of your systems.', author: 'James Clear', context: 'Atomic Habits' },
    { quote: 'Focus is a matter of deciding what things you\'re not going to do.', author: 'John Carmack' },
    { quote: 'Until we can manage time, we can manage nothing else.', author: 'Peter Drucker' },
    { quote: 'The most productive people I know work fewer hours than anyone thinks.', author: 'Cal Newport' },
    { quote: 'It\'s not enough to be busy. The question is: what are we busy about?', author: 'Henry David Thoreau' },
  ],
  'health-wellness': [
    { quote: 'Take care of your body. It\'s the only place you have to live.', author: 'Jim Rohn' },
    { quote: 'Health is not valued until sickness comes.', author: 'Thomas Fuller' },
    { quote: 'The groundwork for all happiness is good health.', author: 'Leigh Hunt' },
    { quote: 'A healthy outside starts from the inside.', author: 'Robert Urich' },
    { quote: 'Your body hears everything your mind says.', author: 'Naomi Judd' },
    { quote: 'An apple a day keeps the doctor away. A workout a day keeps the coffin at bay.', author: 'Unknown' },
    { quote: 'The first wealth is health.', author: 'Ralph Waldo Emerson' },
  ],
  finance: [
    { quote: 'Do not save what is left after spending, but spend what is left after saving.', author: 'Warren Buffett' },
    { quote: 'A budget is telling your money where to go instead of wondering where it went.', author: 'Dave Ramsey' },
    { quote: 'Financial freedom is available to those who learn about it and work for it.', author: 'Robert Kiyosaki' },
    { quote: 'It\'s not how much money you make, but how much money you keep.', author: 'Robert Kiyosaki' },
    { quote: 'Beware of little expenses. A small leak will sink a great ship.', author: 'Benjamin Franklin' },
    { quote: 'The stock market is a device for transferring money from the impatient to the patient.', author: 'Warren Buffett' },
    { quote: 'Money is a tool. Used properly it makes something beautiful; used wrong, it makes a mess.', author: 'Bradley Vinson' },
  ],
  education: [
    { quote: 'Education is not the filling of a pail, but the lighting of a fire.', author: 'W.B. Yeats' },
    { quote: 'The more that you read, the more things you will know.', author: 'Dr. Seuss' },
    { quote: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: 'Mahatma Gandhi' },
    { quote: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' },
    { quote: 'Tell me and I forget. Teach me and I remember. Involve me and I learn.', author: 'Benjamin Franklin' },
    { quote: 'Learning is not attained by chance; it must be sought with ardour and attended to with diligence.', author: 'Abigail Adams' },
    { quote: 'The beautiful thing about learning is that no one can take it away from you.', author: 'B.B. King' },
  ],
  career: [
    { quote: 'Choose a job you love and you will never have to work a day in your life.', author: 'Confucius' },
    { quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
    { quote: 'Success usually comes to those who are too busy to be looking for it.', author: 'Henry David Thoreau' },
    { quote: 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do great work.', author: 'Steve Jobs' },
    { quote: 'Opportunities don\'t happen. You create them.', author: 'Chris Grosser' },
    { quote: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
    { quote: 'Hard work beats talent when talent doesn\'t work hard.', author: 'Tim Notke' },
  ],
  'family-home': [
    { quote: 'A happy family is but an earlier heaven.', author: 'George Bernard Shaw' },
    { quote: 'The family is one of nature\'s masterpieces.', author: 'George Santayana' },
    { quote: 'In family life, love is the oil that eases friction.', author: 'Friedrich Nietzsche' },
    { quote: 'Home is the nicest word there is.', author: 'Laura Ingalls Wilder' },
    { quote: 'The strength of a family, like the strength of an army, lies in its loyalty to each other.', author: 'Mario Puzo' },
    { quote: 'A place for everything and everything in its place.', author: 'Isabella Beeton' },
    { quote: 'Organisation is the foundation upon which great things are built.', author: 'Unknown' },
  ],
  travel: [
    { quote: 'The world is a book and those who do not travel read only one page.', author: 'Saint Augustine' },
    { quote: 'Travel is the only thing you buy that makes you richer.', author: 'Anonymous' },
    { quote: 'Life is either a daring adventure or nothing at all.', author: 'Helen Keller' },
    { quote: 'Not all those who wander are lost.', author: 'J.R.R. Tolkien' },
    { quote: 'Jobs fill your pocket, but adventures fill your soul.', author: 'Jaime Lyn Beatty' },
    { quote: 'To travel is to live.', author: 'Hans Christian Andersen' },
    { quote: 'The journey of a thousand miles begins with a single step.', author: 'Lao Tzu' },
  ],
  events: [
    { quote: 'In the end, it\'s not the years in your life that count. It\'s the life in your years.', author: 'Abraham Lincoln' },
    { quote: 'Life is a collection of moments, not days.', author: 'Unknown' },
    { quote: 'The secret of a great party is a great guest list.', author: 'Unknown' },
    { quote: 'Great events make me quiet and calm; it is only trifles that irritate my nerves.', author: 'Queen Victoria' },
    { quote: 'Celebrate what you\'ve accomplished, but raise the bar a little higher each time you succeed.', author: 'Mia Hamm' },
    { quote: 'Every moment is a fresh beginning.', author: 'T.S. Eliot' },
    { quote: 'People will forget what you said, but never how you made them feel.', author: 'Maya Angelou' },
  ],
  'personal-development': [
    { quote: 'The only person you are destined to become is the person you decide to be.', author: 'Ralph Waldo Emerson' },
    { quote: 'Be the change that you wish to see in the world.', author: 'Mahatma Gandhi' },
    { quote: 'You don\'t have to be great to start, but you have to start to be great.', author: 'Zig Ziglar' },
    { quote: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
    { quote: 'The mind is everything. What you think, you become.', author: 'Buddha' },
    { quote: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
    { quote: 'Dream big and dare to fail.', author: 'Norman Vaughan' },
    { quote: 'We become what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' },
  ],
  business: [
    { quote: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
    { quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
    { quote: 'Your most unhappy customers are your greatest source of learning.', author: 'Bill Gates' },
    { quote: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
    { quote: 'Don\'t find customers for your products. Find products for your customers.', author: 'Seth Godin' },
    { quote: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
    { quote: 'Entrepreneurship is living a few years of your life like most people won\'t, so you can spend the rest of your life like most people can\'t.', author: 'Unknown' },
  ],
}

// Slug-specific overrides for more targeted quotes
const QUOTES_BY_SLUG: Record<string, ToolQuote[]> = {
  'habit-system-builder': [
    { quote: 'You don\'t rise to the level of your goals. You fall to the level of your systems.', author: 'James Clear', context: 'Atomic Habits' },
    { quote: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' },
    { quote: 'Motivation is what gets you started. Habit is what keeps you going.', author: 'Jim Ryun' },
    { quote: 'Small habits, compounded over time, lead to remarkable results.', author: 'James Clear' },
  ],
  'deep-work-system-builder': [
    { quote: 'Deep work is the ability to focus without distraction on a cognitively demanding task.', author: 'Cal Newport', context: 'Deep Work' },
    { quote: 'Efforts to deepen your focus will struggle if you don\'t simultaneously wean yourself from a dependence on distraction.', author: 'Cal Newport' },
    { quote: 'The ability to perform deep work is becoming increasingly rare and increasingly valuable.', author: 'Cal Newport' },
    { quote: 'Who you are, what you think, feel, and do, what you love — is the sum of what you focus on.', author: 'Cal Newport' },
  ],
  'daily-schedule-builder': [
    { quote: 'Time is what we want most, but what we use worst.', author: 'William Penn' },
    { quote: 'Either you run the day, or the day runs you.', author: 'Jim Rohn' },
    { quote: 'The bad news is time flies. The good news is you\'re the pilot.', author: 'Michael Altshuler' },
    { quote: 'Ordinary people think merely of spending time. Great people think of using it.', author: 'Arthur Schopenhauer' },
  ],
  'bmi-calculator': [
    { quote: 'Take care of your body. It\'s the only place you have to live.', author: 'Jim Rohn' },
    { quote: 'The body achieves what the mind believes.', author: 'Napoleon Hill' },
    { quote: 'Physical fitness is the first requisite of happiness.', author: 'Joseph Pilates' },
  ],
  'tdee-calculator': [
    { quote: 'Let food be thy medicine and medicine be thy food.', author: 'Hippocrates' },
    { quote: 'You are what you eat, so don\'t be fast, cheap, easy, or fake.', author: 'Unknown' },
    { quote: 'Eat food. Not too much. Mostly plants.', author: 'Michael Pollan' },
  ],
  'weight-loss-roadmap': [
    { quote: 'It takes 4 weeks for you to notice your body changing, 8 weeks for friends to notice, 12 weeks for the rest of the world.', author: 'Unknown' },
    { quote: 'Take care of your body. It\'s the only place you have to live.', author: 'Jim Rohn' },
    { quote: 'The groundwork for all happiness is good health.', author: 'Leigh Hunt' },
    { quote: 'A year from now, you\'ll wish you started today.', author: 'Karen Lamb' },
  ],
  'savings-goal-planner': [
    { quote: 'Do not save what is left after spending, but spend what is left after saving.', author: 'Warren Buffett' },
    { quote: 'A penny saved is a penny earned.', author: 'Benjamin Franklin' },
    { quote: 'The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order.', author: 'T.T. Munger' },
  ],
  'budget-builder': [
    { quote: 'A budget is telling your money where to go instead of wondering where it went.', author: 'Dave Ramsey' },
    { quote: 'Wealth consists not in having great possessions, but in having few wants.', author: 'Epictetus' },
    { quote: 'It\'s not your salary that makes you rich, it\'s your spending habits.', author: 'Charles A. Jaffe' },
  ],
  'job-search-tracker': [
    { quote: 'Opportunities don\'t happen. You create them.', author: 'Chris Grosser' },
    { quote: 'Success is where preparation and opportunity meet.', author: 'Bobby Unser' },
    { quote: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
    { quote: 'Hard work beats talent when talent doesn\'t work hard.', author: 'Tim Notke' },
  ],
  'goal-breakdown-generator': [
    { quote: 'A goal without a plan is just a wish.', author: 'Antoine de Saint-Exupéry' },
    { quote: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
    { quote: 'All our dreams can come true, if we have the courage to pursue them.', author: 'Walt Disney' },
    { quote: 'Setting goals is the first step in turning the invisible into the visible.', author: 'Tony Robbins' },
  ],
  'morning-routine-designer': [
    { quote: 'Win the morning, win the day.', author: 'Tim Ferriss' },
    { quote: 'How you start each day is how you live each day.', author: 'Louise Hay' },
    { quote: 'The morning is the key to the day.', author: 'Unknown' },
    { quote: 'Early to bed and early to rise makes a man healthy, wealthy, and wise.', author: 'Benjamin Franklin' },
  ],
  'thirty-day-challenge-generator': [
    { quote: 'A journey of a thousand miles begins with a single step.', author: 'Lao Tzu' },
    { quote: 'You are never too old to set another goal or to dream a new dream.', author: 'C.S. Lewis' },
    { quote: 'The difference between who you are and who you want to be is what you do.', author: 'Unknown' },
  ],
  'wedding-planner-tool': [
    { quote: 'A good marriage is one where each partner secretly suspects they got the better deal.', author: 'Anne Lamott' },
    { quote: 'The best thing to hold onto in life is each other.', author: 'Audrey Hepburn' },
    { quote: 'A successful marriage requires falling in love many times, always with the same person.', author: 'Mignon McLaughlin' },
  ],
  'business-goal-planner': [
    { quote: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
    { quote: 'Business opportunities are like buses — there\'s always another one coming.', author: 'Richard Branson' },
    { quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  ],
  'trip-itinerary-builder': [
    { quote: 'The world is a book and those who do not travel read only one page.', author: 'Saint Augustine' },
    { quote: 'Not all those who wander are lost.', author: 'J.R.R. Tolkien' },
    { quote: 'Travel far enough, you meet yourself.', author: 'David Mitchell' },
  ],
}

export function getToolQuotes(slug: string, category: string): ToolQuote[] {
  // Slug-specific quotes take priority, fall back to category quotes
  return QUOTES_BY_SLUG[slug] ?? QUOTES_BY_CATEGORY[category] ?? QUOTES_BY_CATEGORY['personal-development']
}
