import type { Tool, ToolCategory, ToolCategoryInfo } from './types'
import { TOOL_CATEGORIES } from './categories'

// ─── Productivity (4) ─────────────────────────────────────────────────────────
import habitSystemBuilder from './productivity/habit-system-builder'
import deepWorkSystemBuilder from './productivity/deep-work-system-builder'
import dailyScheduleBuilder from './productivity/daily-schedule-builder'
import weeklyPlanningAssistant from './productivity/weekly-planning-assistant'

// ─── Health & Wellness (4) ───────────────────────────────────────────────────
import bmiCalculator from './health-wellness/bmi-calculator'
import tdeeCalculator from './health-wellness/tdee-calculator'
import weightLossRoadmap from './health-wellness/weight-loss-roadmap'
import workoutRoutineBuilder from './health-wellness/workout-routine-builder'

// ─── Finance (4) ─────────────────────────────────────────────────────────────
import savingsGoalPlanner from './finance/savings-goal-planner'
import budgetBuilder from './finance/budget-builder'
import debtPayoffPlanner from './finance/debt-payoff-planner'
import emergencyFundPlannerTool from './finance/emergency-fund-planner'

// ─── Education (4) ───────────────────────────────────────────────────────────
import studySuccessPlanner from './education/study-success-planner'
import examPreparationPlannerTool from './education/exam-preparation-planner'
import readingPlanBuilder from './education/reading-plan-builder'
import skillDevelopmentPlannerTool from './education/skill-development-planner'

// ─── Career (4) ──────────────────────────────────────────────────────────────
import jobSearchTracker from './career/job-search-tracker'
import careerRoadmapBuilder from './career/career-roadmap-builder'
import interviewPreparationPlanner from './career/interview-preparation-planner'
import skillGapAnalyzer from './career/skill-gap-analyzer'

// ─── Family & Home (4) ───────────────────────────────────────────────────────
import familyScheduleBuilder from './family-home/family-schedule-builder'
import cleaningScheduleGenerator from './family-home/cleaning-schedule-generator'
import groceryPlanningAssistant from './family-home/grocery-planning-assistant'
import homeMaintenancePlanner from './family-home/home-maintenance-planner'

// ─── Travel (4) ──────────────────────────────────────────────────────────────
import tripItineraryBuilder from './travel/trip-itinerary-builder'
import travelBudgetPlanner from './travel/travel-budget-planner'
import packingListGenerator from './travel/packing-list-generator'
import roadTripPlannerTool from './travel/road-trip-planner'

// ─── Events (4) ──────────────────────────────────────────────────────────────
import weddingPlannerTool from './events/wedding-planner-tool'
import eventBudgetBuilder from './events/event-budget-builder'
import partyPlanningAssistant from './events/party-planning-assistant'
import conferencePlanner from './events/conference-planner'

// ─── Personal Development (4) ────────────────────────────────────────────────
import goalBreakdownGenerator from './personal-development/goal-breakdown-generator'
import morningRoutineDesigner from './personal-development/morning-routine-designer'
import thirtyDayChallengeGenerator from './personal-development/thirty-day-challenge-generator'
import lifeVisionPlannerTool from './personal-development/life-vision-planner'

// ─── Business (4) ────────────────────────────────────────────────────────────
import businessGoalPlanner from './business/business-goal-planner'
import contentCalendarBuilder from './business/content-calendar-builder'
import projectScopeBuilder from './business/project-scope-builder'
import startupLaunchPlanner from './business/startup-launch-planner'

// ─── All tools ────────────────────────────────────────────────────────────────

const ALL_TOOLS: Tool[] = [
  // Productivity (4)
  habitSystemBuilder,
  deepWorkSystemBuilder,
  dailyScheduleBuilder,
  weeklyPlanningAssistant,
  // Health & Wellness (4)
  bmiCalculator,
  tdeeCalculator,
  weightLossRoadmap,
  workoutRoutineBuilder,
  // Finance (4)
  savingsGoalPlanner,
  budgetBuilder,
  debtPayoffPlanner,
  emergencyFundPlannerTool,
  // Education (4)
  studySuccessPlanner,
  examPreparationPlannerTool,
  readingPlanBuilder,
  skillDevelopmentPlannerTool,
  // Career (4)
  jobSearchTracker,
  careerRoadmapBuilder,
  interviewPreparationPlanner,
  skillGapAnalyzer,
  // Family & Home (4)
  familyScheduleBuilder,
  cleaningScheduleGenerator,
  groceryPlanningAssistant,
  homeMaintenancePlanner,
  // Travel (4)
  tripItineraryBuilder,
  travelBudgetPlanner,
  packingListGenerator,
  roadTripPlannerTool,
  // Events (4)
  weddingPlannerTool,
  eventBudgetBuilder,
  partyPlanningAssistant,
  conferencePlanner,
  // Personal Development (4)
  goalBreakdownGenerator,
  morningRoutineDesigner,
  thirtyDayChallengeGenerator,
  lifeVisionPlannerTool,
  // Business (4)
  businessGoalPlanner,
  contentCalendarBuilder,
  projectScopeBuilder,
  startupLaunchPlanner,
]

export function getAllTools(): Tool[] {
  return ALL_TOOLS
}

export function getTool(slug: string): Tool | null {
  return ALL_TOOLS.find((t) => t.slug === slug) ?? null
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return ALL_TOOLS.filter((t) => t.category === category)
}

export function getAllToolCategories(): ToolCategoryInfo[] {
  return TOOL_CATEGORIES
}

export function getToolCategory(slug: string): ToolCategoryInfo | null {
  return TOOL_CATEGORIES.find((c) => c.slug === slug) ?? null
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim()
  if (!q) return ALL_TOOLS
  return ALL_TOOLS.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

export function getFeaturedTools(limit = 6): Tool[] {
  return ALL_TOOLS.filter((t) => t.featured).slice(0, limit)
}
