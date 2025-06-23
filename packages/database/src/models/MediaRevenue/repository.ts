import type { DBConnection, Transaction } from '../../index'
import { deleteMediaRevenue, insertMediaRevenue } from './methods'

/**
 * @description Репозиторий для работы с моделью дохода медиа
 */
export class MediaRevenueRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  delete = deleteMediaRevenue
  insert = insertMediaRevenue
}
