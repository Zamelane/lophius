import { eq, TransactionParam } from "database"
import { media_votes } from "database/src/schemas"

export class MediaVotesManager {
  static async Save({
    tx,
    avg,
    count,
    mediaId,
    avg_max
  }: TransactionParam & {
    mediaId: number
    avg: null|number,
    count: null|number,
    avg_max: number
  }) {
    if (!avg)
      return await tx.delete(media_votes).where(eq(media_votes.mediaId, mediaId))
        .then(() => null)

    const upd = await tx.update(media_votes)
      .set({ 
        count,
        avg: avg.toString(),
        avg_max: avg_max.toString()
       })
      .where(eq(media_votes.mediaId, mediaId))
      .returning().then(v => v.length ? v[0] : undefined)

    if (upd)
      return upd

    return await tx.insert(media_votes)
      .values({
        count,
        mediaId,
        avg: avg.toString(),
        avg_max: avg_max.toString()
      })
      .onConflictDoUpdate({
        target: [media_votes.mediaId],
        set: {
          count,
          avg: avg.toString(),
          avg_max: avg_max.toString()
        }
      }).returning()
        .then(v => v[0])
  }
}