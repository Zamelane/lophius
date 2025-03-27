import { eq, TransactionParam } from "database";
import { media_budgets } from "@/database/schemas";

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
      return await tx.delete(media_budgets).where(eq(media_budgets.mediaId, mediaId))
        .then(() => null)

    const upd = await tx.update(media_budgets)
      .set({ budget })
      .where(eq(media_budgets.mediaId, mediaId))
      .returning().then(v => v.length ? v[0] : undefined)

    if (upd)
      return upd

    return await tx.insert(media_budgets)
      .values({budget, mediaId})
      .onConflictDoUpdate({
        set: { budget },
        target: [media_budgets.mediaId]
      }).returning()
        .then(v => v[0])
  }
}