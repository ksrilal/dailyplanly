import type { Tool } from '../types'

const familyScheduleBuilder: Tool = {
  id: 'family-schedule-builder',
  slug: 'family-schedule-builder',
  title: 'Family Schedule Builder',
  description: 'Create a structured weekly family schedule that coordinates everyone\'s commitments, balances activities, and builds in family time — with a printable weekly overview.',
  category: 'family-home',
  icon: 'Users',
  tags: ['family', 'schedule', 'children', 'household', 'organisation'],
  relatedTemplateSlug: 'family-schedule-planner',
  relatedTemplateCategory: 'family-home',
  inputs: [
    { id: 'adults', type: 'number', label: 'Number of Adults', placeholder: '2', min: 1, max: 6, step: 1, required: true, defaultValue: 2 },
    { id: 'children', type: 'number', label: 'Number of Children', placeholder: '2', min: 0, max: 10, step: 1, required: false, defaultValue: 2 },
    { id: 'childrenAges', type: 'text', label: 'Children\'s Ages', placeholder: 'e.g. 5, 8, 12', required: false, defaultValue: '' },
    { id: 'workArrangement', type: 'select', label: 'Work Arrangement', required: true, defaultValue: 'mixed',
      options: [
        { label: 'Both adults work full-time', value: 'both-full' },
        { label: 'One full-time, one part-time', value: 'mixed' },
        { label: 'Both work from home', value: 'both-wfh' },
        { label: 'One stays home', value: 'one-home' },
      ] },
    { id: 'biggestChallenge', type: 'select', label: 'Biggest Scheduling Challenge', required: false, defaultValue: 'balance',
      options: [
        { label: 'Balancing activities and downtime', value: 'balance' },
        { label: 'School run coordination', value: 'school' },
        { label: 'Finding family time together', value: 'together' },
        { label: 'Household chores getting done', value: 'chores' },
      ] },
  ],
  generate(inputs) {
    const adults = Number(inputs.adults) || 2
    const children = Number(inputs.children) || 0
    const childrenAges = String(inputs.childrenAges || '')
    const workArrangement = String(inputs.workArrangement || 'mixed')
    const challenge = String(inputs.biggestChallenge || 'balance')

    const totalPeople = adults + children
    const hasSchoolAge = childrenAges.split(',').map(Number).some((a) => a >= 5 && a <= 18)

    const weeklySchedule = [
      { week: 'Monday', focus: 'Week launch', tasks: hasSchoolAge ? 'School run · work · after-school activities · dinner together' : 'Work · household tasks · evening together', notes: 'Set the week\'s tone with a family dinner' },
      { week: 'Tuesday', focus: 'Activity day', tasks: hasSchoolAge ? 'School · after-school clubs/sports · homework time' : 'Work · personal projects', notes: 'Limit to 2 activities per child max' },
      { week: 'Wednesday', focus: 'Mid-week reset', tasks: 'Grocery shop or meal prep · family check-in · lighter evening', notes: 'Mid-week is often the most chaotic — plan for it' },
      { week: 'Thursday', focus: 'Activities + admin', tasks: hasSchoolAge ? 'School · activities · catch up on household admin' : 'Work · admin · exercise', notes: 'Handle bills, appointments, school admin' },
      { week: 'Friday', focus: 'Wind-down', tasks: 'Early finish if possible · family movie or games night · prep for weekend', notes: 'Protect Friday evening as family time' },
      { week: 'Saturday', focus: 'Family day', tasks: 'Morning activities or sport · family outing or project · relaxed lunch', notes: 'At least one activity chosen by children' },
      { week: 'Sunday', focus: 'Prepare + rest', tasks: 'Meal prep · laundry · school bags ready · family dinner · early bedtime', notes: 'Sunday prep = stress-free Monday' },
    ]

    const challengeSolutions: Record<string, string[]> = {
      balance: ['Cap children\'s activities at 2 per week — more is overwhelming', 'Protect at least one unscheduled afternoon per week for free play', 'Say no to activities that don\'t spark genuine joy', 'Build in "do nothing" time — it\'s not wasted'],
      school: ['Assign clear pickup responsibilities for each day', 'Keep a weekly school run calendar visible to everyone', 'Identify backup pickup contacts for emergencies', 'Prepare school bags the night before every Sunday'],
      together: ['Protect Friday dinner as sacred family time — no screens', 'One family activity per weekend — everyone gets input', 'Eat dinner together 5+ nights per week if possible', 'Create a family tradition: movie night, games night, Sunday walk'],
      chores: ['Assign age-appropriate chores to all children', 'Create a visible chore chart for the week', 'Saturday morning: 30-min family tidy before fun begins', 'Rotate chores monthly so everyone learns all tasks'],
    }

    return {
      headline: `Family schedule for ${totalPeople} people (${adults} adult${adults > 1 ? 's' : ''}${children > 0 ? ` + ${children} child${children > 1 ? 'ren' : ''}` : ''})`,
      subheadline: `${workArrangement.replace(/-/g, ' ')} · ${hasSchoolAge ? 'School-age children' : 'Pre-school or no children'}`,
      stats: [
        { label: 'Family Size', value: `${totalPeople} people` },
        { label: 'Adults', value: `${adults}` },
        { label: 'Children', value: `${children}` },
        { label: 'Work Setup', value: workArrangement.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) },
        { label: 'School Age', value: hasSchoolAge ? 'Yes' : 'No' },
        { label: 'Key Focus', value: challenge.charAt(0).toUpperCase() + challenge.slice(1) },
      ],
      milestones: [
        { label: 'Family schedule posted and agreed by all', date: 'This week' },
        { label: 'First full week with no scheduling conflicts', date: 'Week 2' },
        { label: 'New routine feels automatic', date: 'Week 4' },
        { label: 'Quarterly family schedule review', date: 'Month 3' },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Family Schedule Setup',
          items: [
            'List all recurring commitments for every family member',
            'Identify conflicts and resolve them together',
            'Post the schedule somewhere visible (fridge, whiteboard)',
            'Share a digital calendar all adults can see and edit',
            'Agree on one protected family time per week — no exceptions',
            children > 0 ? 'Agree on maximum 2 activities per child per week' : '',
            'Plan meals for the week every Sunday',
            'Assign household tasks to specific days and people',
          ].filter(Boolean) as string[],
        },
        { title: challengeSolutions[challenge][0], items: challengeSolutions[challenge] },
      ],
      recommendations: [
        challengeSolutions[challenge][0],
        children > 0 ? `With ${children} child${children > 1 ? 'ren' : ''}, overscheduling is the #1 family stress. Fewer activities = more connection.` : '',
        'A shared digital calendar (Google Calendar, Apple Family) prevents the most common conflicts.',
        'Sunday meal prep is the highest-leverage 1 hour of the family week — it removes daily decision fatigue.',
      ].filter(Boolean) as string[],
      nextActions: [
        'Create a shared family calendar this weekend',
        'Post this week\'s schedule on the fridge',
        'Agree on one protected family time that everyone commits to',
        'Plan next week\'s meals on Sunday — even just dinner',
      ],
    }
  },
}

export default familyScheduleBuilder
