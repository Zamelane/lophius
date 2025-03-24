import { Country } from "@/interfaces";
import { countries } from "@/db/tables";
import { db, eq, TransactionParam } from "@/db";

export class CountryManager {
  public static async create({
    tx,
    iso_3166_1,
    english_name
  }: TransactionParam & {
    english_name: string
    iso_3166_1: string
  }) {
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

  public static async getOneByISO_3166_1(iso_3166_1: string): Promise<Country|undefined> {
    return await db.select().from(countries).where(eq(countries.iso_3166_1, iso_3166_1)).limit(1)
      .then(v => v.length ? v[0] : undefined)
  }
}