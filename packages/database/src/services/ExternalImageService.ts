import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection, SourceId} from "../index";
import { ExternalImageRepository, PartialExternalImage } from "database/models/ExternalImages";
import { ExternalImageModel } from "database/models/ExternalImages/model";

export class ExternalImageService extends BaseService {
  private readonly externalImageRepository: ExternalImageRepository

  constructor(
    protected sourceId: SourceId,
    tx?: DBConnection|Transaction,
    uow?: UoW
  ) {
    tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
    super(tx, uow) // Инициализируем UnitOfWorks
    this.externalImageRepository = new ExternalImageRepository(tx)
  }

  async findOrCreate(data: PartialExternalImage) {
    let model = await this.externalImageRepository.findByCredentials(data.path, this.sourceId)

    if (!model) {
      model = new ExternalImageModel({
        ...data,
        sourceId: this.sourceId
      })
      this.uow.registerOperation('insert', this.externalImageRepository, model, this.sourceId)
    }

    return model
  }
}