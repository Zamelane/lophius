import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection, PartialExternalBackdrop} from "database";
import {ExternalBackdropRepository} from "database/models";
import {ExternalBackdropModel} from "database/models/ExternalBackdrop/model.ts";
import { MediaModel } from "database/models/Media/model";

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

	deleteNotIn(media: MediaModel, backdrops: ExternalBackdropModel[]) {
		this.uow.registerOperation('deleteNotIn', this.externalBackdropRepository, backdrops, media)
	}
}