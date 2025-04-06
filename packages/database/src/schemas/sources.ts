import { pgEnum, pgTable, bigserial } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {companies} from "database/schemas/companies.ts";
import {external_images} from "database/schemas/external_images.ts";

export const sourceType = pgEnum('source_type', ['user', 'parser'])

export const sources = pgTable('sources', {
  type: sourceType().notNull(),
  id: bigserial({ mode: 'number' }).primaryKey()
})

export const sourcesRelations = relations(sources, ({ one, many }) => ({
  companies: many(companies),
  externalImages: many(external_images)
}))