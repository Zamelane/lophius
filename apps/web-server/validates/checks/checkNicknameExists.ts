import {db} from "database";
import {eq} from "drizzle-orm";
import {users} from "@/database/schemas";

export const CheckNicknameExists = async (nickname: string) => {
  console.log('CheckNicknameExists');
  const userRows = await db.select()
    .from(users)
    .where(eq(users.nickname, nickname.toLocaleLowerCase()))
  return userRows.length === 0
}