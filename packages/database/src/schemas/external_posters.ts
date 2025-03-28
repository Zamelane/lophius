import { InferSelectModel } from "drizzle-orm";
import { bigint, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { medias } from "./medias";
import { external_images } from "./external_images";

export const external_posters = pgTable('external_posters', {
  mediaId: bigint({ mode: 'number' }).notNull().references(() => medias.id),
  externalImageId: bigint({ mode: 'number' }).notNull().references(() => external_images.id)
}, (table) => [
  primaryKey({ columns: [table.externalImageId, table.mediaId] })
])

export type ExternalPostersTableType = InferSelectModel<typeof external_posters>