/**
 * generate-sitemap.mjs
 * Generates public/sitemap.xml at build time.
 * Run via: node scripts/generate-sitemap.mjs
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BASE_URL = 'https://www.dailyplanly.com'
const now = new Date().toISOString()

// ─── Static pages ─────────────────────────────────────────────────────────────
const staticPages = [
  { path: '/',             priority: '1.0', freq: 'weekly'  },
  { path: '/templates',   priority: '0.9', freq: 'weekly'  },
  { path: '/tools',       priority: '0.9', freq: 'weekly'  },
  { path: '/planner/new', priority: '0.7', freq: 'monthly' },
  { path: '/checklist/new', priority: '0.7', freq: 'monthly' },
  { path: '/about',       priority: '0.5', freq: 'monthly' },
  { path: '/contact',     priority: '0.4', freq: 'monthly' },
  { path: '/privacy',     priority: '0.3', freq: 'yearly'  },
  { path: '/terms',       priority: '0.3', freq: 'yearly'  },
]

// ─── Template categories ──────────────────────────────────────────────────────
const templateCategories = [
  'productivity', 'health-wellness', 'finance', 'education',
  'lifestyle', 'family-home', 'work-office', 'travel-events',
]

// ─── Template slugs (all 65 templates) ───────────────────────────────────────
const templates = [
  // Productivity
  { category: 'productivity', slug: 'daily-planner', featured: true },
  { category: 'productivity', slug: 'weekly-planner', featured: true },
  { category: 'productivity', slug: 'monthly-planner' },
  { category: 'productivity', slug: 'goal-achievement-planner', featured: true },
  { category: 'productivity', slug: 'deep-work-planner' },
  { category: 'productivity', slug: 'time-blocking-planner' },
  // Health & Wellness
  { category: 'health-wellness', slug: 'weight-loss-planner', featured: true },
  { category: 'health-wellness', slug: 'workout-planner' },
  { category: 'health-wellness', slug: 'running-planner' },
  { category: 'health-wellness', slug: 'meal-planning-planner' },
  { category: 'health-wellness', slug: 'habit-building-planner' },
  { category: 'health-wellness', slug: 'self-care-planner' },
  // Finance
  { category: 'finance', slug: 'monthly-budget-planner', featured: true },
  { category: 'finance', slug: 'expense-tracker-planner' },
  { category: 'finance', slug: 'savings-goal-planner' },
  { category: 'finance', slug: 'debt-payoff-planner' },
  { category: 'finance', slug: 'emergency-fund-planner' },
  { category: 'finance', slug: 'investment-planning-planner' },
  // Education
  { category: 'education', slug: 'study-planner', featured: true },
  { category: 'education', slug: 'exam-preparation-planner' },
  { category: 'education', slug: 'assignment-planner' },
  { category: 'education', slug: 'reading-planner' },
  // Lifestyle
  { category: 'lifestyle', slug: 'personal-growth-planner', featured: true },
  { category: 'lifestyle', slug: 'skill-development-planner' },
  { category: 'lifestyle', slug: 'life-vision-planner' },
  // Family & Home
  { category: 'family-home', slug: 'family-schedule-planner' },
  { category: 'family-home', slug: 'household-management-planner' },
  { category: 'family-home', slug: 'home-organization-planner' },
  // Work & Office
  { category: 'work-office', slug: 'project-planning-planner', featured: true },
  { category: 'work-office', slug: 'meeting-action-planner' },
  // Travel & Events
  { category: 'travel-events', slug: 'trip-planner', featured: true },
  { category: 'travel-events', slug: 'event-day-planner' },
  { category: 'travel-events', slug: 'road-trip-planner' },
  // Checklists — flat
  { category: 'health-wellness', slug: 'morning-routine' },
  { category: 'health-wellness', slug: 'evening-routine' },
  { category: 'family-home', slug: 'grocery-shopping' },
  { category: 'finance', slug: 'monthly-bill-payment' },
  { category: 'family-home', slug: 'home-cleaning' },
  { category: 'lifestyle', slug: 'travel-packing' },
  { category: 'lifestyle', slug: 'vacation-preparation' },
  { category: 'education', slug: 'exam-day' },
  { category: 'education', slug: 'assignment-submission' },
  { category: 'family-home', slug: 'new-home-move-in' },
  { category: 'productivity', slug: 'digital-declutter' },
  { category: 'productivity', slug: 'weekend-reset' },
  { category: 'work-office', slug: 'workday-startup' },
  { category: 'work-office', slug: 'meeting-preparation' },
  { category: 'family-home', slug: 'emergency-preparedness' },
  // Checklists — nested
  { category: 'health-wellness', slug: 'weight-loss-journey', featured: true },
  { category: 'health-wellness', slug: 'complete-fitness-program' },
  { category: 'lifestyle', slug: 'personal-goal-achievement', featured: true },
  { category: 'education', slug: 'exam-preparation-system' },
  { category: 'education', slug: 'study-project-system' },
  { category: 'finance', slug: 'monthly-budget-workflow' },
  { category: 'finance', slug: 'debt-elimination-plan' },
  { category: 'family-home', slug: 'family-vacation-planning', featured: true },
  { category: 'work-office', slug: 'event-planning-system' },
  { category: 'family-home', slug: 'home-moving-system' },
  { category: 'family-home', slug: 'home-renovation-system' },
  { category: 'work-office', slug: 'job-search-system', featured: true },
  { category: 'work-office', slug: 'project-launch-system' },
  { category: 'work-office', slug: 'business-startup-system', featured: true },
  { category: 'lifestyle', slug: 'wedding-planning-system', featured: true },
  // Travel & Events
  { category: 'travel-events', slug: 'travel-bucket-list' },
  { category: 'travel-events', slug: 'solo-travel-system' },
]

// ─── Tool categories ───────────────────────────────────────────────────────────
const toolCategories = [
  'productivity', 'health-wellness', 'finance', 'education',
  'career', 'family-home', 'travel', 'events',
  'personal-development', 'business',
]

// ─── Tool slugs (all 40 tools) ────────────────────────────────────────────────
const tools = [
  { category: 'productivity', slug: 'habit-system-builder', featured: true },
  { category: 'productivity', slug: 'deep-work-system-builder' },
  { category: 'productivity', slug: 'daily-schedule-builder' },
  { category: 'productivity', slug: 'weekly-planning-assistant' },
  { category: 'health-wellness', slug: 'bmi-calculator', featured: true },
  { category: 'health-wellness', slug: 'tdee-calculator', featured: true },
  { category: 'health-wellness', slug: 'weight-loss-roadmap', featured: true },
  { category: 'health-wellness', slug: 'workout-routine-builder' },
  { category: 'finance', slug: 'savings-goal-planner', featured: true },
  { category: 'finance', slug: 'budget-builder', featured: true },
  { category: 'finance', slug: 'debt-payoff-planner' },
  { category: 'finance', slug: 'emergency-fund-planner' },
  { category: 'education', slug: 'study-success-planner', featured: true },
  { category: 'education', slug: 'exam-preparation-planner' },
  { category: 'education', slug: 'reading-plan-builder' },
  { category: 'education', slug: 'skill-development-planner' },
  { category: 'career', slug: 'job-search-tracker', featured: true },
  { category: 'career', slug: 'career-roadmap-builder' },
  { category: 'career', slug: 'interview-preparation-planner' },
  { category: 'career', slug: 'skill-gap-analyzer' },
  { category: 'family-home', slug: 'family-schedule-builder' },
  { category: 'family-home', slug: 'cleaning-schedule-generator' },
  { category: 'family-home', slug: 'grocery-planning-assistant' },
  { category: 'family-home', slug: 'home-maintenance-planner' },
  { category: 'travel', slug: 'trip-itinerary-builder', featured: true },
  { category: 'travel', slug: 'travel-budget-planner' },
  { category: 'travel', slug: 'packing-list-generator' },
  { category: 'travel', slug: 'road-trip-planner' },
  { category: 'events', slug: 'wedding-planner-tool', featured: true },
  { category: 'events', slug: 'event-budget-builder' },
  { category: 'events', slug: 'party-planning-assistant' },
  { category: 'events', slug: 'conference-planner' },
  { category: 'personal-development', slug: 'goal-breakdown-generator', featured: true },
  { category: 'personal-development', slug: 'morning-routine-designer' },
  { category: 'personal-development', slug: 'thirty-day-challenge-generator' },
  { category: 'personal-development', slug: 'life-vision-planner' },
  { category: 'business', slug: 'business-goal-planner', featured: true },
  { category: 'business', slug: 'content-calendar-builder' },
  { category: 'business', slug: 'project-scope-builder' },
  { category: 'business', slug: 'startup-launch-planner' },
]

// ─── Build URL entries ────────────────────────────────────────────────────────
function url(path, priority, freq) {
  return `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const entries = [
  // Static
  ...staticPages.map(p => url(p.path, p.priority, p.freq)),
  // Template categories
  ...templateCategories.map(c => url(`/templates/${c}`, '0.8', 'weekly')),
  // Templates
  ...templates.map(t => url(`/templates/${t.category}/${t.slug}`, t.featured ? '0.85' : '0.75', 'monthly')),
  // Tool categories
  ...toolCategories.map(c => url(`/tools/${c}`, '0.75', 'weekly')),
  // Tools
  ...tools.map(t => url(`/tools/${t.category}/${t.slug}`, t.featured ? '0.8' : '0.7', 'monthly')),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`

const outPath = join(ROOT, 'public', 'sitemap.xml')
mkdirSync(join(ROOT, 'public'), { recursive: true })
writeFileSync(outPath, xml, 'utf-8')

console.log(`✓ Generated sitemap.xml with ${entries.length} URLs → public/sitemap.xml`)
