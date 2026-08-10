import { integer, text } from "drizzle-orm/sqlite-core/columns";
import { sqliteTable } from "drizzle-orm/sqlite-core/table";
import { timestamps } from "@/db/helpers/timestampsColumns";
import { usersTable } from "./users";
import { uniqueIndex } from "drizzle-orm/sqlite-core/indexes";

export const telegramChatsTable = sqliteTable("telegram_chats", {
    user_id: integer().notNull().references(() => usersTable.id),
    chat_id: text("chat_id", { length: 255 }).notNull(),
    thread_id: text("thread_id", { length: 255 }),
    ...timestamps
}, (table) => [
    uniqueIndex("telegram_chats_user_id_chat_id_thread_id_unique").on(table.user_id, table.chat_id, table.thread_id),
]);