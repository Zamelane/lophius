import bcrypt from 'bcrypt'
import { db } from 'database'
import { users } from 'database/src/schemas'
import { eq, or } from 'drizzle-orm'

export default async function FindUser({
  email,
  password
}: {
  email: string
  password: string
}) {
  return db
    .select()
    .from(users)
    .where(or(eq(users.email, email)))
    .then((v) => (v.length === 1 ? v[0] : null))
    .then(async (v) =>
      v ? ((await bcrypt.compare(password, v.password)) ? v : null) : null
    )
}
