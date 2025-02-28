import {db} from "@/db";
import bcrypt from "bcrypt";
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
      eq(usersTable.email, email)
    ))
    .then(v => v.length === 1 ? v[0] : null)
    .then(
      async (v)=>
        v
          ? (await bcrypt.compare(password, v.password) ? v : null)
          : null
    )
}