import {pgTable, varchar, bigserial} from "drizzle-orm/pg-core";

const usersTable = pgTable('users', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  nickname: varchar({ length: 25 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull()
})

export { usersTable }