import type { DBConnection, Transaction } from '../../index'
import { insertPeople } from './methods'

/**
 * @description Репозиторий для работы с моделью жанров
 */
export class PeopleRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  insert = insertPeople
}
