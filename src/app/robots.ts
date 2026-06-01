import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/planner',       // editor pages — no indexable content
          '/checklist',     // editor pages — no indexable content
          '/workspace',     // personal workspace — private
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.dailyplanly.com/sitemap.xml',
    host: 'https://www.dailyplanly.com',
  }
}
