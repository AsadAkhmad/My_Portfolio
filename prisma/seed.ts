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
      fullName: "Asadullo Mirzaakhmedov",
      headline: "BSc Computer Science Student | Data Analytics | Machine Learning Enthusiast",
      shortBio:
        "I turn messy real-world data into meaningful insights, combining my passion for technology, problem-solving, and artificial intelligence to build solutions that create real impact.",
      longBio:
        "I am a Computer Science student who fell in love with the journey from a simple dataset to a meaningful decision.\r\n\r\nWhat started as curiosity about how information can be organised and understood grew into a passion for Data Science, Artificial Intelligence, and building technology that solves real problems. Through my experience working with operational data and developing software projects, I discovered that the most interesting challenges are often hidden inside messy, real-world information.\r\n\r\nI enjoy exploring how data can reveal patterns, improve processes, and help people make better decisions. Whether it is analysing business operations, building applications, or experimenting with new technologies through hackathons, I am always looking for opportunities to learn, create, and improve.\r\n\r\nI am currently developing my skills towards becoming a Data Scientist / AI Engineer, focused on building practical solutions where data meets innovation.",
      degree: "B.Sc. Computer Science",
      university: "University of Greenwich",
      careerGoals:
        "To work as a Data Scientist / AI Engineer building production ML systems that make measurable decisions — not just notebooks that stay on a laptop.",
      interests: [
        "Machine Learning",
        "Natural Language Processing",
        "Data Engineering",
        "Competitive Data Science",
        "Open Source",
      ],
      avatarUrl: "/placeholders/avatar.png",
      resumeUrl: "/My_CV.pdf",
      email: "asadullomirzaaxmedov10@gmail.com",
      location: "Remote / Open to relocation",
    },
  });

  await prisma.socialLink.createMany({
    data: [
      { platform: "github", label: "GitHub", url: "https://github.com/AsadAkhmad", displayOrder: 1 },
      { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/asadullo-mirzaakhmedov/", displayOrder: 2 },
      { platform: "email", label: "Email", url: "mailto:asadullomirzaaxmedov10@gmail.com", displayOrder: 3 },
    ],
  });

  await prisma.experience.createMany({
    data: [
      {
        company: "IMB Truck Logistics",
        role: "Junior Data Analyst",
        location: "On Campus",
        employmentType: "Full-Time",
        startDate: new Date("2023-06-01"),
        endDate: new Date("2024-08-01"),
        description:
          "Worked with large logistics datasets to analyse operational performance, maintain data accuracy, and improve reporting processes. Used Excel-based data analysis and reconciliation techniques to process over 100,000 records monthly, identifying inconsistencies and uncovering financial discrepancies. Collaborated with internal teams to improve data quality and provide insights for operational decision-making.",
        responsibilities: [
          "Analysed and cleaned large logistics datasets containing 100,000+ records.",
          "Performed data reconciliation to identify missing, incorrect, or inconsistent information.",
          "Built and maintained Excel-based reports to monitor operational data.",
          "Investigated data discrepancies and identified errors affecting financial tracking.",
          "Supported decision-making by transforming raw operational data into structured insights.",
        ],
        achievements: [
          "Identified recurring data inconsistencies worth approximately $3,000 monthly and improved the accuracy of logistics reporting processes.",
        ],
        technologies: [
          "MySQL",
          "Microsoft Excel",
          "Google Sheets",
          "Data Analysis",
          "Python",
          "ChatGPT",
          "Data Cleaning",
          "Data Validation",
          "Reporting",
          "Logistics Analytics",
        ],
        displayOrder: 2,
      },
      {
        company: "IlHome Wood&Serve",
        role: "Production Assistant / CAD & Manufacturing Operator",
        location: "On campus",
        employmentType: "Part-time",
        startDate: new Date("2020-01-01"),
        endDate: new Date("2023-06-01"),
        description:
          "Worked in a furniture materials and wood processing company supporting manufacturing operations, CAD-based design, production workflow management, and customer order fulfilment. Gained practical experience combining technical design, machinery operation, and process optimisation in a real manufacturing environment.",
        responsibilities: [
          "Created 3D furniture models and technical drawings using CAD software for production preparation.",
          "Produced panel cutting calculations to optimise material usage and reduce waste.",
          "Operated edge-banding machinery and prepared MDF and laminated panels for furniture assembly.",
          "Worked with production teams to ensure accurate cutting, labelling, and identification of furniture components.",
          "Managed barcode labelling systems to improve part tracking and production organisation.",
          "Supported delivery coordination, customer orders, inventory handling, and payment processing when required.",
        ],
        achievements: [
          "Improved production preparation by creating accurate CAD models and cutting plans for furniture components.",
          "Helped reduce material waste through efficient panel calculations and optimisation of cutting layouts.",
          "Supported smoother production workflows by implementing accurate barcode tracking and component identification.",
          "Developed strong problem-solving skills through hands-on troubleshooting of machinery and manufacturing processes.",
          "Built experience across multiple business areas, including manufacturing, logistics, customer service, and operations management.",
        ],
        technologies: [
          "CAD Software (3D Modelling & Technical Drawings)",
          "Microsoft Office Suite (Excel, Word)",
          "CNC/Automated Cutting Systems",
          "Edge-Banding Machinery",
          "Barcode Labelling Systems",
          "Manufacturing Workflow Systems",
          "Material Planning & Cutting Optimisation",
          "Inventory & Order Management Tools",
        ],
        displayOrder: 3,
      },
      {
        company: "UoG Travel and Culture Society",
        role: "Treasurer",
        location: "University of Greenwich",
        employmentType: "Student Leadership / Society Committee",
        startDate: new Date("2026-06-15"),
        endDate: null,
        description:
          "Serving as Treasurer for the Travel & Culture Society, supporting the organisation and financial management of student-led events and activities. Responsible for maintaining accurate financial records, managing budgets, and helping the committee deliver engaging cultural and travel experiences for students.",
        responsibilities: [
          "Manage society finances, including tracking income, expenses, and event-related budgets.",
          "Maintain accurate financial records and support transparent reporting for society activities.",
          "Assist with planning and budgeting for student events, trips, and cultural activities.",
          "Collaborate with committee members to allocate resources effectively and ensure smooth event delivery.",
          "Support event organisation, including venue planning, logistics coordination, and communication with members.",
          "Monitor spending and help optimise the use of society funds.",
        ],
        achievements: [],
        technologies: ["Microsoft Excel (Budget Tracking & Financial Records)", "Google Sheets", "University Society Management Platforms"],
        displayOrder: 1,
      },
    ],
  });

  await prisma.education.create({
    data: {
      institution: "University of Greenwich",
      degree: "B.Sc. Computer Science",
      fieldOfStudy: "Computer Science, Data Science concentration",
      location: "London",
      startDate: new Date("2024-09-10"),
      endDate: new Date("2028-06-10"),
      gpa: "4.9 / 5.0",
      modules: [
        "Computer and Communication Systems",
        "Paradigms of Programming",
        "Algorithms and Data Structures",
        "Introduction to Compilers",
        "Principles of Software Engineering",
        "Advanced Mathematics for Computer Science",
      ],
      coursework: [
        "Prime-Dense Window Algorithm Optimisation project",
        "Outlook Email System Simulator (Programming)",
        "Emergency Hospital Data Monitoring System (Software Engineering Project)",
      ],
      achievements: [
        "Career Mentoring Certificate",
        "Alcatel Submarine Networks hackathon (Vessel Maintenance Data Management and Visualisation)",
        "Spotly (an app where students can find spots to study)",
      ],
      displayOrder: 1,
    },
  });

  const thePass = await prisma.project.create({
    data: {
      slug: "the-pass-restaurant-operations-assistant",
      name: "The Pass — Restaurant Operations Assistant",
      summary:
        "A restaurant operations platform that forecasts customer demand and assists with staff scheduling across floor, bar, and kitchen teams.",
      problemStatement:
        "Restaurants often rely on managers to manually estimate customer demand and create staff rotas, which can lead to overstaffing, understaffing, and inefficient operations.",
      description:
        "Designed and developed a prototype restaurant operations platform inspired by my experience working in hospitality. The application forecasts expected customer numbers using booking data and operational factors, then recommends staffing requirements for the floor, bar, and kitchen. The current version demonstrates the workflow and decision-making process without machine learning models, leaving the architecture ready for future predictive analytics integration. Claude Chat was used to assist with planning, architecture, and implementation.",
      technologies: ["Python", "JavaScript", "Next.js", "TypeScript", "PostgreSQL", "Claude Chat", "Git"],
      githubUrl: "https://github.com/AsadAkhmad",
      liveUrl: "https://lnkd.in/eXPaF8cf",
      keyAchievements: [
        "Designed an end-to-end restaurant operations workflow",
        "Built a prototype for customer demand forecasting and staff scheduling",
        "Separated staffing recommendations for floor, bar, and kitchen operations",
        "Designed the architecture to support future machine learning integration",
      ],
      lessonsLearned: [
        "Learned how operational data can support business decision-making",
        "Improved system design for data-driven applications",
        "Built a scalable foundation for future predictive analytics features",
      ],
      featured: true,
      status: "completed",
      startDate: new Date("2026-07-08"),
      endDate: new Date("2026-07-08"),
      displayOrder: 0,
    },
  });

  const spotly = await prisma.project.create({
    data: {
      slug: "spotly-study-space-finder",
      name: "Spotly",
      summary: "A web platform that helps students quickly find available study spaces around campus.",
      problemStatement:
        "Students often waste time searching for available places to study, especially during busy university periods. Spotly aims to reduce this friction by providing a simple way to discover suitable study locations.",
      description:
        "Built a full-stack web application that allows users to discover and manage study spaces. Responsible for backend development, including database structure, authentication logic, and data handling. Worked with Firebase services to store and manage application data while collaborating on the frontend experience.",
      technologies: ["JavaScript", "Firebase Firestore", "Firebase Authentication", "HTML", "CSS", "Vercel", "Git"],
      githubUrl: null,
      liveUrl: "https://lnkd.in/eDBxH-wR",
      keyAchievements: [
        "Designed and implemented the backend architecture and database structure",
        "Built authentication and data management functionality",
        "Collaborated with a teammate to deliver a complete working MVP",
      ],
      lessonsLearned: [
        "Learned how backend decisions impact frontend scalability",
        "Improved understanding of database design and cloud-based services",
        "Experienced working in a small development team environment",
      ],
      featured: true,
      status: "in_progress",
      startDate: new Date("2026-04-01"),
      endDate: null,
      displayOrder: 1,
    },
  });

  const aiPortfolio = await prisma.project.create({
    data: {
      slug: "ai-assisted-portfolio-platform",
      name: "AI-Assisted Data Science Portfolio Platform",
      summary: "A premium developer portfolio combining recruiter-focused presentation with an interactive data science terminal.",
      problemStatement:
        "Traditional portfolios only display information. This project explores a more interactive approach where recruiters can quickly understand experience, while technical visitors can explore structured portfolio data.",
      description:
        "Designed and developed a full-stack portfolio website using Next.js and TypeScript. Used Claude Code to accelerate development, architecture planning, debugging, and implementation. Built a custom admin CMS, database-backed content management system, recruiter view, and interactive SQL-style data laboratory.",
      technologies: [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS",
        "Prisma",
        "PostgreSQL",
        "Supabase",
        "Claude Code",
        "Vercel",
      ],
      githubUrl: null,
      liveUrl: null,
      keyAchievements: [
        "Built a complete full-stack portfolio from scratch",
        "Created an interactive SQL-style portfolio exploration system",
        "Implemented a custom admin dashboard for managing content",
        "Used AI-assisted development workflows with Claude Code",
      ],
      lessonsLearned: [
        "Learned full-stack application architecture and deployment workflows",
        "Improved ability to use AI coding assistants effectively",
        "Gained experience designing systems with both technical and non-technical users in mind",
      ],
      featured: true,
      status: "completed",
      startDate: new Date("2026-07-18"),
      endDate: new Date("2026-07-20"),
      displayOrder: 2,
    },
  });

  const sqlLab = await prisma.project.create({
    data: {
      slug: "portfolio-sql-lab",
      name: "This Portfolio's SQL Data Lab",
      summary: "A constrained SQL-subset query engine that lets visitors query this portfolio's real data.",
      problemStatement:
        "Static portfolios don't let technical visitors verify anything themselves — they just have to trust the prose.",
      description:
        "Designed and built a hand-rolled SQL-subset parser and compiler that maps a whitelisted query grammar onto real portfolio data (projects, skills, experience) through Prisma, with no raw SQL ever reaching the database.",
      technologies: ["TypeScript", "Next.js", "Prisma", "PostgreSQL"],
      githubUrl: null,
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
      { projectId: thePass.id, url: "/placeholders/ThePass.jpg", altText: "Restaurant Operations Assistant dashboard", displayOrder: 0 },
      { projectId: spotly.id, url: "/placeholders/SpotlyLogo.jpeg", altText: "Spotly study space finder interface", displayOrder: 0 },
      { projectId: aiPortfolio.id, url: "/placeholders/Portfolio.jpg", altText: "Interactive portfolio website preview", displayOrder: 0 },
      { projectId: sqlLab.id, url: "/placeholders/project-sql-lab.svg", altText: "SQL Lab terminal screenshot", displayOrder: 0 },
    ],
  });

  await prisma.skill.createMany({
    data: [
      { name: "Python", category: "programming", proficiency: 4, displayOrder: 1 },
      { name: "JavaScript", category: "programming", proficiency: 4, displayOrder: 2 },
      { name: "TypeScript", category: "programming", proficiency: 4, displayOrder: 3 },
      { name: "SQL", category: "programming", proficiency: 4, displayOrder: 4 },
      { name: "React", category: "programming", proficiency: 4, displayOrder: 5 },

      { name: "Data Analysis", category: "data_science", proficiency: 5, displayOrder: 1 },
      { name: "Microsoft Excel", category: "data_science", proficiency: 5, displayOrder: 2 },
      { name: "Statistics", category: "data_science", proficiency: 4, displayOrder: 3 },
      { name: "Data Visualization", category: "data_science", proficiency: 4, displayOrder: 4 },
      { name: "Algorithms & Data Structures", category: "data_science", proficiency: 3, displayOrder: 5 },

      { name: "Git", category: "tools", proficiency: 5, displayOrder: 1 },
      { name: "GitHub", category: "tools", proficiency: 5, displayOrder: 2 },
      { name: "Claude Code", category: "tools", proficiency: 4, displayOrder: 3 },
      { name: "PostgreSQL", category: "tools", proficiency: 3, displayOrder: 4 },
      { name: "FireBase", category: "tools", proficiency: 4, displayOrder: 5 },
    ],
  });

  await prisma.certification.createMany({
    data: [
      {
        title: "Alcatel Submarine Networks Hackathon",
        issuer: "University of Greenwich & ASN",
        category: "hackathon",
        dateEarned: new Date("2026-04-20"),
        credentialUrl: null,
        description: "Participated in a data-focused hackathon exploring data maintenance, management, and real-world engineering challenges.",
        displayOrder: 1,
      },
      {
        title: "Career Discovery Day (Leonardo Hotels)",
        issuer: "Leonardo Hotels",
        category: "certification",
        dateEarned: new Date("2026-05-01"),
        credentialUrl: null,
        description: null,
        displayOrder: 2,
      },
      {
        title: "Career Discovery Day (Genesis Cloud)",
        issuer: "Genesis Cloud",
        category: "certification",
        dateEarned: new Date("2026-05-01"),
        credentialUrl: null,
        description:
          "Attended a career discovery event to learn about Genesys' AI-powered customer experience platform, company culture, hiring process, and career opportunities while networking with industry professionals.",
        displayOrder: 3,
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
