import { mediaVotes } from "@/db/tables"
import { eq, TransactionParam } from "@/db"

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
      return await tx.delete(mediaVotes).where(eq(mediaVotes.mediaId, mediaId))
        .then(() => null)

    const upd = await tx.update(mediaVotes)
      .set({ 
        count,
        avg: avg.toString(),
        avg_max: avg_max.toString()
       })
      .where(eq(mediaVotes.mediaId, mediaId))
      .returning().then(v => v.length ? v[0] : undefined)

    if (upd)
      return upd

    return await tx.insert(mediaVotes)
      .values({
        count,
        mediaId,
        avg: avg.toString(),
        avg_max: avg_max.toString()
      })
      .onConflictDoUpdate({
        target: [mediaVotes.mediaId],
        set: {
          count,
          avg: avg.toString(),
          avg_max: avg_max.toString()
        }
      }).returning()
        .then(v => v[0])
  }
}