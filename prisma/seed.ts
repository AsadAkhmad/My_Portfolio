import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      fullName: "Alex Morgan",
      headline: "Computer Science Student -> Data Scientist / AI Engineer",
      shortBio:
        "I build data pipelines and machine learning systems, and I'm looking for opportunities where I can turn messy real-world data into decisions.",
      longBio:
        "I'm a final-year Computer Science student who fell in love with the moment a model stops being math on a whiteboard and starts making real predictions on real data. Most of my time goes into end-to-end ML projects: sourcing and cleaning data, building and evaluating models, and shipping them behind an API or a dashboard someone can actually use. Outside of coursework, I compete in data science hackathons and contribute to a couple of open-source data tooling projects.",
      degree: "B.Sc. Computer Science",
      university: "University of Technology",
      careerGoals:
        "To work as a Data Scientist / AI Engineer building production ML systems that make measurable decisions — not just notebooks that stay on a laptop.",
      interests: [
        "Machine Learning",
        "Natural Language Processing",
        "Data Engineering",
        "Competitive Data Science",
        "Open Source",
      ],
      avatarUrl: "/placeholders/avatar.svg",
      resumeUrl: "/resume.pdf",
      email: "alex.morgan@example.com",
      location: "Remote / Open to relocation",
    },
  });

  await prisma.socialLink.createMany({
    data: [
      { platform: "github", label: "GitHub", url: "https://github.com/alexmorgan", displayOrder: 1 },
      { platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/alexmorgan", displayOrder: 2 },
      { platform: "email", label: "Email", url: "mailto:alex.morgan@example.com", displayOrder: 3 },
      { platform: "kaggle", label: "Kaggle", url: "https://kaggle.com/alexmorgan", displayOrder: 4 },
    ],
  });

  await prisma.experience.createMany({
    data: [
      {
        company: "DataForge Analytics",
        role: "Data Science Intern",
        location: "Remote",
        employmentType: "Internship",
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-09-01"),
        description:
          "Built and shipped a customer-churn prediction pipeline used by the growth team to prioritize retention outreach.",
        responsibilities: [
          "Designed the feature pipeline from raw event logs stored in a Postgres warehouse",
          "Trained and validated gradient-boosted tree models for churn prediction",
          "Built a lightweight FastAPI service to serve predictions to the internal dashboard",
        ],
        achievements: [
          "Improved churn model recall by 18% over the existing rules-based system",
          "Reduced feature pipeline runtime from 40 minutes to under 6 minutes",
        ],
        technologies: ["Python", "pandas", "scikit-learn", "XGBoost", "FastAPI", "PostgreSQL", "Docker"],
        displayOrder: 1,
      },
      {
        company: "University Research Lab — Applied ML Group",
        role: "Undergraduate Research Assistant",
        location: "On campus",
        employmentType: "Research",
        startDate: new Date("2024-09-01"),
        endDate: null,
        description:
          "Assist a postdoctoral researcher on a project applying transformer-based models to time-series forecasting.",
        responsibilities: [
          "Implemented data ingestion and preprocessing for multivariate sensor time-series",
          "Ran experiments comparing transformer and LSTM architectures for forecasting accuracy",
          "Wrote internal documentation and reproducible experiment notebooks",
        ],
        achievements: [
          "Co-authored a workshop paper submission on transformer forecasting benchmarks",
          "Cut experiment iteration time in half by building a shared experiment-tracking harness",
        ],
        technologies: ["Python", "PyTorch", "Weights & Biases", "NumPy", "Jupyter"],
        displayOrder: 2,
      },
    ],
  });

  await prisma.education.create({
    data: {
      institution: "University of Technology",
      degree: "B.Sc. Computer Science",
      fieldOfStudy: "Computer Science, Data Science concentration",
      location: "City, Country",
      startDate: new Date("2022-09-01"),
      endDate: new Date("2026-06-01"),
      gpa: "3.8 / 4.0",
      modules: [
        "Machine Learning",
        "Deep Learning",
        "Statistical Inference",
        "Databases & Data Modeling",
        "Distributed Systems",
        "Algorithms & Data Structures",
      ],
      coursework: [
        "Applied Bayesian Statistics",
        "Natural Language Processing",
        "Big Data Systems",
        "Data Visualization",
      ],
      achievements: [
        "Dean's List, 2023 and 2024",
        "Best Final-Year Project Nominee — ML for time-series forecasting",
      ],
      displayOrder: 1,
    },
  });

  const churnProject = await prisma.project.create({
    data: {
      slug: "churn-prediction-pipeline",
      name: "Customer Churn Prediction Pipeline",
      summary: "End-to-end ML pipeline predicting customer churn from raw product-usage event logs.",
      problemStatement:
        "The growth team had no reliable way to identify which customers were at risk of churning before it was too late to intervene.",
      description:
        "Built a full pipeline from raw event-log ingestion through feature engineering, model training, and a served prediction API. The pipeline runs nightly, scores the active customer base, and surfaces the highest-risk accounts to the retention team's dashboard.",
      technologies: ["Python", "pandas", "scikit-learn", "XGBoost", "FastAPI", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com/alexmorgan/churn-prediction-pipeline",
      liveUrl: null,
      keyAchievements: [
        "18% recall improvement over the prior rules-based system",
        "Nightly pipeline runtime reduced from 40 to 6 minutes",
      ],
      lessonsLearned: [
        "Feature leakage from timestamps was the single biggest source of misleadingly high validation scores",
        "A simpler, well-tuned XGBoost model outperformed a more complex ensemble in production",
      ],
      featured: true,
      status: "completed",
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-09-01"),
      displayOrder: 1,
    },
  });

  const forecastProject = await prisma.project.create({
    data: {
      slug: "transformer-time-series-forecasting",
      name: "Transformer-Based Time-Series Forecasting",
      summary: "Research project comparing transformer and LSTM architectures for multivariate sensor forecasting.",
      problemStatement:
        "Existing LSTM-based forecasts for multivariate sensor data degraded significantly at longer prediction horizons.",
      description:
        "Implemented a transformer-based forecasting model and benchmarked it against LSTM and classical statistical baselines across several public multivariate time-series datasets, with a shared experiment-tracking harness for reproducibility.",
      technologies: ["Python", "PyTorch", "Weights & Biases", "NumPy", "Jupyter"],
      githubUrl: "https://github.com/alexmorgan/transformer-forecasting",
      liveUrl: null,
      keyAchievements: [
        "Reduced long-horizon forecast error by 22% versus the LSTM baseline",
        "Co-authored a workshop paper submission based on these results",
      ],
      lessonsLearned: [
        "Positional encoding choice mattered more than model depth for this dataset's seasonality",
        "Reproducibility tooling paid for itself within the first week of experiments",
      ],
      featured: true,
      status: "in_progress",
      startDate: new Date("2024-09-01"),
      endDate: null,
      displayOrder: 2,
    },
  });

  const sqlLabProject = await prisma.project.create({
    data: {
      slug: "portfolio-sql-lab",
      name: "This Portfolio's SQL Data Lab",
      summary: "A constrained SQL-subset query engine that lets visitors query this portfolio's real data.",
      problemStatement:
        "Static portfolios don't let technical visitors verify anything themselves — they just have to trust the prose.",
      description:
        "Designed and built a hand-rolled SQL-subset parser and compiler that maps a whitelisted query grammar onto real portfolio data (projects, skills, experience) through Prisma, with no raw SQL ever reaching the database.",
      technologies: ["TypeScript", "Next.js", "Prisma", "PostgreSQL"],
      githubUrl: "https://github.com/alexmorgan/portfolio",
      liveUrl: "/lab",
      keyAchievements: [
        "Zero-trust query engine: unsupported syntax is unparseable by construction, not filtered after the fact",
      ],
      lessonsLearned: [
        "A small hand-written grammar is easier to reason about securely than a general parser plus a blacklist",
      ],
      featured: true,
      status: "completed",
      startDate: new Date("2026-01-01"),
      endDate: null,
      displayOrder: 3,
    },
  });

  await prisma.projectImage.createMany({
    data: [
      { projectId: churnProject.id, url: "/placeholders/project-churn.svg", altText: "Churn pipeline architecture diagram", displayOrder: 1 },
      { projectId: forecastProject.id, url: "/placeholders/project-forecast.svg", altText: "Forecast comparison chart", displayOrder: 1 },
      { projectId: sqlLabProject.id, url: "/placeholders/project-sql-lab.svg", altText: "SQL Lab terminal screenshot", displayOrder: 1 },
    ],
  });

  await prisma.skill.createMany({
    data: [
      { name: "Python", category: "programming", proficiency: 5, displayOrder: 1 },
      { name: "JavaScript", category: "programming", proficiency: 4, displayOrder: 2 },
      { name: "TypeScript", category: "programming", proficiency: 4, displayOrder: 3 },
      { name: "SQL", category: "programming", proficiency: 4, displayOrder: 4 },

      { name: "Data Analysis", category: "data_science", proficiency: 5, displayOrder: 1 },
      { name: "Machine Learning", category: "data_science", proficiency: 4, displayOrder: 2 },
      { name: "Statistics", category: "data_science", proficiency: 4, displayOrder: 3 },
      { name: "Data Visualization", category: "data_science", proficiency: 4, displayOrder: 4 },

      { name: "Git", category: "tools", proficiency: 5, displayOrder: 1 },
      { name: "Docker", category: "tools", proficiency: 3, displayOrder: 2 },
      { name: "Cloud (AWS/GCP)", category: "tools", proficiency: 3, displayOrder: 3 },
      { name: "PostgreSQL", category: "tools", proficiency: 4, displayOrder: 4 },
    ],
  });

  await prisma.certification.createMany({
    data: [
      {
        title: "1st Place — University Data Science Hackathon",
        issuer: "University of Technology",
        category: "hackathon",
        dateEarned: new Date("2025-03-01"),
        credentialUrl: null,
        description: "Built a real-time fraud-detection demo in 36 hours as part of a 3-person team.",
        displayOrder: 1,
      },
      {
        title: "DeepLearning.AI TensorFlow Developer Certificate",
        issuer: "DeepLearning.AI",
        category: "certification",
        dateEarned: new Date("2024-11-01"),
        credentialUrl: "https://coursera.org/verify/example",
        description: null,
        displayOrder: 2,
      },
      {
        title: "Top 8% — Kaggle Tabular Playground Series",
        issuer: "Kaggle",
        category: "competition",
        dateEarned: new Date("2025-05-01"),
        credentialUrl: "https://kaggle.com/competitions/example",
        description: null,
        displayOrder: 3,
      },
      {
        title: "President, Data Science Society",
        issuer: "University of Technology",
        category: "leadership",
        dateEarned: new Date("2025-01-01"),
        credentialUrl: null,
        description: "Lead a 40-member student society running weekly ML workshops and an annual hackathon.",
        displayOrder: 4,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
