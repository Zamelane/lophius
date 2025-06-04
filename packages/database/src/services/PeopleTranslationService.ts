import {
  type DBConnection,
  type Transaction,
  db
} from '../index'
import type { UoW } from './UnitOfWorks'
import { BaseService } from './types'
import { PeopleModel } from 'database/models/People/model'
import { PartialPeopleTranslateWithOutPeople, PeopleTranslationRepository } from 'database/models/PeopleTranslation'
import { PeopleTranslationModel } from 'database/models/PeopleTranslation/model'

export class PeopleTranslationService extends BaseService {
  private readonly peopleTranslationRepository: PeopleTranslationRepository

  constructor(tx?: DBConnection | Transaction, uow?: UoW) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.peopleTranslationRepository = new PeopleTranslationRepository(tx)
  }

  createPeopleTranslate(people: PeopleModel, translate: PartialPeopleTranslateWithOutPeople) {
    const model = new PeopleTranslationModel({
      ...translate,
      people
    })
    this.uow.registerOperation('insert', this.peopleTranslationRepository, model)
    return model
  }
}