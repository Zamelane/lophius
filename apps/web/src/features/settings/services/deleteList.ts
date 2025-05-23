'use server'

import { getCurrentUser } from "@/src/shared/lib/dal";
import { and, db, eq } from "database";
import { lists } from "database/schemas/lists";

export async function deleteList(listId: number) {
  const user = await getCurrentUser()

  if (!user) {
    return
  }

  await db.delete(lists)
    .where(and(
      eq(lists.id, listId),
      eq(lists.authorId, user.id)
    ))

  return true
}