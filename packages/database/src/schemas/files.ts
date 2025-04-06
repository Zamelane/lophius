import { relations, InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, integer, smallint, bigserial, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users";
import {countryTranslations} from "database/schemas/country_translations.ts";

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

export type FilesTableType = typeof files.$inferSelect

export const filesRelations = relations(files, ({ one, many }) => ({

}))