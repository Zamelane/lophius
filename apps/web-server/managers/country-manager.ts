import { db, eq, TransactionParam } from "@/db";
import { countries, CountriesTableType } from "@/db/tables";

export class CountryManager {
  public static async Create({
    tx,
    iso_3166_1,
    english_name
  }: TransactionParam & {
    english_name: string
    iso_3166_1: string
  }): Promise<CountriesTableType> {
    return await tx.insert(countries).values({
      iso_3166_1,
      english_name
    }).onConflictDoUpdate({
      target: [countries.iso_3166_1],
      set: {
        english_name
      }
    }).returning().then(v => v[0])
  }

  public static async GetOneByISO_3166_1(iso_3166_1: string): Promise<CountriesTableType|undefined> {
    return await db.select().from(countries).where(eq(countries.iso_3166_1, iso_3166_1)).limit(1)
      .then(v => v.length ? v[0] : undefined)
  }
}