import type { DBConnection, Transaction } from '../../index'
import { findPeopleTranslateById, insertPeopleTranslate, updatePeopleTranslateById } from './methods'

/**
 * @description Репозиторий для работы с моделью переводов людей
 */
export class PeopleTranslationRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  insert = insertPeopleTranslate

  find = findPeopleTranslateById

  update = updatePeopleTranslateById
}
