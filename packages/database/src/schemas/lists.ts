import { bigint, bigserial, boolean, integer, pgTable, primaryKey, serial, unique, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { media_types } from "./media_types";
import { medias } from "./medias";

export const lists = pgTable('lists', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  authorId: bigint({ mode: 'number' }).references(() => users.id),
  title: varchar({ length: 55 }).notNull(), // Если системная, то здесь дефолтное название
  i18nTitleKey: varchar({ length: 255 }),   // Если так же указан ключ, то будет отображён он
  mediaType: media_types().notNull(),       // Для какого медиа эта коллекция
  order: integer().notNull()
}, table => [
  unique().on(table.title, table.i18nTitleKey, table.mediaType)
])

export type listsTableType = typeof lists.$inferSelect

// Вынес, чтобы можно было настраивать публичные (общие) списки (для себя/юзера)
export const userLists = pgTable('user_lists', {
  listId: bigint({ mode: 'number' }).references(() => lists.id),
  userId: bigint({ mode: 'number' }).references(() => users.id),
  comment: varchar({ length: 255 }),
  isHidden: boolean().notNull().default(false)  // Прячем ли список от других ?
}, table => [
  primaryKey({ columns: [table.listId, table.userId] })
])

export type userListsTableType = typeof userLists.$inferSelect

// Медиа в коллекции
export const userListMedias = pgTable('user_list_medias', {
  listId: bigint({ mode: 'number' }).references(() => lists.id),
  userId: bigint({ mode: 'number' }).references(() => users.id),
  mediaId: bigint({ mode: 'number' }).references(() => medias.id)
}, table => [
  primaryKey({ columns: [table.listId, table.mediaId, table.userId] })
])

export type userListMediasTableType = typeof userListMedias.$inferSelect