import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью компаний производства
 */
export class MediaProductionCompanyRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}