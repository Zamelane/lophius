import type { DBConnection, Transaction } from '../../index'

/**
 * @description Репозиторий для работы с моделью разговорных языков
 */
export class SpokenLanguageRepository {
  constructor(protected tx: DBConnection | Transaction) {}
}
