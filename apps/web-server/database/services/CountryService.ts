import {UoW} from "@/database/services/UnitOfWorks";
import {BaseService} from "@/database/services/types";
import {CountryModel} from "@/database/models/Country/model";
import {db, Transaction, DBConnection, PartialCountry, CountryRepository} from "@/database";

export class CountryService extends BaseService {
	private readonly countryRepository: CountryRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.countryRepository = new CountryRepository(tx)
	}

	createCountry(data: PartialCountry) {
		const model = new CountryModel(data)
		this.uow.registerOperation('insert', this.countryRepository, model)
		return model
	}
}