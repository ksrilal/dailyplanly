<!--
SYNC IMPACT REPORT
==================
Version change: 1.1.0 → 1.2.0
Bump rationale: MINOR — significant restructuring of principle sections. The flat "VIII. Core
  Platform Principles" block (12 items) has been replaced by four distinct named principle
  groups: Architecture, Engineering, Design, and Export. Product Identity refined with explicit
  product pillars and tightened "must feel" / "must NOT become" language. Product Philosophy
  section added. No prior principles removed; all prior rules are retained or sharpened.

Modified principles:
  - I. Template-First Experience (UX) → retained and sharpened under Design Principles
  - II. Engineering Discipline → retained, expanded under Engineering Principles
  - III. Performance Standards → retained under Engineering Principles
  - IV. Product Scope → retained, refined with named product pillars
  - V. Export & Print Quality → retained under Export Principles
  - VI. Design Tone → retained, expanded under Design Principles
  - VII. Success Definition → retained under Product Philosophy
  - VIII. Core Platform Principles (12 items) → replaced by Architecture + Engineering sections

Added sections:
  - Product Pillars (named core systems)
  - Product Philosophy (success definition + feel)
  - Architecture Principles (distinct from Engineering)
  - Design Principles (distinct from UX section)
  - Export Principles (promoted to standalone section)
  - Anti-Scope (sharpened from v1.1.0)

Removed sections:
  - VIII. Core Platform Principles (content redistributed across named sections)
  - Priorities (content merged into Product Philosophy)

Templates requiring updates:
  - .specify/templates/plan-template.md  ✅ Constitution Check gate present; gates map to new sections
  - .specify/templates/spec-template.md  ✅ Scope alignment unchanged
  - .specify/templates/tasks-template.md ✅ Phase structure unchanged
  - .specify/templates/commands/         ✅ No commands directory found

Follow-up TODOs:
  - None — all fields resolved
-->

# DailyPlanly Constitution

## Product Identity

DailyPlanly is a calm, printable-first productivity platform focused on planner systems,
checklist systems, structured organization, and template-driven workflows.

**Simplicity is the product.**

## Product Pillars

The four equal core systems of DailyPlanly:

1. **Planner Systems** — visual daily, weekly, and periodic planning templates
2. **Checklist Systems** — nested, structured, and printable checklist workflows
3. **Template Gallery** — curated, categorized, and searchable template library
4. **Productivity Utility Tools** — lightweight browser-based productivity calculators
   and generators

Every feature MUST serve at least one of these four pillars. Features that do not map
to a pillar MUST NOT be added.

## Core Principles

### I. Template-First Experience

Every user flow MUST begin from a template entry point. Blank-canvas creation is not
a supported primary flow. Users MUST be able to open a template, customize it, and
export it without configuration steps, account creation, or page reloads. Guided
workflows MUST be preferred over unconstrained flexibility.

### II. Calm, Spacious Design

The visual language MUST be calm, modern, spacious, and paper-inspired. Visual hierarchy
MUST be soft. Typography rhythm MUST be strong and consistent. Layouts MUST feel
organized and non-overwhelming. Large visual previews MUST be used for template
discovery. Any design contribution that introduces visual noise, dense information
displays, high-saturation palettes, or anxious interaction patterns MUST be revised
before merge.

The product MUST feel: calm, spacious, modern, organized, paper-inspired, visually
balanced, and non-overwhelming.

### III. Browser-First, Local-First Architecture

All logic MUST run in the browser. Server-side processing is prohibited for MVP unless
a browser API provably cannot fulfill the requirement. All user data MUST be stored
locally (localStorage or IndexedDB). No user data MUST be transmitted to any server
without explicit, informed user consent. The product MUST be deployable as a static
site with zero server infrastructure. Cloud sync and accounts are out of scope for MVP.

### IV. Engineering Discipline

All code MUST use TypeScript strict mode. Components MUST follow a reusable, feature-based
architecture. Monolithic components are prohibited. Dependencies MUST be lightweight —
convenience-only packages are prohibited. Heavy features (PDF engine, rich editors) MUST
be lazy-loaded and MUST NOT appear in the initial bundle. Overengineering is prohibited:
solutions MUST match the simplest implementation that satisfies the requirement.

### V. Export & Print Quality

All exportable views MUST be print-safe and export-safe. PDF layouts MUST be clean with
predictable pagination and paper-safe margins. Typography MUST maintain high readability
at print resolution. Spacing MUST be consistent across all exported pages. No overflow,
clipping, or browser-chrome artifacts are permitted in exports. Both PDF download and
browser print MUST be supported.

### VI. Product Scope & Anti-Scope

DailyPlanly MUST prioritize: simplicity before power, visual clarity, calm productivity,
printable-first rendering, template-first workflows, low friction interaction, aesthetic
modern UI, responsive performance, and reusable modular architecture.

The following are permanently out of scope and MUST NOT be pursued:

- A Notion clone — no freeform block editing, relational databases, or wiki systems
- A Canva clone — no freeform canvas or drag-anywhere design tools
- Enterprise project management software — no Gantt charts, sprint boards, or resource
  allocation
