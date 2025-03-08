import { relations } from "drizzle-orm";
import { bigint, bigserial, boolean, date, pgTable, varchar } from "drizzle-orm/pg-core";
import { externalVotes } from "./externalVote";

export const medias = pgTable('medias', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  externalId: varchar({ length: 12 }), // 10 символов на int32 и 2 для префикса сервисов
  releaseDate: date(),
  isAdult: boolean().notNull().default(true),
  revenue: bigint({ mode: 'number' }),
  budget: bigint({ mode: 'number' })
})

export const mediasRelations = relations(
  medias, ({ one }) => ({
    externalVotes: one(externalVotes)
  })
)