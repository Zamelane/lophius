import { Country } from "@/interfaces";
import { countries } from "@/db/tables";
import { db, eq, TransactionParam } from "@/db";

export class CountryManager {
  public static async Create({
    tx,
    country
  }: TransactionParam & {
    country: Country
  }) {
    console.log(country.iso_3166_1)
    return tx.insert(countries).values({
      ...country
    }).onConflictDoUpdate({
      target: [countries.iso_3166_1],
      set: {
        iso_3166_1: country.iso_3166_1
      }
    }).returning().then(v => v[0])
  }

  public static async GetCountryByISO_3166_1({
    iso_3166_1
  }: { iso_3166_1: string }) {
    return db.select().from(countries).where(
      eq(countries.iso_3166_1, iso_3166_1)
    ).then(v => v.length ? v[0] : undefined)
  }

  public static async SaveOrGetCountry({
    tx,
    country
  }: TransactionParam & {
    country: Country
  }) {
    const existCountry = await this.GetCountryByISO_3166_1({
      iso_3166_1: country.iso_3166_1
    })

    if (existCountry)
      return existCountry
    
    return this.Create({
      tx,
      country
    })
  }
}