import type { DBConnection, Transaction } from '../../index'

/**
 * @description Репозиторий для работы с моделью внешних изображений
 */
export class FileRepository {
  constructor(protected tx: DBConnection | Transaction) {}
}
