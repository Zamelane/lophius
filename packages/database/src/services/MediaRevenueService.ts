import type { MediaModel } from 'database/models/Media/model'
import {
  type MediaRevenue,
  MediaRevenueRepository
} from 'database/models/MediaRevenue'
import { MediaRevenueModel } from 'database/models/MediaRevenue/model'
import { type DBConnection, type Transaction, db } from '../index'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class MediaRevenueService extends BaseService {
  private readonly mediaRevenueRepository: MediaRevenueRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.mediaRevenueRepository = new MediaRevenueRepository(tx)
  }

  saveRevenue(media: MediaModel, revenue: MediaRevenue['revenue'] | undefined) {
    if (revenue) {
      const mediaRevenueModel = new MediaRevenueModel({ revenue })
      this.uow.registerOperation(
        'insert',
        this.mediaRevenueRepository,
        mediaRevenueModel,
        media
      )
      return mediaRevenueModel
    }

    this.uow.registerOperation('delete', this.mediaRevenueRepository, media)
  }
}
