<div align="center">

# 📋 DailyPlanly

**Calm, printable-first productivity — no login, no cloud, no compromise.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://dailyplanly.com) · [Templates](https://dailyplanly.com/templates) · [Tools](https://dailyplanly.com/tools) · [Report Bug](https://github.com/ksrilal/dailyplanly/issues)

![DailyPlanly Hero](https://dailyplanly.com/og-image.png)

</div>

---

## 🌟 Why DailyPlanly?

Most productivity apps want your email, your data, your subscription fee, and your trust. DailyPlanly wants none of it.

> *"The best planner is the one you actually use."*

DailyPlanly was built on a simple philosophy: **planning tools should be calm, beautiful, and completely yours.** No accounts. No sync servers. No ads tracking your habits. Just a clean canvas for organising your life — that prints perfectly.

Whether you're a student managing assignments, a professional tracking projects, a parent coordinating family schedules, or a fitness enthusiast building better habits — DailyPlanly has a template and a tool designed specifically for you.

---

## ✨ What DailyPlanly Does

DailyPlanly is a **browser-based productivity platform** with three core pillars:

### 🗂 Planner Editor
Build beautiful, structured planners block by block:
- Drag-and-drop block palette (Focus, Routine, Goal, Habit Tracker, Table, Timeline, Calendar, Notes, and more)
- Portrait and landscape orientation support
- Multiple themes (Minimal, Soft Paper, Elegant Dark, Study Focus, Wellness Calm)
- Real-time preview — see exactly what you'll print
- **Export to PDF** or **Print** with one click — no browser header/footer in output

### ✅ Checklist Editor
Build powerful checklists from simple to complex:
- **Simple mode** — flat, clean to-do lists
- **Advanced mode** — up to 4 levels of nested hierarchy
- Drag-and-drop reordering at every depth level
- Progress tracking with visual progress bar
- Search and filter across all items
- Print to paper or export to PDF

### 🛠 Planning Tools (40 tools across 10 categories)
Intelligent planning assistants that generate complete plans, schedules, and roadmaps — not just calculators. Every tool produces:
- Summary headline and key metrics
- Milestone roadmap
- Weekly/daily schedule
- Action checklists
- Personalised recommendations
- "Create Planner" and "Create Checklist" from results

---

## 🚀 Features

### Core Platform
| Feature | Details |
|---|---|
| 🔒 **Zero Login** | No account, email, or password ever required |
| 💾 **Local-First Storage** | All data saved in browser IndexedDB — never leaves your device |
| 📴 **Works Offline** | Full functionality after first load, no internet needed |
| 🖨 **Print-Perfect** | `@page { margin: 0 }` popup renderer — no browser chrome in prints |
| 📄 **PDF Export** | High-quality PDF via `@react-pdf/renderer` with theme colours |
| 🌙 **Dark Mode** | System-aware theme with manual toggle |
| 📱 **Responsive** | Mobile-friendly across all pages |

### Planner Blocks
| Block | Description |
|---|---|
| **Focus** | Priority items with High / Medium / Low urgency |
| **Routine** | Time-slot schedule builder |
| **Goal** | Goal statement + milestone checklist |
| **Habit Tracker** | Up to 31-day grid with custom habits |
| **Table** | Fully editable column/row table |
| **Timeline** | Dated event roadmap |
| **Calendar** | Monthly calendar view |
| **Calendar Notes** | Calendar with colour-coded sticky notes per day |
| **Dashboard Card** | KPI-style metric display |
| **Notes** | Ruled lines or freeform text |
| **Image** | Upload and embed images (base64 stored locally) |
| **Spacer** | Configurable vertical space |

### Template Gallery (60+ templates)
Templates across **8 categories** — all pre-filled with realistic, actionable content:

| Category | Templates Include |
|---|---|
| 🧠 Productivity | Daily Planner, Weekly Planner, Deep Work, Time Blocking, Goal Achievement |
| ❤️ Health & Wellness | Weight Loss, Workout, Running, Meal Planning, Habit Building, Self-Care |
| 💰 Finance | Monthly Budget, Expense Tracker, Savings Goal, Debt Payoff, Investment Planning |
| 📚 Education | Study Planner, Exam Preparation, Assignment Planner, Reading Planner |
| ✨ Lifestyle | Personal Growth, Skill Development, Life Vision |
| 🏠 Family & Home | Family Schedule, Household Management, Home Organisation, Moving |
| 💼 Work & Office | Project Planning, Meeting & Action Planner, Job Search System |
| ✈️ Travel & Events | Trip Planner, Road Trip, Event Day, Wedding Planning, Solo Travel |

### Planning Tools (40 tools, 10 categories)

| Category | Tools Include |
|---|---|
| ⚡ Productivity | Deep Work System Builder, Habit System Builder, Daily Schedule Builder, Weekly Planning Assistant |
| 💪 Health & Wellness | BMI Calculator, TDEE Calculator, Weight Loss Roadmap, Workout Routine Builder |
| 💵 Finance | Savings Goal Planner, Budget Builder, Debt Payoff Planner, Emergency Fund Planner |
| 🎓 Education | Study Success Planner, Exam Preparation Planner, Reading Plan Builder, Skill Development Planner |
| 👔 Career | Job Search Planner, Career Roadmap Builder, Interview Preparation Planner, Skill Gap Analyzer |
| 🏡 Family & Home | Family Schedule Builder, Cleaning Schedule Generator, Grocery Planning Assistant, Home Maintenance Planner |
| 🗺 Travel | Trip Itinerary Builder, Travel Budget Planner, Packing List Generator, Road Trip Planner |
| 🎉 Events | Wedding Planner, Event Budget Builder, Party Planning Assistant, Conference Planner |
| 🌱 Personal Growth | Goal Breakdown Generator, Morning Routine Designer, 30-Day Challenge Generator, Life Vision Planner |
| 🚀 Business | Business Goal Planner, Content Calendar Builder, Project Scope Builder, Startup Launch Planner |

---

## 🛠 Tech Stack

```
Frontend Framework    Next.js 15 (App Router, Server + Client Components)
Language              TypeScript 5 (strict mode)
Styling               Tailwind CSS v4
State Management      Zustand (editor state)
Local Storage         IndexedDB via idb
Drag & Drop           @dnd-kit/core + @dnd-kit/sortable
PDF Generation        @react-pdf/renderer (lazy loaded)
Animations            Framer Motion
Icons                 Lucide React
Fonts                 Inter (body) · Lora (display)
Analytics             Vercel Analytics
Deployment            Vercel
```

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ksrilal/dailyplanly.git
cd dailyplanly

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Type Check

```bash
npx tsc --noEmit
```

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage
│   ├── planner/                # Planner editor
│   ├── checklist/              # Checklist editor
│   ├── templates/              # Template gallery + detail pages
│   ├── tools/                  # Tools hub + individual tool pages
│   └── workspace/              # My Workspaces
│
├── components/
│   ├── layout/                 # Header, Footer, PageShell
│   ├── planner-editor/         # Planner canvas, palette, toolbar
│   ├── checklist-editor/       # Checklist layout, items, progress
│   ├── template-gallery/       # Gallery grid, preview components
│   ├── tools/                  # Quotes panel
│   ├── homepage/               # Hero, sections, animations
│   ├── shared/                 # FAQ, storage warning, DevTools promo
│   └── ui/                     # Button, Input, Select, Badge, etc.
│
├── features/
│   ├── planner/                # Block registry, editor state, blocks/
│   ├── checklist/              # Editor state, tree operations
│   ├── templates/              # Registry, schemas (60+ templates)
│   ├── tools/                  # Registry, 40 tools across 10 categories
│   ├── export/                 # PDF renderer, print service
│   └── storage/                # IndexedDB, recents, auto-save
│
└── styles/
    ├── globals.css             # Tailwind + CSS variables
    └── print.css               # Print-specific styles
```

---

## 🗺 Roadmap

- [ ] Cloud sync (optional, opt-in)
- [ ] More template categories
- [ ] Custom block builder
- [ ] Team/shared workspaces
- [ ] Mobile app (PWA)
- [ ] Import from other planners

---

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

```bash
# Create a feature branch
git checkout -b feat/your-feature-name

# Make your changes, then commit
git commit -m "feat: describe your change"

# Push and open a PR
git push origin feat/your-feature-name
```

---

## 📄 License

MIT © [ksrilal](https://github.com/ksrilal)

---

## 🔗 Related Projects

| Project | Description |
|---|---|
| [DevTools Suite](https://devtoolssuite.dev) | Browser-based developer utilities — free forever |

---

<div align="center">

**Built with ❤️ for calm, focused productivity.**

[dailyplanly.com](https://dailyplanly.com) · [GitHub](https://github.com/ksrilal/dailyplanly) · [Issues](https://github.com/ksrilal/dailyplanly/issues)

</div>
