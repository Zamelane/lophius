import { db } from 'database'
import { users } from 'database/src/schemas'
import { eq } from 'drizzle-orm'

export const CheckEmailExists = async (email: string) => {
  console.log('Check email exists')
  const userRows = await db.select().from(users).where(eq(users.email, email))
  return userRows.length === 0
}
