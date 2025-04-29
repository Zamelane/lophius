import {
  deleteNotInBackdrops,
  insertBackdrop
} from 'database/models/ExternalBackdrop/methods.ts'
import type { DBConnection, Transaction } from '../../index'

/**
 * @description Репозиторий для работы с моделью внешних задников (фоны медиа)
 */
export class ExternalBackdropRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  deleteNotIn = deleteNotInBackdrops
  insert = insertBackdrop
}
