import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { medias } from "./medias";

// export const statuses = pgEnum('statuses', [
//   'canceled',
//   'coming out',
//   'completed',
//   'in production',
//   'ongoing',
//   'planned'
// ])

// export type StatusesEnumType = typeof statuses.enumValues[number]

export const statuses = pgTable('statuses', {
  id: serial().primaryKey(),
  status: varchar().notNull().unique()
})

export type StatusesTableType = typeof statuses.$inferSelect

export const statusesRelations = relations(statuses, ({ one, many }) => ({
  media: many(medias)
}))