import { mediaBudgets } from "@/db/tables";
import { eq, TransactionParam } from "@/db";

export class MediaBudgetManager {
  static async Save({
    tx,
    budget,
    mediaId
  }: TransactionParam & {
    mediaId: number
    budget: null|number
  }) {
    if (!budget)
      return await tx.delete(mediaBudgets).where(eq(mediaBudgets.mediaId, mediaId))
        .then(() => null)

    const upd = await tx.update(mediaBudgets)
      .set({ budget })
      .where(eq(mediaBudgets.mediaId, mediaId))
      .returning().then(v => v.length ? v[0] : undefined)

    if (upd)
      return upd

    return await tx.insert(mediaBudgets)
      .values({budget, mediaId})
      .onConflictDoUpdate({
        set: { budget },
        target: [mediaBudgets.mediaId]
      }).returning()
        .then(v => v[0])
  }
}