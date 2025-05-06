import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from './schemas'
import { sql } from "drizzle-orm";

// конфигурация global
declare global {
  var isStartConfigured: boolean
}

// Логировать запросы ?
const logger = true

let db: NodePgDatabase<typeof schema> = drizzle(
  buildConnectUrl({
    dbName: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    password: process.env.DB_PASSWORD!,
    port: process.env.DB_PORT!,
    user: process.env.DB_USER!
  }),
  { schema, logger }
)

if (!global.isStartConfigured){
  global.isStartConfigured = true
  await autoConfigure(db).catch(() => {
    global.isStartConfigured = false
    console.log('Auto configured errored ...')
  })
}

export { db }

// Какие-то важные действия
async function autoConfigure(db: NodePgDatabase<typeof schema>) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return
  }

  console.log('Auto configured is started ...')

  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm`)
  await db.execute(sql`CREATE INDEX CONCURRENTLY IF NOT EXISTS index_translates_on_title_trgm ON translates USING gin (title gin_trgm_ops)`)
}

// Переподключение к базе
export function updateDatabaseCredentials(connectUrl: string) {
  db = drizzle(connectUrl, { schema, logger })
}

// Строитель строки подключения
export function buildConnectUrl({
  user,
  password,
  host,
  port,
  dbName
}: {
  host: string
  port: string | number
  user: string
  password: string
  dbName: string
}) {
  return `postgresql://${user}:${password}@${host}:${port}/${dbName}`
}