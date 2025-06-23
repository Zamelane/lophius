import type { DBConnection, Transaction } from '../../index'

/**
 * @description Репозиторий для работы с моделью дат релизов
 */
export class ReleaseDateRepository {
  constructor(protected tx: DBConnection | Transaction) {}
}
