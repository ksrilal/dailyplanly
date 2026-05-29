# Contract: Template & Tool Registry API

**Type**: Internal TypeScript module interfaces
**Consumer**: Pages, SEO metadata generators, template gallery, tool pages
**Date**: 2026-05-28

---

## TemplateRegistry

Static synchronous data — all templates bundled at build time.

```typescript
interface TemplateRegistry {
  getAllTemplates(): Template[]
  getTemplate(slug: string): Template | null
  getTemplatesByCategory(categorySlug: string): Template[]
  getFeaturedTemplates(limit?: number): Template[]
  getAllCategories(): TemplateCategory[]
  getCategory(slug: string): TemplateCategory | null
  searchTemplates(query: string): Template[]
  getRelatedTemplates(slug: string, limit?: number): Template[]
}
```

## ToolRegistry

```typescript
interface ToolRegistry {
  getAllTools(): Tool[]
  getTool(slug: string): Tool | null
  getToolsByCategory(category: ToolCategory): Tool[]
  getAllToolCategories(): ToolCategory[]
  searchTools(query: string): Tool[]
}
```

## MetadataGenerator

```typescript
interface MetadataGenerator {
  forHome(): SiteMetadata
  forTemplate(template: Template): SiteMetadata
  forTemplateCategory(category: TemplateCategory): SiteMetadata
  forTool(tool: Tool): SiteMetadata
  forToolCategory(category: ToolCategory, label: string): SiteMetadata
}

interface SiteMetadata {
  title: string
  description: string
  canonicalUrl: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  keywords: string[]
}
```

## Route Map

| Route | Type | Static Params Source |
|---|---|---|
| `/` | Home | — |
| `/templates` | All templates | — |
| `/templates/[category]` | Category listing | `getAllCategories()` |
| `/templates/[category]/[slug]` | Template detail + use | `getAllTemplates()` |
| `/tools` | All tools | — |
| `/tools/[category]/[slug]` | Tool page | `getAllTools()` |
| `/planner/[id]` | Planner editor | dynamic (client-only) |
| `/checklist/[id]` | Checklist editor | dynamic (client-only) |
| `/workspace` | Workspace manager | client-only |
