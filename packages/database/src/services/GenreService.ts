import { GenreModel } from 'database/models/Genre/model'
import {
  type DBConnection,
  GenreRepository,
  type PartialGenre,
  type Transaction,
  db
} from '../index'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class GenreService extends BaseService {
  private readonly genreRepository: GenreRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.genreRepository = new GenreRepository(tx)
  }

  createIfNotExists(genre: PartialGenre) {
    const genreModel = new GenreModel(genre)
    this.uow.registerOperation('insert', this.genreRepository, genreModel)
    return genreModel
  }
}
