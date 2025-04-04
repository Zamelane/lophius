import { relations, InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, integer, smallint, bigserial, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users";

export const files = pgTable('files', {
  size: integer(),
  hash: varchar().notNull(),
  width: smallint().notNull(),
  height: smallint().notNull(),
  ext: varchar({ length: 4 }).notNull(),
  externalPath: varchar({ length: 255 }),
  id: bigserial({ mode: "number" }).primaryKey(),
  createdAt: timestamp({ mode: 'date' }).defaultNow(),
  // updateAt: timestamp({ mode: 'date' }).$onUpdate(() => sql`CURRENT_TIMESTAMP`)
})

// FIX: похоже в обратную сторону не обязательно указывать ? (а то drizzle studio ошибку кидает)
// export const filesRelations = relations(
//   files, ({ many }) => ({
//     users: many(users)
//   })
// )

export type FilesTableType = InferSelectModel<typeof files>