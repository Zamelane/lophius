import {db} from "@/db";
import {eq} from "drizzle-orm";
import {users} from "@/db/tables";

export const CheckNicknameExists = async (nickname: string) => {
  console.log('CheckNicknameExists');
  const userRows = await db.select()
    .from(users)
    .where(eq(users.nickname, nickname))
  return userRows.length === 0
}