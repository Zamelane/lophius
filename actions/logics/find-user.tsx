import {db} from "@/db";
import {eq, or} from "drizzle-orm";
import {usersTable} from "@/db/tables";

export default async function FindUser({
  email,
  password
} : {
  email: string
  password: string
}) {
  return db.select()
    .from(usersTable)
    .where(or(
      eq(usersTable.email, email),
      eq(usersTable.password, password)
    ))
    .then(v => v.length === 0 ? v[0] : null)
}