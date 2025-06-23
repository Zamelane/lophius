import type { DBConnection, Transaction } from '../../index'

/**
 * @description Репозиторий для работы с моделью источников жанров
 */
export class SourceGenreRepository {
  constructor(protected tx: DBConnection | Transaction) {}
}
