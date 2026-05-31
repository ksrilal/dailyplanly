import type { Tool } from '../types'

const contentCalendarBuilder: Tool = {
  id: 'content-calendar-builder',
  slug: 'content-calendar-builder',
  title: 'Content Calendar Builder',
  description: 'Build a sustainable content calendar for your business or brand. Set your channels, posting frequency, and content mix to get a weekly schedule, content batching plan, and ideas framework.',
  category: 'business',
  icon: 'Calendar',
  tags: ['content', 'social media', 'marketing', 'calendar', 'blog', 'creator'],
  inputs: [
    { id: 'primaryChannel', type: 'select', label: 'Primary Channel', required: true, defaultValue: 'linkedin',
      options: [
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'X (Twitter)', value: 'twitter' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Blog / Newsletter', value: 'blog' },
        { label: 'TikTok', value: 'tiktok' },
      ] },
    { id: 'postsPerWeek', type: 'number', label: 'Posts per Week', placeholder: '5', unit: 'posts', min: 1, max: 21, step: 1, required: true, defaultValue: 5 },
    { id: 'businessType', type: 'text', label: 'Business / Niche', placeholder: 'e.g. Fitness coaching, SaaS product, Bakery', required: true, defaultValue: 'My Business' },
    { id: 'goal', type: 'select', label: 'Content Goal', required: true, defaultValue: 'awareness',
      options: [
        { label: 'Build brand awareness', value: 'awareness' },
        { label: 'Generate leads and sales', value: 'sales' },
        { label: 'Build authority and trust', value: 'authority' },
        { label: 'Grow community and engagement', value: 'community' },
      ] },
    { id: 'hoursPerWeek', type: 'number', label: 'Hours for Content Creation per Week', placeholder: '5', unit: 'hrs', min: 1, max: 40, step: 0.5, required: true, defaultValue: 5 },
  ],
  generate(inputs) {
    const primaryChannel = String(inputs.primaryChannel || 'linkedin')
    const postsPerWeek = Number(inputs.postsPerWeek) || 5
    const businessType = String(inputs.businessType || 'My Business')
    const goal = String(inputs.goal || 'awareness')
    const hoursPerWeek = Number(inputs.hoursPerWeek) || 5

    const minPerPost = Math.round((hoursPerWeek * 60) / postsPerWeek)
    const monthlyPosts = postsPerWeek * 4

    const contentMix: Record<string, Record<string, string>> = {
      awareness: { '40%': 'Educational / how-to content', '30%': 'Behind-the-scenes / personality content', '20%': 'Trend or news commentary', '10%': 'Promotional content' },
      sales: { '30% Social proof': 'Social proof / case studies', '30% Problem': 'Problem-solution content', '25%': 'Educational content', '15%': 'Direct offers and CTAs' },
      authority: { '50%': 'Deep educational content / insights', '20% Opinion': 'Opinion and hot takes in your niche', '20% Results': 'Case studies and results', '10%': 'Community and engagement posts' },
      community: { '40%': 'Questions and polls', '30%': 'Relatable / story content', '20%': 'User-generated content / shoutouts', '10%': 'Behind-the-scenes' },
    }

    const channelTips: Record<string, string[]> = {
      linkedin: ['Post Tuesday–Thursday for highest reach', 'First comment matters — reply to every comment in first hour', 'Use line breaks and white space — walls of text get skipped', 'Hook in line 1 — the "see more" click is where you win or lose'],
      instagram: ['Post Reels for reach, carousels for saves, single images for engagement', 'Stories daily keeps you top of mind', 'Hashtags: 5–10 niche-relevant ones, not 30 generic ones', 'Respond to every DM and comment within 24 hours'],
      twitter: ['Thread format gets 10× more engagement than single tweets', 'Post 2–3 times daily for algorithm visibility', 'Quote tweet influencers in your niche to piggyback reach', 'Pin your best-performing tweet'],
      youtube: ['Thumbnail and title drive 80% of clicks — invest time here', 'First 30 seconds determine if viewers stay', 'Shorts drive subscribers, long-form drives revenue', 'Post consistently — algorithm rewards schedule'],
      blog: ['SEO: target one long-tail keyword per post', 'Repurpose each post into 5 social media pieces', 'Internal links improve SEO significantly', 'Email newsletter drives more traffic than any social post'],
      tiktok: ['First 3 seconds must hook or viewers scroll', 'Post 1–3 times daily for algorithmic growth', 'Trending sounds boost organic reach', 'Respond to comments with video replies'],
    }

    const weeklySchedule = [
      { week: 'Monday', focus: 'Planning & batching', tasks: `Plan this week\'s ${postsPerWeek} posts · write captions · schedule`, notes: `${minPerPost} min per post = ${Math.round(minPerPost * Math.ceil(postsPerWeek / 5 * 3))} min today` },
      { week: 'Tuesday', focus: 'Create visual content', tasks: 'Design images, record videos, create carousels', notes: 'Batch create — 2–3 pieces at once' },
      { week: 'Wednesday', focus: 'Engagement', tasks: 'Reply to all comments · engage with target audience · comment on 10 posts', notes: '30 min engagement beats 1 new post' },
      { week: 'Thursday', focus: 'Create written content', tasks: `Write blog post, newsletter, or LinkedIn articles`, notes: 'Repurpose into social posts' },
      { week: 'Friday', focus: 'Review & analyse', tasks: 'Review this week\'s performance · note what worked · plan next week', notes: 'Data informs next week\'s content mix' },
    ]

    return {
      headline: `${postsPerWeek} posts/week on ${primaryChannel.charAt(0).toUpperCase() + primaryChannel.slice(1)} for ${businessType}`,
      subheadline: `${monthlyPosts} posts/month · ${minPerPost} min/post · ${hoursPerWeek} hrs/week · Goal: ${goal}`,
      stats: [
        { label: 'Posts per Week', value: `${postsPerWeek}` },
        { label: 'Monthly Posts', value: `${monthlyPosts}` },
        { label: 'Time per Post', value: `~${minPerPost} min` },
        { label: 'Weekly Time', value: `${hoursPerWeek} hrs` },
        { label: 'Primary Channel', value: primaryChannel.charAt(0).toUpperCase() + primaryChannel.slice(1) },
        { label: 'Content Goal', value: goal.charAt(0).toUpperCase() + goal.slice(1) },
      ],
      milestones: [
        { label: 'First week — post every day as planned', date: 'Week 1' },
        { label: 'First month — 20+ posts published', date: 'Month 1' },
        { label: 'First piece of content to 10× average engagement', date: 'Month 2' },
        { label: '90 days consistent — audience recognises you', date: 'Month 3' },
      ],
      weeklySchedule,
      checklists: [
        {
          title: 'Content Calendar Setup',
          items: [
            'Create a content calendar spreadsheet or Notion board',
            'Define your 3 content pillars (core topics you cover)',
            `Set up ${primaryChannel} analytics to track performance`,
            'Create 10 post ideas for each content pillar',
            'Design 3–5 reusable templates for consistent branding',
            'Schedule first week\'s posts in advance using a scheduling tool',
            `Batch create: write all ${postsPerWeek} posts on one day (Monday)`,
            'Set up a repurposing workflow: 1 piece → 5 formats',
          ],
        },
        {
          title: 'Content Mix This Week',
          items: Object.entries(contentMix[goal] || contentMix.awareness).map(([pct, type]) => `${pct}: ${type}`),
        },
        {
          title: `${primaryChannel.charAt(0).toUpperCase() + primaryChannel.slice(1)} Tips`,
          items: channelTips[primaryChannel] || channelTips.linkedin,
        },
      ],
      recommendations: [
        `Consistency beats frequency. Posting 3× per week for a year beats posting 10× per week for a month.`,
        `${minPerPost} minutes per post is ${minPerPost >= 45 ? 'good for quality content' : 'tight — batch create to work more efficiently'}.`,
        'Repurpose ruthlessly: one good piece of content should become 5 social posts, an email, and a story.',
        `The ${goal} goal means your best-performing content type is ${Object.entries(contentMix[goal] || contentMix.awareness)[0][1]}.`,
        'Engage as much as you create — 30 minutes commenting in your niche drives more growth than one extra post.',
      ],
      nextActions: [
        'Create your content calendar template today',
        'Write and schedule this week\'s posts in one session',
        `Identify your 3 content pillars for ${businessType}`,
        'Spend 20 minutes engaging with your target audience today',
      ],
    }
  },
}

export default contentCalendarBuilder
