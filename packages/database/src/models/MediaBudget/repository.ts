import {Transaction, DBConnection} from "../../index";

/**
 * @description Репозиторий для работы с моделью бюджетов медиа
 */
export class MediaBudgetRepository {
	constructor(protected tx: DBConnection | Transaction) {}
}