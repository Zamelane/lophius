import type { ExtractTablesWithRelations } from 'drizzle-orm'
import {type NodePgQueryResultHKT } from 'drizzle-orm/node-postgres'
import type { PgTransaction } from 'drizzle-orm/pg-core'

import * as schema from './schemas'
import { db } from './configuration'

export * from './utils'
export * from './models'
export * from './configuration'

export type Transaction = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>
export type DBConnection = typeof db
export type TransactionParam = {
  tx: Transaction
}

// Для плагинов
export * from 'drizzle-orm'
export { Client } from 'pg'