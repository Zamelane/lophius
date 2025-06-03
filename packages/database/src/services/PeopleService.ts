import { PartialPeople, PeopleRepository } from 'database/models/People'
import {
  type DBConnection,
  type Transaction,
  db
} from '../index'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'
import { PeopleModel } from 'database/models/People/model'
import { ExternalImageModel } from 'database/models/ExternalImage/model'

export class PeopleService extends BaseService {
  private readonly peopleRepository: PeopleRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.peopleRepository = new PeopleRepository(tx)
  }

  createPeople(data: PartialPeople, avatar?: ExternalImageModel) {
    const model = new PeopleModel({
      ...data,
      avatar
    })
    this.uow.registerOperation('insert', this.peopleRepository, model)
    return model
  }
}
