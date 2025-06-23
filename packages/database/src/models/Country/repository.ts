import type { DBConnection, Transaction } from 'database/index.ts'
import { findCountryByISO, insertCountry } from './methods'
/**
 * @description Репозиторий для работы с моделью стран
 */
export class CountryRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  findByISO_3166_1 = findCountryByISO

  insert = insertCountry
}
