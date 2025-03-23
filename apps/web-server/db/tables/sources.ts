import { pgEnum, pgTable, bigserial } from "drizzle-orm/pg-core";

export const sourceType = pgEnum('source_type', ['user', 'parser'])

export const sources = pgTable('sources', {
  type: sourceType().notNull(),
  id: bigserial({ mode: 'number' }).primaryKey()
})