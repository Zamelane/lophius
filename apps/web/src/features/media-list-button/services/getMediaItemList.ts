import { and, db, eq, sql } from "database";
import { userListMedias } from "database/schemas/lists";

export async function getMediaItemList(mediaId: number, userId: number) {
  return (await db.select({
    ids: sql<number[]>`json_agg(distinct ${userListMedias.listId})`
  })
    .from(userListMedias)
    .where(and(
      eq(userListMedias.mediaId, mediaId),
      eq(userListMedias.userId, userId)
    )))[0].ids
}