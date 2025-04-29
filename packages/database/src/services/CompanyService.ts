import { type DBConnection, type Transaction, db } from '../index'
import { CompanyRepository } from '../models/Company/repository'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class CompanyService extends BaseService {
  private readonly companyRepository: CompanyRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.companyRepository = new CompanyRepository(tx)
  }
}
