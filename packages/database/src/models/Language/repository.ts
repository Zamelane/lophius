import type { DBConnection, Transaction } from '../../index'
import { findLanguageByISO, insertLanguage } from './methods'

/**
 * @description Репозиторий для работы с моделью переводов
 */
export class LanguageRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  findByISO_639_1 = findLanguageByISO

  insert = insertLanguage
}
