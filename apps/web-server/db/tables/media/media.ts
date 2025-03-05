import { relations } from "drizzle-orm";
import { bigserial, boolean, date, pgTable, varchar } from "drizzle-orm/pg-core";
import { budgets } from "./budgets";
import { revenues } from "./revenue";
import { externalVotes } from "./externalVote";

export const medias = pgTable('medias', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  externalId: varchar({ length: 12 }), // 10 символов на int32 и 2 для префикса сервисов
  releaseDate: date(),
  isAdult: boolean().default(true),
})

export const mediasRelations = relations(
  medias, ({ one }) => ({
    budgets: one(budgets),
    revenues: one(revenues),
    externalVotes: one(externalVotes)
  })
)