import { InferSelectModel } from "drizzle-orm";
import { bigint, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { externalImages } from "./external-images";

export const externalBackdrops = pgTable('external_backdrops', {
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id),
  externalImageId: bigint({ mode: 'number' }).notNull().references(() => externalImages.id)
}, (table) => [
  primaryKey({ columns: [table.externalImageId, table.mediaId] })
])

export type ExternalBackdropsTableType = InferSelectModel<typeof externalBackdrops>