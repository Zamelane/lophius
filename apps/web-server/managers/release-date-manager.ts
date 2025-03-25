import { eq, and, inArray, notInArray, TransactionParam } from "@/db";
import { countries, releaseDates, ReleaseDatesTableType } from "@/db/tables";

export class ReleaseDateManager {
  public static async Create({
    tx,
    data
  }: TransactionParam & {
    data: ReleaseDatesTableType,
  }): Promise<ReleaseDatesTableType> {
    return tx.insert(releaseDates).values({
      ...data
    }).onConflictDoUpdate({
      set: { ...data },
      target: [releaseDates.mediaId, releaseDates.countryId]
    }).returning()
      .then(v => v[0])
  }

  public static async DeleteAllByMediaId({
    tx,
    mediaId
  }: TransactionParam & {
    mediaId: number
  }) {
    await tx.delete(releaseDates).where(eq(releaseDates.mediaId, mediaId))
  }

  public static async DeleteAllIfNotIncludeCountries({
    tx,
    mediaId,
    countries_iso_3166_1
  }: TransactionParam & {
    countries_iso_3166_1: string[]
    mediaId: number
  }) {
    await tx.delete(releaseDates).where(
      and(
        eq(releaseDates.mediaId, mediaId),
        notInArray(
          releaseDates.countryId,
          tx.select({countryId: countries.id})
            .from(countries)
            .where(inArray(countries.iso_3166_1, countries_iso_3166_1))
        )
      )
    )
  }
}