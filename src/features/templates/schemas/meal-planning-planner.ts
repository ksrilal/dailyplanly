import type { Template } from '@/features/templates/types'

export const mealPlanningPlannerTemplate: Template = {
  id: 'tpl-010',
  slug: 'meal-planning-planner',
  title: 'Meal Planning Planner',
  description: 'Plan a full week of balanced meals, generate your shopping list automatically, prep smarter on Sundays, and build nutrition habits that support your health goals effortlessly.',
  category: 'health-wellness',
  type: 'planner',
  featured: false,
  tags: ['meal planning', 'nutrition', 'food', 'cooking', 'health'],
  previewImage: '/templates/previews/meal-planning-planner.png',
  plannerDefaults: {
    theme: 'soft-paper',
    orientation: 'landscape',
    paperSize: 'A4',
    blocks: [
      {
        id: 'b1', type: 'table', label: 'Weekly Meal Plan', order: 0, width: 'full',
        content: {
          headers: ['Day', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Calories'],
          rows: [
            ['Monday', 'Greek yoghurt + granola + berries', 'Grilled chicken salad + olive oil', 'Salmon + roasted veg + quinoa', 'Apple + almonds', '~1,800'],
            ['Tuesday', 'Oat porridge + banana + honey', 'Lentil soup + wholegrain roll', 'Turkey stir-fry + brown rice', 'Hummus + carrots', '~1,750'],
            ['Wednesday', 'Scrambled eggs + wholegrain toast', 'Quinoa bowl + chickpeas + avocado', 'Chicken curry + cauliflower rice', 'Protein shake', '~1,820'],
            ['Thursday', 'Smoothie: spinach + banana + protein', 'Tuna wrap + side salad', 'Beef steak + sweet potato + greens', 'Rice cakes + peanut butter', '~1,900'],
            ['Friday', 'Overnight oats + chia seeds', 'Roasted veg soup + seeds', 'Baked cod + couscous + broccoli', 'Fruit bowl', '~1,750'],
            ['Saturday', 'Avocado toast + poached eggs', 'Leftover curry + naan', 'Home-made pizza on cauliflower base', 'Dark chocolate + nuts', '~1,950'],
            ['Sunday', 'Pancakes + berries + maple syrup', 'Roast chicken + veg + potatoes', 'Light soup + sourdough', 'Greek yoghurt', '~2,000'],
          ]
        }
      },
      {
        id: 'b2', type: 'table', label: 'Shopping List', order: 1, width: 'half',
        content: {
          headers: ['Item', 'Quantity', 'Category', 'Bought'],
          rows: [
            ['Chicken breasts', '1.5 kg', 'Protein', ''],
            ['Salmon fillets', '4 pieces', 'Protein', ''],
            ['Greek yoghurt', '1 kg', 'Dairy', ''],
            ['Rolled oats', '1 kg', 'Grains', ''],
            ['Brown rice', '500 g', 'Grains', ''],
            ['Quinoa', '400 g', 'Grains', ''],
            ['Broccoli', '2 heads', 'Vegetables', ''],
            ['Spinach', '200 g bag', 'Vegetables', ''],
            ['Sweet potato', '1 kg', 'Vegetables', ''],
            ['Avocados', '4', 'Fruit/Fat', ''],
            ['Bananas', '6', 'Fruit', ''],
            ['Almonds', '200 g', 'Snacks', ''],
          ]
        }
      },
      {
        id: 'b3', type: 'habit-tracker', label: 'Nutrition Habits', order: 2, width: 'half',
        content: {
          habits: [
            { label: 'Eat at least 5 veg portions' },
            { label: 'Hit protein target (120g+)' },
            { label: 'Drink 2.5L water' },
            { label: 'No takeaway this week' },
            { label: 'Meal prep on Sunday' },
          ],
          days: 7
        }
      },
      {
        id: 'b4', type: 'dashboard-card', label: 'Calorie Target', order: 3, width: 'half',
        content: { title: 'Daily Calorie Target', value: '1,800', unit: 'kcal', note: 'Adjust based on activity level' }
      },
      {
        id: 'b5', type: 'notes', label: 'Meal Prep Notes', order: 4, width: 'half',
        content: { lines: 6, text: '' }
      },
    ]
  }
}
