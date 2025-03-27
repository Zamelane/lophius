import {UoW} from "@/database/services/UnitOfWorks";
import {BaseService} from "@/database/services/types";
import {LanguageModel} from "@/database/models/Language/model";
import {db, Transaction, DBConnection, PartialLanguage, LanguageRepository} from "@/database";

export class LanguageService extends BaseService {
	private readonly languageRepository: LanguageRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.languageRepository = new LanguageRepository(tx)
	}

	createLanguage(data: PartialLanguage) {
		const model = new LanguageModel(data)
		this.uow.registerOperation('insert', this.languageRepository, model)
		return model
	}
}