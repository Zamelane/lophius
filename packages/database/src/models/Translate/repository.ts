import { insertTranslate } from 'database/models/Translate/methods.ts'
import type { DBConnection, Transaction } from '../../index'

/**
 * @description Репозиторий для работы с моделью переводов
 */
export class TranslateRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  insert = insertTranslate
}
