import type { Tool } from '../types'
import { CURRENCY_INPUT, sym } from '../finance/_currency'

const groceryPlanningAssistant: Tool = {
  id: 'grocery-planning-assistant',
  slug: 'grocery-planning-assistant',
  title: 'Grocery Planning Assistant',
  description: 'Plan your weekly grocery shop intelligently. Set your household size, budget, and dietary needs to get a structured meal plan, categorised shopping list, and money-saving tips.',
  category: 'family-home',
  icon: 'ShoppingCart',
  tags: ['grocery', 'meal planning', 'shopping', 'food', 'budget', 'family'],
  relatedTemplateSlug: 'meal-planning-planner',
  relatedTemplateCategory: 'health-wellness',
  inputs: [
    CURRENCY_INPUT,
    { id: 'people', type: 'number', label: 'People to Shop For', placeholder: '4', min: 1, max: 12, step: 1, required: true, defaultValue: 4 },
    { id: 'weeklyBudget', type: 'number', label: 'Weekly Grocery Budget', placeholder: '100', min: 0, step: 10, required: true, defaultValue: 100 },
    { id: 'diet', type: 'select', label: 'Dietary Style', required: false, defaultValue: 'omnivore',
      options: [
        { label: 'Omnivore (meat, fish, everything)', value: 'omnivore' },
        { label: 'Vegetarian', value: 'vegetarian' },
        { label: 'Vegan', value: 'vegan' },
        { label: 'Flexitarian (mostly plant-based)', value: 'flexitarian' },
      ] },
    { id: 'cookingTime', type: 'select', label: 'Available Cooking Time', required: false, defaultValue: 'moderate',
      options: [
        { label: 'Minimal (under 20 min per meal)', value: 'minimal' },
        { label: 'Moderate (20–45 min per meal)', value: 'moderate' },
        { label: 'Enjoy cooking (45+ min, batch cook)', value: 'enjoy' },
      ] },
  ],
  generate(inputs) {
    const currency = String(inputs.currency || 'GBP')
    const S = sym(currency)
    const people = Number(inputs.people) || 4
    const weeklyBudget = Number(inputs.weeklyBudget) || 100
    const diet = String(inputs.diet || 'omnivore')
    const cookingTime = String(inputs.cookingTime || 'moderate')

    const perPersonBudget = weeklyBudget / people
    const dailyPerPerson = perPersonBudget / 7

    const proteinSuggestions: Record<string, string[]> = {
      omnivore: ['Chicken breast or thighs', 'Minced beef or turkey', 'Salmon or white fish fillets', 'Eggs (dozen)', 'Greek yoghurt'],
      vegetarian: ['Eggs (dozen)', 'Halloumi or cheese', 'Greek yoghurt', 'Lentils (dried or tinned)', 'Tofu or tempeh'],
      vegan: ['Tinned chickpeas and lentils', 'Tofu or tempeh', 'Mixed beans', 'Edamame', 'Soy or oat milk'],
      flexitarian: ['Chicken (2 nights)', 'Salmon (1 night)', 'Eggs', 'Tinned legumes', 'Halloumi'],
    }

    const carbSuggestions = ['Brown rice or basmati rice', 'Pasta (whole wheat)', 'Rolled oats', 'Wholegrain bread', 'Sweet potatoes', 'Quinoa']
    const vegSuggestions = ['Broccoli', 'Spinach or kale', 'Bell peppers (mixed)', 'Carrots', 'Courgettes', 'Cherry tomatoes', 'Cucumber', 'Onions']
    const fruitSuggestions = ['Bananas', 'Apples', 'Berries (frozen if budget)', 'Avocados', 'Oranges']

    const mealIdeas: Record<string, string[]> = {
      omnivore: ['Chicken stir-fry + rice', 'Bolognese + pasta', 'Salmon + roasted veg', 'Omelette + salad', 'Chicken soup', 'Bean chilli + rice', 'Steak + sweet potato'],
      vegetarian: ['Veggie pasta bake', 'Lentil dahl + rice', 'Halloumi + roasted veg', 'Egg fried rice', 'Vegetable curry', 'Bean burger + salad', 'Frittata + bread'],
      vegan: ['Chickpea curry + rice', 'Tofu stir-fry + noodles', 'Lentil soup + bread', 'Black bean tacos', 'Pasta arrabbiata', 'Veg tagine + couscous', 'Buddha bowl'],
      flexitarian: ['Chicken stir-fry', 'Lentil soup', 'Salmon + veg', 'Veggie pasta', 'Bean curry', 'Egg fried rice', 'Tofu noodles'],
    }

    const meals = mealIdeas[diet] || mealIdeas.omnivore
    const proteins = proteinSuggestions[diet] || proteinSuggestions.omnivore

    const weeklySchedule = meals.slice(0, 7).map((meal, i) => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      return {
        week: days[i],
        focus: meal,
        tasks: `Prep: ${cookingTime === 'minimal' ? '15 min' : cookingTime === 'moderate' ? '30 min' : '45 min'}`,
        notes: i === 5 || i === 6 ? 'Weekend — more time for batch cooking' : i === 2 ? 'Mid-week — use leftovers or quick meal' : '',
      }
    })

    // Budget breakdown
    const proteinBudget = Math.round(weeklyBudget * 0.35)
    const carbBudget = Math.round(weeklyBudget * 0.15)
    const vegFruitBudget = Math.round(weeklyBudget * 0.25)
    const dairySnackBudget = Math.round(weeklyBudget * 0.15)
    const householdBudget = Math.round(weeklyBudget * 0.10)

    return {
      headline: `${S}${weeklyBudget} grocery plan for ${people} people — ${S}${perPersonBudget.toFixed(0)}/person`,
      subheadline: `${S}${dailyPerPerson.toFixed(1)}/person/day · ${diet} · ${cookingTime} cooking time`,
      stats: [
        { label: 'Weekly Budget', value: `${S}${weeklyBudget}` },
        { label: 'Per Person', value: `${S}${perPersonBudget.toFixed(0)}/week` },
        { label: 'Per Day (per person)', value: `${S}${dailyPerPerson.toFixed(1)}` },
        { label: 'Protein Budget', value: `${S}${proteinBudget}`, note: '35% of budget' },
        { label: 'Veg & Fruit', value: `${S}${vegFruitBudget}`, note: '25% of budget' },
        { label: 'Grains & Carbs', value: `${S}${carbBudget}`, note: '15% of budget' },
      ],
      milestones: [
        { label: 'First planned grocery shop completed', date: 'This week' },
        { label: 'Under budget for the first time', date: 'Week 2' },
        { label: 'Meal planning habit established', date: 'Month 1' },
        { label: 'Food waste reduced by 50%', date: 'Month 2' },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Weekly Shopping List',
          items: [
            '── PROTEINS ──',
            ...proteins,
            '── GRAINS & CARBS ──',
            ...carbSuggestions.slice(0, 4),
            '── VEGETABLES ──',
            ...vegSuggestions.slice(0, 6),
            '── FRUIT ──',
            ...fruitSuggestions.slice(0, 3),
            '── HOUSEHOLD ──',
            'Washing-up liquid', 'Toilet roll', 'Any cleaning supplies',
          ],
        },
        {
          title: 'Money-Saving Checklist',
          items: [
            'Plan meals before shopping — prevents impulse buys',
            'Shop with a list and stick to it',
            'Buy seasonal fruit and vegetables — 40% cheaper',
            'Buy own-brand for basics (pasta, rice, tinned goods)',
            'Use frozen vegetables — same nutrition, half the cost',
            'Batch cook and freeze portions for busy weeks',
            'Check the "reduced" section before buying full-price',
            'Don\'t shop hungry — spend 20% more when hungry',
          ],
        },
      ],
      recommendations: [
        `${S}${perPersonBudget.toFixed(0)}/person/week is ${perPersonBudget >= 35 ? 'a comfortable grocery budget' : perPersonBudget >= 20 ? 'workable — buy own-brand and frozen produce' : 'very tight — focus on beans, lentils, oats, and seasonal veg'}.`,
        'Meal planning before shopping reduces food waste by 30–40% and consistently lowers the bill.',
        cookingTime === 'minimal' ? 'With limited cooking time, batch cooking on Sunday for 90 minutes feeds you well all week.' : 'Batch cooking is the most powerful money and time saver — cook double and freeze half.',
        'The cheapest proteins: eggs, tinned fish, lentils, beans. Build meals around these to reduce costs.',
      ],
      nextActions: [
        'Plan this week\'s 7 dinners right now',
        `Write your shopping list based on those meals — budget: ${S}${weeklyBudget}`,
        'Order online or plan your supermarket trip time',
        'Batch cook on Sunday — save 3 nights of cooking',
      ],
    }
  },
}

export default groceryPlanningAssistant
