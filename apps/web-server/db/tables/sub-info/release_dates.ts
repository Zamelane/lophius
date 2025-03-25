import { InferSelectModel } from "drizzle-orm";
import { date, bigint, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { medias } from "../medias";
import { countries } from "../countries";

export const releaseDates = pgTable('release_dates', {
  date: date().notNull(),
  countryId: integer().notNull().references(() => countries.id),
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id)
}, (table) => [
  primaryKey({
    columns: [table.countryId, table.mediaId]
  })
])

export type ReleaseDatesTableType = InferSelectModel<typeof releaseDates>