import {db} from "@/db";
import {eq} from "drizzle-orm";
import {usersTable} from "@/db/tables";

export const CheckNicknameExists = async (nickname: string) => {
  console.log('CheckNicknameExists');
  const users = await db.select()
    .from(usersTable)
    .where(eq(usersTable.nickname, nickname))
  return users.length === 0
}