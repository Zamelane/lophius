import { eq, and, notInArray, TransactionParam } from "@/db"
import { originCountries } from "@/db/tables/origin-countries"

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

    promises.push(tx.delete(originCountries).where(
      and(
        eq(originCountries.mediaId, mediaId),
        notInArray(originCountries.countryId, countriesIds)
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
    return tx.insert(originCountries).values({
      mediaId,
      countryId
    }).onConflictDoNothing()
      .returning()
      .then(v => v[0])
  }
}