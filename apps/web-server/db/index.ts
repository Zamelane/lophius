import { PgTransaction } from 'drizzle-orm/pg-core';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { drizzle, NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';

import * as schema from './tables'

export const db = drizzle(process.env.DB_URL!, { schema });

// Для плагинов
export * from 'drizzle-orm'

export type Transaction = PgTransaction<
  NodePgQueryResultHKT,
  typeof schema, ExtractTablesWithRelations<typeof schema>
>
export type TransactionParam = {
  tx: Transaction
}