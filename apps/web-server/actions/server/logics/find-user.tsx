import {db} from "@/db";
import bcrypt from "bcrypt";
import {users} from "@/db/tables";
import {eq, or} from "drizzle-orm";

export default async function FindUser({
  email,
  password
} : {
  email: string
  password: string
}) {
  return db.select()
    .from(users)
    .where(or(
      eq(users.email, email)
    ))
    .then(v => v.length === 1 ? v[0] : null)
    .then(
      async (v)=>
        v
          ? (await bcrypt.compare(password, v.password) ? v : null)
          : null
    )
}