import type { DBConnection, Transaction } from '../../index'
import { getSourceById } from './methods'

/**
 * @description Репозиторий для работы с моделью источников
 */
export class SourceRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  getById = getSourceById
}
