import { relations } from 'drizzle-orm'
import {
  bigserial,
  integer,
  pgTable,
  smallint,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core'

export const files = pgTable('files', {
  size: integer(),
  hash: varchar().notNull(),
  width: smallint().notNull(),
  height: smallint().notNull(),
  ext: varchar({ length: 4 }).notNull(),
  externalPath: varchar({ length: 255 }),
  id: bigserial({ mode: 'number' }).primaryKey(),
  createdAt: timestamp({ mode: 'date' }).defaultNow()
  // updateAt: timestamp({ mode: 'date' }).$onUpdate(() => sql`CURRENT_TIMESTAMP`)
})

export type FilesTableType = typeof files.$inferSelect

export const filesRelations = relations(files, ({ one, many }) => ({}))
