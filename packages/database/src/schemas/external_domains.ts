import { InferSelectModel } from "drizzle-orm";
import { serial, boolean, pgTable, varchar } from "drizzle-orm/pg-core";

export const external_domains = pgTable('external_domains', {
  id: serial().primaryKey(),
  https: boolean().notNull().default(true),
  domain: varchar({ length: 255 }).notNull().unique()
})

export type ExternalDomainsTableType = InferSelectModel<typeof external_domains>