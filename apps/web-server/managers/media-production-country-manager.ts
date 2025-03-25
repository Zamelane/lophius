import { countries, mediaProductionCountries } from "@/db/tables";
import { eq, and, inArray, notInArray, TransactionParam } from "@/db";

export class MediaProductionCountryManager {
  public static async Link({
    tx,
    mediaId,
    countryId
  }: TransactionParam & {
    countryId: number
    mediaId: number
  }) {
    return tx.insert(mediaProductionCountries).values({
      mediaId,
      countryId
    }).onConflictDoNothing()
      .returning()
      .then(v => v[0])
  }

  public static async UnlinkIfNotArrayISO_3166_1({
    tx,
    mediaId,
    iso_3166_1_array
  }: TransactionParam & {
    iso_3166_1_array: string[],
    mediaId: number
  }) {
    await tx.delete(mediaProductionCountries).where(
      and(
        eq(mediaProductionCountries.mediaId, mediaId),
        notInArray(
          mediaProductionCountries.countryId,
          tx.select({countryId: countries.id})
            .from(countries)
            .where(inArray(countries.iso_3166_1, iso_3166_1_array))
        )
      )
    )
  }
}