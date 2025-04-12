import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection, PartialExternalPoster, PartialExternalBackdrop} from "database";
import {ExternalBackdropRepository} from "database/models";
import {ExternalPosterModel} from "database/models/ExternalPoster/model.ts";
import {ExternalBackdropModel} from "database/models/ExternalBackdrop/model.ts";

export class ExternalBackdropService extends BaseService {
	private readonly externalBackdropRepository: ExternalBackdropRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.externalBackdropRepository = new ExternalBackdropRepository(tx)
	}

	insert(data: PartialExternalBackdrop) {
		const externalBackdropModel = new ExternalBackdropModel({
			...data
		})
		this.uow.registerOperation('insert', this.externalBackdropRepository, externalBackdropModel)
		return externalBackdropModel
	}
}