import type { GenreModel } from 'database/models/Genre/model'
import type { MediaModel } from 'database/models/Media/model'
import { MediaGenreModel } from 'database/models/MediaGenre/model'
import {
  type DBConnection,
  MediaGenreRepository,
  type Transaction,
  db
} from '../index'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class MediaGenreService extends BaseService {
  private readonly mediaGenreRepository: MediaGenreRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.mediaGenreRepository = new MediaGenreRepository(tx)
  }

  insert(media: MediaModel, genre: GenreModel) {
    const mediaGenreModel = new MediaGenreModel({
      genre,
      media
    })
    this.uow.registerOperation(
      'insert',
      this.mediaGenreRepository,
      mediaGenreModel
    )
    return mediaGenreModel
  }

  deleteNotIn(media: MediaModel, genres: GenreModel[]) {
    this.uow.registerOperation(
      'deleteNotIn',
      this.mediaGenreRepository,
      genres,
      media
    )
  }
}
