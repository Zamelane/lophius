import type { DBConnection, Transaction } from '../../index'
import { deleteNotInGenres, insertMediaGenre } from './methods'

/**
 * @description Репозиторий для работы с моделью жанра медиа
 */
export class MediaGenreRepository {
  constructor(protected tx: DBConnection | Transaction) {}

  deleteNotIn = deleteNotInGenres
  insert = insertMediaGenre
}
