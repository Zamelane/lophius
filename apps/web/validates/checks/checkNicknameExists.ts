import { db } from 'database'
import { users } from 'database/src/schemas'
import { eq } from 'drizzle-orm'

export const CheckNicknameExists = async (nickname: string) => {
  console.log('CheckNicknameExists')
  const userRows = await db
    .select()
    .from(users)
    .where(eq(users.nickname, nickname.toLocaleLowerCase()))
  return userRows.length === 0
}
