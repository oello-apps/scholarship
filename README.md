# ScholarSphere — Scholarships for International Students

A modern directory of upcoming scholarships for international students,
built with **Next.js 16 (App Router), Tailwind CSS 4, shadcn-style UI
components, Prisma ORM, and PostgreSQL**. No auth, no accounts.

## Pages

- `/` — Homepage: hero search, featured scholarships, browse by region/level, closing soon
- `/scholarships` — Full directory with search + filters (level, region, funding)
- `/scholarships/[id]` — Single scholarship by ID (also works with its slug)
- `/contact` — Contact form (saved to PostgreSQL via a Server Action as `ContactMessage`)
- `/about` — About us
- `/terms` — Terms of Service
- `/disclaimer` — Disclaimer

## Tech

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4, shadcn-style components (`src/components/ui/`: Button, Badge, Card, Input) built on `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot`
- Prisma ORM (`prisma/schema.prisma` — `Scholarship` + `ContactMessage` models)
- PostgreSQL (local, Neon, or Supabase)

## Setup

```bash
cd scholarship-app
npm install

# 1. Point Prisma at Postgres — copy and edit:
cp .env.example .env
# DATABASE_URL="postgresql://postgres:password@localhost:5432/scholarship_db?schema=public"
# Or use Neon / Supabase and paste its connection string.

# 2. Create the tables and seed 12 curated scholarships:
npx prisma migrate dev --name init
npx prisma db seed

# 3. Run it:
npm run dev    # http://localhost:3000
npm run build  # production build
npm start
```

> The seed command is wired up in `package.json` (`prisma.seed`).
> If the database is not reachable yet, pages fall back to the same curated
> data in `src/lib/scholarships-data.ts` so the site still renders — connect
> Postgres and seed to use the live database.

## Neon (live database)

The live database is the Neon project **Scholarship**
(`long-poetry-40041583`, region `aws-eu-west-2`, Postgres 18), database
`neondb` on the `production` branch. It holds the `Scholarship`,
`ContactMessage` and `_prisma_migrations` tables, seeded with the 12
scholarships.

`.env` holds two connection strings (never commit it):

- `DATABASE_URL` — pooled (PgBouncer) connection, with `pgbouncer=true`,
  used by the app at runtime.
- `DIRECT_URL` — direct connection, used by Prisma Migrate.

Neon returns connection strings with `channel_binding=require`; Prisma
does not support channel binding, so it is stripped from both URLs
(`sslmode=require` is kept).

If direct TCP access to Postgres (port 5432) is available, the normal
flow works:

```bash
npx prisma migrate deploy   # apply prisma/migrations/20261111123300_init
npx prisma db seed          # or npm run db:seed
```

If TCP is blocked but HTTPS is allowed (as in this Muse workspace),
use the HTTP seed script instead. It applies the same migration SQL
and seeds the data through Neon's serverless driver
(`@neondatabase/serverless`), and records the migration in
`_prisma_migrations` so Prisma later sees it as applied:

```bash
npm run db:seed:http
```

To allow direct database connections in Muse, open Muse settings →
Permissions → Direct network protocols and switch databases from Deny
to Ask.

## Data

Scholarships are seeded from `src/lib/scholarships-data.ts` (Chevening,
Fulbright, DAAD EPOS, Erasmus Mundus, Australia Awards, MEXT, Gates
Cambridge, Knight-Hennessy, Lester B. Pearson, Swedish Institute,
Commonwealth Shared, Swiss Government Excellence). Deadlines are indicative
for the 2027 intake and vary by country/programme — every card links to the
official page, and the site tells visitors to verify there before applying.

## Deploy

Deploy the Next.js app to Vercel and set `DATABASE_URL` in the project
environment variables (use a pooled Neon/Supabase connection string for
serverless). Then run `npx prisma migrate deploy` against the production
database and seed once.
