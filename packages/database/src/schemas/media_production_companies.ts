import { bigint, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { companies } from "./companies";

export const media_production_companies = pgTable('media_production_companies', {
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id),
  companyId: bigint({ mode: 'number' }).notNull().references(() => companies.id),
}, (table) => [
  primaryKey({
    columns: [table.companyId, table.mediaId]
  })
])