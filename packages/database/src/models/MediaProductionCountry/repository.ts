import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью стран производства
 */
export class MediaProductionCountryRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}