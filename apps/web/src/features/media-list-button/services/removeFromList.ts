'use server'

import { and, db, eq } from 'database'
import { userListMedias } from 'database/schemas/lists'

export async function removeFromList(
  listId: number,
  mediaId: number,
  userId: number
) {
  await db
    .delete(userListMedias)
    .where(
      and(
        eq(userListMedias.listId, listId),
        eq(userListMedias.mediaId, mediaId),
        eq(userListMedias.userId, userId)
      )
    )

  return true
}
