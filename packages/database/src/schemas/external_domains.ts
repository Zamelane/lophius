import {InferSelectModel, relations} from "drizzle-orm";
import { serial, boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import {external_images} from "database/schemas/external_images.ts";

export const external_domains = pgTable('external_domains', {
  id: serial().primaryKey(),
  https: boolean().notNull().default(true),
  domain: varchar({ length: 255 }).notNull().unique()
})

export type ExternalDomainsTableType = InferSelectModel<typeof external_domains>

export const externalDomainsRelations = relations(external_domains, ({ one, many }) => ({
  externalImages: many(external_images)
}))