import { integer, text } from "drizzle-orm/sqlite-core/columns";
import { sqliteTable } from "drizzle-orm/sqlite-core/table";
import { timestamps } from "@/db/helpers/timestampsColumns";

export const usersTable = sqliteTable("users", {
    id: integer().primaryKey({ autoIncrement: true }),
    login: text("login", { length: 255 }).unique().notNull(),
    password: text("password", { length: 255 }).notNull(),
    ...timestamps
});

export type UsersTableType = typeof usersTable.$inferSelect;