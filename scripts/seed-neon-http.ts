/**
 * Create the ScholarSphere tables on Neon and seed them — over HTTPS.
 *
 * Why this exists: Prisma Migrate and Prisma Client speak the Postgres
 * wire protocol over TCP (port 5432). Some environments (including this
 * Muse workspace, where direct database connections are denied) block
 * that port, while HTTPS is allowed. Neon's serverless driver
 * (@neondatabase/serverless) runs SQL over HTTPS instead, so this script
 * applies the Prisma migration SQL and seeds the data through it.
 *
 * It also records the migration in `_prisma_migrations`, so a later
 * `prisma migrate dev` / `prisma migrate deploy` from a machine with
 * direct TCP access sees the migration as already applied and does not
 * try to re-create the tables.
 *
 * Usage:
 *   npx tsx scripts/seed-neon-http.ts
 *
 * Reads DATABASE_URL from .env. Prints only counts and titles, never
 * the connection string or password.
 */
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";
import { SCHOLARSHIPS } from "../src/lib/scholarships-data";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function envValue(key: string): string {
  const env = readFileSync(join(root, ".env"), "utf-8");
  for (const line of env.split("\n")) {
    const match = line.match(new RegExp(`^${key}="?(.*?)"?$`));
    if (match) return match[1];
  }
  throw new Error(`${key} not found in .env`);
}

const MIGRATION_NAME = "20261111123300_init";

async function main() {
  const sql = neon(envValue("DATABASE_URL"));

  // 1. Apply the Prisma migration SQL, one statement at a time.
  const migrationSql = readFileSync(
    join(root, "prisma", "migrations", MIGRATION_NAME, "migration.sql"),
    "utf-8",
  );
  const statements = migrationSql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const statement of statements) {
    // Make re-runs safe: the migration SQL uses plain CREATE TABLE /
    // CREATE INDEX, which fails if the tables already exist.
    const idempotent = statement
      .replace('CREATE TABLE "', 'CREATE TABLE IF NOT EXISTS "')
      .replace('CREATE UNIQUE INDEX "', 'CREATE UNIQUE INDEX IF NOT EXISTS "')
      .replace('CREATE INDEX "', 'CREATE INDEX IF NOT EXISTS "');
    await sql.query(idempotent, []);
  }
  console.log(`Applied ${statements.length} migration statements.`);

  // 2. Record the migration so Prisma knows it is applied.
  const checksum = createHash("sha256").update(migrationSql).digest("hex");
  await sql.query(
    `CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" VARCHAR(255) NOT NULL PRIMARY KEY,
      "checksum" VARCHAR(64) NOT NULL,
      "finished_at" TIMESTAMPTZ,
      "migration_name" VARCHAR(255) NOT NULL,
      "logs" TEXT,
      "rolled_back_at" TIMESTAMPTZ,
      "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "applied_steps_count" INTEGER NOT NULL DEFAULT 0
    )`,
    [],
  );
  await sql.query(
    `INSERT INTO "_prisma_migrations"
       ("id", "checksum", "finished_at", "migration_name", "logs", "started_at", "applied_steps_count")
     VALUES ($1, $2, now(), $3, '', now(), $4)
     ON CONFLICT ("id") DO NOTHING`,
    [MIGRATION_NAME, checksum, MIGRATION_NAME, statements.length],
  );
  console.log(`Recorded migration ${MIGRATION_NAME} in _prisma_migrations.`);

  // 3. Seed the scholarships (upsert by slug).
  for (const s of SCHOLARSHIPS) {
    await sql.query(
      `INSERT INTO "Scholarship"
         ("id", "slug", "title", "provider", "country", "region", "level",
          "fundingType", "amount", "deadline", "description", "eligibility",
          "benefits", "howToApply", "field", "applicationUrl", "officialUrl",
          "featured", "createdAt", "updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,now(),now())
       ON CONFLICT ("slug") DO UPDATE SET
         "title" = EXCLUDED."title",
         "provider" = EXCLUDED."provider",
         "country" = EXCLUDED."country",
         "region" = EXCLUDED."region",
         "level" = EXCLUDED."level",
         "fundingType" = EXCLUDED."fundingType",
         "amount" = EXCLUDED."amount",
         "deadline" = EXCLUDED."deadline",
         "description" = EXCLUDED."description",
         "eligibility" = EXCLUDED."eligibility",
         "benefits" = EXCLUDED."benefits",
         "howToApply" = EXCLUDED."howToApply",
         "field" = EXCLUDED."field",
         "applicationUrl" = EXCLUDED."applicationUrl",
         "officialUrl" = EXCLUDED."officialUrl",
         "featured" = EXCLUDED."featured",
         "updatedAt" = now()`,
      [
        s.id,
        s.slug,
        s.title,
        s.provider,
        s.country,
        s.region,
        s.level,
        s.fundingType,
        s.amount,
        s.deadline,
        s.description,
        s.eligibility,
        s.benefits,
        s.howToApply,
        s.field,
        s.applicationUrl,
        s.officialUrl,
        s.featured,
      ],
    );
  }

  // 4. Verify.
  const [{ count }] = await sql.query(
    `SELECT count(*)::int AS count FROM "Scholarship"`,
    [],
  );
  console.log(`Scholarships in Neon: ${count}`);
  const rows = await sql.query(
    `SELECT "title", "country", "deadline" FROM "Scholarship"
     ORDER BY "deadline" ASC LIMIT 3`,
    [],
  );
  for (const row of rows as { title: string; country: string; deadline: string }[]) {
    console.log(` - ${row.title} (${row.country}, ${String(row.deadline).slice(0, 10)})`);
  }
}

main().catch((error) => {
  console.error("Seed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
