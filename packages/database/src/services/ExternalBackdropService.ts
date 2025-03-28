import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection} from "../index";
import {ExternalBackdropRepository} from "../models/ExternalBackdrop";

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
}