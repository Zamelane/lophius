import { type DBConnection, type Transaction, db } from '../index'
import { CountryTranslationRepository } from '../models/CountryTranslation'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class CountryTranslationService extends BaseService {
  private readonly countryTranslationRepository: CountryTranslationRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.countryTranslationRepository = new CountryTranslationRepository(tx)
  }
}
