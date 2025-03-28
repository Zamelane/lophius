import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью компаний
 */
export class CompanyRepository {
	constructor(protected tx: DBConnection | Transaction) {}
	
}