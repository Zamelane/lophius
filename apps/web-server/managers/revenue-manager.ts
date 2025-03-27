import { eq, TransactionParam } from "database"
import { media_revenues } from "@/database/schemas/media_revenues"

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
      return await tx.delete(media_revenues).where(eq(media_revenues.mediaId, mediaId))
        .then(() => null)

    const upd = await tx.update(media_revenues)
      .set({ revenue })
      .where(eq(media_revenues.mediaId, mediaId))
      .returning().then(v => v.length ? v[0] : undefined)

    if (upd)
      return upd

    return await tx.insert(media_revenues)
      .values({revenue, mediaId})
      .onConflictDoUpdate({
        set: { revenue },
        target: [media_revenues.mediaId]
      }).returning()
        .then(v => v[0])
  }
}