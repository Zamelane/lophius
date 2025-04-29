import {
  type DBConnection,
  type Transaction,
  TranslateRepository,
  db
} from '../index'
import type { TranslatedModel } from '../models/Translate/type'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'

export class TranslateService extends BaseService {
  private readonly translateRepo: TranslateRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.translateRepo = new TranslateRepository(tx)
  }

  addTranslateByMedia(data: TranslatedModel) {
    this.uow.registerOperation('insert', this.translateRepo, data)
  }
}
