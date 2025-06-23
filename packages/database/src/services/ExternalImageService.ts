import {
  ExternalImageRepository,
  type PartialExternalImage
} from 'database/models/ExternalImage'
import { ExternalImageModel } from 'database/models/ExternalImage/model'
import {
  type DBConnection,
  type SourceId,
  type Transaction,
  db
} from '../index'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class ExternalImageService extends BaseService {
  private readonly externalImageRepository: ExternalImageRepository

  constructor(
    protected sourceId: SourceId,
    tx?: DBConnection | Transaction,
    uow?: UoW
  ) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.externalImageRepository = new ExternalImageRepository(tx)
  }

  async findOrCreate(data: PartialExternalImage) {
    let model = await this.externalImageRepository.findByCredentials(
      data.path,
      this.sourceId
    )

    if (!model) {
      model = new ExternalImageModel({
        ...data,
        sourceId: this.sourceId
      })
      this.uow.registerOperation(
        'insert',
        this.externalImageRepository,
        model,
        this.sourceId
      )
    }

    if (
      data.path !== model.path ||
      (data.language && !model.language) ||
      data.vote_count !== model.vote_count ||
      data.vote_avg !== model.vote_avg
    ) {
      model.setData({
        ...data,
        sourceId: this.sourceId
      })
      this.uow.registerOperation('update', this.externalImageRepository, model)
    }

    return model
  }
}
