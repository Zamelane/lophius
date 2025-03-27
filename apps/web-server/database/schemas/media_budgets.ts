import { InferSelectModel } from "drizzle-orm";
import { bigint, integer, pgTable } from "drizzle-orm/pg-core";

import { medias } from "./medias";

export const media_budgets = pgTable('media_budgets', {
  budget: integer().notNull(),
  mediaId: bigint({ mode: 'number' }).references(() => medias.id).notNull().primaryKey()
})

export type MediaBudgetsTableType = InferSelectModel<typeof media_budgets>