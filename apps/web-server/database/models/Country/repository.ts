import {Transaction, DBConnection} from "@/database";
import {insertCountry, findCountryByISO} from "@/database/models/Country/methods";
/**
 * @description Репозиторий для работы с моделью стран
 */
export class CountryRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	findByISO_3166_1 = findCountryByISO

	insert = insertCountry
}