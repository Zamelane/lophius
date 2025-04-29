import { eq } from 'drizzle-orm'
import {
  type Country,
  type CountryRepository,
  queryOneResult
} from '../../index'
import { countries } from '../../schemas'
import type { CountryModel } from './model'

/**
 * Метод получения страны по ISO_3166_1 из базы
 * @param iso_3166_1
 */
export async function findCountryByISO(
  this: CountryRepository,
  iso_3166_1: string
): Promise<Country | undefined> {
  return queryOneResult(
    await this.tx
      .select()
      .from(countries)
      .where(eq(countries.iso_3166_1, iso_3166_1))
      .limit(1)
  )
}

/**
 * Операция Insert для модели UoW
 */
export async function insertCountry(
  this: CountryRepository,
  data: CountryModel
) {
  const exist = queryOneResult(
    await this.findByISO_3166_1(data.iso_3166_1),
    (r) => (data.id = r.id)
  )

  if (exist) return exist

  return queryOneResult(
    await this.tx.insert(countries).values(data).returning(),
    (r) => (data.id = r.id)
  )!
}
