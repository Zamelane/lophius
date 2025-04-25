import {relations} from "drizzle-orm";
import { serial, boolean, pgTable, varchar, index } from "drizzle-orm/pg-core";
import {external_images} from "database/schemas/external_images.ts";

export const external_domains = pgTable('external_domains', {
  id: serial().primaryKey(),
  https: boolean().notNull().default(true),
  domain: varchar({ length: 255 }).notNull().unique()
}, (table) => [
  index("external_domain_https_idx").on(table.https),
  index("external_domain_domain_idx").on(table.domain)
])

export type ExternalDomainsTableType = typeof external_domains.$inferSelect

export const externalDomainsRelations = relations(external_domains, ({ one, many }) => ({
  externalImages: many(external_images)
}))