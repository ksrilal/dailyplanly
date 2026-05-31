import type { Tool } from '../types'

const examPreparationPlannerTool: Tool = {
  id: 'exam-preparation-planner',
  slug: 'exam-preparation-planner',
  title: 'Exam Preparation Planner',
  description: 'Enter your exam date and subjects to get a complete revision timetable, topic checklist, past paper schedule, and exam day plan.',
  category: 'education',
  icon: 'FileText',
  tags: ['exam', 'revision', 'study', 'timetable', 'preparation'],
  relatedTemplateSlug: 'exam-preparation-planner',
  relatedTemplateCategory: 'education',
  inputs: [
    { id: 'examDate', type: 'number', label: 'Days Until Exam', placeholder: '30', unit: 'days', min: 1, max: 365, step: 1, required: true, defaultValue: 30 },
    { id: 'subjects', type: 'number', label: 'Number of Subjects/Papers', placeholder: '4', min: 1, max: 12, step: 1, required: true, defaultValue: 4 },
    { id: 'studyHours', type: 'number', label: 'Daily Study Hours Available', placeholder: '5', unit: 'hrs', min: 1, max: 16, step: 0.5, required: true, defaultValue: 5 },
    { id: 'weakSubject', type: 'text', label: 'Weakest Subject', placeholder: 'e.g. Organic Chemistry', required: false, defaultValue: '' },
    { id: 'strongSubject', type: 'text', label: 'Strongest Subject', placeholder: 'e.g. History', required: false, defaultValue: '' },
    { id: 'examType', type: 'select', label: 'Exam Type', required: false, defaultValue: 'written',
      options: [
        { label: 'Written essays / long form', value: 'written' },
        { label: 'Multiple choice', value: 'mcq' },
        { label: 'Technical / problem solving', value: 'technical' },
        { label: 'Mixed format', value: 'mixed' },
      ] },
  ],
  generate(inputs) {
    const daysLeft = Number(inputs.examDate) || 30
    const subjects = Number(inputs.subjects) || 4
    const dailyHours = Number(inputs.studyHours) || 5
    const weakSubject = String(inputs.weakSubject || '')
    const strongSubject = String(inputs.strongSubject || '')
    const examType = String(inputs.examType || 'written')

    const totalHours = daysLeft * dailyHours
    const phase1Days = Math.ceil(daysLeft * 0.4)
    const phase2Days = Math.ceil(daysLeft * 0.35)
    const phase3Days = Math.ceil(daysLeft * 0.15)
    const examWeekDays = daysLeft - phase1Days - phase2Days - phase3Days

    const hoursPerSubject = Math.floor(totalHours / subjects)
    const weakSubjectExtra = weakSubject ? Math.ceil(hoursPerSubject * 0.3) : 0

    const examDate = new Date()
    examDate.setDate(examDate.getDate() + daysLeft)

    const typeStrategy: Record<string, string> = {
      written: 'Practice essay plans and timed writing. Focus on structure, argument, and evidence.',
      mcq: 'Mass practice questions. Aim for speed and accuracy. Review wrong answers immediately.',
      technical: 'Work through problems daily. Mark where you get stuck. Build formula sheets.',
      mixed: 'Split time between essay practice and problem-solving. Past papers are essential.',
    }

    const weeklySchedule = [
      { week: `Days 1–${phase1Days}`, focus: 'Content Pass — all subjects', tasks: `Read and summarise all topics for ${subjects} subjects. ${dailyHours}h daily.`, notes: weakSubject ? `Spend 30% extra time on ${weakSubject}` : 'Identify weakest areas early' },
      { week: `Days ${phase1Days + 1}–${phase1Days + phase2Days}`, focus: 'Active Recall — flashcards & past papers', tasks: `Past papers + flashcard review. ${subjects * 2} past papers total.`, notes: typeStrategy[examType] },
      { week: `Days ${phase1Days + phase2Days + 1}–${daysLeft - examWeekDays}`, focus: 'Weak Area Intensive', tasks: weakSubject ? `Deep dive into ${weakSubject} + mock exam conditions` : 'Focus on lowest-confidence topics', notes: 'Full timed mocks under real conditions' },
      { week: `Days ${daysLeft - examWeekDays + 1}–${daysLeft}`, focus: 'Exam Week — light review only', tasks: 'Summary sheets only. No new content. Sleep 8h nightly.', notes: 'Rest is revision — exhaustion kills recall' },
    ]

    return {
      headline: `${daysLeft} days to exam · ${totalHours} total study hours · ${hoursPerSubject}h per subject`,
      subheadline: `${subjects} subjects · ${dailyHours}h/day · Exam: ${examDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}`,
      stats: [
        { label: 'Days Remaining', value: `${daysLeft}` },
        { label: 'Total Study Hours', value: `${totalHours} hrs` },
        { label: 'Hours per Subject', value: `${hoursPerSubject} hrs` },
        { label: 'Subjects', value: `${subjects}` },
        { label: 'Daily Hours', value: `${dailyHours} hrs` },
        { label: 'Exam Date', value: examDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      milestones: [
        { label: 'Complete first pass of all subjects', date: `Day ${phase1Days}` },
        { label: `Complete ${subjects * 2} past papers`, date: `Day ${phase1Days + phase2Days}` },
        { label: weakSubject ? `${weakSubject} — confident revision complete` : 'All weak areas addressed', date: `Day ${daysLeft - examWeekDays}` },
        { label: 'EXAM DAY — execute the plan!', date: examDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Exam Preparation Checklist',
          items: [
            'Download full syllabus for each subject',
            'Get at least 5 years of past papers',
            ...Array.from({ length: subjects }, (_, i) => `Subject ${i + 1}: complete content summary notes`),
            weakSubject ? `Spend ${hoursPerSubject + weakSubjectExtra}h on ${weakSubject} (weakest subject)` : '',
            strongSubject ? `Spend ${Math.ceil(hoursPerSubject * 0.7)}h on ${strongSubject} (maintenance only)` : '',
            'Complete all past papers under timed conditions',
            'Create 1-page cheat sheet per subject (memory aid)',
            'Night before: light review only, early sleep',
          ].filter(Boolean) as string[],
        },
        {
          title: 'Exam Day Checklist',
          items: ['Wake early — no rushing', 'Eat a proper breakfast (slow-release carbs)', 'Check exam location and time', 'Pack: ID, pens (×2), pencil, calculator, water', 'Arrive 15 minutes early', 'Read ALL questions before starting', 'Allocate time per question — stick to it', 'Review answers in last 10 minutes'],
        },
      ],
      recommendations: [
        typeStrategy[examType],
        weakSubject ? `Spend ${Math.round((weakSubjectExtra / totalHours) * 100)}% more time on ${weakSubject} than other subjects — this is where your marks are being lost.` : '',
        'Active recall (testing yourself) is 3× more effective than re-reading. Use past papers, flashcards, or practice questions.',
        `${daysLeft < 14 ? 'With under 2 weeks left, focus entirely on past papers and practice — no new content.' : 'You have enough time for a thorough preparation — stick to the timetable.'}`,
      ].filter(Boolean) as string[],
      nextActions: [
        'Download past papers for all subjects right now',
        'Create a study timetable in your calendar based on this plan',
        weakSubject ? `Prioritise ${weakSubject} — start with it tomorrow morning` : 'Identify your weakest subject and start there',
        `Set a daily study alarm at the same time every day`,
      ],
    }
  },
}

export default examPreparationPlannerTool
