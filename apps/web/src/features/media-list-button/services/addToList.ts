'use server'

import { db } from 'database'
import { userListMedias } from 'database/schemas/lists'

export async function addToList(
  listId: number,
  mediaId: number,
  userId: number
) {
  await db
    .insert(userListMedias)
    .values({
      listId,
      mediaId,
      userId
    })
    .onConflictDoNothing()

  return true
}
