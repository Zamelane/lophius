import { eq, and, notInArray, TransactionParam } from "database"
import { origin_countries } from "@/database/schemas/origin_countries"

export class OriginCountryManager {
  public static async AutoLink({
    tx,
    mediaId,
    countriesIds
  }: TransactionParam & {
    countriesIds: number[]
    mediaId: number
  }) {
    const promises = []
    for (const countryId of countriesIds) {
      promises.push(this.Link({
        tx,
        mediaId,
        countryId
      }))
    }

    promises.push(tx.delete(origin_countries).where(
      and(
        eq(origin_countries.mediaId, mediaId),
        notInArray(origin_countries.countryId, countriesIds)
      )
    ))

    await Promise.all(promises)
  }

  public static async Link({
    tx,
    mediaId,
    countryId
  }: TransactionParam & {
    countryId: number
    mediaId: number
  }) {
    return tx.insert(origin_countries).values({
      mediaId,
      countryId
    }).onConflictDoNothing()
      .returning()
      .then(v => v[0])
  }
}