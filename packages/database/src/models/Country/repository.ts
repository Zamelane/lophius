import {Transaction, DBConnection} from "@/index.ts";
import {insertCountry, findCountryByISO} from "./methods";
/**
 * @description Репозиторий для работы с моделью стран
 */
export class CountryRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	findByISO_3166_1 = findCountryByISO

	insert = insertCountry
}