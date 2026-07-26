# Asadullo Mirzaakhmedov — Portfolio

Personal portfolio built with Next.js, TypeScript, Tailwind CSS, and a Postgres/Prisma backend.

The site has three parts:

- **Landing page** (`/`) — introduction, resume download, and two entry points below.
- **Recruiter View** (`/portfolio`) — a clean, scannable summary of experience, education, projects, skills, and certifications.
- **Data Science Lab** (`/lab`) — a terminal-style page where visitors can run a constrained set of SQL-like queries against the real portfolio data.

All content (profile, education, experience, projects, skills, certifications) is stored in Postgres and managed through a private admin dashboard at `/admin`, rather than edited in code.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Database

This project uses Prisma against a Postgres database (Supabase in production, local Postgres for dev).

```bash
npx prisma migrate dev   # apply schema migrations
npx prisma studio        # browse/edit data directly
npx prisma db seed       # reset to the seed.ts snapshot (destructive — wipes existing rows)
```

### Admin CMS

Manage all content at `/admin` without touching code. Set up your login with:

```bash
npm run admin:hash-password -- 'your password'
```

Then add the printed `ADMIN_PASSWORD_HASH` and a `SESSION_SECRET` to `.env` (see `.env.example`).

## Deploying

Deploy on [Vercel](https://vercel.com/new) with a Supabase Postgres database — see `.env.example` for the required environment variables.
