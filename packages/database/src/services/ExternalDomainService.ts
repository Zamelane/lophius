import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection} from "../index";
import { ExternalDomain, ExternalDomainRepository } from "database/models/ExternalDomain";
import { ExternalDomainModel } from "database/models/ExternalDomain/model";

export class ExternalDomainService extends BaseService {
  private readonly externalDomainRepository: ExternalDomainRepository

  constructor(
    tx?: DBConnection|Transaction,
    uow?: UoW
  ) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.externalDomainRepository = new ExternalDomainRepository(tx)
  }

  async findOrCreate(domain: ExternalDomain['domain'], https: ExternalDomain['https']) {
    const credentials = {
      domain,
      https
    }

    let model = await this.externalDomainRepository.find(credentials)
    
    if (!model) {
      model = new ExternalDomainModel(credentials)
      this.uow.registerOperation('insert', this.externalDomainRepository, model)
    }

    return model
  }
}