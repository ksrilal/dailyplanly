import type { Tool } from '../types'

const weightLossRoadmap: Tool = {
  id: 'weight-loss-roadmap',
  slug: 'weight-loss-roadmap',
  title: 'Weight Loss Roadmap Generator',
  description: 'Enter your current weight, target weight, and timeline to get a science-based weight loss roadmap with weekly targets, calorie plan, exercise schedule, and milestone checklist.',
  category: 'health-wellness',
  icon: 'Activity',
  featured: true,
  tags: ['weight loss', 'calories', 'fitness', 'health', 'diet', 'roadmap'],
  relatedTemplateSlug: 'weight-loss-planner',
  relatedTemplateCategory: 'health-wellness',
  inputs: [
    { id: 'currentWeight', type: 'number', label: 'Current Weight', placeholder: '85', unit: 'kg', min: 30, max: 300, step: 0.5, required: true, defaultValue: 85 },
    { id: 'targetWeight', type: 'number', label: 'Target Weight', placeholder: '75', unit: 'kg', min: 30, max: 300, step: 0.5, required: true, defaultValue: 75 },
    { id: 'height', type: 'number', label: 'Height', placeholder: '175', unit: 'cm', min: 100, max: 250, step: 1, required: true, defaultValue: 175 },
    { id: 'age', type: 'number', label: 'Age', placeholder: '30', unit: 'years', min: 16, max: 100, step: 1, required: true, defaultValue: 30 },
    { id: 'sex', type: 'select', label: 'Biological Sex', required: true, defaultValue: 'male',
      options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
    { id: 'activity', type: 'select', label: 'Current Activity Level', required: true, defaultValue: 'moderate',
      options: [
        { label: 'Sedentary (desk job, little exercise)', value: 'sedentary' },
        { label: 'Lightly active (light exercise 1–3 days/week)', value: 'light' },
        { label: 'Moderately active (exercise 3–5 days/week)', value: 'moderate' },
        { label: 'Very active (hard exercise 6–7 days/week)', value: 'active' },
      ] },
    { id: 'weeklyLoss', type: 'select', label: 'Weekly Loss Rate', required: true, defaultValue: '0.5',
      options: [
        { label: '0.25 kg/week (very gradual, sustainable)', value: '0.25' },
        { label: '0.5 kg/week (recommended)', value: '0.5' },
        { label: '0.75 kg/week (moderate)', value: '0.75' },
        { label: '1 kg/week (aggressive — only with medical guidance)', value: '1' },
      ] },
  ],
  generate(inputs) {
    const current = Number(inputs.currentWeight) || 85
    const target = Number(inputs.targetWeight) || 75
    const height = Number(inputs.height) || 175
    const age = Number(inputs.age) || 30
    const sex = String(inputs.sex || 'male')
    const activity = String(inputs.activity || 'moderate')
    const weeklyLoss = Number(inputs.weeklyLoss) || 0.5

    const tolose = Math.max(current - target, 0.1)
    const weeksNeeded = Math.ceil(tolose / weeklyLoss)

    // BMR (Mifflin-St Jeor)
    const bmr = sex === 'male'
      ? 10 * current + 6.25 * height - 5 * age + 5
      : 10 * current + 6.25 * height - 5 * age - 161

    const activityMultiplier: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 }
    const tdee = Math.round(bmr * (activityMultiplier[activity] || 1.55))
    const dailyDeficit = weeklyLoss * 7700 / 7  // 7700 kcal per kg fat
    const targetCalories = Math.round(tdee - dailyDeficit)
    const proteinTarget = Math.round(current * 1.8) // g/day

    const bmi = current / ((height / 100) ** 2)
    const targetBmi = target / ((height / 100) ** 2)

    const completionDate = new Date()
    completionDate.setDate(completionDate.getDate() + weeksNeeded * 7)

    const milestones = [
      { label: `Lose first ${weeklyLoss}kg — momentum starts`, date: 'Week 1' },
      { label: `${(tolose * 0.25).toFixed(1)}kg lost — 25% milestone`, date: `Week ${Math.ceil(weeksNeeded * 0.25)}` },
      { label: `${(tolose * 0.5).toFixed(1)}kg lost — halfway!`, date: `Week ${Math.ceil(weeksNeeded * 0.5)}` },
      { label: `${(tolose * 0.75).toFixed(1)}kg lost — 75% — final push`, date: `Week ${Math.ceil(weeksNeeded * 0.75)}` },
      { label: `GOAL: ${target}kg reached!`, date: completionDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
    ]

    const weeklySchedule = [
      { week: 'Mon', focus: 'Strength training', tasks: 'Full body resistance session (30–45 min)', notes: 'Preserves muscle while losing fat' },
      { week: 'Tue', focus: 'Cardio', tasks: '30 min brisk walk or light jog', notes: 'Zone 2 heart rate — conversational pace' },
      { week: 'Wed', focus: 'Rest or yoga', tasks: 'Stretching, foam rolling, recovery', notes: 'Recovery is as important as exercise' },
      { week: 'Thu', focus: 'Strength training', tasks: 'Upper/lower split or full body (30–45 min)', notes: '' },
      { week: 'Fri', focus: 'Cardio', tasks: '30 min walk + 15 min HIIT (optional)', notes: 'Add HIIT only after 4 weeks' },
      { week: 'Sat', focus: 'Active lifestyle', tasks: 'Walk 8,000+ steps, sport, recreational activity', notes: 'Keep it enjoyable' },
      { week: 'Sun', focus: 'Meal prep + weigh-in', tasks: 'Weigh in (same time), prep meals for the week', notes: 'Weigh once weekly only' },
    ]

    return {
      headline: `${tolose.toFixed(1)}kg to lose · ${weeksNeeded} weeks · Target: ${completionDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`,
      subheadline: `${targetCalories} kcal/day target · ${proteinTarget}g protein · Current BMI: ${bmi.toFixed(1)} → Target BMI: ${targetBmi.toFixed(1)}`,
      stats: [
        { label: 'Weight to Lose', value: `${tolose.toFixed(1)} kg` },
        { label: 'Time to Goal', value: `${weeksNeeded} weeks` },
        { label: 'Daily Calorie Target', value: `${targetCalories} kcal` },
        { label: 'Daily Protein Target', value: `${proteinTarget}g` },
        { label: 'TDEE (maintenance)', value: `${tdee} kcal` },
        { label: 'Weekly Deficit', value: `${Math.round(dailyDeficit * 7)} kcal` },
      ],
      milestones,
      weeklySchedule,
      checklists: [
        {
          title: 'Week 1 Launch Checklist',
          items: [
            'Take starting photos and measurements (waist, hips, chest)',
            `Set up calorie tracking app with ${targetCalories} kcal daily target`,
            `Set protein goal: ${proteinTarget}g per day`,
            'Weigh and log all food for the first 2 weeks',
            'Schedule 4 exercise sessions in calendar',
            'Set up weekly weigh-in: same day, same time, same conditions',
            'Clear the house of processed snack foods',
            'Plan and prep meals for the first 3 days',
            'Find one activity you genuinely enjoy (walking, swimming, cycling)',
            'Take measurements and record them',
          ],
        },
        {
          title: 'Daily Nutrition Habits',
          items: [
            `Stay within ${targetCalories} kcal daily`,
            `Hit ${proteinTarget}g protein to preserve muscle`,
            'Drink 2.5 litres of water daily',
            'Eat vegetables at every meal',
            'No eating after 8pm',
            'Limit alcohol — 400+ kcal per evening easily wrecked',
            'Eat slowly — take 20 minutes per meal',
          ],
        },
      ],
      recommendations: [
        `At ${weeklyLoss}kg/week, your ${targetCalories} kcal target creates the right deficit without being too aggressive.`,
        `Protein is critical — ${proteinTarget}g/day preserves muscle while losing fat. Prioritise chicken, fish, eggs, legumes.`,
        bmi > 30 ? 'At your current BMI, even 5% weight loss will significantly improve health markers.' : '',
        'Weigh yourself only once per week — daily fluctuations of 1–2kg from water are normal and misleading.',
        `Sleep 7–8 hours. Sleep deprivation increases ghrelin (hunger hormone) by 24% and sabotages fat loss.`,
      ].filter(Boolean) as string[],
      nextActions: [
        'Download MyFitnessPal or Cronometer and set up your calorie goal today',
        'Plan tomorrow\'s meals tonight — meal planning prevents 90% of bad food decisions',
        `Schedule your first 4 workout sessions in your calendar this week`,
        'Take starting photos and measurements now (you\'ll thank yourself later)',
        'Tell one person about your goal for accountability',
      ],
    }
  },
}

export default weightLossRoadmap
