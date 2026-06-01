import type { MetadataRoute } from 'next'
import { getAllTemplates, getAllCategories } from '@/features/templates/registry'
import { getAllTools, getAllToolCategories } from '@/features/tools/registry'

const BASE_URL = 'https://www.dailyplanly.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // ─── Static pages ─────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/templates`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/workspace`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/planner/new`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/checklist/new`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // ─── Template category pages ───────────────────────────────────────────────
  const templateCategories: MetadataRoute.Sitemap = getAllCategories().map((cat) => ({
    url: `${BASE_URL}/templates/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // ─── Individual template pages ─────────────────────────────────────────────
  const templatePages: MetadataRoute.Sitemap = getAllTemplates().map((t) => ({
    url: `${BASE_URL}/templates/${t.category}/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: t.featured ? 0.85 : 0.75,
  }))

  // ─── Tool category pages (via hub page with anchor) ────────────────────────
  const toolCategoryPages: MetadataRoute.Sitemap = getAllToolCategories().map((cat) => ({
    url: `${BASE_URL}/tools/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }))

  // ─── Individual tool pages ─────────────────────────────────────────────────
  const toolPages: MetadataRoute.Sitemap = getAllTools().map((t) => ({
    url: `${BASE_URL}/tools/${t.category}/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: t.featured ? 0.8 : 0.7,
  }))

  return [
    ...staticPages,
    ...templateCategories,
    ...templatePages,
    ...toolCategoryPages,
    ...toolPages,
  ]
}
