import { eq, TransactionParam } from "@/db"
import { mediaRevenues } from "@/db/tables/media-revenues"

export class RevenueManager {
  static async Save({
    tx,
    revenue,
    mediaId
  }: TransactionParam & {
    mediaId: number
    revenue: null|number
  }) {
    if (!revenue)
      return await tx.delete(mediaRevenues).where(eq(mediaRevenues.mediaId, mediaId))
        .then(() => null)

    const upd = await tx.update(mediaRevenues)
      .set({ revenue })
      .where(eq(mediaRevenues.mediaId, mediaId))
      .returning().then(v => v.length ? v[0] : undefined)

    if (upd)
      return upd

    return await tx.insert(mediaRevenues)
      .values({revenue, mediaId})
      .onConflictDoUpdate({
        set: { revenue },
        target: [mediaRevenues.mediaId]
      }).returning()
        .then(v => v[0])
  }
}