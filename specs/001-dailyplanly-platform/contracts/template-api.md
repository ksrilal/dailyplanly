# Contract: Template & Tool Registry API

**Type**: Internal TypeScript module interface
**Consumer**: Pages, SEO metadata generators, search, navigation
**Date**: 2026-05-28

---

## TemplateRegistry

Static data layer — all methods are synchronous (data is bundled, not fetched).

```typescript
interface TemplateRegistry {
  // Get all templates
  getAllTemplates(): Template[]

  // Get template by slug
  getTemplate(slug: string): Template | null

  // Get templates by category
  getTemplatesByCategory(categorySlug: string): Template[]

  // Get all categories
  getAllCategories(): TemplateCategory[]

  // Get category by slug
  getCategory(slug: string): TemplateCategory | null

  // Search templates by keyword (title, description, tags)
  searchTemplates(query: string): Template[]

  // Get related templates (same category, excluding self)
  getRelatedTemplates(templateSlug: string, limit?: number): Template[]
}
```

## ToolRegistry

```typescript
interface ToolRegistry {
  getAllTools(): Tool[]
  getTool(slug: string): Tool | null
  getToolsByCategory(categorySlug: string): Tool[]
  getAllToolCategories(): ToolCategory[]
  getToolCategory(slug: string): ToolCategory | null
  searchTools(query: string): Tool[]
}
```

## SEO Metadata Generator

```typescript
interface MetadataGenerator {
  // Generate metadata for a template page
  forTemplate(template: Template): SiteMetadata

  // Generate metadata for a tool page
  forTool(tool: Tool): SiteMetadata

  // Generate metadata for a category page
  forTemplateCategory(category: TemplateCategory): SiteMetadata
  forToolCategory(category: ToolCategory): SiteMetadata

  // Generate metadata for home page
  forHome(): SiteMetadata
}
```

---

## Route Contracts

All routes are static and pre-rendered at build time.

| Route Pattern | Page | Static Params Source |
|---|---|---|
| `/` | Home / template gallery | — |
| `/templates` | All templates | — |
| `/templates/[category]` | Category page | `getAllCategories()` |
| `/templates/[category]/[slug]` | Template detail + editor | `getAllTemplates()` |
| `/tools` | All tools | — |
| `/tools/[category]` | Tool category | `getAllToolCategories()` |
| `/tools/[category]/[slug]` | Tool detail | `getAllTools()` |
| `/workspace/[id]` | Workspace editor (client-only) | dynamic, not pre-rendered |
