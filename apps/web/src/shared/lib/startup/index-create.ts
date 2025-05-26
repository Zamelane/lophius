import { schema, sql } from "database"
import { NodePgDatabase } from "drizzle-orm/node-postgres"

export async function indexCreate(db: NodePgDatabase<typeof schema>) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return
  }

  console.log('Create extension pg_trim ...')
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm`)

  console.log('Create index ...')
  await db.execute(
    sql`CREATE INDEX CONCURRENTLY IF NOT EXISTS index_translates_on_title_trgm ON translates USING gin (title gin_trgm_ops)`
  )
}