import {pgTable, varchar, bigserial} from "drizzle-orm/pg-core";

const usersTable = pgTable('users', {
  id: bigserial({ mode: 'number' }).primaryKey(),
  email: varchar({ length: 255 }).unique(),
  nickname: varchar({ length: 25 }).unique(),
  password: varchar({ length: 255 })
})

export { usersTable }