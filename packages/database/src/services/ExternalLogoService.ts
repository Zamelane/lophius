import { type DBConnection, type Transaction, db } from 'database'
import {
  ExternalLogoRepository,
  type PartialExternalLogo
} from 'database/models/ExternalLogo'
import { ExternalLogoModel } from 'database/models/ExternalLogo/model'
import type { MediaModel } from 'database/models/Media/model'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class ExternalLogoService extends BaseService {
  private readonly externalLogoRepository: ExternalLogoRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.externalLogoRepository = new ExternalLogoRepository(tx)
  }

  insert(data: PartialExternalLogo) {
    const externalLogoModel = new ExternalLogoModel({
      ...data
    })
    this.uow.registerOperation(
      'insert',
      this.externalLogoRepository,
      externalLogoModel
    )
    return externalLogoModel
  }

  deleteNotIn(media: MediaModel, logos: ExternalLogoModel[]) {
    this.uow.registerOperation(
      'deleteNotIn',
      this.externalLogoRepository,
      logos,
      media
    )
  }
}
