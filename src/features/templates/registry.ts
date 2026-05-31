import type { Template, TemplateCategory } from './types'
import { TEMPLATE_CATEGORIES } from './categories'

// ─── Planner templates ────────────────────────────────────────────────────────
import { dailyPlannerTemplate } from './schemas/daily-planner'
import { weeklyPlannerTemplate } from './schemas/weekly-planner'
import { monthlyPlannerTemplate } from './schemas/monthly-planner'
import { goalAchievementPlannerTemplate } from './schemas/goal-achievement-planner'
import { deepWorkPlannerTemplate } from './schemas/deep-work-planner'
import { timeBlockingPlannerTemplate } from './schemas/time-blocking-planner'
import { weightLossPlannerTemplate } from './schemas/weight-loss-planner'
import { workoutPlannerTemplate } from './schemas/workout-planner'
import { runningPlannerTemplate } from './schemas/running-planner'
import { mealPlanningPlannerTemplate } from './schemas/meal-planning-planner'
import { habitBuildingPlannerTemplate } from './schemas/habit-building-planner'
import { selfCarePlannerTemplate } from './schemas/self-care-planner'
import { monthlyBudgetPlannerTemplate } from './schemas/monthly-budget-planner'
import { expenseTrackerPlannerTemplate } from './schemas/expense-tracker-planner'
import { savingsGoalPlannerTemplate } from './schemas/savings-goal-planner'
import { debtPayoffPlannerTemplate } from './schemas/debt-payoff-planner'
import { emergencyFundPlannerTemplate } from './schemas/emergency-fund-planner'
import { investmentPlanningPlannerTemplate } from './schemas/investment-planning-planner'
import { studyPlannerTemplate } from './schemas/study-planner'
import { examPreparationPlannerTemplate } from './schemas/exam-preparation-planner'
import { assignmentPlannerTemplate } from './schemas/assignment-planner'
import { readingPlannerTemplate } from './schemas/reading-planner'
import { personalGrowthPlannerTemplate } from './schemas/personal-growth-planner'
import { skillDevelopmentPlannerTemplate } from './schemas/skill-development-planner'
import { lifeVisionPlannerTemplate } from './schemas/life-vision-planner'
import { familySchedulePlannerTemplate } from './schemas/family-schedule-planner'
import { householdManagementPlannerTemplate } from './schemas/household-management-planner'
import { homeOrganizationPlannerTemplate } from './schemas/home-organization-planner'
import { projectPlanningPlannerTemplate } from './schemas/project-planning-planner'
import { meetingActionPlannerTemplate } from './schemas/meeting-action-planner'

// ─── Flat checklist templates ─────────────────────────────────────────────────
import { morningRoutineTemplate } from './schemas/morning-routine'
import { eveningRoutineTemplate } from './schemas/evening-routine'
import { groceryShoppingTemplate } from './schemas/grocery-shopping'
import { monthlyBillPaymentTemplate } from './schemas/monthly-bill-payment'
import { homeCleaningTemplate } from './schemas/home-cleaning'
import { travelPackingTemplate } from './schemas/travel-packing'
import { vacationPreparationTemplate } from './schemas/vacation-preparation'
import { examDayTemplate } from './schemas/exam-day'
import { assignmentSubmissionTemplate } from './schemas/assignment-submission'
import { newHomeMoveInTemplate } from './schemas/new-home-move-in'
import { digitalDeclutterTemplate } from './schemas/digital-declutter'
import { weekendResetTemplate } from './schemas/weekend-reset'
import { workdayStartupTemplate } from './schemas/workday-startup'
import { meetingPreparationTemplate } from './schemas/meeting-preparation'
import { emergencyPreparednessTemplate } from './schemas/emergency-preparedness'

// ─── Nested checklist templates ───────────────────────────────────────────────
import { weightLossJourneyTemplate } from './schemas/weight-loss-journey'
import { completeFitnessProgramTemplate } from './schemas/complete-fitness-program'
import { personalGoalAchievementTemplate } from './schemas/personal-goal-achievement'
import { examPreparationSystemTemplate } from './schemas/exam-preparation-system'
import { studyProjectSystemTemplate } from './schemas/study-project-system'
import { monthlyBudgetWorkflowTemplate } from './schemas/monthly-budget-workflow'
import { debtEliminationPlanTemplate } from './schemas/debt-elimination-plan'
import { familyVacationPlanningTemplate } from './schemas/family-vacation-planning'
import { eventPlanningSystemTemplate } from './schemas/event-planning-system'
import { homeMovingSystemTemplate } from './schemas/home-moving-system'
import { homeRenovationSystemTemplate } from './schemas/home-renovation-system'
import { jobSearchSystemTemplate } from './schemas/job-search-system'
import { projectLaunchSystemTemplate } from './schemas/project-launch-system'
import { businessStartupSystemTemplate } from './schemas/business-startup-system'
import { weddingPlanningSystemTemplate } from './schemas/wedding-planning-system'
import { tripPlannerTemplate } from './schemas/trip-planner'
import { travelBucketListTemplate } from './schemas/travel-bucket-list'
import { eventDayPlannerTemplate } from './schemas/event-day-planner'
import { roadTripPlannerTemplate } from './schemas/road-trip-planner'
import { soloTravelSystemTemplate } from './schemas/solo-travel-system'

