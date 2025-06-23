import type { DBConnection, Transaction } from '../../index'
import { insertGenre } from './methods'

/**
 * @description Репозиторий для работы с моделью жанров
 */
export class GenreRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  insert = insertGenre
}
