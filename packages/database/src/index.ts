import { PgTransaction } from 'drizzle-orm/pg-core';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { drizzle, NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';

import * as schema from './schemas'

export const db = drizzle(process.env.DB_URL!, { schema });

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