const ALL_TEMPLATES: Template[] = [
  // Planners
  dailyPlannerTemplate,
  weeklyPlannerTemplate,
  monthlyPlannerTemplate,
  goalAchievementPlannerTemplate,
  deepWorkPlannerTemplate,
  timeBlockingPlannerTemplate,
  weightLossPlannerTemplate,
  workoutPlannerTemplate,
  runningPlannerTemplate,
  mealPlanningPlannerTemplate,
  habitBuildingPlannerTemplate,
  selfCarePlannerTemplate,
  monthlyBudgetPlannerTemplate,
  expenseTrackerPlannerTemplate,
  savingsGoalPlannerTemplate,
  debtPayoffPlannerTemplate,
  emergencyFundPlannerTemplate,
  investmentPlanningPlannerTemplate,
  studyPlannerTemplate,
  examPreparationPlannerTemplate,
  assignmentPlannerTemplate,
  readingPlannerTemplate,
  personalGrowthPlannerTemplate,
  skillDevelopmentPlannerTemplate,
  lifeVisionPlannerTemplate,
  familySchedulePlannerTemplate,
  householdManagementPlannerTemplate,
  homeOrganizationPlannerTemplate,
  projectPlanningPlannerTemplate,
  meetingActionPlannerTemplate,
  // Flat checklists
  morningRoutineTemplate,
  eveningRoutineTemplate,
  groceryShoppingTemplate,
  monthlyBillPaymentTemplate,
  homeCleaningTemplate,
  travelPackingTemplate,
  vacationPreparationTemplate,
  examDayTemplate,
  assignmentSubmissionTemplate,
  newHomeMoveInTemplate,
  digitalDeclutterTemplate,
  weekendResetTemplate,
  workdayStartupTemplate,
  meetingPreparationTemplate,
  emergencyPreparednessTemplate,
  // Nested checklists
  weightLossJourneyTemplate,
  completeFitnessProgramTemplate,
  personalGoalAchievementTemplate,
  examPreparationSystemTemplate,
  studyProjectSystemTemplate,
  monthlyBudgetWorkflowTemplate,
  debtEliminationPlanTemplate,
  familyVacationPlanningTemplate,
  eventPlanningSystemTemplate,
  homeMovingSystemTemplate,
  homeRenovationSystemTemplate,
  jobSearchSystemTemplate,
  projectLaunchSystemTemplate,
  businessStartupSystemTemplate,
  weddingPlanningSystemTemplate,
  // Travel & Events
  tripPlannerTemplate,
  travelBucketListTemplate,
  eventDayPlannerTemplate,
  roadTripPlannerTemplate,
  soloTravelSystemTemplate,
]

export function getAllTemplates(): Template[] {
  return ALL_TEMPLATES
}

export function getTemplate(slug: string): Template | null {
  return ALL_TEMPLATES.find((t) => t.slug === slug) ?? null
}

export function getTemplatesByCategory(categorySlug: string): Template[] {
  return ALL_TEMPLATES.filter((t) => t.category === categorySlug)
}

export function getFeaturedTemplates(limit = 8): Template[] {
  return ALL_TEMPLATES.filter((t) => t.featured).slice(0, limit)
}

export function getAllCategories(): TemplateCategory[] {
  return TEMPLATE_CATEGORIES.sort((a, b) => a.order - b.order)
}

export function getCategory(slug: string): TemplateCategory | null {
  return TEMPLATE_CATEGORIES.find((c) => c.slug === slug) ?? null
}

export function searchTemplates(query: string): Template[] {
  const q = query.toLowerCase().trim()
  if (!q) return ALL_TEMPLATES
  return ALL_TEMPLATES.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

export function getRelatedTemplates(slug: string, limit = 4): Template[] {
  const template = getTemplate(slug)
  if (!template) return []
  return ALL_TEMPLATES.filter((t) => t.slug !== slug && t.category === template.category).slice(0, limit)
}
