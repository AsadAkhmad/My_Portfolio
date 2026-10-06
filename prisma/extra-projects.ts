// Projects added after the initial seed. Shared by prisma/seed.ts (full reseed)
// and scripts/add-projects.ts (non-destructive upsert into the live database).

export const extraProjects = [
  {
    slug: "skint-maintenance-loan-vs-london-rents",
    name: "Skint — Maintenance Loan vs London Rents",
    summary:
      "A data-journalism web app showing how far the maximum UK student maintenance loan stretches against London rents, with a finder that ranks boroughs by affordability.",
    problemStatement:
      "Students often discover only after signing a tenancy that the maintenance loan does not cover London rent. Skint shows the gap before the decision is made.",
    description:
      "Built an end-to-end data product: a Python pipeline downloads and cleans public ONS rental data and the gov.uk maximum maintenance loan figure, computes the rent-versus-loan gap for every London borough and bedroom type, groups boroughs into four tiers with k-means clustering, and forecasts rents 12 months ahead using damped-trend exponential smoothing with an 80% prediction interval. A React frontend reads the generated JSON and presents an interactive gap chart, a live borough finder driven by part-time income and living costs, a tier map and the forecast. Built during a hackathon, with Claude used to assist development.",
    technologies: ["Python", "pandas", "scikit-learn", "statsmodels", "React", "Recharts", "Tailwind CSS", "Vite", "Vercel", "Claude"],
    githubUrl: null as string | null,
    liveUrl: "https://findskint.vercel.app",
    keyAchievements: [
      "Built a reproducible Python pipeline from public ONS and gov.uk sources to a single JSON file that drives every figure in the app",
      "Clustered London boroughs into four affordability tiers with k-means and reported silhouette scores openly, noting they are modest",
      "Forecast borough rents 12 months ahead with exponential smoothing and showed the uncertainty band rather than a single line",
      "Built a live borough finder that re-ranks affordability as the user changes income and living costs",
    ],
    lessonsLearned: [
      "Being honest about model limits (small samples, modest silhouette scores, the City of London missing a rent index) makes a data story more credible",
      "Separating the data pipeline from the frontend keeps the app simple and every number traceable to a source",
    ],
    featured: true,
    status: "completed",
    startDate: new Date("2026-10-01"),
    endDate: new Date("2026-10-01"),
    displayOrder: 4,
  },
  {
    slug: "overlap-timetable-matching-app",
    name: "Overlap — Timetable Matching for Students",
    summary:
      "A timetable-matching web app that shows which students are free at the same time and turns a shared gap into a hangout.",
    problemStatement:
      "Students have gaps between lectures but no way to see whose gaps line up with theirs, especially across different courses and years.",
    description:
      "Designed and built a front-end app where students mark their weekly timetable and Overlap compares it against everyone else's. A heatmap shades each one-hour slot by how many people are free at the same time, and any slot can be turned into a hangout with a place, a time and invited friends. The matching logic is a small pure-JavaScript module (merging free slots into blocks and intersecting them between people), and state persists in localStorage with no backend, auth or API keys. Built as a hackathon demo with Claude used to assist development.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Vite", "Claude"],
    githubUrl: null as string | null,
    liveUrl: null as string | null,
    keyAchievements: [
      "Wrote a pure overlap engine that merges free time into blocks and intersects them across users, with no React, dates or storage dependencies",
      "Built a free-time heatmap with day, minimum-break and friends-only filters",
      "Prevented double-booking by offering only the time slots the user is actually free in when creating a hangout",
      "Shipped a fully interactive demo with a public hangouts feed, join and leave, and a one-click demo reset",
    ],
    lessonsLearned: [
      "Keeping the core logic pure made the timetable maths easy to reason about and independent of the UI",
      "Designing for a live demo (a seeded dataset, a demo clock, a reset button) shapes the product as much as the features do",
    ],
    featured: true,
    status: "completed",
    startDate: new Date("2026-10-06"),
    endDate: new Date("2026-10-06"),
    displayOrder: 5,
  },
];