- Collaboration software — no real-time multiplayer, shared workspaces, or comments
- A social productivity platform — no feeds, follows, or public sharing of user content
- A complex freeform canvas tool — no infinite canvas or freehand drawing
- A developer-focused utility suite — no code editors, CLI tools, or dev tooling

Any feature proposal trending toward these categories MUST be rejected or scoped down to
a focused, printable-first, template-driven equivalent.

### VII. Product Philosophy & Success Definition

A feature is complete when a user can:

- Open the product instantly — no loading screens, no onboarding gates
- Discover templates quickly — within seconds of first visit
- Customize easily — minimal steps, no configuration required
- Organize visually — layouts support spatial, visual thinking
- Export beautifully — print/PDF output is indistinguishable from a designed document
- Print safely — clean pagination, correct margins, no artifacts
- Feel productive immediately — the product delivers calm, organized value on first use

Any complexity that does not directly serve this philosophy MUST be eliminated.

## Architecture Principles

- **Frontend-first**: All application logic runs in the browser; no server required
- **Static deployment compatible**: Build output MUST deploy to Vercel, Netlify, GitHub
  Pages, or S3 with zero server configuration
- **Browser-only processing**: All calculations, exports, and storage MUST run client-side
- **Local-only persistence (MVP)**: All user data stored in IndexedDB or localStorage;
  no cloud storage for MVP
- **Reusable feature modules**: All features MUST be implemented as isolated, reusable
  modules under `src/features/`; cross-feature imports MUST go through defined contracts
- **Scalable component architecture**: UI components MUST be composable, stateless where
  possible, and organized by feature domain
- **Export-safe rendering**: All layouts MUST be tested for print and PDF safety before
  merge
- **SEO-friendly route structure**: All template and tool pages MUST use descriptive,
  category-based URL patterns pre-rendered at build time

## Engineering Principles

- **TypeScript strict mode**: All code MUST pass `tsc --strict` with zero errors
- **Maintainable architecture**: Code MUST be readable and modifiable by a developer
  unfamiliar with the feature; no clever abstractions without clear benefit
- **Lightweight dependencies**: Each dependency MUST justify its bundle cost;
  convenience-only packages are prohibited
- **Lazy-loaded heavy features**: PDF engine, rich editors, and large utilities MUST be
  loaded on demand via dynamic imports — NEVER in the initial bundle
- **Reusable UI primitives**: All interactive UI MUST be built from the shared design
  system (`src/components/ui/`); one-off component styles are prohibited
- **Avoid overengineering**: Prefer the simplest solution that satisfies the requirement;
  premature abstraction is a defect

## Design Principles

- **Template-first UX**: Every page and flow MUST lead with templates
- **Large visual previews**: Template cards MUST show visual previews, not just text
- **Soft visual hierarchy**: Headlines, body, and labels MUST use weight/size contrast,
  not color aggression
- **Strong typography rhythm**: Line height, spacing, and scale MUST be consistent across
  all pages using the defined type scale
- **Spacious layouts**: Generous whitespace MUST be used between sections; dense
  information layouts are prohibited
- **Modern productivity aesthetics**: The product MUST feel current, calm, and
  professional — not retro, playful, or corporate
- **Planner-inspired visuals**: Design language MUST reference paper planners, journals,
  and notebooks — not dashboards or enterprise apps
- **Calm interactions**: Transitions MUST be smooth and unhurried; no jarring animations,
  urgent colors, or aggressive micro-interactions

## Export Principles

- **Print-first rendering**: Every template MUST be designed for print output first;
  screen layout is secondary
- **Clean PDF layouts**: PDF output MUST have consistent typography, no element overflow,
  and correct page breaks
- **Readable spacing**: Exported documents MUST use generous line height and padding
  appropriate for reading on paper
- **Predictable pagination**: Content MUST break at logical points; orphaned lines and
  split headers are prohibited
- **Paper-safe margins**: All exports MUST use standard print margins (minimum 15mm on
  all sides) compatible with home printers

## Governance

This constitution supersedes all other written or verbal product, design, and engineering
guidance. Any practice that conflicts with these principles is non-compliant.

**Amendment procedure**: Amendments require a written proposal referencing the affected
principle, a documented rationale, and an update to `LAST_AMENDED_DATE` and
`CONSTITUTION_VERSION`. Breaking changes (removals, redefinitions) trigger a MAJOR bump.
New sections or material expansions trigger a MINOR bump. Clarifications and wording
fixes trigger a PATCH bump.

**Compliance review**: Every pull request MUST pass the Constitution Check gate in
`plan.md` before Phase 0 research begins and MUST be re-checked after Phase 1 design.
Anti-scope violations are grounds for immediate rejection. Complexity deviations MUST
be logged in the Complexity Tracking table with justification.

**Versioning policy**: `MAJOR.MINOR.PATCH` — see amendment procedure above.

**Version**: 1.2.0 | **Ratified**: 2026-05-28 | **Last Amended**: 2026-05-28
