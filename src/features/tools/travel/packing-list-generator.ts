import type { Tool } from '../types'

const packingListGenerator: Tool = {
  id: 'packing-list-generator',
  slug: 'packing-list-generator',
  title: 'Packing List Generator',
  description: 'Generate a personalised packing list for any trip based on destination climate, trip length, and activities. Never forget an essential item again.',
  category: 'travel',
  icon: 'Luggage',
  tags: ['packing', 'travel', 'checklist', 'luggage', 'holiday', 'trip'],
  relatedTemplateSlug: 'travel-packing',
  relatedTemplateCategory: 'travel-events',
  inputs: [
    { id: 'climate', type: 'select', label: 'Destination Climate', required: true, defaultValue: 'warm',
      options: [
        { label: 'Hot & sunny (beach / tropical)', value: 'hot' },
        { label: 'Warm (Mediterranean / city in summer)', value: 'warm' },
        { label: 'Mild (temperate / European city)', value: 'mild' },
        { label: 'Cold (ski / winter / northern)', value: 'cold' },
        { label: 'Varied (multiple climates)', value: 'varied' },
      ] },
    { id: 'days', type: 'number', label: 'Trip Length', placeholder: '7', unit: 'days', min: 1, max: 90, step: 1, required: true, defaultValue: 7 },
    { id: 'bagType', type: 'select', label: 'Luggage Type', required: false, defaultValue: 'suitcase',
      options: [
        { label: 'Carry-on only (under 10kg)', value: 'carryon' },
        { label: 'One checked suitcase', value: 'suitcase' },
        { label: 'Backpack (travel / hiking)', value: 'backpack' },
        { label: 'Multiple bags (family trip)', value: 'family' },
      ] },
    { id: 'activities', type: 'select', label: 'Primary Activities', required: false, defaultValue: 'city',
      options: [
        { label: 'Beach / swimming', value: 'beach' },
        { label: 'City sightseeing / cultural', value: 'city' },
        { label: 'Hiking / outdoor adventure', value: 'hiking' },
        { label: 'Business travel', value: 'business' },
        { label: 'Mixed activities', value: 'mixed' },
      ] },
    { id: 'hasMedication', type: 'select', label: 'Do You Take Regular Medication?', required: false, defaultValue: 'no',
      options: [{ label: 'No', value: 'no' }, { label: 'Yes', value: 'yes' }] },
  ],
  generate(inputs) {
    const climate = String(inputs.climate || 'warm')
    const days = Number(inputs.days) || 7
    const bagType = String(inputs.bagType || 'suitcase')
    const activities = String(inputs.activities || 'city')
    const hasMedication = String(inputs.hasMedication || 'no')

    const clothingItems = () => {
      const base = [`T-shirts / tops (${Math.min(days, 7)} — wash mid-trip if longer)`, `Underwear (${Math.min(days + 2, 10)})`, `Socks (${Math.min(days + 2, 10)})`]
      if (climate === 'cold') return [...base, 'Thermal base layers (2 sets)', 'Warm jumper or fleece (2)', 'Winter coat / parka', 'Scarf, hat, and gloves', 'Waterproof jacket', 'Jeans or warm trousers (2)']
      if (climate === 'hot' || climate === 'warm') return [...base, 'Shorts (3)', 'Lightweight trousers (2)', 'Light dress or smart casual outfit', 'Sandals or flip-flops', activities === 'beach' ? 'Swimwear (2)' : '', 'Light cardigan for evenings'].filter(Boolean) as string[]
      return [...base, 'Jeans or trousers (2)', 'Light jumper or cardigan (2)', 'Waterproof jacket', activities === 'city' ? 'One smart outfit for dining' : ''].filter(Boolean) as string[]
    }

    const footwear = () => {
      const base = ['Comfortable walking shoes or trainers']
      if (activities === 'hiking') return [...base, 'Hiking boots (waterproof)', 'Sandals for camp / evenings']
      if (activities === 'beach') return [...base, 'Flip-flops or sandals', 'One smarter pair for evenings']
      if (activities === 'business') return [...base, 'Smart shoes or heels', 'Comfortable casual shoes']
      return [...base, 'Sandals or casual shoes', 'One smarter pair']
    }

    const toiletries = ['Toothbrush + toothpaste', 'Deodorant', 'Shampoo + conditioner (travel size)', 'Body wash (travel size)', 'Moisturiser + lip balm', 'Razor', climate === 'hot' || climate === 'warm' ? 'Sunscreen (SPF 50+)' : '', activities === 'beach' ? 'After-sun lotion' : '', 'Feminine hygiene products (if applicable)'].filter(Boolean) as string[]

    const documents = ['Passport (valid 6+ months)', 'Travel insurance documents', 'Flight tickets (printed + digital)', 'Hotel booking confirmations', 'Travel visa (if required)', 'Travel money / cards', 'Emergency contact list', 'Driving licence (if renting a car)']

    const electronics = ['Phone + charger', 'Power bank (fully charged)', 'Universal travel adapter', 'Earphones or headphones', bagType !== 'carryon' ? 'Laptop or tablet (if needed)' : '', 'Camera (if applicable)', 'Downloaded offline maps and entertainment'].filter(Boolean) as string[]

    const medical = ['Basic first aid kit (plasters, antiseptic)', 'Paracetamol and ibuprofen', 'Antihistamines', 'Anti-diarrhoea tablets', 'Blister plasters (for walking trips)', hasMedication === 'yes' ? '⚠️ ALL prescription medication — enough for full trip + 5 days extra' : '', hasMedication === 'yes' ? 'Doctor\'s letter for prescription medication' : ''].filter(Boolean) as string[]

    const bagTypeTips: Record<string, string[]> = {
      carryon: ['Roll clothes (don\'t fold) — saves 30% space', 'Use vacuum packing bags', 'Wear your bulkiest item on the plane', 'Liquids: 100ml max in a clear bag', 'Check airline dimensions — they vary significantly'],
      suitcase: ['Pack heavy items at the bottom (wheels end)', 'Use packing cubes to organise categories', 'Weigh before you leave — check your airline\'s limit', 'Leave 20% space for shopping and souvenirs'],
      backpack: ['Keep at or under 10kg — you\'ll carry this all day', 'Pack in reverse order — first things needed go in last', 'Use the "wear + 3 day" principle for clothing', 'Quick-dry clothing is essential'],
      family: ['One bag per family member — teach children to carry their own', 'Colour-code or label bags by person', 'Pack a "day bag" accessible in-cabin for the journey', 'Always pack a change of clothes in carry-on for each person'],
    }

    return {
      headline: `Packing list — ${days}-day ${climate} ${activities} trip · ${bagType.replace(/-/g, ' ')}`,
      subheadline: `${clothingItems().length + footwear().length + toiletries.length + documents.length + electronics.length + medical.length} items across ${climate} climate conditions`,
      stats: [
        { label: 'Trip Length', value: `${days} days` },
        { label: 'Climate', value: climate.charAt(0).toUpperCase() + climate.slice(1) },
        { label: 'Activities', value: activities.charAt(0).toUpperCase() + activities.slice(1) },
        { label: 'Luggage Type', value: bagType === 'carryon' ? 'Carry-on only' : bagType.charAt(0).toUpperCase() + bagType.slice(1) },
        { label: 'Clothing Items', value: `${clothingItems().length + footwear().length}` },
        { label: 'Total Items', value: `${clothingItems().length + footwear().length + toiletries.length + documents.length + electronics.length + medical.length}` },
      ],
      milestones: [
        { label: 'Packing list reviewed', date: '1 week before' },
        { label: 'All items laid out on bed', date: '2 days before' },
        { label: 'Packed and weighed', date: 'Night before' },
        { label: 'Final check — passport, tickets, money', date: 'Morning of departure' },
      ],
      weeklySchedule: [
        { week: '1 week before', focus: 'Prepare', tasks: 'Check this list · buy any missing items · wash clothes you\'re taking', notes: 'Don\'t leave shopping to the last day' },
        { week: '2 days before', focus: 'Lay out everything', tasks: 'Spread all items on bed · edit down · check climate forecast', notes: 'You\'ll always find 20% you don\'t need' },
        { week: 'Night before', focus: 'Pack and weigh', tasks: 'Pack methodically · weigh bag · charge all electronics', notes: 'Lay out tomorrow\'s travel outfit' },
        { week: 'Morning of', focus: 'Final check', tasks: 'Passport · tickets · money · phone charged', notes: 'Leave 30 min earlier than you think you need' },
      ],
      checklists: [
        { title: '👕 Clothing', items: clothingItems() },
        { title: '👟 Footwear', items: footwear() },
        { title: '🧴 Toiletries', items: toiletries },
        { title: '📄 Documents & Money', items: documents },
        { title: '🔌 Electronics', items: electronics },
        { title: '💊 Health & Medical', items: medical },
        { title: `🧳 ${bagType.charAt(0).toUpperCase() + bagType.slice(1)} Packing Tips`, items: bagTypeTips[bagType] || bagTypeTips.suitcase },
      ],
      recommendations: [
        bagType === 'carryon' ? 'Carry-on only: you\'ll thank yourself at baggage claim. Roll don\'t fold, and wear your heaviest items.' : 'Suitcase: pack with 20% spare capacity — you will buy things.',
        climate === 'cold' ? 'Layer up: thermal base + mid layer + outer shell. This system handles any cold weather condition.' : climate === 'hot' ? 'Light, breathable fabrics (linen, bamboo). Sunscreen is non-negotiable.' : '',
        'The golden packing rule: lay everything out, then put half back. You never need as much as you think.',
        `For ${days} days: ${days <= 7 ? 'you can pack light — 5 tops covers most scenarios with laundry' : 'plan to do laundry mid-trip — most hotels and hostels have it'}.`,
      ].filter(Boolean) as string[],
      nextActions: [
        'Print or save this list and start collecting items now',
        'Order any missing items online with time for delivery',
        'Set a "pack your bag" reminder for 2 days before departure',
        'Check passport expiry and visa requirements today',
      ],
    }
  },
}

export default packingListGenerator
