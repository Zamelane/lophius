import { bigint, bigserial, boolean, pgTable, primaryKey, smallint, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { sources } from "./sources";
import { external_images } from "./external_images";

export const people = pgTable('people', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  sourceId: bigint({ mode: 'number' }).references(() => sources.id).notNull(),
  external_id: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  age: smallint(),
  gender: boolean(),
  avatarExternalImageId: bigint({ mode: 'number' }).references(() => external_images.id)
}, table => [
  uniqueIndex().on(table.sourceId, table.external_id)
])

export type PeopleTableType = typeof people.$inferSelect