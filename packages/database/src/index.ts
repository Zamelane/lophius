import { PgTransaction } from 'drizzle-orm/pg-core';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { drizzle, NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';

import * as schema from './schemas'

export let db = drizzle(
  buildConnectUrl({
    dbName: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    password: process.env.DB_PASSWORD!,
    port: process.env.DB_PORT!,
    user: process.env.DB_USER!
  }),
  { schema }
);

export * from './utils'
export * from './models'

export type Transaction = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema, ExtractTablesWithRelations<typeof schema>
>
export type DBConnection = typeof db
export type TransactionParam = {
  tx: Transaction
}

// Для плагинов
export * from 'drizzle-orm'
export { Client } from 'pg'

// Прочее

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

export function updateDatabaseCredentials(connectUrl: string) {
  db = drizzle(connectUrl, { schema })
}