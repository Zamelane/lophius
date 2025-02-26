import {db} from "@/db";
import {eq} from "drizzle-orm";
import {usersTable} from "@/db/tables";

export const CheckEmailExists = async (email: string) => {
  console.log('Check email exists');
  const users = await db.select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
  return users.length === 0
}