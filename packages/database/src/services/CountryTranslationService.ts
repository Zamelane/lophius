import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection} from "../index";
import {CountryTranslationRepository} from "../models/CountryTranslation";

export class CountryTranslationService extends BaseService {
	private readonly countryTranslationRepository: CountryTranslationRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.countryTranslationRepository = new CountryTranslationRepository(tx)
	}
}