import type { Tool } from '../types'

const studySuccessPlanner: Tool = {
  id: 'study-success-planner',
  slug: 'study-success-planner',
  title: 'Study Success Planner',
  description: 'Calculate your GPA, set academic goals, and generate a personalised weekly study schedule, revision roadmap, and exam preparation checklist.',
  category: 'education',
  icon: 'GraduationCap',
  featured: true,
  tags: ['gpa', 'study', 'exam', 'schedule', 'revision', 'academic'],
  relatedTemplateSlug: 'study-planner',
  relatedTemplateCategory: 'education',
  inputs: [
    { id: 'studyHours', type: 'number', label: 'Available Study Hours per Day', placeholder: '4', unit: 'hrs', min: 0.5, max: 16, step: 0.5, required: true, defaultValue: 4 },
    { id: 'courses', type: 'number', label: 'Number of Courses / Subjects', placeholder: '5', min: 1, max: 12, step: 1, required: true, defaultValue: 5 },
    { id: 'weeksToExam', type: 'number', label: 'Weeks Until Exams', placeholder: '8', unit: 'weeks', min: 1, max: 52, step: 1, required: true, defaultValue: 8 },
    { id: 'targetGrade', type: 'select', label: 'Target Grade', required: true, defaultValue: 'first',
      options: [
        { label: 'First Class (70%+)', value: 'first' },
        { label: 'Upper Second (60–70%)', value: 'upper-second' },
        { label: 'Lower Second (50–60%)', value: 'lower-second' },
        { label: 'Pass (40–50%)', value: 'pass' },
      ] },
    { id: 'studyStyle', type: 'select', label: 'Preferred Study Style', required: false, defaultValue: 'mixed',
      options: [
        { label: 'Pomodoro (25/5 min blocks)', value: 'pomodoro' },
        { label: 'Deep Work (90 min blocks)', value: 'deep' },
        { label: 'Mixed (2hr morning + 2hr evening)', value: 'mixed' },
        { label: 'Spaced Repetition', value: 'spaced' },
      ] },
    { id: 'weakSubjects', type: 'text', label: 'Weakest Subject(s)', placeholder: 'e.g. Statistics, Chemistry', required: false, defaultValue: '' },
  ],
  generate(inputs) {
    const studyHours = Number(inputs.studyHours) || 4
    const courses = Number(inputs.courses) || 5
    const weeksToExam = Number(inputs.weeksToExam) || 8
    const targetGrade = String(inputs.targetGrade || 'upper-second')
    const studyStyle = String(inputs.studyStyle || 'mixed')
    const weakSubjects = String(inputs.weakSubjects || '').trim()

    const totalHours = studyHours * 7 * weeksToExam
    const hoursPerCourse = Math.floor(totalHours / courses)
    const sessionsPerDay = studyStyle === 'pomodoro' ? Math.floor(studyHours * 2) : studyStyle === 'deep' ? Math.floor(studyHours / 1.5) : Math.floor(studyHours / 2)

    const gradeLabels: Record<string, string> = {
      first: 'First Class (70%+)',
      'upper-second': 'Upper Second (60–70%)',
      'lower-second': 'Lower Second (50–60%)',
      pass: 'Pass (40–50%)',
    }

    const sessionBlock = studyStyle === 'pomodoro' ? '25 min focused + 5 min break'
      : studyStyle === 'deep' ? '90 min deep work + 20 min break'
        : studyStyle === 'spaced' ? '45 min + 15 min review'
          : '2 hours focused + 30 min break'

    const dailySchedule = studyStyle === 'mixed'
      ? [
        { time: '08:00–10:00', label: `Morning block — ${Math.ceil(courses / 2)} priority subjects`, type: 'work' as const },
        { time: '10:00–10:30', label: 'Break — walk, hydrate, no phone', type: 'break' as const },
        { time: '10:30–12:00', label: 'Active recall — flashcards, practice questions', type: 'work' as const },
        { time: '14:00–16:00', label: `Afternoon block — ${Math.floor(courses / 2)} supporting subjects`, type: 'work' as const },
        { time: '16:00–16:30', label: 'Break', type: 'break' as const },
        { time: '19:00–20:30', label: 'Evening review — yesterday\'s notes + tomorrow\'s plan', type: 'review' as const },
      ]
      : studyStyle === 'deep'
        ? [
          { time: '08:00–09:30', label: 'Deep work block 1 — hardest subject, zero interruptions', type: 'work' as const },
          { time: '09:30–10:00', label: 'Break — physical activity preferred', type: 'break' as const },
          { time: '10:00–11:30', label: 'Deep work block 2 — second priority subject', type: 'work' as const },
          { time: '14:00–15:30', label: 'Deep work block 3 — practice questions', type: 'work' as const },
          { time: '15:30–16:00', label: 'Break', type: 'break' as const },
          { time: '16:00–17:30', label: 'Review + next day planning', type: 'review' as const },
        ]
        : [
          { time: '08:00–08:25', label: 'Pomodoro 1 — subject review', type: 'work' as const },
          { time: '08:25–08:30', label: 'Short break', type: 'break' as const },
          { time: '08:30–08:55', label: 'Pomodoro 2 — practice questions', type: 'work' as const },
          { time: '08:55–09:10', label: 'Long break', type: 'break' as const },
          { time: '09:10–09:35', label: 'Pomodoro 3 — new content', type: 'work' as const },
          { time: '09:35–09:40', label: 'Short break', type: 'break' as const },
          { time: '09:40–10:05', label: 'Pomodoro 4 — active recall', type: 'work' as const },
          { time: '10:05–10:30', label: 'Break + repeat cycle', type: 'rest' as const },
        ]

    const weeklySchedule = [
      { week: 'Week 1–2', focus: 'Content mapping + first pass', tasks: `Read all notes for each of ${courses} subjects`, notes: 'Identify weak areas' },
      { week: 'Week 3–4', focus: 'Active recall + flashcards', tasks: 'Create summary sheets, Anki decks per subject', notes: weakSubjects ? `Priority: ${weakSubjects}` : '' },
      { week: 'Week 5–6', focus: 'Past papers + mock exams', tasks: `2 past papers per subject (${courses * 2} total)`, notes: 'Timed conditions' },
      { week: 'Week 7', focus: 'Weak area intensive review', tasks: `Deep dive into lowest-confidence topics`, notes: 'Mark scheme analysis' },
      { week: 'Week 8', focus: 'Final sprint + rest', tasks: 'Light review only, sleep 8hrs, no new content', notes: 'Exam week preparation' },
    ].slice(0, Math.ceil(weeksToExam / 1))

    const examDate = new Date()
    examDate.setDate(examDate.getDate() + weeksToExam * 7)

    const milestones = [
      { label: 'Complete first pass of all subjects', date: `Week ${Math.ceil(weeksToExam * 0.25)}` },
      { label: 'All summary notes created', date: `Week ${Math.ceil(weeksToExam * 0.4)}` },
      { label: 'First past paper attempt', date: `Week ${Math.ceil(weeksToExam * 0.55)}` },
      { label: 'All past papers complete', date: `Week ${Math.ceil(weeksToExam * 0.8)}` },
      { label: 'Final review complete', date: `Week ${weeksToExam - 1}` },
      { label: 'EXAM WEEK', date: `Week ${weeksToExam}` },
    ]

    return {
      headline: `${totalHours} study hours available across ${weeksToExam} weeks`,
      subheadline: `${hoursPerCourse} hours per subject · ${sessionsPerDay} ${sessionBlock} sessions per day · Target: ${gradeLabels[targetGrade]}`,
      stats: [
        { label: 'Total Study Hours', value: `${totalHours} hrs` },
        { label: 'Hours per Subject', value: `${hoursPerCourse} hrs` },
        { label: 'Weeks to Exams', value: `${weeksToExam} weeks` },
        { label: 'Daily Sessions', value: `${sessionsPerDay} sessions` },
        { label: 'Target Grade', value: gradeLabels[targetGrade] },
        { label: 'Exam Date', value: examDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) },
      ],
      milestones,
      weeklySchedule,
      dailySchedule,
      checklists: [
        {
          title: 'Exam Preparation Checklist',
          items: [
            'Download full syllabus for each subject',
            'Create a subject-by-subject topic list',
            'Gather all notes, past papers, and textbooks',
            'Set up a dedicated, distraction-free study space',
            'Install or create a flashcard system (Anki recommended)',
            'Block social media during study hours',
            ...Array.from({ length: courses }, (_, i) => `Subject ${i + 1}: complete first pass of all topics`),
            'Complete minimum 2 past papers per subject under timed conditions',
            'Review every incorrect answer and understand why',
            'Create 1-page summary sheet per subject',
            'Plan exam week schedule — sleep 8hrs every night',
          ],
        },
        ...(weakSubjects ? [{
          title: `Priority: ${weakSubjects}`,
          items: [
            `Allocate extra 20% time to ${weakSubjects}`,
            'Read through all notes twice before practising',
            'Find a tutor or study group for this subject',
            'Complete all available past paper questions for this topic',
            'Create dedicated flashcards for key formulas and concepts',
          ],
        }] : []),
      ],
      recommendations: [
        `With ${studyHours} hours per day, you have ${totalHours} total study hours — enough for ${gradeLabels[targetGrade]}.`,
        studyStyle === 'pomodoro' ? 'Pomodoro works best for content-heavy subjects. Use deep work for problem-solving subjects.' : '',
        weakSubjects ? `Spend at least ${Math.ceil(hoursPerCourse * 1.3)} hours on ${weakSubjects} — your weakest area needs the most time.` : '',
        'Active recall (testing yourself without notes) is 3× more effective than re-reading.',
        'Sleep is non-negotiable — sleep-deprived recall drops by 40%. Protect 8 hours.',
      ].filter(Boolean) as string[],
      nextActions: [
        'Print or save this study schedule now',
        'Block out study sessions in your calendar for the next 7 days',
        'Download past papers for all subjects today',
        `Set daily alarm for study start time`,
        weakSubjects ? `Find extra resources for ${weakSubjects} this week` : 'Identify your 2 weakest subjects and allocate extra time',
      ],
    }
  },
}

export default studySuccessPlanner
