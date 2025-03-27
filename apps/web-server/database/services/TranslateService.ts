import {UoW} from "@/database/services/UnitOfWorks";
import {BaseService} from "@/database/services/types";
import {TranslatedModel} from "@/database/models/Translate/type";
import {db, Transaction, DBConnection, TranslateRepository} from "@/database";

export class TranslateService extends BaseService {
	private readonly translateRepo: TranslateRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.translateRepo = new TranslateRepository(tx)
	}

	addTranslateByMedia(data: TranslatedModel) {
		this.uow.registerOperation('insert', this.translateRepo, data)
	}
}