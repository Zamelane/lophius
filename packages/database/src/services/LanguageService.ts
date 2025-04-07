import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {LanguageModel} from "../models/Language/model";
import {db, Transaction, DBConnection, LanguageRepository, OptionalNamesLanguage} from "../index";

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

	createLanguage(data: OptionalNamesLanguage) {
		const model = new LanguageModel({
			...data,
			native_name: data.native_name ?? null,
			english_name: data.english_name ?? null,
		})
		this.uow.registerOperation('insert', this.languageRepository, model)
		return model
	}
}