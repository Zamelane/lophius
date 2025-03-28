import { spoken_languages } from "database/src/schemas";
import { eq, and, notInArray, TransactionParam } from "database";

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

    promises.push(tx.delete(spoken_languages).where(
      and(
        eq(spoken_languages.mediaId, mediaId),
        notInArray(spoken_languages.languageId, languageIds)
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
    return tx.insert(spoken_languages).values({
      mediaId,
      languageId
    }).onConflictDoNothing()
      .returning()
      .then(v => v[0])
  }
}