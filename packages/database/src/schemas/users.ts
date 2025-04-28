import { relations, InferSelectModel } from "drizzle-orm";
import {bigint, pgTable, varchar, boolean, bigserial} from "drizzle-orm/pg-core";

import { files } from "./files";

export const users = pgTable('users', {
  bio: varchar({ length: 255 }),
  isAdmin: boolean().default(false).notNull(),
  password: varchar({ length: 255 }).notNull(),
  id: bigserial({ mode: 'number' }).primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  nickname: varchar({ length: 25 }).notNull().unique(),
  avatarId: bigint({ mode: 'number' }).references(() => files.id),
  backgroundImageId: bigint({ mode: 'number' }).references(() => files.id)
})

export type UsersTableType = typeof users.$inferSelect

export const usersRelations = relations(
  users, ({ one }) => ({
    avatar: one(files, {
      references: [files.id],
      fields: [users.avatarId]
    }),
    backgroundImage: one(files, {
      references: [files.id],
      fields: [users.backgroundImageId]
    })
  })
)