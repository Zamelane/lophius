import { eq, and, inArray, notInArray, TransactionParam } from "database";
import { countries, media_production_countries } from "database/src/schemas";

export class MediaProductionCountryManager {
  public static async Link({
    tx,
    mediaId,
    countryId
  }: TransactionParam & {
    countryId: number
    mediaId: number
  }) {
    return tx.insert(media_production_countries).values({
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
    await tx.delete(media_production_countries).where(
      and(
        eq(media_production_countries.mediaId, mediaId),
        notInArray(
          media_production_countries.countryId,
          tx.select({countryId: countries.id})
            .from(countries)
            .where(inArray(countries.iso_3166_1, iso_3166_1_array))
        )
      )
    )
  }
}