import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {CountryModel} from "../models/Country/model";
import {db, Transaction, DBConnection, CountryRepository, OptionalNamesCountry} from "../index";

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

	createCountry(data: OptionalNamesCountry) {
		const model = new CountryModel({
			...data,
			english_name: data.english_name ?? null
		})
		this.uow.registerOperation('insert', this.countryRepository, model)
		return model
	}
}