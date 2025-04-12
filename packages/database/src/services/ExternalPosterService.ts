import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {
	db,
	Transaction,
	DBConnection,
	ExternalPosterRepository,
	PartialExternalPoster
} from "../index";
import {ExternalPosterModel} from "database/models/ExternalPoster/model.ts";

export class ExternalPosterService extends BaseService {
	private readonly externalPosterRepository: ExternalPosterRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.externalPosterRepository = new ExternalPosterRepository(tx)
	}

	insert(data: PartialExternalPoster) {
		const externalPosterModel = new ExternalPosterModel({
			...data
		})
		this.uow.registerOperation('insert', this.externalPosterRepository, externalPosterModel)
		return externalPosterModel
	}
}