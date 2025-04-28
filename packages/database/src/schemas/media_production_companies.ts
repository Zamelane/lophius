import { bigint, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { companies } from "./companies";
import {relations} from "drizzle-orm";

export const media_production_companies = pgTable('media_production_companies', {
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id),
  companyId: bigint({ mode: 'number' }).notNull().references(() => companies.id),
}, (table) => [
  primaryKey({
    columns: [table.companyId, table.mediaId]
  })
])

export type MediaProductionCompaniesTableType = typeof media_production_companies.$inferSelect

export const mediaProductionCompaniesRelations = relations(media_production_companies, ({ one, many }) => ({
  media: one(medias, {
    fields: [media_production_companies.mediaId],
    references: [medias.id]
  }),
  company: one(companies, {
    fields: [media_production_companies.companyId],
    references: [companies.id]
  })
}))