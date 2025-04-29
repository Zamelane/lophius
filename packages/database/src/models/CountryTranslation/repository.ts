import type { DBConnection, Transaction } from '../../index'

/**
 * @description Репозиторий для работы с моделью переводов стран
 */
export class CountryTranslationRepository {
  constructor(protected tx: DBConnection | Transaction) {}
}
