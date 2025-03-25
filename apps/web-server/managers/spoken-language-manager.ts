import { spokenLanguages } from "@/db/tables";
import { eq, and, notInArray, TransactionParam } from "@/db";

export class SpokenLanguageManager {
  public static async AutoLink({
    tx,
    mediaId,
    languageIds
  }: TransactionParam & {
    languageIds: number[]
    mediaId: number
  }) {
    const promises = []
    for (const languageId of languageIds) {
      promises.push(this.Link({
        tx,
        mediaId,
        languageId
      }))
    }

    promises.push(tx.delete(spokenLanguages).where(
      and(
        eq(spokenLanguages.mediaId, mediaId),
        notInArray(spokenLanguages.languageId, languageIds)
      )
    ))

    await Promise.all(promises)
  }

  public static async Link({
    tx,
    mediaId,
    languageId
  }: TransactionParam & {
    languageId: number
    mediaId: number
  }) {
    return tx.insert(spokenLanguages).values({
      mediaId,
      languageId
    }).onConflictDoNothing()
      .returning()
      .then(v => v[0])
  }
}