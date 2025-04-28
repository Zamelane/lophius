import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection, SourceId, ExternalDomainRepository, PartialExternalDomain} from "database";
import {ExternalDomainModel} from "database/models/ExternalDomain/model.ts";

export class ExternalDomainService extends BaseService {
	private readonly externalDomainRepository: ExternalDomainRepository

	constructor(
		protected sourceId: SourceId,
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.externalDomainRepository = new ExternalDomainRepository(tx)
	}

	async findOrCreate(data: PartialExternalDomain) {
		let model = await this.externalDomainRepository.find({
			...data
		})

		if (!model) {
			model = new ExternalDomainModel(data)
			this.uow.registerOperation('insert', this.externalDomainRepository, model)
		}

		return model
	}
}