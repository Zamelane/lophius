import { StatusRepository } from 'database/models/Status'
import { StatusModel } from 'database/models/Status/model'
import { type DBConnection, type Transaction, db } from '../index'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class StatusService extends BaseService {
  private readonly statusRepository: StatusRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.statusRepository = new StatusRepository(tx)
  }

  saveStatus(status: string) {
    const statusModel = new StatusModel({ status })
    this.uow.registerOperation('insert', this.statusRepository, statusModel)
    return statusModel
  }
}
