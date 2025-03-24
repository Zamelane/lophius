import { db, eq } from "@/db";
import { Country } from "@/interfaces";
import { countries } from "@/db/tables";

export class CountryManager {
  public static async getOneByISO_3166_1(iso_3166_1: string): Promise<Country|undefined> {
    return await db.select().from(countries).where(eq(countries.iso_3166_1, iso_3166_1)).limit(1)
      .then(v => v.length ? v[0] : undefined)
  }
}