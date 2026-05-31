export const CURRENCY_OPTIONS = [
  { label: 'Select currency…', value: '' },
  { label: 'GBP (£) — British Pound', value: 'GBP' },
  { label: 'USD ($) — US Dollar', value: 'USD' },
  { label: 'EUR (€) — Euro', value: 'EUR' },
  { label: 'INR (₹) — Indian Rupee', value: 'INR' },
  { label: 'LKR (Rs) — Sri Lankan Rupee', value: 'LKR' },
  { label: 'CNY (¥) — Chinese Yuan', value: 'CNY' },
  { label: 'AED (AED) — UAE Dirham', value: 'AED' },
  { label: 'SAR (SAR) — Saudi Riyal', value: 'SAR' },
  { label: 'OMR (OMR) — Omani Rial', value: 'OMR' },
  { label: 'CAD (CA$) — Canadian Dollar', value: 'CAD' },
  { label: 'AUD (A$) — Australian Dollar', value: 'AUD' },
  { label: 'SGD (S$) — Singapore Dollar', value: 'SGD' },
  { label: 'JPY (¥) — Japanese Yen', value: 'JPY' },
  { label: 'KWD (KWD) — Kuwaiti Dinar', value: 'KWD' },
  { label: 'QAR (QAR) — Qatari Riyal', value: 'QAR' },
  { label: 'BDT (৳) — Bangladeshi Taka', value: 'BDT' },
  { label: 'PKR (₨) — Pakistani Rupee', value: 'PKR' },
  { label: 'MYR (RM) — Malaysian Ringgit', value: 'MYR' },
  { label: 'NGN (₦) — Nigerian Naira', value: 'NGN' },
]

export const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: '£', USD: '$', EUR: '€', INR: '₹',
  LKR: 'Rs ', CNY: '¥', AED: 'AED ', SAR: 'SAR ',
  OMR: 'OMR ', CAD: 'CA$', AUD: 'A$', SGD: 'S$',
  JPY: '¥', KWD: 'KWD ', QAR: 'QAR ', BDT: '৳',
  PKR: '₨', MYR: 'RM ', NGN: '₦',
}

export function sym(currency: string): string {
  if (!currency) return ''
  return CURRENCY_SYMBOLS[currency] ?? (currency + ' ')
}

export const CURRENCY_INPUT = {
  id: 'currency',
  type: 'select' as const,
  label: 'Currency',
  required: false,
  defaultValue: '',
  options: CURRENCY_OPTIONS,
}
