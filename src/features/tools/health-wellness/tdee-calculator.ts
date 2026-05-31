import type { Tool } from '../types'

const tdeeCalculator: Tool = {
  id: 'tdee-calculator',
  slug: 'tdee-calculator',
  title: 'TDEE Calculator & Calorie Planner',
  description: 'Calculate your Total Daily Energy Expenditure (TDEE) and get personalised calorie targets, macro splits, and a weekly nutrition plan for your specific goal.',
  category: 'health-wellness',
  icon: 'Flame',
  featured: true,
  tags: ['tdee', 'calories', 'nutrition', 'macros', 'metabolism', 'diet'],
  relatedTemplateSlug: 'meal-planning-planner',
  relatedTemplateCategory: 'health-wellness',
  inputs: [
    { id: 'weight', type: 'number', label: 'Weight', placeholder: '75', unit: 'kg', min: 30, max: 300, step: 0.5, required: true, defaultValue: 75 },
    { id: 'height', type: 'number', label: 'Height', placeholder: '175', unit: 'cm', min: 100, max: 250, step: 1, required: true, defaultValue: 175 },
    { id: 'age', type: 'number', label: 'Age', unit: 'years', min: 16, max: 100, step: 1, required: true, defaultValue: 28, placeholder: '28' },
    { id: 'sex', type: 'select', label: 'Biological Sex', required: true, defaultValue: 'male', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
    { id: 'activity', type: 'select', label: 'Activity Level', required: true, defaultValue: 'moderate',
      options: [
        { label: 'Sedentary (desk job, little exercise)', value: 'sedentary' },
        { label: 'Lightly active (1–3 exercise days/week)', value: 'light' },
        { label: 'Moderately active (3–5 days/week)', value: 'moderate' },
        { label: 'Very active (6–7 hard days/week)', value: 'active' },
        { label: 'Extra active (physical job + training)', value: 'extra' },
      ] },
    { id: 'goal', type: 'select', label: 'Goal', required: true, defaultValue: 'lose',
      options: [
        { label: 'Lose weight (0.5 kg/week)', value: 'lose' },
        { label: 'Lose weight fast (1 kg/week)', value: 'lose-fast' },
        { label: 'Maintain weight', value: 'maintain' },
        { label: 'Gain muscle (lean bulk)', value: 'gain' },
      ] },
  ],
  generate(inputs) {
    const weight = Number(inputs.weight) || 75
    const height = Number(inputs.height) || 175
    const age = Number(inputs.age) || 28
    const sex = String(inputs.sex || 'male')
    const activity = String(inputs.activity || 'moderate')
    const goal = String(inputs.goal || 'lose')

    const bmr = sex === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161

    const multipliers: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, extra: 1.9 }
    const tdee = Math.round(bmr * (multipliers[activity] || 1.55))

    const targetCalories =
      goal === 'lose' ? tdee - 500 :
      goal === 'lose-fast' ? tdee - 1000 :
      goal === 'gain' ? tdee + 300 :
      tdee

    const protein = Math.round(weight * (goal === 'gain' ? 2.2 : goal.startsWith('lose') ? 2.0 : 1.8))
    const fat = Math.round(targetCalories * 0.25 / 9)
    const carbs = Math.round((targetCalories - protein * 4 - fat * 9) / 4)

    const activityLabels: Record<string, string> = { sedentary: 'Sedentary', light: 'Lightly Active', moderate: 'Moderately Active', active: 'Very Active', extra: 'Extra Active' }
    const goalLabels: Record<string, string> = { lose: 'Weight Loss', 'lose-fast': 'Aggressive Loss', maintain: 'Maintenance', gain: 'Muscle Gain' }

    const weeklySchedule = [
      { week: 'Monday', focus: 'High protein day', tasks: `${targetCalories} kcal · ${protein}g protein · meal prep for week`, notes: 'Prep food in bulk' },
      { week: 'Tuesday', focus: 'Standard eating day', tasks: `Hit ${targetCalories} kcal target · 3 meals + 1 snack`, notes: '' },
      { week: 'Wednesday', focus: 'Refuel if training', tasks: `+100–200 kcal on training days`, notes: 'Earn extra carbs with exercise' },
      { week: 'Thursday', focus: 'Standard eating day', tasks: `${targetCalories} kcal · focus on vegetable intake`, notes: '5+ portions veg' },
      { week: 'Friday', focus: 'Flexible day', tasks: `Stay within ${targetCalories + 200} kcal — allow one social meal`, notes: 'Balance, not perfection' },
      { week: 'Saturday', focus: 'Meal prep day', tasks: 'Cook batch meals for next week · grocery shop', notes: 'Prep removes daily decisions' },
      { week: 'Sunday', focus: 'Review week', tasks: 'Log average calories for the week · weigh in', notes: 'Weekly trend matters, not daily' },
    ]

    return {
      headline: `Your TDEE: ${tdee.toLocaleString()} kcal/day · Target: ${targetCalories.toLocaleString()} kcal/day`,
      subheadline: `${goalLabels[goal]} · ${activityLabels[activity]} · BMR: ${Math.round(bmr).toLocaleString()} kcal`,
      stats: [
        { label: 'BMR (at complete rest)', value: `${Math.round(bmr).toLocaleString()} kcal` },
        { label: 'TDEE (maintenance)', value: `${tdee.toLocaleString()} kcal` },
        { label: 'Your Daily Target', value: `${targetCalories.toLocaleString()} kcal`, note: goalLabels[goal] },
        { label: 'Protein Target', value: `${protein}g/day`, note: `${Math.round(protein * 4)} kcal` },
        { label: 'Fat Target', value: `${fat}g/day`, note: `${Math.round(fat * 9)} kcal` },
        { label: 'Carbs Target', value: `${carbs}g/day`, note: `${Math.round(carbs * 4)} kcal` },
      ],
      milestones: [
        { label: 'Track calories consistently for 7 days', date: 'Week 1' },
        { label: 'Hit protein target daily for 14 days', date: 'Week 2' },
        { label: 'First noticeable change in energy or weight', date: 'Week 3–4' },
        { label: 'Reassess TDEE — weight changes affect it', date: 'Month 2' },
      ],
      weeklySchedule,
      checklists: [{
        title: 'Nutrition Setup Checklist',
        items: [
          `Set daily calorie goal to ${targetCalories} kcal in MyFitnessPal or Cronometer`,
          `Set protein goal: ${protein}g per day`,
          `Set fat goal: ${fat}g per day`,
          `Set carbs goal: ${carbs}g per day`,
          'Weigh food for the first 2 weeks to calibrate portion sizes',
          'Plan and log meals the night before',
          'Keep a bag of mixed nuts for protein emergency snacks',
          'Drink water before each meal — reduces overconsumption',
          'Reassess TDEE every 4–6 weeks as weight changes',
        ],
      }],
      recommendations: [
        `Your TDEE of ${tdee} kcal is the energy you burn each day at your activity level.`,
        goal === 'lose' ? `A 500 kcal deficit (${targetCalories} kcal) creates a 0.5 kg/week loss — the most sustainable rate.` :
        goal === 'lose-fast' ? `A 1,000 kcal deficit is aggressive. Ensure you eat at least 1,200 kcal (women) or 1,500 kcal (men) minimum.` :
        goal === 'gain' ? `A 300 kcal surplus maximises muscle gain while minimising fat gain — the "lean bulk" approach.` :
        'Maintenance means eating at TDEE. Track for 2 weeks to confirm your actual maintenance level.',
        `Protein is king: ${protein}g/day preserves muscle during a cut and builds it during a bulk.`,
        'Recalculate your TDEE every 4–6 weeks — as your weight changes, so does your metabolism.',
      ],
      nextActions: [
        `Set up calorie tracking app with ${targetCalories} kcal target today`,
        `Plan tomorrow\'s meals to hit ${protein}g protein`,
        'Weigh yourself tomorrow morning (fasted) to set your baseline',
        'Schedule a weekly check-in every Sunday morning',
      ],
    }
  },
}

export default tdeeCalculator
