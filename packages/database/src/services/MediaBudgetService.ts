import type { MediaModel } from 'database/models/Media/model'
import { MediaBudgetModel } from 'database/models/MediaBudget/model'
import {
  type DBConnection,
  type MediaBudget,
  MediaBudgetRepository,
  type Transaction,
  db
} from '../index'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class MediaBudgetService extends BaseService {
  private readonly mediaBudgetRepository: MediaBudgetRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.mediaBudgetRepository = new MediaBudgetRepository(tx)
  }

  saveBudget(media: MediaModel, budget: MediaBudget['budget'] | undefined) {
    if (budget) {
      const mediaBudgetModel = new MediaBudgetModel({ budget })
      this.uow.registerOperation(
        'insert',
        this.mediaBudgetRepository,
        mediaBudgetModel,
        media
      )
      return mediaBudgetModel
    }

    this.uow.registerOperation('delete', this.mediaBudgetRepository, media)
  }
}
