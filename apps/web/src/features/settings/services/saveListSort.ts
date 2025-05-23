'use server'

import { getCurrentUser } from "@/src/shared/lib/dal"
import { db } from "database"
import { userLists } from "database/schemas/lists"

export async function saveListSort(listsIds: number[]) {
  console.log(listsIds)
  const user = await getCurrentUser()
  if (!user) return

  await db.transaction(async (tx) => {
    for (const [index, id] of listsIds.entries()) {
      console.log(id)
      await tx
        .insert(userLists)
        .values({
          order: index,
          listId: id,
          userId: user.id
        })
        .onConflictDoUpdate({
          target: [userLists.listId, userLists.userId],
          set: { order: index }
        })
    }
  })

  return true
}
