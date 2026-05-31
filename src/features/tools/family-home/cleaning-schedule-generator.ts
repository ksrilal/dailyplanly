import type { Tool } from '../types'

const cleaningScheduleGenerator: Tool = {
  id: 'cleaning-schedule-generator',
  slug: 'cleaning-schedule-generator',
  title: 'Home Cleaning Schedule Generator',
  description: 'Generate a personalised weekly, monthly, and seasonal cleaning schedule based on your home size, household members, and available time.',
  category: 'family-home',
  icon: 'Sparkles',
  tags: ['cleaning', 'home', 'chores', 'household', 'schedule', 'tidy'],
  relatedTemplateSlug: 'household-management-planner',
  relatedTemplateCategory: 'family-home',
  inputs: [
    { id: 'bedrooms', type: 'number', label: 'Number of Bedrooms', placeholder: '3', min: 1, max: 10, step: 1, required: true, defaultValue: 3 },
    { id: 'bathrooms', type: 'number', label: 'Number of Bathrooms', placeholder: '2', min: 1, max: 8, step: 1, required: true, defaultValue: 2 },
    { id: 'people', type: 'number', label: 'People in Household', placeholder: '4', min: 1, max: 12, step: 1, required: true, defaultValue: 4 },
    { id: 'pets', type: 'select', label: 'Pets', required: false, defaultValue: 'none',
      options: [
        { label: 'No pets', value: 'none' },
        { label: 'Cat(s)', value: 'cats' },
        { label: 'Dog(s)', value: 'dogs' },
        { label: 'Multiple pets', value: 'multiple' },
      ] },
    { id: 'cleaningTime', type: 'number', label: 'Time Available for Cleaning per Week', placeholder: '3', unit: 'hrs', min: 0.5, max: 20, step: 0.5, required: true, defaultValue: 3 },
    { id: 'preference', type: 'select', label: 'Cleaning Preference', required: false, defaultValue: 'daily-light',
      options: [
        { label: 'Daily light tasks + weekly deep clean', value: 'daily-light' },
        { label: 'One big clean per week', value: 'weekly-big' },
        { label: 'Zone cleaning (one room per day)', value: 'zones' },
      ] },
  ],
  generate(inputs) {
    const bedrooms = Number(inputs.bedrooms) || 3
    const bathrooms = Number(inputs.bathrooms) || 2
    const people = Number(inputs.people) || 4
    const pets = String(inputs.pets || 'none')
    const cleaningTime = Number(inputs.cleaningTime) || 3
    const preference = String(inputs.preference || 'daily-light')

    const rooms = bedrooms + bathrooms + 2 // + kitchen + living room
    const petMultiplier = pets === 'none' ? 1 : pets === 'cats' ? 1.2 : pets === 'dogs' ? 1.4 : 1.5
    const estimatedMinPerRoom = Math.ceil(20 * petMultiplier)
    const hoursNeeded = (rooms * estimatedMinPerRoom * people * 0.15) / 60

    const daily = ['Wipe kitchen surfaces after cooking', 'Do dishes / load dishwasher', 'Quick bathroom wipe-down (used bathrooms)', 'Tidy living areas before bed', pets !== 'none' ? 'Pet feeding station clean' : '', 'Take out kitchen bin if full'].filter(Boolean) as string[]

    const weekly = [
      'Vacuum all floors including stairs',
      'Mop hard floors (kitchen, bathrooms, hallway)',
      ...Array.from({ length: bathrooms }, (_, i) => `Full bathroom ${i + 1} clean (toilet, sink, shower, floor)`),
      'Kitchen deep clean (hob, counters, inside microwave)',
      'Change bed sheets — master bedroom',
      'Dust all surfaces (shelves, TV, windowsills)',
      pets === 'dogs' || pets === 'multiple' ? 'Vacuum sofa and pet sleeping areas' : '',
      people > 3 ? 'Change children\'s bed sheets' : '',
      'Empty all bins and replace liners',
    ].filter(Boolean) as string[]

    const monthly = ['Clean oven interior', 'Wipe down all kitchen cupboard exteriors', 'Clean inside fridge', 'Descale kettle and coffee machine', 'Wash bed duvet covers', 'Clean windows (inside)', pets !== 'none' ? 'Wash pet bedding' : '', 'Vacuum under furniture', 'Wipe light switches and door handles'].filter(Boolean) as string[]

    const weeklySchedule = preference === 'zones'
      ? [
        { week: 'Monday', focus: 'Kitchen', tasks: 'Deep kitchen clean: hob, counters, fridge, floor', notes: '~30 min' },
        { week: 'Tuesday', focus: 'Bathrooms', tasks: `All ${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}: toilet, sink, shower, floor`, notes: `~${bathrooms * 15} min` },
        { week: 'Wednesday', focus: 'Living areas', tasks: 'Vacuum, dust, tidy living room and dining room', notes: '~25 min' },
        { week: 'Thursday', focus: 'Bedrooms', tasks: `All ${bedrooms} bedrooms: dust, vacuum, change sheets`, notes: `~${bedrooms * 20} min` },
        { week: 'Friday', focus: 'Floors + finishing', tasks: 'Vacuum all + mop hard floors + spot clean', notes: '~30 min' },
        { week: 'Saturday', focus: 'Laundry day', tasks: 'All laundry: wash, dry, fold, put away', notes: '' },
        { week: 'Sunday', focus: 'Prep + reset', tasks: 'Quick tidy, prepare for week, bins out', notes: '15 min' },
      ]
      : [
        { week: 'Daily (5–10 min)', focus: 'Maintenance', tasks: daily.join(' · '), notes: 'Prevents build-up' },
        { week: 'Weekly (2–3 hrs)', focus: 'Full clean', tasks: weekly.slice(0, 4).join(' · '), notes: 'Saturday morning is popular' },
        { week: 'Monthly', focus: 'Deep tasks', tasks: monthly.slice(0, 3).join(' · '), notes: 'Last Sunday of month' },
        { week: 'Seasonal', focus: 'Major tasks', tasks: 'Windows, move furniture, declutter, garden, gutters', notes: 'Spring and Autumn' },
      ]

    return {
      headline: `Cleaning schedule for ${bedrooms}BR/${bathrooms}BA home · ${people} people${pets !== 'none' ? ` + ${pets}` : ''}`,
      subheadline: `${cleaningTime} hrs/week available · ${Math.round(hoursNeeded * 10) / 10} hrs estimated needed · ${preference.replace(/-/g, ' ')} approach`,
      stats: [
        { label: 'Rooms to Clean', value: `${rooms}` },
        { label: 'Household Size', value: `${people} people` },
        { label: 'Weekly Time Available', value: `${cleaningTime} hrs` },
        { label: 'Estimated Time Needed', value: `${Math.round(hoursNeeded * 10) / 10} hrs` },
        { label: 'Pets', value: pets === 'none' ? 'None' : pets.charAt(0).toUpperCase() + pets.slice(1) },
        { label: 'Cleaning Style', value: preference.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) },
      ],
      milestones: [
        { label: 'First full clean completed', date: 'This week' },
        { label: 'Schedule running consistently', date: 'Week 3' },
        { label: 'Whole household contributing', date: 'Month 1' },
        { label: 'First seasonal deep clean', date: 'Next season change' },
      ],
      weeklySchedule,
      checklists: [
        { title: 'Daily Tasks (10 min)', items: daily },
        { title: 'Weekly Deep Clean', items: weekly },
        { title: 'Monthly Tasks', items: monthly },
      ],
      recommendations: [
        `Your home needs approximately ${Math.round(hoursNeeded * 10) / 10} hours of cleaning per week. You have ${cleaningTime} hours available — ${cleaningTime >= hoursNeeded ? 'this is sufficient.' : 'consider delegating tasks to other household members.'}`,
        people > 2 ? 'Involve everyone — even children can handle age-appropriate tasks (making beds, tidying rooms, taking out bins).' : '',
        pets !== 'none' ? `Pets add ~${Math.round((petMultiplier - 1) * 100)}% more cleaning time — invest in a good vacuum cleaner designed for pet hair.` : '',
        preference === 'daily-light' ? 'The daily 10-minute habit prevents the need for marathon cleaning sessions.' : 'Zone cleaning means no room is ever more than a week from being fully clean.',
      ].filter(Boolean) as string[],
      nextActions: [
        'Post this cleaning schedule on the fridge today',
        'Assign each weekly task to a specific person or day',
        'Buy any missing cleaning supplies this week',
        'Set a recurring calendar reminder for your chosen cleaning day',
      ],
    }
  },
}

export default cleaningScheduleGenerator
