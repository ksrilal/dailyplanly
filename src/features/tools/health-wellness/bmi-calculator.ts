import type { Tool } from '../types'

const bmiCalculator: Tool = {
  id: 'bmi-calculator',
  slug: 'bmi-calculator',
  title: 'BMI Calculator & Wellness Plan',
  description: 'Calculate your BMI and get a personalised wellness action plan with health targets, daily habits, and a 12-week improvement roadmap.',
  category: 'health-wellness',
  icon: 'Scale',
  featured: true,
  tags: ['bmi', 'weight', 'health', 'wellness', 'body mass index'],
  relatedTemplateSlug: 'weight-loss-planner',
  relatedTemplateCategory: 'health-wellness',
  inputs: [
    { id: 'weight', type: 'number', label: 'Weight', placeholder: '75', unit: 'kg', min: 20, max: 300, step: 0.5, required: true, defaultValue: 75 },
    { id: 'height', type: 'number', label: 'Height', placeholder: '175', unit: 'cm', min: 100, max: 250, step: 1, required: true, defaultValue: 175 },
    { id: 'age', type: 'number', label: 'Age', placeholder: '30', unit: 'years', min: 16, max: 100, step: 1, required: true, defaultValue: 30 },
    { id: 'sex', type: 'select', label: 'Biological Sex', required: true, defaultValue: 'male', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] },
    { id: 'goal', type: 'select', label: 'Health Goal', required: true, defaultValue: 'improve',
      options: [
        { label: 'Lose weight & improve fitness', value: 'lose' },
        { label: 'Maintain current weight', value: 'maintain' },
        { label: 'Gain healthy muscle', value: 'gain' },
        { label: 'Just check my BMI', value: 'check' },
      ] },
  ],
  generate(inputs) {
    const weight = Number(inputs.weight) || 75
    const height = Number(inputs.height) || 175
    const age = Number(inputs.age) || 30
    const sex = String(inputs.sex || 'male')
    const goal = String(inputs.goal || 'improve')

    const bmi = weight / ((height / 100) ** 2)
    const heightM = height / 100

    const category =
      bmi < 18.5 ? 'Underweight' :
      bmi < 25 ? 'Healthy Weight' :
      bmi < 30 ? 'Overweight' : 'Obese'

    const healthyMin = Math.round(18.5 * heightM * heightM * 10) / 10
    const healthyMax = Math.round(24.9 * heightM * heightM * 10) / 10
    const idealWeight = Math.round(((healthyMin + healthyMax) / 2) * 10) / 10
    const weightDiff = Math.round((weight - idealWeight) * 10) / 10

    const bmiColor = bmi < 18.5 ? 'Below range' : bmi < 25 ? 'In healthy range' : bmi < 30 ? 'Above range' : 'Well above range'

    const weeklySchedule = [
      { week: 'Week 1–2', focus: 'Establish baseline', tasks: 'Daily 30-min walk · track calories · weigh weekly', notes: 'Build the habit first' },
      { week: 'Week 3–4', focus: 'Add structure', tasks: '3× strength sessions + 3× cardio per week', notes: 'Progress over perfection' },
      { week: 'Week 5–8', focus: 'Consistency phase', tasks: 'Maintain exercise schedule · refine nutrition', notes: 'This is where change compounds' },
      { week: 'Week 9–12', focus: 'Results & review', tasks: 'Reassess BMI · adjust targets · celebrate progress', notes: 'Plan next 12 weeks' },
    ]

    const goalRecommendations: Record<string, string[]> = {
      lose: [`Aim for a 300–500 kcal daily deficit — lose 0.5kg/week sustainably`, 'Prioritise protein (${Math.round(weight * 1.8)}g/day) to preserve muscle', 'Combine cardio with strength training for best results', 'Weigh yourself weekly, not daily — daily fluctuations are misleading'],
      maintain: ['Continue current activity level and eating habits', 'Monitor weight monthly — a 2kg range is normal', 'Focus on nutrition quality, not just quantity', 'Add 150 min of moderate exercise weekly if not already'],
      gain: [`Eat 200–300 kcal above maintenance daily`, 'Lift weights 3–4× per week, progressive overload', `Aim for ${Math.round(weight * 2)}g protein/day`, 'Sleep 8 hours — muscle is built during recovery'],
      check: ['Your BMI is one indicator — waist circumference and body fat % matter too', 'A BMI of 18.5–24.9 is the healthy range', 'BMI doesn\'t account for muscle mass or bone density'],
    }

    return {
      headline: `BMI: ${bmi.toFixed(1)} — ${category}`,
      subheadline: `${bmiColor} · Healthy range for your height: ${healthyMin}–${healthyMax} kg · Ideal weight: ~${idealWeight} kg`,
      stats: [
        { label: 'Your BMI', value: bmi.toFixed(1), note: category },
        { label: 'BMI Category', value: category },
        { label: 'Healthy Weight Range', value: `${healthyMin}–${healthyMax} kg` },
        { label: 'Ideal Weight', value: `~${idealWeight} kg` },
        { label: 'Difference', value: weightDiff > 0 ? `${weightDiff} kg above ideal` : weightDiff < 0 ? `${Math.abs(weightDiff)} kg below ideal` : 'At ideal weight!' },
        { label: 'Height', value: `${height} cm` },
      ],
      milestones: bmi < 25 ? [
        { label: 'Maintain healthy BMI for 3 months', date: 'Month 3' },
        { label: 'Build consistent exercise routine', date: 'Month 1' },
        { label: 'Annual health check completed', date: 'This year' },
      ] : [
        { label: `Reach BMI 28 (${Math.round(28 * heightM * heightM * 10) / 10} kg)`, date: 'Month 2' },
        { label: `Reach BMI 25 (${Math.round(25 * heightM * heightM * 10) / 10} kg)`, date: 'Month 4–6' },
        { label: `Reach healthy BMI range (${healthyMin}–${healthyMax} kg)`, date: 'Month 8–12' },
        { label: 'Maintain for 3+ months', date: 'Month 12+' },
      ],
      weeklySchedule,
      checklists: [{
        title: '12-Week Wellness Checklist',
        items: [
          'Take starting measurements (weight, waist, hips)',
          'Set up calorie tracking app',
          'Schedule 4 exercise sessions per week in calendar',
          'Plan weekly meals on Sunday',
          'Set up weekly weigh-in (same day, same time)',
          'Drink 2.5 litres of water daily',
          'Sleep 7–8 hours every night',
          'Take progress photos monthly',
          'Book annual health check with GP',
          'Reassess BMI at week 12',
        ],
      }],
      recommendations: goalRecommendations[goal] || goalRecommendations.check,
      nextActions: [
        bmi >= 25 ? `Target: reach ${idealWeight}kg (BMI 22) — use the Weight Loss Roadmap tool for a full plan` : 'Maintain your healthy weight with consistent habits',
        'Track your nutrition for the next 7 days to understand your baseline',
        'Schedule exercise sessions in your calendar this week',
        'Book a health check with your doctor if BMI is above 30',
      ],
    }
  },
}

export default bmiCalculator
